import { useState } from "react";
import axios from 'axios';

export default function App() {

  const [fullUrl,setFullUrl] = useState('');
  const [shortUrl,setShortUrl] = useState("");

  const handleSubmit = (()=> {
    axios.post("http://localhost:3000/api/short",{fullUrl})
      .then((res)=> {
        setShortUrl(res.data);      
      })
      .catch((err)=> console.log(err));
  })

  return  (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
     <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-5xl font-bold text-center mb-6 text-blue-600">
          URL Shortner
        </h1>
         <div onSubmit={handleSubmit} className="flex flex-col space-y-4">
           <input 
              value={fullUrl}
              onChange={(e)=> setFullUrl(e.target.value)}
              type="text" name = "fullUrl" id=""
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
              type="button"
              onClick={handleSubmit}
              className="bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700"
              >
                Shorten
              </button>
              {
                shortUrl && (
                  <div className="mt-6 text-center">
                    <p className="text-lg font-medium">Shortened URL: </p>
                    <a 
                    href={shortUrl?.shortUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-2"
                    >
                    {shortUrl?.shortUrl}
                    </a>
                    {
                      {shortUrl} && <img src={shortUrl.qrCodeImg} alt="Generated QR Code " className="items-center" />
                    }
                  </div>
                )
              }
         </div>
     </div>
    </div>
  )
}