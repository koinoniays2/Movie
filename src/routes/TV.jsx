import React from 'react'
import MenuMove from '../components/MenuMove'

export default function TV() {
  return (
    <MenuMove url="https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=" name="tv"/>
  )
}