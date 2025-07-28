import TailButton from "../ui/TailButton"

export default function TodoItem({item}) {

  return (
    <div className='flex justify-between
                    border-2 border-gray-200 rounded-2xl
                    px-5 py-1 my-2'>
      <div>
        <div>{item.text}</div>
      </div>
      <TailButton caption="삭제"
                  color="orange"
                  onHandle={()=>{}} />
    </div>
  )
}
