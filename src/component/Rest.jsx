import { useRef, useState, useEffect } from 'react'
import axios from 'axios';
import TailButton from "../ui/TailButton"

export default function Rest() {

    const [tdata, setTdata] = useState([]); //전체 데이터
    
    const url = 'http://localhost:3005/posts';
    const getFetchData = async()=>{
        // const resp = await fetch(url); 
        // const data = await resp.json(); 
        const {data} = await axios.get(url) ; //axios 사용해서 패치하기
        setTdata(data); //필요한 데이터만 tdata에 업데이트 
    }
    //console.log(tdata);

    //add(post)
    const tref = useRef()
    const aref = useRef()
    const handleAdd= async(e)=>{
        e.preventDefault();
        // console.log(tref.current.value);
        // console.log(aref.current.value);
        let postData = {
            "title": tref.current.value,
            "author": aref.current.value
        }
        const {data} = await axios.post(url, postData) ;
        setTdata([data,...tdata]) //추가한 데이터를 가장 위에 출력하기
    }

    //delete
    const handleDel= async(id)=>{
        //e.preventDefault();
        console.log(id);
        await axios.delete(`${url}/${id}`);
        getFetchData();
    }

    //처음에 데이터 패치
    useEffect(()=>{
        getFetchData();
    },[])    

  return (
    <div className='w-9/10 h-full flex flex-col justify-center items-center font-bold'>
        <form>
            <label htmlFor='txt1'> title </label>
            <input type='text' 
                    id="txt1"
                    className='border-2 border-b-blue-950'
                    ref={tref}/>
            <label htmlFor='txt2'> auther </label>
            <input type='text' 
                    id="txt2"
                    className='border-2 border-b-blue-950'
                    ref={aref}/>
        </form>
        <div className='flex'>
            <TailButton caption= "추가"
                        color= "blue"
                        onHandle = {handleAdd} />

            
        </div>
        
        <ul>
            {tdata.map(item=> <li key = {item.id} className='flex'>
                                {item.title}({item.author})
                                <TailButton caption= "삭제"
                                            color= "orange"
                                            onHandle = {()=>handleDel(item.id)} />
                            </li>)}
        </ul>
    </div>
  )
}
