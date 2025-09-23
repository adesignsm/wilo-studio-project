import { useState } from "react";

const VideoPlayer = ({ src, className = "" }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (e) => {
    console.error("Video failed to load:", e);
    setHasError(true);
    e.target.style.display = "none";
  };

  if (hasError) {
    return (
      <div className="video-fallback">
        <p>Video unavailable</p>
      </div>
    );
  }

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      onError={handleError}
      className={className}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
