import { useRef, useState } from 'react';

export default function useSpeechRecognition(language: string) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const start = async () => {
    if (listening || mediaRecorderRef.current?.state === 'recording') return;
    setListening(true);
    setText('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          console.log('data available');
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer); // ✅ use this instead of Buffer

        console.log('buffer ready');

        try {
          const wavPath = await window.electronAPI.saveTempWav(buffer);
          const transcript = await window.electronAPI.transcribeAudio(wavPath);
          setText(transcript);
        } catch (err) {
          console.error('Transcription error:', err);
          setText('[Transcription failed]');
        }

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

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  return { text, listening, start, stop };
}
