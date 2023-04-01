const { firebaseStorageRef } = require("../../infrastructure/index");
const { v4: uuidv4 } = require("uuid");

module.exports = async (path: string, filename: string, storageName: string): Promise<Object> => {
  console.log({ path, filename, storageName })
  try {
    return await firebaseStorageRef.upload(path + filename, {
      public: true,
      destination: `${storageName}/${filename}`,
      metadata: { firebaseStorageDownloadTokens: uuidv4() }
    });
  } catch (error) {
    console.error(error);
    return { message: "upload failed !", error };
  }
}
