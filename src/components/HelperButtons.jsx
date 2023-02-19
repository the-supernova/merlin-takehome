import HelperButton from "./HelperButton";
import ArrowButton from "./ArrowButton";

import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import refresh from "../assets/refresh.svg";
import copy from "../assets/copy.svg";

export default function HelperButtons({
  currentIdx,
  responses,
  handlePrev,
  handleNext,
  handleRefresh,
  handleCopy,
}) {
  return (
    <div className="flex gap-2">
      {responses.length > 0 && (
        <>
          <p className="text-[#F8FAFC]">
            {currentIdx} / {responses.length}
          </p>
          <div className="flex">
            <ArrowButton
              handleFun={handlePrev}
              imgSrc={arrowLeft}
              isLeft={true}
              currentIdx={currentIdx}
              responses={responses}
            />
            <ArrowButton
              handleFun={handleNext}
              imgSrc={arrowRight}
              isLeft={false}
              currentIdx={currentIdx}
              responses={responses}
            />
          </div>
        </>
      )}
      <HelperButton handleFun={handleRefresh} imgSrc={refresh} />
      <HelperButton handleFun={handleCopy} imgSrc={copy} />
    </div>
  );
}
