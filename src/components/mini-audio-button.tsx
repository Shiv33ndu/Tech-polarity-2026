"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Square } from "lucide-react";

interface MiniAudioButtonProps {
  id: string | number;
  text: string;
}

function sanitize(raw: string) {
  return raw
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[*_`#~>\[\]()]/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const indian = voices.filter((v) => v.lang === "en-IN");
  const femaleKw = ["veena", "female", "woman", "girl", "priya", "aditi"];
  for (const kw of femaleKw) {
    const match = indian.find((v) => v.name.toLowerCase().includes(kw));
    if (match) return match;
  }
  if (indian.length > 0) return indian[0];
  const english = voices.filter((v) => v.lang.startsWith("en"));
  return (
    english.find((v) =>
      ["samantha", "victoria", "karen", "moira", "fiona", "google uk english female"].some(
        (kw) => v.name.toLowerCase().includes(kw)
      )
    ) ?? voices[0] ?? null
  );
}

const PLAY_EVENT = "mini-audio-play";

export function MiniAudioButton({ id, text }: MiniAudioButtonProps) {
  const [playing, setPlaying] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      if (v.length) voicesRef.current = v;
    }
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    // Stop this button's visual state when another article starts playing
    function onOtherPlay(e: Event) {
      if ((e as CustomEvent).detail?.id !== id) {
        setPlaying(false);
      }
    }
    window.addEventListener(PLAY_EVENT, onOtherPlay);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.removeEventListener(PLAY_EVENT, onOtherPlay);
    };
  }, [id]);

  function toggle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: { id } }));

    const utterance = new SpeechSynthesisUtterance(sanitize(text));
    const voice = pickVoice(voicesRef.current);
    if (voice) utterance.voice = voice;
    utterance.lang = "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 1.15;
    utterance.volume = 1;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);

    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  }

  if (!("speechSynthesis" in (typeof window !== "undefined" ? window : {}))) return null;

  return (
    <button
      onClick={toggle}
      title={playing ? "Stop" : "Listen to article"}
      className={`flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full transition-colors mt-2 w-fit ${
        playing
          ? "bg-[#EC1B25] text-white hover:bg-[#c9151e]"
          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
      }`}
    >
      {playing ? (
        <>
          <Square className="h-3 w-3" /> Stop
        </>
      ) : (
        <>
          <Play className="h-3 w-3" /> Listen
        </>
      )}
    </button>
  );
}
