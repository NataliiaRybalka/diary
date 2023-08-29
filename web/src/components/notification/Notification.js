import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SERVER } from '../../lib/constants';

import './Notification.css';

function Notification({ user }) {
	const { t } = useTranslation();

	const [notifications, setNotifications] = useState({
		morning: {
			send: true,
			time: '08:00',
		},
		evening: {
			send: true,
			time: '08:00',
		},
		day_plan: {
			send: true,
		},
	});
	const [err, setErr] = useState(null);

	const onChangeInput = (e) => {
		if (e.target.type === 'checkbox') {
			return setNotifications(prev => ({
				...prev,
				...{
					[e.target.name]: {
						send: e.target.checked,
						time: notifications[e.target.name].time,
					}
				}
			}));
		}

		return setNotifications(prev => ({
			...prev,
			...{
				[e.target.name]: {
					send: notifications[e.target.name].send,
					time: e.target.value,
				}
			}
		}));
	}

	const updateNotification = async() => {
		console.log(notifications);
		// const resp = await fetch(`${SERVER}/user/${user?.id}`, {
		// 	method: 'PUT',
		// 	body: JSON.stringify({
		// 		username: user?.username,
		// 		email: user?.email,
		// 	}),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });

		// const data = await resp.json();
		// if (resp.status !== 201) setErr(JSON.stringify(data));
	};

	return (
		<div className="center notification">
			<h2>{t('Set up notifications')}</h2>
			<div className='form'>
				<div className='checkboxDelete'>
					<label>{t('Fill in the morning diary')}</label> 
					<input type='checkbox' name='morning' checked={notifications.morning.send} onChange={e => onChangeInput(e)} />
					<input type='time' name='morning' value={notifications.morning.time} className='timeInput' onChange={e => onChangeInput(e)} />
				</div>
				<div className='checkboxDelete'>
					<label>{t('Fill in the evening diary')}</label> 
					<input type='checkbox' name='evening' checked={notifications.evening.send} onChange={e => onChangeInput(e)} />
					<input type='time' name='evening' value={notifications.evening.time} className='timeInput' onChange={e => onChangeInput(e)} />
				</div>
				<div className='checkboxDelete'>
					<label>{t('Scheduled Task')}</label> 
					<input type='checkbox' name='day_plan' checked={notifications.day_plan.send} onChange={e => onChangeInput(e)} />
				</div>
				{err && <p className='pError'>{err}</p>}
				<button className='submit restoreSubmit notificationSubmit' onClick={updateNotification}>{t('Update')}</button>
			</div>
		</div>
	);
};

export default Notification;