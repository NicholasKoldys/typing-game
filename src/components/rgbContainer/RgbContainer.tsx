import styles from './RgbContainer.module.scss'

type ContainerProps = {
    isActive: boolean
}

export default function RgbContainer(props: React.PropsWithChildren<ContainerProps>) {

    return (
        <div className={`${styles.container} ${props.isActive ? styles.active : ''}`}>
            {props.children}
        </div>
    )
}