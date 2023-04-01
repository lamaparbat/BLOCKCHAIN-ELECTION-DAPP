import { Request, Response } from 'express';

const { UPLOAD_FOLDER_PATH } = require("../../../constants/index.js");
const { uploadFileToFirebaseStorage } = require("../../../domain/services/index");

const uploadFile = async (req: Request, res: Response) => {
  try {
    const arr = req?.files as Express.Multer.File[];

    const promises = arr.map(async (d: any) => {
      const firebaseStorageResponse = await uploadFileToFirebaseStorage(UPLOAD_FOLDER_PATH, d.filename, "uploads");

      return firebaseStorageResponse[0]?.metadata?.mediaLink;
    });

    const imgHostedURL = await Promise.all(promises);

    res.status(200).send({
      message: "File uploaded successfully",
      url: imgHostedURL,
      statusCode: 200
    });
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal Server Error.",
      url: null,
      statusCode: 500
    });
  }
};

module.exports = {
  uploadFile
}