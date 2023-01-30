import React from 'react'
import withAuth from '@/hoc/auth'


const DashBoardPage = () => {
  return (
    <div>게시판 페이지 로그인 해야만 들어올 수 있음</div>
  )
}


export default withAuth(DashBoardPage, true);