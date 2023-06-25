import styled from '@emotion/styled'

export const Container = styled.div`
    position: relative;
    height: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export const ImageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const UserWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  align-items: center;
  padding: 16px;
  border: 1px solid black;
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
  width: 100%;
  display: grid;
  grid-template-rows: 2fr .25fr 1fr;
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
   place-items: center;
   column-gap: 1rem;
   grid-template-columns: 85% 15%;


`

export const Input = styled.input`
  width: 100%;
  border: none;
  background-color: gray;
  border-radius: 20px;
  height: 25px;
  padding: 1rem;
  color: white;
`

export const Button = styled.button`
  border-radius: 20px;
  min-width: 100px;
  padding: 20px;
`