export default function ExtensionButton({imgSrc, browser}) {
  return (
    <button className="flex items-center gap-2 text-[#EDE9FE] text-sm font-semibold grad-button">
      <span className="inline-block">
        <img src={imgSrc} />
      </span>
      Add to {browser}
    </button>
  );
}
