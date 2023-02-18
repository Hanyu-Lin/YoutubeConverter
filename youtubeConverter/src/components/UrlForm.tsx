import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import BeatLoader from "react-spinners/BeatLoader";
const UrlForm = () => {
  const [videoUrl,setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = useSelector((state: RootState) => state.theme)

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    handleDownload();
    setVideoUrl('')

  }
  const handleDownload = async () => {
    try{
      const response = await fetch('http://127.0.0.1:5000/download_video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_url: videoUrl }),
      });
      const blob = await response.blob();
      console.log(response.headers)
      const url = URL.createObjectURL(blob);
      openDownloadedFile(url,"video")

    }catch(error){
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const openDownloadedFile = (url :string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.mp4`;
    document.body.appendChild(link);
    link.click();
    link.remove();
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
            onInput={(e) => setVideoUrl(e.currentTarget.value)}
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

