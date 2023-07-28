const http = require("http");
const fs = require("fs");
const nStatic = require("node-static");
const fileServer = new nStatic.Server(".");
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
fs.writeFile(
  "/opt/app-root/src/js/config.json",
  `{"BACKEND_URL":"${process.env.BACKEND_URL}"}`,
  (err) => {
    if (err) {
      console.log("cannot update `BACKEND_URL` automatically, please consider updating manually");
    }
  }
);
http
  .createServer(function (req, res) {
    fileServer.serve(req, res);
  })
  .listen(port, host, () => {
    console.log(`frontend is running at http://${host}:${port}`);
  });
