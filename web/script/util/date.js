var date_util = {
	months: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
	pretty: function(date) {
		var hrs = date.getHours();
		var ampm = 'am';
		if (hrs === 12) {
			ampm = 'pm';
		}
		else if (hrs > 12) {
			ampm = 'pm';
			hrs -= 12;
		}
		if (hrs < 10) { hrs = '0' + hrs; }
		var mins = date.getMinutes();
		if (mins < 10) { mins = '0' + mins; }
		return date_util.months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() + ' ' + hrs + ':' + mins + ampm;
	}
};
