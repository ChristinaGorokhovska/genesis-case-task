import { Box, Container, Pagination } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import Axios from "../config/axiosConfig";
import { useAuthContext } from "../context/authProvider";
import usePagination from "../hooks/usePagination";
import CourseItem from "./CourseItem";

export interface ICourses {
  id: string;
  title: string;
  tags: [string];
  launchDate: string;
  status: string;
  description: string;
  duration: number;
  lessonsCount: number;
  containsLockedLessons: boolean;
  previewImageLink: string;
  rating: number;
  meta: {
    slug: string;
    skills: string[];
    courseVideoPreview: {
      link: string;
      duration: number;
      previewImageLink: string;
    };
  };
}

export default function CoursesList() {
  const [courses, setCourses] = useState<[ICourses]>();
  const [page, setPage] = useState<number>(1);

  const perPage = 10;
  const count = courses && Math.ceil(courses.length / perPage);

  const currCources = usePagination(courses, perPage);
  const { auth } = useAuthContext();

  const handleChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
    currCources.goTo(page);
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await Axios.get("/core/preview-courses", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        setCourses(res.data.courses);
      } catch (error) {}
    })();
  }, []);
  return (
    <Container>
      <Box display={"flex"} justifyContent="center">
        {courses && (
          <Box display={"flex"} alignContent="center" flexDirection={"column"} gap={3}>
            {currCources?.currCourses()?.map((item) => {
              return <CourseItem key={item.id} course={item} />;
            })}

            <Box my={2} display={"flex"} justifyContent="center">
              <Pagination variant="outlined" color="primary" count={count} page={page} onChange={handleChange} />
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
