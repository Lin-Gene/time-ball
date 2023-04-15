// to do, fix logic at midnight
// currently default display doesn't work at midnight (changing to 00 doesn't work if it's a number? and changing to 12 makes it think it's pm)
// also the math would need to change for comparisons at midnight (24hr format restarts)
// in fact, any hour or minute with a single digit doesn't work (e.g. 5:5 is invalid, needs to be 05:05)
// ^ only applies to the default time tho, just have a method that adds in a leading zero or something (since you pass em in as strings anyways)

const watchInput = document.querySelector("#watchInputForm");
const recordsList = document.querySelector("#records");

setDefault();

function setDefault() {
    let today = new Date(); 
    let currTime = `${formatTime(today.getHours())}:${formatTime(today.getMinutes())}`;
    document.querySelector("input[type=time]").value = currTime;
}

function formatTime(time) {
    if (time < 10) {
        return "0" + time.toString();
    } else {
        return time;
    }
}

// write function to compare two time strings (return differences in seconds) (calculated as watch time - actual time)
function compareTime(inputHr, inputMin, currHr, currMin, currSec) {
    let secondsDiff = (inputHr - currHr) * 60 * 60 + (inputMin - currMin) * 60 - currSec;
    return secondsDiff;
}

// write function to append new time diff to list
function updateRecord (content) {
    const newEntry = document.createElement('li');
    newEntry.append(content);
    recordsList.append(newEntry);
}


watchInput.addEventListener('submit', function (e) {
    e.preventDefault();
    const timeInput = watchInput.elements.watchTime.value;

    //for debugging
    console.log(timeInput);
    
    const timeInputArr = timeInput.toString().split(":");
    let inputHr = parseInt(timeInputArr[0]);
    let inputMin = parseInt(timeInputArr[1]);

    let today = new Date();
    let currHr = today.getHours();
    if (currHr === 0 && inputHr > 12) {
        currHr = 24;
    }
    let currMin = today.getMinutes();
    let currSec = today.getSeconds();

    const difference = compareTime(inputHr, inputMin, currHr, currMin, currSec);
    if (currHr === 24) {
        currHr = 00;
    }

    updateRecord(`Measured at ${formatTime(currHr)}:${formatTime(currMin)}:${formatTime(currSec)} with a difference of ${difference} seconds`);
    
});



