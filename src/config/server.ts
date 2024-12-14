import express from 'express';
import dotenv from 'dotenv';
import corsConfig from './cors.config';
import routeConfig from './route.config';

import responseMiddleware from '@middlewares/response.middleware';

dotenv.config();

export class ServerExpress {

    app: express.Application;
    port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.app.use(corsConfig);
    }

    useConfig() {
        routeConfig(this.app);
        this.app.use(express.json());
        this.app.use(express.static("public"));

        this.app.use(responseMiddleware);
    }

    startServer(callback: VoidFunction) {
        this.useConfig();
        this.app.listen(this.port, callback);
    }
} 