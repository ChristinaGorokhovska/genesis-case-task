import React, { useEffect } from "react";

import { Typography } from "@mui/material";
const Hls = (window as any).Hls;

export default function Player({ courseId, videoLink }: { courseId: string; videoLink: string }) {
  useEffect(() => {
    try {
      const video: any = document.getElementById(courseId) || null;

      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(videoLink);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoLink;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <video muted width={280} autoPlay={true} id={courseId} />
    </div>
  );
}
