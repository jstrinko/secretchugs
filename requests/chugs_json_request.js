var fast_bindall = require(process.env.SRCTOP + '/fast-bindall/lib/fast-bindall'),
	async = require('async'),
	base_request = require(process.env.SRCTOP + '/strouter/lib/base-request'),
	_ = require('underscore');

var Chug_JSON_Request = function(options) {
	_.extend(this, options);
	fast_bindall(this);
};

_.extend(Chug_JSON_Request.prototype, base_request.prototype, {
	fulfill: function() {
		async.series([
			this.build_cache,
			this.build_response
		], this.respond);
	},
	build_cache: function(callback) {
		var that = this;
		this.start = this.req.param('start') || 0;
		if (this.server.caches.chugs && this.server.caches.chugs[this.start]) {
			return process.nextTick(callback);
		}
		this.server.fetch_records(
			'chugs',
			{},
			{ limit: 20, skip: this.start, sort: { created_at: -1 } },
			function(error, items) {
				if (error) {
					return callback(error);
				}
				if (!that.server.caches.chugs) {
					that.server.caches.chugs = {};
				}
				that.server.caches.chugs[that.start] = items;
				process.nextTick(callback);
			}
		);
	},
	build_response: function(callback) {
		if (this.req.param('json')) {
			this.response = this.server.caches.chugs[this.start];
		}
		else {
			this.response = 
				"var app = app || {};" +
				"if (!app.caches) { app.caches = {}; }" +
				"if (!app.caches.chugs) { app.caches.chugs = {}; }" + 
				"app.caches.chugs['" + this.start + "'] = " + 
					JSON.stringify(this.server.caches.chugs[this.start]) + ";";
		}
		return process.nextTick(callback);
	}
});

module.exports = Chug_JSON_Request;
