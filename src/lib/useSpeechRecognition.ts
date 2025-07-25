import { useRef, useState } from 'react';

export default function useSpeechRecognition(language: string) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // 🔥 track the mic stream
  const audioChunksRef = useRef<Blob[]>([]);

  const start = async () => {
    if (listening || mediaRecorderRef.current?.state === 'recording') return;
    setListening(true);
    setText('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream; // save stream so we can stop it later

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        // audioChunksRef.current.push(event.data);
        console.log('data available');
      };

      mediaRecorder.onstop = async () => {
        // const audioBlob = new Blob(audioChunksRef.current, {
        //   type: 'audio/wav',
        // });
        // const arrayBuffer = await audioBlob.arrayBuffer();
        // const buffer = Buffer.from(arrayBuffer);

        console.log('buffer');

        // const wavPath = window.electronAPI.saveTempWav(buffer);
        // const transcript = await window.electronAPI.transcribeAudio(wavPath);
        setText('transcript');
        setListening(false);
      };

      mediaRecorder.start();
      console.log('recording started');
    } catch (err) {
      console.error('Mic error:', err);
      setListening(false);
    }
  };

  const stop = () => {
    console.log('stop func');
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state === 'recording') {
      console.log('calling stop func');
      recorder.stop();
    } else {
      console.warn('Cannot stop — recorder is not recording');
    }

    // 🔥 Stop all mic tracks to remove macOS mic tray icon
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  return { text, listening, start, stop };
}
