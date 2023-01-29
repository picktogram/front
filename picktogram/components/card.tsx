import React, {useRef, useEffect} from 'react'
import styled from '@emotion/styled'

interface CardProps {
    isLast? : boolean
    newLimit : () => void
}

const CardContainer = styled.div`
    height: 350px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Card({isLast, newLimit} : CardProps) {
    const cardRef = useRef();

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

    return (
        <CardContainer ref={cardRef}>card</CardContainer>
    )
}
