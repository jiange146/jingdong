
const $ = new Env("从日志中获取互助码并格式化");
const notifyMsg = ``;
const notify = $.isNode() ? require("./sendNotify") : "";
const fs = require("fs");
const path = require("path");
$.shareCodeObj = {};
$.exportStr = "";

let fsjd_notify_control = true

if (!$.isNode()) {
  console.log("不是nodejs环境");
} else {
  if (process.env.FSJD_NOTIFY_CONTROL === "true") {
    fsjd_notify_control = false
  }

  let filePath = path.resolve(__dirname, "../log/export_sharecodes");
  let readDir = fs.readdirSync(filePath).reverse();
  let fileName;

  if (readDir && readDir.length > 0) {
    fileName = readDir[0];
  } else {
    console.log("没有生成日志，请手动运行 bash export_sharecodes.sh");
  }

  // 读取日志
  let file = path.resolve(__dirname, filePath, fileName);
  fs.readFile(file, "utf-8", function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("读取文件成功");
      // console.log(data);
      // 按 互助码  分割
      let arr = data
        .split("\n")
        .map((item) => {
          if (item === "") {
            return "$&$";
          } else {
            return item;
          }
        })
        .join("")
        .split("$&$");

      $.shareCodeObj.Bean = exportShareCodes(arr, "种豆得豆：");
      $.shareCodeObj.Fruit = exportShareCodes(arr, "东东农场：");
      $.shareCodeObj.Pet = exportShareCodes(arr, "东东萌宠：");
      $.shareCodeObj.DreamFactory = exportShareCodes(arr, "京喜工厂：");
      $.shareCodeObj.Jxnc = exportShareCodes(arr, "京喜农场：");
      $.shareCodeObj.JdFactory = exportShareCodes(arr, "东东工厂：");
      $.shareCodeObj.Joy = exportShareCodes(arr, "疯狂的JOY：");
      $.shareCodeObj.Cash = exportShareCodes(arr, "签到领现金：");
      $.shareCodeObj.Sgmh = exportShareCodes(arr, "闪购盲盒：");
      $.shareCodeObj.Cfd = exportShareCodes(arr, "京喜财富岛：");
      $.shareCodeObj.Kdsd = exportShareCodes(arr, "口袋书店：");
      $.shareCodeObj.Jdcfd = exportShareCodes(arr, "京喜财富岛：");
      $.shareCodeObj.Global = exportShareCodes(arr, "环球挑战赛：");

      showFormatMsg($.shareCodeObj);

    }
  });
}

