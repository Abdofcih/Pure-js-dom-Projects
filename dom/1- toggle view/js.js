let toggle_btn = document.getElementById('toggle');
let hidden_text = document.getElementById('hidden_text')
let subscribe_section = document.getElementById('subscribe_section')


// init section to be hidden
subscribe_section.hidden = true

// function to hide or show subscribe_section
function toggle(){
    hidden_text.hidden = !hidden_text.hidden;
    subscribe_section.hidden = !subscribe_section.hidden;
    //change inner text of toggle button
    toggle_btn.innerText=  subscribe_section.hidden?'Show':'Hide'
}

// add event listner to toggle button 
toggle_btn.addEventListener('click',toggle)