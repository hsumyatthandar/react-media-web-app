import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import api from '../api';
import Logo from "../img/logo.png";

const API_KEY = '0504ac6c-eaf7-4a3a-a3dd-d2fc738a024f';
const Home = () =>  {
  const [orderby, setOrderby] = useState('newest');
  const [news, setNews] = useState([]);
  const [sportNews, setSportNews] = useState([]);
  
  const handleChange = (event) => {
    setOrderby(event.target.value);
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      await api.get('/news', {
        params: {
          'api-key': API_KEY,
          'page-size': 8,
          'show-fields': 'all',
          'order-by': orderby
        }
      })
        .then((res) => {
          setNews(res.data.response.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchNewsData();
  }, [orderby]);

  useEffect(() => {
    const fetchSportNewsData = async () => {
      await api.get('/sport', {
        params: {
          'api-key': API_KEY,
          'page-size': 3,
          'show-fields': 'all',
          'order-by': orderby
        }
      })
        .then((res) => {
          setSportNews(res.data.response.results);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchSportNewsData();
  }, [orderby]);
    return (
      <div className='main--wrap'>
        <div className='main__title--bar'>
          <h1>Top stories</h1>
          <div>
            <a href='/bookmark-list'><span className='c-bookmark--btn'>view bookmark</span></a>
            <div className='order--filter'>
              <select value={orderby} onChange={handleChange}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
        <div className='p-top__news--bloc'>
          <div className='p-top__news--bloc__row'>
          {news.map((data, index) =>
          {
            return index === 0 ? (
              <div key={data.id} className='new--bloc__card large-item'>
                <div className='img--box'>
                    <a href={data.id}>
                      <img src={data.fields.thumbnail ? data.fields.thumbnail : Logo} alt="peak news" />
                    </a>
                  </div>
                  <div className='txt--box'>
                  <a href={data.id}>
                  <div className="txt--box__inner">
                      <h3>{data.fields.headline}</h3>
                      <p>{data.fields.trailText}</p>
                    </div>
                    </a>
                  </div>
              </div>
            ) : index === 1 || index === 2 || index === 3 || index === 4 ? (
              <div key={data.id} className='new--bloc__card item'>
                  <div className='img--box'>
                    <a href={data.id}>
                      <img src={data.fields.thumbnail ? data.fields.thumbnail : Logo} alt="peak news" />
                    </a>
                  </div>
                  <div className='txt--box'>
                  <a href={data.id}>
                    <div className="txt--box__inner">
                      <h3>{data.fields.headline}</h3>
                    </div>
                    </a>
                  </div>
              </div>
            ) : (<></>)
          }
          )}
          </div>
          <div className='c-cards'>
            {news.map((data, index) => {
              return index === 5 || index === 6 || index === 7 ? (
                <div key={data.id} className='c-cards__card'>
                      <div className='img--box'>
                        <a href={data.id}>
                          <img src={data.fields.thumbnail ? data.fields.thumbnail : Logo} alt="" />
                        </a>
                      </div>
                      <div className='txt--box'>
                      <a href={data.id}>
                        <div className="txt--box__inner">
                          <h3>{data.fields.headline}</h3>
                          <p>{data.fields.trailText}</p>
                        </div>
                        </a>
                      </div>
                  </div>
              ): (<></>)
            })}
            </div>
        </div>
        <div className='main__title--bar'>
          <h2>Sports</h2>
        </div>
        <div className='p-top__sport--bloc'>
            <div className='c-cards'>
            {sportNews.map(data => {
              return (
                <div key={data.id} className='c-cards__card'>
                      <div className='img--box'>
                        <a href={data.id}>
                          <img src={data.fields.thumbnail ? data.fields.thumbnail : Logo} alt="peak sport" />
                        </a>
                      </div>
                      <div className='txt--box'>
                      <a href={data.id}>
                        <div className="txt--box__inner">
                          <h3>{data.fields.headline}</h3>
                        </div>
                        </a>
                      </div>
                  </div>
              )
            })}
            </div>
        </div>
        
      </div>
    ) 
  }
  
  export default Home;