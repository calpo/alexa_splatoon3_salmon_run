const getShiftCheckPrefix = (whenId) => {
    if (whenId === 'now') {
        return '今の';
    }
    
    if(whenId === 'next') {
        return '次の';
    }
    
    return '';
}

const getShift = (whenId) => {
    
}

exports.getShiftCheckPrefix = getShiftCheckPrefix;