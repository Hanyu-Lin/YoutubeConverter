import React,{useState} from 'react'
import axios from 'axios'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const UrlForm = () => {
  const [videoUrl,setVideoUrl] = useState('');


  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleDownload()
    setVideoUrl('')

  }
  const handleDownload = async () => {
    const response = await axios.post('http://127.0.0.1:5000/download_video', { video_url: videoUrl });
    console.log(response.data);

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
        <button
          className="btn"
          aria-label="Enter URL"
          type="submit"
        >
          <DocumentArrowDownIcon />
        </button>
      </form>

    </div>
  )
}

export default UrlForm

