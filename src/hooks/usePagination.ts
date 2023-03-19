import React, { useState } from "react";
import { ICourses } from "../components/CoursesList";

export default function usePagination(courses: [ICourses] | undefined, perPage: number) {
  const [currPage, setCurrPage] = useState<number>(1);

  const currCourses = () => {
    const begin = (currPage - 1) * perPage;
    const end = begin + perPage;
    return courses?.slice(begin, end);
  };

  const goTo = (page: number) => {
    setCurrPage((currPage) => page);
  };

  return { currCourses, goTo };
}
