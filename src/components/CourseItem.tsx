import { Card, Box, CardMedia, CardContent, Typography, Button, Rating } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ICourses } from "./CoursesList";
import Player from "./Player";

export default function CourseItem({ course }: { course: ICourses }) {
  const [hover, setHover] = useState<boolean>(false);
  return (
    <>
      <Card
        sx={{ display: "flex", border: "2px solid #ED5B2A", borderRadius: "21px", padding: 2 }}
        onMouseEnter={(e) => setHover(true)}
        onMouseLeave={(e) => setHover(false)}
      >
        <Box sx={{ display: "flex" }}>
          <Box>
            {hover ? (
              <Box>
                <Player courseId={course.id} videoLink={course.meta.courseVideoPreview.link} />
              </Box>
            ) : (
              <CardMedia
                component="img"
                sx={{ width: "280px" }}
                image={course.previewImageLink + "/cover.webp"}
                alt={course.title}
              />
            )}

            <Box sx={{ textAlign: "center", marginTop: 2 }}>
              <Button variant="outlined" component={Link} to={`/prewiew-course/${course.id}`}>
                View course
              </Button>
            </Box>
          </Box>

          <CardContent>
            <Typography component="div" variant="h5">
              {course.title}
            </Typography>
            <Box display={"flex"} alignItems="center">
              <Rating name="size-small" defaultValue={course.rating} readOnly size="small" />
              <Typography ml={1} variant="subtitle1" color="text.secondary" component="div">
                {course.lessonsCount} lessons
              </Typography>
            </Box>

            <Box my={2} display={"flex"} sx={{ flexWrap: "wrap" }} gap={2} maxWidth={"600px"}>
              {course.meta.skills.map((skill: string) => {
                return (
                  <Typography variant="body2" color={"primary"}>
                    {skill}
                  </Typography>
                );
              })}
            </Box>
          </CardContent>
        </Box>
      </Card>
    </>
  );
}
