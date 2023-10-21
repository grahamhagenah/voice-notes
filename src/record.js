import { useAudioRecorder } from 'react-audio-voice-recorder';
import React, { useEffect } from 'react';
import * as ReactDOM from 'react-dom';

const Audio = () => {

  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
    mediaRecorder
  } = useAudioRecorder();

  const AudioElement = (props) => {
    return (
      <>
        <audio src={props.source} preload="metadata" loop></audio>
        <p>audio player ish</p>
        <button id="play-icon"></button>
        <span id="current-time" class="time">0:00</span>
        <input type="range" id="seek-slider" max="100" value="0" />
        <span id="duration" class="time">0:00</span>
        <output id="volume-output">100</output>
        <input type="range" id="volume-slider" max="100" value="100" />
        <button id="mute-icon"></button>
      </>
    )
  }

  useEffect(() => {
    if (!recordingBlob) return;
  
    // recordingBlob will be present at this point after 'stopRecording' has been called
    addAudioElement(recordingBlob)
    
  }, [recordingBlob])

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const targetDiv = document.getElementById("audio-container");
    const newDiv = document.createElement("div");
    newDiv.className = "audio-player-container"
    targetDiv.appendChild(newDiv);

    ReactDOM.render(<AudioElement source={url}/>, newDiv);

    // const audioContainer = document.createElement("div");
    // const audio = document.createElement("audio");
    // audioContainer.appendChild(audio);
    // audio.src = url;
    // audio.controls = true;
    // document.body.appendChild(audioContainer);
  };

  return (
    <div>
      <button onClick={startRecording}>Start recording</button>
      <button onClick={stopRecording}>Stop recording</button>
      <div id="audio-container"></div>
    </div>
  )
}

export default Audio;