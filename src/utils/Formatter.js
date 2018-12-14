export const toDollar = (price) => {
    return '$' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.00';
}

export const getTime = (time) => {
    const date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

export const getDate = (time) => {
    const date = new Date(time);
    const months = date.getMonth();
    const curDate = date.getDate();
    let strDate = curDate + '/' + months;
    return strDate;
}