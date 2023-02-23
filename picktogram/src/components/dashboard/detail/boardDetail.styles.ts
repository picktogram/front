import styled from '@emotion/styled'

export const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 70% 30%;
    height: 100vh;
`

export const ImagesBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: black;
`

export const ContentsBox = styled.div`
  padding: 1rem;
  border: 1px solid black;
  background-color: #3f3f3f;
  color : white;
`

export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  column-gap: .5rem;
  border-top: 1px solid gray;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
`

export const Contents = styled.div`
  margin-bottom: 1.5rem;
`

export const CommentsBox = styled.div`
   width: 100%;
   border-top: 1px solid gray;
   padding: 1rem;


`
export const Comments = styled.div`
  width: 100%;
  margin-bottom: 1.5rem;
`

export const CommentInput = styled.form`
   width: 100%;
   display: grid;
   column-gap: 1rem;
   grid-template-columns: 10% 90%;

   & input {
      border: none;
      background-color: gray;
      border-radius: 20px;
      height: 25px;
      padding: 1rem;
      color: white;
   }


`