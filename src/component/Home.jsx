import { useAtom } from "jotai"
import { isLogin } from "../atoms/IsLoginAtom"
import Login from "./Login"

export default function Home() {
    const [login, setLogin] = useAtom(isLogin);
    const email = localStorage.getItem("email");
    
  return (
    <div>
      {login ? <h1 className="font-bold">
                  {email} 님 로그인 되었습니다.
               </h1>
               :<Login />}
    </div>
  )
}
