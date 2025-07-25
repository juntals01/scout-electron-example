import { useEffect, useRef, useState } from 'react';

export default function useSpeechRecognition(language: string) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const manuallyStoppedRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('SpeechRecognition is not supported in this browser.');
      return;
    }

    const initRecognition = async () => {
      try {
        // 🔓 Request microphone access to ensure OS/browser permission
        await navigator.mediaDevices.getUserMedia({ audio: true });

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
          if (!manuallyStoppedRef.current && recognitionRef.current) {
            setTimeout(() => {
              try {
                recognitionRef.current!.start();
              } catch (err) {
                console.error('restart error', err);
              }
            }, 300);
          }
        };

        recognition.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
        };

        recognitionRef.current = recognition;
      } catch (err) {
        console.error('Microphone access denied or failed:', err);
      }
    };

    initRecognition();

    return () => {
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, [language]);

  const start = () => {
    if (!recognitionRef.current || listening) return;
    setText('');
    setListening(true);
    manuallyStoppedRef.current = false;

    setTimeout(() => {
      try {
        recognitionRef.current!.start();
      } catch (err) {
        console.error('Start error:', err);
        setListening(false);
      }
    }, 100);
  };

  const stop = () => {
    if (recognitionRef.current && listening) {
      manuallyStoppedRef.current = true;
      setListening(false);
      recognitionRef.current.stop();
    }
  };

  return { text, listening, start, stop };
}
