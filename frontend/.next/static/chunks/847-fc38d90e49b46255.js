(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[847],{6435:function(r,n,c){"use strict";c.d(n,{F:function(){return y},f:function(){return $}});var d=c(2265);let h=["light","dark"],g="(prefers-color-scheme: dark)",v="undefined"==typeof window,x=(0,d.createContext)(void 0),C={setTheme:r=>{},themes:[]},y=()=>{var r;return null!==(r=(0,d.useContext)(x))&&void 0!==r?r:C},$=r=>(0,d.useContext)(x)?d.createElement(d.Fragment,null,r.children):d.createElement(f,r),k=["light","dark"],f=({forcedTheme:r,disableTransitionOnChange:n=!1,enableSystem:c=!0,enableColorScheme:v=!0,storageKey:C="theme",themes:F=k,defaultTheme:j=c?"system":"light",attribute:z="data-theme",value:T,children:I,nonce:O})=>{let[A,N]=(0,d.useState)(()=>S(C,j)),[L,M]=(0,d.useState)(()=>S(C)),D=T?Object.values(T):F,q=(0,d.useCallback)(r=>{let d=r;if(!d)return;"system"===r&&c&&(d=p());let g=T?T[d]:d,x=n?b():null,C=document.documentElement;if("class"===z?(C.classList.remove(...D),g&&C.classList.add(g)):g?C.setAttribute(z,g):C.removeAttribute(z),v){let r=h.includes(j)?j:null,n=h.includes(d)?d:r;C.style.colorScheme=n}null==x||x()},[]),J=(0,d.useCallback)(r=>{N(r);try{localStorage.setItem(C,r)}catch(r){}},[r]),B=(0,d.useCallback)(n=>{let d=p(n);M(d),"system"===A&&c&&!r&&q("system")},[A,r]);(0,d.useEffect)(()=>{let r=window.matchMedia(g);return r.addListener(B),B(r),()=>r.removeListener(B)},[B]),(0,d.useEffect)(()=>{let e=r=>{r.key===C&&J(r.newValue||j)};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[J]),(0,d.useEffect)(()=>{q(null!=r?r:A)},[r,A]);let K=(0,d.useMemo)(()=>({theme:A,setTheme:J,forcedTheme:r,resolvedTheme:"system"===A?L:A,themes:c?[...F,"system"]:F,systemTheme:c?L:void 0}),[A,J,r,L,c,F]);return d.createElement(x.Provider,{value:K},d.createElement(R,{forcedTheme:r,disableTransitionOnChange:n,enableSystem:c,enableColorScheme:v,storageKey:C,themes:F,defaultTheme:j,attribute:z,value:T,children:I,attrs:D,nonce:O}),I)},R=(0,d.memo)(({forcedTheme:r,storageKey:n,attribute:c,enableSystem:v,enableColorScheme:x,defaultTheme:C,value:k,attrs:R,nonce:F})=>{let j="system"===C,z="class"===c?`var d=document.documentElement,c=d.classList;c.remove(${R.map(r=>`'${r}'`).join(",")});`:`var d=document.documentElement,n='${c}',s='setAttribute';`,T=x?h.includes(C)&&C?`if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${C}'`:"if(e==='light'||e==='dark')d.style.colorScheme=e":"",$=(r,n=!1,d=!0)=>{let g=k?k[r]:r,v=n?r+"|| ''":`'${g}'`,C="";return x&&d&&!n&&h.includes(r)&&(C+=`d.style.colorScheme = '${r}';`),"class"===c?C+=n||g?`c.add(${v})`:"null":g&&(C+=`d[s](n,${v})`),C},I=r?`!function(){${z}${$(r)}}()`:v?`!function(){try{${z}var e=localStorage.getItem('${n}');if('system'===e||(!e&&${j})){var t='${g}',m=window.matchMedia(t);if(m.media!==t||m.matches){${$("dark")}}else{${$("light")}}}else if(e){${k?`var x=${JSON.stringify(k)};`:""}${$(k?"x[e]":"e",!0)}}${j?"":"else{"+$(C,!1,!1)+"}"}${T}}catch(e){}}()`:`!function(){try{${z}var e=localStorage.getItem('${n}');if(e){${k?`var x=${JSON.stringify(k)};`:""}${$(k?"x[e]":"e",!0)}}else{${$(C,!1,!1)};}${T}}catch(t){}}();`;return d.createElement("script",{nonce:F,dangerouslySetInnerHTML:{__html:I}})},()=>!0),S=(r,n)=>{let c;if(!v){try{c=localStorage.getItem(r)||void 0}catch(r){}return c||n}},b=()=>{let r=document.createElement("style");return r.appendChild(document.createTextNode("*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(r),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(r)},1)}},p=r=>(r||(r=window.matchMedia(g)),r.matches?"dark":"light")},6049:function(r,n,c){var d=c(2601);c(472);var h=c(2265),g=h&&"object"==typeof h&&"default"in h?h:{default:h};function _defineProperties(r,n){for(var c=0;c<n.length;c++){var d=n[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(r,d.key,d)}}function _createClass(r,n,c){return n&&_defineProperties(r.prototype,n),c&&_defineProperties(r,c),r}var v=void 0!==d&&d.env&&!0,isString=function(r){return"[object String]"===Object.prototype.toString.call(r)},x=function(){function StyleSheet(r){var n=void 0===r?{}:r,c=n.name,d=void 0===c?"stylesheet":c,h=n.optimizeForSpeed,g=void 0===h?v:h;invariant$1(isString(d),"`name` must be a string"),this._name=d,this._deletedRulePlaceholder="#"+d+"-deleted-rule____{}",invariant$1("boolean"==typeof g,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=g,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var x=document.querySelector('meta[property="csp-nonce"]');this._nonce=x?x.getAttribute("content"):null}var r=StyleSheet.prototype;return r.setOptimizeForSpeed=function(r){invariant$1("boolean"==typeof r,"`setOptimizeForSpeed` accepts a boolean"),invariant$1(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=r,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var r=this;if(invariant$1(!this._injected,"sheet already injected"),this._injected=!0,this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(v||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(n,c){return"number"==typeof c?r._serverSheet.cssRules[c]={cssText:n}:r._serverSheet.cssRules.push({cssText:n}),c},deleteRule:function(n){r._serverSheet.cssRules[n]=null}}},r.getSheetForTag=function(r){if(r.sheet)return r.sheet;for(var n=0;n<document.styleSheets.length;n++)if(document.styleSheets[n].ownerNode===r)return document.styleSheets[n]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(r,n){if(invariant$1(isString(r),"`insertRule` accepts only strings"),this._optimizeForSpeed){var c=this.getSheet();"number"!=typeof n&&(n=c.cssRules.length);try{c.insertRule(r,n)}catch(n){return v||console.warn("StyleSheet: illegal rule: \n\n"+r+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var d=this._tags[n];this._tags.push(this.makeStyleTag(this._name,r,d))}return this._rulesCount++},r.replaceRule=function(r,n){if(this._optimizeForSpeed){var c=this.getSheet();if(n.trim()||(n=this._deletedRulePlaceholder),!c.cssRules[r])return r;c.deleteRule(r);try{c.insertRule(n,r)}catch(d){v||console.warn("StyleSheet: illegal rule: \n\n"+n+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),c.insertRule(this._deletedRulePlaceholder,r)}}else{var d=this._tags[r];invariant$1(d,"old rule at index `"+r+"` not found"),d.textContent=n}return r},r.deleteRule=function(r){if(this._optimizeForSpeed)this.replaceRule(r,"");else{var n=this._tags[r];invariant$1(n,"rule at index `"+r+"` not found"),n.parentNode.removeChild(n),this._tags[r]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,this._tags.forEach(function(r){return r&&r.parentNode.removeChild(r)}),this._tags=[]},r.cssRules=function(){var r=this;return this._tags.reduce(function(n,c){return c?n=n.concat(Array.prototype.map.call(r.getSheetForTag(c).cssRules,function(n){return n.cssText===r._deletedRulePlaceholder?null:n})):n.push(null),n},[])},r.makeStyleTag=function(r,n,c){n&&invariant$1(isString(n),"makeStyleTag accepts only strings as second parameter");var d=document.createElement("style");this._nonce&&d.setAttribute("nonce",this._nonce),d.type="text/css",d.setAttribute("data-"+r,""),n&&d.appendChild(document.createTextNode(n));var h=document.head||document.getElementsByTagName("head")[0];return c?h.insertBefore(d,c):h.appendChild(d),d},_createClass(StyleSheet,[{key:"length",get:function(){return this._rulesCount}}]),StyleSheet}();function invariant$1(r,n){if(!r)throw Error("StyleSheet: "+n+".")}var stringHash=function(r){for(var n=5381,c=r.length;c;)n=33*n^r.charCodeAt(--c);return n>>>0},C={};function computeId(r,n){if(!n)return"jsx-"+r;var c=String(n),d=r+c;return C[d]||(C[d]="jsx-"+stringHash(r+"-"+c)),C[d]}function computeSelector(r,n){var c=r+n;return C[c]||(C[c]=n.replace(/__jsx-style-dynamic-selector/g,r)),C[c]}function mapRulesToStyle(r,n){return void 0===n&&(n={}),r.map(function(r){var c=r[0],d=r[1];return g.default.createElement("style",{id:"__"+c,key:"__"+c,nonce:n.nonce?n.nonce:void 0,dangerouslySetInnerHTML:{__html:d}})})}var k=function(){function StyleSheetRegistry(r){var n=void 0===r?{}:r,c=n.styleSheet,d=void 0===c?null:c,h=n.optimizeForSpeed,g=void 0!==h&&h;this._sheet=d||new x({name:"styled-jsx",optimizeForSpeed:g}),this._sheet.inject(),d&&"boolean"==typeof g&&(this._sheet.setOptimizeForSpeed(g),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var r=StyleSheetRegistry.prototype;return r.add=function(r){var n=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(r.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(r,n){return r[n]=0,r},{}));var c=this.getIdAndRules(r),d=c.styleId,h=c.rules;if(d in this._instancesCounts){this._instancesCounts[d]+=1;return}var g=h.map(function(r){return n._sheet.insertRule(r)}).filter(function(r){return -1!==r});this._indices[d]=g,this._instancesCounts[d]=1},r.remove=function(r){var n=this,c=this.getIdAndRules(r).styleId;if(invariant(c in this._instancesCounts,"styleId: `"+c+"` not found"),this._instancesCounts[c]-=1,this._instancesCounts[c]<1){var d=this._fromServer&&this._fromServer[c];d?(d.parentNode.removeChild(d),delete this._fromServer[c]):(this._indices[c].forEach(function(r){return n._sheet.deleteRule(r)}),delete this._indices[c]),delete this._instancesCounts[c]}},r.update=function(r,n){this.add(n),this.remove(r)},r.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},r.cssRules=function(){var r=this,n=this._fromServer?Object.keys(this._fromServer).map(function(n){return[n,r._fromServer[n]]}):[],c=this._sheet.cssRules();return n.concat(Object.keys(this._indices).map(function(n){return[n,r._indices[n].map(function(r){return c[r].cssText}).join(r._optimizeForSpeed?"":"\n")]}).filter(function(r){return!!r[1]}))},r.styles=function(r){return mapRulesToStyle(this.cssRules(),r)},r.getIdAndRules=function(r){var n=r.children,c=r.dynamic,d=r.id;if(c){var h=computeId(d,c);return{styleId:h,rules:Array.isArray(n)?n.map(function(r){return computeSelector(h,r)}):[computeSelector(h,n)]}}return{styleId:computeId(d),rules:Array.isArray(n)?n:[n]}},r.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(r,n){return r[n.id.slice(2)]=n,r},{})},StyleSheetRegistry}();function invariant(r,n){if(!r)throw Error("StyleSheetRegistry: "+n+".")}var R=h.createContext(null);function useStyleRegistry(){return h.useContext(R)}R.displayName="StyleSheetContext";var F=g.default.useInsertionEffect||g.default.useLayoutEffect,j=new k;function JSXStyle(r){var n=j||useStyleRegistry();return n&&F(function(){return n.add(r),function(){n.remove(r)}},[r.id,String(r.dynamic)]),null}JSXStyle.dynamic=function(r){return r.map(function(r){return computeId(r[0],r[1])}).join(" ")},n.style=JSXStyle},9738:function(r,n,c){"use strict";r.exports=c(6049).style},472:function(){},8868:function(r,n,c){"use strict";c.d(n,{Y:function(){return useInView}});var d=c(2265),h=c(9920);let g={some:0,all:1};function inView(r,n,{root:c,margin:d,amount:v="some"}={}){let x=(0,h.IG)(r),C=new WeakMap,k=new IntersectionObserver(r=>{r.forEach(r=>{let c=C.get(r.target);if(!!c!==r.isIntersecting){if(r.isIntersecting){let c=n(r);"function"==typeof c?C.set(r.target,c):k.unobserve(r.target)}else"function"==typeof c&&(c(r),C.delete(r.target))}})},{root:c,rootMargin:d,threshold:"number"==typeof v?v:g[v]});return x.forEach(r=>k.observe(r)),()=>k.disconnect()}function useInView(r,{root:n,margin:c,amount:h,once:g=!1}={}){let[v,x]=(0,d.useState)(!1);return(0,d.useEffect)(()=>{if(!r.current||g&&v)return;let d={root:n&&n.current||void 0,margin:c,amount:h};return inView(r.current,()=>(x(!0),g?void 0:()=>x(!1)),d)},[n,r,c,g,h]),v}},5925:function(r,n,c){"use strict";let d,h;c.d(n,{x7:function(){return Fe},Am:function(){return dist_n}});var g=c(2265);let v={data:""},t=r=>{if("object"==typeof window){let n=(r?r.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return n.nonce=window.__nonce__,n.parentNode||(r||document.head).appendChild(n),n.firstChild}return r||v},x=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,C=/\/\*[^]*?\*\/|  +/g,k=/\n+/g,o=(r,n)=>{let c="",d="",h="";for(let g in r){let v=r[g];"@"==g[0]?"i"==g[1]?c=g+" "+v+";":d+="f"==g[1]?o(v,g):g+"{"+o(v,"k"==g[1]?"":n)+"}":"object"==typeof v?d+=o(v,n?n.replace(/([^,])+/g,r=>g.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,n=>/&/.test(n)?n.replace(/&/g,r):r?r+" "+n:n)):g):null!=v&&(g=/^--/.test(g)?g:g.replace(/[A-Z]/g,"-$&").toLowerCase(),h+=o.p?o.p(g,v):g+":"+v+";")}return c+(n&&h?n+"{"+h+"}":h)+d},R={},s=r=>{if("object"==typeof r){let n="";for(let c in r)n+=c+s(r[c]);return n}return r},i=(r,n,c,d,h)=>{var g;let v=s(r),F=R[v]||(R[v]=(r=>{let n=0,c=11;for(;n<r.length;)c=101*c+r.charCodeAt(n++)>>>0;return"go"+c})(v));if(!R[F]){let n=v!==r?r:(r=>{let n,c,d=[{}];for(;n=x.exec(r.replace(C,""));)n[4]?d.shift():n[3]?(c=n[3].replace(k," ").trim(),d.unshift(d[0][c]=d[0][c]||{})):d[0][n[1]]=n[2].replace(k," ").trim();return d[0]})(r);R[F]=o(h?{["@keyframes "+F]:n}:n,c?"":"."+F)}let j=c&&R.g?R.g:null;return c&&(R.g=R[F]),g=R[F],j?n.data=n.data.replace(j,g):-1===n.data.indexOf(g)&&(n.data=d?g+n.data:n.data+g),F},p=(r,n,c)=>r.reduce((r,d,h)=>{let g=n[h];if(g&&g.call){let r=g(c),n=r&&r.props&&r.props.className||/^go/.test(r)&&r;g=n?"."+n:r&&"object"==typeof r?r.props?"":o(r,""):!1===r?"":r}return r+d+(null==g?"":g)},"");function u(r){let n=this||{},c=r.call?r(n.p):r;return i(c.unshift?c.raw?p(c,[].slice.call(arguments,1),n.p):c.reduce((r,c)=>Object.assign(r,c&&c.call?c(n.p):c),{}):c,t(n.target),n.g,n.o,n.k)}u.bind({g:1});let F,j,z,T=u.bind({k:1});function m(r,n,c,d){o.p=n,F=r,j=c,z=d}function w(r,n){let c=this||{};return function(){let d=arguments;function a(h,g){let v=Object.assign({},h),x=v.className||a.className;c.p=Object.assign({theme:j&&j()},v),c.o=/ *go\d+/.test(x),v.className=u.apply(c,d)+(x?" "+x:""),n&&(v.ref=g);let C=r;return r[0]&&(C=v.as||r,delete v.as),z&&C[0]&&z(v),F(C,v)}return n?n(a):a}}var Z=r=>"function"==typeof r,dist_h=(r,n)=>Z(r)?r(n):r,I=(d=0,()=>(++d).toString()),E=()=>{if(void 0===h&&"u">typeof window){let r=matchMedia("(prefers-reduced-motion: reduce)");h=!r||r.matches}return h},O="default",H=(r,n)=>{let{toastLimit:c}=r.settings;switch(n.type){case 0:return{...r,toasts:[n.toast,...r.toasts].slice(0,c)};case 1:return{...r,toasts:r.toasts.map(r=>r.id===n.toast.id?{...r,...n.toast}:r)};case 2:let{toast:d}=n;return H(r,{type:r.toasts.find(r=>r.id===d.id)?1:0,toast:d});case 3:let{toastId:h}=n;return{...r,toasts:r.toasts.map(r=>r.id===h||void 0===h?{...r,dismissed:!0,visible:!1}:r)};case 4:return void 0===n.toastId?{...r,toasts:[]}:{...r,toasts:r.toasts.filter(r=>r.id!==n.toastId)};case 5:return{...r,pausedAt:n.time};case 6:let g=n.time-(r.pausedAt||0);return{...r,pausedAt:void 0,toasts:r.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+g}))}}},A=[],N={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},L={},Y=(r,n=O)=>{L[n]=H(L[n]||N,r),A.forEach(([r,c])=>{r===n&&c(L[n])})},_=r=>Object.keys(L).forEach(n=>Y(r,n)),Q=r=>Object.keys(L).find(n=>L[n].toasts.some(n=>n.id===r)),S=(r=O)=>n=>{Y(n,r)},M={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(r={},n=O)=>{let[c,d]=(0,g.useState)(L[n]||N),h=(0,g.useRef)(L[n]);(0,g.useEffect)(()=>(h.current!==L[n]&&d(L[n]),A.push([n,d]),()=>{let r=A.findIndex(([r])=>r===n);r>-1&&A.splice(r,1)}),[n]);let v=c.toasts.map(n=>{var c,d,h;return{...r,...r[n.type],...n,removeDelay:n.removeDelay||(null==(c=r[n.type])?void 0:c.removeDelay)||(null==r?void 0:r.removeDelay),duration:n.duration||(null==(d=r[n.type])?void 0:d.duration)||(null==r?void 0:r.duration)||M[n.type],style:{...r.style,...null==(h=r[n.type])?void 0:h.style,...n.style}}});return{...c,toasts:v}},ie=(r,n="blank",c)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:n,ariaProps:{role:"status","aria-live":"polite"},message:r,pauseDuration:0,...c,id:(null==c?void 0:c.id)||I()}),P=r=>(n,c)=>{let d=ie(n,r,c);return S(d.toasterId||Q(d.id))({type:2,toast:d}),d.id},dist_n=(r,n)=>P("blank")(r,n);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(r,n)=>{let c={type:3,toastId:r};n?S(n)(c):_(c)},dist_n.dismissAll=r=>dist_n.dismiss(void 0,r),dist_n.remove=(r,n)=>{let c={type:4,toastId:r};n?S(n)(c):_(c)},dist_n.removeAll=r=>dist_n.remove(void 0,r),dist_n.promise=(r,n,c)=>{let d=dist_n.loading(n.loading,{...c,...null==c?void 0:c.loading});return"function"==typeof r&&(r=r()),r.then(r=>{let h=n.success?dist_h(n.success,r):void 0;return h?dist_n.success(h,{id:d,...c,...null==c?void 0:c.success}):dist_n.dismiss(d),r}).catch(r=>{let h=n.error?dist_h(n.error,r):void 0;h?dist_n.error(h,{id:d,...c,...null==c?void 0:c.error}):dist_n.dismiss(d)}),r};var D=1e3,dist_w=(r,n="default")=>{let{toasts:c,pausedAt:d}=V(r,n),h=(0,g.useRef)(new Map).current,v=(0,g.useCallback)((r,n=D)=>{if(h.has(r))return;let c=setTimeout(()=>{h.delete(r),x({type:4,toastId:r})},n);h.set(r,c)},[]);(0,g.useEffect)(()=>{if(d)return;let r=Date.now(),h=c.map(c=>{if(c.duration===1/0)return;let d=(c.duration||0)+c.pauseDuration-(r-c.createdAt);if(d<0){c.visible&&dist_n.dismiss(c.id);return}return setTimeout(()=>dist_n.dismiss(c.id,n),d)});return()=>{h.forEach(r=>r&&clearTimeout(r))}},[c,d,n]);let x=(0,g.useCallback)(S(n),[n]),C=(0,g.useCallback)(()=>{x({type:5,time:Date.now()})},[x]),k=(0,g.useCallback)((r,n)=>{x({type:1,toast:{id:r,height:n}})},[x]),R=(0,g.useCallback)(()=>{d&&x({type:6,time:Date.now()})},[d,x]),F=(0,g.useCallback)((r,n)=>{let{reverseOrder:d=!1,gutter:h=8,defaultPosition:g}=n||{},v=c.filter(n=>(n.position||g)===(r.position||g)&&n.height),x=v.findIndex(n=>n.id===r.id),C=v.filter((r,n)=>n<x&&r.visible).length;return v.filter(r=>r.visible).slice(...d?[C+1]:[0,C]).reduce((r,n)=>r+(n.height||0)+h,0)},[c]);return(0,g.useEffect)(()=>{c.forEach(r=>{if(r.dismissed)v(r.id,r.removeDelay);else{let n=h.get(r.id);n&&(clearTimeout(n),h.delete(r.id))}})},[c,v]),{toasts:c,handlers:{updateHeight:k,startPause:C,endPause:R,calculateOffset:F}}},q=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,J=T`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=T`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,K=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${r=>r.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${q} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${J} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${r=>r.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,X=T`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,U=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${r=>r.secondary||"#e0e0e0"};
  border-right-color: ${r=>r.primary||"#616161"};
  animation: ${X} 1s linear infinite;
`,G=T`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,W=T`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,ee=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${r=>r.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${G} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${W} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${r=>r.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,et=w("div")`
  position: absolute;
`,er=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,ei=T`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,en=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${ei} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:r})=>{let{icon:n,type:c,iconTheme:d}=r;return void 0!==n?"string"==typeof n?g.createElement(en,null,n):n:"blank"===c?null:g.createElement(er,null,g.createElement(U,{...d}),"loading"!==c&&g.createElement(et,null,"error"===c?g.createElement(K,{...d}):g.createElement(ee,{...d})))},Re=r=>`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=r=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`,es=w("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,eo=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(r,n)=>{let c=r.includes("top")?1:-1,[d,h]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(c),Ee(c)];return{animation:n?`${T(d)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${T(h)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ea=g.memo(({toast:r,position:n,style:c,children:d})=>{let h=r.height?ke(r.position||n||"top-center",r.visible):{opacity:0},v=g.createElement($,{toast:r}),x=g.createElement(eo,{...r.ariaProps},dist_h(r.message,r));return g.createElement(es,{className:r.className,style:{...h,...c,...r.style}},"function"==typeof d?d({icon:v,message:x}):g.createElement(g.Fragment,null,v,x))});m(g.createElement);var we=({id:r,className:n,style:c,onHeightUpdate:d,children:h})=>{let v=g.useCallback(n=>{if(n){let l=()=>{d(r,n.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[r,d]);return g.createElement("div",{ref:v,className:n,style:c},h)},Me=(r,n)=>{let c=r.includes("top"),d=r.includes("center")?{justifyContent:"center"}:r.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${n*(c?1:-1)}px)`,...c?{top:0}:{bottom:0},...d}},el=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:r,position:n="top-center",toastOptions:c,gutter:d,children:h,toasterId:v,containerStyle:x,containerClassName:C})=>{let{toasts:k,handlers:R}=dist_w(c,v);return g.createElement("div",{"data-rht-toaster":v||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...x},className:C,onMouseEnter:R.startPause,onMouseLeave:R.endPause},k.map(c=>{let v=c.position||n,x=Me(v,R.calculateOffset(c,{reverseOrder:r,gutter:d,defaultPosition:n}));return g.createElement(we,{id:c.id,key:c.id,onHeightUpdate:R.updateHeight,className:c.visible?el:"",style:x},"custom"===c.type?dist_h(c.message,c):h?h(c):g.createElement(ea,{toast:c,position:v}))}))}}}]);