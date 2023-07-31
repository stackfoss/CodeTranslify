import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@fortawesome/fontawesome-free/css/all.css';

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <main className="font-inter">
      <Component {...pageProps} />
    </main>
  );
}

export default App;
