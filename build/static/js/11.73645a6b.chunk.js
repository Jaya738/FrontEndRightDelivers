(this["webpackJsonpright-deliveres"]=this["webpackJsonpright-deliveres"]||[]).push([[11,15],{135:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(28),l=a(4),i=a(21);t.a=Object(i.b)((function(e){return{config:e.config,cartCount:e.cart.cartItems.length}}))(Object(l.g)((function(e){var t=e.cartCount;return r.a.createElement("div",{className:"fixed-top align-middle",style:{position:"fixed",padding:"0.5rem 1rem",top:"0",width:"100%",backgroundColor:"#2F4F4F",zIndex:"10"}},r.a.createElement("div",{style:{paddingTop:"4vh",display:"flex",alignItems:"center"}},r.a.createElement("div",{onClick:e.back,style:{fontSize:"20px",color:"white",padding:"0px 20px"}},r.a.createElement("i",{className:"fa fa-angle-left","aria-hidden":"true"})),r.a.createElement("span",{style:{fontSize:"18px",color:"white"}},e.heading),r.a.createElement(c.b,{to:"/dashboard/cart",className:"option_links ml-auto mr-3"},r.a.createElement("i",{className:"uil uil-shopping-cart-alt icon_wishlist"}),r.a.createElement("span",{className:"noti_count1"},t))))})))},154:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(155),l=a.n(c);a(156);t.a=function(){return r.a.createElement("div",{className:"bodyMain"},r.a.createElement("img",{src:l.a,style:{width:"30%",display:"block",marginLeft:"auto",marginRight:"auto",position:"absolute",top:"45%",left:"42%"},alt:"Loading..."}))}},155:function(e,t,a){e.exports=a.p+"static/media/spinner.bab4b43c.svg"},156:function(e,t,a){},183:function(e,t,a){e.exports=a.p+"static/media/img-14.b0030b9d.jpg"},184:function(e,t,a){},185:function(e,t,a){e.exports=a.p+"static/media/addressEmpty.121e5a15.svg"},192:function(e,t,a){"use strict";var n=a(3),r=a(5),c=a(132),l=a.n(c),i=a(0),s=a.n(i),o=a(134),u=s.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,i=e.fluid,u=e.rounded,d=e.roundedCircle,m=e.thumbnail,f=Object(r.a)(e,["bsPrefix","className","fluid","rounded","roundedCircle","thumbnail"]);a=Object(o.b)(a,"img");var p=l()(i&&a+"-fluid",u&&"rounded",d&&"rounded-circle",m&&a+"-thumbnail");return s.a.createElement("img",Object(n.a)({ref:t},f,{className:l()(c,p)}))}));u.displayName="Image",u.defaultProps={fluid:!1,rounded:!1,roundedCircle:!1,thumbnail:!1},t.a=u},224:function(e,t,a){"use strict";var n=a(3),r=a(0),c=a.n(r),l=a(132),i=a.n(l);t.a=function(e){return c.a.forwardRef((function(t,a){return c.a.createElement("div",Object(n.a)({},t,{ref:a,className:i()(t.className,e)}))}))}},229:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(21);t.a=Object(c.b)((function(e){return{config:e.config}}))((function(e){var t=e.config.authData.user.name,a=e.config.authData.user.mbl;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{style:{position:"fixed",top:"0",left:"0",height:"43vh",background:"#2f4f4f",display:"block",width:"100%",zIndex:"-1",borderRadius:"0 0 5px 5px"}}),r.a.createElement("div",null,r.a.createElement("div",{class:"container",style:{marginTop:"17vh"}},r.a.createElement("div",{class:"row"},r.a.createElement("div",{class:"col-lg-12"},r.a.createElement("div",{class:"user-dt"},r.a.createElement("div",{style:{width:"80px",height:"80px",backgroundColor:"#fff",position:"relative",left:"50%",transform:"translateX(-50%)",textAlign:"center",borderRadius:"50%",webkitBorderRadius:"50%",mozBorderRadius:"50%"}},r.a.createElement("span",{style:{position:"relative",top:"20px",fontSize:"40px",lineHeight:"40px",color:"green",fontWeight:"bold"}},t[0]||"G")),r.a.createElement("br",null),r.a.createElement("span",{style:{color:"white",fontSize:"16px"}},t||"Guest")," ",r.a.createElement("br",null),r.a.createElement("span",{style:{color:"white",fontSize:"12px"}},a||"")))))))}))},261:function(e,t,a){"use strict";a.r(t);var n=a(29),r=a.n(n),c=a(42),l=a(41),i=a(135),s=a(4),o=a(0),u=a.n(o),d=a(21),m=a(192),f=(a(195),a(255)),p=(a(184),a(185)),g=a.n(p),b=a(11),v=a(200),E=a(14),h=a(16);function y(e){var t=e.address.addressList||[],a=Object(s.f)(),n=Object(o.useState)(!1),i=Object(l.a)(n,2),d=i[0],p=i[1],b=Object(o.useState)(""),v=Object(l.a)(b,2),y=v[0],x=v[1],N=(e.config.curBranch,Object(o.useState)(!0)),j=Object(l.a)(N,2),O=(j[0],j[1],Object(o.useState)(!1)),k=Object(l.a)(O,2),C=(k[0],k[1],Object(o.useState)({})),w=Object(l.a)(C,2),S=(w[0],w[1],function(){var t=Object(c.a)(r.a.mark((function t(a){var n,c,l,i;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=E.b+"delete/address",c={address_id:a.id},l={method:"POST",headers:{"Content-Type":"application/json;charset=utf-8",rKey:e.config.authData.rKey,dKey:e.config.authData.dKey},body:JSON.stringify(c)},t.next=5,Object(h.a)(n,l);case 5:return t.next=7,t.sent.json();case 7:if(!(i=t.sent)||1!==i.status){t.next=13;break}return x(i.msg),p(!0),e.setAddressList(i.address),t.abrupt("return");case 13:if(!i){t.next=17;break}return x(i.msg),p(!0),t.abrupt("return");case 17:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),z=u.a.createElement("div",{className:"row",style:{marginTop:"6vh"}},u.a.createElement("div",{className:"col-lg-12 col-md-12"},u.a.createElement("div",{className:"pdpt-bg"},u.a.createElement("div",{className:"pdpt-title"},u.a.createElement("h4",null,"Manage Your Address")),u.a.createElement("div",{className:"address-body"},u.a.createElement("button",{className:"next-btn16 hover-btn",onClick:function(){a.push("/addaddress")}},"Add New Address"),u.a.createElement("div",{className:"address-spacing"},t.length>0?t.map((function(e){return u.a.createElement("div",{key:e.id,className:"address-item"},u.a.createElement("div",{className:"address-dt-all"},u.a.createElement("h4",null,e.name," ",u.a.createElement("i",{style:{color:"#d30013"},className:1===e.type?"fa fa-home":2===e.type?"fa fa-briefcase":"fa fa-map"}))," ",u.a.createElement("p",null,e.flat,", ",e.area),u.a.createElement("ul",{className:"action-btns"},u.a.createElement("li",null,u.a.createElement("div",{className:"action-btn",onClick:function(){return S(e)}},u.a.createElement("i",{className:"uil uil-trash-alt"}))))))})):u.a.createElement("div",null,u.a.createElement(m.a,{src:g.a,fluid:!0}),u.a.createElement("p",{style:{color:"#d30013",fontSize:"18px",fontWeight:"bold",textAlign:"center"}},"Start adding your address"))))))),T=u.a.createElement(f.a,{onClose:function(){return p(!1)},show:d,delay:2e3,autohide:!0,style:{position:"fixed",bottom:"20vh",zIndex:"999",textAlign:"center",left:"50%",transform:"translateX(-50%)"}},u.a.createElement(f.a.Body,{style:{backgroundColor:"#2f4f4f",color:"white",borderBottom:"none",textAlign:"center",padding:"0.2rem 0.8rem"}},u.a.createElement("strong",{className:"mr-auto"},y)));return u.a.createElement(u.a.Fragment,null,T,u.a.createElement("div",null,z))}t.default=Object(d.b)((function(e){return{address:e.address,config:e.config,cart:e.cart}}),(function(e){return{setCurAddress:function(t){return e(b.r(t))},setAddressList:function(t){return e(b.o(t))}}}))(Object(v.geolocated)({positionOptions:{enableHighAccuracy:!0},userDecisionTimeout:5e3})((function(e){var t=Object(s.f)();return u.a.createElement("div",null,u.a.createElement(i.a,{heading:"Address",back:function(){return t.goBack()}}),u.a.createElement(y,e))})))},338:function(e,t,a){e.exports=a.p+"static/media/noOrders.39d687d3.svg"},339:function(e,t,a){e.exports=a.p+"static/media/noCart.de9b2e83.svg"},577:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(4),l=a(21),i=a(229),s=a(135),o=a(29),u=a.n(o),d=a(42),m=a(41),f=a(193),p=a.n(f),g=a(11),b=a(192),v=a(579),E=a(338),h=a.n(E),y=a(154),x=a(14),N=a(16);var j=Object(l.b)((function(e){return{config:e.config,orders:e.orders}}),(function(e){return{setBackUrl:function(t){return e(g.p(t))},clearCart:function(){return e(g.g())}}}))((function(e){var t=Object(n.useState)(!0),a=Object(m.a)(t,2),c=a[0],l=a[1],i=Object(n.useState)([]),s=Object(m.a)(i,2),o=s[0],f=s[1],g=x.b+"restaurants/myorders",E=function(){var t=Object(d.a)(u.a.mark((function t(){var a,n;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a={method:"GET",headers:{"Content-Type":"application/json;charset=utf-8",rKey:e.config.authData.rKey,dKey:e.config.authData.dKey}},t.next=3,Object(N.a)(g,a);case 3:return t.next=5,t.sent.json();case 5:(n=t.sent)&&1===n.status&&(l(!1),f(n.orders));case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();Object(n.useEffect)((function(){E()}),[]);var j=r.a.createElement("div",{className:"m-5",style:{}},r.a.createElement(b.a,{src:h.a,fluid:!0}),r.a.createElement("p",{style:{color:"#2f4f4f",margin:"10%",textAlign:"center",fontSize:"16px"}}," ","You have no orders yet"," ")),O=r.a.createElement("div",{className:"w-100 p-3"},r.a.createElement(v.a,{className:"panel-group accordion mt-0 mb-0",defaultActiveKey:"0"},o.length>0&&o.map((function(t){return r.a.createElement("div",{style:{backgroundColor:"white",overflowX:"hidden",overflowY:"auto",borderRadius:"4px",padding:"10px",margin:"10px",color:"#2f4f4f"},key:t.ordid},r.a.createElement(v.a.Toggle,{eventKey:t.ordid,className:"",style:{backgroundColor:"Transparent",backgroundRepeat:"no-repeat",border:"none",cursor:"pointer",overflow:"hidden",paddingTop:"3px",paddingBottom:"3px",width:"100%",fontSize:"10px",color:"#2f4f4f",textAlign:"left",verticalAlign:"middle"}},r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("i",{style:{marginLeft:"5px",fontSize:"14px"},className:"fa ".concat(1===t.ost?"fa-clock":2===t.ost?"fa-utensils":3===t.ost?"fa-shopping-bag":4===t.ost?"fa-motorcycle":"fa-check"," pr-2")}),r.a.createElement("span",{style:{fontSize:"14px"}},e.orders.orderStatus[t.ost].l),r.a.createElement("i",{style:{fontSize:"18px"},className:"fa fa-angle-right float-right pt-1 mr-2"})),r.a.createElement("div",{style:{margin:"10px",fontSize:"12px"},className:"col col-12 align-middle"},r.a.createElement("ul",{style:{marginBottom:"5px"}},r.a.createElement("li",{style:{fontSize:"14px",fontWeight:"bold"}},t.shopname),r.a.createElement("li",{style:{fontSize:"12px",fontWeight:"bold"}},e.config.services[t.type].name||"")),t.items.map((function(e){return r.a.createElement(r.a.Fragment,null,r.a.createElement("span",{style:{marginTop:"5px",marginBottom:"5px"}},e.n," x ",e.q," ",r.a.createElement("span",{style:{float:"right"}}," \u20b9",e.p*e.q," ")),r.a.createElement("br",null))}))))),r.a.createElement(v.a.Collapse,{eventKey:t.ordid},r.a.createElement("div",{className:"container",style:{margin:"5px"}},r.a.createElement("div",{className:"row",style:{paddingBottom:"5px",marginBottom:"5px"}},r.a.createElement("div",{className:"col col-12 pt-1",style:{borderTop:"1px solid grey"}},r.a.createElement("span",null,"Fees ",r.a.createElement("span",{style:{float:"right"}},"\u20b9",t.fee)," "),r.a.createElement("br",null),r.a.createElement("span",{style:{fontSize:"16px",fontWeight:"bold"}},"Total ",r.a.createElement("span",{style:{float:"right"}},"\u20b9",t.amt+t.fee)))))),r.a.createElement("div",{className:"m-2",style:{color:"grey"}},r.a.createElement("span",{style:{fontSize:"10px",float:"left"}},r.a.createElement("i",{className:"fa fa-calendar pr-2"}),p()(1e3*t.time,"mediumDate")),r.a.createElement("span",{style:{fontSize:"10px",float:"right"}},r.a.createElement("i",{className:"fa fa-clock pr-2"}),p()(1e3*t.time,"shortTime"))))})))),k=r.a.createElement("div",null,r.a.createElement(y.a,null));return r.a.createElement(r.a.Fragment,null,c?k:o.length>0?O:j)})),O=Object(c.g)((function(e){var t=Object(c.f)();return r.a.createElement("div",null,r.a.createElement(s.a,{heading:"Profile",back:function(){return t.goBack()}}),r.a.createElement(i.a,null),r.a.createElement("div",{style:{marginTop:"8vh",width:"100%"}},r.a.createElement("div",{style:{borderRadius:"10px"}},r.a.createElement(j,null))))}));var k=Object(l.b)((function(e){return{config:e.config}}),(function(e){return{setBackUrl:function(t){return e(g.p(t))},clearCart:function(){return e(g.g())}}}))(Object(c.g)((function(e){var t=Object(c.f)();return r.a.createElement("div",{className:"row"},r.a.createElement(s.a,{heading:"Orders",back:function(){return t.goBack()}}),r.a.createElement(j,null))}))),C=a(12),w=a(1),S=a(28),z=a(339),T=a.n(z),P=a(183),A=a.n(P);var q=Object(l.b)((function(e){return{state:e.cart}}),(function(e){return{setQuantity:function(t){return e(g.A(t))},deleteCartItem:function(t){return e(g.j(t))},getDerivedPrice:function(t){return e(g.k(t))}}}))((function(e){var t=e.product.quantity,a=e.product.quantity*e.product.itemPrice,n=(e.product.quantity,e.product.sprice,e.product.extraPrice);return r.a.createElement("div",null,r.a.createElement("div",{className:"cart-item"},r.a.createElement("div",{className:"cart-product-img"},r.a.createElement("img",{src:e.product.img?x.c+"restaurants/items/"+e.product.img:A.a,alt:"ProductImage"})),r.a.createElement("div",{className:"cart-text"},r.a.createElement("div",{className:"d-flex"},r.a.createElement("h4",null,e.product.name),1===e.product.custmz&&r.a.createElement("span",{style:{fontSize:"10px",margin:"-2px 5px"}},"( ",e.product.options," )"),r.a.createElement("button",{type:"button",onClick:function(){e.deleteCartItem(e.product.pid)},className:"cart-close-btn align-self-start"},r.a.createElement("i",{className:"uil uil-multiply"}))),r.a.createElement("div",{className:"d-flex"},1===e.product.custmz&&e.product.extras.map((function(e,t){return r.a.createElement("label",{key:t,style:{padding:"2px 4px",backgroundColor:"#2f4f4f",color:"white",borderRadius:"3px",fontWeight:"600",fontSize:"10px",marginRight:"3px",marginTop:"5px"}},e.n)}))),r.a.createElement("div",{className:"qty-group"},r.a.createElement("div",{className:"quantity buttons_added"},r.a.createElement("input",{type:"button",value:"-",onClick:function(){if(1!==t){var a={pid:e.product.pid,quantity:t>0?t-1:t};e.setQuantity(a)}else e.deleteCartItem(e.product.pid)},className:"minus minus-btn"}),r.a.createElement("input",{type:"text",name:"quantity",disabled:!0,value:t,className:"input-text qty text"}),r.a.createElement("input",{type:"button",value:"+",onClick:function(){var a={pid:e.product.pid,quantity:t+1};e.setQuantity(a)},className:"plus plus-btn"})),r.a.createElement("div",{className:"cart-item-price"},"\u20b9",a," ",1===e.product.custmz&&e.product.extras.length>0&&r.a.createElement("div",{style:{marginLeft:"10px",fontSize:"12px",color:"grey"}}," ","+ \u20b9",n))))))}));var I=Object(l.b)((function(e){return{state:e.cart}}),(function(e){return{setQuantity:function(t){return e(g.A(t))},setCheckoutData:function(t){return e(g.q(t))}}}))(Object(c.g)((function(e){var t=Object(c.f)(),a={totalPrice:0,subTotal:0,deliveryCharge:0,savings:0},l=Object(n.useState)(a),i=Object(m.a)(l,2),o=i[0],u=i[1];Object(n.useEffect)((function(){var t=0,n=0;e.state.cartItems.map((function(e){return t+=(parseInt(e.itemPrice)+parseInt(e.extraPrice))*e.quantity,n+=e.sprice*e.quantity,t}));var r=0;return(t>500||0===t)&&(r=0),u(Object(w.a)(Object(w.a)({},o),{},{subTotal:t,savings:n-t,totalPrice:t+r,deliveryCharge:r})),function(){var c=Object(w.a)(Object(w.a)({},o),{},{subTotal:t,savings:n-t,totalPrice:t+r,deliveryCharge:r});e.setCheckoutData(c),u(a)}}),[e.state.cartItems].concat(Object(C.a)(e.state.cartItems.map((function(e){return e.quantity})))));var d=r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"mr-3 ml-3 pt-5 rounded"},r.a.createElement("div",{className:""},e.state.cartItems.map((function(e){return r.a.createElement(q,{product:e})})))),r.a.createElement("div",{className:"mr-3 ml-3 rounded"},r.a.createElement("div",{className:"cart-total-dil saving-total "},r.a.createElement("h4",null,"Total Saving"),r.a.createElement("span",null,"\u20b9",o.savings)),r.a.createElement("div",{className:"main-total-cart"},r.a.createElement("h2",null,"Total"),r.a.createElement("span",null,"\u20b9",o.totalPrice)),r.a.createElement("div",{className:"checkout-cart"},r.a.createElement(S.b,{to:"/checkout",className:"cart-checkout-btn hover-btn"},"Checkout")))),f=r.a.createElement("div",{className:"mar-15 p-5"},r.a.createElement(b.a,{className:"mt-5",src:T.a,fluid:!0}),r.a.createElement("p",{style:{color:"#2f4f4f",margin:"10%",paddingTop:"10%",textAlign:"center",fontSize:"20px"}}," ","No Items in Cart"," "));return r.a.createElement("div",null,r.a.createElement(s.a,{heading:"Cart",back:function(){return t.goBack()}}),e.state.cartItems.length>0?d:f)}))),B=a(261),R=a(3),K=a(5),D=a(132),F=a.n(D),L=a(134),Q=a(151),W=a(224),H=r.a.createContext(null),_=r.a.forwardRef((function(e,t){var a=e.bsPrefix,n=e.className,c=e.variant,l=e.as,i=void 0===l?"img":l,s=Object(K.a)(e,["bsPrefix","className","variant","as"]),o=Object(L.b)(a,"card-img");return r.a.createElement(i,Object(R.a)({ref:t,className:F()(c?o+"-"+c:o,n)},s))}));_.displayName="CardImg",_.defaultProps={variant:null};var M=_,G=Object(W.a)("h5"),J=Object(W.a)("h6"),X=Object(Q.a)("card-body"),Y=r.a.forwardRef((function(e,t){var a=e.bsPrefix,c=e.className,l=e.bg,i=e.text,s=e.border,o=e.body,u=e.children,d=e.as,m=void 0===d?"div":d,f=Object(K.a)(e,["bsPrefix","className","bg","text","border","body","children","as"]),p=Object(L.b)(a,"card"),g=Object(n.useMemo)((function(){return{cardHeaderBsPrefix:p+"-header"}}),[p]);return r.a.createElement(H.Provider,{value:g},r.a.createElement(m,Object(R.a)({ref:t},f,{className:F()(c,p,l&&"bg-"+l,i&&"text-"+i,s&&"border-"+s)}),o?r.a.createElement(X,null,u):u))}));Y.displayName="Card",Y.defaultProps={body:!1},Y.Img=M,Y.Title=Object(Q.a)("card-title",{Component:G}),Y.Subtitle=Object(Q.a)("card-subtitle",{Component:J}),Y.Body=X,Y.Link=Object(Q.a)("card-link",{Component:"a"}),Y.Text=Object(Q.a)("card-text",{Component:"p"}),Y.Header=Object(Q.a)("card-header"),Y.Footer=Object(Q.a)("card-footer"),Y.ImgOverlay=Object(Q.a)("card-img-overlay");var U=Y,V=Object(c.g)((function(e){var t="Lorem ipsum dolor sit amet, consectetur adipiscing elit.Nullam semper faucibus erat a efficitur. Praesent vulputate\n  mauris eget augue semper, at eleifend enim aliquam. Vivamus\n  suscipit lacinia neque eget suscipit. Morbi vitae nisl ac\n  justo placerat vulputate ac quis lectus. Vestibulum\n  pellentesque, orci eu ultrices molestie, nisi libero\n  hendrerit eros, vel interdum augue tortor vel urna. Nullam\n  enim dolor, pulvinar in metus vitae, tincidunt dignissim\n  neque.",a=Object(c.f)(),n=[{id:"one",heading:"Registration",desc:t},{id:"two",heading:"Account Related",desc:t},{id:"three",heading:"Payment",desc:t},{id:"four",heading:"Delivery Related",desc:t},{id:"five",heading:"Order Related",desc:t},{id:"six",heading:"Return & Refund",desc:t}];return r.a.createElement("div",{className:"container"},r.a.createElement(s.a,{heading:"FAQ",back:function(){return a.goBack()}}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-lg-12 col-md-12"},r.a.createElement("div",{className:"default-title mt-4"},r.a.createElement("h2",null,"Frequently Asked Questions")),r.a.createElement(v.a,{className:"panel-group accordion pt-1 mb-5",defaultActiveKey:"0"},n.map((function(e){return r.a.createElement("div",{style:{marginBottom:"10px"}},r.a.createElement(v.a.Toggle,{as:U.Header,eventKey:e.id},e.heading),r.a.createElement(v.a.Collapse,{eventKey:e.id},r.a.createElement("div",{className:"panel-body"},r.a.createElement("p",null,e.desc))))}))))))}));t.default=Object(l.b)((function(e){return{config:e.config}}))((function(e){var t=Object(c.f)();return Object(n.useEffect)((function(){e.config.isAuth||t.push("/login")}),[]),r.a.createElement("div",null,r.a.createElement("div",{style:{marginTop:"12vh"}},r.a.createElement("div",{className:"dashboard-right"},r.a.createElement(c.c,null,r.a.createElement(c.a,{path:"/dashboard/chat",component:function(){return window.location.href="https://tawk.to/chat/5f33eb1a4c7806354da5cef8/default",null}}),r.a.createElement(c.a,{path:"/dashboard/orders",component:k}),r.a.createElement(c.a,{path:"/dashboard/cart",component:I}),r.a.createElement(c.a,{path:"/dashboard/address",component:B.default}),r.a.createElement(c.a,{path:"/dashboard/faq",component:V}),r.a.createElement(c.a,{path:"/dashboard",exact:!0,component:O})))))}))}}]);
//# sourceMappingURL=11.73645a6b.chunk.js.map