import React, { useRef, useEffect, useState } from 'react'
import * as S from "./card.styles"
import CardModal from './cardModal';
import useScrollPos from '@/src/hooks/useScrollPos';
import useFollow from "@/src/hooks/useFollow"
import useUnfollow from '@/src/hooks/useUnfollow';
import { useRouter } from 'next/router'
import { CardProps } from "./card.type"
import { useMutation, useQueryClient } from "react-query"
import { fetcher } from '@/util/queryClient'
import {useRecoilValue} from 'recoil'
import { tokenState } from '@/state/tokenState';


export default function Card({
  isLast, newLimit, data
} : CardProps
) {
    const cardRef = useRef<any>(null);
    const router = useRouter();
    const token = useRecoilValue(tokenState);
    const queryClient = useQueryClient();
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const {savePos} = useScrollPos()
    const {mutate : userFollow} = useFollow(data.writerId);
    const {mutate : userUnfollow} = useUnfollow(data.writerId);

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
            <i className="ri-user-line" onClick={() => router.push(`/user/${data.writerId}/profile`)} style={{cursor : "pointer"}}></i> {/* 임시 아이콘 */}
            <h2>{data?.nickname}</h2>
            <button onClick={() => userFollow()}>follow</button>
            <button onClick={() => userUnfollow()}>unfollow</button>
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
                <i className={data.followStatus === 'follow' ? 'ri-heart-fill' : 'ri-heart-line'}></i>
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
