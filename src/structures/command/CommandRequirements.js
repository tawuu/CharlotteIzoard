const { Permissions } = require('discord.js');

const parseOptions = function (options = {}) {
	return {
		botPermissions: options.botPermissions || [],
	  	permissions: options.permissions || [],


	  	onlyDevs: !!options.onlyDevs || false ,
	}
}
const handleRequirements = function ({ author, channel, client, guild, member, me, t, dbBot }, options) {
	let opt = parseOptions(options);

	if (opt.onlyDevs && !dbBot.staffers.owners.includes(author.id)){
		throw new Error(t('permissions:onlyDevelopers'));
	}

	if (opt.botPermissions && !opt.botPermissions.lenght > 0) {
		if (!me.permissions.has(opt.botPermissions)) throw new Error(t('permissions:meWithoutPermission', {
				perms: opt.botPermissions.map(a => new Permissions(a).toArray()[0]).join(', ')
			}));
		
	}
	if (opt.permissions && !opt.permissions.lenght > 0) {
		if (!member.permissions.has(opt.permissions)) {
			throw new Error(t('permissions:missingPermissions', {
				perms: opt.permissions.map(a => new Permissions(a).toArray()[0]).join(', ')
			}))
		}
	}
}
module.exports = {
	handleRequirements
}