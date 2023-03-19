import { Box, ListItem, ListItemIcon, ListItemText, Rating, Typography } from "@mui/material";
import { ICourse } from "./NavBar";
import CheckIcon from "@mui/icons-material/Check";

export default function CourseDetails({ courseData }: { courseData: ICourse }) {
  return (
    <Box width={"100%"}>
      <Typography variant="h6" my={1} color={"primary.main"}>
        About course
      </Typography>
      <Typography variant="h5" color={"secondary"}>
        {courseData.title}
      </Typography>
      <Box display={"flex"} alignItems="center">
        <Rating defaultValue={courseData.rating} readOnly size="small" />
        <Typography ml={1} variant="subtitle1" color="text.secondary" component="div">
          {courseData.lessons.length} lessons
        </Typography>
      </Box>

      <Typography variant="h6" color={"info.main"}>
        {courseData.description}
      </Typography>

      {courseData.meta.skills && (
        <Box my={2}>
          <Typography variant="h6" color={"primary.main"}>
            Skills
          </Typography>
          {courseData.meta.skills.map((skill: string) => {
            return (
              <ListItem alignItems="center" style={{ display: "flex", alignItems: "center" }}>
                <ListItemIcon>
                  <CheckIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={skill} />
              </ListItem>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
