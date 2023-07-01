import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { CommentModalProps, ICommentData } from '../boardDetail.type'

import * as S from '../boardDetail.styles'

const CommentModal : React.FC<CommentModalProps> = ({
    commentsData,
    currentId,
    hoverInfo
}) => {
    const filteredCommentData = useMemo(() => {
        let newCommentData : ICommentData = []
        commentsData?.pages.map((page) => {
            const filtered = page?.list.filter((comment) => comment.xPosition && comment.yPosition && currentId == comment.imageId)
            if(filtered) newCommentData = [...newCommentData, ...filtered]
        })
        return newCommentData
    }, [commentsData, currentId])

    return (
        <>
            {
                filteredCommentData?.map((comment) => (
                   <Comment
                        key={comment.id}
                        comment={comment}
                        hoverInfo={hoverInfo}
                   />
                ))
            }
        </>
    );
};

export default CommentModal;

const Comment = ({
    comment,
    hoverInfo
} : {
    comment : any;
    hoverInfo : {
        id : string;
        isHover : boolean;
    };
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClickComment :  MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setIsOpen((prev) => !prev)
    }

    useEffect(() => {
        if(comment.id == hoverInfo.id) {
            setIsOpen(hoverInfo.isHover)
        } else {
            setIsOpen(false)
        }
    }, [hoverInfo.id])

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsOpen(false)
        })
        return () => {
            window.removeEventListener('resize', () => {})
        }
    }, [])

    return (
        <S.CommentOnImage
            isOpen={isOpen}
            xPos={comment.xPosition}
            yPos={comment.yPosition}
            key={comment.id}
            onClick={onClickComment}
        >
            {comment.contents}
        </S.CommentOnImage>
    )
}