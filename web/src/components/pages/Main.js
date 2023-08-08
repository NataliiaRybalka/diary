import { Routes, Route } from 'react-router-dom';

import ChangingPassword from '../user/ChangingPassword';
import DeletingAccount from '../user/DeletingAccount';
import Login from '../user/Login';
import Registration from '../user/Registration';
import RestoringPassword from '../user/RestoringPassword';
import User from '../user/User';

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
			</Routes>
		</main>
	);
};

export default Main;
