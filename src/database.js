import mongoose, { mongo } from "mongoose"

mongoose.connect("mongodb+srv://LLBdeveloper:admiadmi@cluster0.kdv9gnv.mongodb.net/entrega1")
    .then( ()=> console.log("conectado a mongo db"))
    .catch( ()=> console.log("no se conecto"))