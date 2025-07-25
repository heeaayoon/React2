import scode from '../db/scode.json'


export default function SubwayBox({item}) {

    //scode의 키 목록을 가져오기
    const keys = Object.keys(scode);
    //console.log("scode의 키 목록", keys) //-> 배열임
    
    //tdata 배열 중 하나씩(item) 가져와서 화면에 그리기
    const tags = keys.map(key => (
        <div key={key} className='flex flex-col text-center border-r last:border-r-0 min-w-[80px]'>
            <div className="px-3 py-2 bg-amber-50 font-semibold text-sm">
              {scode[key].name}<br/>({key})
            </div>
            <div className="px-3 py-2 flex-grow flex items-center justify-center">
                {item[key]}{item[key]=="-"?"":scode[key].unit}
            </div>
        </div>
      ));

  return (
    <div className='flex flex-col'>
       {tags}
    </div>
  )
}
