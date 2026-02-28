(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[354],{4114:function(e,r,n){Promise.resolve().then(n.bind(n,7314))},7314:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return SettingsPage}});var c=n(7437),d=n(2265),h=n(2749),f=n(4033),g=n(9843),y=n(5925),b=n(8971),x=n(9172);function SettingsPage(){let e=(0,f.useParams)(),r=e.secret,{data:n,status:v}=(0,h.useSession)(),[j,A]=(0,d.useState)(!1),[N,k]=(0,d.useState)(""),[T,O]=(0,d.useState)(!0),[C,W]=(0,d.useState)(!1);if("loading"===v)return(0,c.jsx)("p",{className:"text-center text-white py-10",children:"جاري التحميل..."});n||(0,f.redirect)("/admin/".concat(r,"/login")),(0,d.useEffect)(()=>{let fetchSettings=async()=>{try{let e=await g.y.getStatus();A(e.isEnabled),k(e.message||"")}catch(e){y.Am.error("فشل في تحميل الإعدادات")}finally{O(!1)}};fetchSettings()},[]);let handleSave=async()=>{W(!0);try{await g.y.updateStatus({isEnabled:j,message:N}),y.Am.success("تم حفظ الإعدادات بنجاح")}catch(e){y.Am.error("فشل في حفظ الإعدادات")}finally{W(!1)}};return T?(0,c.jsx)("div",{className:"text-center py-10 text-white",children:"جاري التحميل..."}):(0,c.jsxs)(b.E.div,{initial:{opacity:0},animate:{opacity:1},children:[(0,c.jsxs)("h1",{className:"text-3xl font-bold text-white mb-8 flex items-center gap-3",children:[(0,c.jsx)(x.l51,{className:"text-[#00c6ff]"}),"إعدادات الموقع"]}),(0,c.jsxs)("div",{className:"bg-gray-800 rounded-lg p-6 max-w-2xl",children:[(0,c.jsx)("h2",{className:"text-xl font-bold text-white mb-6",children:"وضع الصيانة"}),(0,c.jsxs)("div",{className:"space-y-6",children:[(0,c.jsxs)("div",{className:"flex items-center justify-between",children:[(0,c.jsx)("label",{className:"text-gray-300",children:"تفعيل وضع الصيانة"}),(0,c.jsxs)("button",{onClick:()=>A(!j),className:"relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg flex items-center justify-center focus:outline-none overflow-hidden group",children:[(0,c.jsx)(b.E.div,{animate:{scale:j?1.2:1,rotate:j?360:0},transition:{type:"spring",stiffness:200,damping:15},className:"text-white text-3xl",children:(0,c.jsx)(x.l51,{})}),(0,c.jsx)(b.E.div,{animate:{opacity:j?1:0,scale:j?1:.5},className:"absolute inset-0 bg-white/20 rounded-full"}),j&&(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(b.E.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.1},className:"absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"}),(0,c.jsx)(b.E.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.2},className:"absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full"}),(0,c.jsx)(b.E.div,{initial:{scale:0},animate:{scale:1},transition:{delay:.15},className:"absolute top-0 left-2 w-1.5 h-1.5 bg-white rounded-full"})]})]})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{className:"block text-gray-300 mb-2",children:"رسالة الصيانة"}),(0,c.jsx)("textarea",{value:N,onChange:e=>k(e.target.value),rows:4,className:"w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:border-[#00c6ff] outline-none",placeholder:"أدخل رسالة الصيانة..."})]}),(0,c.jsx)("div",{className:"flex justify-end",children:(0,c.jsxs)(b.E.button,{onClick:handleSave,disabled:C,whileHover:{scale:1.05},whileTap:{scale:.95},className:"relative px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group",children:[(0,c.jsx)("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[void 0,void 0,void 0,void 0,void 0].map((e,r)=>(0,c.jsx)(b.E.div,{className:"absolute w-1 h-1 bg-white/30 rounded-full",initial:{x:200*Math.random()-100,y:-20,opacity:0},animate:{y:60,opacity:[0,1,0],x:"+=".concat(20*Math.sin(r))},transition:{duration:2+2*Math.random(),repeat:1/0,delay:.3*r,ease:"linear"}},r))}),(0,c.jsxs)("span",{className:"relative z-10 flex items-center gap-2",children:[(0,c.jsx)(b.E.div,{animate:{rotate:360},transition:{duration:3,repeat:1/0,ease:"linear"},className:"text-white",children:(0,c.jsx)(x.l51,{})}),C?"جاري الحفظ...":"حفظ الإعدادات"]}),(0,c.jsx)(b.E.div,{className:"absolute inset-0 bg-white/20",initial:{opacity:0},whileHover:{opacity:1},transition:{duration:.3}})]})}),j&&(0,c.jsx)("div",{className:"bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4",children:(0,c.jsx)("p",{className:"text-yellow-500 text-sm",children:"⚠️ وضع الصيانة مفعل حالياً. الزوار سيشاهدون صفحة الصيانة بدلاً من الموقع الرئيسي."})})]})]})]})}},9843:function(e,r,n){"use strict";n.d(r,{LY:function(){return f},Zw:function(){return b},aq:function(){return j},eJ:function(){return A},g8:function(){return g},h$:function(){return x},pJ:function(){return k},qx:function(){return y},v1:function(){return T},y:function(){return N},yu:function(){return v}});var c=n(2749),d=n(2601);let h=d.env.NEXT_PUBLIC_API_URL;async function fetchPublic(e){if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await fetch("".concat(h).concat(e),{cache:"no-store"});if(!r.ok)throw Error("Failed to fetch");return r.json()}let f={getServices:()=>fetchPublic("/services"),getProjects:()=>fetchPublic("/projects"),getMaintenance:()=>fetchPublic("/maintenance"),getTeamMembers:()=>fetchPublic("/team"),getServiceDetails:()=>fetchPublic("/service-details"),getCompanyImages:()=>fetchPublic("/company-images"),getSettings:()=>fetchPublic("/settings")};async function getAccessToken(){try{let e=await (0,c.getSession)(),r=null==e?void 0:e.accessToken;if(r)return r}catch(e){}{let e=window.localStorage.getItem("riah_access_token");if(e)return e}return null}async function fetchWithAuth(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let n=await getAccessToken(),c={"Content-Type":"application/json",...n?{Authorization:"Bearer ".concat(n)}:{},...r.headers?r.headers:{}},d=await fetch("".concat(h).concat(e),{...r,headers:c});if(!d.ok){let e=await d.json().catch(()=>({}));if(401===d.status)throw Error("Unauthorized");throw Error(e.message||"Something went wrong")}return d.json()}let g={getAll:()=>fetchWithAuth("/users")},y={getAll:()=>fetchWithAuth("/projects"),getOne:e=>fetchWithAuth("/projects/".concat(e)),create:e=>fetchWithAuth("/projects",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/projects/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/projects/".concat(e),{method:"DELETE"})},b={getAll:()=>fetchWithAuth("/services"),getOne:e=>fetchWithAuth("/services/".concat(e)),create:e=>fetchWithAuth("/services",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/services/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/services/".concat(e),{method:"DELETE"})},x={getAll:()=>fetchWithAuth("/company-images"),create:e=>fetchWithAuth("/company-images",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/company-images/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/company-images/".concat(e),{method:"DELETE"})},v={getAll:()=>fetchWithAuth("/service-details"),create:e=>fetchWithAuth("/service-details",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/service-details/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/service-details/".concat(e),{method:"DELETE"})},j={uploadImage:async e=>{if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await getAccessToken();if(!r)throw Error("Unauthorized");let n=new FormData;n.append("file",e);let c=await fetch("".concat(h,"/api/uploads/image"),{method:"POST",headers:{Authorization:"Bearer ".concat(r)},body:n});if(!c.ok){let e=await c.json().catch(()=>({}));if(401===c.status)throw Error("Unauthorized");throw Error(e.message||"Upload failed")}let d=await c.json();return{url:d.url}},uploadVideo:async e=>{if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await getAccessToken();if(!r)throw Error("Unauthorized");let n=new FormData;n.append("file",e);let c=await fetch("".concat(h,"/api/uploads/video"),{method:"POST",headers:{Authorization:"Bearer ".concat(r)},body:n});if(!c.ok){let e=await c.json().catch(()=>({}));if(401===c.status)throw Error("Unauthorized");throw Error(e.message||"Upload failed")}let d=await c.json();return{url:d.url}}},A={sendMessage:async e=>{if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await fetch("".concat(h,"/contact"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok){let e=await r.json().catch(()=>({}));throw Error(e.message||"Failed to send message")}return r.json()}},N={getStatus:()=>fetchWithAuth("/maintenance"),updateStatus:e=>fetchWithAuth("/maintenance",{method:"PATCH",body:JSON.stringify(e)})},k={get:()=>fetchWithAuth("/settings"),update:e=>fetchWithAuth("/settings",{method:"PUT",body:JSON.stringify(e)})},T={getAll:()=>fetchWithAuth("/team"),create:e=>fetchWithAuth("/team",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/team/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/team/".concat(e),{method:"DELETE"})}},4033:function(e,r,n){e.exports=n(94)},5925:function(e,r,n){"use strict";let c,d;n.d(r,{x7:function(){return Fe},Am:function(){return dist_n}});var h=n(2265);let f={data:""},t=e=>{if("object"==typeof window){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||f},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,b=/\n+/g,o=(e,r)=>{let n="",c="",d="";for(let h in e){let f=e[h];"@"==h[0]?"i"==h[1]?n=h+" "+f+";":c+="f"==h[1]?o(f,h):h+"{"+o(f,"k"==h[1]?"":r)+"}":"object"==typeof f?c+=o(f,r?r.replace(/([^,])+/g,e=>h.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):h):null!=f&&(h=/^--/.test(h)?h:h.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=o.p?o.p(h,f):h+":"+f+";")}return n+(r&&d?r+"{"+d+"}":d)+c},x={},s=e=>{if("object"==typeof e){let r="";for(let n in e)r+=n+s(e[n]);return r}return e},i=(e,r,n,c,d)=>{var h;let f=s(e),v=x[f]||(x[f]=(e=>{let r=0,n=11;for(;r<e.length;)n=101*n+e.charCodeAt(r++)>>>0;return"go"+n})(f));if(!x[v]){let r=f!==e?e:(e=>{let r,n,c=[{}];for(;r=g.exec(e.replace(y,""));)r[4]?c.shift():r[3]?(n=r[3].replace(b," ").trim(),c.unshift(c[0][n]=c[0][n]||{})):c[0][r[1]]=r[2].replace(b," ").trim();return c[0]})(e);x[v]=o(d?{["@keyframes "+v]:r}:r,n?"":"."+v)}let j=n&&x.g?x.g:null;return n&&(x.g=x[v]),h=x[v],j?r.data=r.data.replace(j,h):-1===r.data.indexOf(h)&&(r.data=c?h+r.data:r.data+h),v},p=(e,r,n)=>e.reduce((e,c,d)=>{let h=r[d];if(h&&h.call){let e=h(n),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;h=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+c+(null==h?"":h)},"");function u(e){let r=this||{},n=e.call?e(r.p):e;return i(n.unshift?n.raw?p(n,[].slice.call(arguments,1),r.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(r.p):n),{}):n,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let v,j,A,N=u.bind({k:1});function m(e,r,n,c){o.p=r,v=e,j=n,A=c}function w(e,r){let n=this||{};return function(){let c=arguments;function a(d,h){let f=Object.assign({},d),g=f.className||a.className;n.p=Object.assign({theme:j&&j()},f),n.o=/ *go\d+/.test(g),f.className=u.apply(n,c)+(g?" "+g:""),r&&(f.ref=h);let y=e;return e[0]&&(y=f.as||e,delete f.as),A&&y[0]&&A(f),v(y,f)}return r?r(a):a}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,k=(c=0,()=>(++c).toString()),E=()=>{if(void 0===d&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");d=!e||e.matches}return d},T="default",H=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:c}=r;return H(e,{type:e.toasts.find(e=>e.id===c.id)?1:0,toast:c});case 3:let{toastId:d}=r;return{...e,toasts:e.toasts.map(e=>e.id===d||void 0===d?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let h=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+h}))}}},O=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},W={},Y=(e,r=T)=>{W[r]=H(W[r]||C,e),O.forEach(([e,n])=>{e===r&&n(W[r])})},_=e=>Object.keys(W).forEach(r=>Y(e,r)),Q=e=>Object.keys(W).find(r=>W[r].toasts.some(r=>r.id===e)),S=(e=T)=>r=>{Y(r,e)},U={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=T)=>{let[n,c]=(0,h.useState)(W[r]||C),d=(0,h.useRef)(W[r]);(0,h.useEffect)(()=>(d.current!==W[r]&&c(W[r]),O.push([r,c]),()=>{let e=O.findIndex(([e])=>e===r);e>-1&&O.splice(e,1)}),[r]);let f=n.toasts.map(r=>{var n,c,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(n=e[r.type])?void 0:n.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(c=e[r.type])?void 0:c.duration)||(null==e?void 0:e.duration)||U[r.type],style:{...e.style,...null==(d=e[r.type])?void 0:d.style,...r.style}}});return{...n,toasts:f}},ie=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||k()}),P=e=>(r,n)=>{let c=ie(r,e,n);return S(c.toasterId||Q(c.id))({type:2,toast:c}),c.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let n={type:3,toastId:e};r?S(r)(n):_(n)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let n={type:4,toastId:e};r?S(r)(n):_(n)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,n)=>{let c=dist_n.loading(r.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let d=r.success?dist_h(r.success,e):void 0;return d?dist_n.success(d,{id:c,...n,...null==n?void 0:n.success}):dist_n.dismiss(c),e}).catch(e=>{let d=r.error?dist_h(r.error,e):void 0;d?dist_n.error(d,{id:c,...n,...null==n?void 0:n.error}):dist_n.dismiss(c)}),e};var I=1e3,dist_w=(e,r="default")=>{let{toasts:n,pausedAt:c}=V(e,r),d=(0,h.useRef)(new Map).current,f=(0,h.useCallback)((e,r=I)=>{if(d.has(e))return;let n=setTimeout(()=>{d.delete(e),g({type:4,toastId:e})},r);d.set(e,n)},[]);(0,h.useEffect)(()=>{if(c)return;let e=Date.now(),d=n.map(n=>{if(n.duration===1/0)return;let c=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(c<0){n.visible&&dist_n.dismiss(n.id);return}return setTimeout(()=>dist_n.dismiss(n.id,r),c)});return()=>{d.forEach(e=>e&&clearTimeout(e))}},[n,c,r]);let g=(0,h.useCallback)(S(r),[r]),y=(0,h.useCallback)(()=>{g({type:5,time:Date.now()})},[g]),b=(0,h.useCallback)((e,r)=>{g({type:1,toast:{id:e,height:r}})},[g]),x=(0,h.useCallback)(()=>{c&&g({type:6,time:Date.now()})},[c,g]),v=(0,h.useCallback)((e,r)=>{let{reverseOrder:c=!1,gutter:d=8,defaultPosition:h}=r||{},f=n.filter(r=>(r.position||h)===(e.position||h)&&r.height),g=f.findIndex(r=>r.id===e.id),y=f.filter((e,r)=>r<g&&e.visible).length;return f.filter(e=>e.visible).slice(...c?[y+1]:[0,y]).reduce((e,r)=>e+(r.height||0)+d,0)},[n]);return(0,h.useEffect)(()=>{n.forEach(e=>{if(e.dismissed)f(e.id,e.removeDelay);else{let r=d.get(e.id);r&&(clearTimeout(r),d.delete(e.id))}})},[n,f]),{toasts:n,handlers:{updateHeight:b,startPause:y,endPause:x,calculateOffset:v}}},L=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,D=N`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,z=N`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,J=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${D} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,M=N`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${M} 1s linear infinite;
`,R=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,B=N`
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
}`,X=w("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${R} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${B} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,q=w("div")`
  position: absolute;
`,G=w("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,K=N`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,ee=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:n,iconTheme:c}=e;return void 0!==r?"string"==typeof r?h.createElement(ee,null,r):r:"blank"===n?null:h.createElement(G,null,h.createElement(F,{...c}),"loading"!==n&&h.createElement(q,null,"error"===n?h.createElement(J,{...c}):h.createElement(X,{...c})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,et=w("div")`
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
`,ea=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let n=e.includes("top")?1:-1,[c,d]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(n),Ee(n)];return{animation:r?`${N(c)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${N(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ei=h.memo(({toast:e,position:r,style:n,children:c})=>{let d=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},f=h.createElement($,{toast:e}),g=h.createElement(ea,{...e.ariaProps},dist_h(e.message,e));return h.createElement(et,{className:e.className,style:{...d,...n,...e.style}},"function"==typeof c?c({icon:f,message:g}):h.createElement(h.Fragment,null,f,g))});m(h.createElement);var we=({id:e,className:r,style:n,onHeightUpdate:c,children:d})=>{let f=h.useCallback(r=>{if(r){let l=()=>{c(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,c]);return h.createElement("div",{ref:f,className:r,style:n},d)},Me=(e,r)=>{let n=e.includes("top"),c=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...c}},es=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:c,children:d,toasterId:f,containerStyle:g,containerClassName:y})=>{let{toasts:b,handlers:x}=dist_w(n,f);return h.createElement("div",{"data-rht-toaster":f||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...g},className:y,onMouseEnter:x.startPause,onMouseLeave:x.endPause},b.map(n=>{let f=n.position||r,g=Me(f,x.calculateOffset(n,{reverseOrder:e,gutter:c,defaultPosition:r}));return h.createElement(we,{id:n.id,key:n.id,onHeightUpdate:x.updateHeight,className:n.visible?es:"",style:g},"custom"===n.type?dist_h(n.message,n):d?d(n):h.createElement(ei,{toast:n,position:f}))}))}}},function(e){e.O(0,[699,207,749,971,472,744],function(){return e(e.s=4114)}),_N_E=e.O()}]);