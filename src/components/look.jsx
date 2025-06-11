import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

  const progressInterval = useRef();
  const videoRef = useRef(null);

  const currentMedia = useMemo(
    () => look.media[currentMediaIndex],
    [currentMediaIndex, look.media]
  );

  const totalMedia = useMemo(() => look.media.length, [look.media]);

  const products = useMemo(() => {
    const products =
      currentMedia?.annotations.flatMap((annotation) => annotation?.product) ||
      [];

    return products;
  }, [currentMedia?.annotations]);

  const handleAnnotationClick = (e, annotation) => {
    e.stopPropagation();
    setSelectedProduct(annotation.product);
  };

  const resetProgress = useCallback(() => {
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
  }, []);

  const startProgress = useCallback(() => {
    if (!isPlaying) return;

    resetProgress();

    if (currentMedia.type === "video") {
      // For videos, we'll track the actual video progress
      return;
    }

    // For images, use 5-second timer
    const duration = 5000;
    const increment = 100 / (duration / 100);

    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Auto advance to next media
          if (currentMediaIndex < totalMedia - 1) {
            onMediaChange(currentMediaIndex + 1);
          } else {
            // Signal to parent to move to next look
            onMediaChange("next-look");
          }
          return 0;
        }
        return prev + increment;
      });
    }, 100);
  }, [isPlaying, currentMedia, currentMediaIndex, totalMedia, onMediaChange]);

  // Handle image progress
  useEffect(() => {
    if (currentMedia.type === "image") {
      startProgress();
    } else {
      resetProgress();
    }

    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [startProgress, currentMedia.type]);

  // Handle video initialization when media changes
  useEffect(() => {
    if (videoRef.current && currentMedia.type === "video") {
      const video = videoRef.current;

      // Reset video to beginning
      video.currentTime = 0;
      video.muted = isMuted;

      // Start playing if active and should be playing
      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsPlaying(false);
          });
        }
      } else {
        video.pause();
      }
    }
  }, [currentMediaIndex, currentMedia]);

  // Handle play/pause state changes
  useEffect(() => {
    if (videoRef.current && currentMedia.type === "video") {
      const video = videoRef.current;

      if (isPlaying) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Play failed:", error);
            setIsPlaying(false);
          });
        }
      } else {
        video.pause();
      }
    }
  }, [isPlaying, currentMedia.type]);

  // Handle mute state changes
  useEffect(() => {
    if (videoRef.current && currentMedia.type === "video") {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, currentMedia.type]);

  const handlePlayPause = () => {
    if (currentMedia.type === "video" && videoRef.current) {
      const video = videoRef.current;

      if (isPlaying) {
        video.pause();
        setIsPlaying(false);
      } else {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Play failed:", error);
              setIsPlaying(false);
            });
        }
      }
    } else {
      // For images, just toggle the state
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  // Handle video progress
  const handleVideoTimeUpdate = () => {
    if (videoRef.current && currentMedia.type === "video") {
      const video = videoRef.current;
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
    }
  };

  const handleVideoEnded = () => {
    console.log("Video ended, moving to next media");
    if (currentMediaIndex < totalMedia - 1) {
      onMediaChange(currentMediaIndex + 1);
    } else {
      onMediaChange("next-look");
    }
  };

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
                type="button"
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
                type="button"
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
              loading="eager"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentMedia.url}
              className="w-full h-full object-cover"
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              onPlay={handleVideoPlay}
              onPause={handleVideoPause}
              playsInline
              muted={isMuted}
              loop={false}
            />
          )}
        </div>

        {/* Annotations for images */}
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
              type="button"
            >
              <div className="w-2 h-2 bg-yellow-800 rounded-full" />
            </button>
          ))}

        {/* Click areas - moved below media and buttons */}
        <div className="absolute inset-0 z-10 flex pointer-events-none">
          <div
            className="w-1/2 h-full pointer-events-auto cursor-pointer"
            onClick={onPrev}
          />
          <div
            className="w-1/2 h-full pointer-events-auto cursor-pointer"
            onClick={onNext}
          />
        </div>
      </div>

      {/* Product section */}
      {products?.length > 0 && (
        <ProductSection products={products} selectedProduct={selectedProduct} />
      )}
    </div>
  );
}
