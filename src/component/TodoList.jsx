import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function TodoList() {

    const url = 'http://localhost:3005/todos';
    const [tdata, setTdata] = useState([]); //전체 데이터

    const getData = async()=>{
        const {data} = await axios.get(url) ; //axios 사용해서 패치하기
        console.log(data);
        setTdata(data); //필요한 데이터만 tdata에 업데이트 
    }

    //추가
    const addTodo = async(text,completed)=>{
        console.log("add : ", text,completed) // 데이터가 잘 넘어왔는지 확인
        let postData = {
            "text": text,
            "completed": completed
        }
        await axios.post(url, postData) ;
        getData();
    }   
    
    //수정
    const toggleTodo = async(id,completed)=>{ //현재는 completed만 수정함
        console.log("modify : ", id,completed)
        const done = completed=="X"?"O":"X" //X이면 O를 / O면 X로 수정
        await axios.patch(`${url}/${id}`,{
            "completed": done
        }) ;
        getData();
    }
    
    //삭제
    const delTodo = async(id)=>{ 
        console.log("delete : ", id) 
        await axios.delete(`${url}/${id}`);
        getData();
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div className="w-9/10 flex flex-col">
      <TodoForm addTodo = {addTodo}/>
      {tdata && tdata.map(item=><TodoItem key={item.id}
                                         item = {item}
                                         onToggle = {toggleTodo}
                                         onDelete = {delTodo} />)}
    </div>
  )
}
