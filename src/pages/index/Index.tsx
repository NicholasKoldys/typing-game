// import App from '../../components/app/App.tsx'
import { useState } from 'react'
import NewApp from '../../components/app/NewApp.tsx'
import Footer from '../../components/footer/Footer.tsx'
import generateWords from '../../util/generate-words.tsx'
import { W_COUNT, W_ID, W_LENGTH } from '../../util/global-var.tsx'

export type WordListHandler = ( wordList: number ) => void
export type WordRangeHandler = ( wordRange: number ) => void
export type ResetHandler = ( wordList: number, wordLength: number) => void

const wordLists = [
    'asdfjkl;gh',
    'asdfjkl;ghqwertyuiop[',
    'asdfjkl;ghzxcvbnm,./',
    'asdfjkl;ghqwertyuiop[zxcvbnm,./'
]

export default function Index() {
    const [ wordList, setWordList ] = useState( generateWords(wordLists[ W_ID ], W_LENGTH, W_COUNT) )

    const handleReset: ResetHandler = (id, length) => {
        const newList = generateWords(wordLists[id], length, W_COUNT)
        setWordList( newList )
        console.log('words -- ', newList )
    }

    return (
        <>
            <NewApp handleReset={handleReset} wordList={wordList} />
            <Footer />
        </>
    )
}