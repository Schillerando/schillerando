export function reformatDate(date) {
  // YYYY-MM-DD
  if (date == null) return null;

  const parts = date.split('-');

  if (parts.length != 3) return '';

  return `${parts[2]}.${parts[1]}.${parts[0]}`;
}

export function cutSecondsFromTime(time) {
  if (time == null) return time;

  const parts = time.split(':');

  if (parts.length != 3) return '';

  return `${parts[0]}:${parts[1]}`;
}

export function calculateDuration(startTime, endTime) {
  if (startTime == null || endTime == null) return 100000;

  var startMinutes =
    parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);

  var endMinutes =
    parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);

  return endMinutes - startMinutes;
}
