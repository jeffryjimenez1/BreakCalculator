(()=>{var t={484:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,i="millisecond",n="second",s="minute",r="hour",a="day",o="week",u="month",d="quarter",c="year",l="date",h="Invalid Date",f=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,v=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],i=t%100;return"["+t+(e[(i-20)%10]||e[i]||e[0])+"]"}},$=function(t,e,i){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(i)+t},M={s:$,z:function(t){var e=-t.utcOffset(),i=Math.abs(e),n=Math.floor(i/60),s=i%60;return(e<=0?"+":"-")+$(n,2,"0")+":"+$(s,2,"0")},m:function t(e,i){if(e.date()<i.date())return-t(i,e);var n=12*(i.year()-e.year())+(i.month()-e.month()),s=e.clone().add(n,u),r=i-s<0,a=e.clone().add(n+(r?-1:1),u);return+(-(n+(i-s)/(r?s-a:a-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:u,y:c,w:o,d:a,D:l,h:r,m:s,s:n,ms:i,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",S={};S[g]=m;var p=function(t){return t instanceof y},k=function t(e,i,n){var s;if(!e)return g;if("string"==typeof e){var r=e.toLowerCase();S[r]&&(s=r),i&&(S[r]=i,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;S[o]=e,s=o}return!n&&s&&(g=s),s||!n&&g},b=function(t,e){if(p(t))return t.clone();var i="object"==typeof e?e:{};return i.date=t,i.args=arguments,new y(i)},T=M;T.l=k,T.i=p,T.w=function(t,e){return b(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var y=function(){function m(t){this.$L=k(t.locale,null,!0),this.parse(t)}var $=m.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,i=t.utc;if(null===e)return new Date(NaN);if(T.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(f);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return T},$.isValid=function(){return!(this.$d.toString()===h)},$.isSame=function(t,e){var i=b(t);return this.startOf(e)<=i&&i<=this.endOf(e)},$.isAfter=function(t,e){return b(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<b(t)},$.$g=function(t,e,i){return T.u(t)?this[e]:this.set(i,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,e){var i=this,d=!!T.u(e)||e,h=T.p(t),f=function(t,e){var n=T.w(i.$u?Date.UTC(i.$y,e,t):new Date(i.$y,e,t),i);return d?n:n.endOf(a)},v=function(t,e){return T.w(i.toDate()[t].apply(i.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),i)},m=this.$W,$=this.$M,M=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return d?f(1,0):f(31,11);case u:return d?f(1,$):f(0,$+1);case o:var S=this.$locale().weekStart||0,p=(m<S?m+7:m)-S;return f(d?M-p:M+(6-p),$);case a:case l:return v(g+"Hours",0);case r:return v(g+"Minutes",1);case s:return v(g+"Seconds",2);case n:return v(g+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(t,e){var o,d=T.p(t),h="set"+(this.$u?"UTC":""),f=(o={},o[a]=h+"Date",o[l]=h+"Date",o[u]=h+"Month",o[c]=h+"FullYear",o[r]=h+"Hours",o[s]=h+"Minutes",o[n]=h+"Seconds",o[i]=h+"Milliseconds",o)[d],v=d===a?this.$D+(e-this.$W):e;if(d===u||d===c){var m=this.clone().set(l,1);m.$d[f](v),m.init(),this.$d=m.set(l,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](v);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[T.p(t)]()},$.add=function(i,d){var l,h=this;i=Number(i);var f=T.p(d),v=function(t){var e=b(h);return T.w(e.date(e.date()+Math.round(t*i)),h)};if(f===u)return this.set(u,this.$M+i);if(f===c)return this.set(c,this.$y+i);if(f===a)return v(1);if(f===o)return v(7);var m=(l={},l[s]=t,l[r]=e,l[n]=1e3,l)[f]||1,$=this.$d.getTime()+i*m;return T.w($,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this,i=this.$locale();if(!this.isValid())return i.invalidDate||h;var n=t||"YYYY-MM-DDTHH:mm:ssZ",s=T.z(this),r=this.$H,a=this.$m,o=this.$M,u=i.weekdays,d=i.months,c=function(t,i,s,r){return t&&(t[i]||t(e,n))||s[i].slice(0,r)},l=function(t){return T.s(r%12||12,t,"0")},f=i.meridiem||function(t,e,i){var n=t<12?"AM":"PM";return i?n.toLowerCase():n},m={YY:String(this.$y).slice(-2),YYYY:T.s(this.$y,4,"0"),M:o+1,MM:T.s(o+1,2,"0"),MMM:c(i.monthsShort,o,d,3),MMMM:c(d,o),D:this.$D,DD:T.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,u,2),ddd:c(i.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(r),HH:T.s(r,2,"0"),h:l(1),hh:l(2),a:f(r,a,!0),A:f(r,a,!1),m:String(a),mm:T.s(a,2,"0"),s:String(this.$s),ss:T.s(this.$s,2,"0"),SSS:T.s(this.$ms,3,"0"),Z:s};return n.replace(v,(function(t,e){return e||m[t]||s.replace(":","")}))},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(i,l,h){var f,v=T.p(l),m=b(i),$=(m.utcOffset()-this.utcOffset())*t,M=this-m,g=T.m(this,m);return g=(f={},f[c]=g/12,f[u]=g,f[d]=g/3,f[o]=(M-$)/6048e5,f[a]=(M-$)/864e5,f[r]=M/e,f[s]=M/t,f[n]=M/1e3,f)[v]||M,h?g:T.a(g)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return S[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var i=this.clone(),n=k(t,e,!0);return n&&(i.$L=n),i},$.clone=function(){return T.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},m}(),D=y.prototype;return b.prototype=D,[["$ms",i],["$s",n],["$m",s],["$H",r],["$W",a],["$M",u],["$y",c],["$D",l]].forEach((function(t){D[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),b.extend=function(t,e){return t.$i||(t(e,y,b),t.$i=!0),b},b.locale=k,b.isDayjs=p,b.unix=function(t){return b(1e3*t)},b.en=S[g],b.Ls=S,b.p={},b}()},387:function(t){t.exports=function(){"use strict";var t={year:0,month:1,day:2,hour:3,minute:4,second:5},e={};return function(i,n,s){var r,a=function(t,i,n){void 0===n&&(n={});var s=new Date(t),r=function(t,i){void 0===i&&(i={});var n=i.timeZoneName||"short",s=t+"|"+n,r=e[s];return r||(r=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:n}),e[s]=r),r}(i,n);return r.formatToParts(s)},o=function(e,i){for(var n=a(e,i),r=[],o=0;o<n.length;o+=1){var u=n[o],d=u.type,c=u.value,l=t[d];l>=0&&(r[l]=parseInt(c,10))}var h=r[3],f=24===h?0:h,v=r[0]+"-"+r[1]+"-"+r[2]+" "+f+":"+r[4]+":"+r[5]+":000",m=+e;return(s.utc(v).valueOf()-(m-=m%1e3))/6e4},u=n.prototype;u.tz=function(t,e){void 0===t&&(t=r);var i=this.utcOffset(),n=this.toDate(),a=n.toLocaleString("en-US",{timeZone:t}),o=Math.round((n-new Date(a))/1e3/60),u=s(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(n.getTimezoneOffset()/15)-o,!0);if(e){var d=u.utcOffset();u=u.add(i-d,"minute")}return u.$x.$timezone=t,u},u.offsetName=function(t){var e=this.$x.$timezone||s.tz.guess(),i=a(this.valueOf(),e,{timeZoneName:t}).find((function(t){return"timezonename"===t.type.toLowerCase()}));return i&&i.value};var d=u.startOf;u.startOf=function(t,e){if(!this.$x||!this.$x.$timezone)return d.call(this,t,e);var i=s(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return d.call(i,t,e).tz(this.$x.$timezone,!0)},s.tz=function(t,e,i){var n=i&&e,a=i||e||r,u=o(+s(),a);if("string"!=typeof t)return s(t).tz(a);var d=function(t,e,i){var n=t-60*e*1e3,s=o(n,i);if(e===s)return[n,e];var r=o(n-=60*(s-e)*1e3,i);return s===r?[n,s]:[t-60*Math.min(s,r)*1e3,Math.max(s,r)]}(s.utc(t,n).valueOf(),u,a),c=d[0],l=d[1],h=s(c).utcOffset(l);return h.$x.$timezone=a,h},s.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},s.tz.setDefault=function(t){r=t}}}()},178:function(t){t.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,i=/([+-]|\d\d)/g;return function(n,s,r){var a=s.prototype;r.utc=function(t){return new s({date:t,utc:!0,args:arguments})},a.utc=function(e){var i=r(this.toDate(),{locale:this.$L,utc:!0});return e?i.add(this.utcOffset(),t):i},a.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var u=a.init;a.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var d=a.utcOffset;a.utcOffset=function(n,s){var r=this.$utils().u;if(r(n))return this.$u?0:r(this.$offset)?d.call(this):this.$offset;if("string"==typeof n&&(n=function(t){void 0===t&&(t="");var n=t.match(e);if(!n)return null;var s=(""+n[0]).match(i)||["-",0,0],r=s[0],a=60*+s[1]+ +s[2];return 0===a?0:"+"===r?a:-a}(n),null===n))return this;var a=Math.abs(n)<=16?60*n:n,o=this;if(s)return o.$offset=a,o.$u=0===n,o;if(0!==n){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(a+u,t)).$offset=a,o.$x.$localOffset=u}else o=this.utc();return o};var c=a.format;a.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return c.call(this,e)},a.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var l=a.toDate;a.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var h=a.diff;a.diff=function(t,e,i){if(t&&this.$u===t.$u)return h.call(this,t,e,i);var n=this.local(),s=r(t).local();return h.call(n,s,e,i)}}}()}},e={};function i(n){var s=e[n];if(void 0!==s)return s.exports;var r=e[n]={exports:{}};return t[n].call(r.exports,r,r.exports,i),r.exports}(()=>{"use strict";const t=document.querySelector(".start-time"),e=document.querySelector(".end-time"),n=document.querySelector(".shift-bar"),s=document.querySelector(".messages-box"),r=document.querySelector(".segment-box"),a=document.querySelector(".total-box"),o=document.querySelector(".total-box-paid");class u{constructor(){this.startTime=t,this.endTime=e,this.totalBox=a,this.totalBoxPaid=o,this.messageSideBar=s,this.savedMilliseconds=0,this.delMill=0}PadTo2Digits(t){return t.toString().padStart(2,"0")}ReduceDeletedSplitMilliseconds(t){this.savedMilliseconds=0,this.delMill=t,this.Addtime()}Addtime(){const t=i(484);let e=i(178),n=i(387);t.extend(e),t.extend(n);const s=t.utc(this.startTime.value).tz("America/New_York"),r=t.utc(this.endTime.value).tz("America/New_York");let a=[],o=[];document.querySelectorAll(".start-split").forEach((t=>a.push(new Date(t.value).getTime()))),document.querySelectorAll(".end-split").forEach((t=>o.push(new Date(t.value).getTime())));let u=a.reduce(((t,e)=>t+e),0),d=r-s-(o.reduce(((t,e)=>t+e),0)-u);this.savedMilliseconds=d-this.delMill,this.GetPaidHours()}GetPaidHours(){const t=document.querySelector(".locations").value,e=this.TimeToMilliseconds(this.savedMilliseconds),i=this.totalBox,n=this.totalBoxPaid;function s(t){i.innerHTML=`<p><span class="total-time">${e[0]}:${e[1]}</span></p>`,n.innerHTML=`<p><span class="total-time">${t[0]}:${t[1]}</span></p>`}parseInt(+e[0])>4&&parseInt(+e[1])>=1&&"MX"===t||parseInt(+e[0])>4&&parseInt(+e[1])>=1&&"US"===t||parseInt(+e[0])>5&&parseInt(+e[1])>=0&&"MX"===t||parseInt(+e[0])>5&&parseInt(+e[1])>=0&&"US"===t?(s(this.TimeToMilliseconds(this.savedMilliseconds-18e5)),this.USMXbreakRules(e)):"MX"===t||"US"===t?(s(this.TimeToMilliseconds(this.savedMilliseconds)),this.USMXbreakRules(e)):(this.TimeToMilliseconds(this.savedMilliseconds),s(e),this.CRbreakRules(e))}TimeToMilliseconds(t){let e=t,i=Math.floor(e/1e3),n=Math.floor(i/60),s=Math.floor(n/60);i%=60,n=i>=30?n+1:n,n%=60,s%=24;let r=`${this.PadTo2Digits(s)}:${this.PadTo2Digits(n)}`;const a=[r.substring(0,r.indexOf(":")),r.substring(r.indexOf(":")+1)];return this.DeleteMessages(),this.DeleteShiftBar(),a}ShowMessages(t){const e=document.createElement("div"),i=document.querySelector(".messages-box");e.innerHTML=`<p class="messageItem">${t}</p>`,i.appendChild(e)}AddBreakToUI(t){const e=document.querySelector(".shift-bar");document.createElement("div").classList=`break ${t}`,"break-one"===t?e.innerHTML=' <div class="break break-one"><div>break 1</div></div> ':"lunch"===t?e.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>Lunch</div></div> \n      ':"lunch-cr"===t?e.innerHTML=' \n      <div class="break lunch"><div>Lunch CR</div></div> \n      ':"break-two-cr"===t?e.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>Lunch CR</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      ':"break-two"===t?e.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>Lunch</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      ':"break-three-cr"===t?e.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>Lunch CR</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      <div class="break break-three"><div>Break 3</div></div> \n      ':"break-three"===t?e.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>Lunch</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      <div class="break break-three"><div>Break 3</div></div> \n      ':console.log("Alert No Break")}CRbreakRules(t){t[0]>10&&t[1]>=1||t[0]>11&&0==t[1]?this.ShowMessages("CR daily limit is 11:00 hours"):t[0]>=9?(this.AddBreakToUI("break-three-cr"),this.ShowMessages("CR gets 3 breaks and 1 lunch between 9:00 and 11:00 paid hours")):t[0]>=7?(this.AddBreakToUI("break-two-cr"),this.ShowMessages("CR gets 2 breaks and 1 lunch between 7:00 and 8:59 paid hours")):t[0]>=6?(this.AddBreakToUI("lunch-cr"),this.ShowMessages("CR only gets Lunch between 6:00 to 6:59 hours")):t[0]>=4?(this.AddBreakToUI("break-one"),this.ShowMessages("CR gets 1 break at 4:00 hours")):this.ShowMessages("No Breaks")}USMXbreakRules(t,e){t[0]>11&&t[1]>30||t[0]>12&&t[1]>=0?this.ShowMessages("US and MX daily limit is 12 hours. <br>11 hours is the limit for California"):t[0]>9&&t[1]>30||t[0]>10&&t[1]>=0?(this.AddBreakToUI("break-three"),this.ShowMessages("MX and US get 3 breaks and 1 lunch after 10:01 hours")):t[0]>5&&t[1]>30||t[0]>6&&t[1]>=0?(this.AddBreakToUI("break-two"),this.ShowMessages("MX and US get 2 breaks and 1 lunch after 6:01 hours")):t[0]>4&&t[1]>0||t[0]>5&&t[1]>=0?(this.AddBreakToUI("lunch"),this.ShowMessages("MX and US get 1 break and 1 lunch after 5:01 hours")):t[0]>2&&t[1]>=30||t[0]>3&&t[1]>=0?(this.AddBreakToUI("break-one"),this.ShowMessages("MX and US get 1 break after 3:30 hours")):this.ShowMessages("No Breaks")}NewSegment(){const t=document.createElement("div");t.classList="segmentItem",t.innerHTML='\n          <input type="datetime-local" value="2022-10-30T00:00:00" class="enter-time addedSplitStart start-split">\n          <input type="datetime-local" value="2022-10-29T00:00:00"  class="enter-time addedSplitEnd end-split">\n          \x3c!-- <button class="close-split">&#10006</button> --\x3e\n    ',r.appendChild(t),this.disableCalendar()}DeleteMessages(){s.innerHTML=""}DeleteTimeTotal(){this.savedMilliseconds=[],this.totalBox.innerHTML="00:00",this.totalBoxPaid.innerHTML="00:00",this.startTime.value="2022-10-29T00:00:00",this.endTime.value="2022-10-30T00:00:00",document.querySelectorAll(".start-split").forEach((t=>t.value="2022-10-30T00:00:00")),document.querySelectorAll(".end-split").forEach((t=>t.value="2022-10-29T00:00:00")),document.querySelector(".segment-box").innerHTML=""}DeleteShiftBar(){n.innerHTML=""}disableCalendar(){document.querySelectorAll(".enter-time").forEach((t=>{t.addEventListener("keydown",(t=>{32===t.keyCode&&t.preventDefault()}))}))}}const d=document.querySelector(".main-btn"),c=document.querySelector(".clear-btn"),l=document.querySelector(".locations"),h=document.querySelector(".addSplit-btn"),f=document.querySelector(".segment-box");document.querySelector(".main-form"),(new u).disableCalendar(),d.addEventListener("click",(()=>{(new u).Addtime()})),l.addEventListener("change",(()=>{(new u).Addtime()})),c.addEventListener("click",(()=>{const t=new u;t.DeleteMessages(),t.DeleteShiftBar(),t.DeleteTimeTotal()})),h.addEventListener("click",(()=>{(new u).NewSegment()})),f.addEventListener("click",(t=>{if(t.target.classList.contains("close-split")){const e=t.target.parentElement.children,i=new Date(Array.from(e)[0].value)-new Date(Array.from(e)[1].value);(new u).ReduceDeletedSplitMilliseconds(i),t.target.parentElement.style.display="none"}}))})()})();