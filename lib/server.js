var fast_bindall = require(process.env.SRCTOP + '/fast-bindall/lib/fast-bindall'),
	async = require('async'),
	_ = require('underscore'),
	logger = require(process.env.SRCTOP + '/logger/lib/logger'),
	config = require(process.env.SRCTOP + '/config/lib/config'), 
	base_server = require(process.env.SRCTOP + '/strouter/lib/base-server');

var Secretchugs = function() {
	this.package_name = 'secretchugs';
	this.type = 'Secretchugs';
	this.config_files = { 
		routes: process.env.SRCTOP + '/secretchugs/config/routes.json'
	};
	this.load_config_files();
	this.routes = this.configuration.routes;
	base_server.prototype.constructor.call(this);
};

(new logger({
	filename: 'secretchugs-%Y%m%d.log', 
	console: false,
	symlink: 'secretchugs.log'
})).extend(Secretchugs.prototype);

_.extend(Secretchugs.prototype, base_server.prototype, config.prototype, {
});

module.exports = Secretchugs;
