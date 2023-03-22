const shiftChecker = require('../shift-checker')
const axios = require('axios')

jest.mock('axios')

test('今のバイトシフトを返す', async () => {
    axios.get.mockResolvedValue({
        "status": 200,
        "data": require('../../stub/json/coop-grouping.now.json')
    })

    speakOut = await shiftChecker.getShift('now')

    expect(speakOut).toBe("今のシフトは12日、月曜9時までスメーシーワールド。ブキはランダムです。")
})

test('今のバイトシフト終了時刻を返す', async () => {
    axios.get.mockResolvedValue({
        "status": 200,
        "data": require('../../stub/json/coop-grouping.now.json')
    })

    speakOut = await shiftChecker.getEndingTime()

    expect(speakOut).toBe("スメーシーワールドのシフトは12日、9時までまでです。")
})