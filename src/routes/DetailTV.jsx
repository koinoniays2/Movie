import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import { useParams } from "react-router-dom";
import { ClimbingBoxLoader } from "react-spinners";
import Slider from "react-slick";

export default function Detail() {
    const { tvId } = useParams();
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (tvId) {
            const url = `https://api.themoviedb.org/3/tv/${tvId}?language=ko-KR`;
            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWNhODU3NDBjOWVlYzc4ZTU1ZTQ2NDA1MWE4NTRjNiIsInN1YiI6IjY1OWNhMTg3NTVjMWY0MDFhNDZlMzMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7UIZD9fGetrKMwieqk-VeRqr2hl3tDlLO_VwMHDvC4",
                },
            };
            setIsLoading(true);
            fetch(url, options)
                .then((res) => res.json())
                .then((json) => {
                    setLists(json);
                    console.log(json.seasons);
                })
                .catch((err) => console.error("error:" + err));
            setIsLoading(false);
        }
    }, [tvId]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: (lists.seasons || []).length >= 5 ? 5 : (lists.seasons || []).length,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    return (
        <Layout>
            {/* 로딩이미지 */}
            {isLoading ?
                <div className="flex flex-col items-center justify-center py-16">
                    <ClimbingBoxLoader
                        size={20}
                        color="#032541"
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    Loading...
                </div>
                :
                // TV 내용
                <div className="w-full flex flex-col items-center">
                    <article className="w-full h-[600px] flex flex-col items-center">
                        {/* 띠 */}
                        <div className="w-[1300px] px-12 py-3 mt-8 text-2xl font-bold text-[#823f12] bg-[#dde5d6]">
                            <p>TV</p>
                        </div>
                        {/* 소개 컨테이너 */}
                        <div className="relative w-full h-full flex justify-center">
                            {/* 백그라운드 이미지 */}
                            <div className="absolute top-0 left-0 w-full h-full">
                                <img
                                    className="w-full h-full object-cover"
                                    src={lists.backdrop_path ? `https://image.tmdb.org/t/p/original${lists.backdrop_path}` : "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                    alt="backimage"
                                />
                            </div>
                            {/* 필터 이미지 */}
                            <section className="absolute top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center">
                                <div className="w-[1300px] h-full flex">
                                    {/* 포스터 */}
                                    {lists.poster_path && (
                                        <img className="my-5"
                                            src={lists.poster_path ? `https://image.tmdb.org/t/p/original${lists.poster_path}` : "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="포스터" />
                                    )}
                                    {/* TV 제목, 줄거리 */}
                                    <div className="px-3 h-full flex flex-col justify-center space-y-4 text-[#9BB2C0]">
                                        <h1 className="text-3xl font-bold">{lists?.name}</h1>
                                        {lists.first_air_date ? <span>방영시작: {lists?.first_air_date}</span> : ""}
                                        <p className=""><b>장르</b><br />{(lists.genres || []).map((item) => (
                                            <span key={item.id}>{item.name} </span>
                                        ))}</p>
                                        <p><b>줄거리</b><br /> {lists?.overview}</p>
                                        {lists?.homepage ? 
                                        <div>
                                            <b>홈페이지</b>
                                            <p><a href={lists?.homepage} target="_blank" rel="noreferrer">
                                                {lists?.homepage}</a></p>
                                        </div> : ""}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </article>
                    {/* 시즌 */}
                    <article className="w-full h-[700px] flex flex-col items-center overflow-hidden">
                        <div className="w-[1300px] px-12 py-3 my-8 text-2xl font-bold text-[#823f12] bg-[#dde5d6]">
                            <p>시즌</p>
                        </div>
                        <div className="w-full">
                            <Slider {...settings}>
                                {(lists.seasons)?.map((item) => (
                                    <article key={item.id} className="w-full flex justify-center mb-10">
                                        <div className="flex flex-col items-center mb-4">
                                            {item?.poster_path ? (
                                                <img className="mb-4 h-[250px]"
                                                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                                    alt="시즌정보" />
                                            ) : (
                                                <div className="mb-4 w-[200px] h-[250px] bg-gray-300"></div>
                                            )}
                                            {item.name ? <p className="text-center text-ml"><b>{item.name}</b><br /> 방영일 : {item.air_date}</p> 
                                            : <p className="font-bold text-center text-ml">NO SEASONS</p> }
                                            
                                        </div>
                                    </article>
                                ))}
                            </Slider>
                        </div>
                    </article>
                </div>}
        </Layout>
    )
}