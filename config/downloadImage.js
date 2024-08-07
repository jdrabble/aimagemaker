const fs = require("fs");
const https = require("https");

const downloadImage = async (url, filepath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get image: ${response.statusMessage}`));
          return;
        }
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (err) => {
        fs.unlink(filepath, () => reject(err));
      });
  });
};

module.exports = downloadImage;
