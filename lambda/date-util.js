
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

exports.getDayName = getDayName
exports.fakeToJst = fakeToJst
