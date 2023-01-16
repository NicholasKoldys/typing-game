import styles from './Footer.module.scss'
import logo from '/cybernewtype-simpleColor-basic.svg'
import React from '../../assets/reactive-svg/React.tsx'
import Vite from '../../assets/reactive-svg/Vite.tsx'

export default function Footer() {
    return (
        <footer>
            <div className={styles.logoContainer}>
                <img src={logo} className={`${styles.icon}`} alt="Nick's logo" />
            </div>
            <div className={styles.container}>
                <h2>Created With</h2>
                <a className={styles.viteLink} href="https://vitejs.dev" target="_blank">
                    <Vite />
                    {/* <img src={viteLogo} className={`${styles.icon} ${styles.vite}`} alt="Vite logo" /> */}
                </a>
                <a className={styles.reactLink} href="https://react.dev" target="_blank">
                    <React />
                    {/* <img src={reactLogo} className={`${styles.icon} ${styles.react}`} alt="React logo" /> */}
                </a>
            </div>
        </footer>
    )
}