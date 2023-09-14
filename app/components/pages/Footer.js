import { StyleSheet, View, Text, Linking } from 'react-native';

function Footer() {
	return (
		<View>
			<Text style={styles.footer} onPress={() => Linking.openURL('https://github.com/NataliiaRybalka')}>
				&copy; 2023 - {new Date().getFullYear()}{" "}
				Nataliia Rybalka
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	footer: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
});


export default Footer;
