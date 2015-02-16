/** @jsx React.DOM */

var app = app || {};

var App = React.createClass({
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
			<div className="content">
				<Header showing={showing} />
				<div className="bodyContainer">
					{window[showing]()}
				</div>
			</div>
		);
	}
});
