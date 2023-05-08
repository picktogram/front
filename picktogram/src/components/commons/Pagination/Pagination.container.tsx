import React, { useState } from 'react'
import * as S from "./Pagination.style"

export default function Pagination({
    totalPage,
    setPage,
    page
} : {
    totalPage : number | undefined;
    setPage : React.Dispatch<React.SetStateAction<number>>;
    page : number;
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
        <S.Arrow onClick={handlePrevClick}>{"<"}</S.Arrow>
        {/* 페이지네이션 */}
        <S.Numbers>
            {
              new Array(10)
              .fill(1)
              .map((_, i) =>
                startPage + i <= total &&
              (
                  <S.Number
                    key={i}
                    id={String(startPage + i)}
                    isCurrent={startPage + i === page}
                    onClick={handleClick}
                  //   aria-current={page === i + 1 ? "page" : null}
                  >
                  {startPage + i}
                  </S.Number>
            ))}
        </S.Numbers>
        {/*다음 버튼 */}
        <S.Arrow onClick={handleNextClick}>{">"}</S.Arrow>
    </S.Container>
  )
}
