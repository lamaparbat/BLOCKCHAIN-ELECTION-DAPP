import { Request, Response } from 'express';

const { electionModel } = require("../../infrastructure/models/index.model");
const { startElectionCronJob } = require("../../domain/services/index");

const createElection = async (req: Request, res: Response) => {
 try {
  const { title, description, startDate, endDate } = req.body;

  await new electionModel({
   title, description,
   startDate, endDate,
   createdAt: Date.now()
  }).save();

  // assign date listener job to cron
  startElectionCronJob(startDate, endDate);

  res.status(200).send({
   message: "Election registered successfully",
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
 createElection
}