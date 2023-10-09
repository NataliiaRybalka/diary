import { useState } from 'react';
import { Pressable, TextInput, Platform, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getMonth } from '../../lib/getDates';

import { styles } from './styles';

function MonthPicker({ month, setMonth }) {
	const [date, setDate] = useState(new Date());
	const [showPicker, setShowPicker] = useState(false);

	const toggleDatepicker = () => {
		setShowPicker(!showPicker);
	};

	const onChange = ({type}, selectedDate) => {
		if (type === 'set') {
			setDate(selectedDate);
			const yearMonth = getMonth(selectedDate);
			setMonth(yearMonth);

			if (Platform.OS === 'android') {
				toggleDatepicker();
				
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

export default MonthPicker;