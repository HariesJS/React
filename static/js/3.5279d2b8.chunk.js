(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[3],{281:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(22),u=(n(21),n(5)),o=n(44);function i(e,t){return e===t}function l(e,t,n){if(null===t||null===n||t.length!==n.length)return!1;for(var r=t.length,a=0;a<r;a++)if(!e(t[a],n[a]))return!1;return!0}function s(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every((function(e){return"function"===typeof e}))){var n=t.map((function(e){return typeof e})).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+n+"]")}return t}var f=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return function(){for(var t=arguments.length,r=Array(t),a=0;a<t;a++)r[a]=arguments[a];var c=0,u=r.pop(),o=s(r),i=e.apply(void 0,[function(){return c++,u.apply(null,arguments)}].concat(n)),l=e((function(){for(var e=[],t=o.length,n=0;n<t;n++)e.push(o[n].apply(null,arguments));return i.apply(null,e)}));return l.resultFunc=u,l.dependencies=o,l.recomputations=function(){return c},l.resetRecomputations=function(){return c=0},l}}((function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i,n=null,r=null;return function(){return l(t,n,arguments)||(r=e.apply(null,arguments)),n=arguments,r}}));var d=f((function(e){return e.usersPage.users}),(function(e){return e.filter((function(){return!0}))})),p=n(26),m=function(e){var t=e.totalCount,n=e.currentPage,c=e.changePage,o=Object(u.d)((function(e){return e.theme.color})),i=Object(r.useState)(10),l=Object(p.a)(i,2),s=l[0],f=l[1];Object(r.useEffect)((function(){function e(){window.innerWidth<500?f(5):f(10)}return window.innerWidth<500&&e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]);for(var d=[],m=Math.ceil(t/30),b=1;b<=m;b++)d.push(b);var g=Math.ceil(m/s),v=Object(r.useState)(1),h=Object(p.a)(v,2),E=h[0],y=h[1],j=(E-1)*s+1,O=E*s;return a.a.createElement(r.Fragment,null,a.a.createElement("div",null,E>1&&a.a.createElement("span",{onClick:function(){return y(E-1)},style:{borderColor:o},className:"paginator"},"<"),d.filter((function(e){return e>=j&&e<=O})).map((function(e){return a.a.createElement("div",{style:n===e?{backgroundColor:o,borderColor:o}:{borderColor:o},className:n===e?"paginator-active":"paginator",onClick:function(){return function(e){e!==n&&c(e)}(e)},key:e},a.a.createElement("span",null,e))})),E<g&&a.a.createElement("span",{onClick:function(){return y(E+1)},style:{borderColor:o},className:"paginator"},">")))};t.default=function(){var e=Object(u.c)(),t=Object(u.d)((function(e){return d(e)})),n=Object(u.d)((function(e){return e.usersPage.isDisabled})),i=Object(u.d)((function(e){return e.usersPage.isLoad})),l=Object(u.d)((function(e){return e.usersPage.totalCount})),s=Object(u.d)((function(e){return e.usersPage.currentPage})),f=Object(u.d)((function(e){return e.theme.color})),p=Object(u.d)((function(e){return e.auth.data})),b=Object(r.useCallback)((function(t){return e(Object(o.c)(t))}),[o.c]);Object(r.useEffect)((function(){b()}),[]);return a.a.createElement("div",{className:"users-wrapper"},a.a.createElement("span",{className:"users-title"},"All users of this site"),a.a.createElement(m,{totalCount:l,currentPage:s,changePage:function(e){b(e)}}),i?a.a.createElement("div",{className:"users-loader"},"LOADING..."):a.a.createElement("div",{className:"parrent-block"},t.map((function(t){return a.a.createElement("div",{style:{backgroundColor:f},className:"user-block",key:t.id},a.a.createElement("div",null,t.name," | ",t.id),a.a.createElement("div",{align:"center"},a.a.createElement(c.b,{to:"/profile/".concat(t.id)},a.a.createElement("img",{src:t.photos.large||"https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png",alt:"",width:"60%"}))),a.a.createElement("div",null,t.id===p.id?a.a.createElement(c.b,{to:"/profile",className:"button"},"\u041c\u043e\u0439 \u043f\u0440\u043e\u0444\u0438\u043b\u044c"):t.followed?a.a.createElement("button",{className:"button",disabled:n.some((function(e){return e===t.id})),onClick:function(){return e(Object(o.d)(t.id))}},"\u041e\u0442\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f"):a.a.createElement("button",{className:"button",disabled:n.some((function(e){return e===t.id})),onClick:function(){return e(Object(o.b)(t.id))}},"\u041f\u043e\u0434\u043f\u0438\u0441\u0430\u0442\u044c\u0441\u044f")))}))))}}}]);
//# sourceMappingURL=3.5279d2b8.chunk.js.map