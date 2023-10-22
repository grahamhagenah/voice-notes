import { useAudioRecorder } from 'react-audio-voice-recorder'
import React, { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom'
import { createRoot } from 'react-dom/client';
import fs from "fs"
const config = require('./config.json')
const apiKey = config.GOOGLE_API_KEY

const Audio = () => {

  const openai = new OpenAI({
    apiKey: apiKey, // This is also the default, can be omitted
    dangerouslyAllowBrowser: true
  });

  async function handleSpeech(blob) {

    const formData = new FormData();
    formData.append('file', blob);

    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream("audio.mp3"),
      model: "whisper-1",
    });
  
    console.log(transcription.text);
  }

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
      <div className="entry">
        <audio controls src={props.source} preload="metadata"></audio>
        <textarea defaultValue="result" />
      </div>
    )
  }

  // Create a new instance of Audio Element with the new recording
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audioPlayer = document.createElement("div");
    audioPlayer.className = "audio-element"
    document.getElementById("audio-container").prepend(audioPlayer)
    const root = createRoot(audioPlayer)
    root.render(<AudioElement source={url}/>)
  };
  

  useEffect(() => {
    if (!recordingBlob) return;

    handleSpeech(recordingBlob)
    addAudioElement(recordingBlob)

    
  }, [recordingBlob])

  return (
    <>
      <button onClick={startRecording}>REC</button>
      <button onClick={stopRecording}>STOP</button>
      <div id="audio-container"></div>
    </>
  )
}

export default Audio;