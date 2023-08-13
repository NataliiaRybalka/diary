import { useTranslation } from 'react-i18next';

import Menu from './Menu';

import './MenstrualCycle.css';

function MenstrualCycle() {
	const { t } = useTranslation();

	return (
		<div>
			<h1>{t('Menstrual Cycle')}</h1>

			<Menu />

			<table>
				<thead>
					<tr>
						<td>{t('Month')}</td>
						<td>{t('Start Date')}</td>
						<td>{t('End Date')}</td>
						<td>{t('Duration of Menstruation')}</td>
						<td>{t('Duration of Cycle')}</td>
						<td>{t('Ovulation')}</td>
						<td>{t('Emotional State Notes')}</td>
						<td>{t('Notes')}</td>
					</tr>
				</thead>

				<tbody></tbody>
			</table>
		</div>
	);
};

export default MenstrualCycle;