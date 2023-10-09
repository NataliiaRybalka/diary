import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
	container: {
		minHeight: '100%',
	},
	newMonth: {
		borderWidth: 1,
		width: 200,
		textAlign: 'center',
		marginHorizontal: 10,
		fontSize: 16,
		marginBottom: 10
	},
	row: {
		borderWidth: 1,
		fontSize: 16,
		paddingHorizontal: 10,
		lineHeight: 30,
		height: 30,
		marginVertical: 5,
	},
	containerUpdate: {
		paddingTop: 50,
		paddingHorizontal: 10
	},
	date: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: '500'
	},
	rowBtn: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	newRow: {
		borderWidth: 1,
		marginHorizontal: 20,
		fontSize: 20,
		width: 30,
		textAlign: 'center',
	},
	rowUpdate: {
		flexDirection: 'row',
		marginVertical: 10,
		alignItems: 'center',
	},
	input: {
		borderWidth: 1,
		color: '#000000',
		textAlign: 'center',
		width: '60%',
		height: 30,
		lineHeight: 30
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
		marginTop: 10,
		color: 'green'
	},
	dayPart: {
		fontSize: 18,
		fontWeight: '700',
		marginTop: 10,
	},
	inputDay: {
		marginTop: 10,
		borderWidth: 1,
		width: '100%',
		height: 30,
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
	div: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10
	},
	label: {
		marginRight: 10,
	},
	inputNum: {
		marginTop: 10,
		borderWidth: 1,
		width: 50,
		height: 30,
		borderWidth: 1,
		borderRadius: 10,
		textAlign: 'center'
	},
	table: {
		borderWidth: 1,
		borderColor: '#000000',
		marginTop: 10,
	},
	rowTable: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cellHeader: {
		flex: 1,
		borderWidth: 1,
		height: 50,
		textAlign: 'center',
		fontSize: 12,
		fontWeight: '500',
		borderColor: '#000000',
	},
	cell: {
		flex: 1,
		padding: 10,
		borderWidth: 1,
		height: 50,
		textAlign: 'center',
		fontSize: 12,
		borderColor: '#000000',
	},
	text: {
		minWidth: 170,
		fontSize: 16,
		fontWeight: '500'
	},
	data: {
		borderWidth: 1,
		color: '#000000',
		marginHorizontal: 10,
		textAlign: 'center',
		width: 100,
		height: 30,
		lineHeight: 30
	},
	notes: {
		marginTop: 10,
		borderWidth: 1,
		width: '100%',
		height: 40,
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
	},
});
