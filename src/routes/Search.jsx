import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import LinesEllipsis from "react-lines-ellipsis";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const location = useLocation(); // 현재 URL의 정보를 가져온다.
  // location 객체 : 현재 경로 (pathname), 쿼리 매개변수 (search), 해시 (hash), 상태 (state), 그리고 다양한 다른 URL 관련 정보가 들어 있음
  // console.log(location.search); navigate에 넣은 쿼리 정보(?keyword=${keyword})가 나옴
  const search = new URLSearchParams(location.search); // ?keyword=${keyword}을 넣는다.
  // RLSearchParams 객체 : URL의 쿼리 매개변수를 다룰 수 있는 객체, 쿼리 문자열에서 특정 매개변수를 추출하거나, 매개변수를 추가, 제거, 수정하는 등의 작업 가능
  const keyword = search.get("keyword"); // 객체로부터 navigate에서 설정했던 keyword쿼리 값을 가져옴
  // console.log(search);
  // console.log(keyword);
  
  // 인풋박스 검색
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState();
  const handleClick = () => {
    // Link to={`/detail/${item.id}` 경로로 전달하는 방법 대신 쿼리로 전달하는 방법
    navigate(`/search?keyword=${searchKeyword}`);
  }
  const handleChange = (e) => {
    setSearchKeyword(e.target.value); // input에서 검색어를 받아준다
  }
  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };
  // API
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ko-KR&page=1`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWNhODU3NDBjOWVlYzc4ZTU1ZTQ2NDA1MWE4NTRjNiIsInN1YiI6IjY1OWNhMTg3NTVjMWY0MDFhNDZlMzMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7UIZD9fGetrKMwieqk-VeRqr2hl3tDlLO_VwMHDvC4",
      },
    };
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [keyword]);
  return (
    <Layout>
      <div className="w-full flex flex-col items-center">
        <div className="w-full border-b flex justify-center">
            <div className="text-black p-3">
                    <FaSearch />
            </div>
            <input className="w-[1200px] py-2 outline-none" type="text" placeholder={keyword}
            onChange={handleChange} onKeyDown={handleEnterKeyPress}/>
        </div>
        <div className="w-[1200px]">
          {/* 영화 블럭 */}
          {data?.map((item) => (
            <div key={item?.id} className="flex my-4 border-2 rounded-2xl overflow-hidden"
            style={{ boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.1)'}}>
              {/* 이미지 부분 */}
              <div className="">
                <img className="h-[150px] overflow-hidden"
                src={`https://image.tmdb.org/t/p/original${item?.poster_path}`} alt={`${item?.title}`} />
              </div>
              {/* 설명 부분 */}
              <div className="w-[70%] h-[150px] px-4 flex flex-col justify-center">
                <h3 className="text-lg font-bold">{item?.title}</h3>
                <p className="mb-3 text-sm text-gray-500">{item?.release_date}</p>
                <LinesEllipsis
                    text={item?.overview}
                    maxLine="3"
                    ellipsis="..."
                    trimRight
                    basedOn="letters" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
