import styles from './Pad.module.scss'

export default function Pad({ specialClass, innerChar }: { specialClass: string, innerChar: string }) {
    return (
        <div className={`${styles.pad} ${specialClass}`}>
            { innerChar }
        </div>
    )
}