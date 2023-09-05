import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

function AdminMetaphoricalCards() {
	const { t } = useTranslation();

	return (
		<div>
			<h2>{t('List of Cards')}</h2>
			
		</div>
	);
}

export default AdminMetaphoricalCards;