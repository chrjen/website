(function(t){function e(e){for(var s,r,i=e[0],c=e[1],l=e[2],u=0,f=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&f.push(n[r][0]),n[r]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);d&&d(e);while(f.length)f.shift()();return o.push.apply(o,l||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],s=!0,i=1;i<a.length;i++){var c=a[i];0!==n[c]&&(s=!1)}s&&(o.splice(e--,1),t=r(r.s=a[0]))}return t}var s={},n={app:0},o=[];function r(e){if(s[e])return s[e].exports;var a=s[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=s,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)r.d(a,s,function(e){return t[e]}.bind(null,s));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],c=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var d=c;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"0e94":function(t,e,a){},2672:function(t,e,a){"use strict";a("0e94")},4678:function(t,e,a){var s={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function n(t){var e=o(t);return a(e)}function o(t){if(!a.o(s,t)){var e=new Error("Cannot find module '"+t+"'");throw e.code="MODULE_NOT_FOUND",e}return s[t]}n.keys=function(){return Object.keys(s)},n.resolve=o,t.exports=n,n.id="4678"},"61d7":function(t,e,a){},6600:function(t,e,a){"use strict";a("61d7")},cd49:function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var s=a("2b0e"),n=(a("d3b7"),a("bc3a")),o=a.n(n),r={},i=o.a.create(r);i.interceptors.request.use((function(t){return t}),(function(t){return Promise.reject(t)})),i.interceptors.response.use((function(t){return t}),(function(t){return Promise.reject(t)}));var c={install:function(t){t.$axios=i}};c.install=function(t){t.$axios=i,window.axios=i,Object.defineProperties(t.prototype,{$axios:{get:function(){return i}}})},s["a"].use(c);var l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",[a("v-main",[a("Board")],1)],1)},d=[],u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"mt-2 mb-2 board"},[a("div",{staticClass:"bg-img-container"},[a("div",{staticClass:"bg-img",style:t.bgImgStyle})]),t._l(t.positions,(function(e,s){return a("v-btn",{key:s,staticClass:"mb-4 mr-2 on-top",attrs:{dark:"",color:"rgba(20, 20, 30, 0.6)"},on:{click:function(a){t.position=e}}},[t._v(" "+t._s(e.name)+" "),t.positions.length>1?a("v-btn",{staticClass:"mr-n3",attrs:{icon:""},on:{click:function(e){return t.positions.splice(s,1)}}},[a("v-icon",{attrs:{small:""}},[t._v("mdi-close-circle")])],1):t._e()],1)})),a("v-btn",{staticClass:"mb-4 mr-2 on-top",attrs:{dark:"",color:"rgba(20, 20, 30, 0.6)",show:t.geoposition.active},on:{click:function(e){t.position=t.geoposition}}},[t._v("📍")]),a("v-btn",{staticClass:"mb-4 ml-2 mr-2 on-top",attrs:{dark:"",fab:"",small:"",color:"rgba(20, 20, 30, 0.6)"},on:{click:function(e){t.dialog=!0}}},[a("v-icon",{attrs:{dark:""}},[t._v("mdi-plus")])],1),a("div",{staticClass:"on-top"},[a("v-card",{staticClass:"header",attrs:{color:"rgba(20, 20, 30, 0.6)"}},[a("v-container",[a("v-row",[a("h1",[t._v(t._s(t.position.name))])]),a("v-row",[a("h2",{staticClass:"no-shadow"},[t._v(" "+t._s(t.formatDate(t.weatherNow.time))+" ")])]),a("v-row",[a("v-col",{attrs:{cols:"auto"}},[a("img",{staticClass:"weather-icon",attrs:{src:t.weatherIconPath(t.weatherNow.data.next_1_hours.summary.symbol_code)}})]),a("v-col",{attrs:{cols:"auto"}},[a("v-row",[a("v-col",[a("span",{staticClass:"stat temp"},[t._v(t._s(t.weatherNow.data.instant.details.air_temperature)+"°C")])]),a("v-col",[a("span",{staticClass:"stat humidity"},[t._v("(💧"+t._s(t.weatherNow.data.instant.details.relative_humidity)+"%)")])])],1),a("v-row",[a("v-col",{attrs:{cols:"auto"}},[a("svg",{attrs:{width:"60px",height:"60px",viewBox:"-50 -50 100 100"}},[a("path",{attrs:{transform:t.asRotTransform(t.weatherNow.data.instant.details.wind_from_direction+180),fill:"#ffffff",d:"M -10 40 L 10 40 L 10 -5 L 30 -5 L 0 -40 L -30 -5 L -10 -5 "}})])]),a("v-col",[a("span",{staticClass:"stat wind-direction"},[t._v(t._s(t.weatherNow.data.instant.details.wind_from_direction)+"°")])]),a("v-col",[a("span",{staticClass:"stat wind-speed"},[t._v(t._s(t.weatherNow.data.instant.details.wind_speed)+"m/s")])])],1)],1)],1)],1)],1),t._l(t.cards,(function(e,s){return a("v-col",{key:s,staticClass:"pb-0",attrs:{cols:"12"}},[t.cards[s-1]&&t.isNewDay(t.cards[s-1].time,e.time)?a("h2",{staticClass:"mt-4 mb-1"},[t._v(" "+t._s(t.formatDate(e.time))+" ")]):t._e(),a("Card",{attrs:{time:e.time,temp:e.temp,humidity:e.humidity,"wind-direction":e["wind-direction"],"wind-speed":e["wind-speed"],precipitation:e.precipitation,summary:e.summary,hidden:e.hidden},on:{click:function(t){e.hidden=!e.hidden}}})],1)}))],2),a("footer",{staticClass:"mt-4"},[a("div",[t._v(" Background "),a("a",{attrs:{href:this.bgUrl}},[t._v("Photo")]),t._v(" was taken by "),a("a",{attrs:{href:t.bgPhotographerUrl}},[t._v(" "+t._s(t.bgPhotographer)+" ")]),t._v(" on Pexels. ")]),a("a",{attrs:{href:"https://www.pexels.com"}},[a("img",{attrs:{height:"30px",src:"https://images.pexels.com/lib/api/pexels-white.png"}})])]),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[t._v(" New position ")]),a("v-card-text",[a("v-form",{model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[a("v-text-field",{attrs:{rules:t.nameRules,label:"Name"},model:{value:t.newname,callback:function(e){t.newname=e},expression:"newname"}}),a("v-text-field",{attrs:{rules:t.numberRules,label:"Latitude"},model:{value:t.newlat,callback:function(e){t.newlat=e},expression:"newlat"}}),a("v-text-field",{attrs:{rules:t.numberRules,label:"Longtitude"},model:{value:t.newlon,callback:function(e){t.newlon=e},expression:"newlon"}})],1)],1),a("v-card-actions",[a("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" Close ")]),a("v-btn",{attrs:{color:"primary",disabled:!t.valid,text:""},on:{click:function(e){t.addPosition(),t.dialog=!1}}},[t._v(" Add ")])],1)],1)],1)],2)},f=[],m=(a("a9e3"),a("b680"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"card",attrs:{hover:"",color:"rgba(20, 20, 30, 0.6)"},on:{click:function(e){return t.$emit("click")}}},[a("v-container",{staticClass:"pa-1"},[a("div",{class:{hidden:t.hidden}},[a("v-row",[a("v-col",{staticClass:"mr-n2",attrs:{"align-self":"center",cols:"auto"}},[t._v(" "+t._s(t.timeFormated)+" ")]),a("v-col",{attrs:{"align-self":"center",cols:"auto"}},[a("img",{staticClass:"ma-n2 weather-icon",attrs:{width:"30px",src:t.weatherIconPath(t.summary)}})]),a("v-col",{attrs:{"align-self":"center",cols:"auto"}},[t._v(" "+t._s(t.temp)+"°C ")]),0!==t.precipitation?a("v-col",{staticClass:"ml-n2 mr-n2 precipitation",attrs:{"align-self":"center",cols:"auto"}},[t._v(" "+t._s(t.precipitation)+" mm ")]):t._e(),a("v-col",{attrs:{"align-self":"center",cols:"auto"}},[a("svg",{staticClass:"ma-n1",attrs:{width:"25px",height:"25px",viewBox:"-50 -50 100 100"}},[a("path",{attrs:{transform:t.asRotTransform(t.windDirection+180),fill:"#ffffff",d:"M -10 40 L 10 40 L 10 -5 L 30 -5 L 0 -40 L -30 -5 L -10 -5 "}})])]),a("v-col",{staticClass:"ml-n4",attrs:{"align-self":"center",cols:"auto"}},[t._v(" "+t._s(t.windSpeed)+" m/s ")])],1)],1)])],1)}),p=[],b=a("c1df"),h=a.n(b),v=s["a"].extend({props:["time","temp","humidity","windDirection","windSpeed","hidden","precipitation","summary"],data:function(){return{}},computed:{timeFormated:function(){return h()(this.time).format("LT")}},methods:{weatherIconPath:function(t){return"/weathericon/svg/"+t+".svg"},asRotTransform:function(t){return"rotate("+t+")"}}}),j=v,g=(a("2672"),a("2877")),_=a("6544"),w=a.n(_),y=a("b0af"),x=a("62ad"),k=a("a523"),C=a("0fd9"),N=Object(g["a"])(j,m,p,!1,null,"dd9f4a3c",null),z=N.exports;w()(N,{VCard:y["a"],VCol:x["a"],VContainer:k["a"],VRow:C["a"]});var P=s["a"].extend({name:"Board",components:{Card:z},watch:{weatherNow:function(t){var e=this;this.$axios.get("https://api.pexels.com/v1/search",{headers:{Authorization:"563492ad6f91700001000001059dc5a1a65440e6acce55adc02420b4"},params:{query:t.data.next_1_hours.summary.symbol_code,size:"small"}}).then((function(t){var a=t.data.photos,s=Math.floor(Math.random()*a.length);e.bgImg=a[s].src.medium,e.bgUrl=a[s].url,e.bgPhotographer=a[s].photographer,e.bgPhotographerUrl=a[s].photographer_url}))},position:function(){this.getWeather()},positions:function(){localStorage.setItem("weatherLocs",JSON.stringify(this.positions))}},data:function(){return{dialog:!1,valid:!1,newlat:0,newlon:0,newname:"",numberRules:[function(t){return!isNaN(t)||"Not a valid number"}],nameRules:[function(t){return!!t||"Name cannot be empty"}],position:{name:"Null island",coords:{lat:0,lon:0}},geoposition:{active:!1,name:"Null island",coords:{lat:0,lon:0}},positions:[{name:"Bergen",coords:{lat:60.4035,lon:5.3247}},{name:"kanagawa",coords:{lat:35.4043,lon:139.3515}}],weatherNow:{time:"2021-09-15T20:00:00Z",data:{instant:{details:{air_pressure_at_sea_level:0,air_temperature:0,cloud_area_fraction:0,relative_humidity:0,wind_from_direction:0,wind_speed:0}},next_12_hours:{summary:{symbol_code:""}},next_1_hours:{summary:{symbol_code:""},details:{precipitation_amount:0}},next_6_hours:{summary:{symbol_code:""},details:{precipitation_amount:0}}}},cards:[],bgImg:"",bgUrl:"",bgPhotographer:"",bgPhotographerUrl:""}},computed:{bgImgStyle:function(){return{"background-image":'url("'+this.bgImg+'")'}}},methods:{weatherIconPath:function(t){return"/weathericon/svg/"+t+".svg"},formatDate:function(t){return h()(t).format("LL (dddd)")},asRotTransform:function(t){return"rotate("+t+")"},isNewDay:function(t,e){return h()(t).isBefore(e,"day")},addPosition:function(){this.positions.push({name:this.newname,coords:{lat:Number(this.newlat),lon:Number(this.newlon)}}),this.newname="",this.newlat=0,this.newlon=0},getWeather:function(){var t=this;this.$axios.get("https://api.met.no/weatherapi/locationforecast/2.0/compact",{params:{lat:this.position.coords.lat.toFixed(4),lon:this.position.coords.lon.toFixed(4)}}).then((function(e){if(200===e.status){for(var a=e.data.properties,s=[],n=0;n<a.timeseries.length;n++){var o=a.timeseries[n],r=h()();if(r.isSameOrAfter(o.time,"hour"))r.isSame(o.time,"hour")&&(console.log("Now",o),t.weatherNow=o);else{var i="";void 0!==o.data.next_1_hours?i=o.data.next_1_hours.summary.symbol_code:void 0!==o.data.next_6_hours?i=o.data.next_6_hours.summary.symbol_code:void 0!==o.data.next_12_hours&&(i=o.data.next_12_hours.summary.symbol_code);var c=0;void 0!==o.data.next_1_hours?c=o.data.next_1_hours.details.precipitation_amount:void 0!==o.data.next_6_hours?c=o.data.next_6_hours.details.precipitation_amount:void 0!==o.data.next_12_hours&&(c=o.data.next_12_hours.details.precipitation_amount),s.push({hidden:!1,time:o.time,temp:o.data.instant.details.air_temperature,humidity:o.data.instant.details.relative_humidity,"wind-direction":o.data.instant.details.wind_from_direction,"wind-speed":o.data.instant.details.wind_speed,summary:i,precipitation:c})}}t.cards=s}else console.error(e.statusText)}))}},created:function(){var t=localStorage.getItem("weatherLocs");t&&(this.positions=JSON.parse(t)),this.position=this.positions[0]},mounted:function(){var t=this;navigator.geolocation?navigator.geolocation.getCurrentPosition((function(e){t.geoposition={active:!0,name:"📍",coords:{lat:e.coords.latitude,lon:e.coords.longitude}}})):console.log("geolocation no available"),h.a.locale(navigator.language),this.getWeather()}}),O=P,L=(a("6600"),a("8336")),V=a("99d9"),S=a("169a"),T=a("4bd4"),I=a("132d"),R=a("8654"),D=Object(g["a"])(O,u,f,!1,null,"644ee0a2",null),M=D.exports;w()(D,{VBtn:L["a"],VCard:y["a"],VCardActions:V["a"],VCardText:V["b"],VCardTitle:V["c"],VCol:x["a"],VContainer:k["a"],VDialog:S["a"],VForm:T["a"],VIcon:I["a"],VRow:C["a"],VTextField:R["a"]});var $=s["a"].extend({name:"App",components:{Board:M},data:function(){return{}}}),B=$,U=a("7496"),F=a("f6c4"),A=Object(g["a"])(B,l,d,!1,null,null,null),E=A.exports;w()(A,{VApp:U["a"],VMain:F["a"]});var q=a("f309");s["a"].use(q["a"]);var J=new q["a"]({});s["a"].config.productionTip=!1,new s["a"]({vuetify:J,render:function(t){return t(E)}}).$mount("#app")}});
//# sourceMappingURL=app.14fa15a8.js.map