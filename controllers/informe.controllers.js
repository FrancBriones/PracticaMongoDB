const { response } = require('express');
const Informe = require('../models/informe.models');

//Obtener los informes
const getInforme = async (req, res)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const [informes, total] = await Promise.all([
        Informe
            .find()
            .populate('empleado','nombre version')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Informe.countDocuments()
    ]);
    res.json({
        ok:true,
        informes,
        total
    });
}
//Crear los empleados
const crearInforme = async(req, res=response)=>{

    const emuid= req.emuid;
    
    const informe = new Informe({ 
        empleado: emuid,
        ...req.body 
    });

    try {
        const informeDB = await informe.save();
        
        res.json({
            ok: true,
            informe: informeDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar un informe, consulte con el administrador'
        })
    }
        
} 
//Actualizar un informe
const actualizarInforme = async (req, res= response)=>{
    //Requerir id
    const id  = req.params.id;
    const emuid= req.emuid;
        
    try {
        const informeDB = await Informe.findById(id);

        if (!informeDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un informe con esa identificacion'
            });
        }
        const cambiosInforme = {
            ...req.body,
            empleado:emuid,
        }   
        //actualizacion de datos
        const informeActualizado = await Informe.findByIdAndUpdate(id, cambiosInforme, {new:true});

        res.json({
            ok:true,
            informe: informeActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar datos del informe'
        });
    }
}
//Eliminando un informe
const eliminarInforme= async(req, res=response) =>{
    const id = req.params.id;
    try {
        const informeDB = await Informe.findById(id);
        if(!informeDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un informe con esa identificacion'
            });
        }
        await Informe.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Informe eliminado de la Base de Datos'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar el informe'
        });
    }
}
module.exports = {
    getInforme,
    crearInforme,
    actualizarInforme,
    eliminarInforme
}
