import { createContext, useContext, useState } from "react";
interface ICourse {
  id: string;
  lesson: {
    order: number;
    videoLink: string;
    status: string;
    previewImageLink: string;
  };
}

interface ICourseContext {
  course: ICourse;
  setCourse: (course: ICourse) => void;
}

const initialCourse = {
  id: "",
  lesson: {
    order: 0,
    videoLink: "",
    status: "",
    previewImageLink: "",
  },
};

const initialCourseContext = {
  course: initialCourse,
  setCourse: (course: ICourse) => undefined,
};

const CourseContext = createContext<ICourseContext>(initialCourseContext);

export function useCourseContext() {
  return useContext(CourseContext);
}

export function CourseProvider({ children }: { children: JSX.Element }) {
  const [course, setCourse] = useState<ICourse>(initialCourse);

  return <CourseContext.Provider value={{ course, setCourse }}>{children}</CourseContext.Provider>;
}
