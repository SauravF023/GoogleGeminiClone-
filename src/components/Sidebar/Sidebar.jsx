import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context'
const Sidebar = () => {
    
    const [extended,setExtended] = useState(false)
    const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
    )
    const [showSettings, setShowSettings] = useState(false)
    const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(Context)
    React.useEffect(() => {

    if (darkMode) {
        document.body.classList.add("dark-theme")
    } else {
        document.body.classList.remove("dark-theme")
    }
    }, [darkMode])

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }

  return (
    <div className={darkMode ? 'sidebar dark' : 'sidebar'}>
        <div className='top'>
            <img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt="" />
            <div onClick={()=>newChat()} className="new-chat">
                <img src= {assets.plus_icon} alt="" />
                {extended?<p>New Chat</p>:null}
            </div>
            {extended
            ?<div className="recent">
                <p className="recent-title">Recent</p>
                {prevPrompts.map((item,index)=>{
                    return(
                        <div onClick={()=>loadPrompt(item)} className="recent">
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)}...</p>
                        </div>
                    )
                })}
                <div className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>What is react...</p>
                </div>
            </div>
            :null    
        }
            
        </div>
        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {extended?<p>Help</p>:null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
                {extended?<p>Activity</p>:null}
            </div>
            <div className="bottom-item recent-entry settings-container">
                <img src={assets.setting_icon} alt="" onClick={() => setShowSettings(!showSettings)} />
                {extended?<p>Settings</p>:null}
                {showSettings && (
                    <div className="settings-popup">
                        <p onClick={() => {
                            const newTheme = !darkMode
                            setDarkMode(!darkMode)
                            localStorage.setItem(
                                "theme",
                                newTheme ? "dark" : "light"
                            )
                            document.body.className = newTheme ? "dark-theme" : ""

                        }}>
                            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
                        </p>
                    </div>    
                )}
            </div>
        </div>
    </div>
  )
}

export default Sidebar