(function(){function e(e){return e}`${{chainId:4663,rpcUrl:`https://rpc.mainnet.chain.robinhood.com/`,token:`0x63EcF3a907049bD6A5cf25a90842c9a7c66c4Ef2`,minBalance:`1000000000000000000000000`,decimals:18,symbol:`CT`,name:`Robinhood Chain`,explorerUrl:`https://robinhoodchain.blockscout.com`}.token}`;function t(e){return e.trim().replace(/^#+/,``).toLowerCase().replace(/\s+/g,`-`).replace(/^[-_.]+|[-_.]+$/g,``)}function n(e){let n=[];for(let r of e.split(/[,\n]+|\s+(?=#)/)){let e=t(r);if(!(e===``||n.includes(e))&&(n.push(e),n.length>=24))break}return n}async function r(e,t){let n={ct:1,method:e,params:t},r=await chrome.runtime.sendMessage(n);if(!r)throw Error(`no response for "${e}" (is the background alive?)`);if(!r.ok)throw Error(r.error);return r.result}function i(e,t=Date.now()){let n=Math.max(0,Math.round((t-e)/1e3));if(n<60)return`${n}s`;let r=Math.round(n/60);if(r<60)return`${r}m`;let i=Math.round(r/60);return i<24?`${i}h`:`${Math.round(i/24)}d`}var a=`TwitterChirp, -apple-system, "system-ui", "Segoe UI", Roboto, Helvetica, Arial, sans-serif`,o=`74 222 128`,s=`21 128 61`,c=`248 113 113`,l=`185 28 28`;function u(){let e=d();return{accent:e?o:s,danger:e?c:l,surface:e?`#16181c`:`#ffffff`,sunken:e?`#0b0d10`:`#f7f9f9`,text:e?`#e7e9ea`:`#0f1419`,muted:e?`#71767b`:`#536471`,border:e?`#2f3336`:`#cfd9de`,fontFamily:f()}}function d(){for(let e of[document.body,document.documentElement]){let t=getComputedStyle(e).backgroundColor;if(/rgba\([^)]*,\s*0\s*\)/.test(t))continue;let n=/(\d+)[,\s]+(\d+)[,\s]+(\d+)/.exec(t);if(!n)continue;let[r,i,a]=n.slice(1).map(Number);return .299*r+.587*i+.114*a<128}return!0}function f(){let e=document.querySelector(`[data-testid="tweetText"], h1, span`),t=e?getComputedStyle(e).fontFamily:``;return/times|serif/i.test(t)||t===``?a:t}var p=`data-ct-note`,m=`data-ct-note-key`,h=/^\/([A-Za-z0-9_]{1,15})$/,g=/^\/[A-Za-z0-9_]{1,15}\/status\/(\d+)/,_=new Set([`home`,`explore`,`notifications`,`messages`,`settings`,`compose`,`search`,`i`,`about`,`tos`,`privacy`]),v=e({matches:[`https://x.com/*`,`https://twitter.com/*`],runAt:`document_idle`,main(){S(),new MutationObserver(()=>E()).observe(document.body,{childList:!0,subtree:!0}),E()}}),y={profiles:{},tweets:{}},b=0,x=1e4;async function S(){try{y=await r(`notes/index`,void 0),b=Date.now()}catch{}}function C(){for(let e of document.querySelectorAll(`[${m}]`))L(e,e.getAttribute(m)??``)}function w(e){let[t,n]=e.split(`:`);return n===void 0||n===``?0:(t===`tweet`?y.tweets[n]:y.profiles[n])??0}var T=0;function E(){T===0&&(T=window.setTimeout(()=>{T=0,(async()=>{try{Date.now()-b>x&&(await S(),C());let e=new Set;D(e),O(e),k(e)}catch{}})()},250))}function D(e){let t=h.exec(location.pathname)?.[1];if(!(!t||_.has(t.toLowerCase())))for(let n of document.querySelectorAll(`[data-testid$="-follow"], [data-testid$="-unfollow"]`)){if(n.closest(`[data-testid="UserCell"], article, [data-testid="HoverCard"]`))continue;let r=P(n);for(;r.nextElementSibling?.hasAttribute(`data-ct-fren`);)r=r.nextElementSibling;let i=/^(\d+)-(un)?follow$/.exec(n.getAttribute(`data-testid`)??``)?.[1],a=`profile:${i??t.toLowerCase()}`,o=r.nextElementSibling;if(o?.getAttribute(m)===a){e.add(o);continue}let s=I(a,F(n),()=>({kind:`profile`,handle:t,...i===void 0?{}:{xid:i},...N()===void 0?{}:{name:N()}}));r.insertAdjacentElement(`afterend`,s),e.add(s)}}function O(e){for(let t of document.querySelectorAll(`article[data-testid="tweet"]`)){let n=A(t);if(!n)continue;let r=j(t);if(r===void 0)continue;let i=`tweet:${r}`,a=n.querySelector(`[${p}]`);if(a?.getAttribute(m)===i){e.add(a);continue}let o=I(i,{height:``,fontSize:`13px`,fontFamily:``},()=>{let e=M(t),n={kind:`tweet`,tweetId:r,scraped:e};return e.authorHandle!==void 0&&(n.handle=e.authorHandle),e.authorName!==void 0&&(n.name=e.authorName),n});o.style.marginLeft=`4px`,n.append(o),e.add(o)}}function k(e){for(let t of document.querySelectorAll(`[${p}]`))e.has(t)||t.remove();R!==void 0&&!R.anchor.isConnected&&z()}function A(e){let t=e.querySelector(`[data-testid="reply"]`)?.closest(`[role="group"]`);if(t instanceof HTMLElement)return t.closest(`article`)===e?t:void 0}function j(e){let t=e.querySelector(`time`)?.closest(`a`),n=t?g.exec(new URL(t.href).pathname)?.[1]:void 0;if(n!==void 0)return n;let r=g.exec(location.pathname)?.[1];if(r!==void 0&&e===document.querySelector(`article[data-testid="tweet"]`))return r}function M(e){let t={text:e.querySelector(`[data-testid="tweetText"]`)?.innerText??``},n=e.querySelector(`[data-testid="User-Name"]`);for(let e of n?.querySelectorAll(`a[href^="/"]`)??[]){let n=h.exec(new URL(e.href).pathname)?.[1];if(n&&!_.has(n.toLowerCase())){t.authorHandle=n;break}}let r=n?.innerText.split(`
`)[0]?.trim();r!==void 0&&r!==``&&(t.authorName=r);let i=e.querySelector(`[data-testid="Tweet-User-Avatar"] img`);i?.src&&(t.authorAvatar=i.src);let a=e.querySelector(`time[datetime]`)?.dateTime,o=a?Date.parse(a):NaN;Number.isFinite(o)&&(t.createdAt=o);let s=[...e.querySelectorAll(`[data-testid="tweetPhoto"] img`)].map(e=>e.src).filter(e=>e!==``);return s.length>0&&(t.photos=s),t}function N(){let e=document.querySelector(`[data-testid="UserName"]`)?.innerText.split(`
`)[0]?.trim();return e!==void 0&&e!==``?e:void 0}function P(e){let t=e;for(let e=0;e<4;e++){let e=t.parentElement;if(!e)break;let n=getComputedStyle(e);if(n.display!==`flex`&&n.display!==`inline-flex`)break;if(!n.flexDirection.startsWith(`column`))return t;t=e}return t}function F(e){let t=e.querySelector(`span`),n=getComputedStyle(t||e),r=Math.round(e.getBoundingClientRect().height);return{height:r>0?`${r}px`:`32px`,fontSize:n.fontSize||`15px`,fontFamily:/times|serif/i.test(n.fontFamily)?``:n.fontFamily}}function I(e,t,n){let r=document.createElement(`button`);return r.setAttribute(p,``),r.setAttribute(m,e),r.type=`button`,Object.assign(r.style,{display:`inline-flex`,alignItems:`center`,justifyContent:`center`,boxSizing:`border-box`,padding:`0 9px`,...t.height===``?{}:{height:t.height,marginLeft:`8px`},minWidth:`34px`,borderRadius:`9999px`,fontFamily:t.fontFamily||u().fontFamily,fontSize:t.fontSize,fontWeight:`700`,lineHeight:`1`,letterSpacing:`normal`,whiteSpace:`nowrap`,cursor:`pointer`,flex:`0 0 auto`,alignSelf:`center`,transition:`color 0.12s, border-color 0.12s, background-color 0.12s`}),L(r,e),r.addEventListener(`click`,e=>{e.preventDefault(),e.stopPropagation(),B(n(),r)}),r}function L(e,t){let n=w(t),r=u(),i=t.startsWith(`profile:`);e.textContent=n>0?`✎${n}`:i?`+note`:`✎`,e.title=n>0?`${n} ${n===1?`note`:`notes`} here — read them, or add another`:i?`Write a note about this account`:`Write a note on this post — ct keeps a copy of it`,e.style.border=`1px solid rgb(${r.accent} / ${n>0?`55%`:`35%`})`,e.style.background=n>0?`rgb(${r.accent} / 16%)`:`transparent`,e.style.color=`rgb(${r.accent})`}var R;function z(){R?.dispose(),R=void 0}function B(e,t){z();let i=u(),a=document.createElement(`div`);a.setAttribute(`data-ct-note-composer`,``),Object.assign(a.style,{position:`fixed`,zIndex:`2147483646`,inset:`0 auto auto 0`});let o=a.attachShadow({mode:`open`});o.append(W(i));let s=document.createElement(`div`);s.className=`card`,o.append(s),document.body.append(a);let c=V(`span`,`title`);c.textContent=e.kind===`tweet`?`note on this post`:`note on @${e.handle??``}`;let l=V(`button`,`close`);l.textContent=`×`,l.title=`Close`;let d=V(`header`);d.append(c,l);let f=V(`div`,`held`),p=document.createElement(`textarea`);p.className=`text`,p.rows=4,p.placeholder=e.kind===`tweet`?`Why is this worth keeping?`:`What should you remember about @${e.handle??`them`}?`;let m=document.createElement(`input`);m.className=`tags-input`,m.type=`text`,m.placeholder=`tags, comma separated`;let h=V(`span`,`hint`);h.textContent=`⌘↵ saves`;let g=V(`button`,`save`);g.textContent=`note it`;let _=V(`footer`);_.append(h,g);let v=V(`p`,`error`);v.hidden=!0,s.append(d,f,p,m,_,v),U(a,t);function y(){document.removeEventListener(`keydown`,x,!0),document.removeEventListener(`mousedown`,w,!0),window.removeEventListener(`scroll`,b,!0),window.removeEventListener(`resize`,b),a.remove()}function b(){t.isConnected?U(a,t):z()}function x(e){e.key===`Escape`&&(e.stopPropagation(),z())}function w(e){e.composedPath().includes(a)||z()}R={host:a,anchor:t,dispose:y},document.addEventListener(`keydown`,x,!0),document.addEventListener(`mousedown`,w,!0),window.addEventListener(`scroll`,b,!0),window.addEventListener(`resize`,b),l.addEventListener(`click`,()=>z()),p.focus(),H(f,e);async function T(){let t=p.value.trim();if(t!==``){g.disabled=!0,g.textContent=`…`;try{let i={kind:e.kind,text:t,tags:n(m.value)};e.xid!==void 0&&(i.xid=e.xid),e.handle!==void 0&&(i.handle=e.handle),e.name!==void 0&&(i.name=e.name),e.tweetId!==void 0&&(i.tweetId=e.tweetId),e.scraped!==void 0&&(i.scraped=e.scraped),await r(`notes/save`,i),await S(),C(),z()}catch(e){v.textContent=e instanceof Error?e.message:String(e),v.hidden=!1,g.disabled=!1,g.textContent=`note it`}}}g.addEventListener(`click`,()=>void T()),s.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.metaKey||e.ctrlKey)&&(e.preventDefault(),T())}),m.addEventListener(`keydown`,e=>{e.key===`Enter`&&(e.preventDefault(),T())})}function V(e,t){let n=document.createElement(e);return t!==void 0&&(n.className=t),n}async function H(e,t){let n=[];try{n=t.kind===`tweet`?await r(`notes/list`,{tweetId:t.tweetId??``}):t.xid===void 0?[]:await r(`notes/list`,{xid:t.xid})}catch{return}if(!(n.length===0||!e.isConnected)){for(let r of n.slice(0,6)){let n=document.createElement(`div`);n.className=`note`;let a=document.createElement(`span`);a.className=`when`,a.textContent=`${i(r.createdAt)} ago${r.tweetId!==void 0&&t.kind!==`tweet`?` · on a post`:``}`;let o=document.createElement(`div`);if(o.className=`body`,o.textContent=r.text,n.append(a,o),r.tags.length>0){let e=document.createElement(`span`);e.className=`tags`,e.textContent=r.tags.map(e=>`#${e}`).join(` `),n.append(e)}e.append(n)}if(n.length>6){let t=document.createElement(`div`);t.className=`when`,t.textContent=`+${n.length-6} more in the ct panel`,e.append(t)}}}function U(e,t){let n=t.getBoundingClientRect(),r=Math.min(Math.max(8,n.left-320/2),window.innerWidth-320-8),i=n.bottom+6,a=window.innerHeight-i>300?i:Math.max(8,n.top-6-320);e.style.left=`${Math.round(r)}px`,e.style.top=`${Math.round(a)}px`}function W(e){let t=document.createElement(`style`);return t.textContent=`
    :host { all: initial; }
    * { box-sizing: border-box; }
    .card {
      width: 320px;
      max-height: 70vh;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 7px;
      padding: 11px;
      border: 1px solid rgb(${e.accent} / 45%);
      border-radius: 12px;
      background: ${e.surface};
      color: ${e.text};
      font: 400 13px/1.45 ${e.fontFamily};
      box-shadow: 0 10px 30px rgb(0 0 0 / 35%);
    }
    header { display: flex; align-items: center; gap: 8px; }
    .title {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgb(${e.accent});
    }
    .close {
      border: none;
      background: none;
      color: ${e.muted};
      font-size: 17px;
      line-height: 1;
      cursor: pointer;
      padding: 0 2px;
    }
    .close:hover { color: ${e.text}; }
    .held { display: flex; flex-direction: column; gap: 6px; }
    .held:empty { display: none; }
    .note {
      padding: 6px 8px;
      border-left: 2px solid rgb(${e.accent} / 55%);
      border-radius: 0 6px 6px 0;
      background: ${e.sunken};
      font-size: 12px;
    }
    .when { display: block; font-size: 10px; color: ${e.muted}; }
    .body { white-space: pre-wrap; overflow-wrap: anywhere; }
    .tags { display: block; margin-top: 3px; font-size: 10px; color: rgb(${e.accent}); }
    textarea, input {
      width: 100%;
      padding: 7px 8px;
      border: 1px solid ${e.border};
      border-radius: 8px;
      background: ${e.sunken};
      color: ${e.text};
      font: inherit;
      resize: vertical;
    }
    textarea { min-height: 76px; }
    input { font-size: 12px; }
    textarea:focus, input:focus {
      outline: none;
      border-color: rgb(${e.accent});
    }
    footer { display: flex; align-items: center; gap: 8px; }
    .hint { flex: 1; font-size: 10px; color: ${e.muted}; }
    .save {
      padding: 6px 14px;
      border: 1px solid rgb(${e.accent} / 55%);
      border-radius: 9999px;
      background: rgb(${e.accent} / 16%);
      color: rgb(${e.accent});
      font: 700 12px/1 ${e.fontFamily};
      cursor: pointer;
    }
    .save:hover:not(:disabled) { background: rgb(${e.accent} / 26%); }
    .save:disabled { opacity: 0.5; cursor: default; }
    .error { margin: 0; font-size: 11px; color: rgb(${e.danger}); }
  `,t}var G={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)},K=globalThis.browser?.runtime?.id?globalThis.browser:globalThis.chrome,q=class e extends Event{static EVENT_NAME=J(`wxt:locationchange`);constructor(t,n){super(e.EVENT_NAME,{}),this.newUrl=t,this.oldUrl=n}};function J(e){return`${K?.runtime?.id}:x-notes:${e}`}var Y=typeof globalThis.navigation?.addEventListener==`function`;function X(e){let t,n=!1;return{run(){n||(n=!0,t=new URL(location.href),Y?globalThis.navigation.addEventListener(`navigate`,e=>{let n=new URL(e.destination.url);n.href!==t.href&&(window.dispatchEvent(new q(n,t)),t=n)},{signal:e.signal}):e.setInterval(()=>{let e=new URL(location.href);e.href!==t.href&&(window.dispatchEvent(new q(e,t)),t=e)},1e3))}}}var Z=class e{static SCRIPT_STARTED_MESSAGE_TYPE=J(`wxt:content-script-started`);id;abortController;locationWatcher=X(this);constructor(e,t){this.contentScriptName=e,this.options=t,this.id=Math.random().toString(36).slice(2),this.abortController=new AbortController,this.stopOldScripts(),this.listenForNewerScripts()}get signal(){return this.abortController.signal}abort(e){return this.abortController.abort(e)}get isInvalid(){return K.runtime?.id??this.notifyInvalidated(),this.signal.aborted}get isValid(){return!this.isInvalid}onInvalidated(e){return this.signal.addEventListener(`abort`,e),()=>this.signal.removeEventListener(`abort`,e)}block(){return new Promise(()=>{})}setInterval(e,t){let n=setInterval(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearInterval(n)),n}setTimeout(e,t){let n=setTimeout(()=>{this.isValid&&e()},t);return this.onInvalidated(()=>clearTimeout(n)),n}requestAnimationFrame(e){let t=requestAnimationFrame((...t)=>{this.isValid&&e(...t)});return this.onInvalidated(()=>cancelAnimationFrame(t)),t}requestIdleCallback(e,t){let n=requestIdleCallback((...t)=>{this.signal.aborted||e(...t)},t);return this.onInvalidated(()=>cancelIdleCallback(n)),n}addEventListener(e,t,n,r){t===`wxt:locationchange`&&this.isValid&&this.locationWatcher.run(),e.addEventListener?.(t.startsWith(`wxt:`)?J(t):t,n,{...r,signal:this.signal})}notifyInvalidated(){this.abort(`Content script context invalidated`),G.debug(`Content script "${this.contentScriptName}" context invalidated`)}stopOldScripts(){document.dispatchEvent(new CustomEvent(e.SCRIPT_STARTED_MESSAGE_TYPE,{detail:{contentScriptName:this.contentScriptName,messageId:this.id}})),this.options?.noScriptStartedPostMessage||window.postMessage({type:e.SCRIPT_STARTED_MESSAGE_TYPE,contentScriptName:this.contentScriptName,messageId:this.id},`*`)}verifyScriptStartedEvent(e){let t=e.detail?.contentScriptName===this.contentScriptName,n=e.detail?.messageId===this.id;return t&&!n}listenForNewerScripts(){let t=e=>{!(e instanceof CustomEvent)||!this.verifyScriptStartedEvent(e)||this.notifyInvalidated()};document.addEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t),this.onInvalidated(()=>document.removeEventListener(e.SCRIPT_STARTED_MESSAGE_TYPE,t))}},Q={debug:(...e)=>([...e],void 0),log:(...e)=>([...e],void 0),warn:(...e)=>([...e],void 0),error:(...e)=>([...e],void 0)};return(async()=>{try{let{main:e,...t}=v;return await e(new Z(`x-notes`,t))}catch(e){throw Q.error(`The content script "x-notes" crashed on startup!`,e),e}})()})();