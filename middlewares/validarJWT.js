const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer el Token del header
    //x-token  es un header personalizado donde se registrara un token valido
    const token = req.header('token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }
    try {
        
        const { emuid } = jwt.verify( token, process.env.JWT_SECRET );
        req.emuid = emuid;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}
module.exports = {
    validarJWT
}