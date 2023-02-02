import React from 'react'

export const getServerSideProps =  (context : any) => {
    const token = context.req.headers.cookie
    ? context.req.headers.cookie.split(";").find((c : string) => c.trim().startsWith("token="))
    : null;

    if(!token) {
      return {
        redirect : {
          destination : '/login',
          permanent : false
        }
      }
    }

    return {
      props : {
        token : token.split("=")[1]
      },
    }
}

const DashBoardPage = () => {
  return (
    <div>
      <h1>게시판</h1>
      <div>로그인 이후 접근 가능한 페이지입니다.</div>
    </div>
  )
}


export default DashBoardPage;