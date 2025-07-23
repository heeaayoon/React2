export default function TailSelect({selRef, handleSel, defaultOp, options, v1, v2 }) {

  return (
    <div>
        <select defaultValue=""
                ref = {selRef} //값을 가져와야하니까 Ref 이용
                onChange={handleSel} //select 박스에 변화가 생기면(option이 선택되면) -> handleSel 함수가 실행됨
                className="bg-gray-50 border mx-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">  
                
                <option>{defaultOp}</option> 
                {
                    options.map((item) => <option key = {item[v1]} 
                                              value={item[v1]}>{item[v2]}</option>)
                }
        </select >
    </div>
  )
}
