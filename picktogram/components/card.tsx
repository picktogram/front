import React, { useRef, useEffect, useState } from 'react'
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
`

export default function Card({isLast, newLimit, data} : CardProps) {
    const cardRef = useRef(null);

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

      console.log(data)

    return (
        <CardContainer ref={cardRef}>
          <h2>{data?.nickname}</h2>
          <div>{data?.contents}</div>
        </CardContainer>
    )
}
