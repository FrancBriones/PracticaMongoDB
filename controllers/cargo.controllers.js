const { response } = require('express');
const Cargo = require('../models/cargo.models');

//Obtener los cargos
const getCargo = async (req, res)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const [cargos, total] = await Promise.all([
        Cargo
            .find({}, 'nombre calificado salario')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Cargo.countDocuments()
    ]);
    res.json({
        ok:true,
        cargos,
        total
    });
}
//Crear los cargos
const crearCargo = async(req, res=response)=>{

    const {nombre,calificado,salario} = req.body;
    try {

        const existeNombre = await Cargo.findOne({nombre});
        if(existeNombre){
            return res.status(400).json({
                ok:false,
                msg: 'El nombre del cargo ya ha sido registrado'
            });
        }

        //creamos un objeto de la clase model cargo
        const cargo = new Cargo(req.body);

        //indicamos a mongoose que registre el cargo en la Base de Datos
        await cargo.save();

        res.json({
            ok:true,
            cargo
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 
//Actualizar un cargo
const actualizarCargo = async (req, res= response)=>{
    //Requerir id
    const uid = req.params.id;
        
    try {
        const cargoDB = await Cargo.findById(uid);

        if (!cargoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cargo con esa identificacion'
            });
        }
        const cambiosCargo = {
            ...req.body,
        }       
        //actualizacion de datos
        const cargoActualizado = await Cargo.findByIdAndUpdate(uid, cambiosCargo, {new:true});

        res.json({
            ok:true,
            cargo: cargoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar el cargo'
        });
    }
}
//Eliminando un cargo
const eliminarCargo= async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const cargoDB = await Cargo.findById(uid);
        if(!cargoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un cargo con esa identificacion'
            });
        }
        await Cargo.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Cargo eliminado de la Base de Datos'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar el cargo'
        });
    }
}


module.exports = {
    getCargo,
    crearCargo,
    actualizarCargo,
    eliminarCargo
}

