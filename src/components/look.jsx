import React, { useMemo, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import ProductSection from "./product-section";

export default function Look({
  look,
  currentMediaIndex,
  onNext,
  onPrev,
  onMediaChange,
}) {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const currentMedia = useMemo(
    () => look.media[currentMediaIndex],
    [currentMediaIndex, look.media]
  );

  const totalMedia = useMemo(() => look.media.length, [look.media]);

  const videoRef = useRef(null);

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      setProgress(videoRef.current.currentTime / videoRef.current.duration);
    }
  };

  const handleVideoEnded = () => {
    if (currentMediaIndex < totalMedia - 1) {
      onMediaChange(currentMediaIndex + 1);
    } else {
      onMediaChange("next-look");
    }
  };

  const handlePlayPause = (e) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const handleAnnotationClick = (e, annotation) => {
    e.stopPropagation();
    setSelectedProduct(annotation.product);
  };

  const products = useMemo(() => {
    const products =
      currentMedia?.annotations.flatMap((annotation) => annotation?.product) ||
      [];

    return products;
  }, [currentMedia?.annotations]);

  return (
    <div className="relative h-full w-full grid grid-rows-[1fr_auto]">
      <div className="relative h-full w-full">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 p-2">
          {look?.media?.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width:
                    index < currentMediaIndex
                      ? "100%"
                      : index === currentMediaIndex
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute top-6 left-0 right-0 z-20 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <img
              src={look.creatorAvatar || "/placeholder.svg"}
              alt={look.creator}
              width={32}
              height={32}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-medium text-sm">
                  {look.creator}
                </span>

                {look.isSponsored && (
                  <div className="text-xs bg-amber-300 text-black px-1 py-0.5 rounded-md">
                    Sponsored
                  </div>
                )}
              </div>

              <p className="text-white/80 text-xs">{look.title}</p>
            </div>
          </div>

          {currentMedia.type === "video" && (
            <div className="flex items-center gap-2 z-40">
              <button
                className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8 flex items-center justify-center hover:scale-110 transition-all duration-300"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </button>

              <button
                className="text-white hover:bg-white/20 rounded-full p-1 h-8 w-8 flex items-center justify-center hover:scale-110 transition-all duration-300"
                onClick={handleMuteToggle}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
            </div>
          )}
        </div>

        {/* Media */}
        <div className="absolute inset-0 flex items-center justify-center">
          {currentMedia.type === "image" ? (
            <img
              src={currentMedia.url}
              alt={look.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              playsInline
              muted={isMuted}
              loop={false}
            />
          )}
        </div>

        {currentMedia.annotations &&
          currentMedia.type === "image" &&
          currentMedia.annotations.map((annotation) => (
            <button
              key={annotation.id}
              className="z-40 absolute w-6 h-6 bg-yellow-500/90 backdrop-blur-sm rounded-full border-2 border-yellow-300/80 shadow-[0_0_15px_rgba(255,255,0,0.2)] flex items-center justify-center animate-pulse hover:animate-none transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(255,255,0,0.3)] cursor-pointer hover:bg-yellow-400/90 hover:border-yellow-200/80 active:scale-95"
              style={{
                left: `${annotation.x}%`,
                top: `${annotation.y}%`,
              }}
              onClick={(e) => handleAnnotationClick(e, annotation)}
            >
              <div className="w-2 h-2 bg-yellow-800 rounded-full" />
            </button>
          ))}

        {/* Click areas - moved below media and buttons */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          {/* Left click area */}
          <div className="w-1/2 h-full pointer-events-auto" onClick={onPrev} />
          {/* Right click area */}
          <div className="w-1/2 h-full pointer-events-auto" onClick={onNext} />
        </div>
      </div>

      {/* Show all the products across all annotations then selected should be in view */}
      {products?.length > 0 && (
        <ProductSection products={products} selectedProduct={selectedProduct} />
      )}
    </div>
  );
}
