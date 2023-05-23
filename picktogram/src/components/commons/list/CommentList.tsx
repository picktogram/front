import React from 'react';
import { useRouter } from 'next/router'
import { CommentSelectData } from '../modals/articleModal';

import styled from '@emotion/styled'

import ProfileImage from '../profileImage';
import List from '../List';

interface CommentListProps {
    page : number;
    setPage : React.Dispatch<React.SetStateAction<number>>
    commentsData : CommentSelectData | undefined;
}

const Comments = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: flex-start;
`

const Comment = styled.div`
    display: flex;
    column-gap: 1rem;
`

const ReplyButton = styled.button`
    width: 2rem;
    border: none;
    background-color: transparent;
    color : white;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`

const CommentList : React.FC<CommentListProps> = ({
    page,
    setPage,
    commentsData
}) => {
    const router = useRouter()

    const bodyContent = (
        <Comments>
            {!commentsData?.list.length && (
                <div>댓글이 없습니다.</div>
            )}
            {commentsData?.list?.map((comment) => (
                <div style={{display : 'flex', columnGap : '1rem', alignItems : 'center'}}>
                    <ProfileImage
                        isCircle={true}
                        width={25}
                        height={25}
                        profileImage={comment.writer.profileImage}
                        onClick={() => router.push(`/user/profile/${comment.writer.id}`)}
                    />
                    <div>
                        {comment.writer.nickname}
                    </div>
                    <Comment>
                        {comment.contents}
                    </Comment>
                    <ReplyButton onClick={() => {}}>
                        답글
                        <i className="ri-corner-down-left-line"></i>
                    </ReplyButton>
                </div>
            ))}
        </Comments>
    )

    return (
        <List body={bodyContent} page={page} setPage={setPage} totalPage={commentsData?.totalPage}/>
    );
};

export default CommentList;