import { View, Text, Linking } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { styles } from './styles';

function About() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<View style={styles.containerFooter}>
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
		</View>
	);
};

export default About;
