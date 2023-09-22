import { useTranslation } from 'react-i18next';
import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

function MainDescription({setAskQuestion}) {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	return (
		<ScrollView style={[styles.container, { backgroundColor: bgColour }]}>
			<Text style={styles.header}>{t('Metaphorical Cards')}</Text>
			
			<Text style={styles.text}>
				{t('Metaphorical cards have nothing to do with divination, magic and esotericism. This is a tool that will help you extract thoughts and feelings from your subconscious')} 💫
				{'\n'}
				🕊 {t('Formulate your question or think about what is bothering you.')}
				{'\n'}
				🕊 {t('Receive the message in the form of one card.')}
				{'\n'}
				🕊 {t('Look at the image, read the description and think about what it is about for you?')}
			</Text>

			<Text style={styles.text}>{t('You have two decks of cards at your disposal:')}</Text>

			<Text style={styles.title}>{t('Fulcrum')}</Text>
			<Text style={styles.text}>
				{t('«Fulcrum» - these are resource cards. It depicts positive scenes, landscapes and abstractions that are designed to inspire you, give you strength and joy. Such cards provide an opportunity to formulate a new solution, look at yourself differently, gain internal support and find an external resource.')}
			</Text>

			<Text style={styles.title}>{t('Internal Compass')}</Text>
			<Text style={styles.text}>
				{t('«Inner Compass» is a versatile deck with a wide range of looks and scenes to suit almost any situation. It is energetically filled and very harmoniously reflects everything that happens inside a person.')}
			</Text>

			<View style={styles.btn}>
				<Text style={styles.btnText} onPress={()=>setAskQuestion(true)}>{t('Ask a Question')}</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
	},
	header: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '700'
	},
	text: {
		marginVertical: 10,
		textAlign: 'center'
	},
	title: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '500'
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

export default MainDescription;