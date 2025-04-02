export function getTime(date: string){
    // DD/MM/YYYY -> Date
    const [day, month, year] = date.split('/');
    return new Date(+year, +month-1, +day).getTime();
}

export function getDate(time: string) {

}