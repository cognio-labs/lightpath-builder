"use client";
import { useEffect, useState } from "react";

interface TextTypeProps {
  text?: string[];
  texts?: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  deletingSpeed?: number;
  variableSpeedEnabled?: boolean;
  variableSpeedMin?: number;
  variableSpeedMax?: number;
  cursorBlinkDuration?: number;
  className?: string;
}

export default function TextType({
  text = [],
  texts = [],
  typingSpeed = 75,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = "|",
  deletingSpeed = 50,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  cursorBlinkDuration = 0.5,
  className = "",
}: TextTypeProps) {
  // Combine text or texts arrays
  const arrayToType = texts.length > 0 ? texts : text.length > 0 ? text : [""];
  
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const targetText = arrayToType[currentTextIndex];

    const getSpeed = () => {
      if (variableSpeedEnabled) {
        return Math.floor(
          Math.random() * (variableSpeedMax - variableSpeedMin + 1) + variableSpeedMin
        );
      }
      return isDeleting ? deletingSpeed : typingSpeed;
    };

    if (!isDeleting && displayedText === targetText) {
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentTextIndex((prev) => (prev + 1) % arrayToType.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText((prev) => {
          if (isDeleting) {
            return targetText.substring(0, prev.length - 1);
          } else {
            return targetText.substring(0, prev.length + 1);
          }
        });
      }, getSpeed());
    }

    return () => clearTimeout(timer);
  }, [
    displayedText,
    isDeleting,
    currentTextIndex,
    arrayToType,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    variableSpeedEnabled,
    variableSpeedMin,
    variableSpeedMax,
  ]);

  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center" }}>
      <span>{displayedText}</span>
      {showCursor && (
        <span
          style={{
            marginLeft: "2px",
            animation: `blink ${cursorBlinkDuration}s step-start infinite`,
          }}
        >
          {cursorCharacter}
        </span>
      )}
      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}

