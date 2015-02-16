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
		{ label: 'Chuggin Stories', value: app.STORIES }
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

var CreateMixin = {
	update_subject: function(event) {
		this.setState({ subject: event.target.value });
	},
	update_body: function(event) {
		this.setState({ body: event.target.value });
	},
	update_tags: function(event) {
		var str = event.target.value.replace(/^\s+/,'').replace(/\s+$/,'');
		this.setState({ tags: str.split(/\s*,\s*/g) });
	},
	create_form: function(additional_fields) {
		var status_style = {};
		if (!this.state.status) {
			status_style.display = 'none';
		}
		additional_fields = additional_fields || [];
		return (
			React.DOM.div({className: "create_form"}, 
				React.DOM.div({style: status_style, className: this.state.status}, 
					this.state.status_msg
				), 
				React.DOM.form({onSubmit: this.form_submit}, 
					React.DOM.input({
						type: "text", 
						className: "full_width block", 
						placeholder: "Subject", 
						onChange: this.update_subject}
					), 
					React.DOM.textarea({
						name: "body", 
						className: "full_width med_height block", 
						onChange: this.update_body}
					), 
					React.DOM.input({
						type: "text", 
						placeholder: "Tags", 
						className: "full_width block", 
						onChange: this.update_tags}
					), 
					additional_fields, 
					React.DOM.button(null, "Add Entry")
				)
			)
		);
	}
};

/** @jsx React.DOM */

var app = app || {};

var Products = React.createClass({displayName: 'Products',
	render: function() {
		return (
			React.DOM.form(null
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Stories = React.createClass({displayName: 'Stories',
	render: function() {
		return (
			React.DOM.form(null
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Private_Chugs = React.createClass({displayName: 'Private_Chugs',
	mixins: [CreateMixin],
	getInitialState: function() {
		return { tags: [], subject: '', body: '', status: '', status_msg: '', created_at: +new Date() };
	},
	form_submit: function() {
		var that = this;
		$.ajax(
			'/private/create_chug',
			{
				accepts: 'application/json',
				contentType: 'application/json',
				type: 'POST',
				data: JSON.stringify({ 
					subject: this.state.subject,
					body: this.state.body,
					tags: this.state.tags
				})
			}
		).done(function(data) {
			that.setState({ 
				status: 'success', 
				status_msg: 'Successfully Created Chug', 
				subject: '',
				body: '',
				tags: []
			});
			$('input').val('');
			$('textarea').val('');
		}).fail(function(data) {
			that.setState({ status: 'fail', status_msg: data.responseJSON.error });
		});
		return false;
	},
	render: function() {
		var create_form = this.create_form();
		return (
			React.DOM.div({className: "body"}, 
				React.DOM.h1(null, "Secret Chugs Blog Entry"), 
				create_form, 
				React.DOM.div({className: "preview"}, 
					React.DOM.span({className: "label"}, "Preview"), 
					Chug({
						subject: this.state.subject, 
						body: this.state.body, 
						tags: this.state.tags, 
						created_at: this.state.created_at}
					)
				), 
				Chugs(null)
			)
		);
	}
});

/** @jsx React.DOM */

var app = app || {};

var Private_HowTos = React.createClass({displayName: 'Private_HowTos',
	mixins: [CreateMixin],
	getInitialState: function() {
		return { tags: [], subject: '', body: '', status: '', status_msg: '', created_at: +new Date() };
	},
	form_submit: function() {
		var that = this;
		$.ajax(
			'/private/create_howto',
			{
				accepts: 'application/json',
				contentType: 'application/json',
				type: 'POST',
				data: JSON.stringify({ 
					subject: this.state.subject,
					body: this.state.body,
					tags: this.state.tags
				})
			}
		).done(function(data) {
			that.setState({ 
				status: 'success', 
				status_msg: 'Successfully Created How To', 
				subject: '',
				body: '',
				tags: []
			});
			$('input').val('');
			$('textarea').val('');
		}).fail(function(data) {
			that.setState({ status: 'fail', status_msg: data.responseJSON.error });
		});
		return false;
	},
	render: function() {
		var status_style = {};
		if (!this.state.status) {
			status_style.display = 'none';
		}
		var create_form = this.create_form();
		return (
			React.DOM.div({className: "body"}, 
				React.DOM.h1(null, "Secret Chugs How To Entry"), 
				create_form, 
				React.DOM.div({className: "preview"}, 
					React.DOM.span({className: "label"}, "Preview"), 
					HowTo({
						subject: this.state.subject, 
						body: this.state.body, 
						tags: this.state.tags, 
						created_at: this.state.created_at}
					)
				), 
				HowTos(null)
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

var Products = React.createClass({displayName: 'Products',
	render: function() {
		return (
			React.DOM.div({className: "products body"})
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
				'HowTos': 'howtos'
			},
			chugs: this.setState.bind(this, { nowShowing: app.CHUGS }),
			products: this.setState.bind(this, { nowShowing: app.PRODUCTS }),
			stories: this.setState.bind(this, { nowShowing: app.STORIES }),
			howtos: this.setState.bind(this, { nowShowing: app.HOWTOS })
		});
		new Router();
		Backbone.history.start();
	},
	render: function() {
		var showing = this.state.nowShowing || "Chugs";
		showing = 'Private_' + showing;
		return (
			React.DOM.div({className: "content"}, 
				Header({showing: showing}), 
				React.DOM.div({className: "bodyContainer"}, 
					window[showing]()
				)
			)
		);
	}
});
