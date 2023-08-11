import { useTranslation } from 'react-i18next';

import Menu from './Menu';

function MenstrualCycle() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Menstrual Cycle')}</h1>

			<Menu />
		</div>
	);
};

export default MenstrualCycle;