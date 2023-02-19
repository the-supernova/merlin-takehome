export default function ArrowButton({handleFun, imgSrc, currentIdx, responses, isLeft}) {
  return (
    <button
      className={`bg-[#334155] p-1 ${isLeft ? "rounded-l-lg" : "rounded-r-lg"} `}
      onClick={handleFun}
      disabled={isLeft? currentIdx <= 1 : currentIdx === responses.length}
    >
      <img src={imgSrc} />
    </button>
  );
}
