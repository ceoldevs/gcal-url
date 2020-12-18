#! /usr/bin/env node
import { prompt } from 'inquirer';
import { writeSync } from 'clipboardy';
//import terminalLink from 'terminal-link';

interface CalInfo {
  text: string,
  dates: string,
}

interface URLInfo extends CalInfo {
  action: string
}


let url = new URL('https://calendar.google.com/calendar/render');

const getTodaysDate= (): string => {
  const dt = new Date();

  let year = dt.getFullYear();
  let month = dt.getMonth();
  let date = dt.getDate();
  return `${year}-${month}-${date}`
}


prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter the title of the event',
    default: 'EDC assignment-1',
  },
  {
    type: 'input',
    name: 'dates',
    message: 'Enter the date [YYYY-MM-DD]',
    default: getTodaysDate(),
  },
])
.then(
  (calInfo: CalInfo) => {
    const urlInfo: URLInfo = {action: "TEMPLATE",...calInfo};
    let theDate: string = calInfo.dates;
    let number: number = Number(theDate.replace(/\-/g, ""));

    let dates: string = `${number}/${number+1}`;

    url.search = new URLSearchParams({...urlInfo, dates}).toString().replace("%2F", "/");

    console.log(url.toString());
    //console.log(terminalLink("link", url.toString()))
    writeSync(url.toString());
    console.log("URL copied to Clipboard.")
    //console.log("URL copied to Clipboard. 📋")
  } 
);
