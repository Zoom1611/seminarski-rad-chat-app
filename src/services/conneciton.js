const CHANNEL_ID = 'uHzxYEYxfDtrix5f'
export const drone = new Scaledrone(CHANNEL_ID, {
    data: {
        name: getRandomName(),
        color: getRandomColor()
    }
});

export function getRandomName() {
    const adjs = ['illustrious', 'clear', 'slippery', 'ritzy', 'white', 'zesty', 'clear', 'miniature', 'ragged', 'drab', 'cooperative', 'windy', 'fanatical', 'optimal', 'one', 'cute', 'capable', 'literate', 'tasteful', 'shy'];
    const nouns = ['river', 'procedure', 'area', 'emotion', 'hair', 'driver', 'fact', 'town', 'problem', 'weakness', 'king', 'singer', 'expression', 'stranger', 'pie', 'meaning', 'independence', 'editor', 'emotion', 'permission'];
    return (
        adjs[Math.floor(Math.random() * adjs.length)]
        + '_' +
        nouns[Math.floor(Math.random() * nouns.length)]
    );
}

export function getRandomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = 100 + Math.floor(Math.random() * 256);
    const z = 50 + Math.floor(Math.random() * 256);
    const avatarColor = "rgb(" + x + "," + y + "," + z + ")";
 	return avatarColor;
}



export function closeConnection () {
    drone.on('close', event => {
        console.log('Connection was closed', event);
    })
}

export function errorOccurred () {
    drone.on('error', error => {
        console.log(error);
    })
}
