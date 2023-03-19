import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useCourseContext } from "../context/courseProvider";
import LessonMenuItem from "./LessonMenuItem";
import LockOpenIcon from "@mui/icons-material/LockOpen";

export interface ICourse {
  id: string;
  title: string;
  tags: [string];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: [string];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
  lessons: [ILesson];
}

export interface ILesson {
  id: string;
  title: string;
  duration: number;
  order: number;
  type: string;
  status: string;
  link: string;
  previewImageLink: string;
  meta?: {} | null;
}

export default function NavBar({ courseData }: { courseData: ICourse }) {
  const { course, setCourse } = useCourseContext();

  const handlePreview = () => {
    setCourse({
      ...course,
      lesson: {
        order: 0,
        videoLink: courseData.meta.courseVideoPreview.link,
        status: "unlocked",
        previewImageLink: courseData.previewImageLink + "/cover.webp",
      },
    });
  };
  return (
    <div>
      <Box>
        <Stack spacing={2}>
          <Card sx={{ border: "2px solid red", borderRadius: "7px", padding: 1 }}>
            <CardActionArea onClick={handlePreview}>
              <Grid sx={{ flexWrap: "nowrap" }} container gap={2} alignItems="center">
                <LockOpenIcon />
                <Grid sm={5} item>
                  <Box sx={{ width: "100%" }} component={"img"} src={courseData.previewImageLink + "/cover.webp"}></Box>
                </Grid>
                <Grid sm={7} item>
                  <Typography color={"secondary"} variant="body1">
                    Preview
                  </Typography>
                </Grid>
              </Grid>
            </CardActionArea>
          </Card>
          {courseData &&
            courseData.lessons.map((lesson: ILesson) => {
              return <LessonMenuItem lesson={lesson} />;
            })}
        </Stack>
      </Box>
    </div>
  );
}
