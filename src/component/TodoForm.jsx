import TailButton from "../ui/TailButton"
import { useEffect, useRef, useState } from "react";

export default function TodoForm({addTodo}) {
    const cRef = useRef(); //변경(선택)할 부분 : select
    const tRef = useRef(); //가져올 부분 : text

    
    const handleInput= (e)=>{
        e.preventDefault() ;
        if(tRef.current.value == ""){ //값이 없는 경우에는 경고창 띄우기
            alert("할 일을 입력하세요");
            tRef.current.focus();
            return;
        }    
        addTodo(tRef.current.value, cRef.current.value)
        handleCancel();
    }
        
   const handleCancel=()=>{
        tRef.current.value==""
        tRef.current.focus();
        cRef.current.value=="X"
    }

    //맨 처음에 text작성하는 input 부분으로 커서 가도록
    useEffect(()=>{
       tRef.current.focus();
    },[])    
    
  return (
    <div className="w-full bg-indigo-100 p-4">
        <div className="flex justify-center text-3xl font-bold mb-5">
            Todo List
        </div>
        <form className="w-full bg-indigo-100 grid grid-cols-5 gap-4">
            <select name = "completed" id = "completed" 
                    ref={cRef}
                    className="bg-indigo-50 border-2 border-gray-100 rounded-2xl">
                <option value = "X">X</option>
                <option value = "O">O</option>
            </select>
            <input  type="text" 
                    ref={tRef}
                    className="bg-indigo-50 border-2 border-gray-100 rounded-2xl col-span-2"
                    placeholder="  할 일을 입력하세요." />
            <TailButton caption="확인"
                        color="blue" 
                        onHandle = {handleInput}/>
            <TailButton caption="취소"
                        color="orange" 
                        onHandle = {handleCancel}/>
        </form>
    </div>
  )
}
