import { useState, useEffect } from 'react';

const FloatingStrings = () => {

    const stringsArray = [
    { text: "String1", message: "Message for String1" },
    { text: "String2", message: "Message for String2" },
    { text: "String3", message: "Message for String3" },
    { text: "String4", message: "Message for String4" },
    ]; // Your strings array

    const [styledStrings, setStyledStrings] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(null);
  
    useEffect(() => {
      let newStyledStrings = stringsArray.map(strObj => ({
        text: strObj.text,
        // message: strObj.message,
        top: Math.random() * window.innerHeight,
        left: Math.random() * window.innerWidth,
        animationDuration: Math.random() * 5 + 2, // Between 2 and 7 seconds
      }));
  
      setStyledStrings(newStyledStrings);
    }, []);


    const handleTextClick = (str) => {
        setCurrentMessage(str.message);
        setIsModalOpen(true);
      };
      
  
    return (
       
            <div>
                {styledStrings.map((str, index) => (
                    <div
                        key={index}
                        className="string"
                        style={{
                            top: str.top,
                            left: str.left,
                            animationDuration: `${str.animationDuration}s`,
                        }}
                        onClick={() => handleTextClick(str)}
                    >
                        {str.text}
                    </div>
                ))}
            </div>
    
    )
}

export default FloatingStrings;
