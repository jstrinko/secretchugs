/** @jsx React.DOM */

var app = app || {};

var Header = React.createClass({
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
				<Header_Section key={section.value} value={section.value} className={that.props.showing === section.value ? 'selected' : ''}>
					{section.label}
				</Header_Section>
			);
		});
		return (
			<div className="header">
				<ul>{header_sections}</ul>
			</div>
		);
	}
});

var Header_Section = React.createClass({
	render: function() {
		return (
			<li className={this.props.className}>
				<a href={ "#" + this.props.value }>{this.props.children.toString()}</a>
			</li>
		);
	}
});
