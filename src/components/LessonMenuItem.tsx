import { Box, Card, CardActionArea, Grid, Typography } from "@mui/material";
import React from "react";
import { useCourseContext } from "../context/courseProvider";
import durationToMinutes from "../utilities/durationToMinutes";
import { ILesson } from "./NavBar";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

export default function LessonMenuItem({ lesson }: { lesson: ILesson }) {
  const { course, setCourse } = useCourseContext();
  const handlleChangeCourseLesson = () => {
    setCourse({
      ...course,
      lesson: {
        order: lesson.order,
        videoLink: lesson.link,
        status: lesson.status,
        previewImageLink: lesson.previewImageLink,
      },
    });
  };
  return (
    <Card sx={{ border: "2px solid #ED5B2A", borderRadius: "7px", padding: 1 }}>
      <CardActionArea onClick={handlleChangeCourseLesson}>
        <Grid sx={{ flexWrap: "nowrap" }} container gap={2} alignItems="center">
          {lesson.status === "locked" ? <LockIcon color="primary" /> : <LockOpenIcon color="primary" />}
          <Grid sm={5} item>
            <Box
              sx={{ width: "100%", objectFit: "cover" }}
              component={"img"}
              src={lesson.previewImageLink + `/lesson-${lesson.order}.webp`}
            ></Box>
          </Grid>
          <Grid sm={7} item>
            <Typography color={"secondary.main"} variant="body1">
              {lesson.title}
            </Typography>
            <Typography variant="body2">{durationToMinutes(lesson.duration)} min</Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}
