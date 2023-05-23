import React, { useEffect, useState } from "react"
import { BoardData } from "./Main.type"
import { UserData } from "@/src/auth/tokens"
import { useRouter } from "next/dist/client/router"

import * as S from "./Main.style"
import Card from '@/src/components/commons/card/card'
import UserMainProfile from "./components/userMainProfile"
import UserRecommend from "./components/userRecommend"
import NoReplyBoard from "./components/noReplyBoard"
import ArticleModal from "../commons/modals/articleModal"

type MainUIProps = {
  user : UserData;
  token : string;
  data : any;
  handleNextPage : () => void;
}

export default function MainUI({
    user,
    token,
    data,
    handleNextPage,
}: MainUIProps
) {
  const isServer = typeof window === undefined
  const [isTop, setIsTop] = useState<boolean>(false)
  // const [showArticle, setShowArticle] = useState<boolean>(false);
  const router = useRouter()

  const handleTop = () => {
    if(isServer) return;
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setIsTop(true);
      } else {
        setIsTop(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, [])
  return (
    <>
      <S.Container>

        <S.RightSection >
          {/* 달력 */}
        </S.RightSection>

        <S.Section>
          <UserMainProfile user={user} token={token} />

          {data?.pages.map((page : {list : BoardData[]}, index : number) => (
            <React.Fragment key={index}>
              {page.list.map((post , index) => (
                <>
                  <Card
                    key={post.id}
                    isLast={index === page.list.length -1}
                    newLimit={handleNextPage}
                    data={post}
                    token={token}
                  />
                </>
              ))}
            </React.Fragment>
          ))}
        </S.Section>

        <S.LeftSection style={{position : 'relative'}}>
          <S.LeftContents>
            <NoReplyBoard user={user} token={token}/>
            <UserRecommend user={user} token={token} />
          </S.LeftContents>
        </S.LeftSection>

        <S.BottomMenu isTop={isTop}>
          <S.CreateButton onClick={() => router.push("/dashboard/new")}>게시글 작성</S.CreateButton>
          <S.ToTheTopButton onClick={handleTop}>
            <i className="ri-arrow-up-line"></i>
          </S.ToTheTopButton>
        </S.BottomMenu>

      </S.Container>
    </>
  )
}
