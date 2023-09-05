import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

function MetaphoricalCards({user}) {
	const { t } = useTranslation();

	return (
		<div>
			<h2>{t('Metaphorical Cards')}</h2>
			
		</div>
	);
}

export default MetaphoricalCards;