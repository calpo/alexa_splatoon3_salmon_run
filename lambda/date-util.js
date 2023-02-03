
const getDayName = (date) => {
    const days = ["日", "月", "火", "水", "木", "金", "土"]

    return days[date.getDay()]
}

/**
 * 実行環境のタイムゾーンが日本以外の場合に、見た目が日本時間と同じになるよう時刻をずらす
 * これによりTZ=America/New_Yorkなどの環境下でdate.getHour()等した際にTZ=Asia/Tokyo下での実行時と同じ結果を得られる。
 * @param {Date} date 日時
 * @returns Date
 */
const fakeToJst = (date) => {
    // TZ=Asia/Tokyo環境下ではdate.getTimezoneOffset()は-9時間(-9 * 60)を返す
    // 日本のタイムゾーンで動作できている場合は補正なしの日時が返る
    return new Date(date.getTime() + ((date.getTimezoneOffset() + (9 * 60)) * 60 * 1000));
}

const getRelativeDayName = (target, now = null) => {
    now = now || new Date()

    now = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    )
    target = new Date(
        target.getFullYear(),
        target.getMonth(),
        target.getDate()
    )

    switch ((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) {
        case 0:
            return '今日'
        case 1:
            return '明日'
        case 2:
            return '明後日'
        case -1:
            return '昨日'
        default:
            return target.getDate() + '日'
    }

    return '今日'
}

exports.getDayName = getDayName
exports.fakeToJst = fakeToJst
exports.getRelativeDayName = getRelativeDayName
