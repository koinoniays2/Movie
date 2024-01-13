import { useEffect, useState } from "react";
import Layout from "../components/Layout"
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function Detail() {
    const { movieId } = useParams();
    const [lists, setLists] = useState([]);
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
            fetch(url, options)
                .then((res) => res.json())
                .then((json) => {
                    setLists(json);
                    // console.log(json);
                })
                .catch((err) => console.error("error:" + err));
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
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                setPeople(json.cast);
                // console.log(json.cast)
            })
            .catch(err => console.error('error:' + err));
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
            <div className="w-full flex flex-col items-center">
                <article className="w-full">
                    <div className="w-[50%] px-12 py-3 my-8 text-2xl font-bold text-[#823f12] bg-[#dde5d6]">
                        <p>영화소개</p>
                    </div>
                    <div className="flex px-12 py-4">
                        {lists.poster_path && (
                            <img src={`https://image.tmdb.org/t/p/w200${lists.poster_path}`} alt="포스터" />
                        )}
                        <div className="px-3 space-y-4 text-[#823f12]">
                            <h1 className="text-3xl font-bold">{lists.title}</h1>
                            <p className=""><b>장르</b><br />{(lists.genres || []).map((item) => (
                                <span key={item.id}>{item.name} </span>
                            ))}</p>
                            <p><b>줄거리</b><br /> {lists.overview}</p>
                        </div>
                    </div>
                </article>
                <article className="w-full h-[600px] flex flex-col overflow-hidden">
                    <div className="w-[50%] px-12 py-3 my-8 text-2xl font-bold text-[#823f12] bg-[#dde5d6]">
                        <p>출연진</p>
                    </div>
                    <Slider {...settings}>
                        {people.map((item, index) => (
                            <article key={index} className="w-full flex justify-center mb-10">
                                <div className="flex flex-col items-center">
                                    {item.profile_path && <img className="h-[200px]"
                                        src={`https://image.tmdb.org/t/p/w200${item.profile_path}`}
                                        alt="출연진"
                                    /> }
                                    <p className="font-bold text-center text-lg"><b>배우</b> : {item.name}</p>
                                    <p className="text-ml text-gray-500"><b>역할</b> : {item.character}</p>
                                </div>
                            </article>
                        ))}
                    </Slider>
                </article>
            </div>
        </Layout>
    )
}