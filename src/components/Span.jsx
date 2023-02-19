export default function Span({name, icon}) {
    return (
        <div className="flex items-center gap-1 bg-[#64748B] text-[#F1F5F9] text-xs rounded px-2 py-1">
            <span className="">{name}</span>
            <span className="">
              <img className="" src={icon} />
            </span>
          </div>
    )
}
