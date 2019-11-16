import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import chalk from 'chalk';
import terminalLink from 'terminal-link';
import Ora from 'ora';

import templates from './templates/index';

const chalkError = chalk.bold.red;
const chalkWarning = chalk.keyword('orange');
const chalkSuccess = chalk.bold.green;
const chalkInfo = chalk.bold.yellow;

const stdError = msg => console.log(chalkError(msg), '\n');
const stdWarning = msg => console.log(chalkWarning(msg), '\n');
const stdSuccess = msg => console.log(chalkSuccess(msg), '\n');
const stdInfo = msg => console.log(chalkInfo(msg), '\n');

const spinner = Ora(chalkInfo('稍安勿躁，mock 服务正在启动中\n')).start();
spinner.color = 'yellow';
spinner.spinner = 'dots';

const apiPrefix = '/api';
const mockSeverPort = 8123;
const mockURL = terminalLink('访问地址是：', `http://localhost:${mockSeverPort}`);

const app = express();
app.use(compression());
app.use(morgan('dev'));
app.use(cors());

app.use(bodyParser.json({ limit: '20mb' }));
app.use(
    bodyParser.urlencoded({
        limit: '20mb',
        extended: false
    })
);

// No cache
app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();
});

stdWarning('---xxx---');
templates.forEach(template => {
    stdInfo(`${template.type}:: ${apiPrefix}${template.url}`);
    app[template.type](`${apiPrefix}${template.url}`, (req, res) => res.send(template.response(req)));
});
stdWarning('---xxx---');

// Catch 404 error
app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404).json({
        message: err.message,
        error: err
    });
});

// Create HTTP server.
const server = http.createServer(app);

server.listen(mockSeverPort, () => {
    spinner.stop();
    stdSuccess(`mock api 服务已经启动，${mockURL}`);
});

server.on('error', onError);


// Event listener for HTTP server "error" event.
function onError(error: any) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof mockSeverPort === 'string' ? 'Pipe ' + mockSeverPort : 'Port ' + mockSeverPort;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error('Express ERROR (app) : %s requires elevated privileges', bind);
            process.exit(1);
        case 'EADDRINUSE':
            console.error('Express ERROR (app) : %s is already in use', bind);
            process.exit(1);
        default:
            throw error;
    }
}
