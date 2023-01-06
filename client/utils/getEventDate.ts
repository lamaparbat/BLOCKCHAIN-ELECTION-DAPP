import moment from "moment";

export const getEventDate = (endDate: string) => {
  const startDate = moment();
  const diffInMillis = moment(endDate).diff(startDate);
  const duration = moment.duration(diffInMillis);

  const days = duration.days();
  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  return { days, hours, minutes, seconds, diffInMillis };
}