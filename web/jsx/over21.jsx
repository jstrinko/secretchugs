/** @jsx React.DOM */

var app = app || {};
app.months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

var Over21 = React.createClass({
	form_submit: function() {
		var month = $('select[name=Month]').val();
		var day = $('select[name=Day]').val();
		var year = $('select[name=Year]').val();
		var dob = new Date(year, month, day);
		var now = new Date();
		var age_in_ms = now - dob;
		var twenty_one = 21 * 365 * 24 * 60 * 60 * 1000;
		var this_year = now.getFullYear();
		var leaps = 0;
		for(var x=0; x<21; x++) {
			var test_year = this_year - x;
			if (((test_year % 4 === 0) && (test_year % 100 !== 0)) || (test_year % 400 === 0)) {
				leaps++;
			}
		}
		twenty_one += leaps * 24 * 60 * 60 * 1000;
		if (age_in_ms > twenty_one) {
			$.cookie('age-verified', true)
			window.location.reload();
		}
		else {
			window.location.href = '#Underage';
		}
		return false;
	},
	render: function() {
		var days = [];
		for(var x=1; x<32; x++) {
			days.push(<option value={x}>{x}</option>);
		}
		var years = [];
		for(var x=2010; x>1900; x--) {
			years.push(<option value={x}>{x}</option>);
		}
		var months = [];
		_.each(app.months, function(month, index) {
			months.push(<option value={index}>{month}</option>);
		});
		return (
			<div className="over21">
				<form onSubmit={this.form_submit}>
					<div className="birthdate">
						<div>Secret Chugs is an alcohol related website. Please confirm your birthdate.</div>
						<div>
							<select name="Month">
								{months}
							</select>
							<select name="Day">
								{days} 
							</select>
							<select name="Year">
								{years} 
							</select>
						</div>
						<div>
							<button>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		);
	}
});
