import { useEffect, useRef, useState } from "react";

export function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize HTML5 Audio with a soft looping rain forest sound
    const audio = new Audio("https://assets.codepen.io/16584/rain.mp3");
    audio.loop = true;
    audio.volume = 0.45; // Soft volume so it's not obtrusive
    audioRef.current = audio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlayback = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback blocked by browser autocomplete/interactivity rules:", err);
      });
    }
  };

  return (
    <button
      onClick={togglePlayback}
      className="flex items-center gap-3 px-4 py-2 rounded-full border border-[#faf9f6]/15 bg-[#faf9f6]/5 hover:bg-[#faf9f6]/10 active:scale-95 transition-all text-[#faf9f6] cursor-pointer text-xs select-none group"
      title="Toggle Rainforest Ambiance"
    >
      <span className="uppercase tracking-[0.15em] font-medium text-[10px] text-[#faf9f6]/70 group-hover:text-[#faf9f6] transition-colors">
        {isPlaying ? "Sound On" : "Sound Off"}
      </span>
      
      {/* Animated wave bars */}
      <div className="flex items-end gap-[3px] h-3 w-[15px] overflow-hidden">
        <div 
          className={`w-[2px] bg-[#faf9f6] rounded-full origin-bottom transition-all duration-300 ${
            isPlaying ? "animate-wave-1 h-3" : "h-[3px] scale-y-[0.3]"
          }`}
        />
        <div 
          className={`w-[2px] bg-[#faf9f6] rounded-full origin-bottom transition-all duration-300 ${
            isPlaying ? "animate-wave-2 h-3" : "h-[3px] scale-y-[0.3]"
          }`}
        />
        <div 
          className={`w-[2px] bg-[#faf9f6] rounded-full origin-bottom transition-all duration-300 ${
            isPlaying ? "animate-wave-3 h-3" : "h-[3px] scale-y-[0.3]"
          }`}
        />
        <div 
          className={`w-[2px] bg-[#faf9f6] rounded-full origin-bottom transition-all duration-300 ${
            isPlaying ? "animate-wave-4 h-3" : "h-[3px] scale-y-[0.3]"
          }`}
        />
      </div>
    </button>
  );
}
