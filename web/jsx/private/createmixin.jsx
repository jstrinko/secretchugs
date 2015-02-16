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
			<div className="create_form">
				<div style={status_style} className={this.state.status}>
					{this.state.status_msg}
				</div>
				<form onSubmit={this.form_submit}>
					<input 
						type="text" 
						className="full_width block" 
						placeholder="Subject"
						onChange={this.update_subject} 
					/>
					<textarea 
						name="body" 
						className="full_width med_height block" 
						onChange={this.update_body} 
					/>
					<input
						type="text"
						placeholder="Tags"
						className="full_width block"
						onChange={this.update_tags}
					/>
					{additional_fields}
					<button>Add Entry</button>
				</form>
			</div>
		);
	}
};
