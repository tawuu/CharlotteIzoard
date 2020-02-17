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

	if (!me.permissions.has("SEND_MESSAGES")) throw new Error(t("permissions:meWithoutPermission", {
		perms: `SEND_MESSAGES`
	}))

	if (opt.onlyDevs && !dbBot.staffers.owners.includes(author.id)){
		throw new Error(t('permissions:onlyDevelopers'));
	}

	if (opt.botPermissions && !opt.botPermissions.lenght > 0) {
		if (!channel.permissionsFor(me.id).has(opt.botPermissions)) throw new Error(t('permissions:meWithoutPermission', {
				perms: opt.botPermissions.map(a => new Permissions(a).toArray()[0]).join(', ')
			}));
		
	}
	if (opt.permissions && !opt.permissions.lenght > 0) {
		if (!channel.permissionsFor(member.user.id).has(opt.permissions)) {
			throw new Error(t('permissions:missingPermissions', {
				perms: opt.permissions.map(a => new Permissions(a).toArray()[0]).join(', ')
			}))
		}
	}
}
module.exports = {
	handleRequirements
}