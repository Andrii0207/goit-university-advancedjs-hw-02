import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */function r(){return`#${Math.floor(Math.random()*16777215).toString(16).padStart(6,0)}`}const t={start:document.querySelector("button[data-start]"),stop:document.querySelector("button[data-stop]"),body:document.querySelector("body")};t.start.addEventListener("click",o);t.stop.addEventListener("click",a);t.stop.setAttribute("disabled","true");let e=null;function o(){e=setInterval(()=>t.body.style.backgroundColor=`${r()}`,1e3),t.start.setAttribute("disabled","true"),t.stop.removeAttribute("disabled")}function a(){clearInterval(e),t.start.removeAttribute("disabled"),t.stop.setAttribute("disabled","true")}
//# sourceMappingURL=commonHelpers.js.map
