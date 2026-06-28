import { createContext, useEffect, useRef, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [darkMode,setDarkMode] = useState(false);
    const [messages, setMessages] = useState([]);
    const [stopGeneration, setStopGeneration] = useState(false);
    const stopRef = useRef(false);
    const speechRef = useRef(null);

    // const delayPara = (index,nextWord) => {
    //     setTimeout(function () {
    //         if(stopRef.current) return;
    //         setResultData(prev=>prev+nextWord);
    //     },75*index)
    // }

    const newChat = () => {
        setLoading(false)
        setShowResult(false)
        setMessages([])
    }
    const stopResponse = () => {
        console.log("STOP CLICKED");
        stopRef.current = true;
        setLoading(false);
        window.speechSynthesis.cancel();
        speechRef.current = null;
    };

    const hasRun = useRef(false);

    const onSent = async (prompt, imageData=null) => {

        window.speechSynthesis.cancel();
        stopRef.current = false;
        setStopGeneration(false);
        setResultData("");
        try {

            setLoading(true)
            setShowResult(true)
            const currentPrompt = prompt || input;
            const updatedMessages = [
                ...messages,
                {
                    role: "user",
                    content: currentPrompt,
                },
            ];
            let response;
            if (prompt !== undefined){
                console.log("PROMPT:", prompt);
                console.log("IMAGE:", imageData);
                response = await runChat(
                    updatedMessages,
                    imageData,
                    (chunk) => {
                        setResultData(prev => prev + chunk);
                    }
                );
                setRecentPrompt(prompt) 
            }
            else{
                setPrevPrompts((prev) => [...prev, input])
                setRecentPrompt(input)
                response = await runChat(
                    updatedMessages,
                    imageData,
                    (chunk) => {
                        setResultData(prev => prev + chunk);
                    }
                );
            }
            setMessages([
                ...updatedMessages,
                {
                    role: "assistant",
                    content: response,
                },
            ]);
            
    
            // setPrevPrompts(prev=>[...prev,input])

            // let responseArray = response.split("**");
            // let newResponse ="";
            // for(let i=0;i<responseArray.length;i++)
            // {
            //     if(i===0 || i%2 !==1){
            //         newResponse += responseArray[i];
            //     }
            //     else{
            //         newResponse += "<b>"+responseArray[i]+"</b>";
            //     }
            // }
            // let newResponse2 = newResponse.split("*").join("</br>")
            // // setResultData(newResponse2 || "No response received");
            // let newResponseArray = newResponse2.split(" ");
            // for(let i = 0; i < newResponseArray.length; i++)
            //     {
            //         if(stopRef.current){
            //             break;
            //         }
            //         setResultData(prev => prev + newResponseArray[i] + " ");
            //         await new Promise(resolve =>
            //             setTimeout(resolve, 75)
            //         );
            //     }
            const speech = new SpeechSynthesisUtterance(response);
            speech.lang = "en-IN";
            speechRef.current = speech;
            window.speechSynthesis.speak(speech);
            console.log("FINAL RESPONSE:", response);

            setLoading(false);

        } catch (error) {

            setResultData("Quota exceeded. Try again later.");
            console.log(error);

            setLoading(false);
        }
    };

    // useEffect(() => {

    //     if (hasRun.current) return;

    //     hasRun.current = true;

    //     onSent("What is React JS");

    // }, []);

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat,
        darkMode,
        setDarkMode,
        messages,
        setMessages,
        stopResponse,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

// export { Context };

export default ContextProvider;