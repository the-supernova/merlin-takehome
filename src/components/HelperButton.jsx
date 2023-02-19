export default function HelperButton({ handleFun,imgSrc }) {
    return (
        <button className="bg-[#334155] rounded-lg p-1" onClick={handleFun}>
            <img src={imgSrc} />
        </button>
    )
}
