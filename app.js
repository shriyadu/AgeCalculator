function isValidDate(day, month, year) 


{
    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) 
    {
        return false;
    }
    
    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let maxDays = daysInMonth[month - 1];
    
    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)) 
    {  
        maxDays = 29;
    }
    
    return day <= maxDays;
}

function calculateAge(idSuffix, label) {
    var d1 = parseInt(document.getElementById("date" + idSuffix).value);
    var m1 = parseInt(document.getElementById("month" + idSuffix).value);
    var y1 = parseInt(document.getElementById("year" + idSuffix).value);

    var date = new Date();
    var d2 = date.getDate();
    var m2 = 1 + date.getMonth();
    var y2 = date.getFullYear();
    var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2) {
        d2 = d2 + month[m2 - 1];
        m2 = m2 - 1;
    }

    if (m1 > m2) {
        m2 = m2 + 12;
        y2 = y2 - 1;
    }

    var d = d2 - d1;
    var m = m2 - m1;
    var y = y2 - y1;

    if (d < 0) {
        m--;
        d = month[m2 - 1] - d1 + d2;
    }

    if (m < 0) {
        y--;
        m = 12 + m2 - m1;
    }

    return label + y + " Years " + m + " Months " + d + " Days";
}


function calculateAges() {
    var date1 = parseInt(document.getElementById("date1").value);
    var month1 = parseInt(document.getElementById("month1").value);
    var year1 = parseInt(document.getElementById("year1").value);

    var date2 = parseInt(document.getElementById("date2").value);
    var month2 = parseInt(document.getElementById("month2").value);
    var year2 = parseInt(document.getElementById("year2").value);

    if (!date1 || !month1 || !year1 || !date2 || !month2 || !year2) {
        alert("Please fill in all the fields.");
        return;
    }

    if (!isValidDate(date1, month1, year1) || !isValidDate(date2, month2, year2)) {
        alert("Please enter valid date values.");
        return;
    }

    var sonAge = calculateAge("1", "Son's age is ");
    var motherAge = calculateAge("2", "Mother's age is ");
    

    console.log("sonAge",sonAge)
    console.log("motherAge",motherAge)
   



    var sonAgeYears = parseInt(sonAge.split(" ")[3]);
    var motherAgeYears = parseInt(motherAge.split(" ")[3]);

    var sonAgeMonths = parseInt(sonAge.split(" ")[5]);
    var motherAgeMonths = parseInt(motherAge.split(" ")[5]);

    var sonAgeDays = parseInt(sonAge.split(" ")[7]);
    var motherAgeDays = parseInt(motherAge.split(" ")[7]);




    var ageDifferenceYears = Math.abs(sonAgeYears - motherAgeYears);
    var ageDifferenceMonths = Math.abs(sonAgeMonths - motherAgeMonths);
    var ageDifferenceDays = Math.abs(sonAgeDays - motherAgeDays);

    if (sonAgeYears === motherAgeYears) {
        alert("Mother's age and son's age cannot be the same.");
        return;
    }

    if (sonAgeYears > motherAgeYears) {
        alert("Son's age cannot be greater than mother's age.");
        return;
    }

    if (ageDifferenceYears < 18 || (ageDifferenceYears === 18 && ageDifferenceMonths === 0 && ageDifferenceDays === 0)) {
        alert("There should be at least 18 years age difference between mother and son.");
        return;
    }

    var sonAgeDiv = document.getElementById("age1");
    var motherAgeDiv = document.getElementById("age2");
    var ageDifferenceDiv = document.getElementById("ageDifference");

    sonAgeDiv.innerHTML = sonAge;
    motherAgeDiv.innerHTML = motherAge;
    ageDifferenceDiv.innerHTML = "Age Difference is " + ageDifferenceYears + " Years " + ageDifferenceMonths + " Months " + ageDifferenceDays + " Days";
}



function moveCursorToNextInput(currentInput, nextInput) {
    if (currentInput.value.length >= currentInput.maxLength) {
        nextInput.focus();
    }
}

window.onload = function () {
    var date1 = document.getElementById("date1");
    var month1 = document.getElementById("month1");
    var year1 = document.getElementById("year1");

    var date2 = document.getElementById("date2");
    var month2 = document.getElementById("month2");
    var year2 = document.getElementById("year2");
    var calculateButton = document.querySelector('input[name="submit"]');
    date1.addEventListener("input", function () {
        moveCursorToNextInput(date1, month1);
    });

    month1.addEventListener("input", function () {
        moveCursorToNextInput(month1, year1);
    });

    date2.addEventListener("input", function () {
        moveCursorToNextInput(date2, month2);
    });

    month2.addEventListener("input", function () {
        moveCursorToNextInput(month2, year2);
    });

    year1.addEventListener("input", function () {
        moveCursorToNextInput(year1, date2);
    });

    year2.addEventListener("input", function () {
        moveCursorToNextInput(year2, calculateButton); 
    });
}