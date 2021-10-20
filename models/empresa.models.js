const {Schema, model, Schematypes}= require('mongoose');

//Esquema coleccion de Empresa
const EmpresaSchema = Schema({
nombre:{
    type: String,
    requerid:true,
},
ruc:{
    type: String,
    requerid: true,
},
direccion:{
    type: String,
    requerid: true,
},
});
EmpresaSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid1 = _id;
    return object;
})
module.exports= model ('Empresa',EmpresaSchema);