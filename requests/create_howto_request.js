var fast_bindall = require(process.env.SRCTOP + '/fast-bindall/lib/fast-bindall'),
	async = require('async'),
	base_request = require(process.env.SRCTOP + '/strouter/lib/base-request'),
	_ = require('underscore');

var Create_Howto_Request = function(options) {
	_.extend(this, options);
	fast_bindall(this);
};

_.extend(Create_Howto_Request.prototype, base_request.prototype, {
	fulfill: function() {
		async.series([
			this.validate_request,
			this.insert_row,
			this.build_response
		], this.respond);
	},
	validate_request: function(callback) {
		var data = this.req.body;
		if (!data.body || !data.subject) {
			return callback("Required subject and body");
		}
		process.nextTick(callback);
	},
	insert_row: function(callback) {
		var record = _.extend({}, this.req.body, {
			created_at: +new Date()
		});
		this.server.insert_record(
			'howtos',
			record,
			callback
		);
	},
	build_response: function(callback) {
		delete this.server.caches.howtos;
		this.response = { status: "Ok" };
		process.nextTick(callback);
	}
});

module.exports = Create_Howto_Request;
