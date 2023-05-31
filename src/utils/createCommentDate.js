const month = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];
const options = {
  timeZone: "Europe/Kiev",
  hour12: false,
  hour: "numeric",
  minute: "numeric",
};

export const createCommentDate = () => {
  const date = new Date();
  const newDate = Date.now();
  const formatter = new Intl.DateTimeFormat("default", options);
  const timeString = formatter.format(date);
  const commentDate = `${date.getDate().toString().padStart(2, "0")} ${
    month[date.getMonth()]
  }, ${date.getFullYear()} | ${timeString}`;

  return { commentDate, newDate };
};
