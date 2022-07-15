const request = require("request")

function getGeoCode(address, callback) {
    // const mapBoxURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/12GGGGGGGGG.json?access_token=pk.eyJ1Ijoidmlub3Roa3VtYXJtIiwiYSI6ImNsNWY5NGtleTE5MGkzaW8yczJ0ZzY5azAifQ.yqWXNHjaV2RrlPqh8m_tWw&limit=1"
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoidmlub3Roa3VtYXJtIiwiYSI6ImNsNWY5NGtleTE5MGkzaW8yczJ0ZzY5azAifQ.yqWXNHjaV2RrlPqh8m_tWw&limit=1`
    const geoCode = request({url, json: true}, (e, {body} = {}) => {
        if (e) {
            callback({message:"Unable to fetch the geocode"})
        }
        else if (body.features.length === 0) {
            callback({message:"No geocode found for the provided location"})
        }
        else {
            const longitude = body.features[0].center[0]
            const latitude = body.features[0].center[1]
            const location = body.features[0].place_name
            callback(undefined, {longitude,
                                latitude,
                                location})
            // console.log("Longitude: " + longitude)
            // console.log("Latitude: " + latitude)
        }
        
    })
}

module.exports = getGeoCode