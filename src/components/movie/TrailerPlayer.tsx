'use client';

import ReactPlayer from 'react-player/youtube';

interface TrailerPlayerProps {
  videoKey: string;
  playing?: boolean;
  muted?: boolean;
  onEnded?: () => void;
  className?: string;
}

export default function TrailerPlayer({
  videoKey,
  playing = true,
  muted = true,
  onEnded,
  className = '',
}: TrailerPlayerProps) {
  return (
    <ReactPlayer
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      playing={playing}
      muted={muted}
      controls={false}
      onEnded={onEnded}
      width="100%"
      height="100%"
      className={className}
    />
  );
}
