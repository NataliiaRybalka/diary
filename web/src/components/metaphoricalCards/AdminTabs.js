import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import AddMetaphoricalCards from './AddMetaphoricalCards';
import AdminMetaphoricalCards from './AdminMetaphoricalCards';

import './Admin.css';

export const AdminTabs = () => {
	const { t } = useTranslation();

	const [currentTab, setCurrentTab] = useState('1');
	const tabs = [
		{
			id: 1,
			tabTitle: 'Add a card',
		},
		{
			id: 2,
			tabTitle: 'List of cards',
		},
	];

	const handleTabClick = (e) => {
		setCurrentTab(e.target.id);
	};

	return (
		<div className='adminTabs'>
			<div className='tabs'>
				{tabs.map((tab, i) =>
					<button key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{t(tab.tabTitle)}</button>
				)}
			</div>

			<div className='adminContent'>
				{currentTab === '1' && <AddMetaphoricalCards />}
				{currentTab === '2' && <AdminMetaphoricalCards />}
			</div>
		</div>
	);
};

export default AdminTabs;