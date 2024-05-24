import moment from 'moment'

export const twelveHourFormat = (time) => moment(time, 'HH:mm').format('hh:mm A')