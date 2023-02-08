import React, { useEffect, useState, useContext } from 'react';
import { FavoriteContext } from "../pages/Article";

const BookmarkList = () => {
    const { favorite } = useContext(FavoriteContext);
    const [data, setData] = useState(favorite);
    console.log(data, 'got fav list');
    return (
        <div>this is fav page</div>
    )
}

export default BookmarkList;