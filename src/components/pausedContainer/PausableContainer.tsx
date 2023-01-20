import styles from './PausableContainer.module.scss'

type ClickableContainerProps = {
    isFocused: boolean,
    handleFocus: React.MouseEventHandler<HTMLInputElement>, 
    handleUnFocus: React.FocusEventHandler<HTMLInputElement>
}

export default function PausableContainer( { isFocused, handleFocus, handleUnFocus, children}: React.PropsWithChildren<ClickableContainerProps> ) {

    return (
        <div className={`${styles.container} ${styles.overlay} ${ !isFocused ? styles.hidden : '' }`} 
            onMouseDown={handleFocus} 
            onBlur={handleUnFocus} >
                { children }
        </div>
    )
}