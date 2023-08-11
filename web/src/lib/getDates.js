const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export const getMonday = (today) => {
	today = new Date(today);
	const nToday = today.getDay();
	const diff = today.getDate() - nToday + (nToday === 0 ? -6 : 1);
	return new Date(today.setDate(diff));
};

export const getWeekDays = (lang) => {
	const week = [];
	const mon = getMonday(new Date());
	week.push(mon.toLocaleDateString(lang, options));
	let i = 1;
	while (i < 7) {
		let newDate = new Date(mon.getTime());
		newDate.setDate(mon.getDate() + i);
		newDate = newDate.toLocaleDateString(lang, options);
		week.push(newDate);
		i++;
	}

	return week;
};

export const getToday = (lang) => {
	const today = new Date();
	return today.toLocaleDateString(lang, options);
};
