import { useMemo } from 'react'
import styles from './RowOfKeys.module.scss'
import keyStyles from './keyPad/Pad.module.scss'
import Pad from './keyPad/Pad'

function getPadArray( rowString: string, pressedKey: string, isCorrect: boolean, ...classes: string[] ) {
    const arr: Array<React.ReactElement> = []
    let specialKey = ''
    let flag = false
    
    for (const c of rowString) {
        if (c === '⌈') {
            flag = true
            continue
        }
        if (c === '⌋') {
            flag = false
            arr.push(
                <Pad key={specialKey} 
                // ${ keyStyles[specialKey.replace('_', '').trim()] } 
                    specialClass={`
                        ${ keyStyles.homeKey } 
                        ${ classes ? classes.join(' ') : '' } 
                        ${ pressedKey != '' && specialKey.replace('_', '').trim() === pressedKey ? keyStyles.pressedKey : '' }
                        ${ pressedKey != '' && specialKey.replace('_', '').trim() === pressedKey && isCorrect ? keyStyles.correct : '' }
                        ${ pressedKey != '' && specialKey.replace('_', '').trim() === pressedKey && !isCorrect ? keyStyles.wrong : '' }
                    `}
                    innerChar={specialKey}
                />
            );
            specialKey = ''
            continue
        }
        if(flag) {
            specialKey += c
            continue
        } else {
            arr.push(
                <Pad key={c} 
                    specialClass={`
                        ${ classes ? classes.join(' ') : '' } 
                        ${ pressedKey != '' && c === pressedKey ? keyStyles.pressedKey : '' }
                        ${ pressedKey != '' && c === pressedKey && isCorrect ? keyStyles.correct : '' }
                        ${ pressedKey != '' && c === pressedKey && !isCorrect ? keyStyles.wrong : '' }
                    `}
                    innerChar={c}
                />
            );
        }
    }
    return arr;
}

export default function RowOfKeys({ isActive, rowType, keys, lastTypedKey, correctKey }
: { isActive: boolean, rowType: string, keys: string, lastTypedKey: string, correctKey: boolean }) {

    const keyPadRow = useMemo(() => {
        return (
            <div className={`${styles.mapRow} ${rowType}`}>
                { getPadArray( keys, lastTypedKey, correctKey, 
                    ( isActive ? styles.active : '' )
                ) }
            </div>
        )
    }, [isActive, rowType, keys, lastTypedKey, correctKey])

    return (
        <>
            { keyPadRow }
        </>
    )
}