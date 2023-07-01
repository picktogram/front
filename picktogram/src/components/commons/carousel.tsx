import React, { Dispatch, MouseEventHandler, SetStateAction } from "react";
import styled from "@emotion/styled"

interface ICarouselProps {
    images : {url : string; id : number}[]
    count : number;
    setCount : Dispatch<SetStateAction<number>>;
    currentId : React.MutableRefObject<number>;
    isNew? : boolean;
}

export default function Carousel ({
     images,
     count,
     setCount,
     currentId,
     isNew = false
    } : ICarouselProps
    ) {

    const nextImage : MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setCount((prev) => {
            if(prev === images.length - 1) {
                return prev
            } else {
                currentId.current = images[prev + 1].id
                return prev + 1
            }
        })
    };

    const prevImage : MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setCount((prev) => {
            if(prev === 0) {
                return prev
            } else {
                currentId.current = images[prev - 1].id
                return prev - 1
            }
        })
    };

    return (
        <CarouselContainer>
            {images.length > 0 &&
                <>
                    <LeftArrow onClick={prevImage}>
                        <i className="ri-arrow-left-line"></i>
                    </LeftArrow>
                    <ImageBox index={count}>
                        {
                            images?.map((image, index) => (
                                <img
                                    src={image.url}
                                    style={{
                                        width: "100%",
                                        height : '100%',
                                        flex : "1 0 100%",
                                        objectFit : 'cover'
                                    }}
                                    key={index}
                                />
                            ))
                        }
                    </ImageBox>
                    <RightArrow onClick={nextImage}>
                        <i className="ri-arrow-right-line"></i>
                    </RightArrow>
                </>
            }
        </CarouselContainer>
    )

}

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        display: none;
    }
`

const ImageBox = styled.div<{index : number}>`
  height: 1300px;
  display: flex;
  transform: ${(props) => `translateX(-${props.index * 100}%)`};
  transition: transform .3s ease;
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
    opacity: 0;
    color: white;
    background-color: rgba(0,0,0,0.6);
    transition: all .4s ease-in-out;
    &:hover {
        opacity: 1;
    }
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
    opacity: 0;
    color: white;
    background-color: rgba(0,0,0,0.6);
    transition: all .4s ease-in-out;
    &:hover {
        opacity: 1;
    }
`