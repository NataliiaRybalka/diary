import { Routes, Route, useLocation } from 'react-router-dom';

import ChangingPassword from '../user/ChangingPassword';
import DeletingAccount from '../user/DeletingAccount';
import Login from '../user/Login';
import MyDiary from '../diary/MyDiary';
import Registration from '../user/Registration';
import RestoringPassword from '../user/RestoringPassword';
import User from '../user/User';

import Diary from '../diary/Diary';
import MenstrualCycle from '../diary/MenstrualCycle';
import MonthResults from '../diary/MonthResults';
import Results from '../diary/Results';
import WeekPlans from '../diary/WeekPlans';


function Main({ user }) {
	const { pathname } = useLocation();

	return (
		<main style={
			pathname === '/my-diary/menstrual-cycle' ? {
				width: '100%'
			} : {
				width: '80%'
			}
		}>
			<Routes>
				<Route index element={<User user={user} />} />
				<Route path="signup" element={<Registration />} />
				<Route path="signin" element={<Login />} />
				<Route path="restore-password" element={<RestoringPassword />} />
				<Route path="refresh-password/:username" element={<ChangingPassword />} />
				<Route path="delete-account" element={<DeletingAccount user={user} />} />
				<Route path="/my-diary" element={<MyDiary />} />
				
				<Route path="/my-diary/week-plans" element={<WeekPlans />} />
				<Route path="/my-diary/diary" element={<Diary />} />
				<Route path="/my-diary/month-results" element={<MonthResults />} />
				<Route path="/my-diary/results" element={<Results />} />
				<Route path="/my-diary/menstrual-cycle" element={<MenstrualCycle />} />
			</Routes>
		</main>
	);
};

export default Main;
