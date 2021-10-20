const {Schema, model, Schematypes}= require('mongoose');

//Esquema coleccion de Informe
const InformeSchema = Schema({
nombre:{
    type: String,
    requerid:true,
},
version:{
    type: String,
    requerid: true,
},
empleado:{
    requerid:true,
    type: Schema.Types.ObjectId,
    ref:'Empleado'
},
});
InformeSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.ind = _id;
    return object;
})
module.exports= model ('Informe',InformeSchema);
