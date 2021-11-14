require('dotenv').config();
import cors = require('cors');
import morgan = require('morgan');
import express from 'express';
import bodyParser from 'body-parser';

import swaggerUI from 'swagger-ui-express';
import swaggerDocs from './swagger.json';

import appRouters from './routes/app.routes';
import environment from './config/environment';

const corsOptions: cors.CorsOptions = {
  allowedHeaders: ['Authorization', 'Content-Type', 'x-api-token', 'animal', 'email', 'password'],
  methods: ['GET', 'POST']
};

swaggerDocs.host = environment.NODE_ENV?.includes('production')
  ? `${environment.HOST_NAME}`
  : `localhost:${environment.PORT}`;

const app = express();

app.set('env', environment.NODE_ENV);
app.set('port', environment.PORT);
app.set('host', environment.HOST_NAME);

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/api-docs'));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(environment.BASE_PATH, appRouters);

export default app;
