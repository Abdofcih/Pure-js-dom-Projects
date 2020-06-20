var audioPlayer = document.getElementById("audiofile");
var subtitles = document.getElementById("subtitles");
var syncData ;



function createSubtitle()
{
    var element;
    for (var i = 0; i < syncData.length; i++) {
        element = document.createElement('span');
        element.setAttribute("id", "s_" + i);
        element.innerText = syncData[i].text + ". ";
        updateAudioTime(element);
        subtitles.appendChild(element);
    }
}

//Update  sentence color based on audio time
audioPlayer.addEventListener("timeupdate", function(e){
 
    syncData.forEach(function(element, index, array){
        if( audioPlayer.currentTime >= element.start && audioPlayer.currentTime < element.finish )
            subtitles.children[index].style.background = 'rgb(36, 144, 21)';

        else
            subtitles.children[index].style.background = 'none';         
    });
});

//Update audio time based on clickec sentenc
function updateAudioTime(element){
    element.addEventListener("click",function (){
        let index = element.getAttribute("id").slice(2)   
        audioPlayer.currentTime = syncData[index].start;
    })
}




// Initialization and getting data ready
fetch("assets/jsonScript.json")
.then(async(syncData)=>{
    return syncData.json();
})
.then((parsedData)=>{
    syncData = parsedData;
    createSubtitle();
})
.catch((error)=>{
    console.log(error)
})
