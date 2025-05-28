import { useState } from "react";
import axios from "axios";

export default function App() {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = () => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
    axios
      .post(`${apiUrl}/api/short`, { fullUrl })
      .then((res) => {
        setShortUrl(res.data);
        setCopied(false);
      })
      .catch((err) => console.log(err));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl.shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
      {/* Glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-purple-700 opacity-20 blur-3xl rounded-full top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-[300px] h-[300px] bg-indigo-500 opacity-10 blur-2xl rounded-full bottom-10 right-20"></div>
      </div>

      {/* Header */}
      <header className="text-center pt-20 pb-12 relative z-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          🔗 URL Shortener
        </h1>
        <p className="mt-4 text-white/70 text-lg max-w-xl mx-auto">
          Shorten long links into beautiful, trackable URLs — complete with QR codes and easy sharing.
        </p>
      </header>

      {/* Main Card */}
      <main className="relative z-10 flex items-center justify-center">
        <div className="w-full max-w-xl bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-lg border border-white/10">
          <div className="flex flex-col space-y-5">
            <input
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              type="text"
              placeholder="Paste your long URL here..."
              className="w-full p-4 rounded-xl border border-white/20 bg-white/10 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-700 transition-all text-white font-medium shadow-md"
            >
              🚀 Shorten URL
            </button>
          </div>

          {shortUrl && (
            <div className="mt-8 p-6 bg-white/10 border border-white/10 rounded-xl text-center space-y-4">
              <p className="text-lg font-medium">Here's your link 🎉</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3">
                <a
                  href={shortUrl.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-300 text-lg underline break-all hover:text-violet-100"
                >
                  {shortUrl.shortUrl}
                </a>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-violet-600 hover:bg-violet-700 rounded-lg text-sm"
                >
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
              </div>

              {shortUrl.qrCodeImg && (
                <div className="pt-4">
                  <img
                    src={shortUrl.qrCodeImg}
                    alt="QR Code"
                    className="mx-auto w-28 h-28 bg-white/5 p-2 rounded-xl shadow"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-white/40 text-sm py-12 pt-48 relative z-10">
        © {new Date().getFullYear()} Url Shortener. Built with 💜 using React + Tailwind CSS.
      </footer>
    </div>
  );
}
