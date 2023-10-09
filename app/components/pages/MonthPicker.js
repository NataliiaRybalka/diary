import { useState, useRef, useCallback } from 'react';
import moment from 'moment';
import { useFocusEffect } from '@react-navigation/native';
import { Animated, Text, View, SafeAreaView, Pressable, TextInput, ScrollView } from 'react-native';

import { styles } from './styles';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function MonthPicker({ month, setMonth }) {
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
			<Animated.View
				style={[
					styles.monthPicker,
					{
						opacity: fadeAnim,
					},
				]}
			>
				<ScrollView>
					{months.map((mon, index) => (
						<Text
							style={styles.months}
							key={index}
							onPress={() => setSelectedMonth(index + 1)}
						>
							{mon}
						</Text>)
					)}
				</ScrollView>
			</Animated.View>

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

export default MonthPicker;