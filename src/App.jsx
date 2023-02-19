import { useState, useEffect, useRef } from "react";
import logo from "./assets/logo.svg";
import morphLines from "./assets/morph-lines.svg";
import cornerDownLeft from "./assets/corner-down-left.svg";
import blockquote from "./assets/blockquote.svg";
import book from "./assets/book.svg";
import language from "./assets/language.svg";
import moodKid from "./assets/mood-kid.svg";
import questionMark from "./assets/question-mark.svg";
import quote from "./assets/quote.svg";
import volume from "./assets/volume.svg";
import wand from "./assets/wand.svg";
import firefox from "./assets/firefox.svg";
import chrome from "./assets/chrome.svg";
import text from "./lorem-ipsum";

import Span from "./components/Span";
import HelperButtons from "./components/HelperButtons";
import ExtensionButton from "./components/ExtensionButton";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState(text);
  const [responses, setResponses] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const pRef = useRef();

  const handleCopy = () => {
    const text = pRef.current.textContent;
    navigator.clipboard.writeText(text);
  };

  const streamData = () => {
    setData("");
    let eventSource,
      response = "";
    eventSource = new EventSource(
      "https://take-home-endpoints-yak3s7dv3a-el.a.run.app/sse"
    );

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      const text = parsedData.choices[0].text;
      response += text;
      setData((prevData) => prevData + text);

      if (parsedData.choices[0].finish_reason === "stop") {
        setResponses([...responses, response]);
        setCurrentIdx((currentIdx) => currentIdx + 1);
        eventSource.close();
      }
    };
  };

  const handleRefresh = () => {
    if (input.length) {
      streamData();
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && input.length) {
      streamData();
    }
  };

  const handlePrev = () => {
    setCurrentIdx(currentIdx - 1);
    console.log(responses[currentIdx - 1], currentIdx);
    setData(responses[currentIdx - 1]);
  };

  const handleNext = () => {
    setCurrentIdx(currentIdx + 1);
    console.log(responses[currentIdx - 1], currentIdx);
    setData(responses[currentIdx - 1]);
  };

  return (
    <div className="w-full h-full md:px-[20%] px-5">
      <img
        className="absolute mx-auto left-0 w-[100vw]  h-auto -z-10"
        src={morphLines}
        alt="Morph Lines"
      />
      <div className=" flex flex-col items-center justify-center">
        <div className="m-auto flex flex-col items-center lg:mt-44 mt-12">
          <img className="lg:w-64 my-6" src={logo} alt="Merlin Logo" />
          <p className="text-white font-medium md:text-lg text-sm w-2/3 text-center">
            Unleash the power of creativity with Merlin, the ultimate tool for
            marketers! Say goodbye
          </p>
        </div>
      </div>

      <div className="flex font-medium placeholder:text-[#64748B] py-3 px-[18px] bg-[#1E293B] grad justify-between mt-16">
        <input
          type="text"
          placeholder="Ask Merlin"
          className="font-medium placeholder:text-[#64748B] text-[#64748B] bg-transparent outline-none w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleEnter}
        />
        <div className="">
          <img src={cornerDownLeft} />
        </div>
      </div>

      <section className="flex flex-col items-center justify-center md:m-4 m-2  gap-3">
        <p className="text-xs text-[#94A3B8]">Frequently Commands</p>
        <div className="flex flex-row flex-wrap gap-2 justify-center">
          <Span name="Grammar" icon={book} />
          <Span name="Summarize" icon={quote} />
          <Span name="Expand" icon={blockquote} />
          <Span name="Improve" icon={wand} />
          <Span name="Paraphrase" icon={volume} />
          <Span name="Simplify" icon={moodKid} />
          <Span name="Explain" icon={questionMark} />
          <Span name="Translate" icon={language} />
        </div>
      </section>

      <section className="flex items-center justify-center mt-16 w-full">
        <div className="flex flex-col border-[1px] border-[#334155] rounded-2xl w-full">
          <div className="flex justify-between border-b-[1px] border-[#334155] w-full p-2 pl-4">
            <p className="text-[#F8FAFC] font-bold text-lg ">Merlin Says:</p>
            <HelperButtons
              currentIdx={currentIdx}
              responses={responses}
              handlePrev={handlePrev}
              handleNext={handleNext}
              handleRefresh={handleRefresh}
              handleCopy={handleCopy}
            />
          </div>
          <div className="overflow-hidden pr-4 py-4">
            <p
              ref={pRef}
              className="text-[#FAFAF9] rounded-xl p-4 h-[223px] overflow-y-auto w-full"
            >
              {data}
            </p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center gap-4 m-6 mb-64">
        <ExtensionButton imgSrc={chrome} browser="Chrome" />
        <ExtensionButton imgSrc={firefox} browser="Firefox" />
      </section>
    </div>
  );
}

export default App;
