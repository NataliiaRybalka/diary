import { Routes, Route, Outlet, Link } from 'react-router-dom';

import ChangingPassword from './components/user/ChangingPassword';
import DeletingAccount from './components/user/DeletingAccount';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import RestoringPassword from './components/user/RestoringPassword';
import User from './components/user/User';

import logo from './img/logo.png';
import './App.css';

function App() {
	const user = JSON.parse(localStorage.getItem('user'));

	const logout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	}

	return (
		<div className="App">
			<header>
				<img src={logo} alt='Dear Diary' className='logo' />

				<div>
					<nav>
						<ul>
							<li className='mainNavLi'>
								<Link to="/">{user && user.username}</Link>
							</li>
							<li className='mainNavLi'>
								{!user 
									? <Link to="/signin">Sign in</Link>
									: <button className='logoutBtn' onClick={logout}>Log out</button>
								}
							</li>
						</ul>
					</nav>

					<hr />
					<Outlet />
				</div>
			</header>

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

			<footer>
				<div>
					<p className={'footerLink'}>
					<span>
						&copy; {new Date().getFullYear()}{" "}
						<a
						href="https://github.com/NataliiaRybalka"
						target="blank"
						>
						Nataliia Rybalka
						</a>
					</span>
					</p>
				</div>
			</footer>
		</div>
	);
}

export default App;