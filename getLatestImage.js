const fs = require("fs");
      const path = require("path");

      const folderPath = "images"; // Replace with the actual path to your image folder

      fs.readdir(folderPath, (err, files) => {
        if (err) {
          console.error("Error reading directory:", err);
          return;
        }

        const imageFiles = files.filter((file) => {
          const extname = path.extname(file).toLowerCase();
          return (
            extname === ".jpg" ||
            extname === ".jpeg" ||
            extname === ".png" ||
            extname === ".gif"
          );
        });

        if (imageFiles.length === 0) {
          console.log("No image files found in the folder.");
        } else {
          const latestImage = imageFiles.reduce((prev, current) => {
            const prevMtime = fs.statSync(path.join(folderPath, prev)).mtime;
            const currentMtime = fs.statSync(
              path.join(folderPath, current)
            ).mtime;
            return prevMtime > currentMtime ? prev : current;
          });

          console.log(
            "The name of the latest image in the folder is:",
            latestImage
          );
        }
      });