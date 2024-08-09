import { useState, useEffect } from "react";
import Select from 'react-select';
import { SiOpenai } from "react-icons/si";
import RevealImage from "../../components/RevealImage/RevealImage";
import * as imagesAPI from '../../utilities/images-api';

const options = [
  { value: 'image in cartoon style', label: 'Cartoon' },
  { value: 'image in 3D style', label: '3D' },
  { value: 'image in black and white', label: 'Black & White' },
];

export default function CreateImagePage({ user }) {
  const [prompt, setPrompt] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [aiImageUrl, setaiImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [isImageGenerated, setIsImageGenerated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let timer;
    if (isLoading) {
      timer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
     
      setMessage(
        <div style={{ marginTop: "10px"}}>
          Wait while your image is made by AI
          <div style={{ fontWeight: "bold"}}>
            ...{seconds} seconds
          </div>
        </div>
      );
    }
  }, [seconds, isLoading]);

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const generateImageRequest = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const types = selectedOptions.map((option) => option.value).join(" ");
    const combinedPrompt = `${prompt} ${types}`;


    try {
     
      const response = await imagesAPI.makeImage(combinedPrompt);

      if (!response.ok) {
        throw new Error("Image could not be made");
      }

      const data = await response.json();
     
      setaiImageUrl(data.ai_data);
      
      setMessage(""); // clear message
      
      setIsImageGenerated(true);

    } catch (error) {
      setMessage(error.message);
      setIsImageGenerated(true); // Switch to clear button on error
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setaiImageUrl("");
    setMessage("");
    setPrompt("");
    setSelectedOptions([]);
    setIsImageGenerated(false);
    setSeconds(0);
  };

  return (
    <div className="container">
        <h1>Hi, {user.name}</h1>
        <form onSubmit={generateImageRequest}>
          <label htmlFor="prompt"><h4>What image do you want to make?</h4></label>
         
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            id="prompt"
            placeholder="Describe image..."
            rows="3"
            required
          />

          <label htmlFor="selectOptions"><h4>Style options:</h4></label>
          <Select
            id="selectOptions"
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleSelectChange}
          />

          {!isImageGenerated && !isLoading && <button type="submit" id="make" className="icon"><SiOpenai /></button>}
          {isImageGenerated && <button type="button" onClick={resetForm}>CLEAR</button>}
        </form>
          {message && <h4>{message}</h4>}
          <br />

          <RevealImage aiImageUrl={aiImageUrl}/> 
         
        <br />
    </div>
  );
}
