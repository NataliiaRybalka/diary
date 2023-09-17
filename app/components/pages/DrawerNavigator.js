import { useTranslation } from 'react-i18next';
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { changeUser } from '../../redux/user.slice';
import Dropdown from './Dropdown';
import Login from '../user/Login';

const Drawer = createDrawerNavigator();

function LogoutDrawerContent(props) {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const logout = async () => {
		dispatch(changeUser(null));
		await AsyncStorage.removeItem('user');
	};

	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<DrawerItem label={t('Log out')} onPress={() => logout()} activeTintColor='#000000' inactiveTintColor='#000000' />
			<Dropdown data={['en', 'ru', 'ua']} entity={'lang'} dispatchFuncName={'changeLang'} />
			<Dropdown data={['#ffe5cc', '#eebeed', '#cae6f7', '#d0fbd9', '#f1f9b4']} entity={'bgColour'} dispatchFuncName={'changeBg'} />
		</DrawerContentScrollView>
	);
}

function CustomDrawerContent(props) {
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			<Dropdown data={['en', 'ru', 'ua']} entity={'lang'} dispatchFuncName={'changeLang'} />
			<Dropdown data={['#ffe5cc', '#eebeed', '#cae6f7', '#d0fbd9', '#f1f9b4']} entity={'bgColour'} dispatchFuncName={'changeBg'} />
		</DrawerContentScrollView>
	);
}

function DrawerNavigator() {
	const { t } = useTranslation();
	const bgColour = useSelector(state => state.bgColour.value);
	const user = useSelector(state => state.user.value);
	
	return (
		<Drawer.Navigator drawerContent={(props) => (
				user ? <LogoutDrawerContent {...props} /> : <CustomDrawerContent {...props} />
			)}
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
					<Drawer.Screen name={t('My Diary')} component={Login} />
					<Drawer.Screen name={t('Metaphorical Cards')} component={Login} />
					<Drawer.Screen name={user.username} component={Login} />
				</>
				: <>
					<Drawer.Screen name={t('Sign in')} component={Login} headerTitle={t('Login')} />
				</>
			}
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;