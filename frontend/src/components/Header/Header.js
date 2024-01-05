import React, { useState } from 'react'
import "./Header.css"

import { Link } from "react-router-dom";
import {SunIcon,MoonIcon} from "./Icons"
import {
    Home,
    HomeOutlined,
    Add,
    AddOutlined,
    SearchOutlined,
    Search,
    AccountCircle,
    AccountCircleOutlined,
    PersonSearch,
    PersonSearchOutlined
  } from "@mui/icons-material";
import useThemeSwitcher from '../hooks/useThemeSwitcher';
  


const Header = () => {
  const[mode,setMode]=useThemeSwitcher();

    const [tab, setTab] = useState(window.location.pathname);

  return (
    <div className="header dark:bg-darknav">
      <span className='relative right-60 text-xl font-cursive '>BookVana</span>
    <Link to="/" onClick={() => setTab("/")}>
      {tab === "/" ? <Home className='dark:bg-white' style={{ color: "black" }} /> : <HomeOutlined className='dark:color-white' />}
    </Link>
    <Link to="/searchBook" onClick={() => setTab("/searchBook")}>
      {tab === "/searchBook" ? (
        <Search className={mode === "dark" ? 'dark:text-white' : ''} style={{ color: mode === "dark" ? "white" : "black" }}  />
      ) : (
        <SearchOutlined className='dark:color-white' />
      )}
    </Link>
    <Link to="/searchPerson" onClick={() => setTab("/searchPerson")}>
      {tab === "/searchPerson" ? (
        <PersonSearch style={{ color: "black" }} />
      ) : (
        <PersonSearchOutlined className='dark:color-white' />
      )}
    </Link>

    <Link to="/newpost" onClick={() => setTab("/newpost")}>
      {tab === "/newpost" ? (
        <Add style={{ color: "black" }} />
      ) : (
        <AddOutlined className='dark:color-white' />
      )}
    </Link>



    <Link to="/account"  onClick={() => setTab("/account")}>
      {tab === "/account" ? (
        <AccountCircle  style={{ color: "black" }} />
      ) : (
        <AccountCircleOutlined />
      )}
    </Link>
    <button
        className={` ml-10 flex items-center justify-center rounded-full cursor-pointer p-1 -mt-1  ${mode==="light"?"bg-dark text-light":"bg-light text-dark"}`}
         onClick={()=>setMode(mode=="light"?"dark":"light")}
        >
          {
            mode==='dark'?
            <SunIcon className={"fill-dark"}/>:
            <MoonIcon className={"fill-dark"}/>
          }
        </button>
  </div>
  )
}

export default Header;
