import React, { useEffect, useState } from 'react';
import {useNavigate as navigate} from 'react-router-dom';
import api from '../api';
import Logo from "../img/logo.png";

const API_KEY = '0504ac6c-eaf7-4a3a-a3dd-d2fc738a024f';
const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    // let navigate = useNavigate();
    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
        navigate("/search");
    };

    useEffect(() => {
        const fetchSearchData = async () => {
          await api.get('/search', {
            params: {
              'api-key': API_KEY,
              'q': searchQuery,
              'page-size': 8,
              'show-fields': 'all',
            }
          })
            .then((res) => {
                setSearchResults(res.data.response.results);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        fetchSearchData();
      }, []);
    console.log(searchResults, 'search result');
    const searchResultContext = React.createContext(searchResults);
    return (
        <div className='header'>
            <div className='header__inner'>
            <div className='logo'>
                <a href='/'><img src={Logo} alt='the peak'/></a>
            </div>
            <div className='search--box'>
                <input type="search"
            name="search" value={searchQuery} onChange={handleSearch}
            placeholder="Search" />
            </div>
            </div>
        </div>
        
    );
}

export default Header;