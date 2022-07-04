import React, {  useEffect, useState } from 'react';
import SecBtn from '../../components/secBtn/secBtn';
import styles from './navbar.module.css';

const Navbar = () => {
    const [isActive, setIsActive] = useState<boolean>(true);
    const [height, setHeight] = useState<number>(0);


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
        <div className={`${styles.navbar} ${isActive && styles.active}`}>
            <SecBtn  />
        </div>
    );
};

export default Navbar;