import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
	},
	partContainer: {
		marginBottom: 30,
	},
	label: {
		fontSize: 16,
	},
	checkboxContainer: {
		flexDirection: 'row',
	},
	checkbox: {
		marginLeft: 10
	},
	err: {
		color: '#ff0000',
		textAlign: 'center',
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
	result: {
		textAlign: 'center',
		color: 'green'
	},
});
