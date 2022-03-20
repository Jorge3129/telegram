const dayjs = require('dayjs')
const isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)

console.log(dayjs('2022-03-19T10:16:35+02:00').isBetween(dayjs(), dayjs().subtract(5, 'day')));
