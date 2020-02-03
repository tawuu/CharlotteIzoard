module.exports = class Wrapper {
    constructor() {
        if(this.constructor === Wrapper) throw new Error('Abstract class');
    };
    async startConnection () {};
};