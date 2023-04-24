import * as S from "./card.styles"
import * as Apis from "picktogram-server-apis/api/functional";
import { useRef , useEffect} from 'react'
import {useRecoilValue} from 'recoil'
import { tokenState} from '@/state/tokenState'
import {SERVER_URL} from "@/util/constant"
import { useMutation } from "react-query"

export default function CardModal({
    setIsShowModal,
    isShowModal,
    articleId
} : {
    setIsShowModal : React.Dispatch<React.SetStateAction<boolean>>;
    isShowModal : boolean;
    articleId : number;
}) {
    const modalRef = useRef<any>(null);
    const token = useRecoilValue(tokenState);
    const {mutate : articleReport} = useMutation(['getReport', articleId], async () => {

      if(typeof SERVER_URL !== 'string' || typeof token !== 'string') return
      try {
          const response = await Apis.api.v1.articles.reports
          .report(
              {
                  host : SERVER_URL,
                  headers : {
                      'Authorization' : token,
                      'Content-Type': 'application/json',
                  }
              },
              articleId,
              {
                reason : JSON.stringify('test 신고'),
              }
          )
          console.log('response', response)
          return response.data
      } catch(err) {
          throw err
      }
    }, {
      onSuccess(data, variables, context) {
          console.log(data)
      },
    })

    useEffect(() => {
        const listener = (e : Event) => {
          if (!modalRef.current || modalRef.current.contains(e.target)) {
            return;
          }
          setIsShowModal(false);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      }, []);



  return (
    <S.Modal ref={modalRef}>
        <button onClick={() => articleReport()}>신고하기</button>
    </S.Modal>

  )

}
