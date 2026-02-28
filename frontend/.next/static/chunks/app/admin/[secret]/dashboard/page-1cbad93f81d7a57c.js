(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[790],{3431:function(e,r,n){Promise.resolve().then(n.bind(n,7398))},7398:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return DashboardPage}});var c=n(7437),d=n(2265),h=n(2749),f=n(4033),g=n(8971),y=n(9172),b=n(9843),v=n(5925);function StatCard(e){let{title:r,value:n,loading:d}=e;return(0,c.jsxs)("div",{className:"glass-card p-6 rounded-xl border border-white/10 bg-gray-800",children:[(0,c.jsx)("h3",{className:"text-gray-400 text-sm",children:r}),d?(0,c.jsx)("div",{className:"h-8 w-16 bg-gray-700 animate-pulse rounded mt-2"}):(0,c.jsx)("p",{className:"text-4xl font-bold text-white mt-2",children:n})]})}function DashboardPage(){let e=(0,f.useParams)(),r=e.secret,{data:n,status:x}=(0,h.useSession)(),[A,j]=(0,d.useState)(0),[N,T]=(0,d.useState)(0),[k,O]=(0,d.useState)(0),[C,W]=(0,d.useState)(!0);return"loading"===x?(0,c.jsx)("p",{className:"text-center text-white py-10",children:"جاري التحميل..."}):(n||(0,f.redirect)("/admin/".concat(r,"/login")),(0,d.useEffect)(()=>{let fetchStats=async()=>{try{W(!0);let[e,r,n]=await Promise.all([b.qx.getAll(),b.Zw.getAll(),b.g8.getAll()]);j(e.length),T(r.length),O(n.length)}catch(e){v.Am.error("فشل في تحميل الإحصائيات"),console.error(e)}finally{W(!1)}};fetchStats()},[]),(0,c.jsxs)(g.E.div,{initial:{opacity:0},animate:{opacity:1},children:[(0,c.jsxs)("h1",{className:"text-3xl font-bold text-white mb-8 flex items-center gap-3",children:[(0,c.jsx)(y.l51,{className:"text-[#00c6ff]"}),"لوحة التحكم"]}),(0,c.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-6",children:[(0,c.jsx)(StatCard,{title:"عدد المشاريع",value:A,loading:C}),(0,c.jsx)(StatCard,{title:"عدد الخدمات",value:N,loading:C}),(0,c.jsx)(StatCard,{title:"عدد المستخدمين",value:k,loading:C})]})]}))}},9843:function(e,r,n){"use strict";n.d(r,{LY:function(){return f},Zw:function(){return b},aq:function(){return A},eJ:function(){return j},g8:function(){return g},h$:function(){return v},pJ:function(){return T},qx:function(){return y},v1:function(){return k},y:function(){return N},yu:function(){return x}});var c=n(2749),d=n(2601);let h=d.env.NEXT_PUBLIC_API_URL;async function fetchPublic(e){if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await fetch("".concat(h).concat(e),{cache:"no-store"});if(!r.ok)throw Error("Failed to fetch");return r.json()}let f={getServices:()=>fetchPublic("/services"),getProjects:()=>fetchPublic("/projects"),getMaintenance:()=>fetchPublic("/maintenance"),getTeamMembers:()=>fetchPublic("/team"),getServiceDetails:()=>fetchPublic("/service-details"),getCompanyImages:()=>fetchPublic("/company-images"),getSettings:()=>fetchPublic("/settings")};async function getAccessToken(){try{let e=await (0,c.getSession)(),r=null==e?void 0:e.accessToken;if(r)return r}catch(e){}{let e=window.localStorage.getItem("riah_access_token");if(e)return e}return null}async function fetchWithAuth(e){let r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let n=await getAccessToken(),c={"Content-Type":"application/json",...n?{Authorization:"Bearer ".concat(n)}:{},...r.headers?r.headers:{}},d=await fetch("".concat(h).concat(e),{...r,headers:c});if(!d.ok){let e=await d.json().catch(()=>({}));if(401===d.status)throw Error("Unauthorized");throw Error(e.message||"Something went wrong")}return d.json()}let g={getAll:()=>fetchWithAuth("/users")},y={getAll:()=>fetchWithAuth("/projects"),getOne:e=>fetchWithAuth("/projects/".concat(e)),create:e=>fetchWithAuth("/projects",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/projects/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/projects/".concat(e),{method:"DELETE"})},b={getAll:()=>fetchWithAuth("/services"),getOne:e=>fetchWithAuth("/services/".concat(e)),create:e=>fetchWithAuth("/services",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/services/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/services/".concat(e),{method:"DELETE"})},v={getAll:()=>fetchWithAuth("/company-images"),create:e=>fetchWithAuth("/company-images",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/company-images/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/company-images/".concat(e),{method:"DELETE"})},x={getAll:()=>fetchWithAuth("/service-details"),create:e=>fetchWithAuth("/service-details",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/service-details/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/service-details/".concat(e),{method:"DELETE"})},A={uploadImage:async e=>{if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await getAccessToken();if(!r)throw Error("Unauthorized");let n=new FormData;n.append("file",e);let c=await fetch("".concat(h,"/api/uploads/image"),{method:"POST",headers:{Authorization:"Bearer ".concat(r)},body:n});if(!c.ok){let e=await c.json().catch(()=>({}));if(401===c.status)throw Error("Unauthorized");throw Error(e.message||"Upload failed")}let d=await c.json();return{url:d.url}},uploadVideo:async e=>{if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await getAccessToken();if(!r)throw Error("Unauthorized");let n=new FormData;n.append("file",e);let c=await fetch("".concat(h,"/api/uploads/video"),{method:"POST",headers:{Authorization:"Bearer ".concat(r)},body:n});if(!c.ok){let e=await c.json().catch(()=>({}));if(401===c.status)throw Error("Unauthorized");throw Error(e.message||"Upload failed")}let d=await c.json();return{url:d.url}}},j={sendMessage:async e=>{if(!h)throw Error("NEXT_PUBLIC_API_URL is missing");let r=await fetch("".concat(h,"/contact"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok){let e=await r.json().catch(()=>({}));throw Error(e.message||"Failed to send message")}return r.json()}},N={getStatus:()=>fetchWithAuth("/maintenance"),updateStatus:e=>fetchWithAuth("/maintenance",{method:"PATCH",body:JSON.stringify(e)})},T={get:()=>fetchWithAuth("/settings"),update:e=>fetchWithAuth("/settings",{method:"PUT",body:JSON.stringify(e)})},k={getAll:()=>fetchWithAuth("/team"),create:e=>fetchWithAuth("/team",{method:"POST",body:JSON.stringify(e)}),update:(e,r)=>fetchWithAuth("/team/".concat(e),{method:"PUT",body:JSON.stringify(r)}),delete:e=>fetchWithAuth("/team/".concat(e),{method:"DELETE"})}},4033:function(e,r,n){e.exports=n(94)},5925:function(e,r,n){"use strict";let c,d;n.d(r,{x7:function(){return Fe},Am:function(){return dist_n}});var h=n(2265);let f={data:""},t=e=>{if("object"==typeof window){let r=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return r.nonce=window.__nonce__,r.parentNode||(e||document.head).appendChild(r),r.firstChild}return e||f},g=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,y=/\/\*[^]*?\*\/|  +/g,b=/\n+/g,o=(e,r)=>{let n="",c="",d="";for(let h in e){let f=e[h];"@"==h[0]?"i"==h[1]?n=h+" "+f+";":c+="f"==h[1]?o(f,h):h+"{"+o(f,"k"==h[1]?"":r)+"}":"object"==typeof f?c+=o(f,r?r.replace(/([^,])+/g,e=>h.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,r=>/&/.test(r)?r.replace(/&/g,e):e?e+" "+r:r)):h):null!=f&&(h=/^--/.test(h)?h:h.replace(/[A-Z]/g,"-$&").toLowerCase(),d+=o.p?o.p(h,f):h+":"+f+";")}return n+(r&&d?r+"{"+d+"}":d)+c},v={},s=e=>{if("object"==typeof e){let r="";for(let n in e)r+=n+s(e[n]);return r}return e},i=(e,r,n,c,d)=>{var h;let f=s(e),x=v[f]||(v[f]=(e=>{let r=0,n=11;for(;r<e.length;)n=101*n+e.charCodeAt(r++)>>>0;return"go"+n})(f));if(!v[x]){let r=f!==e?e:(e=>{let r,n,c=[{}];for(;r=g.exec(e.replace(y,""));)r[4]?c.shift():r[3]?(n=r[3].replace(b," ").trim(),c.unshift(c[0][n]=c[0][n]||{})):c[0][r[1]]=r[2].replace(b," ").trim();return c[0]})(e);v[x]=o(d?{["@keyframes "+x]:r}:r,n?"":"."+x)}let A=n&&v.g?v.g:null;return n&&(v.g=v[x]),h=v[x],A?r.data=r.data.replace(A,h):-1===r.data.indexOf(h)&&(r.data=c?h+r.data:r.data+h),x},p=(e,r,n)=>e.reduce((e,c,d)=>{let h=r[d];if(h&&h.call){let e=h(n),r=e&&e.props&&e.props.className||/^go/.test(e)&&e;h=r?"."+r:e&&"object"==typeof e?e.props?"":o(e,""):!1===e?"":e}return e+c+(null==h?"":h)},"");function u(e){let r=this||{},n=e.call?e(r.p):e;return i(n.unshift?n.raw?p(n,[].slice.call(arguments,1),r.p):n.reduce((e,n)=>Object.assign(e,n&&n.call?n(r.p):n),{}):n,t(r.target),r.g,r.o,r.k)}u.bind({g:1});let x,A,j,N=u.bind({k:1});function m(e,r,n,c){o.p=r,x=e,A=n,j=c}function w(e,r){let n=this||{};return function(){let c=arguments;function a(d,h){let f=Object.assign({},d),g=f.className||a.className;n.p=Object.assign({theme:A&&A()},f),n.o=/ *go\d+/.test(g),f.className=u.apply(n,c)+(g?" "+g:""),r&&(f.ref=h);let y=e;return e[0]&&(y=f.as||e,delete f.as),j&&y[0]&&j(f),x(y,f)}return r?r(a):a}}var Z=e=>"function"==typeof e,dist_h=(e,r)=>Z(e)?e(r):e,T=(c=0,()=>(++c).toString()),E=()=>{if(void 0===d&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");d=!e||e.matches}return d},k="default",H=(e,r)=>{let{toastLimit:n}=e.settings;switch(r.type){case 0:return{...e,toasts:[r.toast,...e.toasts].slice(0,n)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===r.toast.id?{...e,...r.toast}:e)};case 2:let{toast:c}=r;return H(e,{type:e.toasts.find(e=>e.id===c.id)?1:0,toast:c});case 3:let{toastId:d}=r;return{...e,toasts:e.toasts.map(e=>e.id===d||void 0===d?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===r.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==r.toastId)};case 5:return{...e,pausedAt:r.time};case 6:let h=r.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+h}))}}},O=[],C={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},W={},Y=(e,r=k)=>{W[r]=H(W[r]||C,e),O.forEach(([e,n])=>{e===r&&n(W[r])})},_=e=>Object.keys(W).forEach(r=>Y(e,r)),Q=e=>Object.keys(W).find(r=>W[r].toasts.some(r=>r.id===e)),S=(e=k)=>r=>{Y(r,e)},U={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},V=(e={},r=k)=>{let[n,c]=(0,h.useState)(W[r]||C),d=(0,h.useRef)(W[r]);(0,h.useEffect)(()=>(d.current!==W[r]&&c(W[r]),O.push([r,c]),()=>{let e=O.findIndex(([e])=>e===r);e>-1&&O.splice(e,1)}),[r]);let f=n.toasts.map(r=>{var n,c,d;return{...e,...e[r.type],...r,removeDelay:r.removeDelay||(null==(n=e[r.type])?void 0:n.removeDelay)||(null==e?void 0:e.removeDelay),duration:r.duration||(null==(c=e[r.type])?void 0:c.duration)||(null==e?void 0:e.duration)||U[r.type],style:{...e.style,...null==(d=e[r.type])?void 0:d.style,...r.style}}});return{...n,toasts:f}},ie=(e,r="blank",n)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:r,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...n,id:(null==n?void 0:n.id)||T()}),P=e=>(r,n)=>{let c=ie(r,e,n);return S(c.toasterId||Q(c.id))({type:2,toast:c}),c.id},dist_n=(e,r)=>P("blank")(e,r);dist_n.error=P("error"),dist_n.success=P("success"),dist_n.loading=P("loading"),dist_n.custom=P("custom"),dist_n.dismiss=(e,r)=>{let n={type:3,toastId:e};r?S(r)(n):_(n)},dist_n.dismissAll=e=>dist_n.dismiss(void 0,e),dist_n.remove=(e,r)=>{let n={type:4,toastId:e};r?S(r)(n):_(n)},dist_n.removeAll=e=>dist_n.remove(void 0,e),dist_n.promise=(e,r,n)=>{let c=dist_n.loading(r.loading,{...n,...null==n?void 0:n.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let d=r.success?dist_h(r.success,e):void 0;return d?dist_n.success(d,{id:c,...n,...null==n?void 0:n.success}):dist_n.dismiss(c),e}).catch(e=>{let d=r.error?dist_h(r.error,e):void 0;d?dist_n.error(d,{id:c,...n,...null==n?void 0:n.error}):dist_n.dismiss(c)}),e};var I=1e3,dist_w=(e,r="default")=>{let{toasts:n,pausedAt:c}=V(e,r),d=(0,h.useRef)(new Map).current,f=(0,h.useCallback)((e,r=I)=>{if(d.has(e))return;let n=setTimeout(()=>{d.delete(e),g({type:4,toastId:e})},r);d.set(e,n)},[]);(0,h.useEffect)(()=>{if(c)return;let e=Date.now(),d=n.map(n=>{if(n.duration===1/0)return;let c=(n.duration||0)+n.pauseDuration-(e-n.createdAt);if(c<0){n.visible&&dist_n.dismiss(n.id);return}return setTimeout(()=>dist_n.dismiss(n.id,r),c)});return()=>{d.forEach(e=>e&&clearTimeout(e))}},[n,c,r]);let g=(0,h.useCallback)(S(r),[r]),y=(0,h.useCallback)(()=>{g({type:5,time:Date.now()})},[g]),b=(0,h.useCallback)((e,r)=>{g({type:1,toast:{id:e,height:r}})},[g]),v=(0,h.useCallback)(()=>{c&&g({type:6,time:Date.now()})},[c,g]),x=(0,h.useCallback)((e,r)=>{let{reverseOrder:c=!1,gutter:d=8,defaultPosition:h}=r||{},f=n.filter(r=>(r.position||h)===(e.position||h)&&r.height),g=f.findIndex(r=>r.id===e.id),y=f.filter((e,r)=>r<g&&e.visible).length;return f.filter(e=>e.visible).slice(...c?[y+1]:[0,y]).reduce((e,r)=>e+(r.height||0)+d,0)},[n]);return(0,h.useEffect)(()=>{n.forEach(e=>{if(e.dismissed)f(e.id,e.removeDelay);else{let r=d.get(e.id);r&&(clearTimeout(r),d.delete(e.id))}})},[n,f]),{toasts:n,handlers:{updateHeight:b,startPause:y,endPause:v,calculateOffset:x}}},D=N`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,L=N`
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

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${L} 0.15s ease-out forwards;
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
`,F=N`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,M=w("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
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
}`,tt=w("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${K} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,$=({toast:e})=>{let{icon:r,type:n,iconTheme:c}=e;return void 0!==r?"string"==typeof r?h.createElement(tt,null,r):r:"blank"===n?null:h.createElement(G,null,h.createElement(M,{...c}),"loading"!==n&&h.createElement(q,null,"error"===n?h.createElement(J,{...c}):h.createElement(X,{...c})))},Re=e=>`
0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Ee=e=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}
`,te=w("div")`
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
`,ti=w("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,ke=(e,r)=>{let n=e.includes("top")?1:-1,[c,d]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Re(n),Ee(n)];return{animation:r?`${N(c)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${N(d)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},ta=h.memo(({toast:e,position:r,style:n,children:c})=>{let d=e.height?ke(e.position||r||"top-center",e.visible):{opacity:0},f=h.createElement($,{toast:e}),g=h.createElement(ti,{...e.ariaProps},dist_h(e.message,e));return h.createElement(te,{className:e.className,style:{...d,...n,...e.style}},"function"==typeof c?c({icon:f,message:g}):h.createElement(h.Fragment,null,f,g))});m(h.createElement);var we=({id:e,className:r,style:n,onHeightUpdate:c,children:d})=>{let f=h.useCallback(r=>{if(r){let l=()=>{c(e,r.getBoundingClientRect().height)};l(),new MutationObserver(l).observe(r,{subtree:!0,childList:!0,characterData:!0})}},[e,c]);return h.createElement("div",{ref:f,className:r,style:n},d)},Me=(e,r)=>{let n=e.includes("top"),c=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${r*(n?1:-1)}px)`,...n?{top:0}:{bottom:0},...c}},tr=u`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,Fe=({reverseOrder:e,position:r="top-center",toastOptions:n,gutter:c,children:d,toasterId:f,containerStyle:g,containerClassName:y})=>{let{toasts:b,handlers:v}=dist_w(n,f);return h.createElement("div",{"data-rht-toaster":f||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...g},className:y,onMouseEnter:v.startPause,onMouseLeave:v.endPause},b.map(n=>{let f=n.position||r,g=Me(f,v.calculateOffset(n,{reverseOrder:e,gutter:c,defaultPosition:r}));return h.createElement(we,{id:n.id,key:n.id,onHeightUpdate:v.updateHeight,className:n.visible?tr:"",style:g},"custom"===n.type?dist_h(n.message,n):d?d(n):h.createElement(ta,{toast:n,position:f}))}))}}},function(e){e.O(0,[699,207,749,971,472,744],function(){return e(e.s=3431)}),_N_E=e.O()}]);