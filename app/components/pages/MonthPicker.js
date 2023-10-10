import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View, SafeAreaView, Pressable, TextInput, ScrollView, Modal, TouchableOpacity } from 'react-native';

import { styles } from './styles';

const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const years = [];

function MonthPicker({ month, setMonth, showPicker, setShowPicker }) {
	const { t } = useTranslation();

	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [selectedMonth, setSelectedMonth] = useState(month.split('-')[1]);
	const [scrollMonthToIndex, setScrollMonthToIndex] = useState(0);
	const [scrollYearToIndex, setScrollYearToIndex] = useState(0);

	const [monthSourceCords, setMonthSourceCords] = useState([]);
	const [yearSourceCords, setYearSourceCords] = useState([]);
	const [monthRef, setMonthRef] = useState(null);
	const [yearRef, setYearRef] = useState(null);

	useEffect(() => {
		const currentYear = new Date().getFullYear();
		let startYear = 2020;
		while ( startYear <= currentYear ) {
			years.push(startYear++);
		}

		setScrollMonthToIndex(selectedMonth - 1);
	}, []);

	useEffect(() => {
		onSetScrollYearToIndex();
	}, [years]);

	useEffect(() => {
		if (yearRef && yearSourceCords.length > scrollYearToIndex) {
			yearRef.scrollTo({
				x: 0,
				y: yearSourceCords[scrollYearToIndex],
			});
		}
	}, [yearRef, scrollYearToIndex]);

	useEffect(() => {
		if (monthRef && monthSourceCords.length > scrollMonthToIndex) {
			monthRef.scrollTo({
				x: 0,
				y: monthSourceCords[scrollMonthToIndex],
				animated: true,
			});
		}
	}, [monthRef, scrollMonthToIndex]);

	const onSetScrollYearToIndex = () => {
		const currentYearIndex = years.findIndex(year => year === selectedYear);
		setScrollYearToIndex(currentYearIndex);
	};

	const onChange = () => {
		let month = selectedMonth.length === 1 ? `0${selectedMonth}` : selectedMonth;
		const yearMonth = `${selectedYear}-${month}`;
		setMonth(yearMonth);

		setScrollMonthToIndex(selectedMonth - 1);
		onSetScrollYearToIndex();

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
							<ScrollView
								contentContainerStyle={{alignItems: 'center'}}
								showsVerticalScrollIndicator={false}
								ref={(ref) => {
									setMonthRef(ref);
								}}
							>
								{months.map((mon, index) => (
									<Pressable
										key={index}
										onPress={() => setSelectedMonth(String(index + 1))}
										onLayout={(event) => {
											const layout = event.nativeEvent.layout;
											monthSourceCords[index] = layout.y;
											setMonthSourceCords(monthSourceCords);
										}}
									>
										<Text style={[styles.months, index === (Number(selectedMonth) - 1) && {color: 'black'}]}>
											{t(mon)}
										</Text>
									</Pressable>
								))}
							</ScrollView>
							<ScrollView
								contentContainerStyle={{alignItems: 'center'}}
								showsVerticalScrollIndicator={false}
								ref={(ref) => {
									setYearRef(ref);
								}}
							>
								{years.map((year, index) => (
									<Pressable
										key={index}
										onPress={() => setSelectedYear(year)}
										onLayout={(event) => {
											const layout = event.nativeEvent.layout;
											yearSourceCords[index] = layout.y;
											setYearSourceCords(yearSourceCords);
										}}
									>
										<Text style={[styles.months, year === selectedYear && {color: 'black'}]}>
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