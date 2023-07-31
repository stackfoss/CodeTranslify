import { CodeBlock } from '@/components/CodeBlock';
import { LanguageSelect, languages } from '@/components/LanguageSelect';
import Adsense from '@eisberg-labs/next-google-adsense';
import { TextBlock } from '@/components/TextBlock';
import { TranslateBody } from '@/types/types';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
  const [inputLanguage, setInputLanguage] = useState<string>('Natural Language');
  const [outputLanguage, setOutputLanguage] = useState<string>('Python');
  const [inputCode, setInputCode] = useState<string>('');
  const [outputCode, setOutputCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasTranslated, setHasTranslated] = useState<boolean>(false);

  const handleTranslate = async () => {
    const maxCodeLength = 16000;

    if (inputLanguage === outputLanguage) {
      alert('Please select different languages.');
      return;
    }

    if (!inputCode) {
      alert('Please enter some code.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
      );
      return;
    }

    setLoading(true);
    setOutputCode('');

    const controller = new AbortController();

    const body: TranslateBody = {
      inputLanguage,
      outputLanguage,
      inputCode
    };

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        setLoading(false);
        alert('OpenAI key has expired.');
        return;
      }

      const data = await response.json();

      if (!data) {
        setLoading(false);
        alert('Something went wrong.');
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let code = '';

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        code += chunkValue;

        setOutputCode((prevCode) => prevCode + chunkValue);
      }

      setLoading(false);
      setHasTranslated(true);
      copyToClipboard(code);
    } catch (error) {
      setLoading(false);
      alert('Error occurred during translation.');
    }
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  useEffect(() => {
    const isOutputLanguageInArray = languages.some(
      (language) => language.value === outputLanguage
    );
    if (hasTranslated && isOutputLanguageInArray) {
      handleTranslate();
    }
  }, [outputLanguage]);

  return (
    <>
      <Head>
        <title>CodeTranslify</title>
        
        <meta name="description" content="Use AI to Convert or Generate Code from one language to another. AI Code Translator." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI Code Converter, Code Convert AI,AI Code translate, Code Generate AI, Code Translator, AICodeHelper, free, online" />
        <link rel="canonical" href="https://codetranslify.stackfoss.com" />
        <link rel="icon" href="/code.png" />
        {/* Add the Google Analytics script tags here */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Q03Q3VY7RV"></script>
        {/* Add the Google AdSense script */}
        <script data-ad-client="YOUR_AD_CLIENT_ID" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        {/* Buy Me a Coffee */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/buymeacoffee/2.0.0/button.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Q03Q3VY7RV');
            `,
          }}
        />
      </Head>
      {/* Add the Google AdSense : YOUR_AD_CLIENT_ID*/}
      <Adsense client_id="YOUR_AD_CLIENT_ID" />
      <header className="bg-gray-100 py-4 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <img className="w-10 h-10" alt="AICodeTranslify" src="/code.png" />
            <h1 className="text-black font-bold text-2xl ml-2">CodeTranslify</h1>
          </div>
          <nav>
          {/* Add Buy Me a Coffee button */}
<div className="flex space-x-4 mt-2 shadow-md">
  {/* Add Buy Me a Coffee button */}
  <a
    className="flex items-center justify-center px-3 py-1 text-base font-bold text-white bg-yellow-500 rounded-md shadow-md transition-colors duration-200 hover:bg-yellow-600"
    href="https://www.buymeacoffee.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
  >
    <i className="fas fa-mug-hot mr-2 text-sm"></i>
    <span className="hidden md:inline">Buy Me a Coffee</span>
  </a>
</div>



          </nav>
        </div>
      </header>

      <main className="flex h-full min-h-screen flex-col items-center bg-gradient-to-b from-gray-900 via-[#fcfcfc] to-black px-4 pb-20 text-white sm:px-10">
        <div className="mt-8 flex flex-col items-center justify-center sm:mt-10">
          <h1 className="text-4xl font-bold">CodeTranslify</h1>
          <div className="mt-4 text-xl text-center leading-7">
            One <span className="text-orange-500 font-bold">Code</span> many <span className="text-orange-500 font-bold">Languages</span> 
          </div>
          <p className="text-lg mt-2">Crafting Flawless Translations Between Languages and Natural Code</p>
        </div>

        <div className="mt-8 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">From</div>

            <LanguageSelect
              language={inputLanguage}
              onChange={(value) => {
                setInputLanguage(value);
                setHasTranslated(false);
              }}
            />

            {inputLanguage === 'Natural Language' ? (
              <TextBlock
                text={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            ) : (
              <CodeBlock
                code={inputCode}
                editable={!loading}
                onChange={(value) => {
                  setInputCode(value);
                  setHasTranslated(false);
                }}
              />
            )}
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">To</div>

            <LanguageSelect
              language={outputLanguage}
              onChange={(value) => {
                setOutputLanguage(value);
                setOutputCode('');
              }}
            />

            {outputLanguage === 'Natural Language' ? (
              <TextBlock text={outputCode} />
            ) : (
              <CodeBlock code={outputCode} />
            )}
          </div>
        </div>

        <div className="mt-5 text-center text-sm text-gray-300">
          {loading
            ? 'Generating...'
            : hasTranslated
            ? 'Output copied to clipboard!'
            : 'Enter some code and click "Generate"'}
        </div>

        <div className="mt-5 flex items-center space-x-2">
          <button
            className={`w-[140px] cursor-pointer rounded-md bg-blue-600 px-4 py-2 font-bold hover:bg-blue-700 ${
              loading ? 'opacity-75 pointer-events-none' : ''
            }`}
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </main>
      {/*Under main */}
      
 <div className="flex flex-col items-center mt-6 p-4 shadow-md bg-gray-100 w-full">
  <p className="text-gray-600 font-bold mb-4">Convert your <span className="text-[#F97316]">Code</span> 100% automatically in <span className="bg-[#FFC83E] text-[#FFFFFF]">5 seconds</span> with one click</p>
  <div className="flex flex-wrap justify-center space-x-7">
    <i className="fa-brands fa-python text-5xl text-[#3776AB] hover:text-blue-600 transition-all duration-200"></i>
    <i className="fa-brands fa-java text-5xl text-[#007396] hover:text-blue-600 transition-all duration-200"></i>
    <i className="fa-brands fa-php text-5xl text-[#777BB4] hover:text-blue-600 transition-all duration-200"></i>
    <i className="fa-brands fa-js text-5xl text-[#F7DF1E] hover:text-blue-600 transition-all duration-200"></i>
    <i className="fa-brands fa-swift text-5xl text-[#FFAC45] hover:text-blue-600 transition-all duration-200"></i>
  
  </div>
</div>

<div className="flex flex-col items-center mt-2 p-6 shadow-lg bg-[#F3F4F6] w-full">
  <h2 className="text-gray-800 text-2xl font-semibold mb-4">Key Features</h2>
  <div className="grid grid-cols-4 gap-4">
    <div className="flex flex-col items-center space-y-2">
      <i className="fa-solid fa-infinity text-[#3776AB] text-4xl"></i>
      <p className="text-gray-700">Unlimited Conversion</p>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <i className="fa-solid fa-dollar-sign text-[#007396] text-4xl"></i>
      <p className="text-gray-700">100% Free</p>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <i className="fa-solid fa-check-circle text-[#3B82F6] text-4xl"></i>
      <p className="text-gray-700">Easy to Use</p>
    </div>
    <div className="flex flex-col items-center space-y-2">
      <i className="fa-solid fa-lightbulb text-[#F59E0B] text-4xl"></i>
      <p className="text-gray-700">Intelligent AI</p>
    </div>
    {/* Add more features with icons and descriptions here */}
  </div>
</div>

<div className="mx-auto mt-10 w-2/3">
  <blockquote className="text-center text-lg font-semibold leading-7 text-gray-800 sm:text-xl sm:leading-8 bg-[#F3F4F6] px-6 py-4 rounded-lg shadow-md">
    <p className="italic">
      "CodeTranslify is a game-changer for developers! With its AI-powered platform, I can now translate code between languages seamlessly. It saves me valuable time and ensures accurate results. Highly recommended!"
    </p>
  </blockquote>
  <div className="mt-4 flex items-center justify-center space-x-3 text-sm">
    <img className="w-12 h-12 rounded-full shadow-md" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="John Smith" />
    <div>
      <div className="font-semibold text-gray-900">Sarah Smith</div>
      <div className="text-gray-600">Senior Software Engineer</div>
    </div>
  </div>
</div>


<hr className="my-8 border-gray-300" />
{/* fOOTER */}
<footer className="bg-gray-100 py-8">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {/* CodeTranslify Description */}
      <div>
        <h3 className="text-xl font-bold">CodeTranslify</h3>
        <p className="text-sm mt-2 text-gray-600">
          CodeTranslify is an AI-powered platform that allows you to easily convert or generate code from natural language or programming language code. Our advanced AI algorithms ensure accurate and efficient code translation for developers and programmers worldwide.
        </p>
      </div>

      {/* Social Media */}
      <div>
        <h3 className="text-xl font-bold">Socials</h3>
        <div className="flex space-x-4 mt-2">
          <a href="https://twitter.com/codetranslify" className="text-[#1DA1F2] hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter text-2xl shadow-md"></i>
          </a>
          <a href="https://www.facebook.com/codetranslify" className="text-[#4267B2] hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook text-2xl shadow-md"></i>
          </a>
          <a href="https://www.linkedin.com/company/codetranslify" className="text-[#2867B2] hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-2xl shadow-md"></i>
          </a>
          <a href="https://github.com/codetranslify" className="text-[#333] hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-2xl shadow-md"></i>
          </a>
        </div>
      </div>
            {/* Contact Information */}
      <div className="text-center sm:text-left">
        <h3 className="text-xl font-bold">Contact Us</h3>
        <p className="text-sm mt-2 text-gray-600">
          Have any questions or need support? Reach out to us!
        </p>
        <a href="mailto:info@codetranslify.com" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4 inline-block">
          Contact Now
        </a>
      </div>
    </div>
    <hr className="my-8 border-gray-300" />
    <div className="text-center text-sm text-gray-600">
      © {new Date().getFullYear()} CodeTranslify. All rights reserved.
    </div>
  </div>
</footer>

    </>
  );
}

