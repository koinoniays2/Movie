import { useState } from "react";
import { BiPlusMedical } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { useColorMode } from "@chakra-ui/react";

export default function Header() {
  const [scroll, setScroll] = useState(true);
  document.addEventListener("wheel", (e) => {
    // 마우스 휠 내릴 때
    if (e.deltaY > 0) {
      setScroll(false);
      // 마우스 휠 올릴 때
      // 네비게이션을 보이기 위해 scroll 에 true
    } else if (e.deltaY < 0) {
      setScroll(true);
    }
  });
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div
      className={`sticky top-0 z-50 ${
        scroll ? "translate-y-0" : "-translate-y-[60px]"
    } duration-200
    w-full h-[60px] bg-[#fcd985] flex justify-center`}
    >
      {/* 중앙정렬된 네비게이션 컨테이너 */}
      <div className="max-w-[1300px] w-full h-full flex justify-between px-8">
        {/* 1.왼쪽: 로고 + 메뉴 */}
        <div className="h-full flex space-x-8">
          {/* 로고 */}
          <div className="h-full w-[200px] flex items-center">
            <Link to={"/"}>
              <h1
                className="text-[#823f12] text-3xl font-bold"
                style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)" }}
              >
                CINEMA
              </h1>
            </Link>
          </div>
          {/* 메뉴 */}
          <div className="h-full flex items-center text-[#b07d3e] font-bold space-x-6">
            <Link to="/movies">
              <p>Movies</p>
            </Link>
            <Link to="/tv">
              <p>TV Shows</p>
            </Link>
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
          <div
            className="border border-[#353535] text-[#353535] p-1 text-xs 
                hover:bg-[#9bb2c0] hover:text-[#f6f6f6] hover:border-[#f6f6f6]"
          >
            EN
          </div>
          {/* 다크모드 */}
          <div onClick={toggleColorMode} className="text-[#353535] cursor-pointer">
            {colorMode === "light" ? <MdDarkMode className="w-6 h-6"/> : <MdLightMode className="w-6 h-6" />}
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
  );
}
