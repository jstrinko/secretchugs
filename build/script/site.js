var app = app || {};
app.CHUGS = 'Chugs';
app.PRODUCTS = 'Products';
app.STORIES = 'Stories';
app.ABOUT = 'About';
app.CONTACT = 'Contact';
app.HOWTOS = 'HowTos';
app.UNDERAGE = 'Underage';

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

/** @jsx React.DOM */

var app = app || {};

var BackboneMixin = {
	componentDidMount: function() {
		this.getBackboneCollections().forEach(function(collection) {
			collection.on('add remove change', this.forceUpdate.bind(this, null));
		}, this);
	},
	componentWillUnmount: function() {
		this.getBackboneCollections().forEach(function(collection) {
			collection.off(null, null, this);
		}, this);
	}
};

/** @jsx React.DOM */

var app = app || {};

var Header = React.createClass({displayName: 'Header',
	sections: [
		{ label: 'Secret Chugs', value: app.CHUGS },
		{ label: 'How To', value: app.HOWTOS },
		{ label: 'Products', value: app.PRODUCTS },
		{ label: 'Chuggin Stories', value: app.STORIES },
		{ label: 'About', value: app.ABOUT },
		{ label: 'Contact Us', value: app.CONTACT }
	],
	render: function() {
		var that = this;
		var header_sections = this.sections.map(function(section) { 
			return (
				Header_Section({key: section.value, value: section.value, className: that.props.showing === section.value ? 'selected' : ''}, 
					section.label
				)
			);
		});
		return (
			React.DOM.div({className: "header"}, 
				React.DOM.ul(null, header_sections)
			)
		);
	}
});

