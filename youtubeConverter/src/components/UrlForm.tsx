import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import BeatLoader from "react-spinners/BeatLoader";
const UrlForm = () => {
  const [videoUrl,setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  let theme = JSON.parse(localStorage.getItem('components.theme')!)


  useEffect( () =>{
    theme = JSON.parse(localStorage.getItem('components.theme')!)
  })

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    handleDownload()
    setVideoUrl('')

  }
  const handleDownload = async () => {
    try{
      const response = await axios.post('http://127.0.0.1:5000/download_video', { video_url: videoUrl });
      console.log(response.data);
    }catch(error){
      console.error(error);
    } finally {
    setLoading(false);
    }
  }

  return (
    <div>
      <form
        className="form"
        onSubmit={handleFormSubmit}
      >
        <div className="wrapper"> 
          <input
            type="text"
            className="input"
            id="inputField"
            value={videoUrl}
            onInput={(e) => setVideoUrl((e.target as HTMLInputElement).value)}
            required
            autoFocus
            maxLength={100}
            placeholder="Enter URL"
          />
          <label
            htmlFor="inputField"
            className="label"
          >
            Enter URL
          </label>
        </div>
        {
          loading?
          (

            <button
              className='btn'>
              
              <BeatLoader
                color={theme === "dark"? "#16161d" : "#ecebf4"}
                loading={loading}
                size={5}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </button>
          ):(
          <button
            className="btn"
            aria-label="Enter URL"
            type="submit"
          >
            <DocumentArrowDownIcon />
          </button>
          )
        }
      </form>

    </div>
  )
}

export default UrlForm

