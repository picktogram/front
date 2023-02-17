import styled from '@emotion/styled'


export const CardContainer = styled.div`
    min-height: 600px;
    padding: 16px 20px;
    border: 1px solid black;
    border-radius: 20px;
    display: flex;
    row-gap: 1rem;
    flex-direction: column;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.05);
    }
`

export const UserInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;

    & i {
      font-size: 2rem;
    }
`

export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`

export const ImageBox = styled.div`
  width: 100%;
  background-color: lightgray;
  height: 300px;
  cursor: pointer;
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