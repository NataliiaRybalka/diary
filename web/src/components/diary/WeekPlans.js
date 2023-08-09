import { useTranslation } from 'react-i18next';

import Menu from './Menu';

function WeekPlans() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Week Plans')}</h1>

			<Menu />
		</div>
	);
};

export default WeekPlans;