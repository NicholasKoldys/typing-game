import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './NewApp.module.scss'
import PowerOn from '../../assets/reactive-svg/PowerOn';
import WordDisplay from "../wordDisplay/WordDisplay"
import PausableContainer from '../pausedContainer/PausableContainer';
import SettingsView from '../settingsView/SettingsView';
import NewKeyBoard from '../keyboard/NewKeyboard';
import RgbContainer from '../rgbContainer/RgbContainer';
import { ResetHandler } from '../../pages/index/Index';
import WordList from '../wordList/WordList';
import { W_ID, W_LENGTH } from '../../util/global-var';


export default function NewApp({ handleReset, wordList }: { handleReset: ResetHandler, wordList: string[] } ) {
    const [ selection, setSelection ] = useState({ id: W_ID, length: W_LENGTH })
    const [ isFocused, setIsFocused ] = useState(false)
    const [ typedKeys, setTypedKeys ] = useState({ keys: '', init: 0, lapse: 0, 
        wpm: localStorage.getItem('wpm') ? Number(localStorage.getItem('wpm')) : 0 })
    const [ count, setCount ] = useState(0)
    const [ word, setWord ] = useState(wordList ? wordList[0] : "Hello World")

    const iter = useRef(localStorage.getItem('iter') ? Number(localStorage.getItem('iter')) : 0)
    
    useEffect(() => {
        setCount( 0 )
        setWord( wordList ? wordList[0] : "Click Reset" )
        setTypedKeys({ keys: '', init: 0, lapse: 0, wpm: localStorage.getItem('wpm') ? Number(localStorage.getItem('wpm')) : 0 })
    }, [wordList])

    const resetTyped = useCallback((prevWPM: number) => {
        setTypedKeys({ keys: '', init: 0, lapse: 0, wpm: prevWPM })
        console.log('reset');
    }, [])

    const calcWPMAvg = useCallback((lapse: number, init: number, letterCount: number, prevWPM: number, iter: number) => {
        console.log(lapse, ' ', init, ' ', letterCount, ' ', prevWPM, ' ', iter);
        if(lapse != 0 && init != 0 && iter != 0) 
            return Number((( (prevWPM < 999 ? prevWPM : 999 ) 
                + ( (letterCount * (1/letterCount) ) / ((lapse - init) / 60) )
                ) / iter).toFixed(2))
        else return prevWPM
    }, [])

    function handleFocus(event: React.MouseEvent) {        
        if(!isFocused) {
            event.preventDefault()
            event.stopPropagation()
            setIsFocused(true)
            setWord(wordList[count])
            resetTyped(typedKeys.wpm)
        }
    }

    function handleUnFocus() {
        if(isFocused) {
            setIsFocused(false)
            resetTyped(typedKeys.wpm)
        }
    }

    function handleEnter(event: React.KeyboardEvent<HTMLInputElement>) {
        if(event?.currentTarget) {
            if(event.code === 'Enter') {                
                if(typedKeys.keys === word) {
                    resetTyped(typedKeys.wpm)
                    let newCount = 0
                    if (wordList.length - 1 != count) {
                        newCount = count + 1
                        iter.current++
                        localStorage.setItem('iter', String(iter.current))
                        setCount( newCount )
                        setWord( wordList ? wordList[newCount] : word + newCount )
                    } else {
                        handleResetPassThrough(selection.id, selection.length)
                    }
                }
            }
        }
    }

    function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
        if(event?.currentTarget) {

            let initVal = typedKeys.init != 0 ? typedKeys.init : 0;
            if(initVal == 0) {
                initVal = Number((new Date().getTime() / 1000).toFixed(2))
            }

            const newLapse = Number((new Date().getTime() / 1000).toFixed(2))

            if(event.currentTarget.value === word) {
                const calced = calcWPMAvg(newLapse, initVal, selection.length, typedKeys.wpm, iter.current)
                setTypedKeys({ keys: event.currentTarget.value, init: initVal, lapse: newLapse, wpm: calced });
                localStorage.setItem('wpm', String(calced))
            }
            else 
                setTypedKeys({ ...typedKeys, keys: event.currentTarget.value, init: initVal, lapse: newLapse })
        }
    }

    const handleResetPassThrough: ResetHandler = (id, length) => {
        setSelection({id: id, length: length})
        handleReset(id, length)
        setCount(0)
    }

    return (
        <div className={styles.app}>
            <SettingsView handleReset={handleResetPassThrough} />
            <WordList currWordList={wordList} currIndex={count} />
            <PausableContainer isFocused={isFocused} handleFocus={handleFocus} handleUnFocus={handleUnFocus} >
                <RgbContainer isActive={isFocused} >
                    <WordDisplay isActive={isFocused} displayWord={isFocused ? word : 'Click To Play'} typedKeys={typedKeys.keys} 
                        correctKey={word.includes(typedKeys.keys)} 
                        wpm={ typedKeys.wpm } />
                    <NewKeyBoard isActive={isFocused} typedKeys={typedKeys.keys} correctKey={ word.includes(typedKeys.keys) } handleEnter={handleEnter} handleInput={handleInput} />
                    <PowerOn isActive={isFocused} />
                </ RgbContainer>
            </ PausableContainer>
        </div>
    )
}