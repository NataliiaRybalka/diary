import { useState, useEffect } from 'react';
import FlipCard from 'react-native-flip-card';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, Image } from 'react-native';

import { styles } from './styles';

function Card({ route }) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const language = useSelector(state => state.language.value);

	const { card } = route.params;

	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');

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
		<View style={[styles.container, styles.containerCard, { backgroundColor: bgColour }]}>
			<Text style={[styles.title, styles.titleCard]}>{title}</Text>

			<FlipCard flipHorizontal={true} flipVertical={false}>
				<View>
					<Text style={styles.textCard}>
						{t('The first thought that came to your mind when you looked at her is the answer to your question.')} 🙌🏼
						{'\n'}
						{t('Write this thought in a notepad or phone notes, and after a while return to it. Insights guaranteed!')}
					</Text>
					<Image source={{uri: card.file}} style={[styles.face, styles.image]} />
				</View>

				<Text style={[styles.back, styles.description]}>{description}</Text>
			</FlipCard>
		</View>
	);
}

export default Card;