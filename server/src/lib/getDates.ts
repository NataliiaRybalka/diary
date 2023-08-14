const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as any;
const monthOptions = { year: 'numeric', month: 'long' } as any;

export const getWeekDays = (monday: string) => {
	const week = [];
	const mon = new Date(monday) as Date;
	week.push(mon.toLocaleDateString('en', options));
	let i = 1;
	while (i < 7) {
		let newDate = new Date(mon.getTime()) as Date;
		newDate.setDate(mon.getDate() + i);
		const newDateStr = newDate.toLocaleDateString('en', options) as String;
		week.push(newDateStr);
		i++;
	}

	return week;
};

export const getMonth = (month: string) => {
	const date = new Date(month);
	let newDate = date.toLocaleDateString('en', monthOptions) as String;
	return newDate.split(' ');
};
