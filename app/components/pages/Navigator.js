import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';

import i18n from '../../i18n';
import { changeBg } from '../../redux/bgColour.slice';
import { changeLang } from '../../redux/language.slice';
import { SERVER } from '../../lib/constants';

const logo = require ('../../img/logo-circle.png');

function HomeScreen({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Home</Text>
	  </View>
	);
  }
  
  function Feed({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Feed</Text>
	  </View>
	);
}

function CustomDrawerContent(props) {
	return (
	  <DrawerContentScrollView {...props}>
		<DrawerItemList {...props} />
		<DrawerItem label="Help" onPress={() => alert('Link to help')} />
	  </DrawerContentScrollView>
	);
  }

const Drawer = createDrawerNavigator();

function Navigator({ user, bgColour }) {
	const { t } = useTranslation();

	const language = useSelector(state => state.language.value);
	// const bgColour = useSelector(state => state.bgColour.value);
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

	const setBgColor = async () => await AsyncStorage.setItem('bgColour', bgColour);
	const setLang = async () => await AsyncStorage.setItem('lang', language);

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

	// const sendLanguage = async () => {
	// 	if (!user) return;

	// 	const resp = await fetch(`${SERVER}/user/${user.id}`, {
	// 		method: 'PUT',
	// 		body: JSON.stringify({language}),
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 		},
	// 	});

	// 	if (resp.status === 201) localStorage.setItem('lang', language);
	// };

	useEffect(() => {
        i18n.changeLanguage(language);
		setLang();
		// sendLanguage();
	}, [language]);

	useEffect(() => {
		setBgColor();
	}, [bgColour]);

	return (
		// 	<Image source={logo} style={styles.logo} />
		<NavigationContainer>
			{user
				? <Drawer.Navigator
					drawerContent={(props) => <CustomDrawerContent {...props} />}
				>
					<Drawer.Screen name={t('My Diary')} component={Feed} />
					<Drawer.Screen name={t('Metaphorical Cards')} component={HomeScreen} />
					<Drawer.Screen name={user.username} component={HomeScreen} />
					<Drawer.Screen name={t('Log out')} component={HomeScreen} />
				</Drawer.Navigator>
				: <Drawer.Navigator
					drawerContent={(props) => <CustomDrawerContent {...props} />}
				>
					<Drawer.Screen name={t('Sign in')} component={HomeScreen} />
				</Drawer.Navigator>
			}
			
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 10,
		paddingRight: 10,
	},
	logo: {
		height: 40,
		width: 40,
	}
});

export default Navigator;


				{/* {user && <li className='mainNavLi'>
							<Link to="/my-diary">{t('My Diary')}</Link>
						</li>}
						{user && <li className='mainNavLi'>
							<Link to="/metaphorical-cards">{t('Metaphorical Cards')}</Link>
						</li>}
						{user && <li className='mainNavLi'>
							<Link to="/">{user.username}</Link>
						</li>}
						<li className='mainNavLi'>
							{!user 
								? <Link to="/signin">{t('Sign in')}</Link>
								: <button className='logoutBtn' onClick={logout}>{t('Log out')}</button>
							}
						</li>
						<li className='mainNavLi'>
							<select className='chooseLanguage' style={{ backgroundColor: bgColour }} defaultValue={language} onChange={e => chooseLanguage(e)}>
								<option value='en'>en</option>
								<option value='ru'>ru</option>
								<option value='ua'>ua</option>
							</select>
						</li>
						<li className='mainNavLi'>
							<select className='selectColorBtn' style={{ backgroundColor: bgColour }} defaultValue={bgColour} onChange={e => selectColour(e)} >
								<option value='#ffe5cc' style={{ backgroundColor: '#ffe5cc' }}></option>
								<option value='#eebeed' style={{ backgroundColor: '#eebeed' }}></option>
								<option value='#cae6f7' style={{ backgroundColor: '#cae6f7' }}></option>
								<option value='#d0fbd9' style={{ backgroundColor: '#d0fbd9' }}></option>
								<option value='#f1f9b4' style={{ backgroundColor: '#f1f9b4' }}></option>
							</select>
						</li> */}