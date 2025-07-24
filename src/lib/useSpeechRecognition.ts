import { useEffect, useRef, useState } from 'react';

export default function useSpeechRecognition(language: string) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        streamRef.current = stream;

        const recognition: SpeechRecognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            finalTranscript += event.results[i][0].transcript;
          }
          setText(finalTranscript);
        };

        recognition.onend = () => {
          if (listening && recognitionRef.current) {
            setTimeout(() => {
              try {
                recognitionRef.current!.start();
              } catch (err) {
                console.error('restart error', err);
              }
            }, 500);
          }
        };

        recognition.onspeechend = () => {
          console.log('Speech ended');
        };

        recognition.onaudioend = () => {
          console.log('Audio stream ended');
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
      })
      .catch((err) => {
        console.error('Microphone access denied:', err);
      });
  }, [language, listening]);

  const start = () => {
    if (!recognitionRef.current || listening) return;
    setText('');
    setListening(true);
    try {
      recognitionRef.current!.start();
    } catch (err) {
      console.error('Start error:', err);
      setListening(false);
    }
  };

  const stop = () => {
    if (recognitionRef.current && listening) {
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  return { text, listening, start, stop };
}
