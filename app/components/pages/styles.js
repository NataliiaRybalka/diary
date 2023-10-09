import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		textAlign: 'center',
		alignItems: 'center',
	},
	containerFooter: {
		bottom: 0,
		position: 'absolute',
	},
	text: {
		fontSize: 16,
		fontWeight: '500',
	},
	picker: {
		height: 120,
		marginTop: -10
	},
	viewIOS: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	textPicker: {
		borderWidth: 1,
		color: '#000000',
		marginHorizontal: 10,
		textAlign: 'center',
		width: 100
	},
	button: {
		marginTop: 10,
		marginHorizontal: 10,
		flexDirection: 'row',
		alignItems: 'center',
		height: 30,
		width: '40%',
		float: 'right',
	},
	buttonText: {
		flex: 1,
		textAlign: 'center',
	},
	overlay: {
		width: '100%',
		height: '100%',
	},
	icon: {
		marginRight: 10,
		fontSize: 20,
	},
	dropdown: {
		position: 'absolute',
		marginLeft: '30%',
	},
	item: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1,
		width: '100%'
	},
	buttonCard: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
		height: 30,
		width: '50%',
		float: 'right',
	},
	buttonTextCard: {
		marginHorizontal: 10,
		fontSize: 16,
	},
	dropdownCard: {
		position: 'absolute',
		marginLeft: '40%',
		marginTop: 10,
	},
	itemCard: {
		fontSize: 16,
		paddingHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: 1,
		width: '100%'
	},
	buttonNotifLang: {
		flexDirection: 'row',
		alignItems: 'center',
		textAlign: 'center',
		height: 30,
		width: '30%',
		float: 'right',
	},
	dropdownNotifLang: {
		position: 'absolute',
		marginLeft: '63%',
	},
	monthPicker: {
		width: '70%',
		height: '50%',
		backgroundColor: '#ffffff',
		zIndex: 500,
	},
	months: {
		fontSize: 16,
		marginVertical: 10,
		textAlign: 'center',
		width: '40%',
		marginHorizontal: 30,
		// borderBottomColor: 'grey',
		// borderBottomWidth: 2,
	},
});
