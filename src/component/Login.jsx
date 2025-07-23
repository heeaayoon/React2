import { useRef } from "react"
import { isLogin } from "../atoms/IsLoginAtom";
import { useAtom } from "jotai";

export default function Login() {
    const emailRef = useRef(); //폼에서 작성되는 값을 가져올 수 있음
    const pwRef = useRef();

    const [login,setLogin] = useAtom(isLogin); //로그인버튼을 눌렀을 때 사용할 예정

    const handleLogin = (e) =>{
        e.preventDefault();

        if(emailRef.current.value==""){
            alert("이메일을 입력하세요");
            emailRef.current.focus();
            return;
        }
        if(pwRef.current.value==""){
            alert("비밀번호를 입력하세요");
            pwRef.current.focus();
            return;
        }

        if(emailRef.current.value!="hee@gmail.com"){
            alert("이메일을 잘못 입력했습니다."); //백엔드에서 보낸 응답을 이용해서 작성해야할 부분임
            return;
        }

        if(pwRef.current.value!="1234"){
            alert("비밀번호가 일치하지 않습니다."); //백엔드에서 보낸 응답을 이용해서 작성해야할 부분임
            return;
        }

        localStorage.setItem("email",emailRef.current.value) //로그인하면 localStorage에 기록(키, value)
        setLogin(true) //맞는 이메일, 비밀번호를 입력했을 때 login(isLogin을 이름 바꿔서 사용) 전역변수의 상태를 바꿔줌
    }

    return (
        <div className="min-h-full w-screen flex justify-center items-center p-4">
            {/* 그라데이션 테두리 효과를 위한 바깥쪽 div */}
            {/* 안쪽 div와 바깥쪽 div의 padding 차이로 테두리를 만듭니다. */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-1">
                {/* 실제 로그인 폼이 들어가는 흰색 카드 div */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        LOGIN 
                    </h1>
                    {/* space-y-6: 자식 요소들 사이에 균일한 수직 간격을 줍니다. */}
                    <form className="space-y-6">
                        {/* Email 입력 div */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input  ref={emailRef}
                                    id="email"
                                    type="email"
                                    className="w-full rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="your@email.com"  required />
                        </div>
                        {/* Password 입력 div */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input  ref={pwRef}
                                    id="password"
                                    type="password"
                                    className="w-full rounded-lg border border-gray-300 p-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    placeholder="Password"  required />
                        </div>
                        {/* 비밀번호 찾기 링크 (오른쪽 정렬) */}
                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        {/* 로그인 버튼 */}
                        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg
                               hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                               onClick={handleLogin} >
                            LOG IN
                        </button>
                    </form>

                    {/* 회원가입 링크
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            Don't have an account?
                            <a href="#" className="font-semibold text-blue-500 hover:underline ml-1">
                                Sign Up
                            </a>
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
