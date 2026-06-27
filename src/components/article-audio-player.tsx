"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Square } from "lucide-react";

interface ArticleAudioPlayerProps {
  text: string;
}

type Status = "idle" | "playing" | "paused";

function sanitizeText(raw: string): string {
  return raw
    .replace(/https?:\/\/\S+/g, "")          // strip URLs
    .replace(/[*_`#~>\[\]()]/g, "")           // strip markdown symbols
    .replace(/\s{2,}/g, " ")                  // collapse whitespace
    .replace(/\.{2,}/g, ".")                  // collapse ellipsis
    .trim();
}

function pickVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  const indianEnglish = voices.filter((v) => v.lang === "en-IN");

  // Female-sounding names first (Veena is macOS native Indian English female)
  const femaleKeywords = ["veena", "female", "woman", "girl", "priya", "aditi"];
  for (const kw of femaleKeywords) {
    const match = indianEnglish.find((v) => v.name.toLowerCase().includes(kw));
    if (match) return match;
  }

  // Any en-IN voice
  if (indianEnglish.length > 0) return indianEnglish[0];

  // Fallback: any English female-sounding voice
  const english = voices.filter((v) => v.lang.startsWith("en"));
  const fallbackFemale = english.find((v) =>
    ["samantha", "victoria", "karen", "moira", "fiona", "google uk english female", "female"].some(
      (kw) => v.name.toLowerCase().includes(kw)
    )
  );
  if (fallbackFemale) return fallbackFemale;

  return voices[0] ?? null;
}

export function ArticleAudioPlayer({ text }: ArticleAudioPlayerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [supported, setSupported] = useState(true);
  const [voiceReady, setVoiceReady] = useState(false);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setSupported(false);
      return;
    }

    function loadVoices() {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) {
        voicesRef.current = v;
        setVoiceReady(true);
      }
    }

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
    };
  }, []);

  function play() {
    if (status === "paused") {
      window.speechSynthesis.resume();
      setStatus("playing");
      return;
    }

    window.speechSynthesis.cancel();

    const clean = sanitizeText(text);
    const utterance = new SpeechSynthesisUtterance(clean);

    const voice = pickVoice(voicesRef.current);
    if (voice) utterance.voice = voice;

    utterance.lang = "en-IN";
    utterance.rate = 0.88;
    utterance.pitch = 1.15;
    utterance.volume = 1;

    utterance.onend = () => setStatus("idle");
    utterance.onerror = () => setStatus("idle");

    window.speechSynthesis.speak(utterance);
    setStatus("playing");
  }

  function pause() {
    window.speechSynthesis.pause();
    setStatus("paused");
  }

  function stop() {
    window.speechSynthesis.cancel();
    setStatus("idle");
  }

  if (!supported) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-secondary rounded-2xl">
      {status === "playing" ? (
        <button
          onClick={pause}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EC1B25] text-white text-sm font-medium hover:bg-[#c9151e] transition-colors"
        >
          <Pause className="h-4 w-4" /> Pause
        </button>
      ) : (
        <button
          onClick={play}
          disabled={!voiceReady}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#EC1B25] text-white text-sm font-medium hover:bg-[#c9151e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="h-4 w-4" />
          {status === "paused" ? "Resume" : "Listen to article"}
        </button>
      )}

      {status !== "idle" && (
        <button
          onClick={stop}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium hover:bg-muted/80 transition-colors"
        >
          <Square className="h-4 w-4" /> Stop
        </button>
      )}

      {status === "playing" && (
        <span className="text-xs text-muted-foreground animate-pulse">Reading aloud…</span>
      )}
      {status === "paused" && (
        <span className="text-xs text-muted-foreground">Paused</span>
      )}
    </div>
  );
}
