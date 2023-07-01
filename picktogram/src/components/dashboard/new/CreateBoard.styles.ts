import styled from '@emotion/styled'

export const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  width: 100%;
  background-color: white;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 1200px;
  margin: 0 auto;
  padding: 3rem;
  border: 1px solid lightgray;
  border-radius: 15px;
`
export const UserProfile = styled.div`
  width: 100%;
  display: flex;
  column-gap: 1rem;
`

export const UserImage = styled.div<{
  background : string | null | undefined
}>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${(props) => props.background ? props.background : 'images/placeholder.png'});
  background-size: cover;
  background-repeat: no-repeat;
`

export const Username = styled.div`
  font-size: 2rem;
`

export const Input = styled.textarea`
    position: relative;
    padding: 2rem;
    width: 100%;
    height: 500px;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 1rem;
    background-color: rgb(233, 233, 233);
    resize: none;

    &:focus {
      border: 1px solid gray
    }
`

export const ImageBox = styled.div`
  width: 100%;
  min-height: 150px;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  border-radius: 15px;
  padding: 1rem;
  background-color: rgb(233, 233, 233);
`

export const Button = styled.button`
  height: 50px;
  border: none;
  border-radius: 15px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }
`