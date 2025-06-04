import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Bookmarks from "./components/Routes/Bookmarks";
import ZcoderBase from "./pages/ZcoderBase";
import BookmarkForm from "./pages/BookmarkForm";
import Profile from "./components/Profile/Profile";
import SignIn from "./components/LoginPage/SignIn";
import SignUp from "./components/LoginPage/SignUp";
import Home from "./Rooms/pages/Home"
import EditorPage from "./Rooms/pages/EditorPage"
import CodeCompiler from "./components/compiler/CodeCompiler";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home*" element={<ZcoderBase />}>
          <Route path="bookmark" element={<Bookmarks />} />
          <Route path="bookmarkform" element={<BookmarkForm />} />
          <Route path="profile" element={<Profile />} />
          <Route path="compiler" element={<CodeCompiler />} />
                 </Route>
         

        <Route path="/rooms" element={<Home />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;