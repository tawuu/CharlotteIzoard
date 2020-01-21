const parseOptions = function (options = {}) {
	return {
	  permissions: options.permissions || [],
	  botPermissions: options.botPermissions || [],

	  onlyGuild: !!options.onlyGuild || true,
	  onlyDevs: !!options.onlyDevs || false ,
	}
}
const handleRequirements = function ({ author, channel, client, guild, member, t }, options) {
	let opt = parseOptions(options)
	
	if (opt.onlyGuild && channel.type === "dm") throw new Error(t('permissions:guildOnly'))
	if (opt.onlyDevs && !process.env.owners.includes(author.id)) throw new Error(t('permissions:onlyDevelopers'))
	
	if (opt.botPermissions && !me.hasPermission(opt.botPermissions)) throw new Error(t('permissions:meWithoutPermission', {
		perms: opt.permissions.map(a => a).join(', ')
	}))
	if (opt.permissions && !member.hasPermission(opt.permissions)) throw new Error(t('permissions:missingPermissions', {
		perms: opt.permissions.map(a => a).join(', ')
	}))
}
module.exports = {
	handleRequirements
}