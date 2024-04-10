"use strict";exports.id=76,exports.ids=[76],exports.modules={37840:(e,t,r)=>{r.d(t,{Z:()=>y});var a=r(30494),n=r(85150),i=r(39276),d=r(90856),o=r(58133),s=r(43789),l=r(85545);let m=l.z.object({startLine:l.z.number().int(),endLine:l.z.number().int()}),c=({onSubmit:e})=>{let{control:t,handleSubmit:r}=(0,s.cI)({resolver:(0,d.F)(m)});return(0,a.jsxs)(i.J2,{children:[a.jsx(i.xo,{children:a.jsx(o.cW,{width:33,height:33,className:"bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5"})}),(0,a.jsxs)(i.yk,{className:"p-4",children:[(0,a.jsxs)("div",{className:"space-y-2",children:[a.jsx("h4",{className:"font-medium leading-none",children:"Trim text"}),a.jsx("p",{className:"text-muted-foreground pb-2 text-sm",children:"Trim text from start to end line"})]}),a.jsx(n.gN,{variant:"muted",control:t,type:"number",name:"startLine",placeholder:"Start line"}),a.jsx(n.gN,{variant:"muted",control:t,className:"my-2",name:"endLine",type:"number",placeholder:"end line"}),a.jsx(n.zx,{variant:"primary",size:"sm",onClick:r(e),children:"Trim content"})]})]})},p=["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen","Seventeen","Eighteen","Nineteen","Twenty","Twenty-one","Twenty-two","Twenty-three","Twenty-four","Twenty-five","Twenty-six","Twenty-seven","Twenty-eight","Twenty-nine","Thirty","Thirty-one","Thirty-two","Thirty-three","Thirty-four","Thirty-five","Thirty-six","Thirty-seven","Thirty-eight","Thirty-nine","Forty","Forty-one","Forty-two","Forty-three","Forty-four","Forty-five","Forty-six","Forty-seven","Forty-eight","Forty-nine","Fifty","Fifty-one","Fifty-two","Fifty-three","Fifty-four","Fifty-five","Fifty-six","Fifty-seven","Fifty-eight","Fifty-nine","Sixty","Sixty-one","Sixty-two","Sixty-three","Sixty-four","Sixty-five","Sixty-six","Sixty-seven","Sixty-eight","Sixty-nine","Seventy","Seventy-one","Seventy-two","Seventy-three","Seventy-four","Seventy-five","Seventy-six","Seventy-seven","Seventy-eight","Seventy-nine","Eighty","Eighty-one","Eighty-two","Eighty-three","Eighty-four","Eighty-five","Eighty-six","Eighty-seven","Eighty-eight","Eighty-nine","Ninety","Ninety-one","Ninety-two","Ninety-three","Ninety-four","Ninety-five","Ninety-six","Ninety-seven","Ninety-eight","Ninety-nine","One hundred","One hundred and one","One hundred and two","One hundred and three","One hundred and four","One hundred and five","One hundred and six"];var h=r(66240),u=r(32155),f=r(49104);let x=({ebooks:e,setEBooks:t})=>{let{mutateAsync:r,isLoading:a}=(0,f.D)({mutationKey:["unfold"],mutationFn:e=>h.Z.parser.unfold(e),onSuccess:()=>(0,u.Qm)("File uploaded"),onError:()=>(0,u.Jc)("Error while uploading book")}),n=({title:r,chapters:a})=>{let n=e?.length||0;t([...e||[],{id:n+1,title:r||"",chapters:a||[]}]),(0,u.Qm)("Book uploaded")};return{books:{upload:e=>{for(let t of e)r(new File([t],t.name)).then(({data:e})=>{n({title:t.name,chapters:e})})},state:e||[],unfoldLoading:a,trimmingEBookContent:({bookId:r,startLine:a,endLine:n})=>{if(!e)return(0,u.Jc)("Error trimming book");t(e.map(e=>e.id===r?{...e,chapters:e.chapters.map(({id:e,name:t,text:r})=>({id:e,name:t,text:r.split("\n").filter((e,t)=>t<a-1||t>n-1).join("\n")}))}:e)),(0,u.Qm)("Book trimmed")},generateChapterNames:({bookId:r})=>{if(!e)return(0,u.Jc)("Error generating chapter names");t(e.map(e=>e.id===r?{...e,chapters:e.chapters.map((e,t)=>({...e,name:`Chapter ${p[t]}`}))}:e))},addNewCharacterAfterContent:({bookId:r,chapterId:a})=>{if(!e)return(0,u.Jc)("Error adding new chapter");t(e.map(e=>{if(e.id===r){let t=e.chapters.findIndex(e=>e.id===a);return{...e,chapters:[...e.chapters.slice(0,t+1),{id:Math.round(1e6*Math.random()),name:"",text:""},...e.chapters.slice(t+1)]}}return e}))},delete:({bookId:r})=>{if(!e)return(0,u.Jc)("Error deleting book");t(e?.filter(e=>e.id!==r)),(0,u.Qm)("Book deleted")},updateToc:({chapterId:r,bookId:a,value:n})=>{if(!e)return(0,u.Jc)("Error updating chapter");t(e.map(e=>e.id===a?{...e,chapters:e.chapters.map(e=>e.id===r?{...e,...n}:e)}:e))},updateBookTitle:({value:r,bookId:a})=>{if(!e)return(0,u.Jc)("Error updating book title");t(e.map(e=>e.id===a?{...e,title:r}:e))},mergeContentWithTopCharacter:({bookId:r,topChapterId:a,insertedContent:n})=>e?t(e.map(e=>{if(e.id===r){let t=e.chapters.find(e=>e.id===a),r=e.chapters.findIndex(e=>e.id===a);return t?{...e,chapters:[...e.chapters.slice(0,r),{id:t.id,name:t.name,text:`${t.text}
${n}`},...e.chapters.slice(r+1)].filter(e=>e.text!==n)}:((0,u.Jc)("Error merging content"),e)}return e})):(0,u.Jc)("Error merging content"),removeToc:(r,a)=>{if(!e)return(0,u.Jc)("Error removing chapter");t(e.map(e=>e.id===r?{...e,chapters:e.chapters.filter(e=>e.id!==a)}:e)),(0,u.Qm)("Chapter removed")},moveChaptersToNewBook:({bookId:r,chapterId:a})=>{if(!e)return(0,u.Jc)("Error moving chapters");let n=e.find(e=>e.id===r);if(!n)return e;let i=n.chapters.findIndex(e=>e.id===a);if(i<=1)return(0,u.Jc)("Error moving chapters");let d=n.chapters.slice(i),o=n.chapters.filter(e=>!d.some(t=>t.id===e.id)),s={id:e.length+1,title:`${e.length+1} book`,chapters:d};return t([...e.map(e=>e.id===r?{...e,chapters:o}:e),s])}}}},g=(0,r(88735).memo)(({message:e})=>"string"==typeof e?a.jsx("p",{className:"text-danger mt-0.5 text-xs italic",children:e}):e?.message?a.jsx("p",{className:"text-danger mt-0.5 text-xs italic",children:e.message}):null),y=({control:e,name:t})=>a.jsx(s.Qr,{control:e,name:t,render:({field:{value:e=[],onChange:t},fieldState:{error:r}})=>{let{books:i}=x({ebooks:e,setEBooks:t});return console.log("errors",r),a.jsx(a.Fragment,{children:a.jsx("div",{className:"md:w-max md:overflow-y-scroll ",children:(0,a.jsxs)("div",{children:[(0,a.jsxs)("div",{className:"mb-4",children:[a.jsx("h1",{className:"mt-2  text-xl",children:"Book file"}),a.jsx(n.rE,{multiple:!0,size:"sm",accept:".epub",disabled:i.unfoldLoading,onDropFile:e=>{i.upload(e)},onFileDelete:(e,t)=>{i.delete({bookId:Number(i.state[t]?.id)})}})]}),a.jsx("div",{className:"md:flex md:w-fit",children:i.state.map((e,t)=>{let d=r?.[t];return(0,a.jsxs)("div",{className:"bg-foreground border-bordered mb-4 w-full rounded border-[1px] p-2 pt-4 md:mr-1 md:w-[600px]",children:[(0,a.jsxs)("div",{className:"mb-2 flex h-9 items-center  justify-between gap-1",children:[a.jsx(n.II,{variant:"muted",className:"mr-2 h-full w-full flex-1",defaultValue:e.title,onBlur:t=>i.updateBookTitle({bookId:e.id,value:t.target.value})}),a.jsx(g,{message:d?.title?.message}),(0,a.jsxs)("div",{className:"flex items-center gap-2",children:[a.jsx(c,{onSubmit:t=>{i.trimmingEBookContent({bookId:e.id,startLine:t.startLine,endLine:t.endLine})}}),a.jsx(o.nP,{width:33,height:33,className:"bg-muted border-bordered h-full w-[35px] cursor-pointer rounded border-[1px] p-1.5",onClick:()=>{i.generateChapterNames({bookId:e.id}),console.log("generate chapters names")}})]})]}),e.chapters.map((t,r)=>{let s=d?.chapters?.[r];return(0,a.jsxs)("div",{className:"bg-muted mb-2 rounded p-2",children:[(0,a.jsxs)("div",{className:"mb-2 flex w-full items-center justify-between gap-2",children:[a.jsx(n.II,{variant:"foreground",value:t.name,onChange:r=>{i.updateToc({bookId:e.id,chapterId:t.id,value:{name:r.target.value}})}}),a.jsx(g,{message:s?.name?.message}),(0,a.jsxs)("div",{className:"flex gap-2",children:[a.jsx(o.Kh,{width:34,height:34,className:"bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5",onClick:()=>{if(!e.chapters[r-1]?.id)return(0,u.Jc)("Cannot move chapter up");i.mergeContentWithTopCharacter({bookId:e.id,insertedContent:t.text,topChapterId:Number(e.chapters[r-1]?.id)})}}),a.jsx(o._M,{width:34,height:34,className:"bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5",onClick:()=>{i.addNewCharacterAfterContent({bookId:e.id,chapterId:t.id}),console.log("add new character")}}),a.jsx(o.k3,{width:34,height:34,className:"bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5",onClick:()=>{console.log("combine"),i.moveChaptersToNewBook({bookId:e.id,chapterId:t.id})}}),a.jsx(o.x8,{width:34,height:34,className:"bg-foreground border-bordered cursor-pointer rounded border-[1px] p-1.5",onClick:()=>{i.removeToc(e.id,t.id),console.log("remove toc")}})]})]}),(0,a.jsxs)("div",{children:[a.jsx(n.Kx,{value:t.text,variant:"foreground",className:" min-h-[250px] w-full rounded px-4 py-2 font-mono text-sm duration-200 ease-linear",onChange:r=>{i.updateToc({chapterId:t.id,value:{text:r.target.value},bookId:e.id})}}),a.jsx(g,{message:s?.text?.message})]})]},t.id)})]},e.title)})})]})})})}})},35026:(e,t,r)=>{r.d(t,{Z:()=>v});var a=r(30494),n=r(59115),i=r(83137),d=r(58133),o=r(88735);i.fC;let s=i.h_,l=(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(i.aV,{ref:r,className:(0,n.cn)("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0  fixed inset-0 z-50",e),...t}));l.displayName=i.aV.displayName,(0,o.forwardRef)(({className:e,children:t,...r},o)=>(0,a.jsxs)(s,{children:[a.jsx(l,{}),(0,a.jsxs)(i.VY,{ref:o,className:(0,n.cn)("bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200 sm:rounded",e),...r,children:[t,(0,a.jsxs)(i.x8,{className:"ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none",children:[a.jsx(d.x8,{className:"h-4 w-4"}),a.jsx("span",{className:"sr-only",children:"Close"})]})]})]})).displayName=i.VY.displayName,(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(i.Dx,{ref:r,className:(0,n.cn)("text-lg font-semibold leading-none tracking-tight",e),...t})).displayName=i.Dx.displayName,(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(i.dk,{ref:r,className:(0,n.cn)("text-muted-foreground text-sm",e),...t})).displayName=i.dk.displayName;var m=r(48787);let c=(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(m.mY,{ref:r,className:(0,n.cn)("bg-foreground text-gray flex h-full w-full flex-col overflow-hidden rounded",e),...t}));c.displayName=m.mY.displayName;let p=(0,o.forwardRef)(({className:e,...t},r)=>(0,a.jsxs)("div",{className:"border-bordered flex items-center border-b px-3",children:[a.jsx(d.ol,{className:"mr-2 h-4 w-4 shrink-0 opacity-50"}),a.jsx(m.mY.Input,{ref:r,className:(0,n.cn)("flex h-10 w-full rounded bg-transparent py-3 text-sm outline-none placeholder:text-white disabled:cursor-not-allowed disabled:opacity-50",e),...t})]}));p.displayName=m.mY.Input.displayName,(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(m.mY.List,{ref:r,className:(0,n.cn)("max-h-[300px] overflow-y-auto overflow-x-hidden",e),...t})).displayName=m.mY.List.displayName;let h=(0,o.forwardRef)((e,t)=>a.jsx(m.mY.Empty,{ref:t,className:"py-6 text-center text-sm",...e}));h.displayName=m.mY.Empty.displayName;let u=(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(m.mY.Group,{ref:r,className:(0,n.cn)("text-gray overflow-hidden p-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-white",e),...t}));u.displayName=m.mY.Group.displayName,(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(m.mY.Separator,{ref:r,className:(0,n.cn)("bg-bordered -mx-1 h-px",e),...t})).displayName=m.mY.Separator.displayName;let f=(0,o.forwardRef)(({className:e,...t},r)=>a.jsx(m.mY.Item,{ref:r,className:(0,n.cn)("aria-selected:bg-muted aria-selected:text-gray relative flex cursor-default select-none items-center rounded px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",e),...t}));f.displayName=m.mY.Item.displayName;var x=r(39276),g=r(66240),y=r(18193),b=r(75535),N=r(43789);let v=({control:e,name:t,...r})=>{let{data:i=[]}=(0,y.a)({queryKey:["genres"],queryFn:()=>g.Z.genre.catalog(),select:e=>e.data});return console.log("genres",i),a.jsx(N.Qr,{control:e,name:t,render:({field:{value:e=[],onChange:t},fieldState:{error:o}})=>(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{children:(0,a.jsxs)(x.J2,{children:[a.jsx(x.xo,{className:"w-full",children:a.jsx("div",{className:(0,n.cn)("border-bordered bg-foreground  rounded border-[1px] px-2 py-1"),...r,children:(0,a.jsxs)("div",{className:"flex max-w-xl flex-nowrap gap-2 overflow-hidden",children:[e.length>0?e.map(({slug:e})=>a.jsx("span",{children:i.find(t=>t.slug===e)?.name},e)).slice(0,2):"No genre selected"," ",e.length-2>0&&`(${e.length-2})`]})})}),a.jsx(x.yk,{className:" p-0",children:(0,a.jsxs)(c,{children:[a.jsx(p,{placeholder:"Search genre..."}),a.jsx(h,{children:"No genre found."}),a.jsx(u,{children:i.map(r=>(0,a.jsxs)(f,{value:r.name,onSelect:()=>t(e.find(({slug:e})=>e===r.slug)?e.filter(({slug:e})=>e!==r.slug):[...e,r]),children:[a.jsx(d.Jr,{color:b.I.white,className:(0,n.cn)("mr-2 h-4 w-4",e.find(({slug:e})=>e===r.slug)?"opacity-100":"opacity-0")}),r.name]},r.slug))})]})})]})}),!!o&&a.jsx("p",{className:"text-danger mt-0.5 text-xs italic",children:o.message})]})})}},63569:(e,t,r)=>{r.d(t,{w:()=>m});var a=r(30494),n=r(66240),i=r(32155),d=r(49104);let o=()=>{let{mutateAsync:e,isLoading:t}=(0,d.D)({mutationKey:["upload-file"],mutationFn:({folder:e,file:t})=>n.Z.storage.upload(e,t),onError:()=>(0,i.Jc)({text1:"Upload file",text2:"An error occurred",type:"error"})});return{upload:e,uploadLoading:t}};var s=r(66965),l=r(43789);let m=({control:e,name:t})=>{let{upload:r,uploadLoading:n}=o();return a.jsx(l.Qr,{control:e,name:t,render:({field:{value:e="",onChange:t},fieldState:{error:i}})=>(0,a.jsxs)(a.Fragment,{children:[a.jsx("div",{children:(0,a.jsxs)("div",{children:[a.jsx("input",{type:"file",className:"hidden",disabled:n,onChange:async({target:e})=>{let a=e.files?.[0];a&&r({file:a,folder:"booksCovers"}).then(e=>{t(e.data.name)})}}),a.jsx("img",{width:220,className:"border-bordered  cursor-pointer rounded border-[1px]",height:300,src:(0,s.q)(e),alt:"Cover",onClick:()=>{let e=document.querySelector("input[type=file]");e?.click()}})]})}),!!i&&a.jsx("p",{className:"text-danger mt-0.5 text-xs italic",children:i.message})]})})}},39276:(e,t,r)=>{r.d(t,{J2:()=>o,xo:()=>s,yk:()=>l});var a=r(30494),n=r(59115),i=r(63066),d=r(88735);let o=i.fC,s=i.xz;i.ee;let l=(0,d.forwardRef)(({className:e,align:t="center",sideOffset:r=4,...d},o)=>a.jsx(i.h_,{children:a.jsx(i.VY,{ref:o,align:t,sideOffset:r,className:(0,n.cn)("bg-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 border-bordered z-50 w-72 rounded border  p-4 text-white shadow-md outline-none",e),...d})}));l.displayName=i.VY.displayName},1789:(e,t,r)=>{r.d(t,{d:()=>n,s:()=>a});let a=e=>{if(!e)return 0;if(e<0||e>1e4)throw Error("Invalid parameter");return+e},n=e=>{if(!e)return"";if("string"!=typeof e)throw Error("Invalid parameter");return e}},40096:(e,t,r)=>{r.d(t,{SH:()=>d});var a=r(85545);let n=a.z.object({id:a.z.number().min(1),title:a.z.string().max(100).min(3).refine(e=>"undefined"!==e,{message:"Name cannot be empty"}).refine(e=>!e.includes(".epub"),{message:"Title cannot include .epub"})}),i=a.z.object({id:a.z.number().min(1),name:a.z.string().refine(e=>!e.includes(".epub"),{message:"Name cannot include .epub"}).refine(e=>"undefined"!==e,{message:"Name cannot be empty"}),text:a.z.string().refine(e=>/<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(e),{message:"Text should be in HTML format"})}),d=a.z.object({chapters:a.z.array(i).min(1)}).merge(n)}};
//# sourceMappingURL=76.js.map