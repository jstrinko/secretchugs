var fast_bindall = require(process.env.SRCTOP + '/fast-bindall/lib/fast-bindall'),
	async = require('async'),
	base_request = require(process.env.SRCTOP + '/strouter/lib/base-request'),
	_ = require('underscore');

var Page_Request = function(options) {
	_.extend(this, options);
};

_.extend(Page_Request.prototype, base_request.prototype, {
});

module.exports = Page_Request;
