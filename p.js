function giveChar(arr) {
    let capital = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
    ];
    let result = [];
    let lower = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < arr.length; i++) {
        bag = '';
        for (let j = 0; j < arr[i].length; j++) {
            for (let k = 0; k < capital.length; k++) {
                if (arr[i][j] == capital[k]) {
                    bag = bag + lower[k];
                }
            }
        }
        result.push(bag);
    }
    console.log(result);
}

giveChar(['MA', 'SA', 'I', 'SCH', 'OOL']);
