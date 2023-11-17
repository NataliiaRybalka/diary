import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
	containerCard: {
		alignItems: 'center',
	},
	titleCard: {
		marginVertical: 10,
	},
	textCard: {
		marginBottom: 20,
		textAlign: 'center',
		marginHorizontal: 10,
	},
	image: {
		width: 300,
		height: 375,
		marginHorizontal: 25,
	},
	description: {
		textAlign: 'center',
		marginHorizontal: 10,
		paddingTop: 40,
		backgroundColor: 'rgba(0, 0, 0, 0.7)',
		width: 300,
		height: 375,
		color: '#ffffff',
	},
});
