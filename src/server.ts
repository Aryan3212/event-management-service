import { app } from "./app";
import { dataSource } from "./app-data-source";
import log from "./utils/logger";
const port = 3000;
dataSource.initialize();


const server = app.listen(port, () => {
    log.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});


process.on('SIGTERM', () => {
    log.debug('SIGTERM signal received: closing HTTP server')
    server.close(() => {
        log.debug('HTTP server closed')
    })
})