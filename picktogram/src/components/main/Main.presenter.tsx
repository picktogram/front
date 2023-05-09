import React from "react"
import Card from '@/src/components/commons/card/card'
import UserMainProfile from "./components/userMainProfile"
import UserRecommend from "./components/userRecommend"
import NoReplyBoard from "./components/noReplyBoard"
import * as S from "./Main.style"
import { BoardData } from "./Main.type"
import { UserData } from "@/src/auth/tokens"

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
  return (
    <>
      <S.Container>

        <aside>
          {/* 달력 */}
          달력
        </aside>

        <S.Section>
          <UserMainProfile user={user} token={token} />
          {data?.pages.map((page : {list : BoardData[]}, index : number) => (
            <React.Fragment key={index}>
              {page.list.map((post , index) => (
                <Card
                  key={post.id}
                  isLast={index === page.list.length -1}
                  newLimit={handleNextPage}
                  data={post}
                />
              ))}
            </React.Fragment>
          ))}
        </S.Section>

        <aside style={{position : "relative"}}>
          <div style={{
              position : "fixed",
              width : "100%",
              display : "flex",
              flexDirection : 'column',
              rowGap : '1rem',
              overflowY : "scroll",
              }}>
            <NoReplyBoard user={user} token={token}/>
            <UserRecommend user={user} token={token} />
          </div>
        </aside>

      </S.Container>
    </>
  )
}
