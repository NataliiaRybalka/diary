import { useState } from 'react';
import { Pressable, TextInput, Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getMonth } from '../../lib/getDates';

function MonthPicker({ month, setMonth }) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const toggleDatepicker = () => {
		setShowPicker(!showPicker);
	};

	const onChage = ({type}, selectedDate) => {
		if (type === 'set') {
			setDate(selectedDate);

			if (Platform.OS === 'android') {
				toggleDatepicker();
				setMonth(selectedDate.toString());
				
				const yearMonth = getMonth(selectedDate);
				setMonth(yearMonth);
			}
		} else {
			toggleDatepicker();
		}
	};

	return (
		<View>
			{showPicker && <DateTimePicker
				mode='date'
				display='spinner'
				value={date}
				onChange={onChage}
				style={styles.picker}
			/>}

			{showPicker && Platform.OS === 'ios' && (
				<View style={styles.viewIOS}>
					<TouchableOpacity>Cancel</TouchableOpacity>
				</View>
			)}

			{!showPicker && (
				<Pressable onPress={toggleDatepicker}>
					<TextInput
						style={styles.text}
						value={month}
						onChange={text => setMonth(text)}
						editable={false}
						onPressIn={toggleDatepicker}
					/>
				</Pressable>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	picker: {
		height: 120,
		marginTop: -10
	},
	viewIOS: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	text: {
		borderWidth: 1,
		color: '#000000',
		marginHorizontal: 10,
		textAlign: 'center',
		width: 100
	}
});

export default MonthPicker;