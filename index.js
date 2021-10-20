const express = require('express'); //de esta forma se importa en node

require('dotenv').config();
const { dbConection } = require('./config/database');
const cors  = require('cors');

//Creando el servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();


//Rutas de la API
app.use('/api/cargos', require('./routes/cargo.routers'));
app.use('/api/areas', require('./routes/area.routers'));
app.use('/api/empresas', require('./routes/empresa.routers'));
app.use('/api/empleados', require('./routes/empleado.routers'));
app.use('/api/informes', require('./routes/informe.routers'));
app.use('/api/sucursales', require('./routes/sucursal.routers'));
app.use('/api/logins', require('./routes/login.routers'));
//Para levantar el servidor
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})