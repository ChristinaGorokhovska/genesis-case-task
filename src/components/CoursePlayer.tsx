// import { Box } from "@mui/material";
// import React from "react";
// import { useCourseContext } from "../context/courseProvider";
// import Player from "./Player";

// export default function CoursePlayer() {
//   const { course } = useCourseContext();
//   return (
//     <Box>
//       <Player courseId={course.id + "video"} videoLink={course.videoLink} />
//     </Box>
//   );
// }

import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useCourseContext } from "../context/courseProvider";
const Hls = (window as any).Hls;

export default function CoursePlayer() {
  const { course } = useCourseContext();
  useEffect(() => {
    try {
      const video: any = document.getElementById(course.id) || null;

      if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(course.lesson.videoLink);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = course.lesson.videoLink;
      }
    } catch (error) {
      console.log(error);
    }
  }, [course]);

  return (
    <div>
      <video
        controls
        width={650}
        id={course.id}
        poster={
          course.lesson.order === 0
            ? course.lesson.previewImageLink + `/cover.webp`
            : course.lesson.previewImageLink + `/lesson-${course.lesson.order}.webp`
        }
      />
    </div>
  );
}
