let addBtn = document.querySelector('.add-btn');
let modelContainer = document.querySelector('.model-cont');
let addFlag = false;
addBtn.addEventListener('click' ,(e)=>{
    if(addFlag == false){
        modelContainer.style.display = 'flex'
        addFlag = true;
    }else{
        modelContainer.style.display = 'none'
        addFlag = false;
    }
})