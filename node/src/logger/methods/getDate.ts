/**
 * @method getDate
 * Get the current date as a formatted string
 * 
 * @return Date formatted in a string
 */
const getDate = (): string => {
  let a: Date = new Date();
  let hour: number | string = a.getHours();
  let min: number | string = a.getMinutes();

  // Add `0` if number doesnt use 2 digits
  if (hour < 10) hour = `0${hour}`;
  if (min < 10) min = `0${min}`;

  return `${hour}:${min}`;
}

export default getDate;