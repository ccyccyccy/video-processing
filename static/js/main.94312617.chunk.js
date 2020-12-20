(this["webpackJsonpvideo-convert"]=this["webpackJsonpvideo-convert"]||[]).push([[0],{21:function(e,t,n){},22:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(0),r=n(1),a=n.n(r),s=n(14),i=n.n(s),u=(n(21),n(3)),l=n.n(u),o=n(15),j=n(2),b=(n(22),n(7));var d=function(){var e=Object(r.useState)(!1),t=Object(j.a)(e,2),n=t[0],a=t[1],s=Object(r.useState)(!1),i=Object(j.a)(s,2),u=i[0],d=i[1],p=Object(r.useState)(0),h=Object(j.a)(p,2),O=h[0],f=h[1],v=Object(r.useState)(-1),x=Object(j.a)(v,2),g=x[0],m=x[1],C=Object(r.useState)(-1),y=Object(j.a)(C,2),S=y[0],k=y[1],w=Object(r.useState)("mp4"),F=Object(j.a)(w,2),N=F[0],L=F[1],R=Object(r.useState)("medium"),U=Object(j.a)(R,2),A=U[0],T=U[1],B=Object(r.useState)(23),E=Object(j.a)(B,2),P=E[0],D=E[1],I=Object(r.useState)(0),J=Object(j.a)(I,2),M=J[0],z=J[1],H=Object(r.useState)(""),V=Object(j.a)(H,2),W=V[0],q=V[1],G=Object(r.useRef)(null);function K(){return(K=Object(o.a)(l.a.mark((function e(){var t,c,r,a,s,i,o;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(G.current){e.next=3;break}return console.error("Upload file element is null"),e.abrupt("return");case 3:if(G.current.files&&G.current.files[0]){e.next=6;break}return console.error("No files uploaded"),e.abrupt("return");case 6:return t=Object(b.createFFmpeg)({log:!0,progress:function(e){var t=e.ratio;z(t)}}),c=G.current.files[0],q("Loading..."),e.next=11,t.load();case 11:return q("Transcoding..."),e.t0=t,e.t1=c.name,e.next=16,Object(b.fetchFile)(c);case 16:return e.t2=e.sent,e.t0.FS.call(e.t0,"writeFile",e.t1,e.t2),r=["-i",c.name],u&&r.push("-r",O.toString()),n&&r.push("-vf","scale=".concat(g,":").concat(S)),a="output.".concat(N),r.push("-crf",P.toString(),"-preset",A,a),console.log(r),e.next=26,t.run.apply(t,r);case 26:q("Complete transcoding"),s=t.FS("readFile",a),i=document.createElement("a"),o=URL.createObjectURL(new Blob([s.buffer])),i.href=o,i.download=a,document.body.appendChild(i),i.click(),setTimeout((function(){document.body.removeChild(i),window.URL.revokeObjectURL(o)}),0);case 35:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(c.jsx)("div",{className:"App",children:Object(c.jsxs)("form",{children:[Object(c.jsx)("div",{children:Object(c.jsxs)("label",{children:[" Choose a video file:",Object(c.jsx)("input",{type:"file",accept:"video/*,image/gif",ref:G})]})}),W&&Object(c.jsx)("div",{children:W}),0!==M&&Object(c.jsx)("progress",{value:M}),Object(c.jsxs)("div",{children:["FPS:",Object(c.jsxs)("label",{children:[" Same as source",Object(c.jsx)("input",{type:"checkbox",checked:!u,onChange:function(e){return d(!u)}})]}),Object(c.jsx)("input",{type:"number",disabled:!u,name:"fps",value:O,onChange:function(e){return f(e.target.valueAsNumber)}})]}),Object(c.jsxs)("div",{children:["Size:",Object(c.jsxs)("label",{children:[" Same as source",Object(c.jsx)("input",{type:"checkbox",checked:!n,onChange:function(e){return a(!n)}})]}),Object(c.jsxs)("label",{children:["Width:",Object(c.jsx)("input",{type:"number",disabled:!n,name:"width",value:g,onChange:function(e){return m(e.target.valueAsNumber)}})]}),Object(c.jsxs)("label",{children:["Height:",Object(c.jsx)("input",{type:"number",disabled:!n,name:"height",value:S,onChange:function(e){return k(e.target.valueAsNumber)}})]}),Object(c.jsx)("span",{className:"tooltip",children:"Use -1 for aspect ratio preserving scaling"})]}),Object(c.jsxs)("div",{children:["Extension:",Object(c.jsxs)("select",{value:N,onChange:function(e){return L(e.target.value)},children:[Object(c.jsx)("option",{children:"mp4"}),Object(c.jsx)("option",{children:"mov"}),Object(c.jsx)("option",{children:"avi"}),Object(c.jsx)("option",{children:"mpeg"}),Object(c.jsx)("option",{children:"wmv"}),Object(c.jsx)("option",{children:"gif"})]})]}),Object(c.jsxs)("div",{children:["Compression preset:",Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"ultrafast",checked:"ultrafast"===A,onChange:function(e){return T(e.target.value)}}),"Ultrafast"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"superfast",checked:"superfast"===A,onChange:function(e){return T(e.target.value)}}),"Superfast"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"veryfast",checked:"veryfast"===A,onChange:function(e){return T(e.target.value)}}),"Veryfast"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"faster",checked:"faster"===A,onChange:function(e){return T(e.target.value)}}),"Faster"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"fast",checked:"fast"===A,onChange:function(e){return T(e.target.value)}}),"Fast"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"medium",checked:"medium"===A,onChange:function(e){return T(e.target.value)}}),"Medium"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"slow",checked:"slow"===A,onChange:function(e){return T(e.target.value)}}),"Slow"]}),Object(c.jsxs)("label",{children:[Object(c.jsx)("input",{type:"radio",value:"slower",checked:"slower"===A,onChange:function(e){return T(e.target.value)}}),"Slower"]})]}),Object(c.jsxs)("div",{children:["CRF: ",Object(c.jsx)("input",{type:"range",name:"CRF",min:"0",max:"51",value:P,onChange:function(e){return D(e.target.valueAsNumber)}})," ",P," ",Object(c.jsx)("span",{className:"tooltip",children:"0 is loseless, 51 is worst"})]}),Object(c.jsx)("div",{children:Object(c.jsx)("input",{type:"submit",value:"Convert",onClick:function(e){e.preventDefault(),function(){K.apply(this,arguments)}()}})})]})})},p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))};i.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(d,{})}),document.getElementById("root")),p()}},[[43,1,2]]]);
//# sourceMappingURL=main.94312617.chunk.js.map