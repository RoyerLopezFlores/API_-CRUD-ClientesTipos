const {connection} = require("../controllers/controllerDB");
const express = require("express");
const router = express.Router();
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM cliente', (error, results) => {
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
    const query = 'SELECT * FROM cliente WHERE id_cliente = ?';
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
    const { nombre, dni, telefono, correo, estado,id_tipo } = req.body;
    console.log(nombre,dni,telefono,id_tipo,req.body);
    connection.query(
      'INSERT INTO cliente (nombre, dni, telefono, correo, estado,id_tipo) VALUES (?, ?, ?, ?, ?,?)',
      [nombre, dni, telefono, correo, estado,id_tipo],
      (error, results) => {
        if (error) {
          console.error('Error al crear un nuevo cliente: ' + error.stack);
          res.status(500).json({ error: 'Error al crear un nuevo cliente.' });
          return;
        }
  
        res.json({ message: 'Cliente creado exitosamente.' });
      }
    );
  });
  
router.put('/:id', (req, res) => {
    const clientId = req.params.id;
    const { nombre, dni, telefono, correo, estado,id_tipo } = req.body;
    console.log("Eliminar; ",clientId);
    connection.query(
      'UPDATE cliente SET nombre = ?, dni = ?, telefono = ?, correo = ?, estado = ?, id_tipo= ? WHERE id_cliente = ?',
      [nombre, dni, telefono, correo, estado,id_tipo, clientId],
      (error, results) => {
        if (error) {
          console.error('Error al actualizar el cliente: ' + error.stack);
          res.status(500).json({ error: 'Error al actualizar el cliente.' });
          return;
        }
  
        res.json({ message: 'Cliente actualizado exitosamente.' });
      }
    );
});

router.delete('/:id', (req, res) => {
    const clientId = req.params.id;
  
    connection.query('DELETE FROM cliente WHERE id_cliente = ?', [clientId], (error, results) => {
      if (error) {
        console.error('Error al eliminar el cliente: ' + error.stack);
        res.status(500).json({ error: 'Error al eliminar el cliente.' });
        return;
      }
  
      res.json({ message: 'Cliente eliminado exitosamente.' });
    });
});
  

module.exports = router;