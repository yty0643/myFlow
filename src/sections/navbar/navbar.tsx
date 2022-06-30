import React, { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import SecBtn from '../../components/secBtn/secBtn';
import styles from './navbar.module.css';

export interface IOnClick{
    (): void;
};

const Navbar = () => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [height, setHeight] = useState<number>(0);
    const divRef = useRef<HTMLDivElement>(null);

    const onClick: IOnClick = () => {
    };

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
        <div className={`${styles.navbar} ${isActive && styles.active}`} ref={divRef}>
            <SecBtn onClick={onClick} />
        </div>
    );
};

export default Navbar;