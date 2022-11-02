
let modelContainer = document.querySelector('.model-cont');
let allPriorityColor = document.querySelectorAll('.priority-color');
let colorArr = ['lightpink', 'lightgreen', 'lightblue', 'black'];
let modelPriorityColor = colorArr[colorArr.length - 1];
let textAreaContVal = document.querySelector('.textarea-cont');
let mainContainer = document.querySelector('.main-cont');
let removeBtn = document.querySelector('.remove-btn');
let removeBtnFlag = false;
let addBtn = document.querySelector('.add-btn');
let addFlag = false;
let toolBoxColor = document.querySelectorAll('.color');
let allTicketContArr = [];
let ticketLockClass = 'fa-lock';
let ticketUnlockClass = 'fa-lock-open';


// add button functionality : 
addBtn.addEventListener('click', function () {
  if (addFlag == false) {
    modelContainer.style.display = 'flex';
    addFlag = true;
  } else {
    modelContainer.style.display = 'none';
    addFlag = false;
  }
})


// generating a ticket :
modelContainer.addEventListener('keydown', function (e) {
  if (e.key === 'Shift') {
    createTicket(modelPriorityColor, textAreaContVal.value , 0);
    modelContainer.style.display = 'none';
    addFlag = false;
    textAreaContVal.value = '' // becuase of prv value still remain in container 
  }
})

// ticket creater function :
function createTicket(ticketColor, ticketTask, ticketId) {
  let id = ticketId || shortid();
  let ticketCont = document.createElement('div');
  ticketCont.setAttribute('class', 'ticket-cont');
  ticketCont.innerHTML = `<div class="ticket-color ${ticketColor}"></div>
                          <div class="ticket-id">#${id}</div>
                          <div class="task-area">${ticketTask}</div>
                           <div class="ticket-lock">
                        <i class="fa-sharp fa-solid fa-lock"></i>
                         </div>`

  mainContainer.appendChild(ticketCont);
  handleRemove(ticketCont);
  handlLock(ticketCont)
  colorHandler(ticketCont);
  console.log(ticketId);
  if (!ticketId) {
    allTicketContArr.push({ ticketColor: ticketColor, ticketTask: ticketTask, ticketId :  id })
  }
}

// now change the active border color :
allPriorityColor.forEach((priorityColorElm) => { // in forEach loop no need to used current target elm
  priorityColorElm.addEventListener('click', (e) => {
    allPriorityColor.forEach((priorityColor) => { // after click in color set active-border in that and remove from old one hence travel in allPriorityColor node list again
      priorityColor.classList.remove('active-border');
    })
    priorityColorElm.classList.add('active-border');
    let currColorClass = priorityColorElm.classList[1];
    modelPriorityColor = currColorClass

  })
})

removeBtn.addEventListener('click', function () {
  removeBtnFlag = !removeBtnFlag;
  if (removeBtnFlag == true)
    removeBtn.style.color = "red"
  else
    removeBtn.style.color = "black"
})


function handleRemove(ticket) {
  ticket.addEventListener('click', function () {
    if (removeBtnFlag == true) {
      ticket.remove();

    }
  })
}


// lock and unlock
function handlLock(ticket) {
  let ticketLockElm = ticket.querySelector('.ticket-lock')
  let taskArea = ticket.querySelector('.task-area');
  let ticketLock = ticketLockElm.children[0];
  ticketLockElm.addEventListener('click', function () {
    if (ticketLock.classList.contains(ticketLockClass)) {
      ticketLock.classList.remove(ticketLockClass);
      ticketLock.classList.add(ticketUnlockClass);
      taskArea.setAttribute('contenteditable', 'true');
    } else {
      ticketLock.classList.remove(ticketUnlockClass);
      ticketLock.classList.add(ticketLockClass);
      taskArea.setAttribute('contenteditable', 'false');
    }
  })

}

// color handler in ticket
function colorHandler(ticket) {
  let ticketColorBand = ticket.querySelector('.ticket-color');

  ticketColorBand.addEventListener('click', function (e) {
    let currTicketColor = ticketColorBand.classList[1];
    let ticketColorIdx = colorArr.findIndex(function (color) {
      return color === currTicketColor
    })
    ticketColorIdx++;
    let newTicketColorIdx = ticketColorIdx % colorArr.length;
    let newTicketColor = colorArr[newTicketColorIdx];
    ticketColorBand.classList.remove(currTicketColor);
    ticketColorBand.classList.add(newTicketColor);
  })
}

// ticket filter 
for (let i = 0; i < toolBoxColor.length; i++) {
  toolBoxColor[i].addEventListener('click', function () {
    let currToolBoxColor = toolBoxColor[i].classList[1];
    // console.log(currToolBoxColor , allTicketContArr.length);

    // filter allTicketContArr based on toolbox selected color
    let filterTicketArr = allTicketContArr.filter(function (ticketObj) {
      return ticketObj.ticketColor === currToolBoxColor
    
    })
   

    let allTicket = document.querySelectorAll('.ticket-cont')
    for (let ticketObj of allTicket) {
      
      ticketObj.remove();
  
    }

    filterTicketArr.forEach(function (filterTicketObj) {
      console.log(filterTicketObj.ticketTask);
      createTicket(filterTicketObj.ticketColor, filterTicketObj.ticketTask, filterTicketObj.ticketId)
    })
  })

  
}

for(let i=0; i<toolBoxColor.length ; i++){
  toolBoxColor[i].addEventListener('dblclick', function () {
    // remove all filter value :
    let allTicket = document.querySelectorAll('.ticket-cont')
    for (let ticketObj of allTicket) {
      ticketObj.remove();

    }
    allTicketContArr.forEach(function (ticketObj) {
      createTicket(ticketObj.ticketColor, ticketObj.ticketTask, ticketObj.ticketId)
    })

  })
}
