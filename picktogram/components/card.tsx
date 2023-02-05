import React, { useRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { CardProps } from "@/src/types/types"

const CardContainer = styled.div`
    height: 350px;
    padding: 16px 20px;
    border: 1px solid black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.05);
    }
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

    return (
        <CardContainer ref={cardRef} onClick={handleClick}>
          <h2>{data?.nickname}</h2>
          <div>{data?.contents}</div>
        </CardContainer>
    )
}
