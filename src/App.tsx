import { ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import CheckToken from "./components/CheckToken";
import Course from "./pages/Course";
import Courses from "./pages/Courses";
import { theme } from "./theme";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<CheckToken />}>
          <Route path="/prewiew-courses" element={<Courses />}></Route>
          <Route path="/prewiew-course/:courseId" element={<Course />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
