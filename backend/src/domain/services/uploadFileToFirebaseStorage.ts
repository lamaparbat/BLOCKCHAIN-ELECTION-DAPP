const { firebaseStorageRef } = require("../../infrastructure/index");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

module.exports = async (path: string, filename: string, storageName: string): Promise<Object> => {
  try {
    const isUploaded = await firebaseStorageRef.upload(path + filename, {
      public: true,
      destination: `${storageName}/${filename}`,
      metadata: { firebaseStorageDownloadTokens: uuidv4() }
    });

    if (isUploaded) {
      const folderPath = path?.substr(0, path?.length - 1);

      // unsync folder
      fs.rmdirSync(folderPath, { recursive: true });

      // recreate the folder
      fs.mkdirSync(folderPath);
    }

    return isUploaded;
  } catch (error) {
    console.error(error);
    return { message: "upload failed !", error };
  }
}
