import styles from './WordList.module.scss'

export default function WordList({ currWordList, currIndex }: { currWordList: string[], currIndex: number }) {
    return (
        <div className={styles.wordList}>
            <ul>
                { currWordList.map( (value, index) => <li key={index} className={ currIndex === index ? styles.selected : ''} >{value}</li> ) }
            </ul>
        </div>
    )
}