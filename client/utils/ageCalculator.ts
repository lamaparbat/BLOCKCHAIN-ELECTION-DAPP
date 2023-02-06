import moment from "moment";

export const getConvertedAge = (dob: string): number => {
  const currentDate = moment(new Date());
  const birthDate = moment(new Date(dob));
  const age = currentDate.diff(birthDate, "years");
  return age;
}