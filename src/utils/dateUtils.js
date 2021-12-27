const { DateTime, Interval } = require("luxon");

const getExpiryDate = () => {

    const startTime = DateTime.now();
    let endTime = DateTime.now().endOf('week').minus({days: 1})

    if (startTime > endTime) {
        endTime = DateTime.now().endOf('week').plus({days: 6})
    }

    const interval = Interval.fromDateTimes(startTime, endTime).length('milliseconds');

    return interval
}

const getStartAndEndTime = () => {
    const day = DateTime.now().weekday

    let startTime;
    let endTime;

    if (day === 7) {
        startTime = DateTime.now().startOf('week').minus({days: 1}).toISO({ suppressMilliseconds: true, includeOffset: false });
        endTime = DateTime.now().startOf('day').toISO({ suppressMilliseconds: true, includeOffset: false });
    } else {
        startTime = DateTime.now().startOf('week').minus({days: 8}).toISO({ suppressMilliseconds: true, includeOffset: false });
        endTime = DateTime.now().startOf('week').minus({days: 1}).toISO({ suppressMilliseconds: true, includeOffset: false });
    }
    return {
        startTime: startTime,
        endTime: endTime
    }
}

exports.getExpiryDate = getExpiryDate;
exports.getStartAndEndTime = getStartAndEndTime