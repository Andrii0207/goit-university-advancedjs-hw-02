import"./assets/modulepreload-polyfill-ec808ebb.js";/* empty css                      */const a={form:document.querySelector(".form"),button:document.querySelector("button")};a.form.addEventListener("submit",m);const t={};let r=0;function m(n){n.preventDefault();const e=n.currentTarget.elements;t[e.delay.name]=e.delay.value,t[e.step.name]=e.step.value,t[e.amount.name]=e.amount.value,console.log(t);const s=t.delay,l=Number(t.amount);console.log(l);const o=setInterval(()=>{if(console.log("START"),r+=1,console.log(r),u(),r===l){clearInterval(o),console.log("THAT ALL");return}console.log("INVISIBLE CONSOLE")},s)}function u(n,e){const s=Math.random()>.3;new Promise((o,c)=>{s?o("✅ Все хорошо, лови промис"):c("❌ Все плохо, ничего не получится")}).then(o=>console.log(o)).catch(o=>console.log(o))}
//# sourceMappingURL=commonHelpers3.js.map
