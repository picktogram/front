import React, { Dispatch, SetStateAction, useRef } from 'react';
import { ICommentSubmitData } from '../boardDetail.type';
import { InfiniteData } from 'react-query';
import { PaginationResponseType } from 'picktogram-server-apis/common/interceptors/transform.interceptor';
import { CommentType } from 'picktogram-server-apis/types';

import useImageRef from '@/src/hooks/useImageRef';

import * as S from '../boardDetail.styles'
import InputRemoteControl from './inputRemoteControl';
import CommentModal from './commentModal';
import Carousel from '@/src/components/commons/carousel';

interface ImageControlBoxProps {
    images : {url : string; id : number}[] | undefined;
    count : number;
    setCount : Dispatch<SetStateAction<number>>;
    handleComment : (arg : ICommentSubmitData) => void;
    commentsData : InfiniteData<PaginationResponseType<CommentType.CommentsByArcile> | undefined> | undefined;
    hoverInfo : {
        id : string;
        isHover : boolean;
    };
    isOpen : boolean;
    xPos : number;
    yPos : number;
    handleClose : () => void;
    handlePosition : <T extends React.MouseEvent>(e: T) => void
}

const ImageControlBox : React.FC<ImageControlBoxProps> = ({
    commentsData,
    count,
    handleComment,
    hoverInfo,
    images,
    setCount,
    handleClose,
    isOpen,
    xPos,
    yPos,
    handlePosition
}) => {
    if(!images) {
        return null
    }
    const currentId = useRef<number>(images[0]?.id)

    return (
        <S.ImageWrapper >
            <S.ImagesBox onClick={handlePosition} >
                <Carousel
                    images={images}
                    count={count}
                    setCount={setCount}
                    currentId={currentId}
                />
                <InputRemoteControl
                    isOpen={isOpen}
                    xPos={xPos}
                    yPos={yPos}
                    handleComment={handleComment}
                    currentId={currentId.current}
                    handleClose={handleClose}
                />
                <CommentModal
                    commentsData={commentsData}
                    currentId={currentId.current}
                    hoverInfo={hoverInfo}
                />
            </S.ImagesBox>
        </S.ImageWrapper>
    );
};

export default ImageControlBox;