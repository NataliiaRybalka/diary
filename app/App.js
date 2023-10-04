import 'react-native-gesture-handler';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

import i18n from './i18n';
import Card from './components/metaphoricalCards/Card';
import { changeBg } from './redux/bgColour.slice';
import { changeLang } from './redux/language.slice';
import { changeUser } from './redux/user.slice';
import ChangingPassword from './components/user/ChangingPassword';
import DeletingAccount from './components/user/DeletingAccount';
import DrawerNavigator from './components/pages/DrawerNavigator';
import Notification from './components/notification/Notification';
import Registration from './components/user/Registration';
import RestoringPassword from './components/user/RestoringPassword';
import store from './redux/store';
import Question from './components/metaphoricalCards/Question';
import UpdateMenstrualCycle from './components/diary/UpdateMenstrualCycle';
import UpdateWeekPlan from './components/diary/UpdateWeekPlan';
import User from './components/user/User';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

const Stack = createStackNavigator();

function App() {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	useEffect(() => {
		setLangAndColour();
	}, []);

	const setLangAndColour = async () => {
		let lang = await AsyncStorage.getItem('lang');
		if (!lang) lang = 'en';
		i18n.changeLanguage(lang);
		dispatch(changeLang(lang));

		let bgColour = await AsyncStorage.getItem('bgColour');
		if (!bgColour) bgColour = '#ffe5cc';
		dispatch(changeBg(bgColour));

		const user = await AsyncStorage.getItem('user');
		dispatch(changeUser(JSON.parse(user)));
	};

	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Root' component={DrawerNavigator} options={{ headerShown: false }} />
				<Stack.Screen name={t('Restore Password')} component={RestoringPassword} />
				<Stack.Screen name={t('Register')} component={Registration} />
				<Stack.Screen name={t('Set New Password')} component={ChangingPassword} />
				<Stack.Screen name={t('User')} component={User} />
				<Stack.Screen name={t('Set up notifications')} component={Notification} />
				<Stack.Screen name={t('Delete Account')} component={DeletingAccount} />
				<Stack.Screen name='Update Menstrual Cycle' component={UpdateMenstrualCycle} options={{ headerShown: false }} />
				<Stack.Screen name='Update Week Plan' component={UpdateWeekPlan} options={{ headerShown: false }} />
				<Stack.Screen name={t('Ask a Question')} component={Question} />
				<Stack.Screen name={t('Card')} component={Card} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
const AppWrapper = () => {

	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
}

export default AppWrapper;