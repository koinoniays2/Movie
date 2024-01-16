import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CircularProg from "../components/CircularProg";
import Pagination from "react-js-pagination";
import "../routes/Paging.css"
import { Link } from "react-router-dom";

export default function MenuMove(props) {
    const [lists, setLists] = useState();
    const [page, setPage] = useState(1);
    useEffect(() => {
        const url =
            `${props.url}${page && page}`;
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
                setLists(json);
            })
            .catch((err) => console.error("error:" + err));
    }, [page, props.url]);

    const handlePageChange = (page) => {
        setPage(page);
    }
    return (
        <>
            <Header />
            <div className="w-full flex flex-col items-center justify-center py-16">
                <div className="w-[1000px] flex flex-wrap gap-4 gap-y-8">
                    {/* item */}
                    {lists?.results?.map((list) => (
                        <div
                            key={list.id}
                            className="w-[180px] h-[340px] rounded-lg shadow-lg overflow-hidden">
                            {/* 위 : 그림 */}
                            <div className="w-full h-[250px]">
                                <Link to={props.name === "movie" ? `/detail/${list.id}` : `/detailTV/${list.id}`}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={list.poster_path ? `https://image.tmdb.org/t/p/original${list.poster_path}` : 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                                        alt={list.poster_path ? '이미지' : '대체 이미지'}
                                    />
                                </Link>
                            </div>
                            {/* 아래 : 내용 */}
                            <div className="relative w-full h-[90px] pt-6 px-2">
                                {/* 제목 */}
                                {list.title && <h2 className="text-ml font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">{list.title}</h2>}
                                {list.name && <h2 className="text-ml font-semibold overflow-hidden whitespace-nowrap overflow-ellipsis">{list.name}</h2>}
                                {/* 날짜 */}
                                {list.release_date && <p className="text-sm">{list.release_date}</p>}
                                {list.first_air_date && <p className="text-sm">{list.first_air_date}</p>}
                                {/* 좋아요 평가 */}
                                <div className="absolute -top-5 left-2">
                                    <CircularProg rate={Math.round(list.vote_average) * 10} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 페이지 네이션 */}
                <div className="pt-8">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={10}
                        totalItemsCount={lists && lists.total_pages ? lists.total_pages : 0}
                        pageRangeDisplayed={5}
                        onChange={handlePageChange}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
}