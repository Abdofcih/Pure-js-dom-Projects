let categoryEl = document.querySelector('.category span')
let spanCount = document.querySelector('.count span')
let bullets = document.querySelector('.bullets ')
let bulletsContainer = document.querySelector('.bullets .spans')
let countdownEl = document.querySelector('.bullets .countdown')
let quizAria = document.querySelector('.quiz-area')
let answersArea = document.querySelector('.answers-area')
let submitBtn = document.querySelector('.submit-button')
let resultsContainer = document.querySelector('.results')
// options
let currentIndex = 0;
let rightAnswers = 0;
let questions ;
let countDownInterval;

//get query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
categoryEl.innerText = category
// Send request to get questions
function getQuestions(){
    let getRequest = new XMLHttpRequest();
    getRequest.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
             questions = JSON.parse(this.responseText)
            let questionsLength = questions.length
            createBullets(questionsLength)

            addData(currentIndex)

            submitBtn.addEventListener('click',()=>{
                checkValidAnswer()
                if(currentIndex >= questionsLength-1)
                {
                    showResult()
                    return;
                }
                quizAria.innerHTML = ''
                answersArea.innerHTML = ''
                currentIndex++;
                addData(currentIndex,questionsLength)
                colorBullet('on')
            })
        }
    }
    getRequest.open("Get",`data/${category}.json`,true)
    getRequest.send()
}

getQuestions()

//--------------------------------------------
function createBullets(number){
    // Update question count
    spanCount.innerHTML = number

    //create bullet
    for(i=0 ; i<number ; i++){
        let bullet = document.createElement('span')

    if( i == 0 )
       bullet.classList.add('on')

       bulletsContainer.appendChild(bullet)
    }
}

//------------
function addData(index){
    clearInterval(countDownInterval)
    countDown(10)
      let obj = questions[index]
      let questionHeadEl = document.createElement('h2')
      questionHeadEl.innerText = obj.title
    //  let questionHead = document.createTextNode(obj.title)
    //  questionHeadEl.appendChild(questionHead)

    quizAria.appendChild(questionHeadEl)

    //- add answers
    for(i=1 ; i<=4 ; i++){
        let answerRadioEl = document.createElement('input')
        answerRadioEl.type = 'radio'
        answerRadioEl.name="answer"
        answerRadioEl.id=`answer_${i}`
        answerRadioEl.dataset.answer = obj[`answer_${i}`]

        if(i === 1)
        answerRadioEl.checked = true

        let answerTextEl = document.createElement('label')
        answerTextEl.htmlFor=`answer_${i}` 
        answerTextEl.innerText = obj[`answer_${i}`]
   
        
        let radioInput = document.createElement('span')
        radioInput.className = 'radio-input'

        let answerContainer = document.createElement('div')
        answerContainer.className='answer'

        answerTextEl.appendChild(radioInput)
        answerContainer.appendChild(answerRadioEl)
        answerContainer.appendChild(answerTextEl)
        answersArea.appendChild(answerContainer)
    }
}

function checkValidAnswer(){
    let allAnswersEl = document.getElementsByName('answer')
    let allAnswers = Array.from(allAnswersEl)
    let choosenAnswer;
    for(i=0; i<allAnswers.length; i++){
        if(allAnswersEl[i].checked)
        choosenAnswer = allAnswersEl[i].dataset.answer
    }
    let rightAnswer = questions[currentIndex].right_answer
    if(choosenAnswer == rightAnswer)
        {
            rightAnswers++;
            colorBullet("good")
        }
     else
    colorBullet("bad")

}
function colorBullet(color){
    let allBullets = document.querySelectorAll('.bullets .spans span')
    let currentBullet = allBullets[currentIndex]
    switch(color) {
          case "bad":
            currentBullet.className = 'bad'
            currentBullet.innerText = "✖"
          break;
          case "good":
            currentBullet.className = 'good'
            currentBullet.innerText = "✔"
            break;
        default:
            currentBullet.className = 'on'
      }
}
function showResult(){
    //remove Questions to show result instead
    quizAria.remove()
    answersArea.remove()
    bullets.remove()
    submitBtn.remove()
    let questionsCount = questions.length;
    let word = ''
    if(rightAnswers ===questionsCount )
    word = "perfect"
    else if(rightAnswers =>(questionsCount/2) && rightAnswers <questions)
    word = "good"
    else
    word = "bad"

    resultsContainer.innerHTML = `<span class="${word}">${word.toLocaleUpperCase()}</span> you answer ${rightAnswers} from ${questionsCount}`
}

function countDown(duration){
      let minutes, seconds;
      countDownInterval = setInterval(()=>{
      minutes = parseInt(duration/60);
      seconds = parseInt(duration%60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownEl.innerHTML = `${minutes} : ${seconds}`
     
      if(--duration<0){
          clearInterval(countDownInterval)
          submitBtn.click()
          console.log("finished")
      }
    },1000)
}
