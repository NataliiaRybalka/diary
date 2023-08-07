import { Routes, Route, Outlet, Link, Navigate } from 'react-router-dom';

import ChangingPassword from './components/user/ChangingPassword';
import User from './components/user/User';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import RestorePassword from './components/user/RestorePassword';

import logo from './img/logo.png';
import './App.css';

function App() {
	let user = JSON.parse(localStorage.getItem('user'));

	return (
		<div className="App">
			<header>
				<img src={logo} alt='Dear Diary' className='logo' />

				<div>
					<nav>
						<ul>
							<li className='mainNavLi'>
								<Link to="/">
									{user ? user.username : !localStorage.getItem('user') && <Navigate replace to = '/signin' />}
								</Link>
							</li>
							<li className='mainNavLi'><Link to="/signup">Sign up</Link></li>
							<li className='mainNavLi'><Link to="/signin">Sign in</Link></li>
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
					<Route path="restore-password" element={<RestorePassword />} />
					<Route path="refresh-password/:username" element={<ChangingPassword />} />
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