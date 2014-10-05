var fast_bindall = require(process.env.SRCTOP + '/fast-bindall/lib/fast-bindall'),
	async = require('async'),
	_ = require('underscore'),
	logger = require(process.env.SRCTOP + '/logger/lib/logger'),
	strouter_server = require(process.env.SRCTOP + '/strouter/lib/base-server');

var Secretchugs = function() {
	this.type = 'Secretchugs';
	strouter_server.prototype.constructor.call(this);
};

(new logger({
	filename: 'secretchugs-%Y%m%d.log', 
	console: false,
	symlink: 'secretchugs.log'
})).extend(Secretchugs.prototype);

_.extend(Secretchugs.prototype, strouter_server.prototype, {
	routes: require(process.env.SRCTOP + '/secretchugs/config/routes.json')
});

module.exports = Secretchugs;
