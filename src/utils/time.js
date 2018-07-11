
export function DateRange2timestampRange(value){
    let re = value.split(" - ");
    re[0] = re[0] + " 00:00:00";
    re[1] = re[1] + " 23:59:59";
    return re;
}