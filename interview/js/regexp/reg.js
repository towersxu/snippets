let str = 'aaa__a__aaa__aa_aa'

let r = /aaa/g;

const r2 = /^\p{Number}+$/u;

console.log(r2.test('ⅠⅡⅢⅣⅤⅥⅧⅨⅩⅪⅫ')) // true

let str1 = '19910101'
const RE_DATE = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const {groups: {year='2000', month='01', day='01'} = {}} = RE_DATE.exec(str) || {};
console.log(year, month, day)

let str2 = '张三的爸爸叫张二，他爷爷叫张一'
const RE_1 = /^(?<firstName>.{1})三的爸爸叫\k<firstName>二，他爷爷叫\k<firstName>一/
console.log(RE_1.test(str2))
