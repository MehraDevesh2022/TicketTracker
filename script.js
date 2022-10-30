let addBtn = document.querySelector('.add-btn');
let modelContainer = document.querySelector('.model-cont');
let allPriorityColor = document.querySelectorAll('.priority-color');
let allColors = ['lightgreen', 'lightblue', 'lightpink', 'black'];
let modelPriorityColor = allColors[allColors.length - 1];
let ticketColor = document.querySelector('.ticket-color');

let addFlag = false;
addBtn.addEventListener('click', (e) => {
  if (addFlag == false) {
    modelContainer.style.display = 'flex'
    addFlag = true;
  } else {
    modelContainer.style.display = 'none'
    addFlag = false;
  }
})


// generating a ticket
let mainContainer = document.querySelector('.main-cont');
modelContainer.addEventListener('keydown', function (e) {
  if (e.key === 'Shift') {
    createTicket(modelPriorityColor);
    modelContainer.style.display = 'none';
    addFlag = false;
  }
})

// ticket creater function =>
function createTicket(modelPriorityColor) {
  let ticketCont = document.createElement('div');
  ticketCont.setAttribute('class', 'ticket-cont');
  ticketCont.innerHTML = `<div class="ticket-color ${modelPriorityColor}"></div>
                          <div class="ticket-id">skxnsknx</div>
                          <div class="task-area">go to bank</div>`
                       

  mainContainer.appendChild(ticketCont);
 
}



// now change the active color :

allPriorityColor.forEach((priorityColorElm) => { // in forEach loop no need to used current target elm
  priorityColorElm.addEventListener('click', (e) => {
    allPriorityColor.forEach((priorityColor) => { // after click in color set active-border in that and remove from old one hence travel in allPriorityColor node list again
      priorityColor.classList.remove('active-border');
    })
    priorityColorElm.classList.add('active-border');
    let currColorClass = priorityColorElm.classList[1];
    modelPriorityColor=currColorClass
    
  })
})