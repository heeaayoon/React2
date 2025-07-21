import reactLogo from '../assets/react.svg'
import { Link } from 'react-router-dom'
import { useAtom } from 'jotai'
import { isLogin } from "../atoms/IsLoginAtom" 

export default function Nav() {

    const [login, setLogin] = useAtom(isLogin); //useAtom훅은 useState와 비슷하게 사용됨


  return (
    <header className = "w-full min-h-20 bg-indigo-300 flex justify-between items-center">
        <div className="flex ml-10">
            <img src={reactLogo} alt = "react"/> + 
            <img src='/vite.svg' alt = "vite"/>
        </div>
        <div className='text-2xl font-bold '>
            <ul className='flex justify-center items-center'>
            <Link to = "/"><li className='px-2 hover:bg-indigo-500 hover:rounded-3xl hover:text-indigo-50 p-2'>홈으로</li></Link> 
            {login && <Link to = "/subway"><li className='px-2 hover:bg-indigo-500 hover:rounded-3xl hover:text-indigo-50 p-2'>지하철 대기정보</li></Link>}
            </ul>
        </div>
        <div className='mr-10 border-4 border-indigo-100 rounded-3xl text-xl font-bold p-2'>
            {login ? <span className='hover:cursor-pointer' 
                            onClick={()=>setLogin(false)}>로그아웃</span> : "로그인" } 
        </div>
    </header>
  )
}
