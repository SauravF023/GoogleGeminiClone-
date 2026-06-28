import { jsPDF } from "jspdf";
import React, { useContext, useState } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = "en-US";
const Main = () => {

    const startListening = () => {
        recognition.start();
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
            onSent(transcript);
        };
    };
    const downloadTXT = () => {
        let text = "";
        messages.forEach((msg) => {
            text += `${msg.role.toUpperCase()}:\n`;
            text += `${msg.content}\n\n`;
        });
        const blob = new Blob([text], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "chat-history.txt";
        a.click();
        URL.revokeObjectURL(url);
    };
    const downloadPDF = () => {
        const doc = new jsPDF();
        let y = 20;
        messages.forEach((msg) => {
            const line = `${msg.role.toUpperCase()}: ${msg.content}`;
            const splitText = doc.splitTextToSize(line, 180);
            doc.text(splitText, 10, y);
            y += splitText.length * 8;
            if (y > 270) {
                doc.addPage();
                y = 20;
            }
        });
        doc.save("chat-history.pdf");
    };  

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input,darkMode,messages,stopResponse} = useContext(Context)
    const [image, setImage] = useState(null)
    const [imageData, setImageData] = useState(null)
  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <div>
                <button className="export-btn pdf-btn" onClick={downloadPDF}>📄PDF</button>
                <button className="export-btn txt-btn" onClick={downloadTXT}>📝TXT</button>
                <img src={assets.user_icon} alt="" />
            </div>
        </div>
        <div className="main-container">

          {!showResult
          ?<>
              <div className="greet">
                <p><span>Hello, Dev</span></p>
                <p>How can I help you Today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places for upcoming road trips</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div> 
          </>
          :<div className='result'>
              <div className="result-title">
                  <img src={assets.user_icon} alt="" />
                  <p>{recentPrompt}</p>
              </div>
              <div className="result-data">
                  <img src={assets.gemini_icon} alt="" />
                  <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                  {loading && (
                  <span className="typing-cursor">|</span>)} 
              </div>

          </div>
          
          }


            
            {/* <div className='result'>
                <p className='result-title'>{recentPrompt}</p>
                <div className="result-data">
                    {loading
                        ? <p>Loading...</p>
                        : <p>{resultData}</p>
                    }
                </div>
            </div> */}
            {
            image &&
            <div className="image-preview">
                <img src={image} alt="" />
            </div>
}
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
                    <div>
                        <label htmlFor="imageUpload">
                            <img src={assets.gallery_icon} alt="" />
                        </label>
                        <input
                            type="file"
                            id="imageUpload"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0]
                                if(file){
                                    setImage(URL.createObjectURL(file))
                                    const reader = new FileReader();
                                    reader.readAsDataURL(file)
                                    reader.onload = () =>{
                                        setImageData(reader.result)
                                    }
                                    console.log(file)
                                }
                            }}
                        />
                        <img src={assets.mic_icon} alt="" onClick={startListening} />
                        {input?<img onClick={()=>onSent(input, imageData)} src={assets.send_icon} alt="" />:null}
                        {loading && (
                            <button
                            className="stop-btn"onClick={stopResponse}>
                                Stop
                            </button>
                        )}
                    </div>
                </div>
                <p className="bottom-info">
                    Gemini may display inaccurate info,including about people, so double-check its responses. Your privacy and Gemini Apps.

                </p>
            </div>
        </div>
        
    </div>
  )
}

export default Main