
const toggleBtns = document.getElementById('toggleBtns')
const loginBtnToggle = document.getElementById('loginBtnToggle')
const signupBtnToggle = document.getElementById('signupBtnToggle')

const centerdDiv = document.querySelector('.centered')


//login form inputs
const loginEmail = document.getElementById('email')
const loginPassword = document.getElementById('password')

// signup form inputs
const signupEmail = document.getElementById('signupEmail')
const signupUsername = document.getElementById('signupUsername')
const signupPassword = document.getElementById('signupPassword')
const signupPassword2 = document.getElementById('signupPassword2')


function toggleForm(target){
    let prev;
    (target === 'activeLogin')?prev ='activeSignup' : prev='activeLogin';
    
    centerdDiv.classList.remove(prev)
    centerdDiv.classList.add(target)

    toggleBtns.classList.remove(prev)
    toggleBtns.classList.add(target)

}
loginBtnToggle.addEventListener('click',function(){toggleForm('activeLogin')})
signupBtnToggle.addEventListener('click',function(){toggleForm('activeSignup')})
//End toggling 

// Show input error message 
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }
// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }
// Get fieldname
function getFieldName(input) {
 return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Check required fields
function checkRequired(input) {
      if (input.value.trim() === '') {
        showError(input, `${getFieldName(input)} is required`);
      } else {
        showSuccess(input);
      }  
  }
// Check input length
function checkLength(input, min, max) {
  if (input.value.trim().length === 0){
    showError(
      input,
      `${getFieldName(input)} is required`
    );
  }
   else if (input.value.length < min) {
      showError(
        input,
        `${getFieldName(input)} must be at least ${min} characters`
      );
    } else if (input.value.length > max) {
      showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      );
    } else {
      showSuccess(input);
    }
  }

  // Check email if is valid with regular expretion
function checkEmail(input) {
  // copied from internet
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

// add event listener to inputs
function addListenerToInputs(){
  let inputsArr = [
    {el:loginEmail,minLength:4,maxLength:30},
    {el:loginPassword,minLength:8,maxLength:24},
    {el:signupEmail,minLength:4,maxLength:30},
    {el:signupUsername,minLength:4,maxLength:10},
    {el:signupPassword,minLength:8,maxLength:24},
    {el:signupPassword2,minLength:8,maxLength:24}]
  
inputsArr.forEach(inputData=>{
    //check required on blur and on keyup 
    /* * this for inputs that has no max and length it is just reqiured * */
    let input = inputData.el
    input.addEventListener('blur',function(){checkRequired(input)})
    input.addEventListener('keyup',function(){checkRequired(input)})

    //check input length on blur
    input.addEventListener('blur',function(){checkLength(input, inputData.minLength, inputData.maxLength)})

    if(getFieldName(input).includes('Email'))
     input.addEventListener('blur',function(){checkEmail(input)})
})
}





// run init
addListenerToInputs()