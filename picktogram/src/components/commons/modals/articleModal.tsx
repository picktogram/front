import React, { SetStateAction, use, useEffect, useState } from 'react';
import { SERVER_URL } from '@/util/constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from '@/state/tokenState'
import { useQuery } from 'react-query';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

import * as Apis from "picktogram-server-apis/api/functional";

import Modal from '@/src/components/commons/Modal'
import styled from '@emotion/styled'
import ProfileImage from '../profileImage';
import useDate from '@/src/hooks/useDate';
import Carousel from '../carousel';

type ArticleModalProps = {
    articleId : number;
    showArticle : boolean;
    setShowArticle : React.Dispatch<SetStateAction<boolean>>
}

const ArticleModal : React.FC<ArticleModalProps> = ({
    articleId,
    setShowArticle,
    showArticle
}) => {
    const token = useRecoilValue(tokenState)
    const [images, setImages] = useState<string[]>([])
    const [count, setCount] = useState<number>(0)

    const onClose = () => {
        setShowArticle(false)
    }

    const {data : boardDetail} = useQuery(['boardDetail', articleId, token], async () => {
        try {
            if(!token) return null
            const response = await Apis.api.v1.articles.getOneDetailArticle({
                host : SERVER_URL as string,
                headers : {
                    Authorization : token
                }
            },
                articleId
            )

            if(isBusinessErrorGuard(response)) {
                return null
            }

            return response.data

        } catch (error) {
            console.log(error)
        }
    })

    useEffect(() => {
        if(!boardDetail?.images) return
        setImages(boardDetail?.images?.map((e) => e.url))
    }, [boardDetail?.images])

    const bodyContent = (
        <Container>
            <LeftSide>
                <Carousel
                    images={images}
                    setImages={setImages}
                    count={count}
                    setCount={setCount}
                />
            </LeftSide>
            <RightSide>
                <UserInfo>
                    <ProfileImage isCircle={true} profileImage={boardDetail?.writer.profileImage}/>
                    <div>
                        <div>
                            {boardDetail?.writer.nickname}
                        </div>
                    </div>
                </UserInfo>
                <Contents>
                    {boardDetail?.contents}
                </Contents>
                <CommentList>
                    {!boardDetail?.comments.length && (
                        <div>댓글이 없습니다.</div>
                    )}
                    {boardDetail?.comments.map((comment) => (
                        <Comment>
                            {comment.contents}
                        </Comment>
                    ))}
                </CommentList>
            </RightSide>
        </Container>
    )
    return (
       <Modal
            title='Article'
            isOpen={showArticle}
            onClose={onClose}
            label='ArticleModal'
            body={bodyContent}
       />
    );
};

export default ArticleModal;

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 1.5fr;
    min-height: 700px;
`

const LeftSide = styled.div`
    width: 100%;
    padding: 20px;
`

const ImageBox = styled.div`

`

const RightSide = styled(LeftSide)`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    row-gap: 1rem;
`

const UserInfo = styled.div`
    display: flex;
    column-gap: 1rem;
`

const Contents = styled.div`
    min-height: 300px;
    padding-bottom: 20px;
    border-bottom: 1px solid lightgray;
`

const CommentList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: flex-start;
`

const Comment = styled.div`
    display: flex;
    column-gap: 1rem;
`