
export default function TailCard({imgUrl, title, sub, searchKeyword}) {
    let tag;
    if(searchKeyword.includes(',')){ //searchKeyword가 ,로 구분되어 있는 경우 -> split으로 , 해체하고 map해서 갯수만큼 span 태그 생성
        tag = searchKeyword.split(',');
        tag = tag.map(item => <span key = {item} className="bg-gray-100 p-1 m-1 rounded-2xl">{item} </span>)
        console.log(tag)
    } else{ //searchKeyword가 구분되어 있지 않은 경우(1개인 경우)
        tag = <span className='rounded-2xl bg-gray-100'>{searchKeyword}</span>
    }

  return (
    <div className="max-w-lg bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="w-full h-48">
            <img className="rounded-t-lg object-cover w-full h-full" src={imgUrl} alt={title} />
        </div>
        <div className="p-5 flex flex-col justify-start items-start">
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{title}</h1>
            <div className="w-full mb-3 font-normal text-gray-700 truncate text-left">{sub}</div>
            <div className="mt-5">
                {tag}
            </div>
        </div>
    </div>

  )
}
