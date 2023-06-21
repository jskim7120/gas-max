export function DateWithDash(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }

  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const withoutDashRegex = /^\d{8}$/;

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
    if (regex.test(date)) {
      return date;
    } else {
      const temp = date?.replace(/-/g, "");
      const year = temp.substring(0, 4);
      const month = temp.substring(4, 6);
      const day = temp.substring(6, 8);
      return `${year}-${month}-${day}`;
    }
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
    const temp = date?.replace(/-/g, "");
    const year = temp?.substring(0, 4);
    const month = temp?.substring(4, 6);
    const newDate = `${year}-${month}`;

    return newDate;
  }
  return "";
}

export function DateWithoutDash(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }

  if (typeof date === "string") {
    date = date?.replace(/-/g, "");
    return date;
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

export function DateWithoutDashOnlyYearMonth(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }

  if (typeof date === "string") {
    date = date?.replace(/-/g, "");
    return date;
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

  return "";
}

export function GetMonth(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }

  if (typeof date === "string") {
    date = date?.replace(/-/g, "");
    return date.substring(4, 6);
  }

  if (date instanceof Date) {
    return date.getMonth() + 1;
  }

  return "";
}

export function GetYear(date) {
  if (date === null || date === undefined || date === "") {
    return "";
  }

  if (typeof date === "string") {
    return date.substring(0, 4);
  }

  if (date instanceof Date) {
    return date.getFullYear();
  }

  return "";
}