var Header_Section = React.createClass({displayName: 'Header_Section',
	render: function() {
		return (
			React.DOM.li({className: this.props.className}, 
				React.DOM.a({href:  "#" + this.props.value}, this.props.children.toString())
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Chugs = React.createClass({displayName: 'Chugs',
	render: function() {
		var start = this.props.start || 0;
		var chugs = app.caches.chugs[start].map(function(chug) {
			return (
				Chug({
					subject: chug.subject, 
					body: chug.body, 
					tags: chug.tags, 
					created_at: chug.created_at, 
					id: chug._id, 
					key: chug._id}
				)
			);
		});
		console.warn(chugs);
		return (
			React.DOM.div({className: "chugs body"}, 
				chugs
			)
		);
	}
});

var Chug = React.createClass({displayName: 'Chug',
	render: function() {
		var tags = this.props.tags.map(function(tag) {
			var url = "#Tags/" + tag;
			return (
				React.DOM.li(null, React.DOM.a({href: url}, tag))
			);
		});
		var tags_insert = '';
		if (tags && tags.length > 0) {
			tags_insert = (
				React.DOM.div({className: "tagsContainer"}, 
					React.DOM.ul({className: "tags"}, tags)
				)
			);
		}
		var edit_uri = "#Edit_Chug/" + this.props.id;
		var edit_insert = app.can_edit && this.props.id ? (React.DOM.span(null, React.DOM.a({href: edit_uri}, "Edit"))) : '';
		var delete_uri = "#Delete_Chug/" + this.props.id;
		var delete_insert = app.can_delete && this.props.id ? (React.DOM.span(null, React.DOM.a({href: edit_uri}, "Delete"))) : '';
		var created_at = date_util.pretty(new Date(this.props.created_at));
		return (
			React.DOM.div({className: "chug"}, 
				React.DOM.div({className: "heading"}, 
					React.DOM.span({className: "created_at"}, 
						created_at
					), 
					React.DOM.span({className: "subject"}, 
						React.DOM.h2(null, this.props.subject)
					)
				), 
				React.DOM.div({className: "description", dangerouslySetInnerHTML: {__html: this.props.body}}), 
				tags_insert, edit_insert, delete_insert
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var About = React.createClass({displayName: 'About',
	render: function() {
		return (
			React.DOM.div({className: "about body"}, 
				React.DOM.h1(null, "Mission Statement"), 
				React.DOM.p(null, "Our mission is to inform fellow alcoholics of products to facilitate their bad habits while simultaneously giving the big Fuck You to event holders who price gouge the consumer on the purchase of alcoholic beverages. We've already paid through the nose for an event whose only purpose is to distract us from how shitty our lives are, why do you bend us over for a snap of liquor?"), 
				React.DOM.p(null, "No one likes paying $14 for a shitty light beer after paying $30 for parking and $100 per ticket at a sporting event. Secretchugs aims to empower the drinker to proclaim \"No more!\" to unreasonable prices. Together we can stop the raping, one chug at a time.")
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Contact = React.createClass({displayName: 'Contact',
	render: function() {
		return (
			React.DOM.div({className: "contact body"}, 
				React.DOM.h1(null, "Contact Us"), 
				React.DOM.p(null, 
					"Drunk? Still conscious? Full of questions? Need some answers?" + ' ' +
					"Give us a shout on", 
					' ', 
					React.DOM.a({target: "_blank", href: "https://twitter.com/secretchugs"}, 
						"twitter"
					), ",", 
					' ', 
					React.DOM.a({target: "_blank", href: "https://www.facebook.com/secretchugs"}, 
						"facebook"
					), ", or", 
					' ', 
					React.DOM.a({target: "_blank", href: "https://instagram.com/secretchugs"}, 
						"instagram"
					)
				)
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Products = React.createClass({displayName: 'Products',
	render: function() {
		return (
			React.DOM.div({className: "products body"})
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var HowTos = React.createClass({displayName: 'HowTos',
	render: function() {
		var start = this.props.start || 0;
		var howtos = app.caches.howtos[start].map(function(howto) {
			return (
				HowTo({
					subject: howto.subject, 
					body: howto.body, 
					tags: howto.tags, 
					created_at: howto.created_at, 
					id: howto._id, 
					key: howto._id}
				)
			);
		});
		return (
			React.DOM.div({className: "howtos body"}, 
				howtos
			)
		);
	}
});

var HowTo = React.createClass({displayName: 'HowTo',
	render: function() {
		var tags = this.props.tags.map(function(tag) {
			var url = "#Tags/" + tag;
			return (
				React.DOM.li(null, React.DOM.a({href: url}, tag))
			);
		});
		var tags_insert = '';
		if (tags && tags.length > 0) {
			tags_insert = (
				React.DOM.div({className: "tagsContainer"}, 
					React.DOM.ul({className: "tags"}, tags)
				)
			);
		}
		var edit_uri = "#Edit_HowTo/" + this.props.id;
		var edit_insert = app.can_edit && this.props.id ? (React.DOM.span(null, React.DOM.a({href: edit_uri}, "Edit"))) : '';
		var delete_uri = "#Delete_HowTo/" + this.props.id;
		var delete_insert = app.can_delete && this.props.id ? (React.DOM.span(null, React.DOM.a({href: edit_uri}, "Delete"))) : '';
		var created_at = date_util.pretty(new Date(this.props.created_at));
		return (
			React.DOM.div({className: "howto"}, 
				React.DOM.div({className: "heading"}, 
					React.DOM.span({className: "created_at"}, 
						created_at
					), 
					React.DOM.span({className: "subject"}, 
						React.DOM.h2(null, this.props.subject)
					)
				), 
				React.DOM.div({className: "description", dangerouslySetInnerHTML: {__html: this.props.body}}), 
				tags_insert, edit_insert, delete_insert
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Stories = React.createClass({displayName: 'Stories',
	render: function() {
		return (
			React.DOM.div({className: "stories body"})
		);
	}
});


/** @jsx React.DOM */

var app = app || {};

var RightRail = React.createClass({displayName: 'RightRail',
	render: function() {
		return (
			React.DOM.div({className: "rightrail"}, RightRailSection(null, "This is the right rail"))
		);
	}
});

var RightRailSection = React.createClass({displayName: 'RightRailSection',
	render: function() {
		return (
			React.DOM.div({className: "rightrailsection"}, this.props.children.toString())
		)
	}
});

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

var Over21 = React.createClass({displayName: 'Over21',
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
			days.push(React.DOM.option({value: x}, x));
		}
		var years = [];
		for(var x=2010; x>1900; x--) {
			years.push(React.DOM.option({value: x}, x));
		}
		var months = [];
		_.each(app.months, function(month, index) {
			months.push(React.DOM.option({value: index}, month));
		});
		return (
			React.DOM.div({className: "over21"}, 
				React.DOM.form({onSubmit: this.form_submit}, 
					React.DOM.div({className: "birthdate"}, 
						React.DOM.div(null, "Secret Chugs is an alcohol related website. Please confirm your birthdate."), 
						React.DOM.div(null, 
							React.DOM.select({name: "Month"}, 
								months
							), 
							React.DOM.select({name: "Day"}, 
								days
							), 
							React.DOM.select({name: "Year"}, 
								years
							)
						), 
						React.DOM.div(null, 
							React.DOM.button(null, 
								"Submit"
							)
						)
					)
				)
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var App = React.createClass({displayName: 'App',
	mixins: [BackboneMixin],
	getBackboneCollections: function() {
		return [];
	},
	getInitialState: function() {
		return { };
	},
	componentDidMount: function() {
		var Router = Backbone.Router.extend({
			routes: {
				'': 'chugs',
				'Chugs': 'chugs',
				'Products': 'products',
				'Stories': 'stories',
				'About': 'about',
				'Contact': 'contact',
				'HowTos': 'howtos',
				'Underage': 'underage'
			},
			chugs: this.setState.bind(this, { nowShowing: app.CHUGS }),
			products: this.setState.bind(this, { nowShowing: app.PRODUCTS }),
			stories: this.setState.bind(this, { nowShowing: app.STORIES }),
			about: this.setState.bind(this, { nowShowing: app.ABOUT }),
			contact: this.setState.bind(this, { nowShowing: app.CONTACT }),
			howtos: this.setState.bind(this, { nowShowing: app.HOWTOS })
		});
		new Router();
		Backbone.history.start();
	},
	render: function() {
		if (!$.cookie('age-verified')) {
			return (Over21(null));
		}
		var showing = this.state.nowShowing || "Chugs";
		return (
			React.DOM.div({className: "content"}, 
				Header({showing: showing}), 
				React.DOM.div({className: "bodyContainer"}, 
					RightRail(null), 
					window[showing]()
				)
			)
		);
	}
});
