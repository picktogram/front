import React, { MouseEventHandler, useEffect, useMemo, useState } from 'react';
import { CommentModalProps } from '../boardDetail.type'

import * as S from '../boardDetail.styles'

const CommentModal : React.FC<CommentModalProps> = ({
    commentsData,
    currentId
}) => {
    const filteredCommentData = useMemo(() => {
        return commentsData?.list.filter((comment) => comment.xPosition && comment.yPosition && currentId == comment.imageId)
    }, [commentsData, currentId])

    return (
        <>
            {
                filteredCommentData?.map((comment) => (
                   <Comment
                    key={comment.id}
                    comment={comment}

                   />
                ))
            }
        </>
    );
};

export default CommentModal;

const Comment = ({
    comment,
} : {
    comment : any;
}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const onClickComment :  MouseEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation()
        setIsOpen((prev) => !prev)
    }

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