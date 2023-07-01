import styled from '@emotion/styled'

export const Container = styled.div`
    position: relative;
    margin: auto;
    width: 1600px;
    height: 1300px;
    display: flex;
`

export const ImageWrapper = styled.div`
  position : relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InputOnImages = styled.div<{
  xPos : number;
  yPos : number;
}>`
  position: absolute;
  left: ${(props) => props.xPos};
  top: ${(props) => props.yPos};
  width: 200px;
  height: 200px;
  background-color: black;
  padding: 20px;
  color: white;
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
  position: relative;
`

export const ContentsBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  background-color: #3f3f3f;
  color : white;
`

export const Contents = styled.div`
  padding: 1rem;
  min-height: 700px;
  margin-bottom: 1.5rem;
  border-bottom : 1px solid lightgray;
`

export const CommentsBox = styled.div`
   width: 90%;
   min-height: 400px;
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

export const RemoteControl = styled.div<{
  xPos : number | string;
  yPos : number | string;
}>`
  width: 500px;
  padding: 30px;
  display: flex;
  align-items: center;
  column-gap: 16px;
  position: absolute;
  left: ${(props) => `${props.xPos}px`};
  top: ${(props) => `${props.yPos}px`};
  z-index: 100;
  background-color : black;
  border-radius : 20px;
`

export const RemoteCancelBtn = styled.button`
  position: absolute;
  top: 3px;
  right: 3px;
  text-align: center;
  width: 30px;
  height: 30px;
  font-size: 20px;
  border-radius: 50%;
  background-color: transparent;
  color: white;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: gray;
  }
`

export const CommentOnImage = styled.div<{
  isOpen : boolean;
  xPos : number | string;
  yPos : number | string;
}>`
  width: ${(props) => props.isOpen ? '300px' : '20px'};
  max-height: ${(props) => props.isOpen ? '100px' : '20px'};
  border-radius: 20px;
  padding: 1rem;
  position: absolute;
  left: ${(props) => `${props.xPos}px`};
  top: ${(props) => `${props.yPos}px`};
  z-index : 10000px;
  overflow : hidden;
  background-color : ${(props) => props.isOpen ? 'lightgray' : 'black'};;
  transition : all .3s ease-out;

  &:hover {
    transform : scale(1.2)
  }
`