const { Constants: {Permissions} } = require("eris")

module.exports = class Permission {
    static parseChannelPermissionFor(permissions, member, channel) {
        
        let perms = channel.permissionsOf(member.id)
        let allPerms = Object.keys(perms.json)
        for (let i of permissions) {
            if (allPerms.includes(this.getKeyByValue(Permissions, i))) 
                continue
            else
                return false

        }
        return true
    }
    static getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }
}