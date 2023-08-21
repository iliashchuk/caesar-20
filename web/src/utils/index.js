export function getOpponentSide(side) {
    switch (side) {
        case 'caesar':
            return 'pompey';
        case 'pompey':
            return 'caesar';
    }
}
