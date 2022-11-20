export const priceConvert = (price) => {
    if (price >= 0.005) {
        return Number(Number(price).toFixed(4)).toLocaleString(undefined, { maximumFractionDigits: 4, minimumFractionDigits: 2 })
    }
    else {
        let numfix = 0;
        for (let num of price) {
            if (num === '0' || num === '.') {
                numfix++;
            }
            else {
                break;
            }
        }
        return Number(price).toFixed(numfix + 2);
    }
};