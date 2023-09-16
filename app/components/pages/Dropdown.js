import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	Modal,
	View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import i18n from '../../i18n';
import { changeBg } from '../../redux/bgColour.slice';
import { changeLang } from '../../redux/language.slice';

const Dropdown = ({ data, entity, dispatchFuncName }) => {
	const DropdownButton = useRef();
	const dispatch = useDispatch();

	const [visible, setVisible] = useState(false);
	const [selected, setSelected] = useState(undefined);
	const [dropdownTop, setDropdownTop] = useState(0);
	const [nextSelectPosition, setNextSelectPosition] = useState(null);

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
		DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => setDropdownTop(py - h));
		setVisible(true);
	};

	const onItemPress = async (item) => {
		if (entity === 'lang') i18n.changeLanguage(item);

		await AsyncStorage.setItem(entity, item);

		const dispatchFunc = dispatchFuncName === 'changeLang' ? changeLang : changeBg
		dispatch(dispatchFunc(item));

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
				<TouchableOpacity onPress={() => setVisible(false)} style={styles.overlay} >
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
			<Text style={styles.icon}>&#9658;</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		marginHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#efefef',
		height: 30,
		width: '40%',
		float: 'right',
	},
	buttonText: {
		flex: 1,
		textAlign: 'center',
	},
	overlay: {
		width: '100%',
		height: '100%',
	},
	icon: {
		marginRight: 10,
		fontSize: 20,
	},
	dropdown: {
		position: 'absolute',
		marginLeft: '30%',
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1,
		width: '100%'
	},
});

export default Dropdown;