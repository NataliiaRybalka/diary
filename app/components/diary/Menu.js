import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import Day from './Day';
import MenstrualCycle from './MenstrualCycle';
import MonthResults from './MonthResults';
import WeekPlans from './WeekPlans';

const planner = require('../../img/planner.png');
const diary = require('../../img/diary.png');
const result = require('../../img/result.png');
const menstrualCircle = require('../../img/menstrual-circle.png');

const Tab = createBottomTabNavigator();

function Menu() {
	const { t } = useTranslation();

	return (
		<Tab.Navigator>
			<Tab.Screen name={t('Week Plans')} component={WeekPlans} options={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarIcon: () => <Image source={planner} style={{
					height: 25,
					width: 25
				}} />
			}} />
			<Tab.Screen name={t('Diary')} component={Day} options={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarIcon: () => <Image source={diary} style={{
					height: 25,
					width: 25
				}} />
			}} />
			<Tab.Screen name={t('Month Results')} component={MonthResults} options={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarIcon: () => <Image source={result} style={{
					height: 25,
					width: 25
				}} />
			}} />
			<Tab.Screen name={t('Menstrual Cycle')} component={MenstrualCycle} options={{
				headerShown: false,
				tabBarShowLabel: false,
				tabBarIcon: () => <Image source={menstrualCircle} style={{
					height: 25,
					width: 25
				}} />
			}} />
		</Tab.Navigator>
	);
};

export default Menu;