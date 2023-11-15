import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { View, Text, Linking } from 'react-native';

import { WEB } from '../../lib/constants';

import { styles } from './styles';

function About() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);

	return (
		<View style={[styles.container, { backgroundColor: bgColour }]}>
			<View style={styles.containerFooterWeb}>
				<Text onPress={() => Linking.openURL(WEB)}>
					<Text style={styles.textFooterTop}>Your Best Friend {'\n'}</Text>
					<Text style={styles.text}>{t('web site')}</Text>
				</Text>
			</View>

			<View style={styles.containerFooterEmail}>
				<Text>
					{t('For any questions: ')}
				</Text>
				<Text
					style={styles.text}
					onPress={() => Linking.openURL('mailto:your.best.friend.diary@gmail.com')}
				>
					your.best.friend.diary@gmail.com
				</Text>
			</View>

			<View style={styles.containerFooterDeveloper}>
				<Text>
					&copy; 2023 - {new Date().getFullYear()}{" "}
					<Text onPress={() => Linking.openURL('https://github.com/NataliiaRybalka')}>
						<Text style={styles.text}>Nataliia Rybalka</Text>
					</Text>
				</Text>
			</View>
		</View>
	);
};

export default About;