const { response } = require('express');
const Area = require('../models/area.models');

//Obtener los cargos
const getArea = async (req, res)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const [areas, total] = await Promise.all([
        Area
            .find()
            .populate('cargo','nombre presupuesto')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Area.countDocuments()
    ]);
    res.json({
        ok:true,
        areas,
        total
    });
}
//Crear las areas
const crearArea = async(req, res=response)=>{

    const uid = req.uid;
    const area = new Area({ 
        cargo: uid,
        ...req.body 
    });

    try {
        const areaDB = await area.save();
        
        res.json({
            ok: true,
            area: areaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar Area, consulte con el administrador'
        })
    }
        
} 
//Actualizar un area
const actualizarArea = async (req, res= response)=>{
    //Requerir id
    const id  = req.params.id;
    const uid = req.uid;
        
    try {
        const areaDB = await Area.findById(id);

        if (!areaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un area con esa identificacion'
            });
        }
        const cambiosArea = {
            ...req.body,
            cargo:uid,
        }   
        //actualizacion de datos
        const areaActualizada = await Area.findByIdAndUpdate(id, cambiosArea, {new:true});

        res.json({
            ok:true,
            area: areaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar el area'
        });
    }
}
//Eliminando un area
const eliminarArea= async(req, res=response) =>{
    const id = req.params.id;
    try {
        const areaDB = await Area.findById(id);
        if(!areaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un area con esa identificacion'
            });
        }
        await Area.findByIdAndDelete( id);

        res.json({
            ok:true,
            msg: 'Area eliminado de la Base de Datos'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar el area'
        });
    }
}
module.exports = {
    getArea,
    crearArea,
    actualizarArea,
    eliminarArea
}
