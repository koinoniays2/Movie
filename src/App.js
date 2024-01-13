import Banner from "./components/Banner";
import Layout from "./components/Layout";
import Movie from "./components/Movie";
import SearchPage from "./components/SearchPage";
import TrendingPage from "./components/TrendingPage";

function App() {
  return (
    <div>
      {/* 헤더 레이아웃 */}
      <Layout> 
        {/* 검색 영역 */}
        <SearchPage />
        {/* 배너 */}
        <Banner />
        {/* Trending */}
        <TrendingPage />
        <Movie />
      </Layout>
    </div>
  );
}

export default App;
