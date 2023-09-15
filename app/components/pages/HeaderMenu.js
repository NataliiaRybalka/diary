import { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { changeBg } from '../../redux/bgColour.slice';
import { changeLang } from '../../redux/language.slice';

function HomeScreen({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Home</Text>
	  </View>
	);
  }
  
  function NotificationsScreen({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>NotificationsScreen</Text>
	  </View>
	);
}

const menu = require ('../../img/menu.png');
const close = require ('../../img/close.png');

function HeaderMenu({ user }) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const [isOpenMenu, setIsOpenMenu] = useState(false);
	const menuList = user ? [
		{key: 'My Diary'},
		{key: 'Metaphorical Cards'},
		{key: user?.username},
		{key: 'Log out'},
	] : [
		{key: 'Sign in'},
	];

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
		<View style={styles.headerMenu}>
			<TouchableOpacity onPress={() => setIsOpenMenu(!isOpenMenu)}>
				{!isOpenMenu
					? <Image source={menu} style={styles.menuLogo} />
					: <Image source={close} style={styles.menuLogo} />
				}
			</TouchableOpacity>
			{isOpenMenu && <View>
				<FlatList  data={menuList}
					renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>} />
			</View>}
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
	menuLogo: {
		height: 35,
		width: 35,
	}
});


export default HeaderMenu;
