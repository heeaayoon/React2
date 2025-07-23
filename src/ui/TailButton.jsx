export default function TailButton({caption, color, onHandle}) {
  const bg = {
    "blue" : "bg-blue-400",
    "orange" : "bg-orange-400",
    "lime" : "bg-lime-400"
  }

  const bghover = {
    "blue" : "hover:bg-blue-100 hover:text-black",
    "orange" : "hover:bg-orange-100",
    "lime" : "hover:bg-lime-100"
  }

  return (
    <div>
      <button className={`p-3 rounded-xl
                       text-white
                        hover:cursor-pointer
                        hover:font-bold
                        mx-2 
                        ${bghover[color]}
                        ${bg[color]}`}
              onClick={onHandle}>
        {caption}
      </button>
    </div>
  )
}
