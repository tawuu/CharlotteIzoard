const { Permissions } = require('discord.js');
const parseOptions = function (options = {}) {
	return {
	  permissions: options.permissions || [],
	  botPermissions: options.botPermissions || [],

	  onlyGuild: !!options.onlyGuild || true,
	  onlyDevs: !!options.onlyDevs || false ,
	}
}
const handleRequirements = function ({ author, channel, client, guild, member, me, t, dbBot }, options) {
	let opt = parseOptions(options);

	if (opt.onlyGuild && channel.type !== "dm") return throw new Error(t('permissions:guildOnly'));

	if (opt.onlyDevs && !dbBot.staffers.owners.includes(author.id)) return throw new Error(t('permissions:onlyDevelopers'));

	if (opt.botPermissions && !me.hasPermission(opt.botPermissions)) return throw new Error(t('permissions:meWithoutPermission', {
		perms: opt.botPermissions.map(a => new Permissions(a).toArray()[0]).join(', ')
	}));
	if (opt.permissions && !member.hasPermission(opt.permissions)) return throw new Error(t('permissions:missingPermissions', {
		perms: opt.permissions.map(a => new Permissions(a).toArray()[0]).join(', ')
	}))
}
module.exports = {
	handleRequirements
}