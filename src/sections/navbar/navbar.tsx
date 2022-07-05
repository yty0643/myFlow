import React, {  useEffect, useState } from 'react';
import styled from 'styled-components';
import { IOnClick } from '../../App';
import { useAppSelector } from '../../app/hooks';
import SecBtn from '../../components/secBtn/secBtn';
import ThemeToggle from '../../components/themeToggle/themeToggle';

interface IHeader{
    isActive: boolean;
    isDark: boolean;
}

const Header = styled.header<IHeader>`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2rem;
    padding: 0 20%;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
    transition: all ease-in 100ms;
    ${({ isActive }) => isActive && `
        height:4rem;
    `}
    ${({ isDark })=> (isDark && `border-bottom: 0.5px solid rgb(50,50,50);`)}
    ${({ theme, isDark }) => {
        const bgcolor = theme.sectionColors.navbar[isDark ? "black" : "white"];
        return `
            background-color: ${bgcolor};
        `
    }}
`

const Div = styled.div`
    display: flex;
    align-items: center;
`

const Navbar = ({ focusIdx, onClick }: { focusIdx: number, onClick: IOnClick }) => {
    const isDark = useAppSelector(state => state.theme.isActive);
    const [isActive, setIsActive] = useState<boolean>(true);
    const [height, setHeight] = useState<number>(0);
    const sections = ['Sign', 'Flow'];

    useEffect(() => {
        const scroll = () => {
            if (!(window.scrollY > 64)) return;
            setHeight((prev) => {
                setIsActive(prev > window.scrollY);
                return window.scrollY;
            });
        };
        window.addEventListener("scroll", scroll);
        return () => {
            window.removeEventListener("scroll", scroll);
        }
    }, []);

    return (
        <Header isDark={isDark} isActive={isActive}>
            <div>
                logo
            </div>
            <Div>
                {sections.map((item, index) => <SecBtn key={index} isActive={index == focusIdx} index={index} onClick={onClick}>{item}</SecBtn>)}
                <ThemeToggle />
            </Div>
        </Header>
    );
};

export default Navbar;