const getShift = async (whenId, shortDescription = false) => {
    if (whenId !== 'now' && whenId !== 'next') {
        throw(`whenIdが不正です ${whenId}`)
    }

    const axios = require('axios');

    const url = `https://spla3.yuu26.com/api/coop-grouping/${whenId}`;
    const response = await axios.get(url)

    if (response.status >= 300) {
        throw(`スプラ3APIエラー ステータス${response.status}`);
    }

    const stage = response.data.results[0].stage.name;
    const weapons = response.data.results[0].weapons;
    const from_date = new Date(response.data.results[0].start_time);
    const to_date = new Date(response.data.results[0].end_time);
    
    if (!stage) {
        throw('ステージ情報取得失敗')
    }
    if (!weapons) {
        throw('ブキ情報取得失敗')
    }
    
    const from_word = `${from_date.getDate()}日、${getDayName(from_date)}曜${from_date.getHours()}時から`;
    const to_word = `${to_date.getDate()}日、${getDayName(to_date)}曜${to_date.getHours()}時まで`;

    let description = '';
    switch (whenId) {
        case 'now':
            description = `今のシフトは${to_word}${stage}。`;
            break;
        case 'next':
            description = shortDescription ?
                `次は${stage}。` :
                `次のシフトは${from_word}${stage}。`;
            break;
    }

    if (weapons[0].name === 'ランダム') {
        description += 'ブキはランダムです。';
    } else {
        const weapon_names = weapons.map(item => item["name"])
        description += 'ブキは'+ weapon_names.join('、') +'です。';
    }

    return description;
}

const getDayName = (date) => {
    const days = ["日", "月", "火", "水", "木", "金", "土"]

    return days[date.getDay()]
}

exports.getShift = getShift;