import { IoSearchOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { RiGlobalLine } from "react-icons/ri";

export default function Nav() {
    return (
    <div className="w-full h-[80px] flex justify-center border border-b-[1px]">
    {/* 최대 1440px을 유지하기 위한 영역 */}
      <section className="max-w-7xl w-full h-full flex justify-between items-center">
        {/* 로고영역 */}
        <div className="font-black">카카오톡</div>
        {/* 메뉴영역 */}
        <div className="flex space-x-12 text-xs">
          <div>안녕캠페인</div>
          <div>운영철학</div>
          <div>안전 도구 및 가이드라인</div>
          <div>운영정책</div>
          <div>자동감지와 신고</div>
          <div>서비스 이용제한의 종류</div>
        </div>
        {/* 아이콘영역 */}
        <div className="flex space-x-2">
          <div><IoSearchOutline /></div>
          <div><FaRegMoon /></div>
          <div><RiGlobalLine /></div>
        </div>
      </section>
    </div>
    )
}