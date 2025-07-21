import React from 'react'

export default function Login() {
    return (
        <div className="min-h-screen w-screen flex justify-center items-center p-4">
            {/* 그라데이션 테두리 효과를 위한 바깥쪽 div */}
            {/* 안쪽 div와 바깥쪽 div의 padding 차이로 테두리를 만듭니다. */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl p-1">
                {/* 실제 로그인 폼이 들어가는 흰색 카드 div */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                        Log in </h1>
                    {/* space-y-6: 자식 요소들 사이에 균일한 수직 간격을 줍니다. */}
                    <form action="#" method="post" className="space-y-6">

                        {/* Email 입력 그룹 */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                                id="email"
                                className="w-full rounded-lg border border-gray-300 p-3 text-base
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                type="email"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        {/* Password 입력 그룹 */}
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                id="password"
                                className="w-full rounded-lg border border-gray-300 p-3 text-base
                                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>

                        {/* 비밀번호 찾기 링크 (오른쪽 정렬) */}
                        <div className="text-right">
                            <a href="#" className="text-sm text-blue-500 hover:underline">
                                Forgot your password?
                            </a>
                        </div>

                        {/* 로그인 버튼 */}
                        <button
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 rounded-lg
                               hover:from-purple-500 hover:to-blue-500 hover:scale-105 transition-all duration-300 ease-in-out
                               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                            type="submit"
                        >
                            LOG IN
                        </button>
                    </form>

                    {/* 회원가입 링크 */}
                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p>
                            Don't have an account?
                            <a href="#" className="font-semibold text-blue-500 hover:underline ml-1">
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
