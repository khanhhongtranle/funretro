(this.webpackJsonpfunretro=this.webpackJsonpfunretro||[]).push([[0],{153:function(e,t,n){},301:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),r=n.n(c),o=n(30),s=n.n(o),i=(n(153),n(8)),l=n(303),d=n(310),j=n(307),u=n(304),p=n(139),b=n(305),O="https://khanhhong.aramefiko.com/api/",x="funretro-react",h="funretro-user-id",f="817492327547-f0qhi4ed61vsjua0vaj3vgtpqnlvap68.apps.googleusercontent.com";function g(e,t,n,a){var c=new XMLHttpRequest;c.onreadystatechange=function(){4===c.readyState&&(200===c.status?n(JSON.parse(c.responseText)):a instanceof Function&&a(c.statusText))},c.open("post",O+e),c.send(t)}function m(e,t){var n=new Date,a=t;n.setTime(n.getTime()+2592e6),document.cookie=e+"="+a+"; expires="+n.toUTCString()}function v(e){var t=("; "+document.cookie).split("; "+e+"=");return 2===t.length?t.pop().split(";").shift():null}function w(e){var t=new Date;t.setTime(t.getTime()+-864e5),document.cookie=e+"=; expires="+t.toUTCString()}function C(){var e=window.location.pathname.substr(1);return!(!["login","signup","loginGoogle","loginFacebook"].includes(e)&&!v(x))}var y=n(25),k=n(137),L=n.n(k),S=n(138),F=n.n(S);var _=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)(""),s=Object(i.a)(o,2),O=s[0],v=s[1],w=function(e){console.log(e);var t=new FormData;t.append("email",e.tt.$t),t.append("first_name",e.tt.gV),t.append("last_name",e.tt.jT),t.append("username",e.tt.CT),g("loginGoogle",t,(function(e){e.success?(m(x,e.token),m(h,e.user_id),window.location.href="/"):alert("Login failed")}))};return Object(a.jsx)(l.a,{style:{paddingTop:"2rem"},children:Object(a.jsxs)(d.a,{style:{padding:"1rem",width:"400px",margin:"auto"},children:[Object(a.jsx)("h2",{className:"text-center",children:"Login"}),Object(a.jsxs)(j.a,{children:[Object(a.jsxs)(j.a.Group,{controlId:"username",children:[Object(a.jsx)(j.a.Label,{children:"Username"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return r(e.target.value)}})]}),Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"Password"}),Object(a.jsx)(j.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return v(e.target.value)}})]}),Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{children:Object(a.jsx)(b.a,{onClick:function(){var e=new FormData;e.append("username",n),e.append("password",O),g("login",e,(function(e){e.success?(m(x,e.token),m(h,e.user_id),window.location.href="/"):alert("Login failed")}))},variant:"primary",type:"button",children:"Login"})}),Object(a.jsx)(p.a,{children:Object(a.jsx)(y.b,{style:{marginLeft:"20px",marginRight:"20px"},to:"/signup",children:"Sign up"})})]}),Object(a.jsx)(u.a,{children:Object(a.jsx)(p.a,{children:Object(a.jsx)(L.a,{clientId:f,buttonText:"Login",onSuccess:w,onFailure:w,cookiePolicy:"single_host_origin"})})}),Object(a.jsx)(u.a,{children:Object(a.jsx)(p.a,{children:Object(a.jsx)(F.a,{appId:"403062567533270",autoLoad:!1,textButton:"Login",fields:"name,email,picture",onClick:function(){console.log("Clicked!")},callback:function(e){console.log(e);var t=new FormData;t.append("username",e.userID),t.append("email",e.email),t.append("first_name",e.name),t.append("last_name",""),g("loginFacebook",t,(function(e){e.success?(m(x,e.token),m(h,e.user_id),window.location.href="/"):alert("Login failed")}))}})})})]})]})})},I=(n(159),n(10)),T=n(306),D=n(309),G=n(308);var B=function(){return Object(a.jsxs)(D.a,{bg:"primary",variant:"dark",children:[Object(a.jsx)(D.a.Brand,{href:"/",children:"Funretro"}),Object(a.jsxs)(G.a,{className:"mr-auto",children:[Object(a.jsx)(b.a,{variant:"light",onClick:function(){w(x),w(h),window.location.href="/"},children:"Logout"}),Object(a.jsx)(b.a,{onClick:function(){window.location.href="/account"},style:{marginLeft:"20px"},variant:"outline-light",children:"Account"})]})]})};var E=function(){var e=C(),t=Object(c.useState)([]),n=Object(i.a)(t,2),r=n[0],o=n[1],s=Object(c.useState)(""),O=Object(i.a)(s,2),f=O[0],m=O[1],w=Object(c.useState)(!1),k=Object(i.a)(w,2),L=k[0],S=k[1],F=function(){return S(!1)};return Object(c.useEffect)((function(){var e=!0,t=new FormData;return t.append("token",v(x)),t.append("user_id",v(h)),g("getBoards",t,(function(t){t.success&&(console.log(t),e&&o(t.data))})),function(){e=!1}}),[]),e?Object(a.jsxs)(l.a,{fluid:!0,children:[Object(a.jsx)(B,{}),Object(a.jsxs)("div",{style:{margin:"20px 30px"},children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("span",{style:{fontSize:"30px"},children:"My Boards"}),Object(a.jsx)(b.a,{style:{fontSize:"10px",margin:"10px 0 20px 30px"},variant:"outline-primary",onClick:function(){return S(!0)},children:"New board"})]}),Object(a.jsx)(u.a,{children:r.map((function(e){return Object(a.jsx)(p.a,{xs:!0,children:Object(a.jsx)(d.a,{style:{width:"18rem",marginTop:"1rem"},children:Object(a.jsxs)(d.a.Body,{children:[Object(a.jsx)(d.a.Title,{children:e.board_name}),Object(a.jsxs)(d.a.Text,{children:["Date Created: ",e.date_created]}),Object(a.jsx)(y.b,{to:"/detail/"+e.id,style:{marginRight:"10px"},children:Object(a.jsx)(b.a,{variant:"link",type:"button",children:"More"})}),Object(a.jsx)(b.a,{variant:"link",type:"button",onClick:function(){return function(e){var t=new FormData;t.append("id",e),t.append("user_id",v(h)),t.append("token",v(x)),g("deleteBoard",t,(function(e){console.log(e),e.success?(S(!1),o(e.data)):alert("Failed")}))}(e.id)},children:"Delete"}),Object(a.jsx)(d.a.Link,{children:"Share Link"})]})})})}))})]}),Object(a.jsxs)(T.a,{show:L,onHide:F,animation:!1,children:[Object(a.jsx)(T.a.Header,{closeButton:!0,children:Object(a.jsx)(T.a.Title,{children:"Modal heading"})}),Object(a.jsx)(T.a.Body,{children:Object(a.jsxs)(j.a.Group,{controlId:"boardname",children:[Object(a.jsx)(j.a.Label,{children:"Board name"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return m(e.target.value)}})]})}),Object(a.jsxs)(T.a.Footer,{children:[Object(a.jsx)(b.a,{variant:"secondary",onClick:F,children:"Close"}),Object(a.jsx)(b.a,{variant:"primary",onClick:function(e){var t=new FormData;t.append("board_name",f),t.append("user_id",v(h)),t.append("token",v(x)),g("saveBoard",t,(function(e){console.log(e),e.success?(S(!1),o(e.data)):alert("Failed")}))},children:"Add"})]})]})]}):Object(a.jsx)(I.a,{to:"/login"})},P=n(141),U=n(142),N=n.n(U),M={lanes:[{id:"WENTWELL",title:"WENT WELL",cards:[]},{id:"TOIMPROVE",title:"TO IMPROVE",cards:[]},{id:"ACTIONITEMS",title:"ACTION ITEMS",cards:[]}]};function A(e){var t=C(),n=Object(c.useState)(M),r=Object(i.a)(n,2),o=r[0],s=r[1],d=Object(c.useState)(),p=Object(i.a)(d,2),O=(p[0],p[1],Object(c.useState)("board name")),h=Object(i.a)(O,2),f=h[0],m=h[1],w=Object(c.useState)(""),y=Object(i.a)(w,2),k=y[0],L=y[1],S=Object(c.useState)({}),F=Object(i.a)(S,2),_=F[0],D=F[1],G=Object(c.useState)(!1),E=Object(i.a)(G,2),U=E[0],A=E[1],H=Object(c.useState)(!1),R=Object(i.a)(H,2),q=R[0],z=R[1];return Object(c.useEffect)((function(){var t=!0,n=new FormData;return n.append("token",v(x)),n.append("board_id",e.match.params.id),g("getBoardDetail",n,(function(e){if(e.success){var n,a=e.data.board_details,c=M,r=Object(P.a)(a);try{var o=function(){var e=n.value,t={id:e.id.toString(),title:e.title,description:e.description};c.lanes.find((function(t){return t.id===e.type})).cards.push(t)};for(r.s();!(n=r.n()).done;)o()}catch(i){r.e(i)}finally{r.f()}t&&(s(c),m(e.data.board_name),L(e.data.board_name))}})),function(){t=!1}}),[]),t?Object(a.jsxs)(l.a,{fluid:!0,children:[Object(a.jsx)(B,{}),Object(a.jsxs)("div",{style:{margin:"20px 30px"},children:[Object(a.jsxs)("div",{children:[Object(a.jsx)("span",{style:{fontSize:"30px"},children:f}),Object(a.jsx)(b.a,{style:{margin:"10px 0 20px 30px"},variant:"link",onClick:function(){A(!0)},children:"Edit"}),Object(a.jsx)(b.a,{style:{fontSize:"10px",margin:"10px 0 20px 30px"},variant:"outline-primary",children:"Share board"})]}),Object(a.jsx)(u.a,{children:Object(a.jsx)(N.a,{cardDraggable:!0,laneDraggable:!1,draggable:!0,editable:!0,onCardAdd:function(t,n){var a=new FormData;a.append("token",v(x)),a.append("board_id",e.match.params.id),a.append("title",t.title),a.append("description",t.description),a.append("type",n),g("addCard",a,(function(e){e.success&&console.log(1)}))},onCardDelete:function(e,t){var n=new FormData;n.append("token",v(x)),n.append("card_id",e),g("deleteCard",n,(function(e){e.success&&console.log(1)}))},onCardMoveAcrossLanes:function(e,t,n,a){console.log(e),console.log(t),console.log(n),console.log(a)},onCardClick:function(e,t,n){var a=new FormData;a.append("token",v(x)),a.append("card_id",e),g("getCard",a,(function(e){if(e.success&&e.data.length>0){z(!0);var t={id:e.data[0].id,title:e.data[0].title,description:e.data[0].description};D(t)}}))},style:{backgroundColor:"white"},data:o,onDataChange:function(){console.log(o)}})})]}),Object(a.jsxs)(T.a,{show:U,onHide:function(){A(!1)},animation:!1,children:[Object(a.jsx)(T.a.Header,{closeButton:!0,children:Object(a.jsx)(T.a.Title,{children:"Edit board"})}),Object(a.jsx)(T.a.Body,{children:Object(a.jsxs)(j.a.Group,{controlId:"boardname",children:[Object(a.jsx)(j.a.Label,{children:"Board name"}),Object(a.jsx)(j.a.Control,{type:"text",value:k,onChange:function(e){return L(e.target.value)}})]})}),Object(a.jsxs)(T.a.Footer,{children:[Object(a.jsx)(b.a,{variant:"secondary",onClick:function(){A(!1)},children:"Close"}),Object(a.jsx)(b.a,{variant:"primary",onClick:function(){return function(){var t=new FormData;t.append("token",v(x)),t.append("board_id",e.match.params.id),t.append("board_name",k),g("editBoard",t,(function(e){e.success&&(A(!1),m(k))}))}()},children:"Save"})]})]}),Object(a.jsxs)(T.a,{show:q,onHide:function(){z(!1)},animation:!1,children:[Object(a.jsx)(T.a.Header,{closeButton:!0,children:Object(a.jsx)(T.a.Title,{children:"Edit card"})}),Object(a.jsxs)(T.a.Body,{children:[Object(a.jsxs)(j.a.Group,{controlId:"cardtitle",children:[Object(a.jsx)(j.a.Label,{children:"Card title"}),Object(a.jsx)(j.a.Control,{type:"text",value:_.title,onChange:function(e){var t;t=e.target.value,D({id:_.id,title:t,description:_.description})}})]}),Object(a.jsxs)(j.a.Group,{controlId:"carddescription",children:[Object(a.jsx)(j.a.Label,{children:"Card description"}),Object(a.jsx)(j.a.Control,{type:"text",value:_.description,onChange:function(e){var t;t=e.target.value,D({id:_.id,title:_.title,description:t})}})]})]}),Object(a.jsxs)(T.a.Footer,{children:[Object(a.jsx)(b.a,{variant:"secondary",onClick:function(){z(!1)},children:"Close"}),Object(a.jsx)(b.a,{variant:"primary",onClick:function(){return function(e){var t=new FormData;t.append("token",v(x)),t.append("card_id",e),t.append("title",_.title),t.append("description",_.description),g("updateCard",t,(function(e){e.success,s(M),z(!1)}))}(_.id)},children:"Save"})]})]})]}):Object(a.jsx)(I.a,{to:"/login"})}var H=function(){var e=Object(c.useState)(""),t=Object(i.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)(""),s=Object(i.a)(o,2),O=s[0],x=s[1],h=Object(c.useState)(""),f=Object(i.a)(h,2),m=f[0],v=f[1],w=Object(c.useState)(""),C=Object(i.a)(w,2),k=C[0],L=C[1],S=Object(c.useState)(""),F=Object(i.a)(S,2),_=F[0],I=F[1],T=Object(c.useState)(""),D=Object(i.a)(T,2),G=D[0],B=D[1];return Object(a.jsx)(l.a,{style:{paddingTop:"2rem"},children:Object(a.jsxs)(d.a,{style:{padding:"1rem",width:"600px",margin:"auto"},children:[Object(a.jsx)("h2",{className:"text-center",children:"Sign Up"}),Object(a.jsxs)(j.a,{children:[Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"username",children:[Object(a.jsx)(j.a.Label,{children:"Username *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Username",onChange:function(e){return r(e.target.value)}})]})}),Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"Password *"}),Object(a.jsx)(j.a.Control,{type:"password",placeholder:"Password",onChange:function(e){return x(e.target.value)}})]})})]}),Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"repassword",children:[Object(a.jsx)(j.a.Label,{children:"Re-Password *"}),Object(a.jsx)(j.a.Control,{type:"password",placeholder:"Re-password",onChange:function(e){return v(e.target.value)}})]})}),Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"email",children:[Object(a.jsx)(j.a.Label,{children:"Email *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Email",onChange:function(e){return L(e.target.value)}})]})})]}),Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"firstname",children:[Object(a.jsx)(j.a.Label,{children:"First name *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"First name",onChange:function(e){return I(e.target.value)}})]})}),Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"lastname",children:[Object(a.jsx)(j.a.Label,{children:"Last name *"}),Object(a.jsx)(j.a.Control,{type:"text",placeholder:"Last name",onChange:function(e){return B(e.target.value)}})]})})]}),Object(a.jsx)(b.a,{onClick:function(){if(O===m)if(""!==n&&""!==O&&""!==k&&""!==_&&""!==G){var e=new FormData;e.append("username",n),e.append("password",O),e.append("email",k),e.append("firstname",_),e.append("lastname",G),g("signup",e,(function(e){console.log(e),e.success?window.location.href="/login":alert("Failed")}))}else alert("please input field required!");else alert("re-password not match!")},variant:"primary",type:"button",children:"Submit"}),Object(a.jsx)(y.b,{style:{marginLeft:"20px"},to:"/login",children:"Login"})]})]})})};var R=function(){var e=C(),t=Object(c.useState)(""),n=Object(i.a)(t,2),r=n[0],o=n[1],s=Object(c.useState)(""),O=Object(i.a)(s,2),f=O[0],m=O[1],w=Object(c.useState)(""),k=Object(i.a)(w,2),L=k[0],S=k[1],F=Object(c.useState)(""),_=Object(i.a)(F,2),T=_[0],D=_[1],G=Object(c.useState)(""),E=Object(i.a)(G,2),P=E[0],U=E[1],N=Object(c.useState)(""),M=Object(i.a)(N,2),A=M[0],H=M[1];return Object(c.useEffect)((function(){var e=!0,t=new FormData;return t.append("token",v(x)),t.append("user_id",v(h)),g("getUserInfo",t,(function(t){t.success&&(console.log(t),e&&(o(t.data.username),D(t.data.email),U(t.data.first_name),H(t.data.last_name)))})),function(){e=!1}}),[]),e?Object(a.jsxs)(l.a,{fluid:!0,children:[Object(a.jsx)(B,{}),Object(a.jsx)(l.a,{style:{paddingTop:"2rem"},children:Object(a.jsxs)(d.a,{style:{padding:"1rem",width:"600px",margin:"auto"},children:[Object(a.jsx)("h2",{className:"text-center",children:"Account infomation"}),Object(a.jsxs)(j.a,{children:[Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"username",children:[Object(a.jsx)(j.a.Label,{children:"Username *"}),Object(a.jsx)("br",{}),Object(a.jsx)(j.a.Label,{children:r})]})}),Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"Old Password"}),Object(a.jsx)(j.a.Control,{value:f,type:"password",placeholder:"Password",onChange:function(e){return m(e.target.value)}})]})})]}),Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"email",children:[Object(a.jsx)(j.a.Label,{children:"Email *"}),Object(a.jsx)(j.a.Control,{value:T,type:"text",placeholder:"Email",onChange:function(e){return D(e.target.value)}})]})}),Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"password",children:[Object(a.jsx)(j.a.Label,{children:"New Password"}),Object(a.jsx)(j.a.Control,{value:L,type:"password",placeholder:"Password",onChange:function(e){return S(e.target.value)}})]})})]}),Object(a.jsxs)(u.a,{children:[Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"firstname",children:[Object(a.jsx)(j.a.Label,{children:"First name *"}),Object(a.jsx)(j.a.Control,{value:P,type:"text",placeholder:"First name",onChange:function(e){return U(e.target.value)}})]})}),Object(a.jsx)(p.a,{xs:6,children:Object(a.jsxs)(j.a.Group,{controlId:"lastname",children:[Object(a.jsx)(j.a.Label,{children:"Last name *"}),Object(a.jsx)(j.a.Control,{value:A,type:"text",placeholder:"Last name",onChange:function(e){return H(e.target.value)}})]})})]}),Object(a.jsx)(b.a,{onClick:function(){if(""!==r&&""!==T&&""!==P&&""!==A){var e=new FormData;e.append("token",v(x)),e.append("username",r),e.append("oldPassword",f),e.append("newPassword",L),e.append("email",T),e.append("firstname",P),e.append("lastname",A),g("updateUserInfo",e,(function(e){console.log(e),e.success&&e.data.change_pass?alert("Updated info and password!"):e.success&&e.old_pass_not_valid?alert("Updated info! Old password not valid - password not change!"):e.success?alert("Updated info!"):alert("Failed")}))}else alert("please input field required!")},variant:"primary",type:"button",children:"Change"}),Object(a.jsx)(y.b,{style:{marginLeft:"20px"},to:"/",children:"Back"})]})]})})]}):Object(a.jsx)(I.a,{to:"/login"})};var q=function(){return Object(c.useEffect)((function(){!function(){var e=window.location.pathname.substr(1);if(!["login","signup","loginGoogle","loginFacebook"].includes(e))if(v(x)){var t=new FormData;t.append("token",v(x)),g("checkToken",t,(function(e){e.success||(window.location.href="/login")}))}else window.location.href="/login"}()})),Object(a.jsx)(y.a,{children:Object(a.jsxs)(I.d,{children:[Object(a.jsx)(I.b,{path:"/login",children:Object(a.jsx)(_,{})}),Object(a.jsx)(I.b,{path:"/detail/:id",component:A}),Object(a.jsx)(I.b,{path:"/signup",component:H}),Object(a.jsx)(I.b,{path:"/account",component:R}),Object(a.jsx)(I.b,{path:"/",children:Object(a.jsx)(E,{})})]})})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,311)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),a(e),c(e),r(e),o(e)}))};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(q,{})}),document.getElementById("root")),z()}},[[301,1,2]]]);
//# sourceMappingURL=main.b103e46d.chunk.js.map