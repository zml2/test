/**
 * 时间戳转换
 */
export function timeFormat(data, formate) {
  const _time = new Date(data)
  const _year = _time.getFullYear()
  const _month = _time.getMonth() + 1 > 9 ? _time.getMonth() + 1 : ('0' + _time.getMonth() + 1)
  const _day = _time.getDate()
  const _hour = _time.getHours() > 9 ? _time.getHours() : '0' + _time.getHours()
  const _min = _time.getMinutes() > 9 ? _time.getMinutes() : '0' + _time.getMinutes()
  const _sec = _time.getSeconds() > 9 ? _time.getSeconds() : '0' + _time.getSeconds()

  switch (formate) {
    case 'yyyy/mm/dd hh:min:ss':
      return _year + '-' + _month + '-' + _day + '  ' + _hour + ':' + _min + ':' + _sec
    case 'yyyy/mm/dd hh:min':
      return _year + '-' + _month + '-' + _day + '  ' + _hour + ':' + _min
    case 'yyyy/mm/dd':
      return _year + '-' + _month + '-' + _day
    default:
      return false
  }
}
