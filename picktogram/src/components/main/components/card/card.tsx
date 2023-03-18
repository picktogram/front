import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CardProps } from "./card.type"
import * as S from "./card.styles"
import useScrollPos from '@/src/hooks/useScrollPos';
import useFollow from "@/src/hooks/useFollow"
import useUnfollow from '@/src/hooks/useUnfollow';

export default function Card({
  isLast, newLimit, data
} : CardProps
) {
    const cardRef = useRef(null);
    const router = useRouter();
    const {savePos} = useScrollPos()
    const {mutate : userFollow} = useFollow(data.writerId);
    const {mutate : userUnfollow} = useUnfollow(data.writerId);

    useEffect(() => {
        if (!cardRef?.current) return;

        const observer : any = new IntersectionObserver(([entry]) => {
          if (isLast && entry.isIntersecting) {
            newLimit();
            observer.unobserve(entry.target);
          }
        });

        observer.observe(cardRef.current);
      }, [isLast]);

    const handleClick : any = () => {
      if(data) {
        savePos();
        router.push(`/dashboard/${data?.id}`)
      }
    }

    // console.log(data)

    return (
        <S.CardContainer ref={cardRef} >
          <S.UserInfo>
            <i className="ri-user-line" onClick={() => router.push(`/user/${data.writerId}/profile`)} style={{cursor : "pointer"}}></i> {/* 임시 아이콘 */}
            <h2>{data?.nickname}</h2>
            <button onClick={() => userFollow()}>follow</button>
            <button onClick={() => userUnfollow()}>unfollow</button>
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
