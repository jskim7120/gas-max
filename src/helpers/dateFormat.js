export function DateWithoutDash(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }

  if (typeof date === "string") {
    return date.replace(/-/g, "");
  }
  if (date instanceof Date) {
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
  return "";
}

export function DateWithDash(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }
  if (date instanceof Date) {
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
  if (typeof date === "string") {
    const year = date?.substring(0, 4);
    const month = date?.substring(4, 6);
    const day = date?.substring(6, 8);

    const newDate = `${year}-${month}-${day}`;
    return newDate;
  }
  return "";
}

export function DateWithoutDashOnlyYearMonth(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }
  if (date instanceof Date) {
    return (
      date.getFullYear() +
      "" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1)
    );
  }
  if (typeof date === "string") {
    date.replace(/-/g, "");
    const year = date?.substring(0, 4);
    const month = date?.substring(5, 7);
    const newDate = `${year}${month}`;
    return newDate;
  }
  return "";
}
export function DateWithDashOnlyYearMonth(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }
  if (date instanceof Date) {
    return (
      date.getFullYear() +
      "-" +
      (date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1)
    );
  }
  if (typeof date === "string") {
    const year = date?.substring(0, 4);
    const month = date?.substring(5, 7);
    const newDate = `${year}-${month}`;

    return newDate;
  }
  return "";
}

// -------------------------------------------------------------------------

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

export function formatDateToStringWithoutDashOnlyYearMonth(date) {
  return (
    date.getFullYear() +
    "" +
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1)
  );
}

export function formatOnlyYearMonthDateByRemoveDash(date) {
  const year = date?.substring(0, 4);
  const month = date?.substring(5, 7);
  const newDate = `${year}${month}`;

  return newDate;
}
