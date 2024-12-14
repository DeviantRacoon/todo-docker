import { ServerExpress } from "./config/server";

const app = new ServerExpress

app.startServer(async () => {
    console.log('Server is running on port: ' + app.port);
    // logger.info('Server is running on port: ' + app.port);
    try {
        // await AppDataSource.initialize();
        // logger.info('Connection successful on database');
    } catch (err: any) {
        // logger.error(err);
    }
});