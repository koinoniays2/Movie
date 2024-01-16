import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { ClimbingBoxLoader } from "react-spinners";

export default function Detail() {
    const { movieId } = useParams();
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (movieId) {
            const url = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
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
                    // console.log(json);
                })
                .catch((err) => console.error("error:" + err));
                setIsLoading(false);
        }
    }, [movieId]);

    // 출연진
    const [people, setPeople] = useState([]);
    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwOWNhODU3NDBjOWVlYzc4ZTU1ZTQ2NDA1MWE4NTRjNiIsInN1YiI6IjY1OWNhMTg3NTVjMWY0MDFhNDZlMzMxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V7UIZD9fGetrKMwieqk-VeRqr2hl3tDlLO_VwMHDvC4'
            }
        };
        setIsLoading(true);
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setPeople(json.cast);
                // console.log(json.cast)
            })
            .catch(err => console.error('error:' + err));
            setIsLoading(false);
    }, [movieId])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
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
            <div className="w-full flex flex-col items-center">
                <article className="w-full h-[600px] flex flex-col items-center">
                    {/* 띠 */}
                    <div className="w-[1300px] px-12 py-3 mt-8 text-2xl font-bold text-[#823f12] bg-[#dde5d6]">
                        <p>영화소개</p>
                    </div>
                    {/* 소개 컨테이너 */}
                    <div className="relative w-full h-full flex justify-center">
                        {/* 백그라운드 이미지 */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <img
                                className="w-full h-full object-cover"
                                src={lists.poster_path ? `https://image.tmdb.org/t/p/original${lists.poster_path}` : "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }
                                alt="backimage"
                            />
                        </div>
                        {/* 필터 이미지 */}
                        <section className="absolute top-0 left-0 w-full h-full bg-gray-900/80 flex justify-center">
                            <div className="w-[1300px] h-full flex">
                                {/* 포스터 */}
                                {lists.poster_path && (
                                    <img className="w-[20%] object-contain" 
                                    src={lists.backdrop_path ? `https://image.tmdb.org/t/p/original${lists.backdrop_path}` : "https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="포스터" />
                                )}
                                {/* 영화 제목, 줄거리 */}
                                <div className="px-3 h-full flex flex-col justify-center space-y-4 text-[#9BB2C0]">
                                    <h1 className="text-3xl font-bold">{lists.title}</h1>
                                    <span>개봉일: {lists?.release_date}</span>
                                    <p className=""><b>장르</b><br />{(lists.genres || []).map((item) => (
                                        <span key={item.id}>{item.name} </span>
                                    ))}</p>
                                    <p><b>줄거리</b><br /> {lists.overview}</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </article>
                <article className="w-full h-[700px] flex flex-col items-center overflow-hidden">
                    <div className="w-[1300px] px-12 py-3 my-8 text-2xl font-bold text-[#823f12] bg-[#dde5d6]">
                        <p>출연진</p>
                    </div>
                    <div className="w-full h-[600px]">
                    <Slider {...settings}>
                        {people.map((item, index) => (
                            <article key={index} className="w-full flex justify-center mb-10">
                                <div className="flex flex-col items-center mb-8">
                                    {item.profile_path && <img className="h-[200px]"
                                        src={`https://image.tmdb.org/t/p/w200${item?.profile_path}`}
                                        alt="출연진"
                                    /> }
                                    <p className="font-bold text-center text-lg"><b>배우</b> : {item.name}</p>
                                    <p className="text-ml text-gray-500"><b>역할</b> : {item.character}</p>
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