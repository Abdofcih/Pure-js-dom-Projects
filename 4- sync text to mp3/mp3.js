 const customeControl = document.getElementById('customeControl')
 
 const play = document.getElementById('play');
 const pause = document.getElementById('pause');

 const progressBar = document.getElementById('progress-bar');
 const progress = document.getElementById('progress');

 const timeEl = document.getElementById('time');

 const audio = document.getElementById('audiofile')


 // play audio
function playAudio(){
    customeControl.classList.add('play');
    audio.play();
}
 // pause audio
 function pauseAudio(){
    customeControl.classList.remove('play');
    audio.pause();
}

//add event to controle audio
play.addEventListener('click',playAudio)
pause.addEventListener('click',pauseAudio)

//Set progress based on audio time
function setprogress(e){
    const {duration,currentTime} = e.srcElement
    let width = (currentTime/duration)*100;
    progress.style.width = `${width}%`;
}
audio.addEventListener('timeupdate',setprogress);

//Set audio time based on progress 
function setAudioTime(e){
    let width = this.clientWidth;
    let clickedX = e.offsetX;
    audio.currentTime = (clickedX/width)*audio.duration;
}
progressBar.addEventListener('click',setAudioTime);


// Update time base on audio time update
function updateTime(){
let mins = Math.floor(audio.currentTime/60)   //125 second => m=2 s=5
mins = (mins < 10)? `0${mins}`:mins;

let seconds = Math.floor(audio.currentTime%60)
seconds = (seconds<10)? `0${seconds}`:seconds;

timeEl.innerText = `${mins}:${seconds}`
}
audio.addEventListener('timeupdate',updateTime)


