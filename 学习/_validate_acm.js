const fs = require('fs');
const html = fs.readFileSync('访问控制模型_学习.html', 'utf-8');
const m = html.match(/const QA\s*=\s*(\[[\s\S]*?\]);/);
if (!m) { console.error('未找到 QA 数组'); process.exit(1); }
const QA = eval(m[1]);
let pass = true;
const expectAns = {
 '1':'D','2':'C','3':'C','4':'A','5':'A','6':'D','7':'A','8':'ABCD','9':'错误',
 '10':'ABD','11':'A','12':'A','13':'B','14':'D','15':'A','16':'ACD','17':'A','18':'C',
 '19':'ABCD','20':'A','21':'正确','22':'B','23':'正确','24':'错误'
};
console.log('题量:', QA.length);
if (QA.length !== 24) { console.error('✗ 题量错误，应为24'); pass=false; }
let dup=0, edge=0;
QA.forEach(q=>{
  const num=q[0], stem=q[1], opts=q[2], ans=q[3], analysis=q[4];
  const tag=(q.length===6)?q[5]:'';
  if(tag==='dup') dup++; if(tag==='edge') edge++;
  if(!stem||!opts||!ans||!analysis){ console.error('✗ 题'+num+' 存在空字段'); pass=false; }
  const parts=analysis.split('｜');
  if(parts.length!==4){ console.error('✗ 题'+num+' 四要素段数='+parts.length); pass=false; }
  if(expectAns[num]!==undefined && ans!==expectAns[num]){
    console.error('✗ 题'+num+' 答案不符：解析='+ans+' 期望='+expectAns[num]); pass=false;
  }
});
console.log('dup 标签数:', dup, ' edge 标签数:', edge);
console.log(pass ? 'ALL PASS ✅' : '存在错误 ❌');
process.exit(pass?0:1);
