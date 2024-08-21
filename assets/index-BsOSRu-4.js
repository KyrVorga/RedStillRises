import{p as i,g as e}from"./phaser-D3Vw4X5i.js";!function(){const i=document.createElement("link").relList;if(!(i&&i.supports&&i.supports("modulepreload"))){for(const i of document.querySelectorAll('link[rel="modulepreload"]'))e(i);new MutationObserver((i=>{for(const t of i)if("childList"===t.type)for(const i of t.addedNodes)"LINK"===i.tagName&&"modulepreload"===i.rel&&e(i)})).observe(document,{childList:!0,subtree:!0})}function e(i){if(i.ep)return;i.ep=!0;const e=function(i){const e={};return i.integrity&&(e.integrity=i.integrity),i.referrerPolicy&&(e.referrerPolicy=i.referrerPolicy),"use-credentials"===i.crossOrigin?e.credentials="include":"anonymous"===i.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(i);fetch(i.href,e)}}();class t extends i.Scene{constructor(){super("Boot")}preload(){this.load.image("background","assets/bg.png")}create(){this.scene.start("Preloader")}}class n extends i.Scene{constructor(){super("GameOver")}create(){this.cameras.main.setBackgroundColor(16711680),this.add.image(512,384,"background").setAlpha(.5),this.add.text(512,384,"Game Over",{fontFamily:"Arial Black",fontSize:64,color:"#ffffff",stroke:"#000000",strokeThickness:8,align:"center"}).setOrigin(.5),this.input.once("pointerdown",(()=>{this.scene.start("MainMenu")}))}}var s,a={exports:{}};s=a,function(){function i(i,e,t){return i.call.apply(i.bind,arguments)}function e(i,e,t){if(!i)throw Error();if(2<arguments.length){var n=Array.prototype.slice.call(arguments,2);return function(){var t=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(t,n),i.apply(e,t)}}return function(){return i.apply(e,arguments)}}function t(n,s,a){return(t=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?i:e).apply(null,arguments)}var n=Date.now||function(){return+new Date};function a(i,e){this.a=i,this.o=e||i,this.c=this.o.document}var r=!!window.FontFace;function o(i,e,t,n){if(e=i.c.createElement(e),t)for(var s in t)t.hasOwnProperty(s)&&("style"==s?e.style.cssText=t[s]:e.setAttribute(s,t[s]));return n&&e.appendChild(i.c.createTextNode(n)),e}function l(i,e,t){(i=i.c.getElementsByTagName(e)[0])||(i=document.documentElement),i.insertBefore(t,i.lastChild)}function h(i){i.parentNode&&i.parentNode.removeChild(i)}function d(i,e,t){e=e||[],t=t||[];for(var n=i.className.split(/\s+/),s=0;s<e.length;s+=1){for(var a=!1,r=0;r<n.length;r+=1)if(e[s]===n[r]){a=!0;break}a||n.push(e[s])}for(e=[],s=0;s<n.length;s+=1){for(a=!1,r=0;r<t.length;r+=1)if(n[s]===t[r]){a=!0;break}a||e.push(n[s])}i.className=e.join(" ").replace(/\s+/g," ").replace(/^\s+|\s+$/,"")}function f(i,e){for(var t=i.className.split(/\s+/),n=0,s=t.length;n<s;n++)if(t[n]==e)return!0;return!1}function c(i,e,t){function n(){d&&s&&a&&(d(h),d=null)}e=o(i,"link",{rel:"stylesheet",href:e,media:"all"});var s=!1,a=!0,h=null,d=t||null;r?(e.onload=function(){s=!0,n()},e.onerror=function(){s=!0,h=Error("Stylesheet failed to load"),n()}):setTimeout((function(){s=!0,n()}),0),l(i,"head",e)}function g(i,e,t,n){var s=i.c.getElementsByTagName("head")[0];if(s){var a=o(i,"script",{src:e}),r=!1;return a.onload=a.onreadystatechange=function(){r||this.readyState&&"loaded"!=this.readyState&&"complete"!=this.readyState||(r=!0,t&&t(null),a.onload=a.onreadystatechange=null,"HEAD"==a.parentNode.tagName&&s.removeChild(a))},s.appendChild(a),setTimeout((function(){r||(r=!0,t&&t(Error("Script load timeout")))}),n||5e3),a}return null}function p(){this.a=0,this.c=null}function u(i){return i.a++,function(){i.a--,S(i)}}function m(i,e){i.c=e,S(i)}function S(i){0==i.a&&i.c&&(i.c(),i.c=null)}function y(i){this.a=i||"-"}function v(i,e){this.c=i,this.f=4,this.a="n";var t=(e||"n4").match(/^([nio])([1-9])$/i);t&&(this.a=t[1],this.f=parseInt(t[2],10))}function x(i){var e=[];i=i.split(/,\s*/);for(var t=0;t<i.length;t++){var n=i[t].replace(/['"]/g,"");-1!=n.indexOf(" ")||/^\d/.test(n)?e.push("'"+n+"'"):e.push(n)}return e.join(",")}function M(i){return i.a+i.f}function T(i){var e="normal";return"o"===i.a?e="oblique":"i"===i.a&&(e="italic"),e}function w(i){var e=4,t="n",n=null;return i&&((n=i.match(/(normal|oblique|italic)/i))&&n[1]&&(t=n[1].substr(0,1).toLowerCase()),(n=i.match(/([1-9]00|normal|bold)/i))&&n[1]&&(/bold/i.test(n[1])?e=7:/[1-9]00/.test(n[1])&&(e=parseInt(n[1].substr(0,1),10)))),t+e}function L(i,e){this.c=i,this.f=i.o.document.documentElement,this.h=e,this.a=new y("-"),this.j=!1!==e.events,this.g=!1!==e.classes}function E(i){if(i.g){var e=f(i.f,i.a.c("wf","active")),t=[],n=[i.a.c("wf","loading")];e||t.push(i.a.c("wf","inactive")),d(i.f,t,n)}C(i,"inactive")}function C(i,e,t){i.j&&i.h[e]&&(t?i.h[e](t.c,M(t)):i.h[e]())}function U(){this.c={}}function k(i,e){this.c=i,this.f=e,this.a=o(this.c,"span",{"aria-hidden":"true"},this.f)}function b(i){l(i.c,"body",i.a)}function B(i){return"display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:"+x(i.c)+";font-style:"+T(i)+";font-weight:"+i.f+"00;"}function D(i,e,t,n,s,a){this.g=i,this.j=e,this.a=n,this.c=t,this.f=s||3e3,this.h=a||void 0}function P(i,e,t,n,s,a,r){this.v=i,this.B=e,this.c=t,this.a=n,this.s=r||"BESbswy",this.f={},this.w=s||3e3,this.u=a||null,this.m=this.j=this.h=this.g=null,this.g=new k(this.c,this.s),this.h=new k(this.c,this.s),this.j=new k(this.c,this.s),this.m=new k(this.c,this.s),i=B(i=new v(this.a.c+",serif",M(this.a))),this.g.a.style.cssText=i,i=B(i=new v(this.a.c+",sans-serif",M(this.a))),this.h.a.style.cssText=i,i=B(i=new v("serif",M(this.a))),this.j.a.style.cssText=i,i=B(i=new v("sans-serif",M(this.a))),this.m.a.style.cssText=i,b(this.g),b(this.h),b(this.j),b(this.m)}y.prototype.c=function(i){for(var e=[],t=0;t<arguments.length;t++)e.push(arguments[t].replace(/[\W_]+/g,"").toLowerCase());return e.join(this.a)},D.prototype.start=function(){var i=this.c.o.document,e=this,t=n(),s=new Promise((function(s,a){!function r(){n()-t>=e.f?a():i.fonts.load(function(i){return T(i)+" "+i.f+"00 300px "+x(i.c)}(e.a),e.h).then((function(i){1<=i.length?s():setTimeout(r,25)}),(function(){a()}))}()})),a=null,r=new Promise((function(i,t){a=setTimeout(t,e.f)}));Promise.race([r,s]).then((function(){a&&(clearTimeout(a),a=null),e.g(e.a)}),(function(){e.j(e.a)}))};var F={D:"serif",C:"sans-serif"},H=null;function I(){if(null===H){var i=/AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);H=!!i&&(536>parseInt(i[1],10)||536===parseInt(i[1],10)&&11>=parseInt(i[2],10))}return H}function A(i,e,t){for(var n in F)if(F.hasOwnProperty(n)&&e===i.f[F[n]]&&t===i.f[F[n]])return!0;return!1}function j(i){var e,s=i.g.a.offsetWidth,a=i.h.a.offsetWidth;(e=s===i.f.serif&&a===i.f["sans-serif"])||(e=I()&&A(i,s,a)),e?n()-i.A>=i.w?I()&&A(i,s,a)&&(null===i.u||i.u.hasOwnProperty(i.a.c))?W(i,i.v):W(i,i.B):function(i){setTimeout(t((function(){j(this)}),i),50)}(i):W(i,i.v)}function W(i,e){setTimeout(t((function(){h(this.g.a),h(this.h.a),h(this.j.a),h(this.m.a),e(this.a)}),i),0)}function O(i,e,t){this.c=i,this.a=e,this.f=0,this.m=this.j=!1,this.s=t}P.prototype.start=function(){this.f.serif=this.j.a.offsetWidth,this.f["sans-serif"]=this.m.a.offsetWidth,this.A=n(),j(this)};var _=null;function z(i){0==--i.f&&i.j&&(i.m?((i=i.a).g&&d(i.f,[i.a.c("wf","active")],[i.a.c("wf","loading"),i.a.c("wf","inactive")]),C(i,"active")):E(i.a))}function N(i){this.j=i,this.a=new U,this.h=0,this.f=this.g=!0}function X(i,e,n,s,a){var r=0==--i.h;(i.f||i.g)&&setTimeout((function(){var i=a||null,o=s||{};if(0===n.length&&r)E(e.a);else{e.f+=n.length,r&&(e.j=r);var l,h=[];for(l=0;l<n.length;l++){var f=n[l],c=o[f.c],g=e.a,p=f;if(g.g&&d(g.f,[g.a.c("wf",p.c,M(p).toString(),"loading")]),C(g,"fontloading",p),g=null,null===_)if(window.FontFace){p=/Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent);var u=/OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent)&&/Apple/.exec(window.navigator.vendor);_=p?42<parseInt(p[1],10):!u}else _=!1;g=_?new D(t(e.g,e),t(e.h,e),e.c,f,e.s,c):new P(t(e.g,e),t(e.h,e),e.c,f,e.s,i,c),h.push(g)}for(l=0;l<h.length;l++)h[l].start()}}),0)}function Y(i,e){this.c=i,this.a=e}function G(i,e){this.c=i,this.a=e}function V(i,e){this.c=i||R,this.a=[],this.f=[],this.g=e||""}O.prototype.g=function(i){var e=this.a;e.g&&d(e.f,[e.a.c("wf",i.c,M(i).toString(),"active")],[e.a.c("wf",i.c,M(i).toString(),"loading"),e.a.c("wf",i.c,M(i).toString(),"inactive")]),C(e,"fontactive",i),this.m=!0,z(this)},O.prototype.h=function(i){var e=this.a;if(e.g){var t=f(e.f,e.a.c("wf",i.c,M(i).toString(),"active")),n=[],s=[e.a.c("wf",i.c,M(i).toString(),"loading")];t||n.push(e.a.c("wf",i.c,M(i).toString(),"inactive")),d(e.f,n,s)}C(e,"fontinactive",i),z(this)},N.prototype.load=function(i){this.c=new a(this.j,i.context||this.j),this.g=!1!==i.events,this.f=!1!==i.classes,function(i,e,t){var n=[],s=t.timeout;!function(i){i.g&&d(i.f,[i.a.c("wf","loading")]),C(i,"loading")}(e),n=function(i,e,t){var n,s=[];for(n in e)if(e.hasOwnProperty(n)){var a=i.c[n];a&&s.push(a(e[n],t))}return s}(i.a,t,i.c);var a=new O(i.c,e,s);for(i.h=n.length,e=0,t=n.length;e<t;e++)n[e].load((function(e,t,n){X(i,a,e,t,n)}))}(this,new L(this.c,i),i)},Y.prototype.load=function(i){function e(){if(a["__mti_fntLst"+n]){var t,s=a["__mti_fntLst"+n](),r=[];if(s)for(var o=0;o<s.length;o++){var l=s[o].fontfamily;null!=s[o].fontStyle&&null!=s[o].fontWeight?(t=s[o].fontStyle+s[o].fontWeight,r.push(new v(l,t))):r.push(new v(l))}i(r)}else setTimeout((function(){e()}),50)}var t=this,n=t.a.projectId,s=t.a.version;if(n){var a=t.c.o;g(this.c,(t.a.api||"https://fast.fonts.net/jsapi")+"/"+n+".js"+(s?"?v="+s:""),(function(s){s?i([]):(a["__MonotypeConfiguration__"+n]=function(){return t.a},e())})).id="__MonotypeAPIScript__"+n}else i([])},G.prototype.load=function(i){var e,t,n=this.a.urls||[],s=this.a.families||[],a=this.a.testStrings||{},r=new p;for(e=0,t=n.length;e<t;e++)c(this.c,n[e],u(r));var o=[];for(e=0,t=s.length;e<t;e++)if((n=s[e].split(":"))[1])for(var l=n[1].split(","),h=0;h<l.length;h+=1)o.push(new v(n[0],l[h]));else o.push(new v(n[0]));m(r,(function(){i(o,a)}))};var R="https://fonts.googleapis.com/css";function $(i){this.f=i,this.a=[],this.c={}}var q={latin:"BESbswy","latin-ext":"çöüğş",cyrillic:"йяЖ",greek:"αβΣ",khmer:"កខគ",Hanuman:"កខគ"},K={thin:"1",extralight:"2","extra-light":"2",ultralight:"2","ultra-light":"2",light:"3",regular:"4",book:"4",medium:"5","semi-bold":"6",semibold:"6","demi-bold":"6",demibold:"6",bold:"7","extra-bold":"8",extrabold:"8","ultra-bold":"8",ultrabold:"8",black:"9",heavy:"9",l:"3",r:"4",b:"7"},J={i:"i",italic:"i",n:"n",normal:"n"},Q=/^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;function Z(i,e){this.c=i,this.a=e}var ii={Arimo:!0,Cousine:!0,Tinos:!0};function ei(i,e){this.c=i,this.a=e}function ti(i,e){this.c=i,this.f=e,this.a=[]}Z.prototype.load=function(i){var e=new p,t=this.c,n=new V(this.a.api,this.a.text),s=this.a.families;!function(i,e){for(var t=e.length,n=0;n<t;n++){var s=e[n].split(":");3==s.length&&i.f.push(s.pop());var a="";2==s.length&&""!=s[1]&&(a=":"),i.a.push(s.join(a))}}(n,s);var a=new $(s);!function(i){for(var e=i.f.length,t=0;t<e;t++){var n=i.f[t].split(":"),s=n[0].replace(/\+/g," "),a=["n4"];if(2<=n.length){var r;if(r=[],o=n[1])for(var o,l=(o=o.split(",")).length,h=0;h<l;h++){var d;if((d=o[h]).match(/^[\w-]+$/))if(null==(f=Q.exec(d.toLowerCase())))d="";else{if(d=null==(d=f[2])||""==d?"n":J[d],null==(f=f[1])||""==f)f="4";else var f=K[f]||(isNaN(f)?"4":f.substr(0,1));d=[d,f].join("")}else d="";d&&r.push(d)}0<r.length&&(a=r),3==n.length&&(r=[],0<(n=(n=n[2])?n.split(","):r).length&&(n=q[n[0]])&&(i.c[s]=n))}for(i.c[s]||(n=q[s])&&(i.c[s]=n),n=0;n<a.length;n+=1)i.a.push(new v(s,a[n]))}}(a),c(t,function(i){if(0==i.a.length)throw Error("No fonts to load!");if(-1!=i.c.indexOf("kit="))return i.c;for(var e=i.a.length,t=[],n=0;n<e;n++)t.push(i.a[n].replace(/ /g,"+"));return e=i.c+"?family="+t.join("%7C"),0<i.f.length&&(e+="&subset="+i.f.join(",")),0<i.g.length&&(e+="&text="+encodeURIComponent(i.g)),e}(n),u(e)),m(e,(function(){i(a.a,a.c,ii)}))},ei.prototype.load=function(i){var e=this.a.id,t=this.c.o;e?g(this.c,(this.a.api||"https://use.typekit.net")+"/"+e+".js",(function(e){if(e)i([]);else if(t.Typekit&&t.Typekit.config&&t.Typekit.config.fn){e=t.Typekit.config.fn;for(var n=[],s=0;s<e.length;s+=2)for(var a=e[s],r=e[s+1],o=0;o<r.length;o++)n.push(new v(a,r[o]));try{t.Typekit.load({events:!1,classes:!1,async:!0})}catch(l){}i(n)}}),2e3):i([])},ti.prototype.load=function(i){var e=this.f.id,t=this.c.o,n=this;e?(t.__webfontfontdeckmodule__||(t.__webfontfontdeckmodule__={}),t.__webfontfontdeckmodule__[e]=function(e,t){for(var s=0,a=t.fonts.length;s<a;++s){var r=t.fonts[s];n.a.push(new v(r.name,w("font-weight:"+r.weight+";font-style:"+r.style)))}i(n.a)},g(this.c,(this.f.api||"https://f.fontdeck.com/s/css/js/")+function(i){return i.o.location.hostname||i.a.location.hostname}(this.c)+"/"+e+".js",(function(e){e&&i([])}))):i([])};var ni=new N(window);ni.a.c.custom=function(i,e){return new G(e,i)},ni.a.c.fontdeck=function(i,e){return new ti(e,i)},ni.a.c.monotype=function(i,e){return new Y(e,i)},ni.a.c.typekit=function(i,e){return new ei(e,i)},ni.a.c.google=function(i,e){return new Z(e,i)};var si={load:t(ni.load,ni)};s.exports?s.exports=si:(window.WebFont=si,window.WebFontConfig&&ni.load(window.WebFontConfig))}();const r=e(a.exports);class o extends i.Scene{constructor(){super("MainMenu")}preload(){this.load.script("webfont","https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js")}create(){r.load({custom:{families:["Pixelify Sans"],urls:["/style.css"]},active:()=>{this.add.image(512,384,"background"),this.add.image(512,380,"logo"),this.add.text(512,460,"Play",{fontFamily:"Pixelify Sans",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:6,align:"center"}).setOrigin(.5),this.input.once("pointerdown",(()=>{this.scene.start("Mining")}))}})}}class l extends i.Scene{constructor(){super("Preloader")}init(){this.add.image(512,384,"background"),this.add.rectangle(512,384,468,32).setStrokeStyle(1,16777215);const i=this.add.rectangle(282,384,4,28,16777215);this.load.on("progress",(e=>{i.width=4+460*e}))}preload(){this.load.setPath("assets"),this.load.image("logo","logo.png")}create(){this.scene.start("MainMenu")}}class h extends i.Scene{constructor(){super({key:"Mining"}),this.helium=0,this.heliumTarget=1e4,this.isMining=!1,this.progressBarWidth=400,this.progressBarHeight=20,this.isMiningSpeedUpgradeEnabled=!1,this.miningSpeedLevel=1,this.miningSpeedMaxLevel=5,this.miningSpeedCosts={1:3,2:5,3:10,4:25,5:50},this.miningSpeedValues={1:5e3,2:4e3,3:3e3,4:2e3,5:1e3},this.miningSpeedDescription="Decreases mining time by 1 second per level.",this.isHeliumStorageUpgradeEnabled=!1,this.heliumStorageLevel=1,this.heliumStorageMaxLevel=10,this.heliumStorageCosts={1:6,2:10,3:20,4:40,5:75,6:150,7:300,8:600,9:1e3,10:2e3},this.heliumStorageValues={1:10,2:30,3:75,4:150,5:250,6:500,7:1e3,8:2500,9:5e3,10:1e4},this.heliumStorageDescription="Increases the maximum amount of Helium-3 you can store.",this.isMiningEfficiencyUpgradeEnabled=!1,this.miningEfficiencyLevel=1,this.miningEfficiencyMaxLevel=5,this.miningEfficiencyCosts={1:12,2:20,3:80,4:320,5:1280},this.miningEfficiencyValues={1:1,2:2,3:4,4:8,5:16},this.miningEfficiencyDescription="Doubles the amount of Helium-3 mined per level.",this.isAddtionalMinerUpgradeEnabled=!1,this.additionalMinerLevel=1,this.additionalMinerMaxLevel=5,this.additionalMinerCosts={1:70,2:100,3:400,4:1600,5:3200},this.additionalMinerDescription="Adds an additional miner to mine Helium per level.",this.upgradeContainers={},this.upgradeBarContainers={}}preload(){}create(){this.cameras.main.setBackgroundColor(0),this.add.image(512,384,"background").setAlpha(.5),this.loadProgress(),this.heliumText=this.add.text(512,153.6,"Helium-3: "+this.helium+" / "+this.GetHeliumStorage(),{fontFamily:"Pixelify Sans",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:4,align:"center"}).setOrigin(.5),this.mineButton=this.add.text(512,256,"Mine",{fontFamily:"Pixelify Sans",fontSize:38,color:"#ffffff",stroke:"#000000",strokeThickness:4,align:"center"}).setOrigin(.5).setInteractive().on("pointerdown",(()=>{this.isMining||this.MineHelium()})),this.progressBarFill=this.add.graphics(),this.isMiningSpeedUpgradeEnabled&&this.DisplayMiningSpeedUpgrade(),this.isHeliumStorageUpgradeEnabled&&this.DisplayHeliumStorageUpgrade(),this.isMiningEfficiencyUpgradeEnabled&&this.DisplayMiningEfficiencyUpgrade(),this.isAddtionalMinerUpgradeEnabled&&this.DisplayAdditionalMinerUpgrade()}update(){}loadProgress(){const i=localStorage.getItem("helium");null!==i&&(this.helium=parseFloat(i));const e=localStorage.getItem("isMiningSpeedUpgradeEnabled");null!==e&&(this.isMiningSpeedUpgradeEnabled="true"===e);const t=localStorage.getItem("isHeliumStorageUpgradeEnabled");null!==t&&(this.isHeliumStorageUpgradeEnabled="true"===t);const n=localStorage.getItem("isMiningEfficiencyUpgradeEnabled");null!==n&&(this.isMiningEfficiencyUpgradeEnabled="true"===n);const s=localStorage.getItem("isAddtionalMinerUpgradeEnabled");null!==s&&(this.isAddtionalMinerUpgradeEnabled="true"===s);const a=localStorage.getItem("miningSpeedLevel");null!==a&&(this.miningSpeedLevel=parseInt(a));const r=localStorage.getItem("heliumStorageLevel");null!==r&&(this.heliumStorageLevel=parseInt(r));const o=localStorage.getItem("miningEfficiencyLevel");null!==o&&(this.miningEfficiencyLevel=parseInt(o));const l=localStorage.getItem("additionalMinerLevel");null!==l&&(this.additionalMinerLevel=parseInt(l))}saveProgress(){localStorage.setItem("helium",this.helium),localStorage.setItem("isMiningSpeedUpgradeEnabled",this.isMiningSpeedUpgradeEnabled),localStorage.setItem("isHeliumStorageUpgradeEnabled",this.isHeliumStorageUpgradeEnabled),localStorage.setItem("isMiningEfficiencyUpgradeEnabled",this.isMiningEfficiencyUpgradeEnabled),localStorage.setItem("isAddtionalMinerUpgradeEnabled",this.isAddtionalMinerUpgradeEnabled),localStorage.setItem("miningSpeedLevel",this.miningSpeedLevel),localStorage.setItem("heliumStorageLevel",this.heliumStorageLevel),localStorage.setItem("miningEfficiencyLevel",this.miningEfficiencyLevel),localStorage.setItem("additionalMinerLevel",this.additionalMinerLevel)}UpdateHeliumText(){this.heliumText.setText("Helium-3: "+this.helium+" / "+this.GetHeliumStorage())}MineHelium(){this.isMining=!0,this.progressBarFill.clear(),this.tweens.addCounter({from:0,to:100,duration:this.CalculateMiningTime(),ease:"Linear",onUpdate:i=>{const e=i.getValue();this.progressBarFill.clear(),this.progressBarFill.fillStyle(16777215,1),this.progressBarFill.fillRect(512-this.progressBarWidth/2,296,this.progressBarWidth*(e/100),this.progressBarHeight)},onComplete:()=>{this.progressBarFill.clear(),this.helium+=this.CalculateMiningReturn();let i=this.GetHeliumStorage();this.helium>i&&(this.helium=i),this.UpdateHeliumText(),this.helium>=this.heliumTarget&&this.scene.start("WinScene"),this.helium>=this.miningSpeedCosts[1]&&!this.isMiningSpeedUpgradeEnabled&&(this.isMiningSpeedUpgradeEnabled=!0,this.DisplayMiningSpeedUpgrade()),this.helium>=this.heliumStorageCosts[1]&&!this.isHeliumStorageUpgradeEnabled&&(this.isHeliumStorageUpgradeEnabled=!0,this.DisplayHeliumStorageUpgrade()),this.helium>=this.miningEfficiencyCosts[1]&&!this.isMiningEfficiencyUpgradeEnabled&&(this.isMiningEfficiencyUpgradeEnabled=!0,this.DisplayMiningEfficiencyUpgrade()),this.helium>=this.additionalMinerCosts[0]&&!this.isAddtionalMinerUpgradeEnabled&&(this.isAddtionalMinerUpgradeEnabled=!0,this.DisplayAdditionalMinerUpgrade()),this.saveProgress(),this.isMining=!1}})}UpgradeMiningSpeed(){if(this.miningSpeedLevel>=this.miningSpeedMaxLevel)return;let i=this.miningSpeedCosts[this.miningSpeedLevel+1];this.helium>=i&&(this.helium-=i,this.miningSpeedLevel++,this.miningSpeedLevel==this.miningSpeedMaxLevel?(this.upgradeContainers.miningSpeed.destroy(),this.DisplayMiningSpeedUpgrade()):(i=this.miningSpeedCosts[this.miningSpeedLevel+1],this.miningSpeedLevelText.setText("Level: "+this.miningSpeedLevel),this.miningSpeedCostText.setText("Cost: "+i),this.DisplayUpgradeOptions("miningSpeed",this.miningSpeedUpgradeBarX,this.miningSpeedUpgradeBarY,this.miningSpeedLevel,this.miningSpeedMaxLevel,this.UpgradeMiningSpeed.bind(this)))),this.UpdateHeliumText(),this.saveProgress()}UpgradeHeliumStorage(){if(this.heliumStorageLevel>=this.heliumStorageMaxLevel)return;let i=this.heliumStorageCosts[this.heliumStorageLevel+1];this.helium>=i&&(this.helium-=i,this.heliumStorageLevel++,this.heliumStorageLevel==this.heliumStorageMaxLevel?(this.upgradeContainers.heliumStorage.destroy(),this.DisplayHeliumStorageUpgrade()):(i=this.heliumStorageCosts[this.heliumStorageLevel+1],this.heliumStorageLevelText.setText("Level: "+this.heliumStorageLevel),this.heliumStorageCostText.setText("Cost: "+i),this.DisplayUpgradeOptions("heliumStorage",this.heliumStorageUpgradeBarX,this.heliumStorageUpgradeBarY,this.heliumStorageLevel,this.heliumStorageMaxLevel,this.UpgradeHeliumStorage.bind(this)))),this.UpdateHeliumText(),this.saveProgress()}UpgradeMiningEfficiency(){if(this.miningEfficiencyLevel>=this.miningEfficiencyMaxLevel)return;let i=this.miningEfficiencyCosts[this.miningEfficiencyLevel+1];this.helium>=i&&(this.helium-=i,this.miningEfficiencyLevel++,this.miningEfficiencyLevel==this.miningEfficiencyMaxLevel?(this.upgradeContainers.miningEfficiency.destroy(),this.DisplayMiningEfficiencyUpgrade()):(i=this.miningEfficiencyCosts[this.miningEfficiencyLevel+1],this.miningEfficiencyLevelText.setText("Level: "+this.miningEfficiencyLevel),this.miningEfficiencyCostText.setText("Cost: "+i),this.DisplayUpgradeOptions("miningEfficiency",this.miningEfficiencyUpgradeBarX,this.miningEfficiencyUpgradeBarY,this.miningEfficiencyLevel,this.miningEfficiencyMaxLevel,this.UpgradeMiningEfficiency.bind(this)))),this.UpdateHeliumText(),this.saveProgress()}UpgradeAdditionalMiner(){if(this.additionalMinerLevel>=this.additionalMinerMaxLevel)return;let i=this.additionalMinerCosts[this.additionalMinerLevel+1];this.helium>=i&&(this.helium-=i,this.additionalMinerLevel++,this.additionalMinerLevel==this.additionalMinerMaxLevel?(this.upgradeContainers.additionalMiner.destroy(),this.DisplayAdditionalMinerUpgrade()):(i=this.additionalMinerCosts[this.additionalMinerLevel+1],this.additionalMinerLevelText.setText("Level: "+this.additionalMinerLevel),this.additionalMinerCostText.setText("Cost: "+i),this.DisplayUpgradeOptions("additionalMiner",this.additionalMinerUpgradeBarX,this.additionalMinerUpgradeBarY,this.additionalMinerLevel,this.additionalMinerMaxLevel,this.UpgradeAdditionalMiner.bind(this)))),this.UpdateHeliumText(),this.saveProgress()}DisplayUpgradeOptions(i,e,t,n,s,a){this.upgradeBarContainers[i]&&this.upgradeBarContainers[i].destroy();let r=this.add.container(e,t);this.upgradeBarContainers[i]=r;for(let o=0;o<s;o++)if(o<=n-1){let i=this.add.rectangle(15*o+5,5,12,12,16777215);r.add(i)}else{let i=this.add.circle(15*o+5,5,5,12303291);r.add(i)}if(n<s){let i=15*s,e=0,t=this.add.text(i+5,e-6,"+",{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2}).setInteractive().on("pointerdown",(()=>{a()}));r.add(t)}this.upgradeContainers[i].add(r)}DisplayMiningSpeedUpgrade(){this.upgradeContainers.miningSpeed=this.add.container(1024/6,324),this.miningSpeedText=this.add.text(0,0,"Upgrade: Mining Speed",{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningSpeed.add(this.miningSpeedText);let i=this.miningSpeedText.y+this.miningSpeedText.height+10;if(this.miningSpeedDescriptionText=this.add.text(0,i,this.miningSpeedDescription,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningSpeed.add(this.miningSpeedDescriptionText),i=this.miningSpeedDescriptionText.y+this.miningSpeedDescriptionText.height+10,this.miningSpeedLevelText=this.add.text(0,i,"Level: "+this.miningSpeedLevel,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningSpeed.add(this.miningSpeedLevelText),i=this.miningSpeedLevelText.y+this.miningSpeedLevelText.height+10,this.miningSpeedLevel<this.miningSpeedMaxLevel){let e=this.miningSpeedCosts[this.miningSpeedLevel+1];this.miningSpeedCostText=this.add.text(0,i,"Cost: "+e,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningSpeed.add(this.miningSpeedCostText),i=this.miningSpeedCostText.y+this.miningSpeedCostText.height+10}this.miningSpeedUpgradeBarX=4,this.miningSpeedUpgradeBarY=i,this.DisplayUpgradeOptions("miningSpeed",this.miningSpeedUpgradeBarX,this.miningSpeedUpgradeBarY,this.miningSpeedLevel,this.miningSpeedMaxLevel,this.UpgradeMiningSpeed.bind(this))}DisplayHeliumStorageUpgrade(){let i=this.upgradeContainers.miningSpeed.getBounds().bottom+70,e=this.upgradeContainers.miningSpeed.getBounds().left;this.upgradeContainers.heliumStorage=this.add.container(e,i),this.heliumStorageText=this.add.text(0,0,"Upgrade: Helium Storage",{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.heliumStorage.add(this.heliumStorageText);let t=this.heliumStorageText.y+this.heliumStorageText.height+10;if(this.heliumStorageDescriptionText=this.add.text(0,t,this.heliumStorageDescription,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.heliumStorage.add(this.heliumStorageDescriptionText),t=this.heliumStorageDescriptionText.y+this.heliumStorageDescriptionText.height+10,this.heliumStorageLevelText=this.add.text(0,t,"Level: "+this.heliumStorageLevel,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.heliumStorage.add(this.heliumStorageLevelText),t=this.heliumStorageLevelText.y+this.heliumStorageLevelText.height+10,this.heliumStorageLevel<this.heliumStorageMaxLevel){let i=this.heliumStorageCosts[this.heliumStorageLevel+1];this.heliumStorageCostText=this.add.text(0,t,"Cost: "+i,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.heliumStorage.add(this.heliumStorageCostText),t=this.heliumStorageCostText.y+this.heliumStorageCostText.height+10}this.heliumStorageUpgradeBarX=0,this.heliumStorageUpgradeBarY=t,this.DisplayUpgradeOptions("heliumStorage",this.heliumStorageUpgradeBarX,this.heliumStorageUpgradeBarY,this.heliumStorageLevel,this.heliumStorageMaxLevel,this.UpgradeHeliumStorage.bind(this))}DisplayMiningEfficiencyUpgrade(){let i=this.upgradeContainers.miningSpeed.getBounds().top,e=this.upgradeContainers.miningSpeed.getBounds().right+100;this.upgradeContainers.miningEfficiency=this.add.container(e,i),this.miningEfficiencyText=this.add.text(0,0,"Upgrade: Mining efficiency",{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningEfficiency.add(this.miningEfficiencyText);let t=this.miningEfficiencyText.y+this.miningEfficiencyText.height+10;if(this.miningEfficiencyDescriptionText=this.add.text(0,t,this.miningEfficiencyDescription,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningEfficiency.add(this.miningEfficiencyDescriptionText),t=this.miningEfficiencyDescriptionText.y+this.miningEfficiencyDescriptionText.height+10,this.miningEfficiencyLevelText=this.add.text(0,t,"Level: "+this.miningEfficiencyLevel,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningEfficiency.add(this.miningEfficiencyLevelText),t=this.miningEfficiencyLevelText.y+this.miningEfficiencyLevelText.height+10,this.miningEfficiencyLevel<this.miningEfficiencyMaxLevel){let i=this.miningEfficiencyCosts[this.miningEfficiencyLevel+1];this.miningEfficiencyCostText=this.add.text(0,t,"Cost: "+i,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.miningEfficiency.add(this.miningEfficiencyCostText),t=this.miningEfficiencyCostText.y+this.miningEfficiencyCostText.height+10}this.miningEfficiencyUpgradeBarX=0,this.miningEfficiencyUpgradeBarY=t,this.DisplayUpgradeOptions("miningEfficiency",this.miningEfficiencyUpgradeBarX,this.miningEfficiencyUpgradeBarY,this.miningEfficiencyLevel,this.miningEfficiencyMaxLevel,this.UpgradeMiningEfficiency.bind(this))}DisplayAdditionalMinerUpgrade(){let i=this.upgradeContainers.heliumStorage.getBounds().top,e=this.upgradeContainers.miningEfficiency.getBounds().left;this.upgradeContainers.additionalMiner=this.add.container(e,i),this.additionalMinerText=this.add.text(0,0,"Upgrade: Mining Team",{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.additionalMiner.add(this.additionalMinerText);let t=this.additionalMinerText.y+this.additionalMinerText.height+10;if(this.additionalMinerDescriptionText=this.add.text(0,t,this.additionalMinerDescription,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.additionalMiner.add(this.additionalMinerDescriptionText),t=this.additionalMinerDescriptionText.y+this.additionalMinerDescriptionText.height+10,this.additionalMinerLevelText=this.add.text(0,t,"Level: "+this.additionalMinerLevel,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.additionalMiner.add(this.additionalMinerLevelText),t=this.additionalMinerLevelText.y+this.additionalMinerLevelText.height+10,this.additionalMinerLevel<this.additionalMinerMaxLevel){let i=this.additionalMinerCosts[this.additionalMinerLevel+1];this.additionalMinerCostText=this.add.text(0,t,"Cost: "+i,{fontFamily:"Pixelify Sans",fontSize:24,color:"#ffffff",stroke:"#000000",strokeThickness:2,wordWrap:{width:300}}),this.upgradeContainers.additionalMiner.add(this.additionalMinerCostText),t=this.additionalMinerCostText.y+this.additionalMinerCostText.height+10}this.additionalMinerUpgradeBarX=0,this.additionalMinerUpgradeBarY=t,this.DisplayUpgradeOptions("additionalMiner",this.additionalMinerUpgradeBarX,this.additionalMinerUpgradeBarY,this.additionalMinerLevel,this.additionalMinerMaxLevel,this.UpgradeAdditionalMiner.bind(this))}CalculateMiningTime(){return this.miningSpeedValues[this.miningSpeedLevel]}CalculateMiningReturn(){let i=this.miningEfficiencyValues[this.miningEfficiencyLevel];for(let e=1;e<this.additionalMinerLevel;e++)i*=2;return i}GetHeliumStorage(){return this.heliumStorageValues[this.heliumStorageLevel]}}const d={type:Phaser.AUTO,width:1024,height:768,parent:"game-container",backgroundColor:"#000000",scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[t,l,o,h,n]};new Phaser.Game(d);
