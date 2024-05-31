import moment from "moment"

export const twelveHourFormat = (time) =>
  moment(time, "HH:mm").format("hh:mm A")

export const monthDayFormat = (time) => moment(time).format("MMMM DD")
