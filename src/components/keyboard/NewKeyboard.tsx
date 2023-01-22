import styles from "./NewKeyboard.module.scss"
import rowStyles from './row/RowOfKeys.module.scss'
import RowOfKeys from "./row/RowOfKeys"

const keyBoardKeys = [
    ["`1234567890-=⌈BKSP⌋", rowStyles.numRow], 
    ["⌈TAB⌋qwertyuiop[]\\", rowStyles.topRow], 
    ["⌈CAP⌋asd⌈f _⌋gh⌈_ j⌋kl;'⌈ENT⌋", rowStyles.midRow], 
    ["⌈LSHFT⌋zxcvnm,./⌈RSHFT⌋", rowStyles.botRow]
]

const keyboardInput = (
    isActive: boolean, 
    typedKeys: string, 
    handleEnter: React.KeyboardEventHandler<HTMLInputElement>, 
    handleInput: React.ChangeEventHandler<HTMLInputElement>
): React.JSX.Element => {
    return isActive 
        ? <input className={`${styles.typedInput} ${styles.active}`} autoFocus={ true } type="text" 
            onKeyDown={(e) => handleEnter(e)} onChange={handleInput} value={typedKeys} /> 
        : <div className={styles.typedInput} />
}

export default function NewKeyBoard({ isActive, typedKeys, correctKey, handleEnter, handleInput,
}: { 
    isActive: boolean, 
    typedKeys: string, 
    correctKey: boolean,
    handleEnter: React.KeyboardEventHandler<HTMLInputElement>, 
    handleInput: React.ChangeEventHandler<HTMLInputElement>
}) {

    return (
        <>
            <RowOfKeys key={keyBoardKeys[0][1]}
                isActive={isActive}
                keys={keyBoardKeys[0][0]}
                rowType={keyBoardKeys[0][1]}
                lastTypedKey={ typedKeys && typedKeys[typedKeys.length - 1] }
                correctKey={correctKey} />
            <RowOfKeys key={keyBoardKeys[1][1]}
                isActive={isActive}
                keys={keyBoardKeys[1][0]}
                rowType={keyBoardKeys[1][1]}
                lastTypedKey={ typedKeys && typedKeys[typedKeys.length - 1] }
                correctKey={correctKey} />
            <RowOfKeys key={keyBoardKeys[2][1]}
                isActive={isActive}
                keys={keyBoardKeys[2][0]}
                rowType={keyBoardKeys[2][1]}
                lastTypedKey={ typedKeys && typedKeys[typedKeys.length - 1] }
                correctKey={correctKey} />
            <RowOfKeys key={keyBoardKeys[3][1]}
                isActive={isActive}
                keys={keyBoardKeys[3][0]}
                rowType={keyBoardKeys[3][1]}
                lastTypedKey={ typedKeys && typedKeys[typedKeys.length - 1] }
                correctKey={correctKey} />
            { keyboardInput( isActive, typedKeys, handleEnter, handleInput ) }
        </>
    )
}