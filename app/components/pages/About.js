import { StyleSheet, View, Text, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

function About() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<Text>
				&copy; 2023 - {new Date().getFullYear()}{" "}
			</Text>
			<Text onPress={() => Linking.openURL('https://github.com/NataliiaRybalka')}>
				{t('Developing By')} <Text style={styles.text}>Nataliia Rybalka</Text>
			</Text>
			<Text onPress={() => Linking.openURL('https://github.com/NataliiaRybalka')}>
				{t('Design By')} <Text style={styles.text}>Nataliia Rybalka</Text>
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
	},
});


export default About;
