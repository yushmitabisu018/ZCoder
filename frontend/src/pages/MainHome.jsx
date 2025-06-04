import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from '../components/Routes/Header';
import Footer from '../components/LandingPage/Footer';
import BookmarkForm from '../components/Bookmark/BookmarkForm';
import BookmarkList from '../components/Bookmark/BookmarkList'; 
import Profile from '../components/Profile/Profile'; 
import Rooms from '../components/Rooms/Rooms'; 
import Compiler from '../components/compiler/CodeCompiler'; 

const MainHome = () => {
  return (
    <BrowserRouter>
      <Header />
      <LowerHeader />
      <Routes>
        <Route path="/home/bookmark" element={<BookmarkList />} />
        <Route path="/home/bookmark/add" element={<BookmarkForm />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/home/compiler" element={<Compiler />} />
        <Route path="/" element={<BookmarkList />} /> {/* Default route */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default MainHome;
