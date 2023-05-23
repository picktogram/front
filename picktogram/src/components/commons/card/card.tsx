import React, { useRef, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { CardProps } from "./card.type"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { fetcher } from '@/util/queryClient'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { tokenState } from '@/state/tokenState';

import * as S from "./card.styles"
import useScrollPos from '@/src/hooks/useScrollPos';
import useDate from '@/src/hooks/useDate'

import CardModal from './cardModal';
import ArticleModal from '../modals/articleModal'

export default function Card({
  isLast,
  newLimit,
  data,
  token
} : CardProps
) {
    const cardRef = useRef<any>(null);
    const queryClient = useQueryClient()
    const router = useRouter();

    const { savePos } = useScrollPos()
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [showArticle, setShowArticle] = useState<boolean>(false)

    const date = useDate(data.createdAt)

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
      <>
        <S.CardContainer ref={cardRef} >
          <S.UserInfo>
            <S.ProfileImage background={data.writer.profileImage}/>
            <div style={{display : 'flex', flexDirection : 'column'}}>
              <h2 style={{cursor : 'pointer'}} onClick={() => router.push(`/user/profile/${data.writer.id}`)}>{data.writer.nickname}</h2>
              <div>
                {date ? date : ''}
              </div>
            </div>
          </S.UserInfo>
          <S.More>
            <i className="ri-more-fill" onClick={() => setIsShowModal(prev => !prev)}></i>
          </S.More>
          <S.ContentBox>
            <div>{data.contents}</div>
            {
              data.thumbnail?.length ? (
                <S.ImageBox background={data.thumbnail} />
              ) : (
                <div>{''}</div>
              )
            }
          </S.ContentBox>
          <S.Menu>
             <S.Like onClick={() => followArticle()}>
                <span>좋아요</span>
                {/* <i className={data.writer.followStatus === 'followUp' ? 'ri-heart-fill' : 'ri-heart-line'}></i> */}
              </S.Like>
            <S.CommentMore onClick={() => setShowArticle((prev) => !prev)}>댓글보기</S.CommentMore>
          </S.Menu>
          <S.CommentsLength onClick={() => router.push(`/dashboard/${data.id}`)}>
            댓글 {data?.comments?.length}개
          </S.CommentsLength>
          {isShowModal &&
              <CardModal setIsShowModal={setIsShowModal} isShowModal={isShowModal} articleId={data.id}  />
          }
        </S.CardContainer>
        {/* 게시글 모달창 */}
        <ArticleModal articleId={data?.id} showArticle={showArticle} setShowArticle={setShowArticle} token={token} />
      </>

    )
}
