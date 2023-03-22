const dateUtil = require('./date-util.js');

const getShiftDetail = async (whenId) => {
    if (whenId !== 'now' && whenId !== 'next') {
        throw (`whenIdが不正です ${whenId}`)
    }

    const axios = require('axios');

    const url = `https://spla3.yuu26.com/api/coop-grouping/${whenId}`;
    const response = await axios.get(url)

    if (response.status >= 300) {
        throw (`スプラ3APIエラー ステータス${response.status}`);
    }

    const stage = response.data.results[0].stage.name;
    const weapons = response.data.results[0].weapons;
    const from_date = dateUtil.fakeToJst(new Date(response.data.results[0].start_time));
    const to_date = dateUtil.fakeToJst(new Date(response.data.results[0].end_time));

    if (!stage) {
        throw ('ステージ情報取得失敗')
    }
    if (!weapons) {
        throw ('ブキ情報取得失敗')
    }

    const from_word = `${from_date.getDate()}日、${dateUtil.getDayName(from_date)}曜${from_date.getHours()}時から`;
    const to_word = `${to_date.getDate()}日、${dateUtil.getDayName(to_date)}曜${to_date.getHours()}時まで`;
    const from_relative = `${dateUtil.getRelativeDayName(from_date)}、${from_date.getHours()}時から`;
    const to_relative = `${dateUtil.getRelativeDayName(to_date)}、${to_date.getHours()}時まで`;

    return {
        'stage': stage,
        'weapons': weapons,
        'from_date': from_date,
        'to_date': to_date,
        'from_word': from_word,
        'to_word': to_word,
        'from_relative': from_relative,
        'to_relative': to_relative,
    }
}

const getShift = async (whenId) => {
    const shift = await getShiftDetail(whenId)

    let description = '';
    switch (whenId) {
        case 'now':
            description = `今のシフトは${shift.to_word}${shift.stage}。`;
            break;
        case 'next':
            description = `次のシフトは${shift.from_word}${shift.stage}。`;
            break;
    }

    if (shift.weapons[0].name === 'ランダム') {
        description += 'ブキはランダムです。';
    } else {
        const weapon_names = shift.weapons.map(item => item["name"])
        description += 'ブキは' + weapon_names.join('、') + 'です。';
    }

    return description;
}

const getEndingTime = async () => {
    const shift = await getShiftDetail('now')

    const description = `${shift.stage}のシフトは${shift.to_relative}までです。`;

    return description;
}

exports.getShift = getShift;
exports.getEndingTime = getEndingTime;