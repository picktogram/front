import React, { SetStateAction } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tokenState } from '@/state/tokenState'
import { useQuery } from 'react-query';
import { isBusinessErrorGuard } from 'picktogram-server-apis/config/errors';

import * as Apis from "picktogram-server-apis/api/functional";

import Modal from '@/src/components/commons/Modal'
import { SERVER_URL } from '@/util/constant';

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
        <div>
            {boardDetail?.contents}
        </div>
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