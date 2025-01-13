const video_player = document.querySelector('#video_player'),
mainVideo = video_player.querySelector('#main-video'),
progressAreaTime = video_player.querySelector('.progressAreaTime'),
controls = video_player.querySelector('.controls'),
progressArea = video_player.querySelector('.progress-area'),
progress_Bar = video_player.querySelector('.progress-bar'),
fast_rewind = video_player.querySelector('.fast-rewind'),
play_pause = video_player.querySelector('.play_pause'),
fast_forward = video_player.querySelector('.fast-forward'),
volume = video_player.querySelector('.volume'),
volume_range = video_player.querySelector('.volume_range'),
current = video_player.querySelector('.current'),
totalDuration = video_player.querySelector('.duration'),
auto_play = video_player.querySelector('.auto-play'),
settingsBtn = video_player.querySelector('.settingsBtn'),
picture_in_picture = video_player.querySelector('.picture_in_picture'),
fullscreen = video_player.querySelector('.fullscreen'),
settings = video_player.querySelector('#settings'),
playback = video_player.querySelectorAll('.playback li');
const caption = document.querySelector('.caption');
const nav = document.querySelectorAll('.navigation li');



//Play & Pause Button
function playVideo(){
    play_pause.innerHTML = "pause";
    play_pause.title = "pause";
    video_player.classList.add('paused');
    mainVideo.play();

}

function pauseVideo() {
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove('paused');
    mainVideo.pause();

}

play_pause.addEventListener('click',()=>{
    const isVideoPaused = video_player.classList.contains('paused');
    isVideoPaused ? pauseVideo() : playVideo();
})

mainVideo.addEventListener('click',()=>{
    const isVideoPaused = video_player.classList.contains('paused');
    isVideoPaused ? pauseVideo() : playVideo();
})

//fast_rewind video function
fast_rewind.addEventListener('click', ()=>{
    mainVideo.currentTime -=10;
})

//fast_forward video function
fast_forward.addEventListener('click', ()=>{
    mainVideo.currentTime +=10;
})


//Load video duration
mainVideo.addEventListener("loadeddata", (e)=>{
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    //if seconds are less then 10 then add 0 at the begenning
    totalSec < 10 ? totalSec = "0" + totalSec : totalSec;
    totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
})

//current video duration
mainVideo.addEventListener('timeupdate', (e)=>{
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);

    currentSec < 10 ? currentSec = "0" + currentSec : currentSec;
    current.innerHTML = `${currentMin} : ${currentSec}`;

    let videoDuration = e.target.duration
    //progress width chnage
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_Bar.style.width = `${progressWidth}%`;

})

progressArea.addEventListener('click', (e)=>{
    let videoDuration = mainVideo.duration;
    let progressWidthval = progressArea.clientWidth;
    let ClickOffsetX = e.offsetX;
    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
})

//change volume
function chnageVolume(){
    mainVideo.volume = volume_range.value / 100;
    if(volume_range.value == 0){
        volume.innerHTML = "volume_off";

    }else if(volume_range.value < 40){
        volume.innerHTML = "volume_down";

    }else{
        volume.innerHTML = "volume_up"
    }
}

function muteVolume(){
    if(volume_range.value == 0){
        volume_range.value = 80;
        mainVideo.volume = 0.8;
        volume.innerHTML = "volume_up";

    }else{
        volume_range.value =  0;
        mainVideo.volume = 0;
        volume.innerHTML = "volume_off";
    }

}

volume_range.addEventListener('change', ()=>{
    chnageVolume();

})

volume.addEventListener('click', ()=>{
    muteVolume();

})

//picture in pic

picture_in_picture.addEventListener('click', () =>{
    mainVideo.requestPictureInPicture();
})

//fulscreen

fullscreen.addEventListener('click',()=>{
    if(!video_player.classList.contains('openFullScreen')){
        video_player.classList.add('openFullScreen');
        fullscreen.innerHTML = "fullscreen_exit";
        video_player.requestFullscreen();
    }else{
        video_player.classList.remove('openFullScreen');
        fullscreen.innerHTML = "fullscreen";
        document.exitFullscreen();

    }
})

//Open Settings
settingsBtn.addEventListener('click', () =>{
    settings.classList.toggle('active');
    settingsBtn.classList.toggle('active');


})

//Playback Rate
playback.forEach((event)=>{
    event.addEventListener('click', ()=>{
        removeActiveClasses();
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        mainVideo.playbackRate = speed;
    });
})

function removeActiveClasses(){
    playback.forEach(event => {
        event.classList.remove('active');
    })

}

//Mouse move
video_player.addEventListener('mouseover', () =>{
    controls.classList.add('active');

})

video_player.addEventListener('mouseleave', ()=>{
    if(video_player.classList.contains('paused')){
        if(settingsBtn.classList.contains('active')){
            controls.classList.add('active');

        }else{
            controls.classList.remove('active');
        }
    }else{
        controls.classList.add('active');
    }
})


nav.forEach((event)=>{
    event.addEventListener('click', ()=>{
        removeActiveClasses();
        event.classList.add('active');
        let src = event.getAttribute('src');
        let title = event.getAttribute('title');
        document.getElementById("main-video").src = src;
        caption.innerHTML = title;
    });
})

function removeActiveClasses(){
    nav.forEach(event => {
        event.classList.remove('active');
    })

}

    
