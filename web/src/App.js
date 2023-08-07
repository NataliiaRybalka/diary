import { Routes, Route, Outlet, Link } from 'react-router-dom';

import Registration from './components/user/Registration';
import Login from './components/user/Login';

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

function Home() {
	return (
		<div>
			<h2>Home</h2>
		</div>
	);
}