import "./App.css";
import Nav from "./practice/Nav.jsx"; // import 함수이름 from "파일경로"
import SnowPic from "./asset/phone.jpg"; // 이미지도 import해서 쓴다. (이름은 마음대로)

function App() {
  return (
    <>
      {/* 중앙 정렬을 하기 위한 div */}
      <div className="w-full flex-col justify-center">
        <Nav></Nav>
        {/* 본문내용 */}
        <div className="w-full h-[100vh] flex justify-center items-center space-x-32">
          {/* 왼쪽 글*/}
          <div className="flex flex-col space-y-8">
            {/* 타이틀 */}
            <div className="font-bold text-4xl">실험실</div>
            {/* 내용 */}
            <div className="w-[300px]">
              새로운 기능이 추가되기 전 실험실을 통해 반응을 살펴보고 있어요.
              정식으로 출시된 기능은 아니지만, 다양한 시도를 하고있는 카카오팀을
              지켜봐주세요.
            </div>
          </div>
          {/* 오른쪽 이미지 */}
          <div className="w-[280px] h-[520px] border-4 border-blue-500 rounded-2xl">
            <img className="w-full h-full object-cover rounded-xl" src={SnowPic} alt="snow" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App; //import 하기 위해 export