import { View, Image, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

import Dropdown from './Dropdown';

const logo = require ('../../img/logo-circle.png');

function HomeScreen({ navigation }) {
	const bgColour = useSelector(state => state.bgColour.value);

	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bgColour }}>
		<Text>Home</Text>
	  </View>
	);
  }
  
  function Feed({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bgColour }}>
		<Text>Feed</Text>
	  </View>
	);
}

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<Dropdown data={['en', 'ru', 'ua']} entity={'lang'} dispatchFuncName={'changeLang'} />
			<Dropdown data={['#ffe5cc', '#eebeed', '#cae6f7', '#d0fbd9', '#f1f9b4']} entity={'bgColour'} dispatchFuncName={'changeBg'} />
		</DrawerContentScrollView>
	);
}

function Navigator({ user, bgColour }) {
	const { t } = useTranslation();

	const logout = () => {
		localStorage.removeItem('user');
		window.location = '/signin';
	};

	return (
		// 	<Image source={logo} style={styles.logo} />
		<NavigationContainer>
			<Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}
				screenOptions={{
					drawerStyle: {
						backgroundColor: bgColour,
						width: 240,
					},
					drawerActiveTintColor: '#000000',
					drawerInactiveTintColor: '#000000',
				}}
			>
				{user 
					? <>
						<Drawer.Screen name={t('My Diary')} component={Feed} />
						<Drawer.Screen name={t('Metaphorical Cards')} component={HomeScreen} />
						<Drawer.Screen name={user.username} component={HomeScreen} />
						<Drawer.Screen name={t('Log out')} component={HomeScreen} />
					</>
					: <>
						<Drawer.Screen name={t('Sign in')} component={HomeScreen} />
					</>
				}
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

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
						</li>*/}