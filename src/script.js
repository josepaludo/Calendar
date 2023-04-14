
function maintenance() {
    headerButtonsMaintenance();
    yearsMaintenance();
    monthsMaintenance();
    daysMaintenance();
}

function headerButtonsMaintenance() {
    const headerUl = document.getElementById("headerUL")
    for (listItem of headerUl.children) {
        const anchor = listItem.querySelector("a");
        anchor.addEventListener("click", (e) => {
            turnCorrectLinkActive(headerUl, e.target);
            displayCorrectContent(e.target);
        })
    }
}

function turnCorrectLinkActive(headerUl, target) {
    for (let item of headerUl.children) {
    let anchor_ = item.querySelector("a");
    anchor_.classList.remove("active");

    let timeDiv = getTimeDivByAnchortagData(anchor_);
    timeDiv.style.display = "none";
    }
    target.classList.add("active");
}

function displayCorrectContent(target) {
    timeDiv = getTimeDivByAnchortagData(target);
    timeDiv.style.display = "flex";

    switch (target) {
        case "monthsDiv":
            monthsMaintenance(); 
            break;
        case "daysDiv":
            daysMaintenance();
            break;
    }
}

function getTimeDivByAnchortagData(anchortag) {
    const divId = anchortag.dataset.relDiv;
    const timeDiv = document.getElementById(divId);
    return timeDiv;
}

function yearsMaintenance() {
    const yearsDiv = document.getElementById("yearsDiv");
    yearsDiv.style.display = 'flex';

    let year = new Date().getFullYear();
    for (let i = year; i >= 1970 ; i--) {
        createYearDiv(i);
    }
}

function createYearDiv(year) {
    const container = getYearDivContainer();
    const yearCard = getYearDivCard();
    container.appendChild(yearCard);

    bodyYear = getYearDivCardButton();
    yearCard.appendChild(bodyYear);

    header = getYearDivCardHeader(year);
    bodyYear.appendChild(header);
}

function getYearDivContainer() {
    const container = document.createElement("div");
    container.classList.add("p-3");
    const yearsContainer = document.getElementById("yearsDiv");
    yearsContainer.appendChild(container);
    return container;
}

function getYearDivCard() {
    const yearDiv = document.createElement("div");
    for (let class_ of ["card", "col", "text-center"]) {
        yearDiv.classList.add(class_);
    }
    return yearDiv;
}

function getYearDivCardButton() {
    const bodyYear = document.createElement("button");
    for (class_ of ["card-body", "btn", "text-white"]) {
        bodyYear.classList.add(class_);
    }
    bodyYear.onclick = (e) => {
        checkMonthsOfYear(e.target);
    }
    return bodyYear;
}

function getYearDivCardHeader(year) {
    const headerYear = document.createElement("h3");
    headerYear.classList.add("card-title");
    headerYear.textContent = year;
    return headerYear;
}

function checkMonthsOfYear(button) {
    if (button.tagName === "H3") {
        // If clicking from days/months tab, ignore
        if (!button.classList.contains("yearTitle")) {
            button = button.parentElement;
        }
    }
    const year = Number(button.textContent);
    const monthsLink = document.getElementById("monthsLink");
    monthsLink.click();
    monthsMaintenance(year);
}

function monthsMaintenance(year=2023) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthsDiv = document.getElementById("monthsDiv");
    deleteContent(monthsDiv);
    for (let i = 0; i < months.length; i++) {
        let monthDiv = getMonthDiv(year, months[i], i, 1);
        monthsDiv.appendChild(monthDiv);
    }
}

function daysMaintenance(year=2023, month="January", monthInd=0) {
    const daysContainer = document.getElementById("daysDiv");
    deleteContent(daysContainer);
    const container = getMonthDiv(year, month, monthInd);
    daysContainer.appendChild(container);
}

