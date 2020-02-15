module.exports = function getWeather (search, lang = "pt-BR", degreeType = "C") {
    const request = require("request")
    let xml2JS = require("xml2js")
    let cheerio = require("cheerio")
    let xmlParser = new xml2JS.Parser({ charkey: 'C$', attrkey: 'A$', explicitArray: true })
    let result = []
    let url = `http://weather.service.msn.com/find.aspx?src=outlook&weadegreetype=${degreeType}&culture=${lang}&weasearchstr=${search}`

    return new Promise((resolve, reject) => {
        request.get({ url, timeout: 10000 }, function (err, res, body) {
            xmlParser.parseString(body, function (err, resultJSON) {
                if (!resultJSON || !resultJSON.weatherdata || !resultJSON.weatherdata.weather)
                    return resolve(null);

                if (resultJSON.weatherdata.weather['A$'] && resultJSON.weatherdata.weather['A$'].errormessage)
                    return resolve(null);
            
                if (!(resultJSON.weatherdata.weather instanceof Array)) {
                    return resolve(null);
                }
                let weatherInfo = {}

                request(resultJSON.weatherdata.weather[0]['A$']['url'], async (err, res, body) => {
                    let $ = await cheerio.load(body)
                    let aa = $(".weather-info").text().trim().split("\n")
                    let local = resultJSON.weatherdata.weather[0]['A$']['weatherlocationname']
                    let precepitacao = $(".forecast-list li.active .precipicn span").text().trim()
                    let imageCode = resultJSON.weatherdata.weather[0]['current'][0]['A$']["skycode"]
                    
                    //é gambiarra fodase, o bom é q ta funcionando
                    if (['29', '33', '28', '30', '34', '22', '19', '23', '24', '20'].includes(imageCode)) imageCode = 27 //Nublado
                    if (['0', '2', '3', '4', '17', '35', '37', 38].includes(imageCode)) imageCode = 1 // Trovoada
                    if (['8'].includes(imageCode)) imageCode = 9 //Gelado
                    if (['16', '42', '43', '41'].includes(imageCode)) imageCode = 14 //Neve
                    if (['32', '34', '35', '36'].includes(imageCode)) imageCode = 31 //Sol
                    if (['39', '34'].includes(imageCode)) imageCode = 23 //Sol e chuva
                    if (['18', '40', '45', "47"].includes(imageCode)) imageCode = 12 //Chuva
                    if (['6', '7', '10'].includes(imageCode)) imageCode = 5 //Chuva e Neve
                    
                     Object.assign(weatherInfo, {
                        temperatura: resultJSON.weatherdata.weather[0]['current'][0]['A$']["temperature"],
                        local,
                        precepitacao,
                        degreeType: resultJSON.weatherdata.weather[0]['A$']['degreetype'],
                        subinfo: {
                            desc: aa[0],
                            sensacaotermica: resultJSON.weatherdata.weather[0]['current'][0]['A$']["feelslike"],
                            vento: aa[4].match(/([0-9]+\s?[a-z]+\/?[a-z]+)/g)[0],
                            barometro: aa[5].match(/([0-9]+.?[0-9]+\s?[a-z]+)/g)[0],
                            visibilidade: aa[6].match(/([0-9]+\s?[a-z]+)/g)[0],
                            umidade: aa[7].match(/([0-9]+\%)/g)[0],
                            pontodeorvalho: aa[8].match(/([0-9]+°?)/g)[0],
                            min: resultJSON.weatherdata.weather[0]['forecast'][1]['A$']["low"]+"°",
                            max: resultJSON.weatherdata.weather[0]['forecast'][1]['A$']["high"]+"°",
                            imageCode
                        }
                    })
                    resolve(weatherInfo)
                })
            })
        })
    })
}
