const video = document.getElementById('video');
const video_overllay = document.querySelector('.video-overllay')
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// toggle video status play/pause
function toggleVideoStatus(){
(video.paused)?video.play():video.pause();
}

//change button icon
function changeBtnIcon(){
  if(video.paused){
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    video_overllay.innerHTML = '<i class="fa fa-play fa-5x"></i>';
  }else{
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    video_overllay.innerHTML = '<i class="fa fa-pause fa-5x"></i>';
  }

}
 // update progress based on video time
function updateProgress(){
progress.value = (video.currentTime/video.duration)*100;

// change timestamp
let mins = Math.floor(video.currentTime/60)   //125 second => m=2 s=5
 mins = (mins < 10)? `0${mins}`:mins;

let seconds = Math.floor(video.currentTime%60)
seconds = (seconds<10)? `0${seconds}`:seconds;

timestamp.innerText = `${mins}:${seconds}`
}
// update video based on progress
function setVideoProgress(){
  video.currentTime = progress.value * video.duration / 100;
}
// Stop video
function stopVideo(){
 video.currentTime = 0;
 video.pause()
}

// Event listners 
video.addEventListener('click',toggleVideoStatus)
video.addEventListener('pause',changeBtnIcon)
video.addEventListener('play',changeBtnIcon)
video.addEventListener('timeupdate',updateProgress)

play.addEventListener('click',toggleVideoStatus)
video_overllay.addEventListener('click',toggleVideoStatus)
stop.addEventListener('click',stopVideo)

progress.addEventListener('change',setVideoProgress)
