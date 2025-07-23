import sarea from '../db/sarea.json'
import scode from '../db/scode.json'
import TailSelect from '../ui/TailSelect2'
import { useRef, useState, useEffect } from 'react'

export default function Subway() {
    const sRef = useRef(); //변경(선택)할 부분

    const [tdata, setTdata] = useState([]); //전체 데이터
    const [headerTag, setHeaderTag] = useState([]); //화면에 변경되면서 출력될 내용 //테이블 헤더
    const [bodyTag, setBodyTag] = useState([]); //화면에 변경되면서 출력될 내용 //테이블 바디
    //https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?serviceKey=%2BDfR5vwd9zvwFHbjCUyNLBbgz8fZB10VqCKEzRJ5U3JyXCq8p78agCH5sd5ZF62Jgg5ma2pmDXPUnD%2FBzoT%2Fhg%3D%3D&pageNo=1&numOfRows=12&resultType=json&controlnumber=20250723&areaIndex=201193
    //데이터 패치하기 
    const getFetchData = async(aIndex)=>{
        //날짜를 YYYYMMDD 형식으로 받아오기
        // const today = new Date();
        // const yyyy = today.getFullYear();
        // const mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
        // const dd = String(today.getDate()).padStart(2, '0');
        // const todayString = `${yyyy}${mm}${dd}`;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1); // 날짜를 하루 전으로 설정
        const yyyy = yesterday.getFullYear();
        const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
        const dd = String(yesterday.getDate()).padStart(2, '0');
        const yesterdayString = `${yyyy}${mm}${dd}`;

        //페이지네이션 추가하기
        const baseUrl = 'https://apis.data.go.kr/6260000/IndoorAirQuality/getIndoorAirQualityByStation?'
        let url = `${baseUrl}serviceKey=${import.meta.env.VITE_DATA_API}&pageNo=1&numOfRows=1000&resultType=json&controlnumber=${yesterdayString}`;
        if (aIndex) {
            url += `&areaIndex=${aIndex}`;
        }
        //console.log(url) //url이 제대로 만들어졌는지 확인

        const resp = await fetch(url); 
        const data = await resp.json(); 
        //console.log(data) //url 내부 데이터 전부
        setTdata(data.response.body.items.item); //필요한 데이터만 tdata에 업데이트 
        //console.log(data.response.body.items.item);
    }
    //console.log(tdata); //필요한 데이터가 잘 들어왔는지 확인

    //처음에 데이터 패치하기
    useEffect(()=>{
      getFetchData();
      // if (sRef.current.value=="")
      //   return; 
    },[])


    const handleS = () =>{
      console.log("선택된 ref 값:", sRef.current.value) //선택한 측정소 확인 -> string 타입임
      
      //옵션에서 선택한 항목의 데이터만 가져오기 위한 작업 -> 여기서 areaIndex가 sarea 에 해당하는 값만 가져오기
      const tm = tdata.filter(item => item['areaIndex']==parseInt(sRef.current.value)) //sRef값과 동일한 데이터만 filter
      //console.log(tm)
      
      //scode의 key값을 기준으로 map을 돌려서 화면에 출력할 내용을 받아오기
      const dataz = tm[0]; //첫 번째 데이터 사용 ----> 나중에 시간별로 12개 받는걸로 수정

      //scode의 키 목록을 가져오기
      const keys = Object.keys(scode);
      console.log("scode의 키 목록",keys) //-> 배열임 
      // 헤더<th> 태그 생성
      const headerTags = keys.map(key => (
          <th key={key} scope="col" className="px-3 py-2 border border-gray-300">
              {scode[key].name}<br/>({key})
          </th>
      ));

      // 본문(<td>) 태그 생성
      const bodyTags = keys.map(key => (
          <td key={key} className="px-3 py-2 border border-gray-300">
              {dataz[key]}{dataz[key]=="-"?"":scode[key].unit}
          </td>
      ));

      // 각각의 state에 업데이트
      setHeaderTag(headerTags);
      setBodyTag(bodyTags);
      }

  return (
    <div className='w-full flex flex-col justify-center items-center'>
      <div className='flex gap-20'>
        <div className='mr-10 border-4 border-indigo-100 rounded-3xl text-xl font-bold p-2'>측정소 선택</div>
        <TailSelect selRef = {sRef}
                    handleSel = {handleS} //select 박스에 변화가 생기면(option이 선택되면) -> handleS 함수가 실행됨
                    defaultOp = "---측정소 선택---"
                    options={sarea}        
                    v1="코드"       
                    v2="측정소"/>
      </div>
      <div className='w-9/10 flex flex-col justify-center items-center'>
        <table className="mt-10 w-full">
                    <thead className="text-xs text-gray-700 bg-gray-50">
                        <tr className='bg-indigo-400'>
                          {headerTag}
                        </tr>
                    </thead>
                    <tbody className='text-sm text-left rtl:text-right text-gray-500'>
                        <tr>
                          {bodyTag}
                        </tr>
                    </tbody>
        </table>
      </div>
    </div>
  )
}