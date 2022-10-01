import { useEffect, useState } from "react";

const Phase = {
  Typing: "T",
  Pausing: "P",
  Deleting: "D",
};

const useTypedText = (typedtextarray) => {
  const [typedText, setTypedText] = useState("");
  const [phase, setPhase] = useState(Phase.Typing);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    switch (phase) {
      case Phase.Typing: {
        const nextTypedText = typedtextarray[currentIndex].slice(
          0,
          typedText.length + 1
        );

        if (nextTypedText === typedText) {
          setPhase(Phase.Pausing);
          return;
        }

        const timeout = setTimeout(() => {
          setTypedText(nextTypedText);
        }, 150);

        return () => clearTimeout(timeout);
      }
      case Phase.Deleting: {
        if (!typedText) {
          const nextIndex = currentIndex + 1;
          setCurrentIndex(typedtextarray[nextIndex] ? nextIndex : 0);
          setPhase(Phase.Typing);
          return;
        }
        const nextRemaining = typedtextarray[currentIndex].slice(
          0,
          typedText.length - 1
        );

        const timeout = setTimeout(() => {
          setTypedText(nextRemaining);
        }, 100);

        return () => clearTimeout(timeout);
      }
      case Phase.Pausing:
        const timeout = setTimeout(() => {
          setPhase(Phase.Deleting);
        }, 1000);
        return () => clearTimeout(timeout);
      default:
        return;
    }
  }, [typedText, typedtextarray, phase, currentIndex]);

  return typedText;
};

export default useTypedText;
