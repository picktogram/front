import { mediaQuery } from "@/styles/media";
import styled from "@emotion/styled";

export const Container = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 1rem;
    background-color: white;
    border: 1px solid lightgray;

    ${mediaQuery[4]} {
        width: 1400px;
        margin: 0 auto;
    }
`

export const LeftSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-right: 1px solid lightgray;
`

export const UserInfo = styled.div`
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1rem;
    border-bottom : 1px solid lightgray;
`

export const UserName = styled.div`
    font-size: 3rem;
`

export const UserNickName = styled(UserName)`
    font-size: 1rem;
`
export const UserImageBox = styled.div`
`

export const Button = styled.button`
    width: 150px;
    height: 50px;
    padding: 1rem;
    border: none;
    background-color: dodgerblue;
    color : white;
    border-radius: 20px;
`

export const UserIntroduce = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

export const UserArticle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const ProfileImage = styled.div<{
    background : string | null | undefined
  }>`
    width: 120px;
    height: 120px;
    background-image: url(${(props) => props.background ? props.background : '/images/placeholder.png'});
    background-size: cover;
    background-repeat: no-repeat;
  `