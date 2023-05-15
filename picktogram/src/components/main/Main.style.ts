import { mediaQuery } from '@/styles/media'
import styled from '@emotion/styled'

export const Container = styled.div`
    position: relative;
    background-color: #f3f2ef;
    padding-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column-reverse;

    ${mediaQuery[3]} {
        margin: 0 auto;
        width: 1200px;
        flex-direction: row;
        gap: 20px;
    }

    ${mediaQuery[4]}{
        width: 1800px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);

    }
`

export const Section = styled.div`
`

export const RightSection = styled.div`
    display: none;

    ${mediaQuery[4]} {
        display: block;
    }
`

export const LeftSection = styled(Section)`
    position: relative;
`

export const LeftContents = styled.div`
    width: 100%;
    height: 800px;
    flex-direction: column;
    display: none;

    ${mediaQuery[3]} {
        display: flex;
        row-gap: 1rem;
        position: fixed;
        overflow-y: scroll;
    }
`

export const BottomMenu = styled.div<{
    isTop : boolean | undefined
}>`
    width: 300px;
    position: fixed;
    right: 20px;
    bottom: ${(props) => props.isTop ? '20px' : '-100%'};
    transition: all .2s ease-in-out;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const ToTheTopButton = styled.button`
    width: 75px;
    height: 75px;
    background-color: dodgerblue;
    color : white;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    cursor: pointer;

    &:hover {
        background-color: black;
    }
`

export const CreateButton = styled(ToTheTopButton)`
    width: 150px;
    height: 50px;
    padding: 1rem;
    border-radius: 20px;
    font-size: 1rem;
`