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

        String.prototype.toVBColor = function HEXToVBColor() {
            let str = this;
            str = str.replace(/#/g, '')
            var bbggrr = str.substr(4, 2) + str.substr(2, 2) + str.substr(0, 2);
            return parseInt(bbggrr, 16);
        }
    }
}