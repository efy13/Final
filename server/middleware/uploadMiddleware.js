const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../lib/cloudinaryConfig");
const path = require("path");

function uploadMiddleware(folderName) {
  if (!folderName) {
    throw new Error("Folder name is required for uploadMiddleware");
  }

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
      const folderPath = `${folderName.trim()}`; // Klasör adı
      const fileExtension = path.extname(file.originalname).substring(1); // Dosya uzantısı
      const publicId = `${file.fieldname}-${Date.now()}`; // Benzersiz dosya adı

      return {
        folder: folderPath,
        public_id: publicId,
        format: fileExtension,
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, 
    },
  });
}

module.exports = uploadMiddleware;