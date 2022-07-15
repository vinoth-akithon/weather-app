const path = require("path")
const express = require("express")
const hbs = require("hbs")
const getGeoCode = require("./utils/geocode")
const getForacast = require("./utils/forecast")

const port = process.env.PORT || 3000
// create an express app
const app = express()

// getting the template foleder path using 'path' module
const staticDirectoryName = path.join(__dirname,"../","public")
const viewsPath = path.join(__dirname,"../templates/views")
const partailsPath = path.join(__dirname,"../templates/partials")

// let the express to know, what folder have the static templates.
app.use(express.static(staticDirectoryName))

// let the express to know, what template engine using here.
// hbs --> handlebar (like jinja in python)
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partailsPath)

// simple route for rendering the template
app.get("/", (req, res) => {
    return res.render("index", {
        pageName: "Index Page"
    })
})

// simple route for passing the dynamic values to the template
app.get("/home", (req, res) => {
    return res.render("home",{
        pageName: "Home Page",
        content: "Welcome to Learn Express"
    })
})

app.get("/help", (req, res) => {
    return res.render("help", {
        pageName: "Help Page"
    })
})

// query string example
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({"message": "Please provide a address."})
    }
    getGeoCode(req.query.address,(error, {longitude,latitude,location} = {}) => {
        if (error){
            return res.send(error)
        }
        getForacast(latitude,longitude, (error,forcastResponse) => {
            if (error) {
                return res.send(error)
            }
            return res.send({
                address: req.query.address,
                message: forcastResponse,
                location
            })
        })
    })
})

app.get("/help/*", (req,res) => {
    return res.render("404_page",{
        message: "Help page not Found"
    })
})

app.get("*", (req,res) => {
    return res.render("404_page",{
        message: "Page not Found"
    })
})

// starting the express server on the specified port
app.listen(port, () => {
    console.log("App is running!")
})