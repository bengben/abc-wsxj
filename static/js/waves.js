!function(q){function h(a){return null!==a&&a===a.window}function k(a){return h(a)?a:9===a.nodeType&&a.defaultView}function b(s){var d,c,n={top:0,left:0},r=s&&s.ownerDocument;return d=r.documentElement,"undefined"!=typeof s.getBoundingClientRect&&(n=s.getBoundingClientRect()),c=k(r),{top:n.top+c.pageYOffset-d.clientTop,left:n.left+c.pageXOffset-d.clientLeft}}function j(d){var a="";for(var c in d){d.hasOwnProperty(c)&&(a+=c+":"+d[c]+";")}return a}function l(d){if(g.allowEvent(d)===!1){return null}for(var a=null,c=d.target||d.srcElement;null!==c.parentElement;){if(!(c instanceof SVGElement||-1===c.className.indexOf("waves-effect"))){a=c;break}if(c.classList.contains("waves-effect")){a=c;break}c=c.parentElement}return a}function m(a){var c=l(a);null!==c&&(f.show(a,c),"ontouchstart" in q&&(c.addEventListener("touchend",f.hide,!1),c.addEventListener("touchcancel",f.hide,!1)),c.addEventListener("mouseup",f.hide,!1),c.addEventListener("mouseleave",f.hide,!1))}var p=p||{},v=document.querySelectorAll.bind(document),f={duration:750,show:function(A,c){if(2===A.button){return !1}var w=c||this,x=document.createElement("div");x.className="waves-ripple",w.appendChild(x);var y=b(w),z=A.pageY-y.top,B=A.pageX-y.left,a="scale("+w.clientWidth/100*10+")";"touches" in A&&(z=A.touches[0].pageY-y.top,B=A.touches[0].pageX-y.left),x.setAttribute("data-hold",Date.now()),x.setAttribute("data-scale",a),x.setAttribute("data-x",B),x.setAttribute("data-y",z);var i={top:z+"px",left:B+"px"};x.className=x.className+" waves-notransition",x.setAttribute("style",j(i)),x.className=x.className.replace("waves-notransition",""),i["-webkit-transform"]=a,i["-moz-transform"]=a,i["-ms-transform"]=a,i["-o-transform"]=a,i.transform=a,i.opacity="1",i["-webkit-transition-duration"]=f.duration+"ms",i["-moz-transition-duration"]=f.duration+"ms",i["-o-transition-duration"]=f.duration+"ms",i["transition-duration"]=f.duration+"ms",i["-webkit-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",i["-moz-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",i["-o-transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",i["transition-timing-function"]="cubic-bezier(0.250, 0.460, 0.450, 0.940)",x.setAttribute("style",j(i))},hide:function(A){g.touchup(A);var d=this,w=(1.4*d.clientWidth,null),c=d.getElementsByClassName("waves-ripple");if(!(c.length>0)){return !1}w=c[c.length-1];var x=w.getAttribute("data-x"),y=w.getAttribute("data-y"),z=w.getAttribute("data-scale"),B=Date.now()-Number(w.getAttribute("data-hold")),i=350-B;0>i&&(i=0),setTimeout(function(){var a={top:y+"px",left:x+"px",opacity:"0","-webkit-transition-duration":f.duration+"ms","-moz-transition-duration":f.duration+"ms","-o-transition-duration":f.duration+"ms","transition-duration":f.duration+"ms","-webkit-transform":z,"-moz-transform":z,"-ms-transform":z,"-o-transform":z,transform:z};w.setAttribute("style",j(a)),setTimeout(function(){try{d.removeChild(w)}catch(e){return !1}},f.duration)},i)},wrapInput:function(w){for(var d=0;d<w.length;d++){var s=w[d];if("input"===s.tagName.toLowerCase()){var c=s.parentNode;if("i"===c.tagName.toLowerCase()&&-1!==c.className.indexOf("waves-effect")){continue}var r=document.createElement("i");r.className=s.className+" waves-input-wrapper";var u=s.getAttribute("style");u||(u=""),r.setAttribute("style",u),s.className="waves-button-input",s.removeAttribute("style"),c.replaceChild(r,s),r.appendChild(s)}}}},g={touches:0,allowEvent:function(c){var a=!0;return"touchstart"===c.type?g.touches+=1:"touchend"===c.type||"touchcancel"===c.type?setTimeout(function(){g.touches>0&&(g.touches-=1)},500):"mousedown"===c.type&&g.touches>0&&(a=!1),a},touchup:function(a){g.allowEvent(a)}};p.displayEffect=function(a){a=a||{},"duration" in a&&(f.duration=a.duration),f.wrapInput(v(".waves-effect")),"ontouchstart" in q&&document.body.addEventListener("touchstart",m,!1),document.body.addEventListener("mousedown",m,!1)},p.attach=function(a){"input"===a.tagName.toLowerCase()&&(f.wrapInput([a]),a=a.parentElement),"ontouchstart" in q&&a.addEventListener("touchstart",m,!1),a.addEventListener("mousedown",m,!1)},q.Waves=p,document.addEventListener("DOMContentLoaded",function(){p.displayEffect()},!1)}(window);