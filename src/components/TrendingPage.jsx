import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";

export default function TrendingPage() {
    const [lists, setLists] = useState([]);
    let tabs = [
      {id: "all", label: "All"}, //id:패치요청 url에서 바뀔 값, label:탭바 내용 
      {id: "movie", label:"Movies"},
      {id: "tv", label:"TV"}

    ];
    //클릭 시 url 주소 내용 변경(기본값은 all)
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    // API 요청
    useEffect(() => {
    const url =
      `https://api.themoviedb.org/3/trending/${activeTab}/day?language=ko-KR`;
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
        setLists(json?.results); // 요청된 API의 결과 객체가 lists안에 set됨
        // console.log(json.results);
      })
      .catch((err) => console.error("error:" + err));
  }, [activeTab]); //activeTab이 바뀔때 마다 요청

  // 캐러셀
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1300px] pt-10">
        {/* 타이틀 */}
        <div className="flex">
          <h2 className="px-4 font-bold text-[24px] text-[#823f12]">TRENDING</h2>
          {/* 탭바 */}
          <div className="border-2 rounded-full border-[#823f12]">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => {setActiveTab(tab.id)}} // 클릭 시 버튼의 key값을 url주소 변경 값에 set
              className={`${activeTab === tab.id ? "text-[#fcd985]" : "text-[#823f12]"}
                relative rounded-full px-6 py-2 text-xl font-semibold`}>
                {activeTab === tab.id && (
                  <motion.span layoutId="trending-bubble" transition={{type: "spring", bounce: 0.1, duration: 0.5}}
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
                        <Link to={item.media_type === "movie" ? `/detail/${item.id}` : `/detailTV/${item.id}`}>
                          <img className="" src={`https://image.tmdb.org/t/p/w300${item.backdrop_path}`} alt="이미지" /></Link>
                          {item.title ? <p className="font-bold text-center text-[1rem]">{item.title}</p> : <p className="font-bold text-center text-[1rem]">{item.name}</p> }
                          <p className="text-ml text-gray-500">{(item.media_type).toUpperCase()}</p>
                      </div>
                  </article>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
