/** @jsx React.DOM */

var app = app || {};

var Contact = React.createClass({
	render: function() {
		return (
			<div className="contact body">
				<h1>Contact Us</h1>
				<p>
					Drunk? Still conscious? Full of questions? Need some answers?
					Give us a shout on
					{' '} 
					<a target="_blank" href="https://twitter.com/secretchugs">
						twitter
					</a>,
					{' '} 
					<a target="_blank" href="https://www.facebook.com/secretchugs">
						facebook
					</a>, or
					{' '} 
					<a target="_blank" href="https://instagram.com/secretchugs">
						instagram
					</a>
				</p>
			</div>
		);
	}
});
