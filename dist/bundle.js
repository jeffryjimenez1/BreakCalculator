(()=>{var e={484:function(e){e.exports=function(){"use strict";var e=6e4,t=36e5,s="millisecond",i="second",r="minute",n="hour",a="day",o="week",u="month",d="quarter",l="year",h="date",c="Invalid Date",v=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,m={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],s=e%100;return"["+e+(t[(s-20)%10]||t[s]||t[0])+"]"}},g=function(e,t,s){var i=String(e);return!i||i.length>=t?e:""+Array(t+1-i.length).join(s)+e},k={s:g,z:function(e){var t=-e.utcOffset(),s=Math.abs(t),i=Math.floor(s/60),r=s%60;return(t<=0?"+":"-")+g(i,2,"0")+":"+g(r,2,"0")},m:function e(t,s){if(t.date()<s.date())return-e(s,t);var i=12*(s.year()-t.year())+(s.month()-t.month()),r=t.clone().add(i,u),n=s-r<0,a=t.clone().add(i+(n?-1:1),u);return+(-(i+(s-r)/(n?r-a:a-r))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:u,y:l,w:o,d:a,D:h,h:n,m:r,s:i,ms:s,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},M="en",b={};b[M]=m;var $=function(e){return e instanceof w},S=function e(t,s,i){var r;if(!t)return M;if("string"==typeof t){var n=t.toLowerCase();b[n]&&(r=n),s&&(b[n]=s,r=n);var a=t.split("-");if(!r&&a.length>1)return e(a[0])}else{var o=t.name;b[o]=t,r=o}return!i&&r&&(M=r),r||!i&&M},p=function(e,t){if($(e))return e.clone();var s="object"==typeof t?t:{};return s.date=e,s.args=arguments,new w(s)},H=k;H.l=S,H.i=$,H.w=function(e,t){return p(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var w=function(){function m(e){this.$L=S(e.locale,null,!0),this.parse(e)}var g=m.prototype;return g.parse=function(e){this.$d=function(e){var t=e.date,s=e.utc;if(null===t)return new Date(NaN);if(H.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var i=t.match(v);if(i){var r=i[2]-1||0,n=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,n)):new Date(i[1],r,i[3]||1,i[4]||0,i[5]||0,i[6]||0,n)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},g.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},g.$utils=function(){return H},g.isValid=function(){return!(this.$d.toString()===c)},g.isSame=function(e,t){var s=p(e);return this.startOf(t)<=s&&s<=this.endOf(t)},g.isAfter=function(e,t){return p(e)<this.startOf(t)},g.isBefore=function(e,t){return this.endOf(t)<p(e)},g.$g=function(e,t,s){return H.u(e)?this[t]:this.set(s,e)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(e,t){var s=this,d=!!H.u(t)||t,c=H.p(e),v=function(e,t){var i=H.w(s.$u?Date.UTC(s.$y,t,e):new Date(s.$y,t,e),s);return d?i:i.endOf(a)},f=function(e,t){return H.w(s.toDate()[e].apply(s.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),s)},m=this.$W,g=this.$M,k=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case l:return d?v(1,0):v(31,11);case u:return d?v(1,g):v(0,g+1);case o:var b=this.$locale().weekStart||0,$=(m<b?m+7:m)-b;return v(d?k-$:k+(6-$),g);case a:case h:return f(M+"Hours",0);case n:return f(M+"Minutes",1);case r:return f(M+"Seconds",2);case i:return f(M+"Milliseconds",3);default:return this.clone()}},g.endOf=function(e){return this.startOf(e,!1)},g.$set=function(e,t){var o,d=H.p(e),c="set"+(this.$u?"UTC":""),v=(o={},o[a]=c+"Date",o[h]=c+"Date",o[u]=c+"Month",o[l]=c+"FullYear",o[n]=c+"Hours",o[r]=c+"Minutes",o[i]=c+"Seconds",o[s]=c+"Milliseconds",o)[d],f=d===a?this.$D+(t-this.$W):t;if(d===u||d===l){var m=this.clone().set(h,1);m.$d[v](f),m.init(),this.$d=m.set(h,Math.min(this.$D,m.daysInMonth())).$d}else v&&this.$d[v](f);return this.init(),this},g.set=function(e,t){return this.clone().$set(e,t)},g.get=function(e){return this[H.p(e)]()},g.add=function(s,d){var h,c=this;s=Number(s);var v=H.p(d),f=function(e){var t=p(c);return H.w(t.date(t.date()+Math.round(e*s)),c)};if(v===u)return this.set(u,this.$M+s);if(v===l)return this.set(l,this.$y+s);if(v===a)return f(1);if(v===o)return f(7);var m=(h={},h[r]=e,h[n]=t,h[i]=1e3,h)[v]||1,g=this.$d.getTime()+s*m;return H.w(g,this)},g.subtract=function(e,t){return this.add(-1*e,t)},g.format=function(e){var t=this,s=this.$locale();if(!this.isValid())return s.invalidDate||c;var i=e||"YYYY-MM-DDTHH:mm:ssZ",r=H.z(this),n=this.$H,a=this.$m,o=this.$M,u=s.weekdays,d=s.months,l=function(e,s,r,n){return e&&(e[s]||e(t,i))||r[s].slice(0,n)},h=function(e){return H.s(n%12||12,e,"0")},v=s.meridiem||function(e,t,s){var i=e<12?"AM":"PM";return s?i.toLowerCase():i},m={YY:String(this.$y).slice(-2),YYYY:H.s(this.$y,4,"0"),M:o+1,MM:H.s(o+1,2,"0"),MMM:l(s.monthsShort,o,d,3),MMMM:l(d,o),D:this.$D,DD:H.s(this.$D,2,"0"),d:String(this.$W),dd:l(s.weekdaysMin,this.$W,u,2),ddd:l(s.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(n),HH:H.s(n,2,"0"),h:h(1),hh:h(2),a:v(n,a,!0),A:v(n,a,!1),m:String(a),mm:H.s(a,2,"0"),s:String(this.$s),ss:H.s(this.$s,2,"0"),SSS:H.s(this.$ms,3,"0"),Z:r};return i.replace(f,(function(e,t){return t||m[e]||r.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(s,h,c){var v,f=H.p(h),m=p(s),g=(m.utcOffset()-this.utcOffset())*e,k=this-m,M=H.m(this,m);return M=(v={},v[l]=M/12,v[u]=M,v[d]=M/3,v[o]=(k-g)/6048e5,v[a]=(k-g)/864e5,v[n]=k/t,v[r]=k/e,v[i]=k/1e3,v)[f]||k,c?M:H.a(M)},g.daysInMonth=function(){return this.endOf(u).$D},g.$locale=function(){return b[this.$L]},g.locale=function(e,t){if(!e)return this.$L;var s=this.clone(),i=S(e,t,!0);return i&&(s.$L=i),s},g.clone=function(){return H.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},m}(),T=w.prototype;return p.prototype=T,[["$ms",s],["$s",i],["$m",r],["$H",n],["$W",a],["$M",u],["$y",l],["$D",h]].forEach((function(e){T[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),p.extend=function(e,t){return e.$i||(e(t,w,p),e.$i=!0),p},p.locale=S,p.isDayjs=$,p.unix=function(e){return p(1e3*e)},p.en=b[M],p.Ls=b,p.p={},p}()},387:function(e){e.exports=function(){"use strict";var e={year:0,month:1,day:2,hour:3,minute:4,second:5},t={};return function(s,i,r){var n,a=function(e,s,i){void 0===i&&(i={});var r=new Date(e),n=function(e,s){void 0===s&&(s={});var i=s.timeZoneName||"short",r=e+"|"+i,n=t[r];return n||(n=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:e,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:i}),t[r]=n),n}(s,i);return n.formatToParts(r)},o=function(t,s){for(var i=a(t,s),n=[],o=0;o<i.length;o+=1){var u=i[o],d=u.type,l=u.value,h=e[d];h>=0&&(n[h]=parseInt(l,10))}var c=n[3],v=24===c?0:c,f=n[0]+"-"+n[1]+"-"+n[2]+" "+v+":"+n[4]+":"+n[5]+":000",m=+t;return(r.utc(f).valueOf()-(m-=m%1e3))/6e4},u=i.prototype;u.tz=function(e,t){void 0===e&&(e=n);var s=this.utcOffset(),i=this.toDate(),a=i.toLocaleString("en-US",{timeZone:e}),o=Math.round((i-new Date(a))/1e3/60),u=r(a).$set("millisecond",this.$ms).utcOffset(15*-Math.round(i.getTimezoneOffset()/15)-o,!0);if(t){var d=u.utcOffset();u=u.add(s-d,"minute")}return u.$x.$timezone=e,u},u.offsetName=function(e){var t=this.$x.$timezone||r.tz.guess(),s=a(this.valueOf(),t,{timeZoneName:e}).find((function(e){return"timezonename"===e.type.toLowerCase()}));return s&&s.value};var d=u.startOf;u.startOf=function(e,t){if(!this.$x||!this.$x.$timezone)return d.call(this,e,t);var s=r(this.format("YYYY-MM-DD HH:mm:ss:SSS"));return d.call(s,e,t).tz(this.$x.$timezone,!0)},r.tz=function(e,t,s){var i=s&&t,a=s||t||n,u=o(+r(),a);if("string"!=typeof e)return r(e).tz(a);var d=function(e,t,s){var i=e-60*t*1e3,r=o(i,s);if(t===r)return[i,t];var n=o(i-=60*(r-t)*1e3,s);return r===n?[i,r]:[e-60*Math.min(r,n)*1e3,Math.max(r,n)]}(r.utc(e,i).valueOf(),u,a),l=d[0],h=d[1],c=r(l).utcOffset(h);return c.$x.$timezone=a,c},r.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},r.tz.setDefault=function(e){n=e}}}()},178:function(e){e.exports=function(){"use strict";var e="minute",t=/[+-]\d\d(?::?\d\d)?/g,s=/([+-]|\d\d)/g;return function(i,r,n){var a=r.prototype;n.utc=function(e){return new r({date:e,utc:!0,args:arguments})},a.utc=function(t){var s=n(this.toDate(),{locale:this.$L,utc:!0});return t?s.add(this.utcOffset(),e):s},a.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(e){e.utc&&(this.$u=!0),this.$utils().u(e.$offset)||(this.$offset=e.$offset),o.call(this,e)};var u=a.init;a.init=function(){if(this.$u){var e=this.$d;this.$y=e.getUTCFullYear(),this.$M=e.getUTCMonth(),this.$D=e.getUTCDate(),this.$W=e.getUTCDay(),this.$H=e.getUTCHours(),this.$m=e.getUTCMinutes(),this.$s=e.getUTCSeconds(),this.$ms=e.getUTCMilliseconds()}else u.call(this)};var d=a.utcOffset;a.utcOffset=function(i,r){var n=this.$utils().u;if(n(i))return this.$u?0:n(this.$offset)?d.call(this):this.$offset;if("string"==typeof i&&(i=function(e){void 0===e&&(e="");var i=e.match(t);if(!i)return null;var r=(""+i[0]).match(s)||["-",0,0],n=r[0],a=60*+r[1]+ +r[2];return 0===a?0:"+"===n?a:-a}(i),null===i))return this;var a=Math.abs(i)<=16?60*i:i,o=this;if(r)return o.$offset=a,o.$u=0===i,o;if(0!==i){var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(a+u,e)).$offset=a,o.$x.$localOffset=u}else o=this.utc();return o};var l=a.format;a.format=function(e){var t=e||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return l.call(this,t)},a.valueOf=function(){var e=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*e},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var h=a.toDate;a.toDate=function(e){return"s"===e&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():h.call(this)};var c=a.diff;a.diff=function(e,t,s){if(e&&this.$u===e.$u)return c.call(this,e,t,s);var i=this.local(),r=n(e).local();return c.call(i,r,t,s)}}}()}},t={};function s(i){var r=t[i];if(void 0!==r)return r.exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,s),n.exports}(()=>{"use strict";const e=document.querySelector(".start-time"),t=document.querySelector(".end-time"),i=document.querySelector(".shift-bar"),r=document.querySelector(".messages-box"),n=document.querySelector(".segment-box"),a=document.querySelector(".total-box"),o=document.querySelector(".total-box-paid");class u{constructor(){this.startTime=e,this.endTime=t,this.totalBox=a,this.totalBoxPaid=o,this.messageSideBar=r,this.savedMilliseconds=0,this.delMill=0}PadTo2Digits(e){return e.toString().padStart(2,"0")}ReduceDeletedSplitMilliseconds(e){this.savedMilliseconds=0,this.delMill=e,this.Addtime()}Addtime(){const e=s(484);let t=s(178),i=s(387);e.extend(t),e.extend(i);const r=e.utc(this.startTime.value).tz("America/New_York"),n=e.utc(this.endTime.value).tz("America/New_York");let a=[],o=[];document.querySelectorAll(".start-split").forEach((e=>a.push(new Date(e.value).getTime()))),document.querySelectorAll(".end-split").forEach((e=>o.push(new Date(e.value).getTime())));let u=a.reduce(((e,t)=>e+t),0),d=n-r-(o.reduce(((e,t)=>e+t),0)-u);this.savedMilliseconds=d-this.delMill,this.GetPaidHours()}AddPaidHours(e,t){const s=this.totalBox,i=this.totalBoxPaid;var r;r=this.TimeToMilliseconds(this.savedMilliseconds-e),s.innerHTML=`<p><span class="total-time">${t[0]}:${t[1]}</span></p>`,i.innerHTML=`<p><span class="total-time">${r[0]}:${r[1]}</span></p>`}GetPaidHours(){const e=document.querySelector(".locations").value,t=this.TimeToMilliseconds(this.savedMilliseconds);"NY"===e?this.CheckNYconditions(t):"MX"===e&&parseInt(+t[0])>10&&parseInt(+t[1])>0?this.MXBreakRules(t):"MX"===e||"US"===e?this.CheckUSMXconditions(t):(this.AddPaidHours(0,t),this.CRbreakRules(t))}CheckUSMXconditions(e){parseInt(+e[0])>9&&parseInt(+e[1])>=31||parseInt(+e[0])>10?this.AddPaidHours(36e5,e):parseInt(+e[0])>4&&parseInt(+e[1])>=1||parseInt(+e[0])>5&&parseInt(+e[1])>=0?this.AddPaidHours(18e5,e):this.AddPaidHours(0,e),this.USMXbreakRules(e)}CheckNYconditions(e){const t=new Date(this.startTime.value),s=new Date(this.endTime.value);(t.getHours()>=13||s.getHours()<=6)&&(parseInt(+e[0])>9&&parseInt(+e[1])>45||parseInt(+e[0])>10)||(t.getHours()<6||6===t.getHours()&&0===t.getMinutes())&&parseInt(+e[0])>9&&parseInt(+e[1])>45||(t.getHours()<6||6===t.getHours()&&0===t.getMinutes())&&parseInt(+e[0])>10?this.AddPaidHours(45e5,e):6===t.getHours()&&t.getMinutes()>0&&parseInt(+e[0])>5?this.AddPaidHours(18e5,e):(t.getHours()>12||t.getHours()<=6)&&parseInt(+e[0])>5&&parseInt(+e[1])>=1||(t.getHours()>12||t.getHours()<=6)&&parseInt(+e[0])>=7?this.AddPaidHours(27e5,e):t.getHours()<11&&s.getHours()>=19&&s.getMinutes()>0||t.getHours()<11&&s.getHours()>=20&&s.getMinutes()>=0||parseInt(+e[0])>9&&parseInt(+e[1])>=31?this.AddPaidHours(36e5,e):parseInt(+e[0])>4&&parseInt(+e[1])>=1||parseInt(+e[0])>5&&parseInt(+e[1])>=0?this.AddPaidHours(18e5,e):this.AddPaidHours(0,e),this.NYBreakRules(e)}TimeToMilliseconds(e){let t=e,s=Math.floor(t/1e3),i=Math.floor(s/60),r=Math.floor(i/60);s%=60,i=s>=30?i+1:i,i%=60,r%=24;let n=`${this.PadTo2Digits(r)}:${this.PadTo2Digits(i)}`;const a=[n.substring(0,n.indexOf(":")),n.substring(n.indexOf(":")+1)];return this.DeleteMessages(),this.DeleteShiftBar(),a}ShowMessages(e){const t=document.createElement("div"),s=document.querySelector(".messages-box");t.innerHTML=`<p class="messageItem">${e}</p>`,s.appendChild(t)}AddBreakToUI(e){const t=document.querySelector(".shift-bar");document.createElement("div").classList=`break ${e}`,"not-allowed"===e?t.innerHTML=' <div class="break break-one"><div>Not Allowed</div></div> ':"break-one"===e?t.innerHTML=' <div class="break break-one"><div>break 1</div></div> ':"lunch"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m</div></div> \n      ':"lunch-cr"===e?t.innerHTML=' \n      <div class="break lunch"><div>30m CR</div></div> \n      ':"break-two-cr"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m CR</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      ':"break-two"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      ':"break-three-cr"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m CR</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      <div class="break break-three"><div>Break 3</div></div> \n      ':"break-three"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m</div></div> \n      <div class="break lunch-two"><div>30m</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      <div class="break break-three"><div>Break 3</div></div> \n      ':"break-ny"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m NY</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      ':"break-ny-secondLunch"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m NY</div></div> \n      <div class="break lunch-two"><div>30m NY</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      ':"break-ny-secondLunch-3break"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div> \n      <div class="break lunch"><div>30m NY</div></div> \n      <div class="break lunch-two"><div>30m NY</div></div> \n      <div class="break break-two"><div>Break 2</div></div> \n      <div class="break break-three"><div>Break 3</div></div> \n      ':"break-ny-45"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div>\n      <div class="break lunch"><div>45m NY</div></div>\n      <div class="break break-two"><div>Break 2</div></div>\n      ':"break-ny-45-10hours"===e?t.innerHTML=' \n      <div class="break break-one"><div>Break 1</div></div>\n      <div class="break lunch"><div>45m NY</div></div> \n      <div class="break lunch"><div>30m NY</div></div>\n      <div class="break break-two"><div>Break 2</div></div>\n      <div class="break break-three"><div>Break 3</div></div>\n      ':console.log("Alert No Break")}CRbreakRules(e){e[0]>10&&e[1]>=1||e[0]>11&&0==e[1]?(this.AddBreakToUI("not-allowed"),this.ShowMessages("CR daily limit is 11:00 hours")):e[0]>=9?(this.AddBreakToUI("break-three-cr"),this.ShowMessages("CR gets 3 breaks and 1 lunch between 9:00 and 11:00 paid hours")):e[0]>=7?(this.AddBreakToUI("break-two-cr"),this.ShowMessages("CR gets 2 breaks and 1 lunch between 7:00 and 8:59 paid hours")):e[0]>=6?(this.AddBreakToUI("lunch-cr"),this.ShowMessages("CR only gets Lunch between 6:00 to 6:59 hours")):e[0]>=4?(this.AddBreakToUI("break-one"),this.ShowMessages("CR gets 1 break at 4:00 hours")):this.ShowMessages("No Breaks.")}Check45LunchNYrules(e,t,s){s[0]>12&&s[1]>15||s[0]>13?(this.ShowMessages("US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico"),this.AddBreakToUI("not-allowed")):(e.getHours()>12||e.getHours()<=6&&e.getMinutes()<1)&&s[0]>=10&&s[1]>45||(e.getHours()>12||e.getHours()<=6&&e.getMinutes()<1)&&s[0]>=11||(e.getHours()>12||e.getHours()<=6)&&s[0]>=10&&s[1]>45?(this.ShowMessages("Add a 45-minutes lunch and a second 30-minutes lunch + breaks"),this.AddBreakToUI("break-ny-45-10hours")):(e.getHours()>12||e.getHours()<7&&e.getMinutes()<1)&&s[0]>5&&s[1]>0||(e.getHours()>12||e.getHours()<=5&&e.getMinutes()>=0)&&s[0]>5&&s[1]>0||(e.getHours()>12||e.getHours()<=6)&&s[0]>6&&s[1]>0?(this.ShowMessages("Add a 45-minutes lunch + breaks for people who work between 1:00 PM and 6:00 AM"),this.AddBreakToUI("break-ny-45")):this.USMXbreakRules(s)}CheckExtra30LunchNY(e,t,s){s[0]>12&&s[1]>=1||s[0]>13?(this.ShowMessages("US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico"),this.AddBreakToUI("not-allowed")):e.getHours()<11&&t.getHours()>=19&&t.getMinutes()>0&&s[0]>11||e.getHours()<11&&t.getHours()>=20&&t.getMinutes()>=0&&s[0]>11||e.getHours()<11&&t.getHours()>=19&&t.getMinutes()>0&&s[0]>10&&s[1]>0||e.getHours()<11&&t.getHours()>=20&&t.getMinutes()>=0&&s[0]>10&&s[1]>0?(this.ShowMessages("Add second 30-minutes lunch between 5 PM and 7 PM"),this.AddBreakToUI("break-ny-secondLunch-3break")):e.getHours()<11&&t.getHours()>=19&&t.getMinutes()>0||e.getHours()<11&&t.getHours()>=20&&t.getMinutes()>=0&&s[0]>5?(this.ShowMessages("Add second 30-minutes lunch between 5 PM and 7 PM"),this.AddBreakToUI("break-ny-secondLunch")):this.USMXbreakRules(s)}CheckEarlyLunchNY(e,t,s){s[0]>6||s[0]>5&&s[1]>=30?s[0]>12&&s[1]>=1||s[0]>13?(this.ShowMessages("US daily limit is 12 hours. <br>11 hours is the limit for California and Mexico"),this.AddBreakToUI("not-allowed")):s[0]>9&&s[1]>30||s[0]>10?(this.ShowMessages("Add the first lunch between 11:00 AM and 2:00 PM. <br> Add the first lunch before the breaks"),this.AddBreakToUI("break-ny-secondLunch-3break")):e.getHours()>8&&e.getHours()<11&&e.getMinutes()>=30||e.getHours()>10&&e.getHours()<12&&e.getMinutes()<30||e.getHours()>9&&e.getHours()<11&&e.getMinutes()>=0||e.getHours()>9&&e.getHours()<11?(this.ShowMessages("Add lunch between 11:00 AM and 2:00 PM. <br> Add the lunch before the breaks"),this.AddBreakToUI("break-ny")):this.USMXbreakRules(s):this.USMXbreakRules(s)}NYBreakRules(e){const t=new Date(this.startTime.value),s=new Date(this.endTime.value);t.getHours()>12||t.getHours()<=6?this.Check45LunchNYrules(t,s,e):t.getHours()<11&&s.getHours()>19||t.getHours()<11&&s.getHours()>20||t.getHours()<11&&s.getHours()>=19&&s.getMinutes()>0?this.CheckExtra30LunchNY(t,s,e):this.CheckEarlyLunchNY(t,s,e)}MXBreakRules(e){(e[0]>10&&e[1]>=1||e[0]>11&&0==e[1])&&(this.AddBreakToUI("not-allowed"),this.ShowMessages("MX daily limit is 11:00 hours"))}USMXbreakRules(e){e[0]>12&&e[1]>=1||e[0]>13?(this.ShowMessages("US daily limit is 12 hours. <br>11 hours is the limit for California"),this.AddBreakToUI("not-allowed")):e[0]>9&&e[1]>30||e[0]>10&&e[1]>=0?(this.AddBreakToUI("break-three"),this.ShowMessages("MX and US get 3 breaks and 2 lunch after 10:01 hours")):e[0]>5&&e[1]>30||e[0]>6&&e[1]>=0?(this.AddBreakToUI("break-two"),this.ShowMessages("MX and US get 2 breaks and 1 lunch after 6:01 hours")):e[0]>4&&e[1]>0||e[0]>5&&e[1]>=0?(this.AddBreakToUI("lunch"),this.ShowMessages("MX and US get 1 break and 1 lunch after 5:01 hours")):e[0]>2&&e[1]>=30||e[0]>3&&e[1]>=0?(this.AddBreakToUI("break-one"),this.ShowMessages("MX and US get 1 break after 3:30 hours")):this.ShowMessages("No Breaks")}NewSegment(){const e=document.createElement("div");e.classList="segmentItem",e.innerHTML='\n          <input type="datetime-local" value="2022-10-30T00:00:00" class="enter-time addedSplitStart start-split">\n          <input type="datetime-local" value="2022-10-29T00:00:00"  class="enter-time addedSplitEnd end-split">\n          \x3c!-- <button class="close-split">&#10006</button> --\x3e\n    ',n.appendChild(e),this.disableCalendar()}DeleteMessages(){r.innerHTML=""}DeleteTimeTotal(){this.savedMilliseconds=[],this.totalBox.innerHTML="00:00",this.totalBoxPaid.innerHTML="00:00",this.startTime.value="2022-10-29T00:00:00",this.endTime.value="2022-10-30T00:00:00",document.querySelectorAll(".start-split").forEach((e=>e.value="2022-10-30T00:00:00")),document.querySelectorAll(".end-split").forEach((e=>e.value="2022-10-29T00:00:00")),document.querySelector(".segment-box").innerHTML=""}DeleteShiftBar(){i.innerHTML=""}disableCalendar(){document.querySelectorAll(".enter-time").forEach((e=>{e.addEventListener("keydown",(e=>{32===e.keyCode&&e.preventDefault()}))}))}}const d=document.querySelector(".main-btn"),l=document.querySelector(".clear-btn"),h=document.querySelector(".locations"),c=document.querySelector(".addSplit-btn"),v=document.querySelector(".segment-box");document.querySelector(".main-form"),(new u).disableCalendar(),d.addEventListener("click",(()=>{(new u).Addtime()})),h.addEventListener("change",(()=>{(new u).Addtime()})),l.addEventListener("click",(()=>{const e=new u;e.DeleteMessages(),e.DeleteShiftBar(),e.DeleteTimeTotal()})),c.addEventListener("click",(()=>{(new u).NewSegment()})),v.addEventListener("click",(e=>{if(e.target.classList.contains("close-split")){const t=e.target.parentElement.children,s=new Date(Array.from(t)[0].value)-new Date(Array.from(t)[1].value);(new u).ReduceDeletedSplitMilliseconds(s),e.target.parentElement.style.display="none"}}))})()})();