import { useState } from 'react'
import styles from './SettingsView.module.scss'
import { ResetHandler } from '../../pages/index/Index'
import { W_ID, W_LENGTH } from '../../util/global-var'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SettingsView({ handleReset }: { handleReset: ResetHandler }) {
    const [ letterRange, setLetterRange ] = useState( W_LENGTH )
    const [ selectedList, setList ] = useState( W_ID )

    function handleLetterRange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event?.currentTarget) {
            setLetterRange(Number(event.currentTarget.value))
        }
    }

    return (
        <div className={styles.settings}>
            <label className={styles.wordLength} htmlFor="letter-range">Word Length: { ' ' + letterRange }
                <input id={styles.letterRange} type='range' min={1} max={10} onChange={handleLetterRange} value={letterRange} />
            </label>
            <fieldset className={styles.keySelection}>
                <legend>Key Selection</legend>
                <label htmlFor={styles.homeRow}>
                    <input id={styles.homeRow} type='radio' checked={ selectedList === 0 } onChange={() => setList(0)} />
                    <span/>
                    Home</label>
                <label htmlFor={styles.TopRow}>
                    <input id={styles.topRow} type='radio' checked={ selectedList === 1 } onChange={() => setList(1)} />
                    <span/>
                    Top+Home</label>
                <label htmlFor={styles.botRow}>
                    <input id={styles.botRow} type='radio' checked={ selectedList === 2 } onChange={() => setList(2)} />
                    <span/>
                    Bot+Home</label>
                <label htmlFor={styles.allRow}>
                    <input id={styles.allRow} type='radio' checked={ selectedList === 3 } onChange={() => setList(3)} />
                    <span/>
                    All-Rows</label>
            </fieldset>
            <div className={styles.resetContainer} >
                <button className={styles.resetBtn} onClick={ () => handleReset( selectedList, letterRange )}>reload</button>
            </div>
        </div>
    )
}