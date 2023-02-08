import React, { useEffect, useReducer, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import favoriteReducer from '../reducers/Favorite';
import Logo from "../img/logo.png";
const API_KEY = '0504ac6c-eaf7-4a3a-a3dd-d2fc738a024f';

const FavoriteContext = React.createContext();
const Article = () => {
    const location = useLocation();
    const pathname = location.pathname;
    const [favorite, dispatch] = useReducer(favoriteReducer, []);
    const [article, setArticle] = useState([]);
    const [articleFields, setArticleFIelds] = useState([]);
    // const [favorite, setFavorite] = useState([]); 

    const add = () => {
        favorite.forEach((product, index) => {
            if (action.payload.id === product.id) {
              productExisted = true;
              productIndex = index;
            }
        });
        dispatch({ type: "ADD_PRODUCT", payload: article });
        console.log('work');
    };

    const remove = () => {
        dispatch({ type: "REMOVE_PRODUCT", payload: article.id });
        console.log('work');
    };

    useEffect(() => {
        const fetchArticleData = async () => {
          await api.get(`${pathname}`, {
            params: {
              'api-key': API_KEY,
              'show-fields': 'all',
            }
          })
            .then((res) => {
                setArticle(res.data.response.content);
                setArticleFIelds(res.data.response.content.fields);
            })
            .catch((err) => {
              console.log(err);
            });
        };
        fetchArticleData();
      }, []);
    
    console.log(article, articleFields, 'data');
    return (
        <FavoriteContext.Provider value={{ favorite, dispatch }}>
            <div className='main--wrap'>
            <div className='p-article--bloc'> 
                {favorite.length > 0 ? (
                    <>
                    {favorite.map(item => {
                        return item.id === article.id ?(
                            <button onClick={remove}>
                            <span className='c-bookmark--btn'>Delete bookmark</span>
                            </button>
                        ) : (
                            <button onClick={add}>
                            <span className='c-bookmark--btn'>Add bookmark</span>
                            </button>
                        )
                    }
                    )}
                    </>
                    
                ) : (
                    <button onClick={add}>
                        <span className='c-bookmark--btn'>add bookmark</span>
                    </button>
                )}
            <div className='p-article--bloc__inner'>
                <div className='content--wrap'>
                    <div className='content--wrap__inner'>
                        <p className='date'>{article.webPublicationDate}</p>
                        <h2>{articleFields.headline}</h2>
                        <h3>{articleFields.headline}</h3>
                        <div className='body-text' dangerouslySetInnerHTML={{__html: articleFields.body}} />
                    </div> 
                </div>
                <div className='img--wrap'>
                    <div className='img--wrap__innter'>
                    <img src={articleFields.thumbnail ? articleFields.thumbnail : Logo} alt="article" />
                    </div>
                    
                </div>
            </div>
            </div>
        </div>
        </FavoriteContext.Provider>
        
    )
}

export {Article, FavoriteContext};
