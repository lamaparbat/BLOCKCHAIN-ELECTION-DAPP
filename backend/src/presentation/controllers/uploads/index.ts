import { Request, Response } from 'express';

const { UPLOAD_FOLDER_PATH } = require("../../../constants/index.js");
const { uploadFileToFirebaseStorage } = require("../../../domain/services/index");

const uploadFile = async (req: Request, res: Response) => {
  try {
    const firebaseStorageResponse = await uploadFileToFirebaseStorage(UPLOAD_FOLDER_PATH, req?.file?.filename, "uploads");
    const imgHostedURL = firebaseStorageResponse[0]?.metadata?.mediaLink;
    res.status(200).send({
      message: "File uploaded successfully",
      url: imgHostedURL,
      statusCode: 200
    });
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal Server Error.",
      statusCode: 500
    });
  }
};

module.exports = {
  uploadFile
}