(() => {

    var audioPlaying = false;
    var audio;

    audio = document.getElementById('audio');
    audio.volume = .2;

    const audioControl = document.getElementById('audio-control');
    audioControl.addEventListener('click', clickAudioControl, false);

    function clickAudioControl(e) { 
        const _self = e.target;
        if (!audioPlaying) {
            _self.classList.add('noVolume')
            audio.volume = 0
        } else {
            _self.classList.remove('noVolume')
            audio.volume = 1
        }
        audioPlaying = !audioPlaying
    }


})();