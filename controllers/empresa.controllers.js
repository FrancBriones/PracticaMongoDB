const { response } = require('express');
const Empresa = require('../models/empresa.models');

//Obtener los cargos
const getEmpresa = async (req, res)=>{
    const desde = Number(req.query.desde) || 0;
    const limite = Number(req.query.limite) || 0;
    const [empresas, total] = await Promise.all([
        Empresa
            .find({}, 'nombre ruc direccion')
            .skip(desde) //variable de paginacion
            .limit(limite), // cuantos valores traer
        Empresa.countDocuments()
    ]);
    res.json({
        ok:true,
        empresas,
        total
    });
}
//Crear las empresas
const crearEmpresa = async(req, res=response)=>{

    const {nombre,ruc,direccion} = req.body;

    try {

        const existeNombre = await Empresa.findOne({nombre});
        const existeRuc = await Empresa.findOne({ruc});
        if(existeNombre){
            return res.status(400).json({
                ok:false,
                msg: 'El nombre de la empresa ya ha sido registrado'
            });
        }
        if(existeRuc){
            return res.status(400).json({
                ok:false,
                msg: 'El ruc de la empresa ya ha sido registrado'
            });
        }
        //creamos un objeto de la clase model empresa
        const empresa = new Empresa(req.body);

        //indicamos a mongoose que registre la empresa en la Base de Datos
        await empresa.save();

        res.json({
            ok:true,
            empresa
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error en el servidor, revisar logs'
        });
    }  
} 
//Actualizar una empresa
const actualizarEmpresa = async (req, res= response)=>{
    //Requerir id
    const uid = req.params.id;
        
    try {
        const empresaDB = await Empresa.findById(uid);

        if (!empresaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una empresa con esa identificacion'
            });
        }
        //Codigo previo a la actualizacion 
        const {nombre,direccion,ruc, ...campos} = req.body;
        if(empresaDB.ruc!== ruc){
            const existeRuc = await Empresa.findOne({ruc});
            if (existeRuc){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una empresa con ese ruc'
                });
            }
        }
         campos.ruc=ruc;    
         campos.direccion=direccion;  
         campos.nombre=nombre;    
        //actualizacion de datos
        const empresaActualizada = await Empresa.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            empresa: empresaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al actualizar la empresa'
        });
    }
}
//Eliminando un cargo
const eliminarEmpresa= async(req, res=response) =>{
    const uid = req.params.id;
    try {
        const empresaDB = await Empresa.findById(uid);
        if(!empresaDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe una empresa con esa identificacion'
            });
        }
        await Empresa.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Empresa eliminada de la Base de Datos'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'No es posible eliminar la empresa'
        });
    }
}


module.exports = {
    getEmpresa,
    crearEmpresa,
    actualizarEmpresa,
    eliminarEmpresa
}