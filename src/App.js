import React from 'react';
import { Routes, Route} from "react-router-dom";
import Header from './components/Header';
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SearchResults from './pages/SearchResults';
import { Article } from './pages/Article';
import BookmarkList from './pages/BookmarkList';

export function App() {
    return (
        <div className='container--wrap'>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path=":category/:year/:month/:day/:title" element={<Article />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/bookmark-list" element={<BookmarkList />} />
            </Routes>
            <Footer />
        </div>
        
    );
}