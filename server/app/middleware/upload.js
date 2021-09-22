const util = require("util");
const Multer = require("multer");
const maxSize = 512 * 1024; // 512Kb

let processFile = Multer({
  storage: Multer.memoryStorage(),
  limits: { fileSize: maxSize },
}).single("file");

let processFileMiddleware = util.promisify(processFile);
module.exports = processFileMiddleware;
