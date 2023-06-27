const express = require('express');
const app = express();
const port = 3003;

app.use(express.json());

app.use('/clientes',require("./rutas/Cliente"));
app.use('/tipo-cliente',require("./rutas/TipoCliente"));


app.listen(port, () => {
    console.log('Servidor iniciado en el puerto ' + port);
});