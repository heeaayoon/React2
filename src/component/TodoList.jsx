import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from "axios";
import { useEffect, useRef, useState } from "react";
export default function TodoList() {
    
    const [tdata, setTdata] = useState([]); //전체 데이터

    const url = 'http://localhost:3005/todos';
    const getData = async()=>{
        const {data} = await axios.get(url) ; //axios 사용해서 패치하기
        setTdata(data); //필요한 데이터만 tdata에 업데이트 
    }

    //추가
    const addTodo=async(text,completed)=>{
        let postData = {
            "text": text,
            "completed": completed
        }
        await axios.post(url, postData) ;
        getData();
    }

    //처음에 데이터 패치
    useEffect(()=>{
        getData();
    },[]) 

  return (
    <div className="w-9/10 flex flex-col">
        <TodoForm addTodo={addTodo}/>
        {tdata&&tdata.map(item=><TodoItem key={item.id}
                                          item = {item}/>)}
    </div>
  )
}
