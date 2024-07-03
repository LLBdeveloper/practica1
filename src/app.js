//Clase integradora
//Actividad: generar un pinteres, almacenando nuestro usuarios en mongodb

////////////////////////////////////////////////////////////////////////
import express from "express"
import {engine} from "express-handlebars"
import "./database.js"
import displayRoutes from 'express-routemap'
import imagenRouter from "./routes/imagen.router.js"
import multer from "multer"

const app = express()
const PORT = 8080

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("./src/public"))

//Multer
const storage = multer.diskStorage({
    destination: (req, file, cd) =>{
        cd(null, "./src/public/img")
    },
    filename: (req, file, cd) =>{
        cd(null, file.originalname)
    }
})
app.use(multer({storage}).single("image"))


//Handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", "./src/views")

//Rutas
app.use('/', imagenRouter)


//Listen
app.listen(PORT, ()=>{
    console.log(`# # # Puerto ${PORT} ONLINE # # #`)
    displayRoutes(app)
    
})