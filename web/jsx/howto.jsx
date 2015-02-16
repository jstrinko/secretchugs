/** @jsx React.DOM */

var app = app || {};

var HowTos = React.createClass({
	render: function() {
		var start = this.props.start || 0;
		var howtos = app.caches.howtos[start].map(function(howto) {
			return (
				<HowTo 
					subject={howto.subject} 
					body={howto.body} 
					tags={howto.tags} 
					created_at={howto.created_at}
					id={howto._id}
					key={howto._id}
				/>
			);
		});
		return (
			<div className="howtos body">
				{howtos}
			</div>
		);
	}
});

var HowTo = React.createClass({
	render: function() {
		var tags = this.props.tags.map(function(tag) {
			var url = "#Tags/" + tag;
			return (
				<li><a href={url}>{tag}</a></li>
			);
		});
		var tags_insert = '';
		if (tags && tags.length > 0) {
			tags_insert = (
				<div className="tagsContainer">
					<ul className="tags">{tags}</ul>
				</div>
			);
		}
		var edit_uri = "#Edit_HowTo/" + this.props.id;
		var edit_insert = app.can_edit && this.props.id ? (<span><a href={edit_uri}>Edit</a></span>) : '';
		var delete_uri = "#Delete_HowTo/" + this.props.id;
		var delete_insert = app.can_delete && this.props.id ? (<span><a href={edit_uri}>Delete</a></span>) : '';
		var created_at = date_util.pretty(new Date(this.props.created_at));
		return (
			<div className="howto">
				<div className="heading">
					<span className="created_at">
						{created_at}
					</span>
					<span className="subject">
						<h2>{this.props.subject}</h2>
					</span>
				</div>
				<div className="description" dangerouslySetInnerHTML={{__html: this.props.body}} />
				{tags_insert}{edit_insert}{delete_insert}
			</div>
		);
	}
});
