import React, { SetStateAction } from 'react';
import { SERVER_URL } from '@/util/constant';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from '@/state/tokenState'
import { useQuery } from 'react-query';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

import * as Apis from "picktogram-server-apis/api/functional";

import Modal from '@/src/components/commons/Modal'
import styled from '@emotion/styled'

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

    const bodyContent = (
        <Container>
            <LeftSide>
                {boardDetail?.contents}
            </LeftSide>
            <RightSide>
                <CommentList>
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
    grid-template-columns: 1fr 1fr;
`

const LeftSide = styled.div`
    width: 100%;
    padding: 20px;
`

const RightSide = styled(LeftSide)`
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