import { BiPlusMedical } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavPage() {
    return (
    <div className="sticky top-0 z-50 w-full h-[60px] bg-[#fcd985] flex justify-center">
        {/* 중앙정렬된 네비게이션 컨테이너 */}
        <div className="max-w-[1300px] w-full h-full flex justify-between px-8">
            {/* 1.왼쪽: 로고 + 메뉴 */}
            <div className="h-full flex space-x-8">
                {/* 로고 */}
                <div className="h-full w-[200px] flex items-center">
                    <Link to={"/"}><h1 className="text-[#823f12] text-3xl font-bold"
                    style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)' }}>CINEMA</h1></Link>
                </div>
                {/* 메뉴 */}
                <div className="h-full flex items-center text-[#b07d3e] font-bold space-x-6">
                    <Link to="/movies"><p>Movies</p></Link>
                    <Link to="/tv"><p>TV Shows</p></Link>
                    <p>People</p>
                    <p>more</p>
                </div>
            </div>
            {/* 2.오른쪽: 아이콘 영역 */}
            <div className="h-full flex items-center space-x-6">
                {/* 플러스 버튼 */}
                <div className="text-[#353535]">
                    <BiPlusMedical />
                </div>
                {/* 랭귀지 선택 */}
                <div className="border border-[#353535] text-[#353535] p-1 text-xs 
                hover:bg-[#9bb2c0] hover:text-[#f6f6f6] hover:border-[#f6f6f6]">
                    EN
                </div>
                {/* 벨 아이콘 */}
                <div className="text-[#353535]">
                <FaBell />
                </div>
                {/* USER */}
                <div className="w-8 h-8 bg-[#9bb2c0] rounded-full text-white flex justify-center items-center">
                    H
                </div>
                {/* 검색 아이콘 */}
                <div className="text-[#353535]">
                    <FaSearch />
                </div>
            </div>
        </div>
    </div>
  )
}