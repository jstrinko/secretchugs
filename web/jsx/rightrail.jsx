
/** @jsx React.DOM */

var app = app || {};

var RightRail = React.createClass({
	render: function() {
		return (
			<div className="rightrail"><RightRailSection>This is the right rail</RightRailSection></div>
		);
	}
});

var RightRailSection = React.createClass({
	render: function() {
		return (
			<div className="rightrailsection">{this.props.children.toString()}</div>
		)
	}
});
