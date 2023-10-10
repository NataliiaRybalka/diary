import { useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Animated, Text, View, SafeAreaView, Pressable, TextInput, ScrollView, Modal, StyleSheet } from 'react-native';

// import { styles } from './styles';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function MonthPicker({ month, setMonth }) {
	const { t } = useTranslation();

	const [selectedYear, setSelectedYear] = useState();
	const [selectedMonth, setSelectedMonth] = useState();
	const [showPicker, setShowPicker] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useFocusEffect(
		useCallback(() => {
			setShowPicker(false);
		}, [])
	);

	const fadeIn = () => {
		if (showPicker) {
			Animated.timing(fadeAnim, {
				toValue: 0,
				useNativeDriver: false,
			}).start();
			setShowPicker(false);
		} else {
			Animated.timing(fadeAnim, {
				toValue: 1,
				useNativeDriver: false,
			}).start();
			setShowPicker(true);
		}
	};

	const onChange = (selectedDate) => {
		let yearMonth = JSON.stringify(selectedDate).split('-');
		let year = yearMonth[0].split('"')[1];
		let month = String(Number(yearMonth[1]) + 1);
		month = month.length === 1 ? `0${month}` : month;
		yearMonth = `${year}-${month}`;
		setMonth(yearMonth);

		if (Platform.OS === 'android') setShowPicker(!showPicker);
	};

	return (
		<SafeAreaView>
			<Modal
				animationType="slide"
				transparent={true}
				visible={showPicker}
				onRequestClose={() => {setShowPicker(!showPicker)}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<ScrollView>
							{months.map((mon, index) => (
								<Pressable
									key={index}
									onPress={() => setSelectedMonth(index + 1)}
								>
									<Text style={styles.months}>
										{t(mon)}
									</Text>
								</Pressable>
							))}
						</ScrollView>

						<Pressable
							style={[styles.button]}
							onPress={() => setShowPicker(!showPicker)}
						>
							<Text style={styles.textStyle}>Hide Modal</Text>
						</Pressable>
					</View>
				</View>
			</Modal>

			{showPicker && Platform.OS === 'ios' && (
				<View style={styles.viewIOS}>
					<TouchableOpacity>Cancel</TouchableOpacity>
				</View>
			)}

			<View>
				<Pressable onPress={fadeIn}>
					<TextInput
						style={styles.textPicker}
						value={month}
						onChange={text => setMonth(text)}
						editable={false}
						onPressIn={fadeIn}
					/>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	textPicker: {
		borderWidth: 1,
		color: '#000000',
		marginHorizontal: 10,
		textAlign: 'center',
		width: 100
	},
	monthPicker: {
		width: '70%',
		height: '50%',
		backgroundColor: '#ffffff',
		zIndex: 500,
	},
	months: {
		fontSize: 16,
		paddingVertical: 10,
		width: '40%',
		borderBottomColor: 'grey',
		borderBottomWidth: 2,
	},
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		width: '70%',
		height: '50%',
		margin: 20,
		padding: 20,
		backgroundColor: '#ffffff',
	},
	button: {
		borderRadius: 20,
		padding: 10,
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default MonthPicker;