const {connection} = require("../controllers/controllerDB");
const express = require("express");
const router = express.Router();
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM tipo_cliente', (error, results) => {
        if (error) {
            console.error('Error al obtener los clientes: ' + error.stack);
            res.status(500).json({ error: 'Error al obtener los clientes.' });
            return;
        }

        res.json(results);
    });
});
router.get('/:id',(req, res) => {
    const tipoClienteId = req.params.id;
    const query = 'SELECT * FROM tipo_cliente WHERE id_tipo = ?';
    connection.query(query, [tipoClienteId], (err, result) => {
      if (err) throw err;
      if (result.length === 0) {
        res.status(404).json({ mensaje: 'Tipo de cliente no encontrado' });
      } else {
        res.json(result[0]);
      }
    });
});
router.post('/', (req, res) => {
    const { nombre, detalle } = req.body;
    let band = false;
    connection.query('SELECT nombre from tipo_cliente WHERE nombre = ?',[nombre], (err,result)=>{
        if(err){
            console.log("Nombre hay un tipo",err);
            res.status(404).json({message:"Ya existe el tipo de cliente"});
        } 
        else{
            if(result.length>0){
                res.status(201).json({message: "Ya existe el tipo de cliente"});
                band = true;
            }else{
                const query = 'INSERT INTO tipo_cliente (nombre, detalle) VALUES (?, ?)';
                connection.query(query, [nombre, detalle], (err, result) => {
                if (err) throw err;
                const tipoClienteId = result.insertId;
                const nuevoTipoCliente = { id_tipo: tipoClienteId, nombre, detalle };
                res.status(201).json(nuevoTipoCliente);
                });
            }
        }
    })
  });
router.put('/:id', (req, res) => {
    const tipoClienteId = req.params.id;
    const { nombre, detalle } = req.body;
    const query = 'UPDATE tipo_cliente SET nombre = ?, detalle = ? WHERE id_tipo = ?';
    connection.query(query, [nombre, detalle, tipoClienteId], (err, result) => {
        if (err) throw err;
        res.json({ mensaje: 'Tipo de cliente actualizado correctamente' });
    });
});
router.delete('/:idTipo',(req,res)=>{
    const idTipo = req.params.idTipo;
    connection.query('DELETE FROM tipo_cliente WHERE id_tipo = ?',[idTipo],(error,result)=>{
        if(error){
            console.log('Error al eliminar ' + error.stack);
            res.status(500).json({message:"Error al eliminar tipo"});
            return;
        }
        res.json({message: "Tipo Eliminado"});
    })
});
module.exports = router;