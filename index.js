const { close, open, utimes, existsSync } = require("fs");

const getFileName = () => {
  const $ = new Date(),
    n = ("00" + $.getFullYear()).slice(-4),
    e = ("00" + ($.getMonth() + 1)).slice(-2),
    c = ("00" + $.getDate()).slice(-2),
    d = ["PZR", "PTS", "SLI", "CRS", "PRS", "CMA", "CTS"][$.getDay()];
  const result = `${n}${e}${c}_${d}.txt`;
  return result;
};

const touch = (path, callback) => {
  const time = new Date();
  utimes(path, time, time, (err) => {
    if (err) {
      return open(path, "w", (err, fd) => {
        err ? callback(err) : close(fd, callback);
      });
    }
    callback();
  });
};

const fileName = getFileName();
if (!existsSync(fileName)) {
  touch(fileName, (err) => {
    if (err) throw err;
    console.log(`${fileName}`);
  });
}
