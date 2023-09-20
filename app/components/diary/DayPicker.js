import { useState } from 'react';
import { Pressable, TextInput, Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function DayPicker({ day, setDay }) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const toggleDatepicker = () => {
		setShowPicker(!showPicker);
	};

	const onChange = ({type}, selectedDate) => {
		let month = selectedDate.getMonth() + 1;
		month = String(month).length === 1 ? `0${month}` : month;
		const date = `${selectedDate.getFullYear()}-${month}-${selectedDate.getDate()}`;

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
						style={styles.text}
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

export default DayPicker;