import React from 'react'
import * as S from "./Pagination.style"

export default function Pagination({
    totalPage,
    setPage
} : {
    totalPage : number | undefined;
    setPage : React.Dispatch<React.SetStateAction<number>>;
}) {
  const total = totalPage ? totalPage : 0

  if(totalPage === undefined) {
        return <div>Pagination Error...</div>
    }
  return (
    <S.Container >
        {/* 이전버튼 */}
        <button onClick={() => setPage((prev) => prev === 1 ? prev : prev - 1)}>{"<"}</button>
        {/* 페이지네이션 */}
        <div>
            {Array(totalPage)
            .fill("")
            .map((_, i) => (
                <button
                key={i + 1}
                  onClick={() => setPage(i + 1)}
                //   aria-current={page === i + 1 ? "page" : null}
                >
                {i + 1}
                </button>
            ))}
        </div>
        {/*다음 버튼 */}
        <button onClick={() => setPage(prev => total > prev ? prev + 1 : prev)}>{">"}</button>
    </S.Container>
  )
}
