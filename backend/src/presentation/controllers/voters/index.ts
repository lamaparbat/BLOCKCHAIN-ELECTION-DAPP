import { Request, Response } from 'express';

const { UPLOAD_FOLDER_PATH } = require("../../../constants/index");
const { uploadFileToFirebaseStorage } = require("../../../domain/services/index");

const { voterModel } = require("../../../infrastructure/models/index.model");

const voterSignup = async (req: Request, res: Response) => {
  try {
    const { fullName, citizenshipNumber, province, district, municipality, ward, email, password } = req.body;
    const firebaseStorageResponse = await uploadFileToFirebaseStorage(UPLOAD_FOLDER_PATH, req?.file?.filename, "voters");
    const imgHostedURL = firebaseStorageResponse[0]?.metadata?.mediaLink;

    const result = await new voterModel({
      fullName, citizenshipNumber,
      province, district, municipality,
      ward, email, password, profile: imgHostedURL,
      createdAt: Date.now()
    }).save();

    res.status(200).send({
      message: "Voter registered successfully",
      statusCode: 200,
      data: result
    });

  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal Server Error.",
      statusCode: 500
    });
  }
};

const getVoterLists = async (req: Request, res: Response) => {
  try {
    const { skip } = req.query;

    const response = await voterModel.find().skip(skip).limit(10);
    res.status(200).send({
      message: "Data fetched successfully",
      data: response,
      statusCode: 200
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Internal Server Error.",
      statusCode: 500
    });
  }
}


module.exports = {
  voterSignup,
  getVoterLists,
}