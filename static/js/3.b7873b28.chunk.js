(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{288:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(24),i=(n(21),n(4)),o=n(22),u=n(34),l=n(29),s=n(42),d=function(e){var t=e.totalCount,n=e.currentPage,c=e.changePage,o=Object(i.d)((function(e){return Object(s.a)(e)})),u=Object(a.useState)(10),d=Object(l.a)(u,2),b=d[0],m=d[1];Object(a.useEffect)((function(){function e(){window.innerWidth<500?m(5):m(10)}return window.innerWidth<500&&e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]);for(var f=[],O=Math.ceil(t/30),j=1;j<=O;j++)f.push(j);var p=Math.ceil(O/b),E=Object(a.useState)(1),g=Object(l.a)(E,2),v=g[0],h=g[1],k=(v-1)*b+1,w=v*b;return r.a.createElement(a.Fragment,null,r.a.createElement("div",null,v>1&&r.a.createElement("span",{onClick:function(){return h(v-1)},style:{borderColor:o},className:"paginator"},"<"),f.filter((function(e){return e>=k&&e<=w})).map((function(e){return r.a.createElement("div",{style:n===e?{backgroundColor:o,borderColor:o}:{borderColor:o},className:n===e?"paginator-active":"paginator",onClick:function(){return function(e){e!==n&&c(e)}(e)},key:e},r.a.createElement("span",null,e))})),v<p&&r.a.createElement("span",{onClick:function(){return h(v+1)},style:{borderColor:o},className:"paginator"},">")))},b=n(25),m=n(54),f=(n(19),n(119));t.default=function(){var e=Object(i.c)(),t=Object(i.d)((function(e){return Object(u.b)(e)})),n=Object(i.d)((function(e){return Object(u.c)(e)})),l=Object(i.d)((function(e){return Object(u.d)(e)})),O=Object(i.d)((function(e){return Object(u.f)(e)})),j=Object(i.d)((function(e){return Object(u.a)(e)})),p=Object(i.d)((function(e){return Object(s.a)(e)})),E=Object(i.d)((function(e){return Object(b.b)(e)})),g=Object(i.d)((function(e){return Object(m.c)(e)})),v=Object(i.d)((function(e){return Object(m.b)(e)})),h=(Object(i.d)((function(e){return Object(u.e)(e)})),Object(a.useCallback)((function(t){return e(Object(o.d)(t))}),[o.d]));Object(a.useEffect)((function(){h()}),[]);return r.a.createElement("div",{className:"users-wrapper"},r.a.createElement("span",{className:"users-title"},"All users of this site"),r.a.createElement(d,{totalCount:O,currentPage:j,changePage:function(e){h(e)}}),l?r.a.createElement("div",{className:"users-loader"},"LOADING..."):r.a.createElement("div",{className:"parrent-block"},t.map((function(t){return r.a.createElement("div",{style:{backgroundColor:p},className:"user-block",key:t.id},g.some((function(e){return e.code===t.id}))?r.a.createElement("div",{className:"profile-techadmin-info"},t.name," | ",t.id):v.some((function(e){return e.code===t.id}))?r.a.createElement("div",{className:"profile-admin-info"},t.name," | ",t.id):r.a.createElement("div",null,t.name," | ",t.id),r.a.createElement(f.a,{data:t.id}),r.a.createElement("div",{align:"center"},r.a.createElement(c.b,{to:"/profile/".concat(t.id)},r.a.createElement("img",{src:t.photos.large||"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png",alt:"",width:"60%"}))),r.a.createElement("div",null,E.isAuth?t.id===E.id?r.a.createElement(c.b,{to:"/profile",className:"button"},"\u041c\u043e\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"):t.followed?r.a.createElement("button",{className:"button",disabled:n.some((function(e){return e===t.id})),onClick:function(){return e(Object(o.g)(t.id))}},"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"):r.a.createElement("button",{className:"button",disabled:n.some((function(e){return e===t.id})),onClick:function(){return e(Object(o.b)(t.id))}},"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"):r.a.createElement(c.b,{to:"/login",className:"button"},"\u0412\u043e\u0439\u0434\u0438\u0442\u0435")))}))))}}}]);
//# sourceMappingURL=3.b7873b28.chunk.js.map