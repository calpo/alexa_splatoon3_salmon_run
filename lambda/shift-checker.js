const getShiftCheckPrefix = (whenId) => {
    if (whenId === 'now') {
        return '今の';
    }

    if (whenId === 'next') {
        return '次の';
    }

    return '';
}

const getShift = (whenId) => {
    const http = require('https');
    var url = `https://spla3.yuu26.com/api/coop-grouping/${whenId}`;

    const options = {
        headers: {
            'User-Agent': 'AWS laambda(twitter@calpo22)',
        }
    };

    http.get(url, options, (res) => {
        if (res.statusCode !== 200) {
            throw (`スプラ3APIエラー ステータス ${res.statusCode}`);
        }

        res.setEncoding('utf8');

        let response_body = '';
        res.on('data', (chunk) => {
            response_body += chunk;
        }
        ).on('end', () => {
            const data = JSON.parse(response_body);
            if (!data) {
                throw (`スプラ3APIエラー JSON取得失敗`);
            }

            const shift = data.results[0];


            const info = {
                'term': '',
            };
            switch (whenId) {
                case 'now':
                    info.term = 'まで';
                    break;
                case 'next':
                    info.term = 'から';
                    break;
            }

            console.log(info)
            return;

            // objectにパースして
            var parsedValue = JSON.parse(events);
            var key1 = "results";
            const results = parsedValue[key1];
            // 必要なところを取ってきて文字列にする
            switch (wTypeStr) {
                case 'next':
                case 'now':
                    // 現在と次回のときは1つしか呼ばれない
                    results.forEach(element => {
                        const rule = element.rule.name;
                        const stages = element.stages;
                        const stage1 = stages[0].name;
                        const stage2 = stages[1].name;
                        const startTime = element.start_time;
                        const date = new Date(startTime);
                        var startTimeStr = (parseInt(date.getHours()) + 9) % 24;
                        strResponse = startTimeStr + '時からの' + bTypeStr + 'のルールは' + rule + 'で、ステージは' + stage1 + 'と' + stage2 + 'です';
                        console.log('USER_LOG: ' + strResponse);
                    });
                    break;
                case 'schedule':
                default:
                    // 現在と次回を指定しない場合は最大12個のスケジュールが取得される（多すぎるので3個目までしか出力しない）
                    var addStr = '';
                    for (let i = 0; i < 3 && i < results.length; i++) {
                        var element = results[i];
                        const rule = element.rule.name;
                        const stages = element.stages;
                        const stage1 = stages[0].name;
                        const stage2 = stages[1].name;
                        const startTime = element.start_time;
                        const date = new Date(startTime);
                        var startTimeStr = (parseInt(date.getHours()) + 9) % 24;
                        addStr += startTimeStr + '時からの' + bTypeStr + 'のルールは' + rule + 'で、ステージは' + stage1 + 'と' + stage2 + 'です。';
                        console.log('USER_LOG: ' + addStr);
                    }
                    // strResponseの内容でawaitして監視しているのでまとめ入れる
                    strResponse = addStr;
                    break;
            }
        });
    }).on('error', (e) => {
        this.emit(':tell', 'エラーです' + e.message);
    });
}

exports.getShiftCheckPrefix = getShiftCheckPrefix;
exports.getShift = getShift;