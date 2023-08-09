import { useTranslation } from 'react-i18next';

import Menu from './Menu';

function Results() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Results')}</h1>

			<Menu />
		</div>
	);
};

export default Results;