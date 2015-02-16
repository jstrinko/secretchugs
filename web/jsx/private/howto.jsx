/** @jsx React.DOM */

var app = app || {};

var Private_HowTos = React.createClass({
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
			<div className="body">
				<h1>Secret Chugs How To Entry</h1>
				{create_form}
				<div className="preview">
					<span className="label">Preview</span>
					<HowTo 
						subject={this.state.subject} 
						body={this.state.body} 
						tags={this.state.tags} 
						created_at={this.state.created_at}
					/>
				</div>
				<HowTos />
			</div>
		);
	}
});
