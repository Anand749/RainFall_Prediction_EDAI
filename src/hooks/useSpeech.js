import { useState, useCallback, useRef } from 'react';
import { LANGUAGES } from '../config/config';

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef(null);

  const getSpeechLang = (langCode) => {
    const lang = LANGUAGES.find((l) => l.code === langCode);
    return lang ? lang.speechLang : 'en-IN';
  };

  const speak = useCallback((text, langCode = 'en') => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = getSpeechLang(langCode);
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;

    // Small delay to ensure voices are loaded
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 100);
  }, []);

  const stop = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const replay = useCallback(() => {
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
      const newUtterance = new SpeechSynthesisUtterance(utteranceRef.current.text);
      newUtterance.lang = utteranceRef.current.lang;
      newUtterance.rate = utteranceRef.current.rate;
      newUtterance.pitch = utteranceRef.current.pitch;
      newUtterance.onstart = () => setIsSpeaking(true);
      newUtterance.onend = () => setIsSpeaking(false);
      newUtterance.onerror = () => setIsSpeaking(false);
      utteranceRef.current = newUtterance;
      window.speechSynthesis.speak(newUtterance);
    }
  }, []);

  return { speak, stop, replay, isSpeaking };
}
