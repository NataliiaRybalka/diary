import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { SERVER } from '../../lib/constants';

import logo from '../../img/logo.png';

function Header({ user }) {
	const { t } = useTranslation();

	const lang = localStorage.getItem('lang');
	const [selectedLanguage, setSelectedLanguage] = useState(lang || 'en');

	const chooseLanguage = (e) => {
		e.preventDefault();
        setSelectedLanguage(e.target.value);
		localStorage.setItem('lang', e.target.value);
    };

	useEffect(() => {
        i18n.changeLanguage(lang);
		sendLanguage();
	}, [selectedLanguage]);

	const sendLanguage = async () => {
		if (!user) {
			return localStorage.setItem('lang', 'en');
		}

		const resp = await fetch(`${SERVER}/user/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify({language: selectedLanguage}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (resp.status === 201) localStorage.setItem('lang', selectedLanguage);
	};

	const logout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

	return (
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
								? <Link to="/signin">{t('Sign in')}</Link>
								: <button className='logoutBtn' onClick={logout}>{t('Log out')}</button>
							}
						</li>
						<li className='mainNavLi'>
							<select defaultValue={selectedLanguage} onChange={e => chooseLanguage(e)}>
								<option value='en'>en</option>
								<option value='ru'>ru</option>
								<option value='ua'>ua</option>
							</select>
						</li>
					</ul>
				</nav>

				<hr />
				<Outlet />
			</div>
		</header>
	);
};

export default Header;
