import React, { useMemo, useState } from "react";
import Look from "./look";

export default function LookBook({ looks }) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentLookIndex, setCurrentLookIndex] = useState(0);

  const currentLook = useMemo(
    () => looks[currentLookIndex],
    [currentLookIndex, looks]
  );

  const handlePrevious = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else if (currentLookIndex > 0) {
      setCurrentLookIndex(currentLookIndex - 1);
      setCurrentMediaIndex(looks[currentLookIndex - 1].media.length - 1);
    } else {
      // If at first look, go to last look
      setCurrentLookIndex(looks.length - 1);
      setCurrentMediaIndex(looks[looks.length - 1].media.length - 1);
    }
  };

  const handleNext = () => {
    if (currentMediaIndex < currentLook.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    } else if (currentLookIndex < looks.length - 1) {
      setCurrentLookIndex(currentLookIndex + 1);
      setCurrentMediaIndex(0);
    } else {
      // If at last look, go to first look
      setCurrentLookIndex(0);
      setCurrentMediaIndex(0);
    }
  };

  const handlePrevLook = () => {
    if (currentLookIndex > 0) {
      setCurrentLookIndex(currentLookIndex - 1);
      setCurrentMediaIndex(0);
    } else {
      // If at first look, go to last look
      setCurrentLookIndex(looks.length - 1);
      setCurrentMediaIndex(0);
    }
  };

  const handleNextLook = () => {
    if (currentLookIndex < looks.length - 1) {
      setCurrentLookIndex(currentLookIndex + 1);
      setCurrentMediaIndex(0);
    } else {
      // If at last look, go to first look
      setCurrentLookIndex(0);
      setCurrentMediaIndex(0);
    }
  };

  const handleMediaChange = (newIndex) => {
    if (newIndex === "next-look") {
      handleNextLook();
    } else {
      setCurrentMediaIndex(newIndex);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Look
        key={currentLook.id}
        look={currentLook}
        currentMediaIndex={currentMediaIndex}
        onNext={handleNext}
        onPrev={handlePrevious}
        onMediaChange={handleMediaChange}
      />
    </div>
  );
}
