export function formatDate(date) {
  const year = date?.substring(0, 4);
  const month = date?.substring(4, 6);
  const day = date?.substring(6, 8);

  const newDate = `${year}-${month}-${day}`;

  return newDate;
}

export function formatDateToString(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  );
}

export function formatDateByRemoveDash(date) {
  const year = date?.substring(0, 4);
  const month = date?.substring(5, 7);
  const day = date?.substring(8, 10);

  const newDate = `${year}${month}${day}`;

  return newDate;
}

export function formatDateToStringWithDash(date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "-" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  );
}

export function formatDateToStringWithoutDash(date) {
  return (
    date.getFullYear() +
    "" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) +
    "" +
    (date.getDate() < 10 ? "0" + date.getDate() : date.getDate())
  );
}
