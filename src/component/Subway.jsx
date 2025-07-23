import sarea from '../db/sarea.json'
import scode from '../db/scode.json'
import TailSelect from '../ui/TailSelect2'
import { useRef, useState, useEffect } from 'react'

export default function Subway() {
    const sRef = useRef(); //변경(선택)할 부분

    const [tdata, setTdata] = useState([]); //전체 데이터
    const [tag, setTag] = useState([]);//화면에 변경되면서 출력될 내용

    //https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?serviceKey=%2BDfR5vwd9zvwFHbjCUyNLBbgz8fZB10VqCKEzRJ5U3JyXCq8p78agCH5sd5ZF62Jgg5ma2pmDXPUnD%2FBzoT%2Fhg%3D%3D&pageNo=1&numOfRows=12&resultType=json&controlnumber=20250723&areaIndex=201193
    //데이터 패치하기 
    const getFetchData = async()=>{
        const baseUrl = 'https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?'
        let url = `${baseUrl}serviceKey=${import.meta.env.VITE_DATA_API}&pageNo=1&numOfRows=12&resultType=json&controlnumber=20250723&areaIndex=201193`;
        
        console.log(url) //url이 제대로 만들어졌는지 확인
        const resp = await fetch(url); 
        const data = await resp.json(); 
        //console.log(data) //url 내부 데이터 전부
        setTdata(data.response.body.items.item); //필요한 데이터만 tdata에 업데이트 
        console.log(data.response.body.items.item);
    }
    //console.log(tdata); //필요한 데이터가 잘 들어왔는지 확인

    //처음에 데이터 패치하기
    useEffect(()=>{
        getFetchData();
    },[])


    const handleS = () =>{
      console.log(sRef.current.value) //선택한 측정소 확인 
      // console.log(scode)
      // console.log(scode.co.name)
      //옵션에서 선택한 항목의 데이터만 가져오기 위한 작업 -> 여기서 areaIndex가 sarea 에 해당하는 값만 가져오기
      let tm = tdata.filter(item => item['areaIndex']==sRef.current.value) //sRef값과 동일한 데이터만 filter
      console.log(tm)
      tm = tm.map(item => (
          <tr className= "bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 hover:text-black hover:cursor-pointer"
              key = {item.fcstDate+item.fcstTime+item.category}>
                  <td scope="row" className="flex justify-center items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {`${unitItem["항목명"]}(${unitItem["항목값"]})`}
                  </td>
                  <td className="px-6 py-4 text-center">
                      {item.fcstDate}
                  </td>
                  <td className="px-6 py-4 text-center">
                      {item.fcstTime}
                  </td>
          </tr>
      ))
      setTag(tm);
  }


  return (
    <div>
      <div className='flex'>
        <p>측정소 선택</p>
        <TailSelect selRef = {sRef}
                    handleSel = {handleS} //select 박스에 변화가 생기면(option이 선택되면) -> handleS 함수가 실행됨
                    defaultOp = "---측정소 선택---"
                    opv = {sarea.코드}
                    opt = {sarea.측정소}/>
      </div>
      <div>
        <table className="mt-10 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
      </div>
    </div>
  )
}
