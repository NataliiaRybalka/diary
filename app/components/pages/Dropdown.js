import { useRef, useState, useEffect } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	Modal,
	View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dropdown = ({ data, entity }) => {
	const DropdownButton = useRef();

	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(undefined);
	const [dropdownTop, setDropdownTop] = useState(0);

	const getData = async () => {
		try {
			const data = await AsyncStorage.getItem(entity);
			setSelected(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const toggleDropdown = () => {
		visible ? setVisible(false) : openDropdown();
	};

	const openDropdown = () => {
		DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
			setDropdownTop(py + h);
		});
		setVisible(true);
	};

	const onItemPress = async (item) => {
		await AsyncStorage.setItem(entity, item);
		setSelected(item);
		setVisible(false);
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
			<Text>{item}</Text>
		</TouchableOpacity>
	);

	const renderDropdown = ()=> {
		return (
			<Modal visible={visible} transparent animationType='none'>
				<TouchableOpacity onPress={() => setVisible(false)} >
					<View style={[styles.dropdown, { top: dropdownTop }]}>
						<FlatList
							data={data}
							renderItem={renderItem}
							keyExtractor={(item, index) => index.toString()}
						/>
					</View>
				</TouchableOpacity>
			</Modal>
		);
	};

	return (
		<TouchableOpacity
			ref={DropdownButton}
			style={styles.button}
			onPress={toggleDropdown}
		>
			{renderDropdown()}
			<Text style={styles.buttonText}>
				{(!!selected && selected) || entity}
			</Text>
			<Text style={styles.icon}>
				&#9660;
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#efefef',
		height: 30,
		width: 45,
		zIndex: 1,
	},
	buttonText: {
		flex: 1,
		textAlign: 'center',
	},
	icon: {
		marginRight: 10,
		fontSize: 16,
	},
	dropdown: {
		position: 'absolute',
		width: 45,
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1,
	},
});

export default Dropdown;