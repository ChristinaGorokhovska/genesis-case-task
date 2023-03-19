import { Box, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseDetails from "../components/CourseDetails";
import CoursePlayer from "../components/CoursePlayer";
import NavBar, { ICourse, ILesson } from "../components/NavBar";
import Axios from "../config/axiosConfig";
import { useAuthContext } from "../context/authProvider";
import { useCourseContext } from "../context/courseProvider";
import PhonelinkLockIcon from "@mui/icons-material/PhonelinkLock";
import Header from "../components/Header";

export default function Course() {
  const [courseData, setcourseData] = useState<ICourse>();

  const { auth } = useAuthContext();
  const { course, setCourse } = useCourseContext();
  const { courseId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get(`/core/preview-courses/${courseId}`, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });
        setcourseData(res.data);

        setCourse({
          id: courseId || "",
          lesson: {
            order: 0,
            videoLink: res.data.meta.courseVideoPreview.link || "",
            status: "unlocked",
            previewImageLink: res.data.previewImageLink,
          },
        });
      } catch (error) {}
    })();
  }, []);

  const lessonData = courseData?.lessons.filter((item: ILesson) => {
    return item.order == course.lesson.order;
  });
  return (
    <>
      <Header />
      {courseData && (
        <Container>
          <Grid container justifyContent={"space-between"}>
            <Grid item sm={3.5}>
              <NavBar courseData={courseData} />
            </Grid>

            <Grid item sm={7}>
              <Box my={1}>
                <Typography variant="h5" color={"info.main"}>
                  {course.lesson.order === 0
                    ? "Preview"
                    : `${course.lesson.order} Lesson` + (lessonData && `: ${lessonData[0].title}`)}
                </Typography>
              </Box>
              {course.lesson.status == "unlocked" ? (
                <CoursePlayer />
              ) : (
                <Box display={"flex"} justifyContent="center" py={5} alignItems="center">
                  <PhonelinkLockIcon fontSize="large" />
                  <Typography ml={2} variant="h4" color={"info.main"}>
                    Sorry, lesson is locked
                  </Typography>
                </Box>
              )}
              <Box>
                <CourseDetails courseData={courseData} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
}
