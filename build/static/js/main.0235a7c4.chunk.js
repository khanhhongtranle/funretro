(this.webpackJsonpfunretro=this.webpackJsonpfunretro||[]).push([[0],{55:function(e,t,n){},66:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),c=n.n(r),s=n(18),o=n.n(s),i=(n(55),n(7)),l=n(68),d=n(75),j=n(72),u=n(69),b="http://localhost:8080/funretro/api/",p="funretro-react",x="funretro-user-id";function O(e,t,n,a){var r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&(200===r.status?n(JSON.parse(r.responseText)):a instanceof Function&&a(r.statusText))},r.open("post",b+e),r.send(t)}function h(e,t){var n=new Date,a=t;n.setTime(n.getTime()+2592e6),document.cookie=e+"="+a+"; expires="+n.toUTCString()}function m(e){var t=("; "+document.cookie).split("; "+e+"=");return 2===t.length?t.pop().split(";").shift():null}function f(e){var t=new Date;t.setTime(t.getTime()+-864e5),document.cookie=e+"=; expires="+t.toUTCString()}function g(){var e=window.location.pathname.substr(1);return!(!["login","signup"].includes(e)&&!m(p))}var v=n(15);var w=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)(""),o=Object(i.a)(s,2),b=o[0],m=o[1];return Object(a.jsx)(l.a,{style:{paddingTop:"2rem"},children:Object(a.jsxs)(d.a,{style:{padding:"1rem",width:"300px",margin:"auto"},children:[Object(a.jsx)("h2",{className:"text-center",children:"Login"}),Object(a.jsxs)(j.a,{children:[Object(a.jsxs)(j.a.Group,{controlId:"username",children:[Object(a.jsx)(j.a.Label,{children:"Username"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return c(e.target.value)}})]}),Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"Password"}),Object(a.jsx)(j.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return m(e.target.value)}})]}),Object(a.jsx)(u.a,{onClick:function(){var e=new FormData;e.append("username",n),e.append("password",b),O("login",e,(function(e){e.success?(h(p,e.token),h(x,e.user_id),window.location.href="/"):alert("Login failed")}))},variant:"primary",type:"button",children:"Login"}),Object(a.jsx)(v.b,{style:{marginLeft:"20px"},to:"/signup",children:"Sign up"})]})]})})},y=(n(62),n(8)),C=n(70),S=n(44),k=n(71),L=n(74),F=n(73);var I=function(){return Object(a.jsxs)(L.a,{bg:"primary",variant:"dark",children:[Object(a.jsx)(L.a.Brand,{href:"/",children:"Funretro"}),Object(a.jsxs)(F.a,{className:"mr-auto",children:[Object(a.jsx)(u.a,{variant:"light",onClick:function(){f(p),f(x),window.location.href="/"},children:"Logout"}),Object(a.jsx)(u.a,{onClick:function(){window.location.href="/account"},style:{marginLeft:"20px"},variant:"outline-light",children:"Account"})]})]})};var T=function(){var e=g(),t=Object(r.useState)([]),n=Object(i.a)(t,2),c=n[0],s=n[1],o=Object(r.useState)(""),b=Object(i.a)(o,2),h=b[0],f=b[1],w=Object(r.useState)(!1),L=Object(i.a)(w,2),F=L[0],T=L[1],_=function(){return T(!1)};return Object(r.useEffect)((function(){var e=!0,t=new FormData;return t.append("token",m(p)),t.append("user_id",m(x)),O("getBoards",t,(function(t){t.success&&(console.log(t),e&&s(t.data))})),function(){e=!1}}),[]),e?Object(a.jsxs)(l.a,{fluid:!0,children:[Object(a.jsx)(I,{}),Object(a.jsxs)("div",{style:{margin:"20px 30px"},children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("span",{style:{fontSize:"30px"},children:"My Boards"}),Object(a.jsx)(u.a,{style:{fontSize:"10px",margin:"10px 0 20px 30px"},variant:"outline-primary",onClick:function(){return T(!0)},children:"New board"})]}),Object(a.jsx)(C.a,{children:c.map((function(e){return Object(a.jsx)(S.a,{xs:!0,children:Object(a.jsx)(d.a,{style:{width:"18rem",marginTop:"1rem"},children:Object(a.jsxs)(d.a.Body,{children:[Object(a.jsx)(d.a.Title,{children:e.board_name}),Object(a.jsxs)(d.a.Text,{children:["Date Created: ",e.date_created]}),Object(a.jsx)(v.b,{to:"/detail/"+e.id,style:{marginRight:"10px"},children:Object(a.jsx)(u.a,{variant:"link",type:"button",children:"More"})}),Object(a.jsx)(u.a,{variant:"link",type:"button",onClick:function(){return function(e){var t=new FormData;t.append("id",e),t.append("user_id",m(x)),t.append("token",m(p)),O("deleteBoard",t,(function(e){console.log(e),e.success?(T(!1),s(e.data)):alert("Failed")}))}(e.id)},children:"Delete"}),Object(a.jsx)(d.a.Link,{children:"Share Link"})]})})})}))})]}),Object(a.jsxs)(k.a,{show:F,onHide:_,animation:!1,children:[Object(a.jsx)(k.a.Header,{closeButton:!0,children:Object(a.jsx)(k.a.Title,{children:"Modal heading"})}),Object(a.jsx)(k.a.Body,{children:Object(a.jsxs)(j.a.Group,{controlId:"boardname",children:[Object(a.jsx)(j.a.Label,{children:"Board name"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return f(e.target.value)}})]})}),Object(a.jsxs)(k.a.Footer,{children:[Object(a.jsx)(u.a,{variant:"secondary",onClick:_,children:"Close"}),Object(a.jsx)(u.a,{variant:"primary",onClick:function(e){var t=new FormData;t.append("board_name",h),t.append("user_id",m(x)),t.append("token",m(p)),O("saveBoard",t,(function(e){console.log(e),e.success?(T(!1),s(e.data)):alert("Failed")}))},children:"Add"})]})]})]}):Object(a.jsx)(y.a,{to:"/login"})},_=n(49),B=n(47),D=n(48),G=n.n(D),U=(n(65),{columns:[{id:1,title:"Went Well",cards:[]},{id:2,title:"To Improve",cards:[]},{id:3,title:"Action Items",cards:[]}]});var P=function(e){var t=g(),n=Object(r.useState)([]),c=Object(i.a)(n,2),s=c[0],o=c[1],d=Object(r.useState)("Board Name"),b=Object(i.a)(d,2),x=b[0],h=b[1],f=Object(r.useState)(""),v=Object(i.a)(f,2),w=v[0],S=v[1],L=Object(r.useState)(!1),F=Object(i.a)(L,2),T=F[0],D=F[1],P=function(){return D(!1)};function E(){return Object(a.jsx)(G.a,{allowRenameColumn:!0,allowRemoveCard:!0,disableColumnDrag:!0,onCardRemove:console.log,initialBoard:U,allowAddCard:{on:"top"},onNewCardConfirm:function(e){return Object(_.a)({id:(new Date).getTime()},e)},onCardNew:console.log})}return Object(r.useEffect)((function(){var t=!0,n=new FormData;return n.append("token",m(p)),n.append("board_id",e.match.params.id),O("getBoardDetail",n,(function(e){if(e.success){console.log(e.data);var n,a=U,r=Object(B.a)(e.data.board_details);try{for(r.s();!(n=r.n()).done;){var c=n.value;if("went well"===c.type){var s={id:c.id,title:c.description,description:c.description};a.columns[0].cards.push(s)}else if("to improve"===c.type){var i={id:c.id,title:c.description,description:c.description};a.columns[1].cards.push(i)}else if("action items"===c.type){var l={id:c.id,title:c.description,description:c.description};a.columns[2].cards.push(l)}}}catch(d){r.e(d)}finally{r.f()}t&&(o(a),h(e.data.board_name),S(e.data.board_name))}})),function(){t=!1}}),[s]),t?Object(a.jsxs)(l.a,{fluid:!0,children:[Object(a.jsx)(I,{}),Object(a.jsxs)("div",{style:{margin:"20px 30px"},children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("span",{style:{fontSize:"30px"},children:x}),Object(a.jsx)(u.a,{style:{margin:"10px 0 20px 30px"},variant:"link",onClick:function(){return D(!0)},children:"Edit"}),Object(a.jsx)(u.a,{style:{fontSize:"10px",margin:"10px 0 20px 30px"},variant:"outline-primary",children:"Share board"})]}),Object(a.jsx)(C.a,{children:Object(a.jsx)(E,{})})]}),Object(a.jsxs)(k.a,{show:T,onHide:P,animation:!1,children:[Object(a.jsx)(k.a.Header,{closeButton:!0,children:Object(a.jsx)(k.a.Title,{children:"Edit board"})}),Object(a.jsx)(k.a.Body,{children:Object(a.jsxs)(j.a.Group,{controlId:"boardname",children:[Object(a.jsx)(j.a.Label,{children:"Board name"}),Object(a.jsx)(j.a.Control,{type:"text",value:w,onChange:function(e){return S(e.target.value)}})]})}),Object(a.jsxs)(k.a.Footer,{children:[Object(a.jsx)(u.a,{variant:"secondary",onClick:P,children:"Close"}),Object(a.jsx)(u.a,{variant:"primary",onClick:function(){var t=new FormData;t.append("token",m(p)),t.append("board_id",e.match.params.id),t.append("board_name",w),O("editBoard",t,(function(e){e.success&&(D(!1),h(w))}))},children:"Save"})]})]})]}):Object(a.jsx)(y.a,{to:"/login"})};var E=function(){var e=Object(r.useState)(""),t=Object(i.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)(""),o=Object(i.a)(s,2),b=o[0],p=o[1],x=Object(r.useState)(""),h=Object(i.a)(x,2),m=h[0],f=h[1],g=Object(r.useState)(""),w=Object(i.a)(g,2),y=w[0],k=w[1],L=Object(r.useState)(""),F=Object(i.a)(L,2),I=F[0],T=F[1],_=Object(r.useState)(""),B=Object(i.a)(_,2),D=B[0],G=B[1];return Object(a.jsx)(l.a,{style:{paddingTop:"2rem"},children:Object(a.jsxs)(d.a,{style:{padding:"1rem",width:"600px",margin:"auto"},children:[Object(a.jsx)("h2",{className:"text-center",children:"Sign Up"}),Object(a.jsxs)(j.a,{children:[Object(a.jsxs)(C.a,{children:[Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"username",children:[Object(a.jsx)(j.a.Label,{children:"Username *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return c(e.target.value)}})]})}),Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"Password *"}),Object(a.jsx)(j.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return p(e.target.value)}})]})})]}),Object(a.jsxs)(C.a,{children:[Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"repassword",children:[Object(a.jsx)(j.a.Label,{children:"Re-Password *"}),Object(a.jsx)(j.a.Control,{type:"password",placeholder:"Re-password",onChange:function(e){return f(e.target.value)}})]})}),Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"email",children:[Object(a.jsx)(j.a.Label,{children:"Email *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Email",onChange:function(e){return k(e.target.value)}})]})})]}),Object(a.jsxs)(C.a,{children:[Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"firstname",children:[Object(a.jsx)(j.a.Label,{children:"First name *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"First name",onChange:function(e){return T(e.target.value)}})]})}),Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"lastname",children:[Object(a.jsx)(j.a.Label,{children:"Last name *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Last name",onChange:function(e){return G(e.target.value)}})]})})]}),Object(a.jsx)(u.a,{onClick:function(){if(b===m)if(""!==n&&""!==b&&""!==y&&""!==I&&""!==D){var e=new FormData;e.append("username",n),e.append("password",b),e.append("email",y),e.append("firstname",I),e.append("lastname",D),O("signup",e,(function(e){console.log(e),e.success?window.location.href="/login":alert("Failed")}))}else alert("please input field required!");else alert("re-password not match!")},variant:"primary",type:"button",children:"Submit"}),Object(a.jsx)(v.b,{style:{marginLeft:"20px"},to:"/login",children:"Login"})]})]})})};var N=function(){var e=g(),t=Object(r.useState)(""),n=Object(i.a)(t,2),c=n[0],s=n[1],o=Object(r.useState)(""),b=Object(i.a)(o,2),h=b[0],f=b[1],w=Object(r.useState)(""),k=Object(i.a)(w,2),L=k[0],F=k[1],T=Object(r.useState)(""),_=Object(i.a)(T,2),B=_[0],D=_[1],G=Object(r.useState)(""),U=Object(i.a)(G,2),P=U[0],E=U[1],N=Object(r.useState)(""),R=Object(i.a)(N,2),A=R[0],H=R[1];return Object(r.useEffect)((function(){var e=!0,t=new FormData;return t.append("token",m(p)),t.append("user_id",m(x)),O("getUserInfo",t,(function(t){t.success&&(console.log(t),e&&(s(t.data.username),D(t.data.email),E(t.data.first_name),H(t.data.last_name)))})),function(){e=!1}}),[]),e?Object(a.jsxs)(l.a,{fluid:!0,children:[Object(a.jsx)(I,{}),Object(a.jsx)(l.a,{style:{paddingTop:"2rem"},children:Object(a.jsxs)(d.a,{style:{padding:"1rem",width:"600px",margin:"auto"},children:[Object(a.jsx)("h2",{className:"text-center",children:"Account infomation"}),Object(a.jsxs)(j.a,{children:[Object(a.jsxs)(C.a,{children:[Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"username",children:[Object(a.jsx)(j.a.Label,{children:"Username *"}),Object(a.jsx)("br",{}),Object(a.jsx)(j.a.Label,{children:c})]})}),Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"Old Password"}),Object(a.jsx)(j.a.Control,{value:h,type:"password",placeholder:"Password",onChange:function(e){return f(e.target.value)}})]})})]}),Object(a.jsxs)(C.a,{children:[Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"email",children:[Object(a.jsx)(j.a.Label,{children:"Email *"}),Object(a.jsx)(j.a.Control,{value:B,type:"text",placeholder:"Email",onChange:function(e){return D(e.target.value)}})]})}),Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"New Password"}),Object(a.jsx)(j.a.Control,{value:L,type:"password",placeholder:"Password",onChange:function(e){return F(e.target.value)}})]})})]}),Object(a.jsxs)(C.a,{children:[Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"firstname",children:[Object(a.jsx)(j.a.Label,{children:"First name *"}),Object(a.jsx)(j.a.Control,{value:P,type:"text",placeholder:"First name",onChange:function(e){return E(e.target.value)}})]})}),Object(a.jsx)(S.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"lastname",children:[Object(a.jsx)(j.a.Label,{children:"Last name *"}),Object(a.jsx)(j.a.Control,{value:A,type:"text",placeholder:"Last name",onChange:function(e){return H(e.target.value)}})]})})]}),Object(a.jsx)(u.a,{onClick:function(){if(""!==c&&""!==B&&""!==P&&""!==A){var e=new FormData;e.append("token",m(p)),e.append("username",c),e.append("oldPassword",h),e.append("newPassword",L),e.append("email",B),e.append("firstname",P),e.append("lastname",A),O("updateUserInfo",e,(function(e){console.log(e),e.success&&e.data.change_pass?alert("Updated info and password!"):e.success&&e.old_pass_not_valid?alert("Updated info! Old password not valid - password not change!"):e.success?alert("Updated info!"):alert("Failed")}))}else alert("please input field required!")},variant:"primary",type:"button",children:"Change"}),Object(a.jsx)(v.b,{style:{marginLeft:"20px"},to:"/",children:"Back"})]})]})})]}):Object(a.jsx)(y.a,{to:"/login"})};var R=function(){return Object(r.useEffect)((function(){!function(){var e=window.location.pathname.substr(1);if(!["login","signup"].includes(e))if(m(p)){var t=new FormData;t.append("token",m(p)),O("checkToken",t,(function(e){e.success||(window.location.href="/login")}))}else window.location.href="/login"}()})),Object(a.jsx)(v.a,{children:Object(a.jsxs)(y.d,{children:[Object(a.jsx)(y.b,{path:"/login",children:Object(a.jsx)(w,{})}),Object(a.jsx)(y.b,{path:"/detail/:id",component:P}),Object(a.jsx)(y.b,{path:"/signup",component:E}),Object(a.jsx)(y.b,{path:"/account",component:N}),Object(a.jsx)(y.b,{path:"/",children:Object(a.jsx)(T,{})})]})})},A=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,76)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))};o.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(R,{})}),document.getElementById("root")),A()}},[[66,1,2]]]);
//# sourceMappingURL=main.0235a7c4.chunk.js.map