import React, { useRef, useEffect, useState } from 'react'
import * as S from "./card.styles"
import CardModal from './cardModal';
import useScrollPos from '@/src/hooks/useScrollPos';
import useFollow from "@/src/hooks/useFollow"
import useUnfollow from '@/src/hooks/useUnfollow';
import { useRouter } from 'next/router'
import { CardProps } from "./card.type"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { fetcher } from '@/util/queryClient'
import {useRecoilValue} from 'recoil'
import { tokenState } from '@/state/tokenState';
import { AxiosError } from 'axios';


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
    const {savePos} = useScrollPos()
    const {mutate : userFollow} = useFollow(data.writer.id);
    const {mutate : userUnfollow} = useUnfollow(data.writer.id);

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
        // queryClient.invalidateQueries(['infiniteBoard'])
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
            <i className="ri-user-line" onClick={() => router.push(`/user/${data.writer.id}/profile`)} style={{cursor : "pointer"}}></i> {/* 임시 아이콘 */}
            <h2 style={{cursor : 'pointer'}} onClick={() => router.push(`user/profile/${data.writer.id}`)}>{data.writer.nickname}</h2>
            {data.writer.followStatus === 'followUp'
              ? (
                <button
                  onClick={() => userUnfollow()}
                  style={{
                    display : 'flex',
                    justifyContent : 'center',
                    alignItems : 'center',
                    padding : '2px',
                    border : 'none',
                    backgroundColor : 'transparent',
                    cursor : 'pointer'
                  }}
                >
                  <i className="ri-check-line"></i>
                  <span style={{
                        fontSize : '1.2rem',
                      }}>
                         팔로우 중
                  </span>
                </button>
              )
              : (
                <button
                  onClick={() => userFollow()}
                  style={{
                    display : 'flex',
                    justifyContent : 'center',
                    alignItems : 'center',
                    padding : '2px',
                    border : 'none',
                    backgroundColor : 'transparent',
                    color : '#0a66c2',
                    cursor : 'pointer'
                  }}
                >
                      <i className="ri-add-line"></i>
                      <span style={{
                        fontSize : '1.2rem',
                      }}>
                         팔로우
                      </span>
                </button>
              )
            }
          </S.UserInfo>
          <S.More>
            <i className="ri-more-fill" onClick={() => setIsShowModal(prev => !prev)}></i>
          </S.More>
          <S.ContentBox>
            <div>{data.contents}</div>
            <S.ImageBox onClick={handleClick}></S.ImageBox>
          </S.ContentBox>
          <S.Menu>
             <S.Like onClick={() => followArticle()}>
                <span>좋아요</span>
                {/* <i className={data.writer.followStatus === 'followUp' ? 'ri-heart-fill' : 'ri-heart-line'}></i> */}
              </S.Like>
            <S.CommentMore>댓글보기</S.CommentMore>
          </S.Menu>
          <div>
            댓글들...
          </div>

          {isShowModal &&
              <CardModal setIsShowModal={setIsShowModal} isShowModal={isShowModal} articleId={data.id}  />
          }
        </S.CardContainer>
    )
}
