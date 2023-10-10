import { useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Animated, Text, View, SafeAreaView, Pressable, TextInput, ScrollView, Modal, StyleSheet } from 'react-native';

// import { styles } from './styles';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];

function MonthPicker({ month, setMonth, showPicker, setShowPicker }) {
	const { t } = useTranslation();

	const [selectedYear, setSelectedYear] = useState(month.split('-')[0]);
	const [selectedMonth, setSelectedMonth] = useState(month.split('-')[1]);
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

	const onChange = () => {
		let month = selectedMonth.length === 1 ? `0${selectedMonth}` : selectedMonth;
		const yearMonth = `${selectedYear}-${month}`;
		setMonth(yearMonth);

		if (Platform.OS === 'android') setShowPicker(!showPicker);
	};
console.log(month);
	return (
		<SafeAreaView>
			<Modal
				transparent={true}
				visible={showPicker}
				onRequestClose={() => {setShowPicker(!showPicker)}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={styles.scrollContainer}>
							<ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false}>
								{months.map((mon, index) => (
									<Pressable
										key={index}
										onPress={() => setSelectedMonth(String(index + 1))}
									>
										<Text style={styles.months}>
											{t(mon)}
										</Text>
									</Pressable>
								))}
							</ScrollView>
							<ScrollView contentContainerStyle={{alignItems: 'center'}} showsVerticalScrollIndicator={false}>
								{months.map((mon, index) => (
									<Pressable
										key={index}
										onPress={() => setSelectedYear(String(index + 1))}
									>
										<Text style={styles.months}>
											{t(mon)}
										</Text>
									</Pressable>
								))}
							</ScrollView>
						</View>

						<View style={styles.buttonView}>
							<Pressable
								style={styles.button}
								onPress={() => setShowPicker(!showPicker)}
							>
								<Text style={styles.buttonText}>{t('CANCEL')}</Text>
							</Pressable>
							<Pressable
								style={styles.button}
								onPress={onChange}
							>
								<Text style={styles.buttonText}>OK</Text>
							</Pressable>
						</View>
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
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		width: 250,
		height: 250,
		paddingTop: 20,
		backgroundColor: '#ffffff',
	},
	scrollContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 145,
	},
	months: {
		fontSize: 16,
		paddingVertical: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 2,
		textAlign: 'center'
	},
	buttonView: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 50,
	},
	button: {
		marginHorizontal: 20,
	},
	buttonText: {
		fontWeight: '500',
	},




	textPicker: {
		borderWidth: 1,
		color: '#000000',
		marginHorizontal: 10,
		textAlign: 'center',
		width: 100
	},
});

export default MonthPicker;