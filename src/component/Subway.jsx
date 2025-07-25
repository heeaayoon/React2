import sarea from '../db/sarea.json'
import TailSelect from '../ui/TailSelect';
import SubwayBox from './SubwayBox';
import { useRef, useState, useEffect } from 'react'

export default function Subway() {
  
    const [tdata, setTdata] = useState([]); //전체 데이터
    const sRef = useRef(); //변경(선택)할 부분
    const sareaCode = sarea.map(item=>item["코드"]) //원래의 <TailSelect> 를 쓰기 위해
    const sareaArea = sarea.map(item=>item["측정소"])

    //데이터 패치하기 
    const getFetchData = async()=>{
        //날짜를 YYYYMMDD 형식으로 받아오기 //->>> 날짜 선택할 수 있도록 수정해보기 
        const today = new Date().toISOString().slice(0,10).replaceAll("-",""); //오늘 날짜

        //->>> 페이지네이션 추가하기
        const baseUrl = 'https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?'
        let url = `${baseUrl}serviceKey=${import.meta.env.VITE_DATA_API}&pageNo=1&numOfRows=12&resultType=json&controlnumber=${today}&areaIndex=${sRef.current.value}`; //시간대별로 24개 데이터가 나옴 -> numOfRows=24 로 수정해서 데이터 받아오기
        //console.log(url) //url이 제대로 만들어졌는지 확인

        const resp = await fetch(url); 
        const data = await resp.json(); 
        const items = data.response.body.items.item;
        const sortedData = items.slice().sort((a, b) => { // 'controlnumber'를 기준으로 시간순(오름차순)으로 정렬
            return a.controlnumber - b.controlnumber;
        });
        // 정렬된 데이터로 상태 업데이트
        setTdata(sortedData);
    }
    console.log(tdata); //시간순으로 정렬된 데이터가 잘 들어왔는지 확인

    const handleS = () =>{
      console.log("선택된 ref 값:", sRef.current.value) //선택한 측정소 확인 -> string 타입
      getFetchData(); //여기서 선택한 측정소 번호로 패치하기
      }

  return (
    <div className='w-full flex flex-col'>
      <div className='flex gap-20'>
        <div className='mr-10 border-4 border-indigo-100 rounded-3xl text-xl font-bold p-2'>측정소 선택</div>
        <TailSelect selRef = {sRef}
                    handleSel = {handleS} //select 박스에 변화가 생기면(option이 선택되면) -> handleS 함수가 실행됨
                    defaultOp = "---측정소 선택---"       
                    opv = {sareaCode}
                    opt = {sareaArea} />
      </div>
      <div className='w-full flex flex-col mt-10 gap-4'>
        {tdata.map((item,idx) => <SubwayBox key={item.controlnumber}
                                            idx = {idx}
                                            item = {item} />)}
      </div>
    </div>
  )
}