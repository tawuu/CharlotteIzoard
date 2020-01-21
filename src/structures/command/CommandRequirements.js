module.exports = class CommandRequirements {

    static parseOptions (options = {}) {
        return {
          permissions: options.permissions,
          botPermissions: options.botPermissions,
    
          onlyGuild: !!options.onlyGuild,
          onlyDevs: !!options.onlyDevs,
        }
      }
      	static handle ({ author, channel, client, guild, member }, options) {
		  	let opt = this.parseOptions(options)
		  
			// if (!member.hasPermission(opt.permissions))
      }
}