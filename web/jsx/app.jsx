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
			return (<Over21 />);
		}
		var showing = this.state.nowShowing || "Chugs";
		return (
			<div className="content">
				<Header showing={showing} />
				<div className="bodyContainer">
					<RightRail />
					{window[showing]()}
				</div>
			</div>
		);
	}
});
