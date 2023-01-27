const dateUtil = require('../date-util.js')

describe.each([
    ['2023-01-27 00:00:00', '金'],
    ['2023-01-27 23:59:59', '金'],
    ['2023-01-28 00:00:00', '土'],
    ['2023-01-29 00:00:00', '日'],
    ['2023-01-30 00:00:00', '月'],
    ['2023-01-31 00:00:00', '火'],
    ['2023-02-01 00:00:00', '水'],
    ['2023-02-02 00:00:00', '木'],
])('日付に対応する曜日を返す', (dateString, expected) => {
    test(`${dateString} は ${expected}曜日`, () => {
        expect(dateUtil.getDayName(new Date(dateString))).toBe(expected)
    })
})