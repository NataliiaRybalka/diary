import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import './MyDiary.css';

function Menu() {
	const { t } = useTranslation();

	const bgColour = localStorage.getItem('bgColour');

	return (
		<div className="dropdown">
			<button className="mainmenubtn" style={{ backgroundColor: bgColour }}>{t('Menu')}</button>
			<div className="dropdown-child" style={{ backgroundColor: bgColour }}>
				<Link to="/my-diary/week-plans">{t('Week Plans')}</Link>
				<Link to="/my-diary/diary">{t('Diary')}</Link>
				<Link to="/my-diary/month-results">{t('Month Results')}</Link>
				<Link to="/my-diary/results">{t('Results')}</Link>
				<Link to="/my-diary/menstrual-cycle">{t('Menstrual Cycle')}</Link>
			</div>
		</div>
	);
};

export default Menu;