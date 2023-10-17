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
export function dateToTimestamp(dateString) {
  // Parse the input string as "yyyyMMdd"
  console.log("Input string", dateString);

  console.log(typeof dateString, "this is what i recieved on");

  const year = parseInt(dateString?.substr(0, 4), 10);
  const month = parseInt(dateString?.substr(4, 2) - 1, 10); // Months are 0-based (0 = January)
  const day = parseInt(dateString?.substr(6, 2), 10);

  // Create a Date object from the parsed components
  const date = new Date(year, month, day);

  // Get the timestamp
  console.log(date.getTime(), "timestamp result ");
  return date.getTime();
}

export function getPreviousMonthDate(dateString) {
  // Parse the "yyyyMMdd" format date string
  const year = parseInt(dateString?.substr(0, 4), 10);
  const month = parseInt(dateString?.substr(4, 2), 10) - 1; // Subtract 1 to use 0-based months
  const day = parseInt(dateString?.substr(6, 2), 10);

  // Create a Date object using the parsed values
  const date = new Date(year, month, day);

  // Subtract one month
  date.setMonth(date.getMonth() - 1);

  // Ensure the date is not before the original date
  if (date.getDate() !== day) {
    date.setDate(0); // Go back to the last day of the previous month
  }

  // Return the previous month's date in the "yyyyMMdd" format
  const previousYear = date.getFullYear().toString();
  let previousMonth = (date.getMonth() + 1).toString();
  if (previousMonth.length === 1) {
    previousMonth = "0" + previousMonth; // Add leading zero if needed
  }
  let previousDay = date.getDate().toString();
  if (previousDay.length === 1) {
    previousDay = "0" + previousDay; // Add leading zero if needed
  }
  return previousYear + previousMonth + previousDay;
}
