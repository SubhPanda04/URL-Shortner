import * as React from 'react';

interface IFormContainerProps {
}

const FormContainer: React.FunctionComponent<IFormContainerProps> = () => {
  return (
    <div className="container mx-auto p-2">
    <div className="bg-banner my-8 rounded-xl bg-cover">
        <div
            className="relative rounded-xl bg-cover bg-center h-80 w-full flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: 'url(./beautiful-sky-landscape-digital-art-style.jpg)' }}
        >
            <h2 className="text-4xl font-bold mb-2">
                URL Shortener
            </h2>
            <p className="text-xl font-extralight mb-1 text-center">
                Paste your untidy link to shorten it
            </p>
            <p className="text-sm font-thin text-center max-w-xl">
                Feel free to shorten or reduce link. Use our URL shortener to create a shortened & neat link making it easy to use.
            </p>

            <form className="w-full max-w-md mt-4">
                <div className="flex items-center relative">
                    <span className="absolute left-3 text-gray-500 text-sm">urlshortner.link/</span>
                    <input
                        type="text"
                        required
                        placeholder="add your link"
                        className="pl-[130px] pr-4 py-2 w-full rounded-md border border-gray-300 text-black"
                    />
                </div>
            </form>
        </div>
    </div>
</div>
  )
};

export default FormContainer;
