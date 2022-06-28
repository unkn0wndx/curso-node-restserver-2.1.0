require('dotenv').config();//* Establece las variables de entorno del archivo '.env'
const Server = require('./models/server');//* Se importa la clase server


console.clear();//* Limpia consola

const server = new Server();//* Se instancia


server.listen();//* Se inicia el servidor