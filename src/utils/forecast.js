const request = require("request")

function getForecast(latitude,longitude, callback) {
    const url = `http://api.weatherstack.com/current?access_key=fb2779484b2ec95c267a2f34796009f7&query=${latitude},${longitude}`
    request({url, json: true},(e, {body} = {}) => {
        if (e) {
            callback({message:"Unable to found the weather details"})
        }
        else if (body.error) {
            callback({message:"Provided geocode is invalid"})
        }
        else {
            callback(undefined,`It is currently ${body.current.temperature} degrees out. There is ${body.current.precip}% of rain`)
        }
    });
}

module.exports = getForecast