require('dotenv').config()
import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as helmet from "helmet";
import * as cors from "cors";



import router from "./router/v1";
import config from "./config/main.js";

// init express
const app = express();

// init mongoose
// mongoose.connect(config.db);
mongoose.connect(config.db)
  .then(() => console.log('Conectado a la base de datos'))
  .catch(err => console.error('Error al conectar a la base de datos', err));
  
// express middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(cors());

// routes
router(app);

// init server
let server;

if (process.env.NODE_ENV !== config.test_env) {
    server = app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);

    })
}
else {
    server = app.listen(config.test_port, () => {
        console.log(`Server listening on port ${config.test_port}`);

    })
}




export default server;








