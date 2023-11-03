import { Routes, Route, useLocation } from 'react-router-dom';

import AdminTabs from '../metaphoricalCards/AdminTabs';
import ChangingPassword from '../user/ChangingPassword';
import DeletingAccount from '../user/DeletingAccount';
import Login from '../user/Login';
import MetaphoricalCards from '../metaphoricalCards/MetaphoricalCards';
import MyDiary from '../diary/MyDiary';
import Notification from '../notification/Notification';
import Registration from '../user/Registration';
import RestoringPassword from '../user/RestoringPassword';
import User from '../user/User';

import Day from '../diary/Day';
import MenstrualCycle from '../diary/MenstrualCycle';
import MonthResults from '../diary/MonthResults';
// import Results from '../diary/Results';
import WeekPlans from '../diary/WeekPlans';

import './Pages.css';

function Main({ user }) {

	return (
		<main>
			<Routes>
				<Route index element={<User user={user} />} />
				<Route path="signup" element={<Registration />} />
				<Route path="signin" element={<Login />} />
				<Route path="restore-password" element={<RestoringPassword />} />
				<Route path="refresh-password/:username" element={<ChangingPassword />} />
				<Route path="delete-account" element={<DeletingAccount user={user} />} />
				<Route path="notifications" element={<Notification user={user} />} />
				<Route path="/my-diary" element={<MyDiary />} />
				
				<Route path="/my-diary/week-plans" element={<WeekPlans />} />
				<Route path="/my-diary/diary" element={<Day />} />
				<Route path="/my-diary/month-results" element={<MonthResults />} />
				{/* <Route path="/my-diary/results" element={<Results />} /> */}
				<Route path="/my-diary/menstrual-cycle" element={<MenstrualCycle />} />

				<Route path="metaphorical-cards" element={
					JSON.parse(localStorage.getItem('user'))?.role === 'admin'
					? <AdminTabs />
					: <MetaphoricalCards />
				} />
			</Routes>
		</main>
	);
};

export default Main;
