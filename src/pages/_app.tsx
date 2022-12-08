import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

const API_MOCKING = true;

export default function App({ Component, pageProps }: AppProps) {
  const [shouldRender, setShouldRender] = useState(API_MOCKING);

  useEffect(() => {
    async function initMocks() {
      const { initMocks } = await import("../mocks");
      await initMocks();
      setShouldRender(true);
    }

    if (API_MOCKING) {
      initMocks();
    }
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <Component {...pageProps} />;
}
