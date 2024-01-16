import MenuMove from "../components/MenuMove";

export default function Movies() {
  return (
    <MenuMove url="https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=" name="movie"/>
  )
}