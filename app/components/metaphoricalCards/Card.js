import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import FlipCard from 'react-native-flip-card'

function Card({ route }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const language = useSelector(state => state.language.value);

	const { card } = route.params;

	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		if (language === 'en') {
			const title = card?.descriptionEn.split('"');
			setTitle(title[1]);
			setDescription(card?.descriptionEn);
		}
		else if (language === 'ru') {
			const title = card?.descriptionRu.split('"');
			setTitle(title[1]);
			setDescription(card?.descriptionRu);
		}
		else if (language === 'ua') {
			const title = card?.descriptionUa.split('"');
			setTitle(title[1]);
			setDescription(card?.descriptionUa);
		}
	}, [language]);

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.text}>
				{t('The first thought that came to your mind when you looked at her is the answer to your question.')} 🙌🏼
				{'\n'}
				{t('Write this thought in a notepad or phone notes, and after a while return to it. Insights guaranteed!')}
			</Text>

			<FlipCard flipHorizontal={true} flipVertical={false}>
				<Image source={{uri: card.file}} style={[styles.face, styles.image]} />

				<Text style={[styles.back, styles.description]}>{description}</Text>
			</FlipCard>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
		alignItems: 'center',
	},
	title: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '500',
		marginVertical: 10,
	},
	text: {
		marginBottom: 20,
		textAlign: 'center',
		marginHorizontal: 10,
	},
	image: {
		width: 300,
		height: 375,
	},
	description: {
		textAlign: 'center',
		marginHorizontal: 10,
		paddingTop: 40,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		width: 300,
		height: 375,
	},
});

export default Card;