import React, { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CardProps } from "./card.type"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { fetcher } from '@/util/queryClient'
import { useRecoilValue } from 'recoil'
import { tokenState } from '@/state/tokenState';

import * as S from "./card.styles"
import useScrollPos from '@/src/hooks/useScrollPos';

import CardModal from './cardModal';

export default function Card({
  isLast,
  newLimit,
  data,
} : CardProps
) {
    const cardRef = useRef<any>(null);
    const router = useRouter();
    const token = useRecoilValue(tokenState);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const { savePos } = useScrollPos()
    const queryClient = useQueryClient()

    const { mutate : followArticle } = useMutation<{
      data : boolean
    }>(['followAriticle', data.id], () => fetcher({
      method : 'patch',
      path : `/api/v1/articles/${data.id}`,
      headers : {
        Authorization : token
      }
    }) , {
      onSuccess : (data) => {
        queryClient.invalidateQueries(['infiniteBoard'])
        console.log(data);
      }
    })

    useEffect(() => {
        if (!cardRef?.current) return;

        const observer : IntersectionObserver = new IntersectionObserver(([entry]) => {
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

    return (
        <S.CardContainer ref={cardRef} >
          <S.UserInfo>
            <i className="ri-user-line"></i> {/* 임시 아이콘 */}
            <h2 style={{cursor : 'pointer'}} onClick={() => router.push(`/user/profile/${data.writer.id}`)}>{data.writer.nickname}</h2>
          </S.UserInfo>
          <S.More>
            <i className="ri-more-fill" onClick={() => setIsShowModal(prev => !prev)}></i>
          </S.More>
          <S.ContentBox>
            <div>{data.contents}</div>
            {/* {
              detail?.images?.length && <S.ImageBox onClick={handleClick} background={detail?.images[0]?.url}></S.ImageBox>
            } */}
          </S.ContentBox>
          <S.Menu>
             <S.Like onClick={() => followArticle()}>
                <span>좋아요</span>
                {/* <i className={data.writer.followStatus === 'followUp' ? 'ri-heart-fill' : 'ri-heart-line'}></i> */}
              </S.Like>
            <S.CommentMore onClick={() => router.push(`/user/profile/${data.writer.id}`)}>댓글보기</S.CommentMore>
          </S.Menu>
          <S.CommentsLength onClick={() => router.push(`/user/profile/${data.writer.id}`)}>
            댓글 {data?.comments?.length}개
          </S.CommentsLength>

          {isShowModal &&
              <CardModal setIsShowModal={setIsShowModal} isShowModal={isShowModal} articleId={data.id}  />
          }
        </S.CardContainer>
    )
}
