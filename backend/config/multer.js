const multer = require("multer");

const {
  CloudinaryStorage
} = require("multer-storage-cloudinary");

const cloudinary =
  require("./cloudinary");

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (req, file) => {

      const isPdf =
        file.mimetype ===
        "application/pdf";

      return {

        folder:
          "semicolon-exams",

        resource_type:
          isPdf
            ? "raw"
            : "image"

      };

    }

  });

const upload =
  multer({

    storage

  });

module.exports = upload;