const fs = require("fs");
const filename = "./messy.txt";

function cleanFile() {
  fs.readFile(filename, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }

    const cleanData = data.replace(/\s+/g, " ").trim(); // regex to remove internal spaces, trim to remove outer spaces

    fs.writeFile(filename, cleanData, "utf-8", (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File cleaned Successfully");
      }
    });
  });
}

cleanFile();
