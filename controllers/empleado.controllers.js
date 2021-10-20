const { response } = require('express');
const Empleado = require('../models/empleado.models');

//Obtener los empleados
const getEmpleado = async (req, res)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const [empleados, total] = await Promise.all([
        Empleado
            .find()
            .populate('area','nombre apellido email direccion fechanacer')
            .populate('cargo','nombre apellido email direccion fechanacer')
            .populate('empresa','nombre apellido email direccion fechanacer')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Empleado.countDocuments()
    ]);
    res.json({
        ok:true,
        empleados,
        total
    });
}
//Crear los empleados
const crearEmpleado = async(req, res=response)=>{

    const uid = req.uid;
    const uid1 = req.uid1;
    const cdi= req.cdi;

    const empleado = new Empleado({ 
        empresa: uid1,
        area: uid,
        cargo: cdi,
        ...req.body 
    });

    try {
        const empleadoDB = await empleado.save();
        
        res.json({
            ok: true,
            empleado: empleadoDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al registrar un empleado, consulte con el administrador'
        })
    }
        
} 
//Actualizar un empleado
const actualizarEmpleado = async (req, res= response)=>{
    //Requerir id
    const id  = req.params.id;
    try {
        const empleadoDB = await Empleado.findById(id);

        if (!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con esa identificacion'
            });
        }
        const {email, direccion, ...campos} = req.body;
        if(empleadoDB.email !== email){
            const existeEmail = await Empleado.findOne({email});
            if (existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un empleado con este email'
                });
            }
        }
        campos.email=email
        campos.direccion=direccion
        //actualizacion de datos
        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, campos, {new:true});

        res.json({
            ok:true,
            empleado: empleadoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar datos de empleado'
        });
    }
}
//Eliminando un empleado
const eliminarEmpleado= async(req, res=response) =>{
    const id = req.params.id;
    try {
        const empleadoDB = await Empleado.findById(id);
        if(!empleadoDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un empleado con esa identificacion'
            });
        }
        await Empleado.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Empleado eliminado de la Base de Datos'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar el empleado'
        });
    }
}
module.exports = {
    getEmpleado,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
}
