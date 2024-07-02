//Clase integradora
//Actividad: generar un pinteres, almacenando nuestro usuarios en mongodb

////////////////////////////////////////////////////////////////////////
import express from "express"
import {engine} from "express-handlebars"
import "./database.js"



const app = express()
const PORT = 8080

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))

//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Rutas
app.get("/", (req, res) =>{
    res.render("index")
})

app.listen(PORT, ()=>{
    console.log(`# # # Puerto ${PORT} ONLINE # # #`)
})