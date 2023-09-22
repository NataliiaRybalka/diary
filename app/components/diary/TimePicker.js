import { useState } from 'react';
import { Pressable, TextInput, Platform, View, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function TimePicker({ time, setTime, row=null, setRowInFocus=null }) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const toggleDatepicker = () => {
		if (setRowInFocus) setRowInFocus(row);
		setShowPicker(!showPicker);
	};

	const onChange = ({type}, selectedDate) => {
		let date = selectedDate.toLocaleTimeString().split(':');
		date = `${date[0]}:${date[1]}`;

		if (type === 'set') {
			setDate(selectedDate);
			setTime(date);

			if (Platform.OS === 'android') {
				toggleDatepicker();
				setTime(date.toString());
			}
		} else {
			toggleDatepicker();
		}
	};

	return (
		<View>
			{showPicker && <DateTimePicker
				mode='time'
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
						value={time}
						onChange={text => setTime(text)}
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

export default TimePicker;