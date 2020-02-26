const { Constants } = require("eris")

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
		if (!client.utils.Permissions.parseChannelPermissionFor(opt.botPermissions, me, channel)) throw new Error(t('permissions:meWithoutPermission', {
				perms: opt.botPermissions.map(a => client.utils.Permissions.getKeyByValue(Constants.Permissions, a)).join(', ')
			}));

	}
	if (opt.permissions && !opt.permissions.lenght > 0) {
		if (!client.utils.Permissions.parseChannelPermissionFor(opt.permissions, member, channel)) {
			throw new Error(t('permissions:missingPermissions', {
				perms: opt.permissions.map(a => client.utils.Permissions.getKeyByValue(Constants.Permissions, a)).join(', ')
			}))
		}
	}
}
module.exports = {
	handleRequirements
}