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
		marginTop: 30,
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
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalView: {
		width: 250,
		height: 250,
		paddingTop: 20,
		backgroundColor: '#ffffff',
	},
	scrollContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 145,
	},
	data: {
		fontSize: 16,
		paddingVertical: 10,
		borderBottomColor: 'grey',
		borderBottomWidth: 2,
		textAlign: 'center',
		color: 'grey',
	},
	month: {
		minWidth: 100,
	},
	day: {
		minWidth: 50,
	},
	buttonViewContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 50,
	},
	buttonView: {
		marginHorizontal: 20,
	},
	buttonTextView: {
		fontWeight: '500',
	},
	containerFooterTop: {
		position: 'absolute',
		top: '40%',
	},
	textFooterTop: {
		fontSize: 40,
		fontWeight: '500',
		fontStyle: 'italic',
	},
	buttonCard620: {
		height: 50
	},
	dropdownCard620: {
		marginTop: 50,
	},
});
