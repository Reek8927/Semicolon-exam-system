const cloudinary =
  require("../config/cloudinary");

const streamifier =
  require("streamifier");

// =========================
// BUFFER UPLOAD
// =========================

const uploadBufferToCloudinary =
  (buffer, filename) => {

    return new Promise(

      (resolve, reject) => {

        const stream =
          cloudinary.uploader.upload_stream(

            {

              folder:
                "semicolon-report-cards",

              resource_type:
                "raw",

              public_id:
                filename

            },

            (error, result) => {

              if (result) {

                resolve(result);

              } else {

                reject(error);

              }

            }

          );

        streamifier

          .createReadStream(buffer)

          .pipe(stream);

      }

    );

};

module.exports =
  uploadBufferToCloudinary;