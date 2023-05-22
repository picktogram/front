import styled from '@emotion/styled'

export const Container = styled.div`
    position: relative;
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`

export const UserBox = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem;
  align-items: center;
  border-bottom: 1px solid black;
`
export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  align-items: center;
`

export const Username = styled.span`
  font-size: 1.2rem;
`
export const BoardModalWrapper = styled.div`
  position: absolute;
  top: 100px;
  right: 1rem;
  width: 300px;
  min-height: 500px;
  z-index: 100000;
`

export const UserMenu = styled.button`
    background-color: transparent;
    font-size: 2rem;
    border: none;
    cursor: pointer;
`

export const ImagesBox = styled.div`
  width: 100%;
  min-height: 500px;
  display: flex;
  flex-direction: row;
  /* background-color: black; */
`

export const ContentsBox = styled.div`
  padding: 1rem;
  min-height: 500px;
  border: 1px solid black;
  background-color: #3f3f3f;
  color : white;
`

export const Contents = styled.div`
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-bottom : 1px solid lightgray;
`

export const CommentsBox = styled.div`
   width: 90%;
   height: auto;
   max-height: 1800px;
   margin: 0 auto;
   padding: 1rem;
   margin-bottom: 1.5rem;


`
export const Comments = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-bottom : 1px solid lightgray;
`

export const CommentInput = styled.form`
   width: 90%;
   margin: 0 auto;
   display: grid;
   column-gap: 1rem;
   grid-template-columns: 85% 15%;

   & input {
      border: none;
      background-color: gray;
      border-radius: 20px;
      height: 25px;
      padding: 1rem;
      color: white;
   }


`