import { BrowserRouter, Routes, Route } from "react-router-dom";
import Boday from "./components/Boday";
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Boday />}>
            <Route path="/login" element={<>Login page</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