// 通用格式化
const exportShareCodes = (arr, zhName) => {
  const resShareCodeArr = [];
  arr &&
    arr.forEach((item) => {
      if (item.startsWith(zhName)) {
        console.log(item);
        // 【 】 类型的分割
        let reg = /([：]|[：\s*]|[】])([A-Za-z0-9=\-_{}:"',]+)[\u3010]/g;
        // let reg = /）】\w+【京东/g;
        let resArr = item.match(reg);
        let itemSplits = item.split(/[】]|[：]/);
        // console.log(resArr);

        resArr &&
          resArr.forEach((item) => {
            // console.log(item);
            resShareCodeArr.push(item.slice(1, -1));
          });
        resShareCodeArr.push(itemSplits[itemSplits.length - 1]);
      }
    });
  return resShareCodeArr;
};

function showFormatMsg(shareCodeObj) {
  console.log(
    `\n========== 【格式化互助码只留随机4-5个(一定有第一个)】 ==========`
  );
  console.log(`\n提交机器人 @Turing Lab Bot\n`);
  console.log(
    `/submit_activity_codes bean ${getRandomArrayElements(
      shareCodeObj.Bean
    ).join("&")}\n`
  );
  console.log(
    `/submit_activity_codes farm ${getRandomArrayElements(
      shareCodeObj.Fruit
    ).join("&")}\n`
  );
  console.log(
    `/submit_activity_codes pet ${getRandomArrayElements(shareCodeObj.Pet).join(
      "&"
    )}\n`
  );
  console.log(
    `/submit_activity_codes jxfactory ${getRandomArrayElements(
      shareCodeObj.DreamFactory
    ).join("&")}\n`
  );
  console.log(
    `/submit_activity_codes ddfactory ${getRandomArrayElements(
      shareCodeObj.JdFactory
    ).join("&")}\n`
  );
  // 临时活动
  console.log(
    `/submit_activity_codes sgmh ${getRandomArrayElements(
      shareCodeObj.Sgmh
    ).join("&")}\n`
  );
  console.log(
    `/submit_activity_codes jxcfd ${getRandomArrayElements(
      shareCodeObj.Cfd
    ).join("&")}\n`
  );

  console.log(`\n提交机器人 @Commit Code Bot\n`);
  console.log(
    `/jdcash ${getRandomArrayElements(shareCodeObj.Cash).join("&")}\n`
  );
  console.log(
    `/jdcrazyjoy ${getRandomArrayElements(shareCodeObj.Joy).join("&")}\n`
  );

  console.log(`\n========== 【格式化互助码for docker ==========`);
  formatShareCodesForLinux(
    shareCodeObj.Bean,
    "种豆得豆",
    "MyBean",
    "ForOtherBean"
  );
  formatShareCodesForLinux(
    shareCodeObj.Fruit,
    "东东农场",
    "MyFruit",
    "ForOtherFruit"
  );
  formatShareCodesForLinux(
    shareCodeObj.Pet,
    "东东萌宠",
    "MyPet",
    "ForOtherPet"
  );
  formatShareCodesForLinux(
    shareCodeObj.Jxnc,
    "京喜农场",
    "MyJxnc",
    "ForOtherJxnc",
    "'"
  );
  formatShareCodesForLinux(
    shareCodeObj.DreamFactory,
    "京喜工厂",
    "MyDreamFactory",
    "ForOtherDreamFactory"
  );
  formatShareCodesForLinux(
    shareCodeObj.JdFactory,
    "东东工厂",
    "MyJdFactory",
    "ForOtherJdFactory"
  );
  formatShareCodesForLinux(
    shareCodeObj.Cash,
    "签到领现金",
    "MyCash",
    "ForOtherCash"
  );
  formatShareCodesForLinux(
    shareCodeObj.Joy,
    "crazy joy",
    "MyJoy",
    "ForOtherJoy"
  );
  formatShareCodesForLinux(
    shareCodeObj.Sgmh,
    "闪购盲盒",
    "MySgmh",
    "ForOtherSgmh"
  );
  formatShareCodesForLinux(
    shareCodeObj.Jdcfd,
    "京喜财富岛",
    "MyCfd",
    "ForOtherMyCfd"
  );
  formatShareCodesForLinux(
    shareCodeObj.Global,
    "环球挑战赛",
    "MyGlobal",
    "ForOtherGlobal"
  );
}

const formatShareCodesForLinux = (
  arr = [],
  name = "",
  itemName = "",
  forOtherName = "",
  marks = '"'
) => {
  // My 系列 格式化
  $.exportStr += `# ${name}\n`;
  console.log(`# ${name}`);
  const nameArr = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const log = `${itemName}${i + 1}=${marks}${item}${marks}`;
    $.exportStr += `${log}\n`;
    console.log(log);
    const name = "${" + itemName + (i + 1) + "}";
    nameArr.push(name);
  }

  // ForOther 系列 格式化
  // 以 种豆得豆 个数 为准 循环 生成 other互助  补齐 没有 互助码的号 的互助 名额
  for (let m = 0; m < $.shareCodeObj.Bean.length; m++) {
    // for (let m = 0; m < nameArr.length; m++) {
    // const item = nameArr[m]
    // console.log(
    //   `${forOtherName}${m + 1}='${nameArr
    //     .filter(cell => cell !== item)
    //     .join('@')}'`
    // )
    const log = `${forOtherName}${m + 1}="${nameArr.join("@")}"`;
    $.exportStr += `${log}\n`;
    console.log(log);
  }
};

// 随机区 数组中的 几个元素， 必有 第一个元素
function getRandomArrayElements(arr = [], count = 4) {
  if (arr.length <= 5) {
    return arr;
  } else {
    let shuffled = arr.slice(0),
      i = arr.length,
      min = i - count,
      temp,
      index;
    while (i-- > min) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
    }
    const res = [arr[0], ...shuffled.slice(min)];
    return [...new Set(res)];
  }
};
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}