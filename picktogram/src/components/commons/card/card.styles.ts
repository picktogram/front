import styled from '@emotion/styled'

export const CardContainer = styled.div`
    position: relative;
    width: 800px;
    margin: 0 auto;
    min-height: 300px;
    padding: 16px 20px;
    border-radius: 20px;
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease;
    background-color: white;
    margin-bottom: 20px;
    border: 1px solid lightgray;
`

export const UserInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 1rem;

    & i {
      font-size: 2rem;
    }
`

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

export const ImageBox = styled.div<{
  background : string;
}>`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: url(${(props) => props.background ? props.background : ''});
  background-size: cover;
  background-repeat: no-repeat;
  cursor: pointer;

  &:hover {
    &::after {
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.4);
    }
  }
`

export const ProfileImage = styled.div<{
  background : string | null | undefined
}>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${(props) => props.background ? props.background : '/images/placeholder.png'});
  background-size: cover;
  background-repeat: no-repeat;
`

export const Menu = styled.div`
  display: flex;
  width: 100%;
  border-top : 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`
export const Like = styled.button`
  width: 50%;
  padding: 16px;
  border: none;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #b8b8b8;
  }
`

export const CommentMore = styled(Like)`
  border-left: 1px solid lightgray;
`

export const More = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  top: 1rem;
  right: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  color: lightgray;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: gray;
  }
`

export const Modal = styled.div`
  position: absolute;
  top: 3rem;
  right: 3rem;
  width: 200px;
  min-height: 300px;
  background-color: white;
  z-index: 2000;
`

export const ModalHidden = styled(Modal)`
  visibility: hidden;
`

export const CommentsLength = styled.div`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`