import React, { useState } from 'react'
import * as S from "./Pagination.style"

export default function Pagination({
    totalPage,
    setPage
} : {
    totalPage : number | undefined;
    setPage : React.Dispatch<React.SetStateAction<number>>;
}) {
  const total = totalPage ? totalPage : 0
  const [startPage, setStartPage] = useState<number>(1)

  const handlePrevClick : React.MouseEventHandler<HTMLButtonElement> = () => {
    if(startPage === 1) return
    setStartPage((prev) => prev - 10)
    setPage(startPage - 10)
  }

  const handleNextClick : React.MouseEventHandler<HTMLButtonElement> = () => {
    if(startPage + 10 > total) return
    setStartPage((prev) => prev + 10)
    setPage(startPage + 10)
  }

  const handleClick : React.MouseEventHandler<HTMLButtonElement> = (e) => {
    setPage(+e.currentTarget.id)
  }

  return (
    <S.Container >
        {/* 이전버튼 */}
        <button onClick={handlePrevClick}>{"<"}</button>
        {/* 페이지네이션 */}
        <div>
            {
              new Array(10)
              .fill(1)
              .map((_, i) =>
                startPage + i <= total &&
              (
                  <button
                    key={i}
                    id={String(startPage + i)}
                    onClick={handleClick}
                  //   aria-current={page === i + 1 ? "page" : null}
                  >
                  {startPage + i}
                  </button>
            ))}
        </div>
        {/*다음 버튼 */}
        <button onClick={handleNextClick}>{">"}</button>
    </S.Container>
  )
}
