function q(a){throw a}function y(a,b,c){4!==b.length&&q(new sjcl.exception.invalid("invalid aes block size"));var d=a.b[c],e=b[0]^d[0],f=b[c?3:1]^d[1],g=b[2]^d[2];b=b[c?1:3]^d[3];var h,i,j,k,l=d.length/4-2,m=4,n=[0,0,0,0];h=a.k[c],a=h[0];var o=h[1],p=h[2],r=h[3],s=h[4];for(k=0;l>k;k++)h=a[e>>>24]^o[f>>16&255]^p[g>>8&255]^r[255&b]^d[m],i=a[f>>>24]^o[g>>16&255]^p[b>>8&255]^r[255&e]^d[m+1],j=a[g>>>24]^o[b>>16&255]^p[e>>8&255]^r[255&f]^d[m+2],b=a[b>>>24]^o[e>>16&255]^p[f>>8&255]^r[255&g]^d[m+3],m+=4,e=h,f=i,g=j;for(k=0;4>k;k++)n[c?3&-k:k]=s[e>>>24]<<24^s[f>>16&255]<<16^s[g>>8&255]<<8^s[255&b]^d[m++],h=e,e=f,f=g,g=b,b=h;return n}function z(a,b){var c,d,e,f=b.slice(0),g=a.r,h=a.b,i=g[0],j=g[1],k=g[2],l=g[3],m=g[4],n=g[5],o=g[6],p=g[7];for(c=0;64>c;c++)16>c?d=f[c]:(d=f[c+1&15],e=f[c+14&15],d=f[15&c]=(d>>>7^d>>>18^d>>>3^d<<25^d<<14)+(e>>>17^e>>>19^e>>>10^e<<15^e<<13)+f[15&c]+f[c+9&15]|0),d=d+p+(m>>>6^m>>>11^m>>>25^m<<26^m<<21^m<<7)+(o^m&(n^o))+h[c],p=o,o=n,n=m,m=l+d|0,l=k,k=j,j=i,i=d+(j&k^l&(j^k))+(j>>>2^j>>>13^j>>>22^j<<30^j<<19^j<<10)|0;g[0]=g[0]+i|0,g[1]=g[1]+j|0,g[2]=g[2]+k|0,g[3]=g[3]+l|0,g[4]=g[4]+m|0,g[5]=g[5]+n|0,g[6]=g[6]+o|0,g[7]=g[7]+p|0}function C(a,b){var c,d=sjcl.random.w[a],e=[];for(c in d)d.hasOwnProperty(c)&&e.push(d[c]);for(c=0;c<e.length;c++)e[c](b)}function E(a){"undefined"!=typeof window&&window.performance&&"function"==typeof window.performance.now?sjcl.random.addEntropy(window.performance.now(),a,"loadtime"):sjcl.random.addEntropy((new Date).valueOf(),a,"loadtime")}function A(a){a.b=B(a).concat(B(a)),a.A=new sjcl.cipher.aes(a.b)}function B(a){for(var b=0;4>b&&(a.f[b]=a.f[b]+1|0,!a.f[b]);b++);return a.A.encrypt(a.f)}function D(a,b){return function(){b.apply(a,arguments)}}function init(){({zoom:15,center:new google.maps.LatLng(40.67,-73.94),disableDefaultUI:!0,scrollwheel:!1,draggable:!1,styles:[{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]}]}),document.getElementById("map")}var Secur=function(){function a(a){function c(a,b){var c=sjcl.misc.cachedPbkdf2(a,{iter:1e3});e.kk=b?sjcl.codec.hex.fromBits(c.key):a}function d(a){showAlert(a)}var e=this;c(a),this.encrypt=function(a){return sjcl.encrypt(e.kk,a,b,{})},this.setK=function(a,b){c(a,b)},this.decrypt=function(a){var b=null;try{b=sjcl.decrypt(e.kk,a)}catch(c){d("Can't decrypt: "+c)}return b}}var b={iter:1e3,ts:128,ks:256};return a}(),app=angular.module("lemietraduzioniApp",["ngRoute","Services","CommonModule","HomeCtrlModule","HomeCtrlTraduttoreModule","HomeCtrlAgenziaModule","DirectivesModule"]);app.config(["$routeProvider","$httpProvider",function(a){a.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/home_agenzia",{templateUrl:"views/home_agenzia.html",controller:"HomeAgenziaCtrl"}).when("/home_traduttore",{templateUrl:"views/home_traduttore.html",controller:"HomeTraduttoreCtrl"}).otherwise({redirectTo:"/"})}]);var services=angular.module("Services",[]);services.factory("services",["$http",function(a){return{getFromRESTServer:function(b,c){return a.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action="+c+"&"+b)},getCodeTable:function(b){return a.jsonp("http://explico.altervista.org/JSONEngine.php?callback=JSON_CALLBACK&action=get_codetable&"+b)}}}]),jQuery.easing.jswing=jQuery.easing.swing,jQuery.extend(jQuery.easing,{def:"easeOutQuad",swing:function(a,b,c,d,e){return jQuery.easing[jQuery.easing.def](a,b,c,d,e)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return 0==b?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return 0==b?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(1==(b/=e))return c+d;if(g||(g=.3*e),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin(2*(b*e-f)*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(0==b)return c;if(2==(b/=e/2))return c+d;if(g||(g=.3*e*1.5),h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return 1>b?-.5*h*Math.pow(2,10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin(2*(b*e-f)*Math.PI/g)*.5+d+c},easeInBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*(b/=e)*b*((f+1)*b-f)+c},easeOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),d*((b=b/e-1)*b*((f+1)*b+f)+1)+c},easeInOutBack:function(a,b,c,d,e,f){return void 0==f&&(f=1.70158),(b/=e/2)<1?d/2*b*b*(((f*=1.525)+1)*b-f)+c:d/2*((b-=2)*b*(((f*=1.525)+1)*b+f)+2)+c},easeInBounce:function(a,b,c,d,e){return d-jQuery.easing.easeOutBounce(a,e-b,0,d,e)+c},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?7.5625*d*b*b+c:2/2.75>b?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:2.5/2.75>b?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(a,b,c,d,e){return e/2>b?.5*jQuery.easing.easeInBounce(a,2*b,0,d,e)+c:.5*jQuery.easing.easeOutBounce(a,2*b-e,0,d,e)+.5*d+c}});var direttive=angular.module("DirectivesModule",[]);direttive.directive("loginElement",function(){return{restrict:"A",transclude:!0,scope:{rip:"=login",actionpath:"="},templateUrl:"views/snippet/loginSnippet.html"}}).directive("registrazioneTraduttoreElement",function(){return{restrict:"A",transclude:!0,scope:{rip:"=ripetizioni",actionpath:"="},templateUrl:"views/snippet/registrazioneTraduttoreSnippet.html"}}).directive("registrazioneAgenziaElement",function(){return{restrict:"A",transclude:!0,scope:{rip:"=ripetizioni",actionpath:"="},templateUrl:"views/snippet/registrazioneAgenziaSnippet.html"}}).directive("pwCheck",[function(){return{require:"ngModel",link:function(a,b,c,d){var e="#"+c.pwCheck;b.add(e).on("keyup",function(){a.$apply(function(){var a=b.val()===$(e).val();d.$setValidity("pwmatch",a)})})}}}]).directive("scrollOnClick",function(){return{restrict:"A",link:function(a,b,c){var d=c.href;b.on("click",function(){var a;a=d?$(d):b,$("body").animate({scrollTop:a.offset().top},1e3)})}}});var home=angular.module("HomeCtrlModule",[]);home.controller("HomeCtrl",["$scope","$rootScope","$window","services","$location","customFactory",function(a,b,c,d,e,f){b.showLogin=!1,b.showRicercaRipetizioni=!1,b.showLeMieRipetizioni=!1,b.isShowRegistrazioneAgenzia=!0,b.isShowRegistrazioneTraduttore=!0,a.doAccedi=function(){d.getFromRESTServer("username="+a.username+"&password="+a.password,"login").success(function(c){null!=c.jsonError||null!=c.errCode?alert(c.errMsg):(b.isLogged=!0,f.set("isLogged",!0),b.showLogin=!1,b.userData=c[0],f.set("userData",a.userData),e.path("TRADUTTORE"==a.userData.RUOLO?"/home_traduttore":"/home_agenzia"),alert("Benvenuto "+a.userData.NOME+"! Accedi subito dal menù a tutte le funzioni e trova le tue traduzioni!"))})},b.doLogout=function(){f.logout(),e.path("/"),b.isLogged=!1}}]),home.controller("registrazioneCtrl",["$scope","$rootScope","$window","services","$location","customFactory",function(a,b,c,d,e,f){a.doRegisterTraduttore=function(){d.getFromRESTServer("username="+a.usernameTraduttore+"&password="+a.passwordTraduttore+"&nome="+a.nomeTraduttore+"&cognome="+a.cognomeTraduttore+"&email="+a.emailTraduttore+"&ruolo=TRADUTTORE&citta="+a.cittaTraduttore+"&mothertongue="+a.mothertongueTraduttore,"register").success(function(b){null!=b.jsonError||null!=b.errCode?alert(b.errMsg):a.doAccediRegister(a.usernameTraduttore,a.passwordTraduttore)})},a.doRegisterAgenzia=function(){d.getFromRESTServer("username="+a.usernameAgenzia+"&password="+a.passwordAgenzia+"&nome="+a.nomeAgenzia+"&email="+a.emailAgenzia+"&ruolo=AGENZIA&employees="+a.employeesAgenzia+"&citta="+a.cittaAgenzia+"&website="+a.websiteAgenzia,"register").success(function(b){null!=b.jsonError||null!=b.errCode?alert(b.errMsg):a.doAccediRegister(a.usernameAgenzia,a.passwordAgenzia)})},a.doAccediRegister=function(a,c){d.getFromRESTServer("username="+a+"&password="+c,"login").success(function(a){null!=a.jsonError||null!=a.errCode?alert(a.errMsg):(b.isLogged=!0,f.set("isLogged",!0),b.showLogin=!1,b.userData=a[0],f.set("userData",b.userData),e.path("TRADUTTORE"==b.userData.RUOLO?"/home_traduttore":"/home_agenzia"),alert("Benvenuto "+b.userData.USERNAME+"! Accedi subito dal menù a tutte le funzioni e trova le tue traduzioni!"))}).error(function(a,b){console.error("Repos error",b,a)})["finally"](function(){console.log("finally finished repos")})}}]);var home=angular.module("HomeCtrlTraduttoreModule",[]);home.controller("HomeTraduttoreCtrl",["$scope","$rootScope","$window","services","$location","customFactory",function(){}]);var home=angular.module("HomeCtrlAgenziaModule",[]);home.controller("HomeAgenziaCtrl",["$scope","$rootScope","$window","services","$location","customFactory",function(){}]);var t=void 0,u=!1,sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message},this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message},this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message},this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message},this.message=a}}};"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),"function"==typeof define&&define([],function(){return sjcl}),sjcl.cipher.aes=function(a){this.k[0][0][0]||this.D();var b,c,d,e,f=this.k[0][4],g=this.k[1];b=a.length;var h=1;for(4!==b&&6!==b&&8!==b&&q(new sjcl.exception.invalid("invalid aes key size")),this.b=[d=a.slice(0),e=[]],a=b;4*b+28>a;a++)c=d[a-1],(0===a%b||8===b&&4===a%b)&&(c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[255&c],0===a%b&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7))),d[a]=d[a-b]^c;for(b=0;a;b++,a--)c=d[3&b?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[255&c]]},sjcl.cipher.aes.prototype={encrypt:function(a){return y(this,a,0)},decrypt:function(a){return y(this,a,1)},k:[[[],[],[],[],[]],[[],[],[],[],[]]],D:function(){var a,b,c,d,e,f,g,h=this.k[0],i=this.k[1],j=h[4],k=i[4],l=[],m=[];for(a=0;256>a;a++)m[(l[a]=a<<1^283*(a>>7))^a]=a;for(b=c=0;!j[b];b^=d||1,c=m[c]||1)for(f=c^c<<1^c<<2^c<<3^c<<4,f=f>>8^255&f^99,j[b]=f,k[f]=b,e=l[a=l[d=l[b]]],g=16843009*e^65537*a^257*d^16843008*b,e=257*l[f]^16843008*f,a=0;4>a;a++)h[a][b]=e=e<<24^e>>>8,i[a][f]=g=g<<24^g>>>8;for(a=0;5>a;a++)h[a]=h[a].slice(0),i[a]=i[a].slice(0)}},sjcl.bitArray={bitSlice:function(a,b,c){return a=sjcl.bitArray.P(a.slice(b/32),32-(31&b)).slice(1),c===t?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return(-32&(b+c-1^b)?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.P(b,d,0|c,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;return b&=31,c>0&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1)),a},partial:function(a,b,c){return 32===a?b:(c?0|b:b<<32-a)+1099511627776*a},getPartial:function(a){return Math.round(a/1099511627776)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return u;var c,d=0;for(c=0;c<a.length;c++)d|=a[c]^b[c];return 0===d},P:function(a,b,c,d){var e;for(e=0,d===t&&(d=[]);b>=32;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;return e=a.length?a[a.length-1]:0,a=sjcl.bitArray.getPartial(e),d.push(sjcl.bitArray.partial(b+a&31,b+a>32?c:d.pop(),1)),d},l:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]},byteswapM:function(a){var b,c;for(b=0;b<a.length;++b)c=a[b],a[b]=c>>>24|c>>>8&65280|(65280&c)<<8|c<<24;return a}},sjcl.codec.utf8String={fromBits:function(a){var b,c,d="",e=sjcl.bitArray.bitLength(a);for(b=0;e/8>b;b++)0===(3&b)&&(c=a[b/4]),d+=String.fromCharCode(c>>>24),c<<=8;return decodeURIComponent(escape(d))},toBits:function(a){a=unescape(encodeURIComponent(a));var b,c=[],d=0;for(b=0;b<a.length;b++)d=d<<8|a.charCodeAt(b),3===(3&b)&&(c.push(d),d=0);return 3&b&&c.push(sjcl.bitArray.partial(8*(3&b),d)),c}},sjcl.codec.hex={fromBits:function(a){var b,c="";for(b=0;b<a.length;b++)c+=((0|a[b])+0xf00000000000).toString(16).substr(4);return c.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c,d=[];for(a=a.replace(/\s|0x/g,""),c=a.length,a+="00000000",b=0;b<a.length;b+=8)d.push(0^parseInt(a.substr(b,8),16));return sjcl.bitArray.clamp(d,4*c)}},sjcl.codec.base64={J:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,f=sjcl.codec.base64.J,g=0,h=sjcl.bitArray.bitLength(a);for(c&&(f=f.substr(0,62)+"-_"),c=0;6*d.length<h;)d+=f.charAt((g^a[c]>>>e)>>>26),6>e?(g=a[c]<<6-e,e+=26,c++):(g<<=6,e-=6);for(;3&d.length&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c,d,e=[],f=0,g=sjcl.codec.base64.J,h=0;for(b&&(g=g.substr(0,62)+"-_"),c=0;c<a.length;c++)d=g.indexOf(a.charAt(c)),0>d&&q(new sjcl.exception.invalid("this isn't base64!")),f>26?(f-=26,e.push(h^d>>>f),h=d<<32-f):(f+=6,h^=d<<32-f);return 56&f&&e.push(sjcl.bitArray.partial(56&f,h,1)),e}},sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}},sjcl.hash.sha256=function(a){this.b[0]||this.D(),a?(this.r=a.r.slice(0),this.o=a.o.slice(0),this.h=a.h):this.reset()},sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.r=this.N.slice(0),this.o=[],this.h=0,this},update:function(a){"string"==typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.o=sjcl.bitArray.concat(this.o,a);for(b=this.h,a=this.h=b+sjcl.bitArray.bitLength(a),b=512+b&-512;a>=b;b+=512)z(this,c.splice(0,16));return this},finalize:function(){var a,b=this.o,c=this.r,b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]);for(a=b.length+2;15&a;a++)b.push(0);for(b.push(Math.floor(this.h/4294967296)),b.push(0|this.h);b.length;)z(this,b.splice(0,16));return this.reset(),c},N:[],b:[],D:function(){function a(a){return 4294967296*(a-Math.floor(a))|0}var b,c=0,d=2;a:for(;64>c;d++){for(b=2;d>=b*b;b++)if(0===d%b)continue a;8>c&&(this.N[c]=a(Math.pow(d,.5))),this.b[c]=a(Math.pow(d,1/3)),c++}}},sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,i=h.bitLength(c)/8,j=h.bitLength(g)/8;for(e=e||64,d=d||[],7>i&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")),f=2;4>f&&j>>>8*f;f++);return 15-i>f&&(f=15-i),c=h.clamp(c,8*(15-f)),b=sjcl.mode.ccm.L(a,b,c,d,e,f),g=sjcl.mode.ccm.p(a,g,c,b,e,f),h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64,d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),i=f.clamp(b,h-e),j=f.bitSlice(b,h-e),h=(h-e)/8;for(7>g&&q(new sjcl.exception.invalid("ccm: iv must be at least 7 bytes")),b=2;4>b&&h>>>8*b;b++);return 15-g>b&&(b=15-g),c=f.clamp(c,8*(15-b)),i=sjcl.mode.ccm.p(a,i,c,j,e,b),a=sjcl.mode.ccm.L(a,i.data,c,d,e,b),f.equal(i.tag,a)||q(new sjcl.exception.corrupt("ccm: tag doesn't match")),i.data},L:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,i=h.l;if(e/=8,(e%2||4>e||e>16)&&q(new sjcl.exception.invalid("ccm: invalid tag length")),(4294967295<d.length||4294967295<b.length)&&q(new sjcl.exception.bug("ccm: can't deal with 4GiB or more data")),f=[h.partial(8,(d.length?64:0)|e-2<<2|f-1)],f=h.concat(f,c),f[3]|=h.bitLength(b)/8,f=a.encrypt(f),d.length)for(c=h.bitLength(d)/8,65279>=c?g=[h.partial(16,c)]:4294967295>=c&&(g=h.concat([h.partial(16,65534)],[c])),g=h.concat(g,d),d=0;d<g.length;d+=4)f=a.encrypt(i(f,g.slice(d,d+4).concat([0,0,0])));for(d=0;d<b.length;d+=4)f=a.encrypt(i(f,b.slice(d,d+4).concat([0,0,0])));return h.clamp(f,8*e)},p:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.l;var i=b.length,j=h.bitLength(b);if(c=h.concat([h.partial(8,f-1)],c).concat([0,0,0]).slice(0,4),d=h.bitSlice(g(d,a.encrypt(c)),0,e),!i)return{tag:d,data:[]};for(g=0;i>g;g+=4)c[3]++,e=a.encrypt(c),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:d,data:h.clamp(b,j)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){128!==sjcl.bitArray.bitLength(c)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits"));var g,h=sjcl.mode.ocb2.H,i=sjcl.bitArray,j=i.l,k=[0,0,0,0];c=h(a.encrypt(c));var l,m=[];for(d=d||[],e=e||64,g=0;g+4<b.length;g+=4)l=b.slice(g,g+4),k=j(k,l),m=m.concat(j(c,a.encrypt(j(c,l)))),c=h(c);return l=b.slice(g),b=i.bitLength(l),g=a.encrypt(j(c,[0,0,0,b])),l=i.clamp(j(l.concat([0,0,0]),g),b),k=j(k,j(l.concat([0,0,0]),g)),k=a.encrypt(j(k,j(c,h(c)))),d.length&&(k=j(k,f?d:sjcl.mode.ocb2.pmac(a,d))),m.concat(i.concat(l,i.clamp(k,e)))},decrypt:function(a,b,c,d,e,f){128!==sjcl.bitArray.bitLength(c)&&q(new sjcl.exception.invalid("ocb iv must be 128 bits")),e=e||64;var g,h,i=sjcl.mode.ocb2.H,j=sjcl.bitArray,k=j.l,l=[0,0,0,0],m=i(a.encrypt(c)),n=sjcl.bitArray.bitLength(b)-e,o=[];for(d=d||[],c=0;n/32>c+4;c+=4)g=k(m,a.decrypt(k(m,b.slice(c,c+4)))),l=k(l,g),o=o.concat(g),m=i(m);return h=n-32*c,g=a.encrypt(k(m,[0,0,0,h])),g=k(g,j.clamp(b.slice(c),h).concat([0,0,0])),l=k(l,g),l=a.encrypt(k(l,k(m,i(m)))),d.length&&(l=k(l,f?d:sjcl.mode.ocb2.pmac(a,d))),j.equal(j.clamp(l,e),j.bitSlice(b,n))||q(new sjcl.exception.corrupt("ocb: tag doesn't match")),o.concat(j.clamp(g,h))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.H,e=sjcl.bitArray,f=e.l,g=[0,0,0,0],h=a.encrypt([0,0,0,0]),h=f(h,d(d(h)));for(c=0;c+4<b.length;c+=4)h=d(h),g=f(g,a.encrypt(f(h,b.slice(c,c+4))));return c=b.slice(c),128>e.bitLength(c)&&(h=f(h,d(h)),c=e.concat(c,[-2147483648,0,0,0])),g=f(g,c),a.encrypt(f(d(f(h,d(h))),g))},H:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}},sjcl.mode.gcm={name:"gcm",encrypt:function(a,b,c,d,e){var f=b.slice(0);return b=sjcl.bitArray,d=d||[],a=sjcl.mode.gcm.p(!0,a,f,d,c,e||128),b.concat(a.data,a.tag)},decrypt:function(a,b,c,d,e){var f=b.slice(0),g=sjcl.bitArray,h=g.bitLength(f);return e=e||128,d=d||[],h>=e?(b=g.bitSlice(f,h-e),f=g.bitSlice(f,0,h-e)):(b=f,f=[]),a=sjcl.mode.gcm.p(u,a,f,d,c,e),g.equal(a.tag,b)||q(new sjcl.exception.corrupt("gcm: tag doesn't match")),a.data},Z:function(a,b){var c,d,e,f,g,h=sjcl.bitArray.l;for(e=[0,0,0,0],f=b.slice(0),c=0;128>c;c++){for((d=0!==(a[Math.floor(c/32)]&1<<31-c%32))&&(e=h(e,f)),g=0!==(1&f[3]),d=3;d>0;d--)f[d]=f[d]>>>1|(1&f[d-1])<<31;f[0]>>>=1,g&&(f[0]^=-520093696)}return e},g:function(a,b,c){var d,e=c.length;for(b=b.slice(0),d=0;e>d;d+=4)b[0]^=4294967295&c[d],b[1]^=4294967295&c[d+1],b[2]^=4294967295&c[d+2],b[3]^=4294967295&c[d+3],b=sjcl.mode.gcm.Z(b,a);return b},p:function(a,b,c,d,e,f){var g,h,i,j,k,l,m,n,o=sjcl.bitArray;for(l=c.length,m=o.bitLength(c),n=o.bitLength(d),h=o.bitLength(e),g=b.encrypt([0,0,0,0]),96===h?(e=e.slice(0),e=o.concat(e,[1])):(e=sjcl.mode.gcm.g(g,[0,0,0,0],e),e=sjcl.mode.gcm.g(g,e,[0,0,Math.floor(h/4294967296),4294967295&h])),h=sjcl.mode.gcm.g(g,[0,0,0,0],d),k=e.slice(0),d=h.slice(0),a||(d=sjcl.mode.gcm.g(g,h,c)),j=0;l>j;j+=4)k[3]++,i=b.encrypt(k),c[j]^=i[0],c[j+1]^=i[1],c[j+2]^=i[2],c[j+3]^=i[3];return c=o.clamp(c,m),a&&(d=sjcl.mode.gcm.g(g,h,c)),a=[Math.floor(n/4294967296),4294967295&n,Math.floor(m/4294967296),4294967295&m],d=sjcl.mode.gcm.g(g,d,a),i=b.encrypt(e),d[0]^=i[0],d[1]^=i[1],d[2]^=i[2],d[3]^=i[3],{tag:o.bitSlice(d,0,f),data:c}}},sjcl.misc.hmac=function(a,b){this.M=b=b||sjcl.hash.sha256;var c,d=[[],[]],e=b.prototype.blockSize/32;for(this.n=[new b,new b],a.length>e&&(a=b.hash(a)),c=0;e>c;c++)d[0][c]=909522486^a[c],d[1][c]=1549556828^a[c];this.n[0].update(d[0]),this.n[1].update(d[1]),this.G=new b(this.n[0])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a){return this.Q&&q(new sjcl.exception.invalid("encrypt on already updated hmac called!")),this.update(a),this.digest(a)},sjcl.misc.hmac.prototype.reset=function(){this.G=new this.M(this.n[0]),this.Q=u},sjcl.misc.hmac.prototype.update=function(a){this.Q=!0,this.G.update(a)},sjcl.misc.hmac.prototype.digest=function(){var a=this.G.finalize(),a=new this.M(this.n[1]).update(a).finalize();return this.reset(),a},sjcl.misc.pbkdf2=function(a,b,c,d,e){c=c||1e3,(0>d||0>c)&&q(sjcl.exception.invalid("invalid params to pbkdf2")),"string"==typeof a&&(a=sjcl.codec.utf8String.toBits(a)),"string"==typeof b&&(b=sjcl.codec.utf8String.toBits(b)),e=e||sjcl.misc.hmac,a=new e(a);var f,g,h,i,j=[],k=sjcl.bitArray;for(i=1;32*j.length<(d||1);i++){for(e=f=a.encrypt(k.concat(b,[i])),g=1;c>g;g++)for(f=a.encrypt(f),h=0;h<f.length;h++)e[h]^=f[h];j=j.concat(e)}return d&&(j=k.clamp(j,d)),j},sjcl.prng=function(a){this.c=[new sjcl.hash.sha256],this.i=[0],this.F=0,this.s={},this.C=0,this.K={},this.O=this.d=this.j=this.W=0,this.b=[0,0,0,0,0,0,0,0],this.f=[0,0,0,0],this.A=t,this.B=a,this.q=u,this.w={progress:{},seeded:{}},this.m=this.V=0,this.t=1,this.u=2,this.S=65536,this.I=[0,48,64,96,128,192,256,384,512,768,1024],this.T=3e4,this.R=80},sjcl.prng.prototype={randomWords:function(a,b){var c,d=[];c=this.isReady(b);var e;if(c===this.m&&q(new sjcl.exception.notReady("generator isn't seeded")),c&this.u){c=!(c&this.t),e=[];var f,g=0;for(this.O=e[0]=(new Date).valueOf()+this.T,f=0;16>f;f++)e.push(4294967296*Math.random()|0);for(f=0;f<this.c.length&&(e=e.concat(this.c[f].finalize()),g+=this.i[f],this.i[f]=0,!(!c&&this.F&1<<f));f++);for(this.F>=1<<this.c.length&&(this.c.push(new sjcl.hash.sha256),this.i.push(0)),this.d-=g,g>this.j&&(this.j=g),this.F++,this.b=sjcl.hash.sha256.hash(this.b.concat(e)),this.A=new sjcl.cipher.aes(this.b),c=0;4>c&&(this.f[c]=this.f[c]+1|0,!this.f[c]);c++);}for(c=0;a>c;c+=4)0===(c+1)%this.S&&A(this),e=B(this),d.push(e[0],e[1],e[2],e[3]);return A(this),d.slice(0,a)},setDefaultParanoia:function(a,b){0===a&&"Setting paranoia=0 will ruin your security; use it only for testing"!==b&&q("Setting paranoia=0 will ruin your security; use it only for testing"),this.B=a},addEntropy:function(a,b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.s[c],h=this.isReady(),i=0;switch(d=this.K[c],d===t&&(d=this.K[c]=this.W++),g===t&&(g=this.s[c]=0),this.s[c]=(this.s[c]+1)%this.c.length,typeof a){case"number":b===t&&(b=1),this.c[g].update([d,this.C++,1,b,f,1,0|a]);break;case"object":if(c=Object.prototype.toString.call(a),"[object Uint32Array]"===c){for(e=[],c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(i=1),c=0;c<a.length&&!i;c++)"number"!=typeof a[c]&&(i=1);if(!i){if(b===t)for(c=b=0;c<a.length;c++)for(e=a[c];e>0;)b++,e>>>=1;this.c[g].update([d,this.C++,2,b,f,a.length].concat(a))}break;case"string":b===t&&(b=a.length),this.c[g].update([d,this.C++,3,b,f,a.length]),this.c[g].update(a);break;default:i=1}i&&q(new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string")),this.i[g]+=b,this.d+=b,h===this.m&&(this.isReady()!==this.m&&C("seeded",Math.max(this.j,this.d)),C("progress",this.getProgress()))},isReady:function(a){return a=this.I[a!==t?a:this.B],this.j&&this.j>=a?this.i[0]>this.R&&(new Date).valueOf()>this.O?this.u|this.t:this.t:this.d>=a?this.u|this.m:this.m},getProgress:function(a){return a=this.I[a?a:this.B],this.j>=a?1:this.d>a?1:this.d/a},startCollectors:function(){this.q||(this.a={loadTimeCollector:D(this,this.aa),mouseCollector:D(this,this.ba),keyboardCollector:D(this,this.$),accelerometerCollector:D(this,this.U)},window.addEventListener?(window.addEventListener("load",this.a.loadTimeCollector,u),window.addEventListener("mousemove",this.a.mouseCollector,u),window.addEventListener("keypress",this.a.keyboardCollector,u),window.addEventListener("devicemotion",this.a.accelerometerCollector,u)):document.attachEvent?(document.attachEvent("onload",this.a.loadTimeCollector),document.attachEvent("onmousemove",this.a.mouseCollector),document.attachEvent("keypress",this.a.keyboardCollector)):q(new sjcl.exception.bug("can't attach event")),this.q=!0)},stopCollectors:function(){this.q&&(window.removeEventListener?(window.removeEventListener("load",this.a.loadTimeCollector,u),window.removeEventListener("mousemove",this.a.mouseCollector,u),window.removeEventListener("keypress",this.a.keyboardCollector,u),window.removeEventListener("devicemotion",this.a.accelerometerCollector,u)):document.detachEvent&&(document.detachEvent("onload",this.a.loadTimeCollector),document.detachEvent("onmousemove",this.a.mouseCollector),document.detachEvent("keypress",this.a.keyboardCollector)),this.q=u)},addEventListener:function(a,b){this.w[a][this.V++]=b},removeEventListener:function(a,b){var c,d,e=this.w[a],f=[];for(d in e)e.hasOwnProperty(d)&&e[d]===b&&f.push(d);for(c=0;c<f.length;c++)d=f[c],delete e[d]},$:function(){E(1)},ba:function(a){var b,c;try{b=a.x||a.clientX||a.offsetX||0,c=a.y||a.clientY||a.offsetY||0}catch(d){c=b=0}0!=b&&0!=c&&sjcl.random.addEntropy([b,c],2,"mouse"),E(0)},aa:function(){E(2)},U:function(a){if(a=a.accelerationIncludingGravity.x||a.accelerationIncludingGravity.y||a.accelerationIncludingGravity.z,window.orientation){var b=window.orientation;"number"==typeof b&&sjcl.random.addEntropy(b,1,"accelerometer")}a&&sjcl.random.addEntropy(a,2,"accelerometer"),E(0)}},sjcl.random=new sjcl.prng(6);a:try{var F,G,H,I;if(I="undefined"!=typeof module){var J;if(J=module.exports){var K;try{K=require("crypto")}catch(L){K=null}J=(G=K)&&G.randomBytes}I=J}if(I)F=G.randomBytes(128),F=new Uint32Array(new Uint8Array(F).buffer),sjcl.random.addEntropy(F,1024,"crypto['randomBytes']");else if("undefined"!=typeof window&&"undefined"!=typeof Uint32Array){if(H=new Uint32Array(32),window.crypto&&window.crypto.getRandomValues)window.crypto.getRandomValues(H);else{if(!window.msCrypto||!window.msCrypto.getRandomValues)break a;window.msCrypto.getRandomValues(H)}sjcl.random.addEntropy(H,1024,"crypto['getRandomValues']")}}catch(M){"undefined"!=typeof window&&window.console&&(console.log("There was an error collecting entropy from the browser:"),console.log(M))}sjcl.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},Y:function(a,b,c,d){c=c||{},d=d||{};var e,f=sjcl.json,g=f.e({iv:sjcl.random.randomWords(4,0)},f.defaults);return f.e(g,c),c=g.adata,"string"==typeof g.salt&&(g.salt=sjcl.codec.base64.toBits(g.salt)),"string"==typeof g.iv&&(g.iv=sjcl.codec.base64.toBits(g.iv)),(!sjcl.mode[g.mode]||!sjcl.cipher[g.cipher]||"string"==typeof a&&100>=g.iter||64!==g.ts&&96!==g.ts&&128!==g.ts||128!==g.ks&&192!==g.ks&&256!==g.ks||2>g.iv.length||4<g.iv.length)&&q(new sjcl.exception.invalid("json encrypt: invalid parameters")),"string"==typeof a?(e=sjcl.misc.cachedPbkdf2(a,g),a=e.key.slice(0,g.ks/32),g.salt=e.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.publicKey&&(e=a.kem(),g.kemtag=e.tag,a=e.key.slice(0,g.ks/32)),"string"==typeof b&&(b=sjcl.codec.utf8String.toBits(b)),"string"==typeof c&&(c=sjcl.codec.utf8String.toBits(c)),e=new sjcl.cipher[g.cipher](a),f.e(d,g),d.key=a,g.ct=sjcl.mode[g.mode].encrypt(e,b,g.iv,c,g.ts),g},encrypt:function(){var a=sjcl.json,b=a.Y.apply(a,arguments);return a.encode(b)},X:function(a,b,c,d){c=c||{},d=d||{};var e=sjcl.json;b=e.e(e.e(e.e({},e.defaults),b),c,!0);var f,g;return f=b.adata,"string"==typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt)),"string"==typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv)),(!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"==typeof a&&100>=b.iter||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&256!==b.ks||!b.iv||2>b.iv.length||4<b.iv.length)&&q(new sjcl.exception.invalid("json decrypt: invalid parameters")),"string"==typeof a?(g=sjcl.misc.cachedPbkdf2(a,b),a=g.key.slice(0,b.ks/32),b.salt=g.salt):sjcl.ecc&&a instanceof sjcl.ecc.elGamal.secretKey&&(a=a.unkem(sjcl.codec.base64.toBits(b.kemtag)).slice(0,b.ks/32)),"string"==typeof f&&(f=sjcl.codec.utf8String.toBits(f)),g=new sjcl.cipher[b.cipher](a),f=sjcl.mode[b.mode].decrypt(g,b.ct,b.iv,f,b.ts),e.e(d,b),d.key=a,1===c.raw?f:sjcl.codec.utf8String.fromBits(f)},decrypt:function(a,b,c,d){var e=sjcl.json;return e.X(a,e.decode(b),c,d)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b))switch(b.match(/^[a-z0-9]+$/i)||q(new sjcl.exception.invalid("json encode: invalid property name")),c+=d+'"'+b+'":',d=",",typeof a[b]){case"number":case"boolean":c+=a[b];break;case"string":c+='"'+escape(a[b])+'"';break;case"object":c+='"'+sjcl.codec.base64.fromBits(a[b],0)+'"';break;default:q(new sjcl.exception.bug("json encode: unsupported type"))}return c+"}"},decode:function(a){a=a.replace(/\s/g,""),a.match(/^\{.*\}$/)||q(new sjcl.exception.invalid("json decode: this isn't json!")),a=a.replace(/^\{|\}$/g,"").split(/,/);var b,c,d={};for(b=0;b<a.length;b++)(c=a[b].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i))||q(new sjcl.exception.invalid("json decode: this isn't json!")),d[c[2]]=c[3]?parseInt(c[3],10):c[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(c[4]):unescape(c[4]);return d},e:function(a,b,c){if(a===t&&(a={}),b===t)return a;for(var d in b)b.hasOwnProperty(d)&&(c&&a[d]!==t&&a[d]!==b[d]&&q(new sjcl.exception.invalid("required parameter overridden")),a[d]=b[d]);return a},ea:function(a,b){var c,d={};for(c in a)a.hasOwnProperty(c)&&a[c]!==b[c]&&(d[c]=a[c]);return d},da:function(a,b){var c,d={};for(c=0;c<b.length;c++)a[b[c]]!==t&&(d[b[c]]=a[b[c]]);return d}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.ca={},sjcl.misc.cachedPbkdf2=function(a,b){var c,d=sjcl.misc.ca;
return b=b||{},c=b.iter||1e3,d=d[a]=d[a]||{},c=d[c]=d[c]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)},d=b.salt===t?c.firstSalt:b.salt,c[d]=c[d]||sjcl.misc.pbkdf2(a,d,b.iter),{key:c[d].slice(0),salt:d.slice(0)}},angular.module("ConfigModule",[]).constant("APP_CFG","strasburgo");var common=angular.module("CommonModule",["ConfigModule"]).factory("customFactory",["APP_CFG",function(a){var b=new Secur(a);return{login:function(a){b.setK(a,!0)},logout:function(){localStorage.clear(),b.setK(a)},get:function(a){var c=localStorage[a];return c?angular.fromJson(b.decrypt(c)):null},set:function(a,c){localStorage[a]=b.encrypt(angular.toJson(c||"undefined"))}}}]);$(window).scroll(function(){$(".navbar").offset().top>50?$(".navbar-fixed-top,.navbar-fixed-bottom").addClass("top-nav-collapse"):$(".navbar-fixed-top,.navbar-fixed-bottom").removeClass("top-nav-collapse")}),$(function(){$("a.page-scroll").bind("click",function(a){var b=$(this);$("html, body").stop().animate({scrollTop:$(b.attr("href")).offset().top},1500,"easeInOutExpo"),a.preventDefault()})}),$(".navbar-collapse ul li a").click(function(){$(".navbar-toggle:visible").click()}),google.maps.event.addDomListener(window,"load",init);