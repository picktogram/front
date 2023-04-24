import styled from "@emotion/styled";

export const Container = styled.section`
    display: grid;
    grid-template-columns: 70% 30%;
    gap: 1rem;
`

export const LeftSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    border-right: 1px solid black;
`

export const UserInfo = styled.div`
    width: 100%;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 1rem;
    border-bottom : 1px solid black;
`

export const UserImageBox = styled.div`
`

export const UserArticle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`