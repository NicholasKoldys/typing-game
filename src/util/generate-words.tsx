export default function generateWords( containStr: string, length: number, amount: number ): string[] {

    const wordArr: string[] = [];
    
    for( let i = 0; i < amount; i++ ) {
        let tempStr = ''
        for( let j = 0; j < length; j++ ) {
            tempStr += containStr[ Math.floor(Math.random() * containStr.length) ]
        }
        wordArr.push(tempStr)
    }

    return wordArr;
}