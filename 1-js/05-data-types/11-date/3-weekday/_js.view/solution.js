function getLocalDay(date) {

  let days = date.getDay();

  if (days == 0) { // hari ke-0 (Minggu) adalah hari ke-7 di Eropa
    days = 7;
  }

  return days;
}
