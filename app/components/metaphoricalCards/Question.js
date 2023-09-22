import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Dropdown from '../pages/Dropdown';
import { FULCRUM, SERVER } from '../../lib/constants';

function Question({ navigation }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	const [card, setCard] = useState(null);
	const [deck, setDeck] = useState(FULCRUM);
	const [question, setQuestion] = useState('');

	const send = async () => {
		const res = await fetch(`${SERVER}/metaphorical-cards/${deck}/card`);
		
		if (res.status === 200) {
			const data = await res.json();
			setCard(data);
		}
	};

	useEffect(() => {
		if (card) navigation.navigate('Card', { card });
	}, [card])

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Dropdown data={['Fulcrum', 'Internal Compass']} entity={'card'} setDeck={setDeck} />

			<TextInput
				style={styles.input} 
				value={question}
				onChangeText={text => setQuestion(text)}
			/>

			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={send}>{t('Ask a Question')}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
	},
	input: {
		marginTop: 70,
		marginHorizontal: 10,
		borderWidth: 1,
		width: '95%',
		height: 30,
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	btn: {
		height: 40,
		borderRadius: 25,
		borderColor: '#000000',
		borderStyle: 'solid',
		borderWidth: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItems: 'center',
		width: '50%',
		marginTop: 10,
		marginLeft: '25%'
	},
	btnText: {
		fontSize: 18,
		fontWeight: '700',
	},
});

export default Question;