import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function SearchPage() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState();

  const handleClick = () => {
    // Link to={`/detail/${item.id}` 경로로 전달하는 방법 대신 쿼리로 전달하는 방법
    navigate(`/search?keyword=${keyword}`);
  }
  const handleChange = (e) => {
    setKeyword(e.target.value); // input에서 검색어를 받아준다
  }
  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };
  return (
    <div className='w-full flex justify-center'>
      {/* 이미지 div */}
      <div className="relative w-[1300px] h-[300px] bg-center bg-cover flex px-12 py-12 
      bg-[url('https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2056&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
        {/* 컨테이너: 텍스트 + 인풋박스 */}
        <div className="z-10 w-full h-full text-[#f6f6f6] flex flex-col justify-between">
          {/* 텍스트 */}
          <div className="-space-y-4">
            <h1 className="text-[48px] text-[#f6f6f6] font-bold">Welcome, CINEMA</h1>
            <h2 className='text-[32px] text-[#f6f6f6] font-semibold'>Millions of movies, TV shows and people to discover. Explore now.</h2>
          </div>
          {/* 인풋박스 */}
          <div className="relative" onKeyDown={handleEnterKeyPress}>
            <input onChange={handleChange}
            className="w-full py-3 px-4 text-gray-900 outline-none rounded-3xl" type="text" placeholder="Search for movie, TV show, person ..." />
            <button onClick={handleClick}
            className="absolute right-0 text-[#b07d3e] bg-[#fcd985] py-3 px-6 rounded-3xl font-bold 
            hover:text-[#823f12]">Search</button>
          </div>
        </div>
        <div></div>

        {/* absolute 가상 div */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#000]/60"></div>
      </div>
      
    </div>
  )
}
