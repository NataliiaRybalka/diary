import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import i18n from '../../i18n';
import { SERVER } from '../../lib/constants';

import logo from '../../img/logo.png';

function Header({ user }) {
	const { t } = useTranslation();

	const lang = localStorage.getItem('lang');
	const bgColour = localStorage.getItem('bgColour');
	const [selectedLanguage, setSelectedLanguage] = useState(lang || 'en');
	const [selectedBgColour, setSelectedBgColour] = useState(bgColour || '#ffe5cc');

	const chooseLanguage = (e) => {
		e.preventDefault();
        setSelectedLanguage(e.target.value);
		localStorage.setItem('lang', e.target.value);
    };

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

	const selectColour = (e) => {
		setSelectedBgColour(e.target.value);
		localStorage.setItem('bgColour', e.target.value);
	};

	const logout = () => {
		localStorage.removeItem('user');
		window.location.reload();
	};

	useEffect(() => {
        i18n.changeLanguage(lang);
		sendLanguage();
	}, [selectedLanguage]);

	useEffect(() => {
		localStorage.setItem('bgColour', selectedBgColour);
		document.body.style.backgroundColor = selectedBgColour;
	}, [selectedBgColour]);

	return (
		<header>
			<img src={logo} alt='Dear Diary' className='logo' />

			<div>
				<nav>
					<ul>
						<li className='mainNavLi'>
							<Link to="/my-diary">{t('My Diary')}</Link>
						</li>
						<li className='mainNavLi'>
							<Link to="/metaphorical-cards">{t('Metaphorical Cards')}</Link>
						</li>
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
							<select className='chooseLanguage' style={{ backgroundColor: bgColour }} defaultValue={selectedLanguage} onChange={e => chooseLanguage(e)}>
								<option value='en'>en</option>
								<option value='ru'>ru</option>
								<option value='ua'>ua</option>
							</select>
						</li>
						<li className='mainNavLi'>
							<input type='color' name='bgColour' defaultValue={bgColour} onChange={e => selectColour(e)} />
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
