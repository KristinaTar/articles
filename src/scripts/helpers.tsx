import React from "react";

export function getHighlightedText(text: string, highlight: string) {
  // Split on highlight term and include term into parts, ignore case
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return <span> { parts.map((part, i) =>
      <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: '#fff96e' } : {} }>
    { part }
    </span>)
  } </span>;
}

const nth = function(d: number) {
  if (d > 3 && d < 21) return 'th';
  switch (d % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
  }
}


export function convertDate(publishedAt: string) {
  const milliseconds = Date.parse(publishedAt);
  const dateObject = new Date(milliseconds);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const m = dateObject.getMonth();
  const d = dateObject.getDate();
  const y = dateObject.getFullYear();
  return (months[m] + " " + d + nth(d) + ", " + y);
}

export {};
