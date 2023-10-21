import logo from './logo.svg';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import Audio from './record.js'; 
import './App.css';

function App() {
  return (
    <div className="App">
      <Audio/>
    </div>
  );
}

export default App;