function getMonthDiv(year, month, monthInd, padding=3) {
    const container = getMonthContainer(padding);
    const monthCardDiv = getMonthCardDiv();
    container.appendChild(monthCardDiv)

    const cardHeader = getCardHeader(year, month, monthInd);
    monthCardDiv.appendChild(cardHeader);

    const cardBody = getCardBody(year, month, monthInd, padding);
    monthCardDiv.appendChild(cardBody);

    return container;
}

function getMonthContainer(padding) {
    const container = document.createElement("div");
    container.classList.add(`p-${padding}`);
    container.classList.add("col");
    return container;
}

function getMonthCardDiv() {
    const daysDiv = document.createElement("div");
    daysDiv.classList.add("card");
    return daysDiv
}

function getCardHeader(year, month, monthInd) {
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");

    const cardTitle = getCardTitle(year);
    cardHeader.appendChild(cardTitle);
    const cardSubtitle = getCardSubtitle(year, month, monthInd);
    cardHeader.appendChild(cardSubtitle);

    return cardHeader;
}

function getCardTitle(year) {
    const heading = document.createElement("h3");
    let classes = ["card-title", "text-white", "yearTitle", "d-inline", "my-3"];
    for (let class_ of classes) {
        heading.classList.add(class_);
    }
    heading.textContent = year;
    heading.onclick = (e) => {
        checkMonthsOfYear(e.target);
    }
    return heading;
}

function getCardSubtitle(year, month, monthInd) {
    const subHeading = document.createElement("h4");
    classes = ["card-subtitle", "my-3", "text-body-secondary", "monthTitle"];
    for (let class_ of classes) {
        subHeading.classList.add(class_);
    }
    subHeading.onclick = (e) => {
        checkDaysOfMonth(year, month, monthInd);
    }
    subHeading.textContent = month;
    return subHeading;
}

function getCardBody(year, month, monthInd, padding) {
    const body = document.createElement("div");
    body.classList.add("card-body");

    const daysGridContainer = getDaysGridContainer();
    body.appendChild(daysGridContainer);
    const daysGrid = getDaysGrid();
    daysGridContainer.appendChild(daysGrid);

    appendWeekDaysToGrid(daysGrid, padding);
    appendEmptyDaysBeforeFirstDayToGrid(year, monthInd, daysGrid);
    appendMonthDaysToGrid(year, monthInd, daysGrid);

    return body;
}

function getDaysGridContainer() {
    const daysGridContainer = document.createElement("div");
    daysGridContainer.classList.add("container");
    return daysGridContainer;
}

function getDaysGrid() {
    const daysGrid = document.createElement("div");
    daysGrid.classList.add("calendarGrid");
    return daysGrid;
}

function appendWeekDaysToGrid(daysGrid, padding) {
    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    for (let day of weekDays) {
        let littleDiv = document.createElement("div");
        classes = [`p-${padding}`, "text-center", "fw-bold", "text-white"];
        for (let class_ of classes) {
            littleDiv.classList.add(class_);
        }
        littleDiv.textContent = day;
        daysGrid.appendChild(littleDiv);
    }
}

function appendEmptyDaysBeforeFirstDayToGrid(year, monthInd, daysGrid) {
    const daysBeforeWeekDay1= new Date(year, monthInd).getDay();
    for (let i = 0; i < daysBeforeWeekDay1; i++) {
        let emptyDiv = document.createElement("div");
        daysGrid.appendChild(emptyDiv);
    }
}

function appendMonthDaysToGrid(year, monthInd, daysGrid) {
    const daysInMonth = new Date(year, monthInd, 0).getDate();
    for (let i = 0; i < daysInMonth; i++) {
        let littleDiv = document.createElement("div");
        for (let class_ of ["p-3", "text-center", "littleDiv"]) {
            littleDiv.classList.add(class_);
        }
        littleDiv.textContent = i+1;
        daysGrid.appendChild(littleDiv);
    }
}

function checkDaysOfMonth(year, month, monthInd) {
    const daysLink = document.getElementById("daysLink");
    daysLink.click();
    daysMaintenance(year, month, monthInd)
}

function deleteContent(div) {
    for (let i = div.children.length-1; i>=0; i--) {
        div.children[i].remove();
    }
}
