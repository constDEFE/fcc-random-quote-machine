import { FC, useEffect, useState, useRef } from "react";
import { FaQuoteLeft, FaTwitter } from "react-icons/fa";
import { sleep } from "./helpers";
import "./App.scss";

const App: FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [color, setColor] = useState<string>("#FF6347");
  const textRef = useRef<HTMLQuoteElement>(null);
  const link = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent(
    `"${quote?.content}" ${quote?.author}`
  )}`;

  const getRandomQuote = async (): Promise<void> => {
    if (textRef.current) {
      textRef.current.style.opacity = "0";
      await sleep(250);
    }

    const res = await fetch("https://api.quotable.io/random");
    const quote = await res.json();

    setQuote((prev) => quote);

    if (textRef.current) {
      textRef.current.style.opacity = "1";
    }
  };

  useEffect(() => {
    setColor((prev) => `#${Math.floor(Math.random() * 16777215).toString(16)}`);
  }, [quote]);

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <main style={{ background: color, color: color }} className="App">
      <figure id="quote-box">
        <blockquote ref={textRef} id="quote-text">
          <p id="text">
            <FaQuoteLeft />
            &nbsp;
            {quote && quote.content}
          </p>
        </blockquote>
        <figcaption id="author">{quote && `- ${quote.author}`}</figcaption>
        <div id="buttons">
          <a
            style={{ background: color }}
            href={link}
            target="_blank"
            id="tweet-quote"
          >
            <FaTwitter />
          </a>
          <button
            onClick={getRandomQuote}
            style={{ background: color }}
            id="new-quote"
          >
            New quote
          </button>
        </div>
      </figure>
    </main>
  );
};

export default App;
