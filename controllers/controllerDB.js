const mysql = require('mysql');


const connection = mysql.createConnection({
  host: 'sql10.freesqldatabase.com',
  user: 'sql10628872',
  password: 'sbPQjUKmzw',
  database: 'sql10628872',
  port: 3306 
});
connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ' + error.stack);
    return;
  }

  console.log('Conexión exitosa a la base de datos.');
});
module.exports = {connection};