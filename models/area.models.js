const {Schema, model, Schematypes}= require('mongoose');

//Esquema coleccion de Area
const AreaSchema = Schema({
nombre:{
    type:String,
    requerid:true,
},
presupuesto:{
    type:String,
    requerid:true,
},
cargo:{
    requerid:true,
    type: Schema.Types.ObjectId,
    ref:'Cargo'
},
});
AreaSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
module.exports= model ('Area',AreaSchema);
