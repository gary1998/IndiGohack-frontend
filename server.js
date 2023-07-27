const http = require('http');
const nStatic = require('node-static');
const fileServer = new nStatic.Server('.');
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
http.createServer(function (req, res) {
    fileServer.serve(req, res);
}).listen(port, host, () => {
    console.log(`frontend is running at http://${host}:${port}`);
});