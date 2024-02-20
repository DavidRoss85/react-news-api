
//Converts percentage values to bootstrap column width
export const percentToCol = (value) => {
    if (value) {
        return Math.floor(12 * (parseInt(value) / 100));
    };
    return 1;
};

//--------------------------------
//Converts bootstrap column width to percentage
export const colToPercent = (value) => {
    if (value) {
        return Math.floor((parseInt(value) / 12) * 100);
    };
    return 9
};


//---------------------------------
//Returns an array:
//Based on the input value, ensures that 9<=total<=100
export const balanceArrayValues = (index = 0, newValue, vArray = [], minWidth) => {
    const MIN_WIDTH = minWidth ? minWidth : 9;


    let newArray = [...vArray]
    const numWindows = vArray.length;
    const otherWidths = vArray.map(item => item).reduce((total, num) => {
        return total + num;
    }) - vArray[index];

    newArray[index] = newValue;
    if (newArray[index] < MIN_WIDTH) {
        newArray[index] = MIN_WIDTH
    }
    const overflow = (newArray[index] + otherWidths) - 100;
    if (overflow > 0) {
        const shrinkAmount = overflow / (numWindows - 1);
        let carriedOverNum = 0;
        const newerArray = newArray.map((window, idx) => {
            if (idx === index) return window;
            const thisShrinkAmount = shrinkAmount + carriedOverNum;
            let windowWidth = window - thisShrinkAmount;
            const minDiff = MIN_WIDTH - windowWidth;
            if (minDiff > 0) {
                windowWidth = MIN_WIDTH
                carriedOverNum = minDiff
            } else {
                carriedOverNum = 0
            }
            return windowWidth;
        });
        if (carriedOverNum > 0) {
            newerArray[index] -= carriedOverNum
        }
        newArray = [...newerArray];
    }
    return newArray
}




//-------------------------------------
export const restrictArrayValues = (index = 0, newValue, vArray = [], minWidth) => {
    const MIN_WIDTH = minWidth ? minWidth : 1;
    const MAX_WIDTH = 12;

    let oldArray = vArray.map(item => {
        item = parseInt(item);
        if (item) {
            return item;
        }
        return 1;
    })
    let newArray = [...oldArray]

    //Calculate total of all values except changing element
    const otherWidths = oldArray.map(item => item).reduce((total, num) => {
        return total + num;
    }) - oldArray[index];

    //Change the desired element in new array
    newArray[index] = newValue;
    //Ensure changing value does not drop below minimum
    if (newArray[index] < MIN_WIDTH) {
        newArray[index] = MIN_WIDTH
    }

    //If total of new array is > max, limit change in element:
    //Get new total:
    const newTotal = newArray.map(item => item).reduce((total, num) => {
        return total + num;
    })
    //If new toal is > max, subtract excess from changing element:
    if (newTotal > MAX_WIDTH) {
        newArray[index] = MAX_WIDTH - otherWidths;
    };
    return newArray;
}

export const makeRoomInArray = (vArray, minWidth, maxWidth) => {
    const MIN_WIDTH = minWidth || 1;
    const MAX_WIDTH = maxWidth || 12;

    if (vArray.length < 1) {
        return [MIN_WIDTH];
    }

    let success = false;

    let oldArray = vArray.map(item => {
        item = parseInt(item);
        if (!isNaN(item)) {
            return item;
        }
        return 1;
    })
    let newArray = [...oldArray]

    const totalValue = newArray.map(item => item).reduce((total, num) => {
        return total + num;
    })

    if (totalValue >= (MAX_WIDTH - MIN_WIDTH)) {
        let newTotal = totalValue;
        for (let i = newArray.length - 1; i >= 0; i--) {
            let gap = newTotal - MAX_WIDTH + MIN_WIDTH;
            newArray[i] -= gap;
            if (newArray[i] < MIN_WIDTH) {
                newArray[i] = MIN_WIDTH;
            }
            newTotal = newArray.map(item => item).reduce((total, num) => {
                return total + num;
            })
            if (newTotal <= MAX_WIDTH - MIN_WIDTH) {
                success = true;
                break;
            }
        }
    } else {
        success = true;
    }
    if (success) {
        newArray.push(MIN_WIDTH)
        return newArray;
    } else {
        return oldArray;
    }
}
