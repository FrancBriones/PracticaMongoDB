const { response } = require('express');
const Sucursal = require('../models/sucursal.models');

//Obtener las sucursales
const getSucursal = async (req, res)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const [sucursales, total] = await Promise.all([
        Sucursal
            .find()
            .populate('empresa','nombre region direccion')
            .populate('area','nombre region direccion')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Sucursal.countDocuments()
    ]);
    res.json({
        ok:true,
        sucursales,
        total
    });
}
//Crear las sucursales
const crearSucursal = async(req, res=response)=>{

    const uid = req.uid;
    const uid1 = req.uid1;

    const sucursal = new Sucursal({ 
        empresa: uid1,
        area: uid,
        ...req.body 
    });

    try {
        const sucursalDB = await sucursal.save();
        
        res.json({
            ok: true,
            sucursal: sucursalDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar una sucursal, consulte con el administrador'
        })
    }
        
} 
//Actualizar una sucursal
const actualizarSucursal = async (req, res= response)=>{
    //Requerir id
    const id  = req.params.id;
        
    try {
        const sucursalDB = await Sucursal.findById(id);

        if (!sucursalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una sucursal con esa identificacion'
            });
        }
        const cambiosSucursal = {
            ...req.body,
        }   
        //actualizacion de datos
        const sucursalActualizado = await Sucursal.findByIdAndUpdate(id, cambiosSucursal, {new:true});

        res.json({
            ok:true,
            sucursal: sucursalActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar datos de la sucursal'
        });
    }
}
//Eliminando una sucursal
const eliminarSucursal= async(req, res=response) =>{
    const id = req.params.id;
    try {
        const sucursalDB = await Sucursal.findById(id);
        if(!sucursalDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una sucursal con esa identificacion'
            });
        }
        await Sucursal.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Sucursal eliminado de la Base de Datos'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar la sucursal'
        });
    }
}
module.exports = {
    getSucursal,
    crearSucursal,
    actualizarSucursal,
    eliminarSucursal
}
