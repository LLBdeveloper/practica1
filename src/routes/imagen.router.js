import { Router} from "express"
import {promises as fs} from "fs"
import ImagenModel from "../models/imagen.model.js"
const router = Router()



//ruta raiz de la app
router.get("/", async (req, res)=>{
    const imagenes = await ImagenModel.find().lean()
    //con lean() es una forma de evitar la medida de seguridad de handlebars que daba error
    // la otra es mapearlo
    res.render("index", {imagenes: imagenes})
})

//ruta para acceder al formulario de carga
router.get("/upload", (req, res) => {
    res.render("upload")
})

router.post("/upload", async (req, res) =>{
    try {
        const imagen = new ImagenModel()
        imagen.title = req.body.title
        imagen.description = req.body.description
        imagen.filename = req.body.filename
        imagen.path = "/img/" + req.file.filename
        
        //Guardamos el objeto en la base de datos
        await imagen.save()
        res.redirect("/")

    } catch(error) {
        res.status(500).send("Error en el servidor")
    }
})

//Ruta para eliminar imagenes
router.get("/image/:id/delete", async (req,res) =>{
    const {id} = req.params
    const imagen = await ImagenModel.findByIdAndDelete(id)
    await fs.unlink("./src/public" + imagen.path)
    res.redirect("/")
})

export default router