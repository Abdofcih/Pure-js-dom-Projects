const main = document.getElementById('main')
const scrollBar = document.getElementById('scroll-bar')
const scrollIndecator = document.getElementById('scroll-bar-indicator')

const mainHeight = main.scrollHeight;
const windowHeight = window.innerHeight;
const scrollBarHeight = scrollBar.scrollHeight;


// assign indecator size basec on main div length
const scrollIndecatorHeight = (windowHeight/mainHeight)*scrollBarHeight;
console.log(scrollIndecatorHeight)

scrollIndecator.style.height = `${scrollIndecatorHeight}px`;

window.addEventListener('scroll', function() {
    scrollIndecator.style.top = `${(window.pageYOffset/mainHeight)*scrollBarHeight}px`;
  });
 

scrollBar.addEventListener('click',(e)=>{
    const clickedY = e.clientY;
    yOffset = (clickedY/scrollBarHeight) * mainHeight;

    const indecatorTop =  +getComputedStyle(scrollIndecator).top.slice(0,-2);
    window.scrollTo({ top: yOffset, behavior: 'smooth' });

    console.log(clickedY);  
})






