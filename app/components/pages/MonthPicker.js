import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Text, View, SafeAreaView, Pressable, TextInput, ScrollView, Modal } from 'react-native';

import { styles } from './styles';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const years = [];

function MonthPicker({ month, setMonth, showPicker, setShowPicker }) {
	const { t } = useTranslation();

	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(month.split('-')[1]);

	useFocusEffect(
		useCallback(() => {
			setShowPicker(false);
		}, [])
	);

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		let startYear = 2020;
		while ( startYear <= currentYear ) {
			years.push(startYear++);
		}
	}, []);

	const onChange = () => {
		let month = selectedMonth.length === 1 ? `0${selectedMonth}` : selectedMonth;
		const yearMonth = `${selectedYear}-${month}`;
		setMonth(yearMonth);

		if (Platform.OS === 'android') setShowPicker(!showPicker);
	};

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
								{years.map((year, index) => (
									<Pressable
										key={index}
										onPress={() => setSelectedYear(year)}
									>
										<Text style={styles.months}>
											{t(year)}
										</Text>
									</Pressable>
								))}
							</ScrollView>
						</View>

						<View style={styles.buttonViewContainer}>
							<Pressable
								style={styles.buttonView}
								onPress={() => setShowPicker(!showPicker)}
							>
								<Text style={styles.buttonText}>{t('CANCEL')}</Text>
							</Pressable>
							<Pressable
								style={styles.buttonView}
								onPress={onChange}
							>
								<Text style={styles.buttonTextView}>OK</Text>
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
				<Pressable onPress={() => setShowPicker(!showPicker)}>
					<TextInput
						style={styles.textPicker}
						value={month}
						onChange={text => setMonth(text)}
						editable={false}
						onPressIn={() => setShowPicker(!showPicker)}
					/>
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default MonthPicker;