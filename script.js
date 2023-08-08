let modelContainer = document.querySelector(".model-cont");
let allPriorityColor = document.querySelectorAll(".priority-color");
let colorArr = ["lightpink", "lightgreen", "lightblue", "black"];
let modelPriorityColor = colorArr[colorArr.length - 1];
let textAreaContVal = document.querySelector(".textarea-cont");
let mainContainer = document.querySelector(".main-cont");
let removeBtn = document.querySelector(".remove-btn");
let removeBtnFlag = false;
let addBtn = document.querySelector(".add-btn");
let addFlag = false;
let toolBoxColor = document.querySelectorAll(".color");
let allTicketContArr = [];
let ticketLockClass = "fa-lock";
let ticketUnlockClass = "fa-lock-open";

// get all ticket from local storage :

if (localStorage.getItem("tickets")) {
  allTicketContArr = JSON.parse(localStorage.getItem("tickets"));
  allTicketContArr.forEach(function (ticket) {
    createTicket(ticket.ticketColor, ticket.ticketTask, ticket.ticketId);
  });
}

// add button functionality :
addBtn.addEventListener("click", function () {
  if (addFlag == false) {
    modelContainer.style.display = "flex";
    addFlag = true;
  } else {
    modelContainer.style.display = "none";
    addFlag = false;
  }
});

// generating a ticket :
modelContainer.addEventListener("keydown", function (e) {
  if (e.key === "Shift") {
    createTicket(modelPriorityColor, textAreaContVal.value, 0);
    modelContainer.style.display = "none";
    addFlag = false;
    textAreaContVal.value = ""; // becuase of prv value still remain in container
  }
});

// ticket creater function :
function createTicket(ticketColor, ticketTask, ticketId) {
  let id = ticketId || shortid();
  let ticketCont = document.createElement("div");
  ticketCont.setAttribute("class", "ticket-cont");
  ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
                          <div class="ticket-id">#${id}</div>
                          <div class="task-area">${ticketTask}</div>
                           <div class="ticket-lock">
                        <i class="fa-sharp fa-solid fa-lock"></i>
                         </div>`;

  mainContainer.appendChild(ticketCont);
  handleRemove(ticketCont, id);
  handleLock(ticketCont, id);
  colorHandler(ticketCont, id);
  // console.log(ticketId);
  if (!ticketId) {
    allTicketContArr.push({
      ticketColor: ticketColor,
      ticketTask: ticketTask,
      ticketId: id,
    });

    localStorage.setItem("tickets", JSON.stringify(allTicketContArr));
  }
}

// now change the active border color :
allPriorityColor.forEach((priorityColorElm) => {
  // in forEach loop no need to used current target elm
  priorityColorElm.addEventListener("click", (e) => {
    allPriorityColor.forEach((priorityColor) => {
      // after click in color set active-border in that and remove from old one hence travel in allPriorityColor node list again
      priorityColor.classList.remove("active-border");
    });
    priorityColorElm.classList.add("active-border");
    let currColorClass = priorityColorElm.classList[1];
    modelPriorityColor = currColorClass;
  });
});

// remove ticket
removeBtn.addEventListener("click", function () {
  removeBtnFlag = !removeBtnFlag;
  if (removeBtnFlag == true) removeBtn.style.color = "red";
  else removeBtn.style.color = "black";
});

// remove ticket handler
function handleRemove(ticket, id) {
  ticket.addEventListener("click", function () {
    if (removeBtnFlag == true) {
      // get idx of ticket from allTicketContArr
      let ticketIdx = getTicketIdx(id);
      allTicketContArr.splice(ticketIdx, 1); // splice remove the elm from array include given idx to given total elm here only 1 elm will remove that is given ticketIdx
      // now update allTicketContArr into local storage
      localStorage.setItem("tickets", JSON.stringify(allTicketContArr));
      // remove from ui as well
      ticket.remove();
    }
  });
}

// lock and unlock
function handleLock(ticket, id) {
  let ticketLockElm = ticket.querySelector(".ticket-lock");
  let taskArea = ticket.querySelector(".task-area");
  let ticketLock = ticketLockElm.children[0];
  ticketLockElm.addEventListener("click", function () {
    if (ticketLock.classList.contains(ticketLockClass)) {
      ticketLock.classList.remove(ticketLockClass);
      ticketLock.classList.add(ticketUnlockClass);
      taskArea.setAttribute("contenteditable", "true");
    } else {
      ticketLock.classList.remove(ticketUnlockClass);
      ticketLock.classList.add(ticketLockClass);
      taskArea.setAttribute("contenteditable", "false");
    }
    let ticketIdx = getTicketIdx(id);
    allTicketContArr[ticketIdx].ticketTask = taskArea.innerText;
    localStorage.setItem("tickets", JSON.stringify(allTicketContArr));
  });
}

// color handler in ticket
function colorHandler(ticket, id) {
  let ticketColorBand = ticket.querySelector(".ticket-color");

  ticketColorBand.addEventListener("click", function (e) {
    let currTicketColor = ticketColorBand.classList[1];
    let ticketColorIdx = colorArr.findIndex(function (color) {
      return color === currTicketColor;
    });
    ticketColorIdx++;
    let newTicketColorIdx = ticketColorIdx % colorArr.length;
    let newTicketColor = colorArr[newTicketColorIdx];
    ticketColorBand.classList.remove(currTicketColor);
    ticketColorBand.classList.add(newTicketColor);

    // also update color at local storage :

    let ticketIdx = getTicketIdx(id);
    allTicketContArr[ticketIdx].ticketColor = newTicketColor;
    localStorage.setItem("tickets", JSON.stringify(allTicketContArr));
  });
}

// ticket filter
for (let i = 0; i < toolBoxColor.length; i++) {
  toolBoxColor[i].addEventListener("click", function () {
    let currToolBoxColor = toolBoxColor[i].classList[1];

    // filter allTicketContArr based on toolbox selected color
    let filterTicketArr = allTicketContArr.filter(function (ticketObj) {
      return ticketObj.ticketColor === currToolBoxColor;
    });
    let allTicket = document.querySelectorAll(".ticket-cont");
    for (let ticketObj of allTicket) {
      ticketObj.remove();
    }

    filterTicketArr.forEach(function (filterTicketObj) {
      createTicket(
        filterTicketObj.ticketColor,
        filterTicketObj.ticketTask,
        filterTicketObj.ticketId
      );
    });
  });
}

for (let i = 0; i < toolBoxColor.length; i++) {
  toolBoxColor[i].addEventListener("dblclick", function () {
    // remove all filter value :
    let allTicket = document.querySelectorAll(".ticket-cont");
    for (let ticketObj of allTicket) {
      ticketObj.remove();
    }
    allTicketContArr.forEach(function (ticketObj) {
      createTicket(
        ticketObj.ticketColor,
        ticketObj.ticketTask,
        ticketObj.ticketId
      );
    });
  });

  toolBoxColor[i].addEventListener("click", function (e) {});
}

// getticket idx function used for remove Handler

function getTicketIdx(id) {
  let idx = allTicketContArr.findIndex(function (arrObj) {
    return arrObj.ticketId === id;
  });

  return idx;
}
