const { close, open, utimes, existsSync } = require("fs");

const args = process.argv.slice(2);

const getFileName = () => {
  const days =
    args[0] == "en" || args[0] == "-en" || args[0] == "e" || args[0] == "-e"
      ? ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
      : ["PZR", "PTS", "SLI", "CRS", "PRS", "CMA", "CTS"];

  const $ = new Date(),
    n = ("00" + $.getFullYear()).slice(-4),
    e = ("00" + ($.getMonth() + 1)).slice(-2),
    c = ("00" + $.getDate()).slice(-2),
    d = days[$.getDay()];
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
