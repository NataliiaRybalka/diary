import { StyleSheet, Text, Button, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { changeBg } from '../../redux/bgColour.slice';
import { changeLang } from '../../redux/language.slice';

function HomeScreen({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Button
		  onPress={() => navigation.navigate('Notifications')}
		  title="Go to notifications"
		/>
	  </View>
	);
  }
  
  function NotificationsScreen({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Button onPress={() => navigation.goBack()} title="Go back home" />
	  </View>
	);
}

function HeaderMenu() {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const chooseLanguage = (e) => {
		localStorage.setItem('lang', e.target.value);
		dispatch(changeLang(e.target.value));
    };

	const selectColour = (e) => {
		dispatch(changeBg(e.target.value));
		localStorage.setItem('bgColour', e.target.value);
	};

	const logout = () => {
		localStorage.removeItem('user');
		window.location = '/signin';
	};

	return (
		<View>
			<Text>hello</Text>
		</View>
		// <ScrollView>
		// 	<SectionList>
		// 				{user && <li className='mainNavLi'>
		// 					<Link to="/my-diary">{t('My Diary')}</Link>
		// 				</li>}
		// 				{user && <li className='mainNavLi'>
		// 					<Link to="/metaphorical-cards">{t('Metaphorical Cards')}</Link>
		// 				</li>}
		// 				{user && <li className='mainNavLi'>
		// 					<Link to="/">{user.username}</Link>
		// 				</li>}
		// 				<li className='mainNavLi'>
		// 					{!user 
		// 						? <Link to="/signin">{t('Sign in')}</Link>
		// 						: <button className='logoutBtn' onClick={logout}>{t('Log out')}</button>
		// 					}
		// 				</li>
		// 				<li className='mainNavLi'>
		// 					<select className='chooseLanguage' style={{ backgroundColor: bgColour }} defaultValue={language} onChange={e => chooseLanguage(e)}>
		// 						<option value='en'>en</option>
		// 						<option value='ru'>ru</option>
		// 						<option value='ua'>ua</option>
		// 					</select>
		// 				</li>
		// 				<li className='mainNavLi'>
		// 					<select className='selectColorBtn' style={{ backgroundColor: bgColour }} defaultValue={bgColour} onChange={e => selectColour(e)} >
		// 						<option value='#ffe5cc' style={{ backgroundColor: '#ffe5cc' }}></option>
		// 						<option value='#eebeed' style={{ backgroundColor: '#eebeed' }}></option>
		// 						<option value='#cae6f7' style={{ backgroundColor: '#cae6f7' }}></option>
		// 						<option value='#d0fbd9' style={{ backgroundColor: '#d0fbd9' }}></option>
		// 						<option value='#f1f9b4' style={{ backgroundColor: '#f1f9b4' }}></option>
		// 					</select>
		// 				</li>
		// 			</SectionList>
		// </ScrollView>
	);
};

const styles = StyleSheet.create({
	footer: {
		position: 'absolute',
		right: 0,
		bottom: 0,
	},
});


export default HeaderMenu;
