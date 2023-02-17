import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CardProps } from "./card.type"
import * as S from "./card.styles"


export default function Card({
  isLast, newLimit, data
} : CardProps
) {
    const cardRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (!cardRef?.current) return;

        const observer = new IntersectionObserver(([entry]) => {
          if (isLast && entry.isIntersecting) {
            newLimit();
            observer.unobserve(entry.target);
          }
        });

        observer.observe(cardRef.current);
      }, [isLast]);

    const handleClick = () => {
      if(data) {
        router.push(`/dashboard/${data?.id}`)
      }
    }

    // console.log(data)

    return (
        <S.CardContainer ref={cardRef} >
          <S.UserInfo>
            <i className="ri-user-line"></i> {/* 임시 아이콘 */}
            <h2>{data?.writer.nickname}</h2>
          </S.UserInfo>
          <S.ContentBox>
            <div>{data.contents}</div>
            <S.ImageBox onClick={handleClick}></S.ImageBox>
          </S.ContentBox>
          <S.Menu>
            <S.Like>좋아요</S.Like>
            <S.CommentMore>댓글보기</S.CommentMore>
          </S.Menu>
          <div>
            댓글들...
          </div>
        </S.CardContainer>
    )
}
