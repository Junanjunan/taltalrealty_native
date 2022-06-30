const today = new Date()
const tYear = today.getFullYear();
const tMonth = today.getMonth()+1;
const tDay = today.getDate();

const todayString = `${tYear}-${tMonth}-${tDay}`;

export default todayString;