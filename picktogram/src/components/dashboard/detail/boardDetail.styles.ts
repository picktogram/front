import styled from '@emotion/styled'
import { mediaQuery } from '@/styles/media';

export const Container = styled.div`
    position: relative;
    margin:  0 auto;
    width: 2000px;
    height: 1300px;
    display: flex;
    border-bottom: 1px solid lightgray;
    @media screen and (max-width : 2100px) {
      border-top : 1px solid lightgray;
    }
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

export const ContentsWrapper = styled.div<{
  isNoImage : number | undefined;
}>`
  width: 75%;
  width: ${(props) => props.isNoImage ? '75%' : '50%'};
  margin: ${(props) => props.isNoImage ? 'none' : '0 auto'};
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`
export const UserInfo = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid lightgray;
`
export const UserNickname = styled.span`
  position: relative;
  top: -20px;
  left: -10px;
  font-weight: 800;
  font-size: 1.4rem;
`
export const Username = styled.span`
  font-size: 1.4rem;
  white-space: nowrap;
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
`

export const Contents = styled.div`
  padding: 1rem;
  height: 300px;
  margin-bottom: 1.5rem;
  border-bottom : 1px solid lightgray;
`

export const CommentsBox = styled.div`
   width: 100%;
   height: 770px;
   margin: 0 auto;
   padding: 1rem;
   margin-bottom: 1.5rem;
   overflow-y: scroll;

   &::-webkit-scrollbar {
        opacity: 0;
    }
`

export const AddBtn = styled.button`
  background-color: transparent;
  font-size: 16px;
  color: gray;
  border: none;
  cursor: pointer;
`
export const Comments = styled.div`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1.5rem;
  border-bottom : 1px solid lightgray;
  display: flex;
  column-gap: 1rem;
  align-items: center;
  white-space: nowrap;
`

export const CommentInput = styled.form`
   width: 100%;
   margin: 0 auto;
   display: grid;
   place-items: center;
   column-gap: 1rem;
   grid-template-columns: 70% 30%;
   padding-left: 1rem;
`

export const Input = styled.input`
  width: 100%;
  height: 80px;
  border-radius : 10px;
  border: 1px solid lightgray;
  padding: 1rem;
  font-size: 1.2rem;
`

export const Button = styled.button`
  border-radius: 20px;
  padding: 30px 40px;
  font-size: 1rem;
  text-align: center;
  white-space: nowrap;
`

export const RemoteControl = styled.div<{
  xPos : number | string;
  yPos : number | string;
}>`
  width: 800px;
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
  background-color : ${(props) => props.isOpen ? '#3f3f3f' : 'black'};
  color : ${(props) => props.isOpen ? 'white' : '3f3f3f'};
  opacity : ${(props) => props.isOpen ? '1' : '0.2'};
  transition : all .3s ease-out;

  &:hover {
    transform : scale(1.2);
    opacity: 1;
  }
`