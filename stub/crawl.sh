#!/bin/sh
curl https://spla3.yuu26.com/api/regular/now > ./json/regular.now.json
curl https://spla3.yuu26.com/api/regular/next > ./json/regular.next.json
curl https://spla3.yuu26.com/api/regular/schedule > ./json/regular.schedule.json

curl https://spla3.yuu26.com/api/bankara-challenge/now > ./json/bankara-challenge.now.json
curl https://spla3.yuu26.com/api/bankara-challenge/next > ./json/bankara-challenge.next.json
curl https://spla3.yuu26.com/api/bankara-challenge/schedule > ./json/bankara-challenge.schedule.json

curl https://spla3.yuu26.com/api/bankara-open/now > ./json/bankara-open.now.json
curl https://spla3.yuu26.com/api/bankara-open/next > ./json/bankara-open.next.json
curl https://spla3.yuu26.com/api/bankara-open/schedule > ./json/bankara-open.schedule.json

curl https://spla3.yuu26.com/api/fest/now > ./json/fest.now.json
curl https://spla3.yuu26.com/api/fest/next > ./json/fest.next.json
curl https://spla3.yuu26.com/api/fest/schedule > ./json/fest.schedule.json

curl https://spla3.yuu26.com/api/x/now > ./json/x.now.json
curl https://spla3.yuu26.com/api/x/next > ./json/x.next.json
curl https://spla3.yuu26.com/api/x/schedule > ./json/x.schedule.json

curl https://spla3.yuu26.com/api/coop-grouping/now > ./json/coop-grouping.now.json
curl https://spla3.yuu26.com/api/coop-grouping/next > ./json/coop-grouping.next.json
curl https://spla3.yuu26.com/api/coop-grouping/schedule > ./json/coop-grouping.schedule.json
