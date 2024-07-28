import React, { useEffect } from 'react';
import videojs from 'video.js';

const LiveStreaming = () => {
  useEffect(() => {
    const player = videojs('player');

    player.ready(function () {
      this.play();
    });

    // Cleanup on component unmount
    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <video
        id="player"
        className="video-js vjs-default-skin w-3/4 h-auto"
        controls
        autoPlay
        preload="none"
      >
        <source
          src="https://live5.thetavideoapi.com/hls/live/2015932/stream_ur1s1rnyyyuxgjpbikug30y7h/1722106632660/master.m3u8"
          type="application/x-mpegURL"
        />
      </video>

      {/* <style jsx>{`
        .vjs-seek-to-live-control,
        .vjs-fullscreen-control,
        .vjs-picture-in-picture-control {
          display: none;
        }
      `}</style> */}
    </div>
  );
};

export default LiveStreaming;
