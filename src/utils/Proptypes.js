const { User } = require("eris")

module.exports = class Proptypes {
    static start() {
        Array.prototype.remove = function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };

        Object.defineProperty(User.prototype, "tag", {
            get: function() {
                return `${this.username}#${this.discriminator}`;
            }
        });
    }
}