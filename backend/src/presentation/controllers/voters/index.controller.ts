import { Request, Response } from 'express';

const { UPLOAD_FOLDER_PATH } = require("../../../constants/index.js");
const { uploadFileToFirebaseStorage } = require("../../../domain/services/index");

const voterModal = require("../../../infrastructure/models/voter.model");

const voterSignup = async (req: Request, res: Response) => {
 try {
  const { fullName, citizenshipNumber, province, district, municipality, ward, email, password } = req.body;
  const firebaseStorageResponse = await uploadFileToFirebaseStorage(UPLOAD_FOLDER_PATH, req?.file?.filename);
  const imgHostedURL = firebaseStorageResponse[0]?.metadata?.mediaLink;

  await new voterModal({
   fullName, citizenshipNumber,
   province, district, municipality,
   ward, email, password, profile: imgHostedURL,
   createdAt: Date.now()
  }).save();

  res.status(200).send({
   message: "Voter registered successfully",
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

const getVoterLists = async (req: Request, res: Response) => {
 try {
  const { skip } = req.query;

  const response = await voterModal.find().skip(skip).limit(10);
  console.log(response)
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