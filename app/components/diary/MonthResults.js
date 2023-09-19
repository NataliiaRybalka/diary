import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { View, Text, StyleSheet, Linking } from 'react-native';

import { WEB } from '../../lib/constants';

function MonthResults() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const link = `${WEB}/my-diary/month-results`;

	return (
		<View style={[styles.container, {backgroundColor: bgColour}]}>
			<Text style={styles.text}>{t('You can see your results on the website')}:</Text>
			<Text style={styles.link} onPress={() => Linking.openURL(link)}>{t('Month Results')}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		fontSize: 20,
		fontWeight: '500'
	},
	link: {
		textAlign: 'center',
		fontSize: 20,
		color: 'blue'
	}
});

export default MonthResults;