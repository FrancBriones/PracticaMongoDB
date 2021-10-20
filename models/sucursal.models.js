const {Schema, model, Schematypes}= require('mongoose');

//Esquema coleccion de Sucursal
const SucursalSchema = Schema({
nombre:{
    type:String,
    requerid:true,
},
region:{
    type: String,
    requerid:true
},
direccion:{
    type:String,
    requerid:true
},
empresa:{
    requerid:true,
    type: Schema.Types.ObjectId,
    ref:'Empresa'
},
area:{
    requerid:true,
    type: Schema.Types.ObjectId,
    ref:'Area'
}
});
module.exports= model ('Sucursale',SucursalSchema);
