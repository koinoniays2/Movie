import { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

export default function Movie() {
  const [lists, setLists] = useState([]);
  let tabs = [
    { id: "now_playing", label: "상영중" },
    { id: "top_rated", label: "평점순" },
    { id: "upcoming", label: "개봉예정" },
  ];
  //클릭 시 url 주소 내용 변경(기본값은 all)
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  // API 요청
  useEffect(() => {
    const url = `https://api.themoviedb.org/3/movie/${activeTab}?language=ko-KR&page=1`;
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
        setLists(json?.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [activeTab]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className="w-full flex justify-center">
      <div className="w-[1300px] pt-10">
        {/* 타이틀 */}
        <div className="flex">
          <h2 className="px-4 font-bold text-[24px] text-[#823f12]">Movie</h2>
          {/* 탭바 */}
          <div className="border-2 border-[#823f12] rounded-full">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => { setActiveTab(tab.id); }}
                className={`${activeTab === tab.id ? "text-[#fcd985]" : "text-[#823f12]"}
                relative rounded-full px-6 py-2 text-xl font-semibold`}>
                {activeTab === tab.id && (
                <motion.span layoutId="movie-bubble" transition={{type: "spring", bounce: 0.1, duration: 0.5}}
                className="absolute top-0 left-0 w-full h-full bg-[#823f12] rounded-full -z-10" />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* 리스트 */}
        <div className="w-full h-[30vh] pt-9">
          <Slider {...settings}>
            {lists.map((item, index) => (
              <article key={index} className="w-full flex justify-center">
                <div className="flex flex-col items-center px-2">
                  <Link to={{pathname: `/detail/${item.id}`, state: { movieId: item.id }}}>
                    <img className=""
                    src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`}
                    alt="이미지"
                  /></Link>
                  <p className="font-bold text-center text-[1rem]">{item.title}</p>
                  <p className="text-ml text-gray-500"><b>개봉일</b> : {item.release_date}</p>
                </div>
              </article>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
