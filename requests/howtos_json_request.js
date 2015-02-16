var fast_bindall = require(process.env.SRCTOP + '/fast-bindall/lib/fast-bindall'),
	async = require('async'),
	base_request = require(process.env.SRCTOP + '/strouter/lib/base-request'),
	_ = require('underscore');

var Howtos_JSON_Request = function(options) {
	_.extend(this, options);
	fast_bindall(this);
};

_.extend(Howtos_JSON_Request.prototype, base_request.prototype, {
	fulfill: function() {
		async.series([
			this.build_cache,
			this.build_response
		], this.respond);
	},
	build_cache: function(callback) {
		var that = this;
		this.start = this.req.param('start') || 0;
		if (this.server.caches.howtos && this.server.caches.howtos[this.start]) {
			return process.nextTick(callback);
		}
		this.server.fetch_records(
			'howtos',
			{},
			{ limit: 20, skip: this.start, sort: { created_at: -1 } },
			function(error, items) {
				if (error) {
					return callback(error);
				}
				if (!that.server.caches.howtos) {
					that.server.caches.howtos = {};
				}
				that.server.caches.howtos[that.start] = items;
				process.nextTick(callback);
			}
		);
	},
	build_response: function(callback) {
		if (this.req.param('json')) {
			this.response = this.server.caches.howtos[this.start];
		}
		else {
			this.response = 
				"var app = app || {};" +
				"if (!app.caches) { app.caches = {}; }" +
				"if (!app.caches.howtos) { app.caches.howtos = {}; }" + 
				"app.caches.howtos['" + this.start + "'] = " + 
					JSON.stringify(this.server.caches.howtos[this.start]) + ";";
		}
		return process.nextTick(callback);
	}
});

module.exports = Howtos_JSON_Request;
