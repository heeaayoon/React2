import scode from '../db/scode.json'


export default function SubwayBox({item,idx}) {

    //scode의 키 목록을 가져오기
    const keys = Object.keys(scode);
    //console.log("scode의 키 목록", keys) //-> 배열임
  

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <div>
          {item.site}{item.city}
        </div>
        <div>
          {item.controlnumber.slice(0,4)}년 {item.controlnumber.slice(4,6)}월 {item.controlnumber.slice(6,8)}일 {item.controlnumber.slice(8,10)}시
        </div>
      </div>
      <div className='flex justify-center text-center '>
       {keys.map(key => (
                    <div key={key} className='flex flex-col text-center border-r last:border-r-0 min-w-[80px]'>
                        <div className="px-3 py-2 bg-amber-50 font-semibold text-sm">
                          {scode[key].name}<br/>({key})
                        </div>
                        <div className="px-3 py-2 flex-grow flex items-center justify-center">
                            {item[key]}{item[key]=="-"?"":scode[key].unit}
                        </div>
                    </div>))
        }
      </div>
    </div>
  )
}
