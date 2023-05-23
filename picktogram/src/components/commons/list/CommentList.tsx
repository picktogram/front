import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router'
import { CommentSelectData } from '../modals/articleModal';
import { UseMutateFunction } from 'react-query';
import { CreateCommentDto } from 'picktogram-server-apis/models/dtos/create-comment.dto';

import styled from '@emotion/styled'

import ProfileImage from '../profileImage';
import List from '../List';
import Input from '../input';

interface CommentListProps {
    page : number;
    setPage : React.Dispatch<React.SetStateAction<number>>
    commentsData : CommentSelectData | undefined;
    addComment :  UseMutateFunction<void, unknown, CreateCommentDto, unknown>
}

interface Comment {
    xPosition: string;
    yPosition: string;
    id: number;
    writerId: number;
    writer: {
        profileImage: string;
        id: number;
        nickname: string;
    };
    contents: string;
}

const Comments = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: flex-start;
`

const Content = styled.div`
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
    commentsData,
    addComment
}) => {

    // 내부 컴포넌트 (상태를 분리해주기 위해서)
    const Comment : React.FC<Comment> = ({
        contents,
        id,
        writer,
    }) => {
        const router = useRouter()
        const [isShowReplyInput, setIsShowReplyInput] = useState<boolean>(false)
        const [reply, setReply] = useState<string>('')

        const onAddReply = useCallback((parentId : number) => {
            let data = {
                parentId : parentId,
                contents : reply,
                xPosition : null,
                yPosition : null
            }
            setReply('')
            addComment(data)
        }, [reply, setReply, addComment])

        return (
            <>
                <div style={{display : 'flex', columnGap : '1rem', alignItems : 'center'}}>
                    <ProfileImage
                        isCircle={true}
                        width={25}
                        height={25}
                        profileImage={writer.profileImage}
                        onClick={() => router.push(`/user/profile/${writer.id}`)}
                    />
                    <div>
                        {writer.nickname}
                    </div>
                    <Content>
                        {contents}
                    </Content>
                    <ReplyButton onClick={() => setIsShowReplyInput((prev) => !prev)}>
                        답글
                        <i className="ri-corner-down-left-line"></i>
                    </ReplyButton>
                </div>
                <Input
                    value={reply}
                    setValue={setReply}
                    onClick={() => onAddReply(id)}
                    isShow={isShowReplyInput}
                />
                <div>
                    {/* have to showing reply data */}
                </div>
            </>
        )
    }

    const bodyContent = (
        <Comments>
            {!commentsData?.list.length && (
                <div>댓글이 없습니다.</div>
            )}
            {commentsData?.list?.map((comment) => (
                <Comment {...comment}/>
            ))}
        </Comments>
    )

    return (
        <List body={bodyContent} page={page} setPage={setPage} totalPage={commentsData?.totalPage}/>
    );
};



export default CommentList;

