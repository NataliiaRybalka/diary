import { Routes, Route, Outlet, Link } from 'react-router-dom';

import ChangingPassword from './components/user/ChangingPassword';
import Home from './components/Home';
import Login from './components/user/Login';
import Registration from './components/user/Registration';
import RestorePassword from './components/user/RestorePassword';

import logo from './img/logo.png';
import './App.css';

function App() {
	return (
		<div className="App">
			<header>
				<img src={logo} alt='Dear Diary' className='logo' />

				<div>
					<nav>
						<ul>
							<li className='mainNavLi'><Link to="/">Home</Link></li>
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
					<Route index element={<Home />} />
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