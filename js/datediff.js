// Ref: https://stackoverflow.com/a/7763788/3386952
var d1 = new Date(2011, 0, 1); // jan,1 2011
var d2 = new Date(); // now

var diff = d2 - d1, sign = diff < 0 ? -1 : 1, milliseconds, seconds, minutes, hours, days;
diff /= sign; // or diff=Math.abs(diff);
diff = (diff - (milliseconds = diff % 1000)) / 1000;
diff = (diff - (seconds = diff % 60)) / 60;
diff = (diff - (minutes = diff % 60)) / 60;
days = (diff - (hours = diff % 24)) / 24;

console.info(sign === 1 ? "Elapsed: " : "Remains: ",
    days + " days, ",
    hours + " hours, ",
    minutes + " minutes, ",
    seconds + " seconds, ",
    milliseconds + " milliseconds.");