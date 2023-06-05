import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { toggleMenu } from "../utils/appSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { YOUTUBE_SEARCH } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const dispatch = useDispatch();
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions,setShowSuggestions] = useState(false)

  const searchCache = useSelector((store)=> store.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchCache[searchQuery]){
        setSuggestions(searchCache[searchQuery])
      }else{
        getSearchSuggestions()
      }
      }, 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH + searchQuery);
    const json = await data.json();
    console.log(searchQuery)
    setSuggestions(json[1]);
    dispatch(cacheResults({
      [searchQuery]:json[1]
    }))
  };

  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-md ">
      <div className="flex col-span-1 ">
        <MenuIcon
          className="h-10 cursor-pointer"
          onClick={() => toggleMenuHandler()}
        />

        <a>
          <img
            className="h-8 mx-2"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9klT0J1oDPUnPS84AxTRwYDVPXsZlF5AaDQ&usqp=CAU"
            alt=""
          />
        </a>
      </div>
      <div className="col-span-10 px-10">
        <div>
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={()=> {setShowSuggestions(true)}}
            onBlur={()=> setShowSuggestions(false)}
            className="w-1/2 border border-gray-400 p-2 rounded-l-full"
            value={searchQuery}
          ></input>
          <button className="border border-gray-400 p-2 rounded-r-full bg-gray-100">
            {<SearchRoundedIcon />}
          </button>
        </div>

       {showSuggestions && (<div className="fixed bg-white py-2 px-2 w-[32rem] shadow-lg rounded-lg border border-gray-100">
          <ul>
            {suggestions.map((s) => (
              <li
                key={s}
                className=" px-3 py-2 border border-gray-50 hover:bg-gray-100"
              >
                <SearchRoundedIcon /> {s}
              </li>
            ))}
          </ul>
        </div>)}
      </div>
      <div className="col-span-1">
        <AccountCircleIcon className="h-8" />
      </div>
    </div>
  );
};

export default Head;
