const AV = require('leanengine');

const APP_ID = process.env.LC_APP_ID || 'p4po2ekr5r78quspni4ryzhedfv952h3o18oacqahh7ie3k5'; // 你的 app id
const APP_KEY = process.env.LC_APP_KEY || 'rsiihnjd86pfzf7d9idxzk7kht40i5edvtlnd136bsoh5l0i'; // 你的 app key
const MASTER_KEY = process.env.LC_APP_MASTER_KEY || 'ks9nwtdabuc2kynkcxm6vtgpawfh0329rnrgm4owtwqywth7'; // 你的 master key

AV.initialize(APP_ID, APP_KEY, MASTER_KEY);

module.exports = AV

// require('./cloudFun')
