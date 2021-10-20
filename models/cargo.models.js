const {Schema, model, Schematypes}= require('mongoose');

//Esquema coleccion de Cargo
const CargoSchema = Schema({
nombre:{
    type: String,
    requerid:true,
},
calificado:{
    type: String,
    required: true
},
salario:{
    type: String,
    requerid: true
},
});
CargoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;
})

module.exports= model ('Cargo',CargoSchema);
