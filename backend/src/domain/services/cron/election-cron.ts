const cron = require("node-cron");
const { pusherInstance } = require("../../../../configs/index.js");


const startJob = (startDate: string, endDate: string) => {
 // convert date form
 const startDateFormat = new Date(startDate);
 const endDateFormat = new Date(endDate);

 const scheduleStartDateString = `${startDateFormat.getMinutes()} ${startDateFormat.getHours()} ${startDateFormat.getDate()} ${startDateFormat.getMonth() + 1} ${startDateFormat.getDay()}`;
 const scheduleEndDateString = `${endDateFormat.getMinutes()} ${endDateFormat.getHours()} ${endDateFormat.getDate()} ${endDateFormat.getMonth() + 1} ${endDateFormat.getDay()}`;

 console.log(scheduleStartDateString, scheduleEndDateString)

 // start listening to the start date events
 cron.schedule(scheduleStartDateString, () => {
  console.log("startdate triggered");
  pusherInstance.trigger("election", "start-election-event", {});
 });

 // start listening to the start date events
 cron.schedule(scheduleEndDateString, () => {
  console.log("endate triggered");
  pusherInstance.trigger("election", "end-election-event", {});
 });
}

module.exports = startJob;