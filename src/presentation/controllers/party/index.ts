import { Request, Response } from 'express';

const { UPLOAD_FOLDER_PATH } = require("../../../constants/index.js");
const { uploadFileToFirebaseStorage } = require("../../../domain/services/index");

const { candidateModal, partyModel } = require("../../../infrastructure/models/index.model");


const candidateSignup = async (req: Request, res: Response) => {
  try {
    const { fullName, citizenshipNumber, province, district, municipality, ward, email, password } = req.body;
    const firebaseStorageResponse = await uploadFileToFirebaseStorage(UPLOAD_FOLDER_PATH, req?.file?.filename, "candidates");
    const imgHostedURL = firebaseStorageResponse[0]?.metadata?.mediaLink;

    const response = await new candidateModal({
      fullName, citizenshipNumber,
      province, district, municipality,
      ward, email, password, profile: imgHostedURL,
      createdAt: Date.now()
    }).save();

    res.status(200).send({
      message: "Candidate registered successfully",
      statusCode: 200,
      data: response
    });

  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal Server Error.",
      statusCode: 500
    });
  }
};

const getCandidateLists = async (req: Request, res: Response) => {
  try {
    const { skip } = req.query;

    const response = await candidateModal.find().skip(skip).limit(10);
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

const partySignup = async (req: Request, res: Response) => {
  try {
    const { partyName, totalMembers, agenda } = req.body;
    const firebaseStorageResponse = await uploadFileToFirebaseStorage(UPLOAD_FOLDER_PATH, req?.file?.filename, "party");
    const imgHostedURL = firebaseStorageResponse[0]?.metadata?.mediaLink;

    const response = await new partyModel({
      partyName, totalMembers, agenda, logo: imgHostedURL,
      createdAt: Date.now()
    }).save();

    res.status(200).send({
      message: "party registered successfully",
      statusCode: 200,
      data: response
    });

  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: "Internal Server Error.",
      statusCode: 500
    });
  }
};

const getPartyLists = async (req: Request, res: Response) => {
  try {
    const { skip } = req.query;

    const response = await partyModel.find().skip(skip).limit(10);
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
  getCandidateLists,
  candidateSignup,
  getPartyLists,
  partySignup
}