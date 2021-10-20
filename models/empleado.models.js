const {Schema, model, SchemaTypes}= require('mongoose');

//Esquema coleccion de Empleado
const EmpleadoSchema = Schema({
    nombre: {
        type:String,
        requerid:true
    },
    apellido:{
        type:String,
        requerid:true,
        unique:true
    },
    email:{
        type:String,
        requerid:false
    },
    direccion:{
        type:String,
        requerid:false
    },
    fechanacer:{
        type:String,
        requerid:true
    },
    area:{
        requerid: true,
        type: Schema.Types.ObjectId,
        ref:'Area'
    },
    cargo:{
        requerid:true,
        type: Schema.Types.ObjectId,
        ref:'Cargo'
    },
    empresa:{
        requerid:true,
        type: Schema.Types.ObjectId,
        ref:'Empresa'
    },
});
EmpleadoSchema.method('toJSON', function(){
    const {__v, _id, ...object } = this.toObject();
    object.emuid = _id;
    return object;
})
//Exportar
module.exports= model ('Empleado',EmpleadoSchema);
