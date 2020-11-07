function calcTimeForRequest() {
  const date = new Date();
  const dateFrom = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  date.setDate(date.getDate() - 7);
  const dateTo = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  return { dateFrom, dateTo };
}

function formattingTime(time) {
  const mounths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июня', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const year = time.slice(0, 4);
  let mounth = time.slice(5, 7);
  let day = time.slice(8, 10);
  if (+day < 10) {
    day = day.slice(1);
  }
  mounth = mounths[+mounth - 1];
  return `${day} ${mounth} ${year}`;
}
export { calcTimeForRequest, formattingTime };