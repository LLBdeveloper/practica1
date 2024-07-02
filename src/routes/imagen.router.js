import { Router} from "express"
import ImagenModel from "../models/imagen.model.js"

const router = Router()



//ruta raiz de la app
router.get("/", async (req, res)=>{
    const imagenes = await ImagenModel.find()
    
    
    
    res.render("index", {imagenes: imagenes})
})





export default router