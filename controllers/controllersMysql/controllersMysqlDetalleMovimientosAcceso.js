const {response, request}= require('express');
const Detallemovimientosacceso = require('../../models/modelsMysql/detallemovimientosaccesoDBMysql');
const { Op } = require('sequelize');
const { verificacionNumero } = require('../../helpers/verificacionNumero');
const { fechaEcuador, verificaFecha } = require('../../helpers/fechaActual');
const detallemovimientoRequeridos = require('../../helpers/helpersmysql/detallemovimientoArray');




const detallemovimientosmysqlGet = async (req, res) => {
  try {
    const movimientos = await Detallemovimientosacceso.findAll({
      // where: { tipomovimiento: 'Nuevo' }, // Descomenta si lo necesitas
      order: [['fechaactual', 'DESC']]
    });

    if (!movimientos || movimientos.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron movimientos en la base de datos.'
      });
    }

    res.status(200).json({ movimientos });

  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({
      msg: 'Error del servidor al obtener los movimientos. Contacte al administrador.'
    });
  }
};


const detallemovimientomysqlGet= async(req= request, res= response) => {
  
const {id} =  req.params
console.log(id);

   try {
    const movimientos = await Detallemovimientosacceso.findByPk(id);
console.log(movimientos);
    if (!movimientos || movimientos.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron movimientos en la base de datos.'
      });
    }

    res.status(200).json({ movimientos });

  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({
      msg: 'Error del servidor al obtener los movimientos. Contacte al administrador.'
    });
  }


 
}


const detallemovimientomysqlPost = async (req = request, res = response) => {
  const body = req.body; // 📥 Obtenemos los datos enviados por el cliente (POST)

  console.log('Datos recibidos:', body); // Solo para depuración
   try {
    // ✅ Validamos que los campos obligatorios estén presentes
      const camposRequeridos = detallemovimientoRequeridos();
      const camposFaltantes = camposRequeridos.filter(campo => !body[campo]);

      if (camposFaltantes.length > 0) {
         return res.status(400).json({
         msg: 'Faltan campos obligatorios para actualizar',
         camposFaltantes
         });
      }

  const {fechaInit,fechaF,msg} = await verificaFecha(body.fechainicio,body.fechafin)
      console.log(fechaInit);
      console.log(fechaF);
      if(msg!=='ok'){
         return   res.status(404).json({
            msg
         })
      }
  
    // ✅ Creamos el nuevo registro en la base de datos usando Sequelize
    const nuevoMovimiento = await Detallemovimientosacceso.create({
      idusuario: verificacionNumero(body.idusuario,8),
      usuario: body.usuario?.toUpperCase().trim().substring(0, 70), // limpieza: quita espacios y limita a 50 caracteres
      idemployee: body.idemployee,
      fname: body.fname?.toUpperCase().trim().substring(0, 100),     // limpieza: lo mismo
      num_comprobante: body.num_comprobante.trim().substring(0,12),
      fechainicio: fechaInit,
      fechafin: fechaF,
      tipomovimiento: body.tipomovimiento?.toUpperCase().trim().substring(0,20), // lo convierte a mayusculas por consistencia
      fechaactual: fechaEcuador()
    });

    // ✅ Respondemos con éxito y el objeto guardado
    return res.status(201).json({
      msg: 'Movimiento registrado correctamente',
      movimiento: nuevoMovimiento,
    });

  } catch (error) {
    // ❌ Si algo falla, lo capturamos aquí
    console.error('Error al guardar el movimiento:', error);
    return res.status(500).json({
      msg: 'Error del servidor al guardar el movimiento. Contacte al administrador.'
    });
  }
};


const detallemovimientomysqlPut = async (req = request, res = response) => {
  const body = req.body;
   const {id} = req.params


  try {
    // ✅ Validar que al menos uno de los campos de búsqueda esté presente



        // ✅ Buscar el movimiento por num_comprobante o idemployee
    const movimientoExistente = await Detallemovimientosacceso.findOne({ where: { iddetalle: id } });

    console.log('base de datos:'+movimientoExistente);

    if (!movimientoExistente) {
      return res.status(404).json({
        msg: 'No se encontró ningún movimiento en la base de datos hable con el Administrador'
      });
    }

    // ✅ Validamos que los campos obligatorios estén presentes
      const camposRequeridos = detallemovimientoRequeridos();
      const camposFaltantes = camposRequeridos.filter(campo => !body[campo]);

      if (camposFaltantes.length > 0) {
         return res.status(400).json({
         msg: 'Faltan campos obligatorios para actualizar',
         camposFaltantes
         });
      }



    // ✅ Actualizamos los datos
    await movimientoExistente.update({
      idusuario: verificacionNumero(body.idusuario,8),
      usuario: body.usuario?.toUpperCase().trim().substring(0, 70),
      idemployee: body.idemployee,
      fname: body.fname?.toUpperCase().trim().substring(0, 100),
      num_comprobante: body.num_comprobante.trim().substring(0, 12),
      fechainicio: body.fechainicio,
      fechafin: body.fechafin,
      tipomovimiento: body.tipomovimiento?.toUpperCase().trim().substring(0, 20),
      fechaactual: fechaEcuador()
    });

    return res.status(200).json({
      msg: 'Movimiento actualizado correctamente',
      movimiento: movimientoExistente
    });

  } catch (error) {
    console.error('Error al actualizar el movimiento:', error);
    return res.status(500).json({
      msg: 'Error del servidor al actualizar el movimiento. Contacte al administrador.'
    });
  }
};


const detallemovimientomysqlDelete = (req, res) => {

       const {id}= req.params
    res.status(400).json({
    msg:`Todo ok con Delete`,
    id
 })

            
}

module.exports= {

detallemovimientosmysqlGet,
detallemovimientomysqlGet,
detallemovimientomysqlPost,
detallemovimientomysqlPut,
detallemovimientomysqlDelete


}