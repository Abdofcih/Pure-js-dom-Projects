const form = document.getElementById('form')
const allParts = document.getElementById('form-parts')

const btnNext = document.getElementById("btn-next")
const btnPrev = document.getElementById("btn-prev")

let currentPart = 0


btnNext.addEventListener('click',()=>{
    btnPrev.disabled = false;
    let step = getElement(`step-number-${currentPart}`)
    step.classList.add('active')
    allParts.classList.remove(`form-parts-left-${currentPart}`)
    if(currentPart+1 == 2)
    btnNext.disabled = true;
    currentPart +=1
    allParts.classList.add(`form-parts-left-${currentPart}`)

})
btnPrev.addEventListener('click',()=>{
    btnNext.disabled = false;
    let step = getElement(`step-number-${currentPart-1}`)
    step.classList.remove('active')
    allParts.classList.remove(`form-parts-left-${currentPart}`);
    if(currentPart-1 == 0)
    btnPrev.disabled = true;
    currentPart -=1
    allParts.classList.add(`form-parts-left-${currentPart}`)

})

function getElement(id){
 return document.getElementById(id)
}
