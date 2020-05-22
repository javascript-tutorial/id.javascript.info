function getWeekDay(date) {
  let days = ['MIN', 'SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB'];

  return days[date.getDay()];
}
