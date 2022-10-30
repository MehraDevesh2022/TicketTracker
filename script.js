let addBtn = document.querySelector('.add-btn');
let modelContainer = document.querySelector('.model-cont');
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
       createTicket();
       modelContainer.style.display = 'none';
       addFlag = false;
    }
  })

// ticket creater function =>
 function createTicket(){
     let ticketCont = document.createElement('div');
     ticketCont.setAttribute('class', 'ticket-cont');
     ticketCont.innerHTML =`<div class="ticket-color"></div>
                          <div class="ticket-id">skxnsknx</div>
                          <div class="task-area">go to bank</div>`
    mainContainer.appendChild(ticketCont);
 }
