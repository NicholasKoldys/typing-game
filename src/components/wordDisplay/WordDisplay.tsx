import styles from './WordDisplay.module.scss'


export default function WordDisplay({ isActive, displayWord, typedKeys, correctKey, wpm }
: { isActive: boolean, displayWord: string, typedKeys: string, correctKey: boolean, wpm: number } ) 
{

    // && typedKeys[typedKeys.length - 1]
    return (
        <>
            <div className={`${styles.display} ${ isActive ? styles.active : '' }`} >
                <div className={styles.wpm}>wpm: {wpm}</div>
                <span className={`
                        ${styles.typed} 
                        ${ correctKey && typedKeys.length === displayWord.length ? styles.complete : '' }
                    `} >
                    { typedKeys != '' && typedKeys.slice( 0, typedKeys.length - 1 ) }
                </span>
                <span className={`
                        ${styles.lastKey} 
                        ${ correctKey ? styles.correct : styles.wrong }
                        ${ correctKey && typedKeys.length === displayWord.length ? styles.complete : '' }
                    `} >
                    { typedKeys != '' && typedKeys[ typedKeys.length - 1 ] }
                </span>
                <span className={
                        styles.leftover
                    } >
                    { typedKeys != '' && displayWord.slice( typedKeys.length ) }
                </span>
                { typedKeys === '' && displayWord }
            </div>
        </>
    )
}