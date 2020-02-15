let fetch = require("node-fetch")
module.exports = function translate(text, to = "en", from = "auto") {
    let url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + from + "&tl=" + to + "&dt=t&q=" + text + "&ie=UTF-8&oe=UTF-8"
    return new Promise(async (resolve, reject) => {
        let res = await fetch(url)
            .then(res => res.json())
        resolve({
            text: res[0][0][0],
            original: res[0][0][1],
            from: res[2],
            to
        })
    })
}