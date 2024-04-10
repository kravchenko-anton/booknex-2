exports.id=380,exports.ids=[380],exports.modules={61574:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>x}),a(73363);var s=a(30494),o=a(44770),l=a(79967),d=a(59115),r=a(67293),n=a(75535),i=a(58133),c=a(2764),m=a(48860);let f=[{icon:i.kJ,link:"/admin/dashboard",name:"Dashboard"},{icon:i.n5,link:"/admin/user/catalog",name:"Users"},{icon:i.fy,link:"/admin/book/catalog",name:"Books"},{icon:i.Zr,link:"/admin/parser/catalog",name:"Parser"}],u=()=>{let{logout:e}=(0,l.BH)(),t=(0,m.usePathname)(),a=(0,m.useRouter)();return s.jsx("div",{className:"z-0 h-full w-full justify-center duration-100 ease-linear xl:fixed xl:w-[190px] xl:flex-col",children:(0,s.jsxs)("div",{className:"bg-foreground border-bordered flex w-full justify-between border-b-2 p-5 text-sm xl:h-full xl:flex-col xl:border-r-2",children:[s.jsx("button",{className:"flex cursor-pointer items-center text-2xl font-bold xl:mb-12",type:"button",onClick:()=>a.push(r.M.dashboard),children:(0,s.jsxs)("span",{className:"bg-muted rounded  p-1 px-2 text-[21px] text-white  xl:w-full ",children:["Booknex"," \uD83E\uDDD1‍\uD83D\uDCBB"]})}),s.jsx("ul",{className:"hidden xl:block",children:f.map(e=>s.jsx("li",{className:"w-full",children:(0,s.jsxs)(c.default,{href:e.link,className:(0,d.cn)("my-2 flex items-center p-2 duration-100  ease-linear xl:gap-3"),children:[s.jsx(e.icon,{width:22,height:22,className:"hidden  xl:block",style:{color:t===e.link?"#fff":"#9ca3af"}}),s.jsx("span",{className:"block text-sm xl:text-[16px]",style:{color:t===e.link?"#fff":"#9ca3af"},children:e.name})]})},e.link))}),(0,s.jsxs)("div",{className:"text-danger hidden cursor-pointer  items-center duration-100 ease-linear xl:mt-auto xl:flex  xl:gap-3 xl:p-2",onClick:e,children:[s.jsx(i.RD,{width:22,height:22}),s.jsx("span",{className:"block text-sm xl:text-[16px]",children:"Logout"})]}),s.jsx("div",{className:"flex items-center justify-center  xl:hidden",children:(0,s.jsxs)(o.h_,{children:[s.jsx(o.$F,{className:"focus-visible:outline-0",children:s.jsx(i.yF,{height:40,width:40,color:n.I.white,className:"bg-muted  border-bordered rounded-md border-[1px] p-1.5"})}),(0,s.jsxs)(o.AW,{align:"end",children:[f.map(e=>(0,s.jsxs)(o.Xi,{onClick:()=>{a.push(e.link)},children:[s.jsx(e.icon,{width:22,height:22,className:"mr-2"}),e.name]},e.link)),s.jsx(o.VD,{}),(0,s.jsxs)(o.Xi,{onClick:e,children:[s.jsx(i.RD,{width:22,height:22,className:"mr-2"}),"Logout"]})]})]})})]})})};var x=(0,a(88450).o)(({children:e})=>(0,s.jsxs)("div",{className:"overflow-hidden xl:flex",children:[(0,s.jsx)(u,{}),(0,s.jsx)("div",{className:"xl:w-[ calc(100% - 190px ) ] mt-4 w-full overflow-auto p-2 pt-0 duration-200 ease-linear xl:ml-[190px] xl:p-4",children:e})]}))},12115:(e,t,a)=>{"use strict";let s;a.r(t),a.d(t,{$$typeof:()=>c,__esModule:()=>i,default:()=>p,generateImageMetadata:()=>u,generateMetadata:()=>f,generateViewport:()=>x}),a(651);var o=a(75446),l=a(48692),d=a(87149),r=a(54580);let n=(0,a(48624).createProxy)(String.raw`D:\projects\booknex-2\apps\web\app\admin\layout.tsx`),{__esModule:i,$$typeof:c}=n,m=n.default;s="function"==typeof m?new Proxy(m,{apply:(e,t,a)=>{let s,n,i;try{let e=r.requestAsyncStorage.getStore();s=(0,o.h)((0,l.x)([e,"optionalAccess",e=>e.headers,"access",e=>e.get,"call",e=>e("sentry-trace")]),()=>void 0),n=(0,o.h)((0,l.x)([e,"optionalAccess",e=>e.headers,"access",e=>e.get,"call",e=>e("baggage")]),()=>void 0),i=(0,l.x)([e,"optionalAccess",e=>e.headers])}catch(e){}return d.D(e,{componentRoute:"/admin",componentType:"Unknown",sentryTraceHeader:s,baggageHeader:n,headers:i}).apply(t,a)}}):m;let f=void 0,u=void 0,x=void 0,p=s},61065:(e,t,a)=>{Promise.resolve().then(a.bind(a,61574))},44770:(e,t,a)=>{"use strict";a.d(t,{$F:()=>i,AW:()=>c,VD:()=>f,Xi:()=>m,h_:()=>n});var s=a(30494),o=a(59115),l=a(21462),d=a(58133),r=a(88735);let n=l.fC,i=l.xz;l.ZA,l.Uv,l.Tr,l.Ee,(0,r.forwardRef)(({className:e,inset:t,children:a,...r},n)=>(0,s.jsxs)(l.fF,{ref:n,className:(0,o.cn)("focus:bg-accent data-[state=open]:bg-foreground flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none",t&&"pl-8",e),...r,children:[a,s.jsx(d._Q,{className:"ml-auto h-4 w-4"})]})).displayName=l.fF.displayName,(0,r.forwardRef)(({className:e,...t},a)=>s.jsx(l.tu,{ref:a,className:(0,o.cn)("bg-foreground text-gray data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-foreground z-50 min-w-[8rem] overflow-hidden rounded border  p-1 shadow-lg",e),...t})).displayName=l.tu.displayName;let c=(0,r.forwardRef)(({className:e,sideOffset:t=4,...a},d)=>s.jsx(l.Uv,{children:s.jsx(l.VY,{ref:d,sideOffset:t,className:(0,o.cn)("bg-foreground  border-bordered z-50 min-w-[8rem] overflow-hidden rounded border p-1 text-white shadow-md","data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",e),...a})}));c.displayName=l.VY.displayName;let m=(0,r.forwardRef)(({className:e,inset:t,...a},d)=>s.jsx(l.ck,{ref:d,className:(0,o.cn)("focus:bg-muted  relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none transition-colors focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",t&&"pl-8",e),...a}));m.displayName=l.ck.displayName,(0,r.forwardRef)(({className:e,children:t,checked:a,...r},n)=>(0,s.jsxs)(l.oC,{ref:n,checked:a,className:(0,o.cn)("focus:bg-foreground relative flex cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...r,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(l.wU,{children:s.jsx(d.Jr,{className:"h-4 w-4"})})}),t]})).displayName=l.oC.displayName,(0,r.forwardRef)(({className:e,children:t,...a},r)=>(0,s.jsxs)(l.Rk,{ref:r,className:(0,o.cn)("focus:bg-foreground focus:text-gray relative flex cursor-default select-none items-center rounded py-1.5 pl-8 pr-2 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...a,children:[s.jsx("span",{className:"absolute left-2 flex h-3.5 w-3.5 items-center justify-center",children:s.jsx(l.wU,{children:s.jsx(d.oT,{className:"h-4 w-4 fill-current"})})}),t]})).displayName=l.Rk.displayName,(0,r.forwardRef)(({className:e,inset:t,...a},d)=>s.jsx(l.__,{ref:d,className:(0,o.cn)("px-2 py-1.5 text-sm font-semibold",t&&"pl-8",e),...a})).displayName=l.__.displayName;let f=(0,r.forwardRef)(({className:e,...t},a)=>s.jsx(l.Z0,{ref:a,className:(0,o.cn)("bg-muted  -mx-1 my-1 h-px",e),...t}));f.displayName=l.Z0.displayName},79967:(e,t,a)=>{"use strict";a.d(t,{BH:()=>d,aC:()=>n});let s={...a(42295)};var o=a(87782),l=a(2481);let d=()=>{let e=(0,l.I0)();return(0,o.DE)(s,e)},r=l.v9,n=()=>r(e=>e.auth);a(88735)},88450:(e,t,a)=>{"use strict";a.d(t,{V:()=>i,o:()=>c});var s=a(30494),o=a(79967),l=a(6241),d=a(67293),r=a(48860),n=a(88735);let i=e=>function(t){let{user:a,isLoading:l}=(0,o.aC)();return(0,n.useLayoutEffect)(()=>{a&&(0,r.redirect)(d.M.dashboard)},[a,l]),s.jsx(e,{...t})},c=e=>function(t){let{user:a,isLoading:i}=(0,o.aC)(),{logout:c}=(0,o.BH)();return(0,n.useLayoutEffect)(()=>{(async()=>{!(0,l.YV)()&&a&&c()})(),a||i||(0,r.redirect)(d.j.login)},[a,i]),s.jsx(e,{...t})}},67293:(e,t,a)=>{"use strict";a.d(t,{M:()=>s,j:()=>o});let s={bookCatalogRoute:"/admin/book/catalog",bookCreateRoute:"/admin/book/create",bookCreateWithTemplateRoute:e=>"/admin/book/create?template="+e,bookUpdateRoute:e=>"/admin/book/"+e+"/update",bookOverviewRoute:e=>"/admin/book/"+e,parserCatalogRoute:"/admin/parser/catalog",userCatalogRoute:"/admin/user/catalog",dashboard:"/admin/dashboard"},o={login:"/login"}},73363:(e,t,a)=>{"use strict";var s=a(62169),o="undefined"!=typeof global?global:"undefined"!=typeof self?self:{};o.__sentryRewritesTunnelPath__="/monitoring",o.SENTRY_RELEASE={id:"hNrIQBhzI--Vu0h1W_CcA"},o.__sentryBasePath=void 0,o.__rewriteFramesDistDir__="../../dist/apps/web/.next",s.S1({dsn:"https://58dfc2fec8dcff1fade9f476f2a2d713@o4506886163267584.ingest.us.sentry.io/4506886425608192",tracesSampleRate:1,debug:!1})}};
//# sourceMappingURL=380.js.map