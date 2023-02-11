import React, { useState } from "react";
import styled from "@emotion/styled"

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }

`

const ImageBox = styled.div<{index : number}>`
  width: 100%;
  height: 500px;
  display: flex;
  /* overflow-x: scroll; */
  transform: ${(props) => `translateX(-${props.index * 100}%)`};
  transition: transform .3s ease;

  & img {
    object-fit: contain;
  }
`
const LeftArrow = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    z-index: 1;
    cursor: pointer;
`

const RightArrow = styled.div`
     position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-weight: 700;
    z-index: 1;
    cursor: pointer;
`

const Carousel = (
    { images }
    : {images : string[]}
    ) => {
    const [count, setCount] = useState<number>(0);

    const nextImage = () => {
        setCount((prev) => (prev === images.length - 1 ? prev : prev + 1));
    };

    const prevImage = () => {
        setCount((prev) => (prev === 0 ? prev : prev - 1));
    };

    return (
        <CarouselContainer>
            {images.length > 0 &&
                <>
                    <LeftArrow onClick={prevImage}>{"<"}</LeftArrow>
                    <ImageBox index={count}>
                        {images?.map((image, index) => (
                            <img src={image} style={{width: "100%", flex : "1 0 100%"}} key={index} />
                        ))}
                    </ImageBox>
                    <RightArrow onClick={nextImage}>{">"}</RightArrow>
                </>
            }

        </CarouselContainer>
    )
}

export default Carousel