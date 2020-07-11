export const getImage = (num) => {
    if(!num) return '';
    const str = num < 10 ? `0${num}` : `${num}`;
    return `https://developer.accuweather.com/sites/default/files/${str}-s.png`
}