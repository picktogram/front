import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { CardProps } from "@/src/types/types"

const CardContainer = styled.div`
    min-height: 600px;
    padding: 16px 20px;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
`

const UserInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;

    & i {
      font-size: 2rem;
    }
`

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

const ImageBox = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 300px;
  cursor: pointer;
`

const Menu = styled.div`
  display: flex;
  width: 100%;
  border-top : 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`
const Like = styled.button`
  width: 50%;
  padding: 16px;
  border: none;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #b8b8b8;
  }
`

const CommentMore = styled(Like)`
  border-left: 1px solid lightgray;
`

export default function Card({isLast, newLimit, data} : CardProps) {
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

    console.log(data)

    return (
        <CardContainer ref={cardRef} >
          <UserInfo>
            <i className="ri-user-line"></i>
            <h2>{data?.writer.nickname}</h2>
          </UserInfo>
          <ContentBox>
            <div>{data.contents}</div>
            <ImageBox onClick={handleClick}></ImageBox>
          </ContentBox>
          <Menu>
            <Like>좋아요</Like>
            <CommentMore>댓글보기</CommentMore>
          </Menu>
          <div>
            댓글들...
          </div>
        </CardContainer>
    )
}
