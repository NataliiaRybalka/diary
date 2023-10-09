import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, TextInput, Platform, View, TouchableOpacity } from 'react-native';

import { styles } from './styles';

function DayPicker({ day, setDay }) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const toggleDatepicker = () => {
		setShowPicker(!showPicker);
	};

	const onChange = ({type}, selectedDate) => {
		let month = selectedDate.getMonth() + 1;
		month = String(month).length === 1 ? `0${month}` : month;
		let day = selectedDate.getDate();
		day = String(day).length === 1 ? `0${day}` : day;
		const date = `${selectedDate.getFullYear()}-${month}-${day}`;

		if (type === 'set') {
			setDate(selectedDate);
			setDay(date);

			if (Platform.OS === 'android') {
				toggleDatepicker();
				setDay(date.toString());
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
				onChange={onChange}
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
						style={styles.textPicker}
						value={day}
						onChange={text => setDay(text)}
						editable={false}
						onPressIn={toggleDatepicker}
					/>
				</Pressable>
			)}
		</View>
	);
};

export default DayPicker;