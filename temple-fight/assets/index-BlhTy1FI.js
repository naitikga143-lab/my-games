(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=1e3,t=1001,n=1002,r=1003,i=1004,a=1005,o=1006,c=1007,l=1008,u=1009,d=1010,f=1011,p=1012,m=1013,h=1014,g=1015,_=1016,v=1017,y=1018,b=1020,x=35902,S=35899,C=1021,w=1022,T=1023,E=1026,D=1027,O=1028,k=1029,A=1030,j=1031,M=1033,N=33776,P=33777,F=33778,I=33779,L=35840,ee=35841,te=35842,ne=35843,re=36196,ie=37492,ae=37496,oe=37488,R=37489,se=37490,ce=37491,le=37808,ue=37809,de=37810,fe=37811,pe=37812,me=37813,he=37814,ge=37815,_e=37816,ve=37817,ye=37818,be=37819,xe=37820,Se=37821,Ce=36492,we=36494,Te=36495,Ee=36283,De=36284,Oe=36285,ke=36286,Ae=2300,z=2301,je=2302,Me=2303,Ne=2400,B=2401,Pe=2402,V=3200,Fe=`srgb`,H=`srgb-linear`,Ie=`linear`,Le=`srgb`,Re=7680,ze=35044,Be=35048,Ve=2e3;function He(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ue(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function We(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Ge(){let e=We(`canvas`);return e.style.display=`block`,e}var Ke={};function qe(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Je(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function U(...e){e=Je(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function W(...e){e=Je(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ye(...e){let t=e.join(` `);t in Ke||(Ke[t]=!0,U(...e))}function Xe(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Ze={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Qe=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},$e=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),et=1234567,tt=Math.PI/180,nt=180/Math.PI;function rt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return($e[e&255]+$e[e>>8&255]+$e[e>>16&255]+$e[e>>24&255]+`-`+$e[t&255]+$e[t>>8&255]+`-`+$e[t>>16&15|64]+$e[t>>24&255]+`-`+$e[n&63|128]+$e[n>>8&255]+`-`+$e[n>>16&255]+$e[n>>24&255]+$e[r&255]+$e[r>>8&255]+$e[r>>16&255]+$e[r>>24&255]).toLowerCase()}function G(e,t,n){return Math.max(t,Math.min(n,e))}function it(e,t){return(e%t+t)%t}function at(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function ot(e,t,n){return e===t?0:(n-e)/(t-e)}function st(e,t,n){return(1-n)*e+n*t}function ct(e,t,n,r){return st(e,t,1-Math.exp(-n*r))}function lt(e,t=1){return t-Math.abs(it(e,t*2)-t)}function ut(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function dt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function ft(e,t){return e+Math.floor(Math.random()*(t-e+1))}function pt(e,t){return e+Math.random()*(t-e)}function mt(e){return e*(.5-Math.random())}function ht(e){e!==void 0&&(et=e);let t=et+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function gt(e){return e*tt}function _t(e){return e*nt}function vt(e){return e>0&&Number.isInteger(e)&&2**Math.round(Math.log2(e))===e}function yt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function bt(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function xt(e,t,n,r,i){let a=Math.cos,o=Math.sin,c=a(n/2),l=o(n/2),u=a((t+r)/2),d=o((t+r)/2),f=a((t-r)/2),p=o((t-r)/2),m=a((r-t)/2),h=o((r-t)/2);switch(i){case`XYX`:e.set(c*d,l*f,l*p,c*u);break;case`YZY`:e.set(l*p,c*d,l*f,c*u);break;case`ZXZ`:e.set(l*f,l*p,c*d,c*u);break;case`XZX`:e.set(c*d,l*h,l*m,c*u);break;case`YXY`:e.set(l*m,c*d,l*h,c*u);break;case`ZYZ`:e.set(l*h,l*m,c*d,c*u);break;default:U(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function St(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Ct(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var wt={DEG2RAD:tt,RAD2DEG:nt,generateUUID:rt,clamp:G,euclideanModulo:it,mapLinear:at,inverseLerp:ot,lerp:st,damp:ct,pingpong:lt,smoothstep:ut,smootherstep:dt,randInt:ft,randFloat:pt,randFloatSpread:mt,seededRandom:ht,degToRad:gt,radToDeg:_t,isPowerOfTwo:vt,ceilPowerOfTwo:yt,floorPowerOfTwo:bt,setQuaternionFromProperEuler:xt,normalize:Ct,denormalize:St},K=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=G(this.x,e,t),this.y=G(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(G(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Tt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let c=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],f=i[a+0],p=i[a+1],m=i[a+2],h=i[a+3];if(d!==h||c!==f||l!==p||u!==m){let e=c*f+l*p+u*m+d*h;e<0&&(f=-f,p=-p,m=-m,h=-h,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o,d=d*t+h*o}else{c=c*t+f*o,l=l*t+p*o,u=u*t+m*o,d=d*t+h*o;let e=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=e,l*=e,u*=e,d*=e}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a],f=i[a+1],p=i[a+2],m=i[a+3];return e[t]=o*m+u*d+c*p-l*f,e[t+1]=c*m+u*f+l*d-o*p,e[t+2]=l*m+u*p+o*f-c*d,e[t+3]=u*m-o*d-c*f-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(r/2),d=o(i/2),f=c(n/2),p=c(r/2),m=c(i/2);switch(a){case`XYZ`:this._x=f*u*d+l*p*m,this._y=l*p*d-f*u*m,this._z=l*u*m+f*p*d,this._w=l*u*d-f*p*m;break;case`YXZ`:this._x=f*u*d+l*p*m,this._y=l*p*d-f*u*m,this._z=l*u*m-f*p*d,this._w=l*u*d+f*p*m;break;case`ZXY`:this._x=f*u*d-l*p*m,this._y=l*p*d+f*u*m,this._z=l*u*m+f*p*d,this._w=l*u*d-f*p*m;break;case`ZYX`:this._x=f*u*d-l*p*m,this._y=l*p*d+f*u*m,this._z=l*u*m-f*p*d,this._w=l*u*d+f*p*m;break;case`YZX`:this._x=f*u*d+l*p*m,this._y=l*p*d+f*u*m,this._z=l*u*m-f*p*d,this._w=l*u*d-f*p*m;break;case`XZY`:this._x=f*u*d-l*p*m,this._y=l*p*d-f*u*m,this._z=l*u*m+f*p*d,this._w=l*u*d+f*p*m;break;default:U(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){let e=.5/Math.sqrt(f+1);this._w=.25/e,this._x=(u-c)*e,this._y=(i-l)*e,this._z=(a-r)*e}else if(n>o&&n>d){let e=2*Math.sqrt(1+n-o-d);this._w=(u-c)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+l)/e}else if(o>d){let e=2*Math.sqrt(1+o-n-d);this._w=(i-l)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(c+u)/e}else{let e=2*Math.sqrt(1+d-n-o);this._w=(a-r)/e,this._x=(i+l)/e,this._y=(c+u)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(G(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-i*c,this._y=r*u+a*c+i*o-n*l,this._z=i*u+a*l+n*c-r*o,this._w=a*u-n*o-r*c-i*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let c=1-t;if(o<.9995){let e=Math.acos(o),l=Math.sin(e);c=Math.sin(c*e)/l,t=Math.sin(t*e)/l,this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+i*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+r*t,this._z=this._z*c+i*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},q=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Dt.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Dt.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*n),u=2*(o*t-i*r),d=2*(i*n-a*t);return this.x=t+c*l+a*d-o*u,this.y=n+c*u+o*l-i*d,this.z=r+c*d+i*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this.z=G(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=G(this.x,e,t),this.y=G(this.y,e,t),this.z=G(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,c=t.z;return this.x=r*c-i*o,this.y=i*a-n*c,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Et.copy(this).projectOnVector(e),this.sub(Et)}reflect(e){return this.sub(Et.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(G(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Et=new q,Dt=new Tt,J=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,c,l)}set(e,t,n,r,i,a,o,c,l){let u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=i,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],p=n[5],m=n[8],h=r[0],g=r[3],_=r[6],v=r[1],y=r[4],b=r[7],x=r[2],S=r[5],C=r[8];return i[0]=a*h+o*v+c*x,i[3]=a*g+o*y+c*S,i[6]=a*_+o*b+c*C,i[1]=l*h+u*v+d*x,i[4]=l*g+u*y+d*S,i[7]=l*_+u*b+d*C,i[2]=f*h+p*v+m*x,i[5]=f*g+p*y+m*S,i[8]=f*_+p*b+m*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*i*u+n*o*c+r*i*l-r*a*c}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*c-u*i,p=l*i-a*c,m=t*d+n*f+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let h=1/m;return e[0]=d*h,e[1]=(r*l-u*n)*h,e[2]=(o*n-r*a)*h,e[3]=f*h,e[4]=(u*t-r*c)*h,e[5]=(r*i-o*t)*h,e[6]=p*h,e[7]=(n*c-l*t)*h,e[8]=(a*t-n*i)*h,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let c=Math.cos(i),l=Math.sin(i);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return Ye(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Ot.makeScale(e,t)),this}rotate(e){return Ye(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Ot.makeRotation(-e)),this}translate(e,t){return Ye(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Ot.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ot=new J,kt=new J().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),At=new J().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jt(){let e={enabled:!0,workingColorSpace:H,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Nt(e.r),e.g=Nt(e.g),e.b=Nt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Pt(e.r),e.g=Pt(e.g),e.b=Pt(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Ie:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ye(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ye(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[H]:{primaries:t,whitePoint:r,transfer:Ie,toXYZ:kt,fromXYZ:At,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Fe},outputColorSpaceConfig:{drawingBufferColorSpace:Fe}},[Fe]:{primaries:t,whitePoint:r,transfer:Le,toXYZ:kt,fromXYZ:At,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Fe}}}),e}var Mt=jt();function Nt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Pt(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ft,It=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ft===void 0&&(Ft=We(`canvas`)),Ft.width=e.width,Ft.height=e.height;let t=Ft.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ft}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=We(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Nt(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Nt(t[e]/255)*255):t[e]=Nt(t[e]);return{data:t,width:e.width,height:e.height}}return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Lt=0,Rt=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Lt++}),this.uuid=rt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(zt(r[t].image)):e.push(zt(r[t]))}else e=zt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function zt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?It.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(U(`Texture: Unable to serialize Texture.`),{})}var Bt=0,Vt=new q,Ht=class r extends Qe{constructor(e=r.DEFAULT_IMAGE,n=r.DEFAULT_MAPPING,i=t,a=t,c=o,d=l,f=T,p=u,m=r.DEFAULT_ANISOTROPY,h=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bt++}),this.uuid=rt(),this.name=``,this.source=new Rt(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=c,this.minFilter=d,this.anisotropy=m,this.format=f,this.internalFormat=null,this.type=p,this.offset=new K(0,0),this.repeat=new K(1,1),this.center=new K(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new J,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Vt).x}get height(){return this.source.getSize(Vt).y}get depth(){return this.source.getSize(Vt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){U(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(r){if(this.mapping!==300)return r;if(r.applyMatrix3(this.matrix),r.x<0||r.x>1)switch(this.wrapS){case e:r.x-=Math.floor(r.x);break;case t:r.x=r.x<0?0:1;break;case n:Math.abs(Math.floor(r.x)%2)===1?r.x=Math.ceil(r.x)-r.x:r.x-=Math.floor(r.x)}if(r.y<0||r.y>1)switch(this.wrapT){case e:r.y-=Math.floor(r.y);break;case t:r.y=r.y<0?0:1;break;case n:Math.abs(Math.floor(r.y)%2)===1?r.y=Math.ceil(r.y)-r.y:r.y-=Math.floor(r.y)}return this.flipY&&(r.y=1-r.y),r}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ht.DEFAULT_IMAGE=null,Ht.DEFAULT_MAPPING=300,Ht.DEFAULT_ANISOTROPY=1;var Ut=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,c=e.elements,l=c[0],u=c[4],d=c[8],f=c[1],p=c[5],m=c[9],h=c[2],g=c[6],_=c[10];if(Math.abs(u-f)<a&&Math.abs(d-h)<a&&Math.abs(m-g)<a){if(Math.abs(u+f)<o&&Math.abs(d+h)<o&&Math.abs(m+g)<o&&Math.abs(l+p+_-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(l+1)/2,c=(p+1)/2,v=(_+1)/2,y=(u+f)/4,b=(d+h)/4,x=(m+g)/4;return e>c&&e>v?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=y/n,i=b/n):c>v?c<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(c),n=y/r,i=x/r):v<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(v),n=b/i,r=x/i),this.set(n,r,i,t),this}let v=Math.sqrt((g-m)*(g-m)+(d-h)*(d-h)+(f-u)*(f-u));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(d-h)/v,this.z=(f-u)/v,this.w=Math.acos((l+p+_-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=G(this.x,e.x,t.x),this.y=G(this.y,e.y,t.y),this.z=G(this.z,e.z,t.z),this.w=G(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=G(this.x,e,t),this.y=G(this.y,e,t),this.z=G(this.z,e,t),this.w=G(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(G(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Wt=class extends Qe{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:o,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ut(0,0,e,t),this.scissorTest=!1,this.viewport=new Ut(0,0,e,t),this.textures=[];let r=new Ht({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:o,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Rt(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Gt=class extends Wt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Kt=class extends Ht{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},qt=class extends Ht{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=r,this.minFilter=r,this.wrapR=t,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},Jt=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,c,l,u,d,f,p,m,h,g){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,c,l,u,d,f,p,m,h,g)}set(e,t,n,r,i,a,o,c,l,u,d,f,p,m,h,g){let _=this.elements;return _[0]=e,_[4]=t,_[8]=n,_[12]=r,_[1]=i,_[5]=a,_[9]=o,_[13]=c,_[2]=l,_[6]=u,_[10]=d,_[14]=f,_[3]=p,_[7]=m,_[11]=h,_[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Yt.setFromMatrixColumn(e,0).length(),i=1/Yt.setFromMatrixColumn(e,1).length(),a=1/Yt.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(r),l=Math.sin(r),u=Math.cos(i),d=Math.sin(i);if(e.order===`XYZ`){let e=a*u,n=a*d,r=o*u,i=o*d;t[0]=c*u,t[4]=-c*d,t[8]=l,t[1]=n+r*l,t[5]=e-i*l,t[9]=-o*c,t[2]=i-e*l,t[6]=r+n*l,t[10]=a*c}else if(e.order===`YXZ`){let e=c*u,n=c*d,r=l*u,i=l*d;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*c}else if(e.order===`ZXY`){let e=c*u,n=c*d,r=l*u,i=l*d;t[0]=e-i*o,t[4]=-a*d,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*u,t[9]=i-e*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order===`ZYX`){let e=a*u,n=a*d,r=o*u,i=o*d;t[0]=c*u,t[4]=r*l-n,t[8]=e*l+i,t[1]=c*d,t[5]=i*l+e,t[9]=n*l-r,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order===`YZX`){let e=a*c,n=a*l,r=o*c,i=o*l;t[0]=c*u,t[4]=i-e*d,t[8]=r*d+n,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=n*d+r,t[10]=e-i*d}else if(e.order===`XZY`){let e=a*c,n=a*l,r=o*c,i=o*l;t[0]=c*u,t[4]=-d,t[8]=l*u,t[1]=e*d+i,t[5]=a*u,t[9]=n*d-r,t[2]=r*d-n,t[6]=o*u,t[10]=i*d+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zt,e,Qt)}lookAt(e,t,n){let r=this.elements;return tn.subVectors(e,t),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),$t.crossVectors(n,tn),$t.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),$t.crossVectors(n,tn)),$t.normalize(),en.crossVectors(tn,$t),r[0]=$t.x,r[4]=en.x,r[8]=tn.x,r[1]=$t.y,r[5]=en.y,r[9]=tn.y,r[2]=$t.z,r[6]=en.z,r[10]=tn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],p=n[13],m=n[2],h=n[6],g=n[10],_=n[14],v=n[3],y=n[7],b=n[11],x=n[15],S=r[0],C=r[4],w=r[8],T=r[12],E=r[1],D=r[5],O=r[9],k=r[13],A=r[2],j=r[6],M=r[10],N=r[14],P=r[3],F=r[7],I=r[11],L=r[15];return i[0]=a*S+o*E+c*A+l*P,i[4]=a*C+o*D+c*j+l*F,i[8]=a*w+o*O+c*M+l*I,i[12]=a*T+o*k+c*N+l*L,i[1]=u*S+d*E+f*A+p*P,i[5]=u*C+d*D+f*j+p*F,i[9]=u*w+d*O+f*M+p*I,i[13]=u*T+d*k+f*N+p*L,i[2]=m*S+h*E+g*A+_*P,i[6]=m*C+h*D+g*j+_*F,i[10]=m*w+h*O+g*M+_*I,i[14]=m*T+h*k+g*N+_*L,i[3]=v*S+y*E+b*A+x*P,i[7]=v*C+y*D+b*j+x*F,i[11]=v*w+y*O+b*M+x*I,i[15]=v*T+y*k+b*N+x*L,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],d=e[6],f=e[10],p=e[14],m=e[3],h=e[7],g=e[11],_=e[15],v=c*p-l*f,y=o*p-l*d,b=o*f-c*d,x=a*p-l*u,S=a*f-c*u,C=a*d-o*u;return t*(h*v-g*y+_*b)-n*(m*v-g*x+_*S)+r*(m*y-h*x+_*C)-i*(m*b-h*S+g*C)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],c=e[2],l=e[6],u=e[10];return t*(a*u-o*l)-n*(i*u-o*c)+r*(i*l-a*c)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],d=e[9],f=e[10],p=e[11],m=e[12],h=e[13],g=e[14],_=e[15],v=t*o-n*a,y=t*c-r*a,b=t*l-i*a,x=n*c-r*o,S=n*l-i*o,C=r*l-i*c,w=u*h-d*m,T=u*g-f*m,E=u*_-p*m,D=d*g-f*h,O=d*_-p*h,k=f*_-p*g,A=v*k-y*O+b*D+x*E-S*T+C*w;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let j=1/A;return e[0]=(o*k-c*O+l*D)*j,e[1]=(r*O-n*k-i*D)*j,e[2]=(h*C-g*S+_*x)*j,e[3]=(f*S-d*C-p*x)*j,e[4]=(c*E-a*k-l*T)*j,e[5]=(t*k-r*E+i*T)*j,e[6]=(g*b-m*C-_*y)*j,e[7]=(u*C-f*b+p*y)*j,e[8]=(a*O-o*E+l*w)*j,e[9]=(n*E-t*O-i*w)*j,e[10]=(m*S-h*b+_*v)*j,e[11]=(d*b-u*S-p*v)*j,e[12]=(o*T-a*D-c*w)*j,e[13]=(t*D-n*T+r*w)*j,e[14]=(h*y-m*x-g*v)*j,e[15]=(u*x-d*y+f*v)*j,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,c=e.z,l=i*a,u=i*o;return this.set(l*a+n,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+n,u*c-r*a,0,l*c-r*o,u*c+r*a,i*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,c=t._w,l=i+i,u=a+a,d=o+o,f=i*l,p=i*u,m=i*d,h=a*u,g=a*d,_=o*d,v=c*l,y=c*u,b=c*d,x=n.x,S=n.y,C=n.z;return r[0]=(1-(h+_))*x,r[1]=(p+b)*x,r[2]=(m-y)*x,r[3]=0,r[4]=(p-b)*S,r[5]=(1-(f+_))*S,r[6]=(g+v)*S,r[7]=0,r[8]=(m+y)*C,r[9]=(g-v)*C,r[10]=(1-(f+h))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Yt.set(r[0],r[1],r[2]).length(),o=Yt.set(r[4],r[5],r[6]).length(),c=Yt.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Xt.copy(this);let l=1/a,u=1/o,d=1/c;return Xt.elements[0]*=l,Xt.elements[1]*=l,Xt.elements[2]*=l,Xt.elements[4]*=u,Xt.elements[5]*=u,Xt.elements[6]*=u,Xt.elements[8]*=d,Xt.elements[9]*=d,Xt.elements[10]*=d,t.setFromRotationMatrix(Xt),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,r,i,a,o=Ve,c=!1){let l=this.elements,u=2*i/(t-e),d=2*i/(n-r),f=(t+e)/(t-e),p=(n+r)/(n-r),m,h;if(c)m=i/(a-i),h=a*i/(a-i);else if(o===2e3)m=-(a+i)/(a-i),h=-2*a*i/(a-i);else if(o===2001)m=-a/(a-i),h=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=h,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ve,c=!1){let l=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),p=-(n+r)/(n-r),m,h;if(c)m=1/(a-i),h=a/(a-i);else if(o===2e3)m=-2/(a-i),h=-(a+i)/(a-i);else if(o===2001)m=-1/(a-i),h=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=m,l[14]=h,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Yt=new q,Xt=new Jt,Zt=new q(0,0,0),Qt=new q(1,1,1),$t=new q,en=new q,tn=new q,nn=new Jt,rn=new Tt,an=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],d=r[2],f=r[6],p=r[10];switch(t){case`XYZ`:this._y=Math.asin(G(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(f,l),this._z=0);break;case`YXZ`:this._x=Math.asin(-G(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,i),this._z=0);break;case`ZXY`:this._x=Math.asin(G(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,i));break;case`ZYX`:this._y=Math.asin(-G(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,i)):(this._x=0,this._z=Math.atan2(-a,l));break;case`YZX`:this._z=Math.asin(G(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,i)):(this._x=0,this._y=Math.atan2(o,p));break;case`XZY`:this._z=Math.asin(-G(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-u,p),this._y=0);break;default:U(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return nn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(nn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return rn.setFromEuler(this),this.setFromQuaternion(rn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};an.DEFAULT_ORDER=`XYZ`;var on=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},sn=0,cn=new q,ln=new Tt,un=new Jt,dn=new q,fn=new q,pn=new q,mn=new Tt,hn=new q(1,0,0),gn=new q(0,1,0),_n=new q(0,0,1),vn={type:`added`},yn={type:`removed`},bn={type:`childadded`,child:null},xn={type:`childremoved`,child:null},Sn=class e extends Qe{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:sn++}),this.uuid=rt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new q,n=new an,r=new Tt,i=new q(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Jt},normalMatrix:{value:new J}}),this.matrix=new Jt,this.matrixWorld=new Jt,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new on,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.multiply(ln),this}rotateOnWorldAxis(e,t){return ln.setFromAxisAngle(e,t),this.quaternion.premultiply(ln),this}rotateX(e){return this.rotateOnAxis(hn,e)}rotateY(e){return this.rotateOnAxis(gn,e)}rotateZ(e){return this.rotateOnAxis(_n,e)}translateOnAxis(e,t){return cn.copy(e).applyQuaternion(this.quaternion),this.position.add(cn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(hn,e)}translateY(e){return this.translateOnAxis(gn,e)}translateZ(e){return this.translateOnAxis(_n,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(un.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?dn.copy(e):dn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),fn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?un.lookAt(fn,dn,this.up):un.lookAt(dn,fn,this.up),this.quaternion.setFromRotationMatrix(un),r&&(un.extractRotation(r.matrixWorld),ln.setFromRotationMatrix(un),this.quaternion.premultiply(ln.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(W(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vn),bn.child=e,this.dispatchEvent(bn),bn.child=null):W(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yn),xn.child=e,this.dispatchEvent(xn),xn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),un.multiply(e.parent.matrixWorld)),e.applyMatrix4(un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vn),bn.child=e,this.dispatchEvent(bn),bn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,e,pn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fn,mn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),c=a(e.shapes),l=a(e.skeletons),u=a(e.animations),d=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),c.length>0&&(n.shapes=c),l.length>0&&(n.skeletons=l),u.length>0&&(n.animations=u),d.length>0&&(n.nodes=d)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Sn.DEFAULT_UP=new q(0,1,0),Sn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Sn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Cn=class extends Sn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},wn={type:`move`},Tn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Cn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Cn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Cn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(l&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(l,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=l.joints[`index-finger-tip`],i=l.joints[`thumb-tip`],o=r.position.distanceTo(i.position);l.inputState.pinching&&o>.025?(l.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!l.inputState.pinching&&o<=.015&&(l.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(c.matrix.fromArray(i.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,i.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(i.linearVelocity)):c.hasLinearVelocity=!1,i.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(i.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(wn)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=i!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Cn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},En={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Dn={h:0,s:0,l:0},On={h:0,s:0,l:0};function kn(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Fe){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Mt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Mt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Mt.workingColorSpace){if(e=it(e,1),t=G(t,0,1),n=G(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=kn(i,r,e+1/3),this.g=kn(i,r,e),this.b=kn(i,r,e-1/3)}return Mt.colorSpaceToWorking(this,r),this}setStyle(e,t=Fe){function n(t){t!==void 0&&parseFloat(t)<1&&U(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:U(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);U(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Fe){let n=En[e.toLowerCase()];return n===void 0?U(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Nt(e.r),this.g=Nt(e.g),this.b=Nt(e.b),this}copyLinearToSRGB(e){return this.r=Pt(e.r),this.g=Pt(e.g),this.b=Pt(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fe){return Mt.workingToColorSpace(An.copy(this),e),Math.round(G(An.r*255,0,255))*65536+Math.round(G(An.g*255,0,255))*256+Math.round(G(An.b*255,0,255))}getHexString(e=Fe){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Mt.workingColorSpace){Mt.workingToColorSpace(An.copy(this),t);let n=An.r,r=An.g,i=An.b,a=Math.max(n,r,i),o=Math.min(n,r,i),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let e=a-o;switch(l=u<=.5?e/(a+o):e/(2-a-o),a){case n:c=(r-i)/e+(r<i?6:0);break;case r:c=(i-n)/e+2;break;case i:c=(n-r)/e+4}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Mt.workingColorSpace){return Mt.workingToColorSpace(An.copy(this),t),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=Fe){Mt.workingToColorSpace(An.copy(this),e);let t=An.r,n=An.g,r=An.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Dn),this.setHSL(Dn.h+e,Dn.s+t,Dn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Dn),e.getHSL(On);let n=st(Dn.h,On.h,t),r=st(Dn.s,On.s,t),i=st(Dn.l,On.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},An=new Y;Y.NAMES=En;var jn=class e{constructor(e,t=1,n=1e3){this.isFog=!0,this.name=``,this.color=new Y(e),this.near=t,this.far=n}clone(){return new e(this.color,this.near,this.far)}toJSON(){return{type:`Fog`,name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},Mn=class extends Sn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new an,this.environmentIntensity=1,this.environmentRotation=new an,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Nn=new q,Pn=new q,Fn=new q,In=new q,Ln=new q,Rn=new q,zn=new q,Bn=new q,Vn=new q,Hn=new q,Un=new Ut,Wn=new Ut,Gn=new Ut,Kn=class e{constructor(e=new q,t=new q,n=new q){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Nn.subVectors(e,t),r.cross(Nn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Nn.subVectors(r,t),Pn.subVectors(n,t),Fn.subVectors(e,t);let a=Nn.dot(Nn),o=Nn.dot(Pn),c=Nn.dot(Fn),l=Pn.dot(Pn),u=Pn.dot(Fn),d=a*l-o*o;if(d===0)return i.set(0,0,0),null;let f=1/d,p=(l*c-o*u)*f,m=(a*u-o*c)*f;return i.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,In)!==null&&In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,r,i,a,o,c){return this.getBarycoord(e,t,n,r,In)===null?(c.x=0,c.y=0,`z`in c&&(c.z=0),`w`in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(i,In.x),c.addScaledVector(a,In.y),c.addScaledVector(o,In.z),c)}static getInterpolatedAttribute(e,t,n,r,i,a){return Un.setScalar(0),Wn.setScalar(0),Gn.setScalar(0),Un.fromBufferAttribute(e,t),Wn.fromBufferAttribute(e,n),Gn.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Un,i.x),a.addScaledVector(Wn,i.y),a.addScaledVector(Gn,i.z),a}static isFrontFacing(e,t,n,r){return Nn.subVectors(n,t),Pn.subVectors(e,t),Nn.cross(Pn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Nn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),Nn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ln.subVectors(r,n),Rn.subVectors(i,n),Bn.subVectors(e,n);let c=Ln.dot(Bn),l=Rn.dot(Bn);if(c<=0&&l<=0)return t.copy(n);Vn.subVectors(e,r);let u=Ln.dot(Vn),d=Rn.dot(Vn);if(u>=0&&d<=u)return t.copy(r);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(Ln,a);Hn.subVectors(e,i);let p=Ln.dot(Hn),m=Rn.dot(Hn);if(m>=0&&p<=m)return t.copy(i);let h=p*l-c*m;if(h<=0&&l>=0&&m<=0)return o=l/(l-m),t.copy(n).addScaledVector(Rn,o);let g=u*m-p*d;if(g<=0&&d-u>=0&&p-m>=0)return zn.subVectors(i,r),o=(d-u)/(d-u+(p-m)),t.copy(r).addScaledVector(zn,o);let _=1/(g+h+f);return a=h*_,o=f*_,t.copy(n).addScaledVector(Ln,a).addScaledVector(Rn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},qn=class{constructor(e=new q(1/0,1/0,1/0),t=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Yn):Yn.fromBufferAttribute(r,t),Yn.applyMatrix4(e.matrixWorld),this.expandByPoint(Yn);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Xn.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Xn.copy(e.boundingBox)),Xn.applyMatrix4(e.matrixWorld),this.union(Xn)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yn),Yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rr),ir.subVectors(this.max,rr),Zn.subVectors(e.a,rr),Qn.subVectors(e.b,rr),$n.subVectors(e.c,rr),er.subVectors(Qn,Zn),tr.subVectors($n,Qn),nr.subVectors(Zn,$n);let t=[0,-er.z,er.y,0,-tr.z,tr.y,0,-nr.z,nr.y,er.z,0,-er.x,tr.z,0,-tr.x,nr.z,0,-nr.x,-er.y,er.x,0,-tr.y,tr.x,0,-nr.y,nr.x,0];return!sr(t,Zn,Qn,$n,ir)||(t=[1,0,0,0,1,0,0,0,1],!sr(t,Zn,Qn,$n,ir))?!1:(ar.crossVectors(er,tr),t=[ar.x,ar.y,ar.z],sr(t,Zn,Qn,$n,ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Jn=[new q,new q,new q,new q,new q,new q,new q,new q],Yn=new q,Xn=new qn,Zn=new q,Qn=new q,$n=new q,er=new q,tr=new q,nr=new q,rr=new q,ir=new q,ar=new q,or=new q;function sr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){or.fromArray(e,a);let o=i.x*Math.abs(or.x)+i.y*Math.abs(or.y)+i.z*Math.abs(or.z),c=t.dot(or),l=n.dot(or),u=r.dot(or);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var cr=new q,lr=new K,ur=0,dr=class extends Qe{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ur++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ze,this.updateRanges=[],this.gpuType=g,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix3(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyMatrix4(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.applyNormalMatrix(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)cr.fromBufferAttribute(this,t),cr.transformDirection(e),this.setXYZ(t,cr.x,cr.y,cr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=St(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=St(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=St(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=St(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=St(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array),i=Ct(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},fr=class extends dr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},pr=class extends dr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},mr=class extends dr{constructor(e,t,n){super(new Float32Array(e),t,n)}},hr=new qn,gr=new q,_r=new q,vr=class{constructor(e=new q,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?hr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;gr.subVectors(e,this.center);let t=gr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(gr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(_r.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(gr.copy(e.center).add(_r)),this.expandByPoint(gr.copy(e.center).sub(_r))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},yr=0,br=new Jt,xr=new Sn,Sr=new q,Cr=new qn,wr=new qn,Tr=new q,Er=class e extends Qe{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yr++}),this.uuid=rt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(He(e)?pr:fr)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new J().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return br.makeRotationFromQuaternion(e),this.applyMatrix4(br),this}rotateX(e){return br.makeRotationX(e),this.applyMatrix4(br),this}rotateY(e){return br.makeRotationY(e),this.applyMatrix4(br),this}rotateZ(e){return br.makeRotationZ(e),this.applyMatrix4(br),this}translate(e,t,n){return br.makeTranslation(e,t,n),this.applyMatrix4(br),this}scale(e,t,n){return br.makeScale(e,t,n),this.applyMatrix4(br),this}lookAt(e){return xr.lookAt(e),xr.updateMatrix(),this.applyMatrix4(xr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new mr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new qn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Cr.setFromBufferAttribute(n),this.morphTargetsRelative?(Tr.addVectors(this.boundingBox.min,Cr.min),this.boundingBox.expandByPoint(Tr),Tr.addVectors(this.boundingBox.max,Cr.max),this.boundingBox.expandByPoint(Tr)):(this.boundingBox.expandByPoint(Cr.min),this.boundingBox.expandByPoint(Cr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new vr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new q,1/0);return}if(e){let n=this.boundingSphere.center;if(Cr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];wr.setFromBufferAttribute(n),this.morphTargetsRelative?(Tr.addVectors(Cr.min,wr.min),Cr.expandByPoint(Tr),Tr.addVectors(Cr.max,wr.max),Cr.expandByPoint(Tr)):(Cr.expandByPoint(wr.min),Cr.expandByPoint(wr.max))}Cr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Tr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Tr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Tr.fromBufferAttribute(a,t),o&&(Sr.fromBufferAttribute(e,t),Tr.add(Sr)),r=Math.max(r,n.distanceToSquared(Tr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new dr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],c=[];for(let e=0;e<n.count;e++)o[e]=new q,c[e]=new q;let l=new q,u=new q,d=new q,f=new K,p=new K,m=new K,h=new q,g=new q;function _(e,t,r){l.fromBufferAttribute(n,e),u.fromBufferAttribute(n,t),d.fromBufferAttribute(n,r),f.fromBufferAttribute(i,e),p.fromBufferAttribute(i,t),m.fromBufferAttribute(i,r),u.sub(l),d.sub(l),p.sub(f),m.sub(f);let a=1/(p.x*m.y-m.x*p.y);isFinite(a)&&(h.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(a),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(a),o[e].add(h),o[t].add(h),o[r].add(h),c[e].add(g),c[t].add(g),c[r].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)_(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let y=new q,b=new q,x=new q,S=new q;function C(e){x.fromBufferAttribute(r,e),S.copy(x);let t=o[e];y.copy(t),y.sub(x.multiplyScalar(x.dot(t))).normalize(),b.crossVectors(S,t);let n=b.dot(c[e])<0?-1:1;a.setXYZW(e,y.x,y.y,y.z,n)}for(let t=0,n=v.length;t<n;++t){let n=v[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)C(e.getX(t+0)),C(e.getX(t+1)),C(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new dr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new q,i=new q,a=new q,o=new q,c=new q,l=new q,u=new q,d=new q;if(e)for(let f=0,p=e.count;f<p;f+=3){let p=e.getX(f+0),m=e.getX(f+1),h=e.getX(f+2);r.fromBufferAttribute(t,p),i.fromBufferAttribute(t,m),a.fromBufferAttribute(t,h),u.subVectors(a,i),d.subVectors(r,i),u.cross(d),o.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),l.fromBufferAttribute(n,h),o.add(u),c.add(u),l.add(u),n.setXYZ(p,o.x,o.y,o.z),n.setXYZ(m,c.x,c.y,c.z),n.setXYZ(h,l.x,l.y,l.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),u.subVectors(a,i),d.subVectors(r,i),u.cross(d),n.setXYZ(e+0,u.x,u.y,u.z),n.setXYZ(e+1,u.x,u.y,u.z),n.setXYZ(e+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Tr.fromBufferAttribute(e,t),Tr.normalize(),e.setXYZ(t,Tr.x,Tr.y,Tr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,c=0;for(let i=0,l=t.length;i<l;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[c++]=n[o++]}return new dr(a,r,i)}if(this.index===null)return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Dr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=ze,this.updateRanges=[],this.version=0,this.uuid=rt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=rt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Or=new q,kr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyMatrix4(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.applyNormalMatrix(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Or.fromBufferAttribute(this,t),Or.transformDirection(e),this.setXYZ(t,Or.x,Or.y,Or.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=St(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=St(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=St(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=St(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=St(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ct(t,this.array),n=Ct(n,this.array),r=Ct(r,this.array),i=Ct(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){qe(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new dr(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){qe(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Ar=new q,jr=new q,Mr=new J,Nr=class{constructor(e=new q(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ar.subVectors(n,t).cross(jr.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ar),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Mr.getNormalMatrix(e),r=this.coplanarPoint(Ar).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Pr=0,Fr=class extends Qe{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Pr++}),this.uuid=rt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Re,this.stencilZFail=Re,this.stencilZPass=Re,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){U(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new Nr().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new K().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new K().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Ir=class extends Fr{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Lr,Rr=new q,zr=new q,Br=new q,Vr=new K,Hr=new K,Ur=new Jt,Wr=new q,Gr=new q,Kr=new q,qr=new K,Jr=new K,Yr=new K,Xr=class extends Sn{constructor(e=new Ir){if(super(),this.isSprite=!0,this.type=`Sprite`,Lr===void 0){Lr=new Er;let e=new Dr(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);Lr.setIndex([0,1,2,0,2,3]),Lr.setAttribute(`position`,new kr(e,3,0,!1)),Lr.setAttribute(`uv`,new kr(e,2,3,!1))}this.geometry=Lr,this.material=e,this.center=new K(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&W(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),zr.setFromMatrixScale(this.matrixWorld),Ur.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Br.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&zr.multiplyScalar(-Br.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Zr(Wr.set(-.5,-.5,0),Br,a,zr,r,i),Zr(Gr.set(.5,-.5,0),Br,a,zr,r,i),Zr(Kr.set(.5,.5,0),Br,a,zr,r,i),qr.set(0,0),Jr.set(1,0),Yr.set(1,1);let o=e.ray.intersectTriangle(Wr,Gr,Kr,!1,Rr);if(o===null&&(Zr(Gr.set(-.5,.5,0),Br,a,zr,r,i),Jr.set(0,1),o=e.ray.intersectTriangle(Wr,Kr,Gr,!1,Rr),o===null))return;let c=e.ray.origin.distanceTo(Rr);c<e.near||c>e.far||t.push({distance:c,point:Rr.clone(),uv:Kn.getInterpolation(Rr,Wr,Gr,Kr,qr,Jr,Yr,new K),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Zr(e,t,n,r,i,a){Vr.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Hr.copy(Vr):(Hr.x=a*Vr.x-i*Vr.y,Hr.y=i*Vr.x+a*Vr.y),e.copy(t),e.x+=Hr.x,e.y+=Hr.y,e.applyMatrix4(Ur)}var Qr=new q,$r=new q,ei=new q,ti=new q,ni=class{constructor(e=new q,t=new q(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qr)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qr.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qr.copy(this.origin).addScaledVector(this.direction,t),Qr.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){$r.copy(e).add(t).multiplyScalar(.5),ei.copy(t).sub(e).normalize(),ti.copy(this.origin).sub($r);let i=e.distanceTo(t)*.5,a=-this.direction.dot(ei),o=ti.dot(this.direction),c=-ti.dot(ei),l=ti.lengthSq(),u=Math.abs(1-a*a),d,f,p,m;if(u>0){if(d=a*c-o,f=a*o-c,m=i*u,d>=0){if(f>=-m){if(f<=m){let e=1/u;d*=e,f*=e,p=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=i,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l}else f=-i,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l}else f<=-m?(d=Math.max(0,-(-a*i+o)),f=d>0?-i:Math.min(Math.max(-i,-c),i),p=-d*d+f*(f+2*c)+l):f<=m?(d=0,f=Math.min(Math.max(-i,-c),i),p=f*(f+2*c)+l):(d=Math.max(0,-(a*i+o)),f=d>0?i:Math.min(Math.max(-i,-c),i),p=-d*d+f*(f+2*c)+l)}else f=a>0?-i:i,d=Math.max(0,-(a*f+o)),p=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy($r).addScaledVector(ei,f),p}intersectSphere(e,t){if(e.radius<0)return null;Qr.subVectors(e.center,this.origin);let n=Qr.dot(this.direction),r=Qr.dot(Qr)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(i=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(i=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,c=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,c=(e.min.z-f.z)*d),n>c||o>r)||((o>n||n!==n)&&(n=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Qr)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,c=o.x,l=o.y,u=o.z,d=e.x-a.x,f=e.y-a.y,p=e.z-a.z,m=t.x-a.x,h=t.y-a.y,g=t.z-a.z,_=n.x-a.x,v=n.y-a.y,y=n.z-a.z,b=Math.abs(c),x=Math.abs(l),S=Math.abs(u),C,w,T,E,D,O,k,A,j,M,N,P;if(b>=x&&b>=S?(T=c,O=d,j=m,P=_,c>=0?(C=l,w=u,E=f,D=p,k=h,A=g,M=v,N=y):(C=u,w=l,E=p,D=f,k=g,A=h,M=y,N=v)):x>=S?(T=l,O=f,j=h,P=v,l>=0?(C=u,w=c,E=p,D=d,k=g,A=m,M=y,N=_):(C=c,w=u,E=d,D=p,k=m,A=g,M=_,N=y)):(T=u,O=p,j=g,P=y,u>=0?(C=c,w=l,E=d,D=f,k=m,A=h,M=_,N=v):(C=l,w=c,E=f,D=d,k=h,A=m,M=v,N=_)),T===0)return null;let F=C/T,I=w/T,L=1/T,ee=E-F*O,te=D-I*O,ne=k-F*j,re=A-I*j,ie=M-F*P,ae=N-I*P,oe=ie*re-ae*ne,R=ee*ae-te*ie,se=ne*te-re*ee;if(r){if(oe<0||R<0||se<0)return null}else if((oe<0||R<0||se<0)&&(oe>0||R>0||se>0))return null;let ce=oe+R+se;if(ce===0)return null;let le=L*(oe*O+R*j+se*P);return(ce>0?le<0:le>0)?null:this.at(le/ce,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ri=class extends Fr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},ii=new Jt,ai=new ni,oi=new vr,si=new q,ci=new q,li=new q,ui=new q,di=new q,fi=new q,pi=new q,mi=new q,X=class extends Sn{constructor(e=new Er,t=new ri){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){fi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],c=i[n];r!==0&&(di.fromBufferAttribute(c,e),a?fi.addScaledVector(di,r):fi.addScaledVector(di.sub(t),r))}t.add(fi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oi.copy(n.boundingSphere),oi.applyMatrix4(i),ai.copy(e.ray).recast(e.near),!(oi.containsPoint(ai.origin)===!1&&(ai.intersectSphere(oi,si)===null||ai.origin.distanceToSquared(si)>(e.far-e.near)**2))&&(ii.copy(i).invert(),ai.copy(e.ray).applyMatrix4(ii),(n.boundingBox===null||ai.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,ai)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,c=i.attributes.position,l=i.attributes.uv,u=i.attributes.uv1,d=i.attributes.normal,f=i.groups,p=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,c=f.length;i<c;i++){let c=f[i],m=a[c.materialIndex],h=Math.max(c.start,p.start),g=Math.min(o.count,Math.min(c.start+c.count,p.start+p.count));for(let i=h,a=g;i<a;i+=3){let a=o.getX(i),f=o.getX(i+1),p=o.getX(i+2);r=gi(this,m,e,n,l,u,d,a,f,p),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=c.materialIndex,t.push(r))}}else{let i=Math.max(0,p.start),c=Math.min(o.count,p.start+p.count);for(let f=i,p=c;f<p;f+=3){let i=o.getX(f),c=o.getX(f+1),p=o.getX(f+2);r=gi(this,a,e,n,l,u,d,i,c,p),r&&(r.faceIndex=Math.floor(f/3),t.push(r))}}}else if(c!==void 0){if(Array.isArray(a))for(let i=0,o=f.length;i<o;i++){let o=f[i],m=a[o.materialIndex],h=Math.max(o.start,p.start),g=Math.min(c.count,Math.min(o.start+o.count,p.start+p.count));for(let i=h,a=g;i<a;i+=3){let a=i,c=i+1,f=i+2;r=gi(this,m,e,n,l,u,d,a,c,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,p.start),o=Math.min(c.count,p.start+p.count);for(let c=i,f=o;c<f;c+=3){let i=c,o=c+1,f=c+2;r=gi(this,a,e,n,l,u,d,i,o,f),r&&(r.faceIndex=Math.floor(c/3),t.push(r))}}}}};function hi(e,t,n,r,i,a,o,c){let l;if(l=t.side===1?r.intersectTriangle(o,a,i,!0,c):r.intersectTriangle(i,a,o,t.side===0,c),l===null)return null;mi.copy(c),mi.applyMatrix4(e.matrixWorld);let u=n.ray.origin.distanceTo(mi);return u<n.near||u>n.far?null:{distance:u,point:mi.clone(),object:e}}function gi(e,t,n,r,i,a,o,c,l,u){e.getVertexPosition(c,ci),e.getVertexPosition(l,li),e.getVertexPosition(u,ui);let d=hi(e,t,n,r,ci,li,ui,pi);if(d){let e=new q;Kn.getBarycoord(pi,ci,li,ui,e),i&&(d.uv=Kn.getInterpolatedAttribute(i,c,l,u,e,new K)),a&&(d.uv1=Kn.getInterpolatedAttribute(a,c,l,u,e,new K)),o&&(d.normal=Kn.getInterpolatedAttribute(o,c,l,u,e,new q),d.normal.dot(r.direction)>0&&d.normal.multiplyScalar(-1));let t={a:c,b:l,c:u,normal:new q,materialIndex:0};Kn.getNormal(ci,li,ui,t.normal),d.face=t,d.barycoord=e}return d}var _i=class extends Ht{constructor(e=null,t=1,n=1,i,a,o,c,l,u=r,d=r,f,p){super(null,o,c,l,u,d,i,a,f,p),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vi=class extends dr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},yi=new Jt,bi=new Jt,xi=[],Si=new qn,Ci=new Jt,wi=new X,Ti=new vr,Ei=class extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new vi(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Ci)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new qn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yi),Si.copy(e.boundingBox).applyMatrix4(yi),this.boundingBox.union(Si)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new vr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,yi),Ti.copy(e.boundingSphere).applyMatrix4(yi),this.boundingSphere.union(Ti)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(wi.geometry=this.geometry,wi.material=this.material,wi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ti.copy(this.boundingSphere),Ti.applyMatrix4(n),e.ray.intersectsSphere(Ti)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,yi),bi.multiplyMatrices(n,yi),wi.matrixWorld=bi,wi.raycast(e,xi);for(let e=0,n=xi.length;e<n;e++){let n=xi[e];n.instanceId=i,n.object=this,t.push(n)}xi.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new vi(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new _i(new Float32Array(r*this.count),r,this.count,O,g));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,c=r*e;return i[c]=o,i.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Di=new vr,Oi=new K(.5,.5),ki=new q,Ai=class{constructor(e=new Nr,t=new Nr,n=new Nr,r=new Nr,i=new Nr,a=new Nr){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ve,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],c=i[2],l=i[3],u=i[4],d=i[5],f=i[6],p=i[7],m=i[8],h=i[9],g=i[10],_=i[11],v=i[12],y=i[13],b=i[14],x=i[15];if(r[0].setComponents(l-a,p-u,_-m,x-v).normalize(),r[1].setComponents(l+a,p+u,_+m,x+v).normalize(),r[2].setComponents(l+o,p+d,_+h,x+y).normalize(),r[3].setComponents(l-o,p-d,_-h,x-y).normalize(),n)r[4].setComponents(c,f,g,b).normalize(),r[5].setComponents(l-c,p-f,_-g,x-b).normalize();else if(r[4].setComponents(l-c,p-f,_-g,x-b).normalize(),t===2e3)r[5].setComponents(l+c,p+f,_+g,x+b).normalize();else if(t===2001)r[5].setComponents(c,f,g,b).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Di.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Di.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Di)}intersectsSprite(e){return Di.center.set(0,0,0),Di.radius=.7071067811865476+Oi.distanceTo(e.center),Di.applyMatrix4(e.matrixWorld),this.intersectsSphere(Di)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ki.x=r.normal.x>0?e.max.x:e.min.x,ki.y=r.normal.y>0?e.max.y:e.min.y,ki.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ki)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},ji=class extends Fr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Mi=new Jt,Ni=new ni,Pi=new vr,Fi=new q,Ii=class extends Sn{constructor(e=new Er,t=new ji){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Pi.copy(n.boundingSphere),Pi.applyMatrix4(r),Pi.radius+=i,e.ray.intersectsSphere(Pi)===!1)return;Mi.copy(r).invert(),Ni.copy(e.ray).applyMatrix4(Mi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=l.getX(a);Fi.fromBufferAttribute(u,n),Li(Fi,n,c,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(u.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Fi.fromBufferAttribute(u,a),Li(Fi,a,c,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Li(e,t,n,r,i,a,o){let c=Ni.distanceSqToPoint(e);if(c<n){let n=new q;Ni.closestPointToPoint(e,n),n.applyMatrix4(r);let l=i.ray.origin.distanceTo(n);if(l<i.near||l>i.far)return;a.push({distance:l,distanceToRay:Math.sqrt(c),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Ri=class extends Ht{constructor(e=[],t=301,n,r,i,a,o,c,l,u){super(e,t,n,r,i,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},zi=class extends Ht{constructor(e,t,n,r,i,a,o,c,l){super(e,t,n,r,i,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},Bi=class extends Ht{constructor(e,t,n=h,i,a,o,c=r,l=r,u,d=E,f=1){if(d!==1026&&d!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:f},i,a,o,c,l,d,n,u),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Rt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Vi=class extends Bi{constructor(e,t=h,n=301,i,a,o=r,c=r,l,u=E){let d={width:e,height:e,depth:1},f=[d,d,d,d,d,d];super(e,e,t,n,i,a,o,c,l,u),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Hi=class extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Ui=class e extends Er{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let c=[],l=[],u=[],d=[],f=0,p=0;m(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),m(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),m(`x`,`z`,`y`,1,1,e,n,t,r,a,2),m(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),m(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),m(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(c),this.setAttribute(`position`,new mr(l,3)),this.setAttribute(`normal`,new mr(u,3)),this.setAttribute(`uv`,new mr(d,2));function m(e,t,n,r,i,a,m,h,g,_,v){let y=a/g,b=m/_,x=a/2,S=m/2,C=h/2,w=g+1,T=_+1,E=0,D=0,O=new q;for(let a=0;a<T;a++){let o=a*b-S;for(let c=0;c<w;c++)O[e]=(c*y-x)*r,O[t]=o*i,O[n]=C,l.push(O.x,O.y,O.z),O[e]=0,O[t]=0,O[n]=h>0?1:-1,u.push(O.x,O.y,O.z),d.push(c/g),d.push(1-a/_),E+=1}for(let e=0;e<_;e++)for(let t=0;t<g;t++){let n=f+t+w*e,r=f+t+w*(e+1),i=f+(t+1)+w*(e+1),a=f+(t+1)+w*e;c.push(n,r,a),c.push(r,i,a),D+=6}o.addGroup(p,D,v),p+=D,f+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},Wi=class e extends Er{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],c=[],l=new q,u=new K;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let i=0,d=3;i<=t;i++,d+=3){let f=n+i/t*r;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,c.push(u.x,u.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new mr(a,3)),this.setAttribute(`normal`,new mr(o,3)),this.setAttribute(`uv`,new mr(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Gi=class e extends Er{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,c=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:c};let l=this;r=Math.floor(r),i=Math.floor(i);let u=[],d=[],f=[],p=[],m=0,h=[],g=n/2,_=0;v(),a===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(u),this.setAttribute(`position`,new mr(d,3)),this.setAttribute(`normal`,new mr(f,3)),this.setAttribute(`uv`,new mr(p,2));function v(){let a=new q,v=new q,y=0,b=(t-e)/n;for(let l=0;l<=i;l++){let u=[],_=l/i,y=_*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*c+o,l=Math.sin(i),h=Math.cos(i);v.x=y*l,v.y=-_*n+g,v.z=y*h,d.push(v.x,v.y,v.z),a.set(l,b,h).normalize(),f.push(a.x,a.y,a.z),p.push(t,1-_),u.push(m++)}h.push(u)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=h[r][n],o=h[r+1][n],c=h[r+1][n+1],l=h[r][n+1];(e>0||r!==0)&&(u.push(a,o,l),y+=3),(t>0||r!==i-1)&&(u.push(o,c,l),y+=3)}l.addGroup(_,y,0),_+=y}function y(n){let i=m,a=new K,h=new q,v=0,y=n===!0?e:t,b=n===!0?1:-1;for(let e=1;e<=r;e++)d.push(0,g*b,0),f.push(0,b,0),p.push(.5,.5),m++;let x=m;for(let e=0;e<=r;e++){let t=e/r*c+o,n=Math.cos(t),i=Math.sin(t);h.x=y*i,h.y=g*b,h.z=y*n,d.push(h.x,h.y,h.z),f.push(0,b,0),a.x=n*.5+.5,a.y=i*.5*b+.5,p.push(a.x,a.y),m++}for(let e=0;e<r;e++){let t=i+e,r=x+e;n===!0?u.push(r,r+1,t):u.push(r+1,r,t),v+=3}l.addGroup(_,v,n===!0?1:2),_+=v}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Ki=class e extends Gi{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},qi=class e extends Er{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),l(n),u(),this.setAttribute(`position`,new mr(i,3)),this.setAttribute(`normal`,new mr(i.slice(),3)),this.setAttribute(`uv`,new mr(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new q,r=new q,i=new q;for(let a=0;a<t.length;a+=3)p(t[a+0],n),p(t[a+1],r),p(t[a+2],i),c(n,r,i,e)}function c(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),c=t.clone().lerp(n,r/i),l=i-r;for(let e=0;e<=l;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(c,e/l)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(f(a[e][n+1]),f(a[e+1][n]),f(a[e][n])):(f(a[e][n+1]),f(a[e+1][n+1]),f(a[e+1][n]))}}function l(e){let t=new q;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function u(){let e=new q;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=g(e)/2/Math.PI+.5,r=_(e)/Math.PI+.5;a.push(n,1-r)}m(),d()}function d(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function f(e){i.push(e.x,e.y,e.z)}function p(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function m(){let e=new q,t=new q,n=new q,r=new q,o=new K,c=new K,l=new K;for(let u=0,d=0;u<i.length;u+=9,d+=6){e.set(i[u+0],i[u+1],i[u+2]),t.set(i[u+3],i[u+4],i[u+5]),n.set(i[u+6],i[u+7],i[u+8]),o.set(a[d+0],a[d+1]),c.set(a[d+2],a[d+3]),l.set(a[d+4],a[d+5]),r.copy(e).add(t).add(n).divideScalar(3);let f=g(r);h(o,d+0,e,f),h(c,d+2,t,f),h(l,d+4,n,f)}}function h(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function g(e){return Math.atan2(e.z,-e.x)}function _(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},Ji=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){U(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,c=i-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=n[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,n[r]===a)return r/(i-1);let u=n[r],d=n[r+1]-u,f=(a-u)/d;return(r+f)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),c=t||(a.isVector2?new K:new q);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new q,r=[],i=[],a=[],o=new q,c=new Jt;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new q)}i[0]=new q,a[0]=new q;let l=Number.MAX_VALUE,u=Math.abs(r[0].x),d=Math.abs(r[0].y),f=Math.abs(r[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(G(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(c.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(G(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(c.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Yi=class extends Ji{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(e,t=new K){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=c-this.aX,r=l-this.aY;c=n*e-r*t+this.aX,l=n*t+r*e+this.aY}return n.set(c,l)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Xi=class extends Yi{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Zi(){let e=0,t=0,n=0,r=0;function i(i,a,o,c){e=i,t=o,n=-3*i+3*a-2*o-c,r=2*i-2*a+o+c}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,c){let l=(t-e)/a-(n-e)/(a+o)+(n-t)/o,u=(n-t)/o-(r-t)/(o+c)+(r-n)/c;l*=o,u*=o,i(t,n,l,u)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Qi=new q,$i=new q,ea=new Zi,ta=new Zi,na=new Zi,ra=class extends Ji{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new q){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:c===0&&o===i-1&&(o=i-2,c=1);let l,u;this.closed||o>0?l=r[(o-1)%i]:($i.subVectors(r[0],r[1]).add(r[0]),l=$i);let d=r[o%i],f=r[(o+1)%i];if(this.closed||o+2<i?u=r[(o+2)%i]:(Qi.subVectors(r[i-1],r[i-2]).add(r[i-1]),u=Qi),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=l.distanceToSquared(d)**+e,n=d.distanceToSquared(f)**+e,r=f.distanceToSquared(u)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),ea.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,t,n,r),ta.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,t,n,r),na.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,t,n,r)}else this.curveType===`catmullrom`&&(ea.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),ta.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),na.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(ea.calc(c),ta.calc(c),na.calc(c)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new q().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ia(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,c=e*e,l=e*c;return(2*n-2*r+a+o)*l+(-3*n+3*r-2*a-o)*c+a*e+n}function aa(e,t){let n=1-e;return n*n*t}function oa(e,t){return 2*(1-e)*e*t}function sa(e,t){return e*e*t}function ca(e,t,n,r){return aa(e,t)+oa(e,n)+sa(e,r)}function la(e,t){let n=1-e;return n*n*n*t}function ua(e,t){let n=1-e;return 3*n*n*e*t}function da(e,t){return 3*(1-e)*e*e*t}function fa(e,t){return e*e*e*t}function pa(e,t,n,r,i){return la(e,t)+ua(e,n)+da(e,r)+fa(e,i)}var ma=class extends Ji{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(pa(e,r.x,i.x,a.x,o.x),pa(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ha=class extends Ji{constructor(e=new q,t=new q,n=new q,r=new q){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(pa(e,r.x,i.x,a.x,o.x),pa(e,r.y,i.y,a.y,o.y),pa(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ga=class extends Ji{constructor(e=new K,t=new K){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_a=class extends Ji{constructor(e=new q,t=new q){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new q){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new q){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},va=class extends Ji{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ca(e,r.x,i.x,a.x),ca(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ya=class extends Ji{constructor(e=new q,t=new q,n=new q){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new q){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ca(e,r.x,i.x,a.x),ca(e,r.y,i.y,a.y),ca(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},ba=class extends Ji{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new K){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,c=r[a===0?a:a-1],l=r[a],u=r[a>r.length-2?r.length-1:a+1],d=r[a>r.length-3?r.length-1:a+2];return n.set(ia(o,c.x,l.x,u.x,d.x),ia(o,c.y,l.y,u.y,d.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this}},xa=Object.freeze({__proto__:null,ArcCurve:Xi,CatmullRomCurve3:ra,CubicBezierCurve:ma,CubicBezierCurve3:ha,EllipseCurve:Yi,LineCurve:ga,LineCurve3:_a,QuadraticBezierCurve:va,QuadraticBezierCurve3:ya,SplineCurve:ba}),Sa=class extends Ji{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new xa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),c=o===0?0:1-e/o;return a.getPointAt(c,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,c=a.getPoints(o);for(let e=0;e<c.length;e++){let r=c[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new xa[n.type]().fromJSON(n))}return this}},Ca=class extends Sa{constructor(e){super(),this.type=`Path`,this.currentPoint=new K,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new ga(this.currentPoint.clone(),new K(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new va(this.currentPoint.clone(),new K(e,t),new K(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new ma(this.currentPoint.clone(),new K(e,t),new K(n,r),new K(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new ba([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(e+o,t+c,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+l,t+u,n,r,i,a,o,c),this}absellipse(e,t,n,r,i,a,o,c){let l=new Yi(e,t,n,r,i,a,o,c);if(this.curves.length>0){let e=l.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},wa=class extends Ca{constructor(e){super(e),this.uuid=rt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Ca().fromJSON(n))}return this}};function Ta(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Ea(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let c,l,u;if(r&&(a=Na(e,t,a,n)),e.length>80*n){c=e[0],l=e[1];let t=c,r=l;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<c&&(c=n),i<l&&(l=i),n>t&&(t=n),i>r&&(r=i)}u=Math.max(t-c,r-l),u=u===0?0:32767/u}return Oa(a,o,n,c,l,u,0),o}function Ea(e,t,n,r,i){let a;if(i===ro(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=eo(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=eo(i/r|0,e[i],e[i+1],a);return a&&Ka(a,a.next)&&(to(a),a=a.next),a}function Da(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(Ka(n,n.next)||Ga(n.prev,n,n.next)===0)){if(to(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Oa(e,t,n,r,i,a,o){if(!e)return;!o&&a&&Ra(e,r,i,a);let c=e;for(;e.prev!==e.next;){let l=e.prev,u=e.next;if(a?Aa(e,r,i,a):ka(e)){t.push(l.i,e.i,u.i),to(e),e=u.next,c=u.next;continue}if(e=u,e===c){o?o===1?(e=ja(Da(e),t),Oa(e,t,n,r,i,a,2)):o===2&&Ma(e,t,n,r,i,a):Oa(Da(e),t,n,r,i,a,1);break}}}function ka(e){let t=e.prev,n=e,r=e.next;if(Ga(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,c=t.y,l=n.y,u=r.y,d=Math.min(i,a,o),f=Math.min(c,l,u),p=Math.max(i,a,o),m=Math.max(c,l,u),h=r.next;for(;h!==t;){if(h.x>=d&&h.x<=p&&h.y>=f&&h.y<=m&&Ua(i,c,a,l,o,u,h.x,h.y)&&Ga(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function Aa(e,t,n,r){let i=e.prev,a=e,o=e.next;if(Ga(i,a,o)>=0)return!1;let c=i.x,l=a.x,u=o.x,d=i.y,f=a.y,p=o.y,m=Math.min(c,l,u),h=Math.min(d,f,p),g=Math.max(c,l,u),_=Math.max(d,f,p),v=Ba(m,h,t,n,r),y=Ba(g,_,t,n,r),b=e.prevZ,x=e.nextZ;for(;b&&b.z>=v&&x&&x.z<=y;){if(b.x>=m&&b.x<=g&&b.y>=h&&b.y<=_&&b!==i&&b!==o&&Ua(c,d,l,f,u,p,b.x,b.y)&&Ga(b.prev,b,b.next)>=0||(b=b.prevZ,x.x>=m&&x.x<=g&&x.y>=h&&x.y<=_&&x!==i&&x!==o&&Ua(c,d,l,f,u,p,x.x,x.y)&&Ga(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;b&&b.z>=v;){if(b.x>=m&&b.x<=g&&b.y>=h&&b.y<=_&&b!==i&&b!==o&&Ua(c,d,l,f,u,p,b.x,b.y)&&Ga(b.prev,b,b.next)>=0)return!1;b=b.prevZ}for(;x&&x.z<=y;){if(x.x>=m&&x.x<=g&&x.y>=h&&x.y<=_&&x!==i&&x!==o&&Ua(c,d,l,f,u,p,x.x,x.y)&&Ga(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ja(e,t){let n=e;do{let r=n.prev,i=n.next.next;!Ka(r,i)&&qa(r,n,n.next,i)&&Za(r,i)&&Za(i,r)&&(t.push(r.i,n.i,i.i),to(n),to(n.next),n=e=i),n=n.next}while(n!==e);return Da(n)}function Ma(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&Wa(o,e)){let c=$a(o,e);o=Da(o,o.next),c=Da(c,c.next),Oa(o,t,n,r,i,a,0),Oa(c,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function Na(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Ea(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(Va(o))}i.sort(Pa);for(let e=0;e<i.length;e++)n=Fa(i[e],n);return n}function Pa(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function Fa(e,t){let n=Ia(e,t);if(!n)return t;let r=$a(n,e);return Da(r,r.next),Da(n,n.next)}function Ia(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(Ka(e,n))return n;do{if(Ka(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let c=o,l=o.x,u=o.y,d=1/0;n=o;do{if(r>=n.x&&n.x>=l&&r!==n.x&&Ha(i<u?r:a,i,l,u,i<u?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);Za(n,e)&&(t<d||t===d&&(n.x>o.x||n.x===o.x&&La(o,n)))&&(o=n,d=t)}n=n.next}while(n!==c);return o}function La(e,t){return Ga(e.prev,e,t.prev)<0&&Ga(t.next,e,e.next)<0}function Ra(e,t,n,r){let i=e;do i.z===0&&(i.z=Ba(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,za(i)}function za(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,c=0;for(let e=0;e<n&&(c++,o=o.nextZ,o);e++);let l=n;for(;c>0||l>0&&o;)c!==0&&(l===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,c--):(i=o,o=o.nextZ,l--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function Ba(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function Va(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function Ha(e,t,n,r,i,a,o,c){return(i-o)*(t-c)>=(e-o)*(a-c)&&(e-o)*(r-c)>=(n-o)*(t-c)&&(n-o)*(a-c)>=(i-o)*(r-c)}function Ua(e,t,n,r,i,a,o,c){return(e!==o||t!==c)&&Ha(e,t,n,r,i,a,o,c)}function Wa(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!Xa(e,t)&&(Za(e,t)&&Za(t,e)&&Qa(e,t)&&(Ga(e.prev,e,t.prev)||Ga(e,t.prev,t))||Ka(e,t)&&Ga(e.prev,e,e.next)>0&&Ga(t.prev,t,t.next)>0)}function Ga(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function Ka(e,t){return e.x===t.x&&e.y===t.y}function qa(e,t,n,r){let i=Ya(Ga(e,t,n)),a=Ya(Ga(e,t,r)),o=Ya(Ga(n,r,e)),c=Ya(Ga(n,r,t));return!!(i!==a&&o!==c||i===0&&Ja(e,n,t)||a===0&&Ja(e,r,t)||o===0&&Ja(n,e,r)||c===0&&Ja(n,t,r))}function Ja(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function Ya(e){return e>0?1:e<0?-1:0}function Xa(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&qa(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function Za(e,t){return Ga(e.prev,e,e.next)<0?Ga(e,t,e.next)>=0&&Ga(e,e.prev,t)>=0:Ga(e,t,e.prev)<0||Ga(e,e.next,t)<0}function Qa(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function $a(e,t){let n=no(e.i,e.x,e.y),r=no(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function eo(e,t,n,r){let i=no(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function to(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function no(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function ro(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var io=class{static triangulate(e,t,n=2){return Ta(e,t,n)}},ao=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];oo(e),so(n,e);let a=e.length;t.forEach(oo);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,so(n,t[e]);let o=io.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function oo(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function so(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var co=class e extends Er{constructor(e=new wa([new K(.5,.5),new K(-.5,.5),new K(-.5,-.5),new K(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new mr(r,3)),this.setAttribute(`uv`,new mr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,c=t.steps===void 0?1:t.steps,l=t.depth===void 0?1:t.depth,u=t.bevelEnabled===void 0||t.bevelEnabled,d=t.bevelThickness===void 0?.2:t.bevelThickness,f=t.bevelSize===void 0?d-.1:t.bevelSize,p=t.bevelOffset===void 0?0:t.bevelOffset,m=t.bevelSegments===void 0?3:t.bevelSegments,h=t.extrudePath,g=t.UVGenerator===void 0?lo:t.UVGenerator,_,v=!1,y,b,x,S;if(h){_=h.getSpacedPoints(c),v=!0,u=!1;let e=h.isCatmullRomCurve3?h.closed:!1;y=h.computeFrenetFrames(c,e),b=new q,x=new q,S=new q}u||(m=0,d=0,f=0,p=0);let C=e.extractPoints(o),w=C.shape,T=C.holes;if(!ao.isClockWise(w)){w=w.reverse();for(let e=0,t=T.length;e<t;e++){let t=T[e];ao.isClockWise(t)&&(T[e]=t.reverse())}}function E(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,c=a*a+o*o,l=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(c<=10000000000000001e-36*l*l){e.splice(r,1),n--;continue}t=i}}E(w),T.forEach(E);let D=T.length,O=w;for(let e=0;e<D;e++){let t=T[e];w=w.concat(t)}function k(e,t,n){return t||W(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let A=w.length;function j(e,t,n){let r,i,a,o=e.x-t.x,c=e.y-t.y,l=n.x-e.x,u=n.y-e.y,d=o*o+c*c,f=o*u-c*l;if(Math.abs(f)>2**-52){let f=Math.sqrt(d),p=Math.sqrt(l*l+u*u),m=t.x-c/f,h=t.y+o/f,g=n.x-u/p,_=n.y+l/p,v=((g-m)*u-(_-h)*l)/(o*u-c*l);r=m+o*v-e.x,i=h+c*v-e.y;let y=r*r+i*i;if(y<=2)return new K(r,i);a=Math.sqrt(y/2)}else{let e=!1;o>2**-52?l>2**-52&&(e=!0):o<-(2**-52)?l<-(2**-52)&&(e=!0):Math.sign(c)===Math.sign(u)&&(e=!0),e?(r=-c,i=o,a=Math.sqrt(d)):(r=o,i=c,a=Math.sqrt(d/2))}return new K(r/a,i/a)}let M=[];for(let e=0,t=O.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),M[e]=j(O[e],O[n],O[r]);let N=[],P,F=M.concat();for(let e=0,t=D;e<t;e++){let t=T[e];P=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),P[e]=j(t[e],t[r],t[i]);N.push(P),F=F.concat(P)}let I;if(m===0)I=ao.triangulateShape(O,T);else{let e=[],t=[];for(let n=0;n<m;n++){let r=n/m,i=d*Math.cos(r*Math.PI/2),a=f*Math.sin(r*Math.PI/2)+p;for(let t=0,n=O.length;t<n;t++){let n=k(O[t],M[t],a);ie(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=D;e<n;e++){let n=T[e];P=N[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=k(n[e],P[e],a);ie(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}I=ao.triangulateShape(e,t)}let L=I.length,ee=f+p;for(let e=0;e<A;e++){let t=u?k(w[e],F[e],ee):w[e];v?(x.copy(y.normals[0]).multiplyScalar(t.x),b.copy(y.binormals[0]).multiplyScalar(t.y),S.copy(_[0]).add(x).add(b),ie(S.x,S.y,S.z)):ie(t.x,t.y,0)}for(let e=1;e<=c;e++)for(let t=0;t<A;t++){let n=u?k(w[t],F[t],ee):w[t];v?(x.copy(y.normals[e]).multiplyScalar(n.x),b.copy(y.binormals[e]).multiplyScalar(n.y),S.copy(_[e]).add(x).add(b),ie(S.x,S.y,S.z)):ie(n.x,n.y,l/c*e)}for(let e=m-1;e>=0;e--){let t=e/m,n=d*Math.cos(t*Math.PI/2),r=f*Math.sin(t*Math.PI/2)+p;for(let e=0,t=O.length;e<t;e++){let t=k(O[e],M[e],r);ie(t.x,t.y,l+n)}for(let e=0,t=T.length;e<t;e++){let t=T[e];P=N[e];for(let e=0,i=t.length;e<i;e++){let i=k(t[e],P[e],r);v?ie(i.x,i.y+_[c-1].y,_[c-1].x+n):ie(i.x,i.y,l+n)}}}te(),ne();function te(){let e=r.length/3;if(u){let e=0,t=A*e;for(let e=0;e<L;e++){let n=I[e];ae(n[2]+t,n[1]+t,n[0]+t)}e=c+m*2,t=A*e;for(let e=0;e<L;e++){let n=I[e];ae(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<L;e++){let t=I[e];ae(t[2],t[1],t[0])}for(let e=0;e<L;e++){let t=I[e];ae(t[0]+A*c,t[1]+A*c,t[2]+A*c)}}n.addGroup(e,r.length/3-e,0)}function ne(){let e=r.length/3,t=0;re(O,t),t+=O.length;for(let e=0,n=T.length;e<n;e++){let n=T[e];re(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function re(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=c+m*2;e<n;e++){let n=A*e,a=A*(e+1);oe(t+r+n,t+i+n,t+i+a,t+r+a)}}}function ie(e,t,n){a.push(e),a.push(t),a.push(n)}function ae(e,t,i){R(e),R(t),R(i);let a=r.length/3,o=g.generateTopUV(n,r,a-3,a-2,a-1);se(o[0]),se(o[1]),se(o[2])}function oe(e,t,i,a){R(e),R(t),R(a),R(t),R(i),R(a);let o=r.length/3,c=g.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);se(c[0]),se(c[1]),se(c[3]),se(c[1]),se(c[2]),se(c[3])}function R(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function se(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return uo(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new xa[i.type]().fromJSON(i)),new e(r,t.options)}},lo={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],c=t[r*3],l=t[r*3+1],u=t[i*3],d=t[i*3+1];return[new K(a,o),new K(c,l),new K(u,d)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],c=t[n*3+1],l=t[n*3+2],u=t[r*3],d=t[r*3+1],f=t[r*3+2],p=t[i*3],m=t[i*3+1],h=t[i*3+2],g=t[a*3],_=t[a*3+1],v=t[a*3+2];return Math.abs(c-d)<Math.abs(o-u)?[new K(o,1-l),new K(u,1-f),new K(p,1-h),new K(g,1-v)]:[new K(c,1-l),new K(d,1-f),new K(m,1-h),new K(_,1-v)]}};function uo(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var fo=class e extends qi{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},po=class e extends Er{constructor(e=[new K(0,-.5),new K(.5,0),new K(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=G(r,0,Math.PI*2);let i=[],a=[],o=[],c=[],l=[],u=1/t,d=new q,f=new K,p=new q,m=new q,h=new q,g=0,_=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:g=e[t+1].x-e[t].x,_=e[t+1].y-e[t].y,p.x=_*1,p.y=-g,p.z=_*0,h.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case e.length-1:c.push(h.x,h.y,h.z);break;default:g=e[t+1].x-e[t].x,_=e[t+1].y-e[t].y,p.x=_*1,p.y=-g,p.z=_*0,m.copy(p),p.x+=h.x,p.y+=h.y,p.z+=h.z,p.normalize(),c.push(p.x,p.y,p.z),h.copy(m)}for(let i=0;i<=t;i++){let p=n+i*u*r,m=Math.sin(p),h=Math.cos(p);for(let n=0;n<=e.length-1;n++){d.x=e[n].x*m,d.y=e[n].y,d.z=e[n].x*h,a.push(d.x,d.y,d.z),f.x=i/t,f.y=n/(e.length-1),o.push(f.x,f.y);let r=c[3*n+0]*m,u=c[3*n+1],p=c[3*n+0]*h;l.push(r,u,p)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,c=r+e.length+1,l=r+1;i.push(a,o,l),i.push(c,l,o)}this.setIndex(i),this.setAttribute(`position`,new mr(a,3)),this.setAttribute(`uv`,new mr(o,2)),this.setAttribute(`normal`,new mr(l,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},mo=class e extends Er{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),c=Math.floor(r),l=o+1,u=c+1,d=e/o,f=t/c,p=[],m=[],h=[],g=[];for(let e=0;e<u;e++){let t=e*f-a;for(let n=0;n<l;n++){let r=n*d-i;m.push(r,-t,0),h.push(0,0,1),g.push(n/o),g.push(1-e/c)}}for(let e=0;e<c;e++)for(let t=0;t<o;t++){let n=t+l*e,r=t+l*(e+1),i=t+1+l*(e+1),a=t+1+l*e;p.push(n,r,a),p.push(r,i,a)}this.setIndex(p),this.setAttribute(`position`,new mr(m,3)),this.setAttribute(`normal`,new mr(h,3)),this.setAttribute(`uv`,new mr(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ho=class e extends Er{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],c=[],l=[],u=[],d=e,f=(t-e)/r,p=new q,m=new K;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;p.x=d*Math.cos(r),p.y=d*Math.sin(r),c.push(p.x,p.y,p.z),l.push(0,0,1),m.x=(p.x/t+1)/2,m.y=(p.y/t+1)/2,u.push(m.x,m.y)}d+=f}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,c=r+n+2,l=r+1;o.push(i,a,l),o.push(a,c,l)}}this.setIndex(o),this.setAttribute(`position`,new mr(c,3)),this.setAttribute(`normal`,new mr(l,3)),this.setAttribute(`uv`,new mr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},go=class e extends Er{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new q,f=new q,p=[],m=[],h=[],g=[];for(let p=0;p<=n;p++){let _=[],v=p/n,y=a+v*o,b=e*Math.cos(y),x=Math.sqrt(e*e-b*b),S=0;p===0&&a===0?S=.5/t:p===n&&c===Math.PI&&(S=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;d.x=-x*Math.cos(a),d.y=b,d.z=x*Math.sin(a),m.push(d.x,d.y,d.z),f.copy(d).normalize(),h.push(f.x,f.y,f.z),g.push(n+S,1-v),_.push(l++)}u.push(_)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=u[e][r+1],i=u[e][r],o=u[e+1][r],l=u[e+1][r+1];(e!==0||a>0)&&p.push(t,i,l),(e!==n-1||c<Math.PI)&&p.push(i,o,l)}this.setIndex(p),this.setAttribute(`position`,new mr(m,3)),this.setAttribute(`normal`,new mr(h,3)),this.setAttribute(`uv`,new mr(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},_o=class e extends Er{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let c=[],l=[],u=[],d=[],f=new q,p=new q,m=new q;for(let c=0;c<=n;c++){let h=a+c/n*o;for(let a=0;a<=r;a++){let o=a/r*i;p.x=(e+t*Math.cos(h))*Math.cos(o),p.y=(e+t*Math.cos(h))*Math.sin(o),p.z=t*Math.sin(h),l.push(p.x,p.y,p.z),f.x=e*Math.cos(o),f.y=e*Math.sin(o),m.subVectors(p,f).normalize(),u.push(m.x,m.y,m.z),d.push(a/r),d.push(c/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;c.push(n,i,o),c.push(i,a,o)}this.setIndex(c),this.setAttribute(`position`,new mr(l,3)),this.setAttribute(`normal`,new mr(u,3)),this.setAttribute(`uv`,new mr(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}};function vo(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(bo(i))i.isRenderTargetTexture?(U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(bo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function yo(e){let t={};for(let n=0;n<e.length;n++){let r=vo(e[n]);for(let e in r)t[e]=r[e]}return t}function bo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function xo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function So(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Mt.workingColorSpace}var Co={clone:vo,merge:yo},wo=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,To=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Eo=class extends Fr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=wo,this.fragmentShader=To,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vo(e.uniforms),this.uniformsGroups=xo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Ut().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new Jt().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Do=class extends Eo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Oo=class extends Fr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ko=class extends Fr{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new K(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new an,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ao=class extends Fr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=V,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},jo=class extends Fr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Mo(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function No(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var Po=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Fo=class extends Po{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ne,endingEnd:Ne}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],c=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case B:i=e,o=2*t-n;break;case Pe:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case B:a=e,c=2*n-t;break;case Pe:a=1,c=n+r[1]-r[0];break;default:a=e-1,c=t}let l=(n-t)*.5,u=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=i*u,this._offsetNext=a*u}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,p=this._weightNext,m=(n-t)/(r-t),h=m*m,g=h*m,_=-f*g+2*f*h-f*m,v=(1+f)*g+(-1.5-2*f)*h+(-.5+f)*m+1,y=(-1-p)*g+(1.5+p)*h+.5*m,b=p*g-p*h;for(let e=0;e!==o;++e)i[e]=_*a[u+e]+v*a[l+e]+y*a[c+e]+b*a[d+e];return i}},Io=class extends Po{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=(n-t)/(r-t),d=1-u;for(let e=0;e!==o;++e)i[e]=a[l+e]*d+a[c+e]*u;return i}},Lo=class extends Po{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ro=class extends Po{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let e=(n-t)/(r-t),u=1-e;for(let t=0;t!==o;++t)i[t]=a[l+t]*u+a[c+t]*e;return i}let f=o*2,p=e-1;for(let m=0;m!==o;++m){let o=a[l+m],h=a[c+m],g=p*f+m*2,_=d[g],v=d[g+1],y=e*f+m*2,b=u[y],x=u[y+1],S=Vo(n,t,_,b,r);i[m]=zo(S,o,v,x,h)}return i}};function zo(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Bo(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Vo(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=zo(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let c=Bo(a,t,n,r,i);if(Math.abs(c)<1e-10)break;a=Math.max(0,Math.min(1,a-o/c))}return a}var Ho=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Mo(t,this.TimeBufferType),this.values=Mo(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mo(e.times,Array),values:Mo(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),No(e.settings)&&(n.settings={inTangents:Mo(e.settings.inTangents,Array),outTangents:Mo(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Lo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Io(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Fo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ro(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ae:t=this.InterpolantFactoryMethodDiscrete;break;case z:t=this.InterpolantFactoryMethodLinear;break;case je:t=this.InterpolantFactoryMethodSmooth;break;case Me:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return U(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ae;case this.InterpolantFactoryMethodLinear:return z;case this.InterpolantFactoryMethodSmooth:return je;case this.InterpolantFactoryMethodBezier:return Me}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;No(this.settings)&&(Uo(this.settings.inTangents,e),Uo(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(W(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(W(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){W(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){W(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Ue(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){W(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===je,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,No(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Uo(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Ho.prototype.ValueTypeName=``,Ho.prototype.TimeBufferType=Float32Array,Ho.prototype.ValueBufferType=Float32Array,Ho.prototype.DefaultInterpolation=z;var Wo=class extends Ho{constructor(e,t,n){super(e,t,n)}};Wo.prototype.ValueTypeName=`bool`,Wo.prototype.ValueBufferType=Array,Wo.prototype.DefaultInterpolation=Ae,Wo.prototype.InterpolantFactoryMethodLinear=void 0,Wo.prototype.InterpolantFactoryMethodSmooth=void 0;var Go=class extends Ho{constructor(e,t,n,r){super(e,t,n,r)}};Go.prototype.ValueTypeName=`color`;var Ko=class extends Ho{constructor(e,t,n,r){super(e,t,n,r)}};Ko.prototype.ValueTypeName=`number`;var qo=class extends Po{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(r-t),l=e*o;for(let e=l+o;l!==e;l+=4)Tt.slerpFlat(i,0,a,l-o,a,l,c);return i}},Jo=class extends Ho{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new qo(this.times,this.values,this.getValueSize(),e)}};Jo.prototype.ValueTypeName=`quaternion`,Jo.prototype.InterpolantFactoryMethodSmooth=void 0;var Yo=class extends Ho{constructor(e,t,n){super(e,t,n)}};Yo.prototype.ValueTypeName=`string`,Yo.prototype.ValueBufferType=Array,Yo.prototype.DefaultInterpolation=Ae,Yo.prototype.InterpolantFactoryMethodLinear=void 0,Yo.prototype.InterpolantFactoryMethodSmooth=void 0;var Xo=class extends Ho{constructor(e,t,n,r){super(e,t,n,r)}};Xo.prototype.ValueTypeName=`vector`;var Zo=class extends Sn{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Qo=class extends Zo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},$o=new Jt,es=new q,ts=new q,ns=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new K(512,512),this.mapType=u,this.map=null,this.mapPass=null,this.matrix=new Jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ai,this._frameExtents=new K(1,1),this._viewportCount=1,this._viewports=[new Ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;es.setFromMatrixPosition(e.matrixWorld),t.position.copy(es),ts.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ts),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,r){$o.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix($o,e.coordinateSystem,e.reversedDepth);let i=this._frameExtents,a=r?r.z/i.x:1,o=r?r.w/i.y:1,c=r?r.x/i.x:0,l=r?r.y/i.y:0;e.coordinateSystem===2001||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply($o)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},rs=new q,is=new Tt,as=new q,os=class extends Sn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new Jt,this.projectionMatrix=new Jt,this.projectionMatrixInverse=new Jt,this.coordinateSystem=Ve,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(rs,is,as),as.x===1&&as.y===1&&as.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rs,is,as.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(rs,is,as),as.x===1&&as.y===1&&as.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rs,is,as.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ss=new q,cs=new K,ls=new K,us=class extends os{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=nt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(tt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nt*2*Math.atan(Math.tan(tt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ss.x,ss.y).multiplyScalar(-e/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ss.x,ss.y).multiplyScalar(-e/ss.z)}getViewSize(e,t){return this.getViewBounds(e,cs,ls),t.subVectors(ls,cs)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(tt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ds=class extends os{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,c=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,c=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},fs=class extends ns{constructor(){super(new ds(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ps=class extends Zo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Sn.DEFAULT_UP),this.updateMatrix(),this.target=new Sn,this.shadow=new fs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ms=-90,hs=1,gs=class extends Sn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new us(ms,hs,e,t);r.layers=this.layers,this.add(r);let i=new us(ms,hs,e,t);i.layers=this.layers,this.add(i);let a=new us(ms,hs,e,t);a.layers=this.layers,this.add(a);let o=new us(ms,hs,e,t);o.layers=this.layers,this.add(o);let c=new us(ms,hs,e,t);c.layers=this.layers,this.add(c);let l=new us(ms,hs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,c]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,c,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let h=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let g=!1;g=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=h,e.setRenderTarget(n,5,r),g&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}},_s=class extends us{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vs=`\\[\\]\\.:\\/`,ys=RegExp(`[\\[\\]\\.:\\/]`,`g`),bs=`[^\\[\\]\\.:\\/]`,xs=`[^`+vs.replace(`\\.`,``)+`]`,Ss=`((?:WC+[\\/:])*)`.replace(`WC`,bs),Cs=`(WCOD+)?`.replace(`WCOD`,xs),ws=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,bs),Ts=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,bs),Es=RegExp(`^`+Ss+Cs+ws+Ts+`$`),Ds=[`material`,`materials`,`bones`,`map`],Os=class{constructor(e,t,n){let r=n||ks.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ks=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ys,``)}static parseTrackName(e){let t=Es.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ds.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){U(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){W(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;W(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let c=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?c=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(c=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][c]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ks.Composite=Os,ks.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ks.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ks.prototype.GetterByBindingType=[ks.prototype._getValue_direct,ks.prototype._getValue_array,ks.prototype._getValue_arrayElement,ks.prototype._getValue_toArray],ks.prototype.SetterByBindingTypeAndVersioning=[[ks.prototype._setValue_direct,ks.prototype._setValue_direct_setNeedsUpdate,ks.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ks.prototype._setValue_array,ks.prototype._setValue_array_setNeedsUpdate,ks.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ks.prototype._setValue_arrayElement,ks.prototype._setValue_arrayElement_setNeedsUpdate,ks.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ks.prototype._setValue_fromArray,ks.prototype._setValue_fromArray_setNeedsUpdate,ks.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var As=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,U(`Clock: This module has been deprecated. Please use THREE.Timer instead.`)}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function js(e,t,n,r){let i=Ms(r);switch(n){case C:return e*t;case O:return e*t/i.components*i.byteLength;case k:return e*t/i.components*i.byteLength;case A:return e*t*2/i.components*i.byteLength;case j:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case M:return e*t*4/i.components*i.byteLength;case N:case P:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case F:case I:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ee:case ne:return Math.max(e,16)*Math.max(t,8)/4;case L:case te:return Math.max(e,8)*Math.max(t,8)/2;case re:case ie:case oe:case R:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ae:case se:case ce:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case le:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ue:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case de:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case fe:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case pe:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case me:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case he:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case ge:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case _e:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ye:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case be:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xe:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Se:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ce:case we:case Te:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ee:case De:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Oe:case ke:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Ms(e){switch(e){case u:case d:return{byteLength:1,components:1};case p:case f:case _:return{byteLength:2,components:1};case v:case y:return{byteLength:2,components:4};case h:case m:case g:return{byteLength:4,components:1};case x:case S:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?U(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function Ns(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ps(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let c;if(r instanceof Float32Array)c=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)c=e.HALF_FLOAT;else if(r instanceof Uint16Array)c=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)c=e.SHORT;else if(r instanceof Uint32Array)c=e.UNSIGNED_INT;else if(r instanceof Int32Array)c=e.INT;else if(r instanceof Int8Array)c=e.BYTE;else if(r instanceof Uint8Array)c=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)c=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:c,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Z={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Q={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new J}},envmap:{envMap:{value:null},envMapRotation:{value:new J},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new J}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new J}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new J},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new J},normalScale:{value:new K(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new J},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new J}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new J}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new J}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0},uvTransform:{value:new J}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new K(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new J},alphaMap:{value:null},alphaMapTransform:{value:new J},alphaTest:{value:0}}},Fs={basic:{uniforms:yo([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.fog]),vertexShader:Z.meshbasic_vert,fragmentShader:Z.meshbasic_frag},lambert:{uniforms:yo([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:Z.meshlambert_vert,fragmentShader:Z.meshlambert_frag},phong:{uniforms:yo([Q.common,Q.specularmap,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,Q.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Z.meshphong_vert,fragmentShader:Z.meshphong_frag},standard:{uniforms:yo([Q.common,Q.envmap,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.roughnessmap,Q.metalnessmap,Q.fog,Q.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag},toon:{uniforms:yo([Q.common,Q.aomap,Q.lightmap,Q.emissivemap,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.gradientmap,Q.fog,Q.lights,{emissive:{value:new Y(0)}}]),vertexShader:Z.meshtoon_vert,fragmentShader:Z.meshtoon_frag},matcap:{uniforms:yo([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,Q.fog,{matcap:{value:null}}]),vertexShader:Z.meshmatcap_vert,fragmentShader:Z.meshmatcap_frag},points:{uniforms:yo([Q.points,Q.fog]),vertexShader:Z.points_vert,fragmentShader:Z.points_frag},dashed:{uniforms:yo([Q.common,Q.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Z.linedashed_vert,fragmentShader:Z.linedashed_frag},depth:{uniforms:yo([Q.common,Q.displacementmap]),vertexShader:Z.depth_vert,fragmentShader:Z.depth_frag},normal:{uniforms:yo([Q.common,Q.bumpmap,Q.normalmap,Q.displacementmap,{opacity:{value:1}}]),vertexShader:Z.meshnormal_vert,fragmentShader:Z.meshnormal_frag},sprite:{uniforms:yo([Q.sprite,Q.fog]),vertexShader:Z.sprite_vert,fragmentShader:Z.sprite_frag},background:{uniforms:{uvTransform:{value:new J},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Z.background_vert,fragmentShader:Z.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new J}},vertexShader:Z.backgroundCube_vert,fragmentShader:Z.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Z.cube_vert,fragmentShader:Z.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Z.equirect_vert,fragmentShader:Z.equirect_frag},distance:{uniforms:yo([Q.common,Q.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Z.distance_vert,fragmentShader:Z.distance_frag},shadow:{uniforms:yo([Q.lights,Q.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:Z.shadow_vert,fragmentShader:Z.shadow_frag}};Fs.physical={uniforms:yo([Fs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new J},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new J},clearcoatNormalScale:{value:new K(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new J},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new J},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new J},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new J},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new J},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new J},transmissionSamplerSize:{value:new K},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new J},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new J},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new J},anisotropyVector:{value:new K},anisotropyMap:{value:null},anisotropyMapTransform:{value:new J}}]),vertexShader:Z.meshphysical_vert,fragmentShader:Z.meshphysical_frag};var Is={r:0,b:0,g:0},Ls=new Jt,Rs=new J;Rs.set(-1,0,0,0,1,0,0,0,1);function zs(e,t,n,r,i,a){let o=new Y(0),c=i===!0?0:1,l,u,d=null,f=0,p=null;function m(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function h(t){let r=!1,i=m(t);i===null?_(o,c):i&&i.isColor&&(_(i,1),r=!0);let l=e.xr.getEnvironmentBlendMode();l===`additive`?n.buffers.color.setClear(0,0,0,1,a):l===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function g(t,n){let i=m(n);i&&(i.isCubeTexture||i.mapping===306)?(u===void 0&&(u=new X(new Ui(1,1,1),new Eo({name:`BackgroundCubeMaterial`,uniforms:vo(Fs.backgroundCube.uniforms),vertexShader:Fs.backgroundCube.vertexShader,fragmentShader:Fs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute(`normal`),u.geometry.deleteAttribute(`uv`),u.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(u)),u.material.uniforms.envMap.value=i,u.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Ls.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&u.material.uniforms.backgroundRotation.value.premultiply(Rs),u.material.toneMapped=Mt.getTransfer(i.colorSpace)!==Le,(d!==i||f!==i.version||p!==e.toneMapping)&&(u.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),u.layers.enableAll(),t.unshift(u,u.geometry,u.material,0,0,null)):i&&i.isTexture&&(l===void 0&&(l=new X(new mo(2,2),new Eo({name:`BackgroundMaterial`,uniforms:vo(Fs.background.uniforms),vertexShader:Fs.background.vertexShader,fragmentShader:Fs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=i,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.toneMapped=Mt.getTransfer(i.colorSpace)!==Le,i.matrixAutoUpdate===!0&&i.updateMatrix(),l.material.uniforms.uvTransform.value.copy(i.matrix),(d!==i||f!==i.version||p!==e.toneMapping)&&(l.material.needsUpdate=!0,d=i,f=i.version,p=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null))}function _(t,r){t.getRGB(Is,So(e)),n.buffers.color.setClear(Is.r,Is.g,Is.b,r,a)}function v(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),c=t,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(e){c=e,_(o,c)},render:h,addToRenderList:g,dispose:v}}function Bs(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=p(null),a=i,o=!1;function c(n,r,i,c,l){let d=!1,p=f(n,c,i,r);a!==p&&(a=p,u(a.object)),d=m(n,c,i,l),d&&h(n,c,i,l),l!==null&&t.update(l,e.ELEMENT_ARRAY_BUFFER),(d||o)&&(o=!1,x(n,r,i,c),l!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(l).buffer))}function l(){return e.createVertexArray()}function u(t){return e.bindVertexArray(t)}function d(t){return e.deleteVertexArray(t)}function f(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let c=e.isInstancedMesh===!0?e.id:0,u=o[c];u===void 0&&(u={},o[c]=u);let d=u[n.id];d===void 0&&(d={},u[n.id]=d);let f=d[a];return f===void 0&&(f=p(l()),d[a]=f),f}function p(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function m(e,t,n,r){let i=a.attributes,o=t.attributes,c=0,l=n.getAttributes();for(let t in l)if(l[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;c++}return a.attributesNum!==c||a.index!==r}function h(e,t,n,r){let i={},o=t.attributes,c=0,l=n.getAttributes();for(let t in l)if(l[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,c++}a.attributes=i,a.attributesNum=c,a.index=r}function g(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function _(e){v(e,0)}function v(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function y(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function b(t,n,r,i,a,o,c){c===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function x(n,r,i,a){g();let o=a.attributes,c=i.getAttributes(),l=r.defaultAttributeValues;for(let r in c){let i=c[r];if(i.location>=0){let c=o[r];if(c===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(c=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(c=n.instanceColor)),c!==void 0){let r=c.normalized,o=c.itemSize,l=t.get(c);if(l===void 0)continue;let u=l.buffer,d=l.type,f=l.bytesPerElement,p=d===e.INT||d===e.UNSIGNED_INT||c.gpuType===1013;if(c.isInterleavedBufferAttribute){let t=c.data,l=t.stride,m=c.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)v(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)_(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<i.locationSize;e++)b(i.location+e,o/i.locationSize,d,r,l*f,(m+o/i.locationSize*e)*f,p)}else{if(c.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)v(i.location+e,c.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=c.meshPerAttribute*c.count)}else for(let e=0;e<i.locationSize;e++)_(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,u);for(let e=0;e<i.locationSize;e++)b(i.location+e,o/i.locationSize,d,r,o*f,o/i.locationSize*e*f,p)}}else if(l!==void 0){let t=l[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}y()}function S(){E();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)d(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function C(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)d(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function w(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)d(i[e].object),delete i[e];delete r[e.id]}}}function T(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)d(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function E(){D(),o=!0,a!==i&&(a=i,u(a.object))}function D(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:c,reset:E,resetDefaultState:D,dispose:S,releaseStatesOfGeometry:C,releaseStatesOfObject:T,releaseStatesOfProgram:w,initAttributes:g,enableAttribute:_,disableUnusedAttributes:y}}function Vs(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function c(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=c}function Hs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function c(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function l(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let u=n.precision===void 0?`highp`:n.precision,d=l(u);d!==u&&(U(`WebGLRenderer:`,u,`not supported, using`,d,`instead.`),u=d);let f=n.logarithmicDepthBuffer===!0,p=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&p===!1&&U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_TEXTURE_SIZE),_=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),v=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),b=e.getParameter(e.MAX_VARYING_VECTORS),x=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),S=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:c,precision:u,logarithmicDepthBuffer:f,reversedDepthBuffer:p,maxTextures:m,maxVertexTextures:h,maxTextureSize:g,maxCubemapSize:_,maxAttributes:v,maxVertexUniforms:y,maxVaryings:b,maxFragmentUniforms:x,maxSamples:S,samples:C}}function Us(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Nr,c=new J,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=d(e,t,0)},this.setState=function(t,o,c){let f=t.clippingPlanes,p=t.clipIntersection,m=t.clipShadows,h=e.get(t);if(!i||f===null||f.length===0||a&&!m)a?d(null):u();else{let e=a?0:r,t=e*4,i=h.clippingState||null;l.value=i,i=d(f,o,t,c);for(let e=0;e!==t;++e)i[e]=n[e];h.clippingState=i,this.numIntersection=p?this.numPlanes:0,this.numPlanes+=e}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function d(e,n,r,i){let a=e===null?0:e.length,u=null;if(a!==0){if(u=l.value,i!==!0||u===null){let t=r+a*4,i=n.matrixWorldInverse;c.getNormalMatrix(i),(u===null||u.length<t)&&(u=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,c),o.normal.toArray(u,n),u[n+3]=o.constant}l.value=u,l.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,u}}var Ws=4,Gs=6,Ks=20,qs=256,Js=new ds,Ys=new Y,Xs=null,Zs=0,Qs=0,$s=!1,ec=new q,tc=new q,nc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=ec}=i;Xs=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),Qs=this._renderer.getActiveMipmapLevel(),$s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,r,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Xs,Zs,Qs),this._renderer.xr.enabled=$s,e.scissorTest=!1,ac(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Xs=this._renderer.getRenderTarget(),Zs=this._renderer.getActiveCubeFace(),Qs=this._renderer.getActiveMipmapLevel(),$s=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:o,minFilter:o,generateMipmaps:!1,type:_,format:T,colorSpace:H,depthBuffer:!1},r=ic(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ic(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=rc(r)),this._blurMaterial=sc(r,e,t),this._ggxMaterial=oc(r,e,t)}return r}_compileMaterial(e){let t=new X(new Er,e);this._renderer.compile(t,Js)}_sceneToCubeUV(e,t,n,r,i){let a=new us(90,1,t,n),o=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],l=this._renderer,u=l.autoClear,d=l.toneMapping;l.getClearColor(Ys),l.toneMapping=0,l.autoClear=!1,l.state.buffers.depth.getReversed()&&(l.setRenderTarget(r),l.clearDepth(),l.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new X(new Ui,new ri({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let f=this._backgroundBox,p=f.material,m=!1,h=e.background;h?h.isColor&&(p.color.copy(h),e.background=null,m=!0):(p.color.copy(Ys),m=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+c[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+c[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+c[t]));let u=this._cubeSize;ac(r,n*u,t>2?u:0,u,u),l.setRenderTarget(r),m&&l.render(f,a),l.render(e,a)}l.toneMapping=d,l.autoClear=u,e.background=h}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let c=this._cubeSize;ac(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Js)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let c=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u)*(l*1.25),{_lodMax:f}=this,p=this._sizeLods[n],m=3*p*(n>f-Ws?n-f+Ws:0),h=4*(this._cubeSize-p);c.envMap.value=e.texture,c.roughness.value=d,c.mipInt.value=f-t,ac(i,m,h,3*p,2*p),r.setRenderTarget(i),r.render(o,Js),c.envMap.value=i.texture,c.roughness.value=0,c.mipInt.value=f-n,ac(e,m,h,3*p,2*p),r.setRenderTarget(e),r.render(o,Js)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[r];c.material=o;let l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=i,l.mipInt.value=this._lodMax-n;let u=this._sizeLods[r];ac(t,3*u*(r>this._lodMax-Ws?r-this._lodMax+Ws:0),4*(this._cubeSize-u),3*u,2*u),a.setRenderTarget(t),a.render(c,Js)}};function rc(e){let t=[],n=[],r=e,i=e-Ws+1+Gs;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,c=[a,a,o,a,o,o,a,a,o,o,a,o],l=new Float32Array(108),u=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];l.set(r,18*e);for(let t=0;t<6;t++){let n=c[t*2]*2-1,r=c[t*2+1]*2-1;e===0?tc.set(1,r,n):e===1?tc.set(-n,1,-r):e===2?tc.set(-n,r,1):e===3?tc.set(-1,r,-n):e===4?tc.set(-n,-1,r):tc.set(n,r,-1),tc.toArray(u,(e*6+t)*3)}}let d=new Er;d.setAttribute(`position`,new dr(l,3)),d.setAttribute(`outputDirection`,new dr(u,3)),n.push(new X(d,null)),r>Ws&&r--}return{lodMeshes:n,sizeLods:t}}function ic(e,t,n){let r=new Gt(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function ac(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function oc(e,t,n){return new Eo({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:qs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:uc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function sc(e,t,n){return new Eo({name:`SphericalGaussianBlur`,defines:{SAMPLES:Ks,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:uc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function cc(){return new Eo({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function lc(){return new Eo({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function uc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var dc=class extends Gt{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Ri(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ui(5,5,5),i=new Eo({name:`CubemapFromEquirect`,uniforms:vo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new X(r,i),c=t.minFilter;return t.minFilter===1008&&(t.minFilter=o),new gs(1,10,this).update(e,a),t.minFilter=c,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function fc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return c(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new dc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,u),c(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),c=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==c)return r===null&&(r=new nc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let c=t.image;return a&&c&&c.height>0||o&&c&&l(c)?(r===null&&(r=new nc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,d),i.texture):null}}}return t}function c(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function l(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function u(e){let n=e.target;n.removeEventListener(`dispose`,u);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function d(e){let t=e.target;t.removeEventListener(`dispose`,d);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function f(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:f}}function pc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ye(`WebGLRenderer: `+e+` extension not supported.`),t}}}function mc(e,t,n,r){let i={},a=new WeakMap;function o(e){let c=e.target;c.index!==null&&t.remove(c.index);for(let e in c.attributes)t.remove(c.attributes[e]);c.removeEventListener(`dispose`,o),delete i[c.id];let l=a.get(c);l&&(t.remove(l),a.delete(c)),r.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,n.memory.geometries--}function c(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function l(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function u(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let c=new(i.count>=65535?pr:fr)(n,1);c.version=o;let l=a.get(e);l&&t.remove(l),a.set(e,c)}function d(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&u(e)}else u(e);return a.get(e)}return{get:c,update:l,getWireframeAttribute:d}}function hc(e,t,n){let r;function i(e){r=e}let a,o;function c(e){a=e.type,o=e.bytesPerElement}function l(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function u(t,i,c){c!==0&&(e.drawElementsInstanced(r,i,a,t*o,c),n.update(i,r,c))}function d(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let c=0;for(let e=0;e<o;e++)c+=i[e];n.update(c,r,1)}this.setMode=i,this.setIndex=c,this.render=l,this.renderInstances=u,this.renderMultiDraw=d}function gc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:W(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function _c(e,t,n){let r=new WeakMap,i=new Ut;function a(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u===void 0?0:u.length,f=r.get(o);if(f===void 0||f.count!==d){f!==void 0&&f.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,c=o.morphAttributes.position||[],l=o.morphAttributes.normal||[],u=o.morphAttributes.color||[],p=0;e===!0&&(p=1),n===!0&&(p=2),a===!0&&(p=3);let m=o.attributes.position.count*p,h=1;m>t.maxTextureSize&&(h=Math.ceil(m/t.maxTextureSize),m=t.maxTextureSize);let _=new Float32Array(m*h*4*d),v=new Kt(_,m,h,d);v.type=g,v.needsUpdate=!0;let y=p*4;for(let t=0;t<d;t++){let r=c[t],o=l[t],d=u[t],f=m*h*4*t;for(let t=0;t<r.count;t++){let c=t*y;e===!0&&(i.fromBufferAttribute(r,t),_[f+c+0]=i.x,_[f+c+1]=i.y,_[f+c+2]=i.z,_[f+c+3]=0),n===!0&&(i.fromBufferAttribute(o,t),_[f+c+4]=i.x,_[f+c+5]=i.y,_[f+c+6]=i.z,_[f+c+7]=0),a===!0&&(i.fromBufferAttribute(d,t),_[f+c+8]=i.x,_[f+c+9]=i.y,_[f+c+10]=i.z,_[f+c+11]=d.itemSize===4?i.w:1)}}f={count:d,texture:v,size:new K(m,h)},r.set(o,f);function b(){v.dispose(),r.delete(o),o.removeEventListener(`dispose`,b)}o.addEventListener(`dispose`,b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<l.length;e++)t+=l[e];let n=o.morphTargetsRelative?1:1-t;c.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),c.getUniforms().setValue(e,`morphTargetInfluences`,l)}c.getUniforms().setValue(e,`morphTargetsTexture`,f.texture,n),c.getUniforms().setValue(e,`morphTargetsTextureSize`,f.size)}return{update:a}}function vc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,c=r.geometry,u=t.get(r,c);if(a.get(u)!==o&&(t.update(u),a.set(u,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,l)===!1&&r.addEventListener(`dispose`,l),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return u}function c(){a=new WeakMap}function l(e){let t=e.target;t.removeEventListener(`dispose`,l),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:c}}var yc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function bc(e,t,n,r,i,a){let o=new Gt(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),c=null,l=null,u=new Er;u.setAttribute(`position`,new mr([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute(`uv`,new mr([0,2,0,0,2,0],2));let d=new Do({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),f=new X(u,d),p=new ds(-1,1,1,-1,0,1),m=null,h=null,g=!1,v,y=null,b=[],x=!1;this.setSize=function(e,t){o.setSize(e,t),c!==null&&c.setSize(e,t),l!==null&&l.setSize(e,t);for(let n=0;n<b.length;n++){let r=b[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){b=e,x=b.length>0&&b[0].isRenderPass===!0;let t=o.width,n=o.height;b.length>0&&c===null&&(c=new Gt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}),l=new Gt(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<b.length;e++){let r=b[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(g||e.toneMapping===0&&b.length===0)return!1;if(y=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return x===!1&&e.setRenderTarget(o),v=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return x},this.end=function(e,t){e.toneMapping=v,g=!0;let n=o,r=c;for(let i=0;i<b.length;i++){let a=b[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===c?l:c))}if(m!==e.outputColorSpace||h!==e.toneMapping){m=e.outputColorSpace,h=e.toneMapping,d.defines={},Mt.getTransfer(m)===`srgb`&&(d.defines.SRGB_TRANSFER=``);let t=yc[h];t&&(d.defines[t]=``),d.needsUpdate=!0}d.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(y),e.render(f,p),y=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.dispose(),c!==null&&c.dispose(),l!==null&&l.dispose(),u.dispose(),d.dispose()}}var xc=new Ht,Sc=new Bi(1,1),Cc=new Kt,wc=new qt,Tc=new Ri,Ec=[],Dc=[],Oc=new Float32Array(16),kc=new Float32Array(9),Ac=new Float32Array(4);function jc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Ec[i];if(a===void 0&&(a=new Float32Array(i),Ec[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Mc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Nc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Pc(e,t){let n=Dc[t];n===void 0&&(n=new Int32Array(t),Dc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Fc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ic(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mc(n,t))return;e.uniform2fv(this.addr,t),Nc(n,t)}}function Lc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Mc(n,t))return;e.uniform3fv(this.addr,t),Nc(n,t)}}function Rc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mc(n,t))return;e.uniform4fv(this.addr,t),Nc(n,t)}}function zc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Mc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Nc(n,t)}else{if(Mc(n,r))return;Ac.set(r),e.uniformMatrix2fv(this.addr,!1,Ac),Nc(n,r)}}function Bc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Mc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Nc(n,t)}else{if(Mc(n,r))return;kc.set(r),e.uniformMatrix3fv(this.addr,!1,kc),Nc(n,r)}}function Vc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Mc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Nc(n,t)}else{if(Mc(n,r))return;Oc.set(r),e.uniformMatrix4fv(this.addr,!1,Oc),Nc(n,r)}}function Hc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Uc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mc(n,t))return;e.uniform2iv(this.addr,t),Nc(n,t)}}function Wc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mc(n,t))return;e.uniform3iv(this.addr,t),Nc(n,t)}}function Gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mc(n,t))return;e.uniform4iv(this.addr,t),Nc(n,t)}}function Kc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function qc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mc(n,t))return;e.uniform2uiv(this.addr,t),Nc(n,t)}}function Jc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mc(n,t))return;e.uniform3uiv(this.addr,t),Nc(n,t)}}function Yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mc(n,t))return;e.uniform4uiv(this.addr,t),Nc(n,t)}}function Xc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Sc.compareFunction=n.isReversedDepthBuffer()?518:515,a=Sc):a=xc,n.setTexture2D(t||a,i)}function Zc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||wc,i)}function Qc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Tc,i)}function $c(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Cc,i)}function el(e){switch(e){case 5126:return Fc;case 35664:return Ic;case 35665:return Lc;case 35666:return Rc;case 35674:return zc;case 35675:return Bc;case 35676:return Vc;case 5124:case 35670:return Hc;case 35667:case 35671:return Uc;case 35668:case 35672:return Wc;case 35669:case 35673:return Gc;case 5125:return Kc;case 36294:return qc;case 36295:return Jc;case 36296:return Yc;case 35678:case 36198:case 36298:case 36306:case 35682:return Xc;case 35679:case 36299:case 36307:return Zc;case 35680:case 36300:case 36308:case 36293:return Qc;case 36289:case 36303:case 36311:case 36292:return $c}}function tl(e,t){e.uniform1fv(this.addr,t)}function nl(e,t){let n=jc(t,this.size,2);e.uniform2fv(this.addr,n)}function rl(e,t){let n=jc(t,this.size,3);e.uniform3fv(this.addr,n)}function il(e,t){let n=jc(t,this.size,4);e.uniform4fv(this.addr,n)}function al(e,t){let n=jc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ol(e,t){let n=jc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function sl(e,t){let n=jc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function cl(e,t){e.uniform1iv(this.addr,t)}function ll(e,t){e.uniform2iv(this.addr,t)}function ul(e,t){e.uniform3iv(this.addr,t)}function dl(e,t){e.uniform4iv(this.addr,t)}function fl(e,t){e.uniform1uiv(this.addr,t)}function pl(e,t){e.uniform2uiv(this.addr,t)}function ml(e,t){e.uniform3uiv(this.addr,t)}function hl(e,t){e.uniform4uiv(this.addr,t)}function gl(e,t,n){let r=this.cache,i=t.length,a=Pc(n,i);Mc(r,a)||(e.uniform1iv(this.addr,a),Nc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Sc:xc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function _l(e,t,n){let r=this.cache,i=t.length,a=Pc(n,i);Mc(r,a)||(e.uniform1iv(this.addr,a),Nc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||wc,a[e])}function vl(e,t,n){let r=this.cache,i=t.length,a=Pc(n,i);Mc(r,a)||(e.uniform1iv(this.addr,a),Nc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Tc,a[e])}function yl(e,t,n){let r=this.cache,i=t.length,a=Pc(n,i);Mc(r,a)||(e.uniform1iv(this.addr,a),Nc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Cc,a[e])}function bl(e){switch(e){case 5126:return tl;case 35664:return nl;case 35665:return rl;case 35666:return il;case 35674:return al;case 35675:return ol;case 35676:return sl;case 5124:case 35670:return cl;case 35667:case 35671:return ll;case 35668:case 35672:return ul;case 35669:case 35673:return dl;case 5125:return fl;case 36294:return pl;case 36295:return ml;case 36296:return hl;case 35678:case 36198:case 36298:case 36306:case 35682:return gl;case 35679:case 36299:case 36307:return _l;case 35680:case 36300:case 36308:case 36293:return vl;case 36289:case 36303:case 36311:case 36292:return yl}}var xl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=el(t.type)}},Sl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bl(t.type)}},Cl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},wl=/(\w+)(\])?(\[|\.)?/g;function Tl(e,t){e.seq.push(t),e.map[t.id]=t}function El(e,t,n){let r=e.name,i=r.length;for(wl.lastIndex=0;;){let a=wl.exec(r),o=wl.lastIndex,c=a[1],l=a[2]===`]`,u=a[3];if(l&&(c|=0),u===void 0||u===`[`&&o+2===i){Tl(n,u===void 0?new xl(c,e,t):new Sl(c,e,t));break}{let e=n.map[c];e===void 0&&(e=new Cl(c),Tl(n,e)),n=e}}}var Dl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);El(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ol(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var kl=37297,Al=0;function jl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Ml=new J;function Nl(e){Mt._getMatrix(Ml,Mt.workingColorSpace,e);let t=`mat3( ${Ml.elements.map(e=>e.toFixed(4))} )`;switch(Mt.getTransfer(e)){case Ie:return[t,`LinearTransferOETF`];case Le:return[t,`sRGBTransferOETF`];default:return U(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Pl(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+jl(e.getShaderSource(t),r)}return i}function Fl(e,t){let n=Nl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Il={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Ll(e,t){let n=Il[t];return n===void 0?(U(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Rl=new q;function zl(){return Mt.getLuminanceCoefficients(Rl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Rl.x.toFixed(4)}, ${Rl.y.toFixed(4)}, ${Rl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Bl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Ul).join(`
`)}function Vl(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Hl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ul(e){return e!==``}function Wl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gl(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Kl=/^[ \t]*#include +<([\w\d./]+)>/gm;function ql(e){return e.replace(Kl,Yl)}var Jl=new Map;function Yl(e,t){let n=Z[t];if(n===void 0){let e=Jl.get(t);if(e!==void 0)n=Z[e],U(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return ql(n)}var Xl=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zl(e){return e.replace(Xl,Ql)}function Ql(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function $l(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var eu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function tu(e){return eu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var nu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function ru(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:nu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var iu={302:`ENVMAP_MODE_REFRACTION`};function au(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:iu[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var ou={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function su(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:ou[e.combine]||`ENVMAP_BLENDING_NONE`}function cu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function lu(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,c=n.fragmentShader,l=tu(n),u=ru(n),d=au(n),f=su(n),p=cu(n),m=Bl(n),h=Vl(a),g=i.createProgram(),_,v,y=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(Ul).join(`
`),_.length>0&&(_+=`
`),v=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h].filter(Ul).join(`
`),v.length>0&&(v+=`
`)):(_=[$l(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+d:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+l:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Ul).join(`
`),v=[$l(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,h,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,n.envMap?`#define `+f:``,p?`#define CUBEUV_TEXEL_WIDTH `+p.texelWidth:``,p?`#define CUBEUV_TEXEL_HEIGHT `+p.texelHeight:``,p?`#define CUBEUV_MAX_MIP `+p.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+l:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Z.tonemapping_pars_fragment,n.toneMapping===0?``:Ll(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Z.colorspace_pars_fragment,Fl(`linearToOutputTexel`,n.outputColorSpace),zl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Ul).join(`
`)),o=ql(o),o=Wl(o,n),o=Gl(o,n),c=ql(c),c=Wl(c,n),c=Gl(c,n),o=Zl(o),c=Zl(c),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,_=[m,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+_,v=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+v);let b=y+_+o,x=y+v+c,S=Ol(i,i.VERTEX_SHADER,b),C=Ol(i,i.FRAGMENT_SHADER,x);i.attachShader(g,S),i.attachShader(g,C),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,`position`):i.bindAttribLocation(g,0,n.index0AttributeName),i.linkProgram(g);function w(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(g)||``,r=i.getShaderInfoLog(S)||``,a=i.getShaderInfoLog(C)||``,o=n.trim(),c=r.trim(),l=a.trim(),u=!0,d=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1){if(u=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,g,S,C);else{let e=Pl(i,S,`vertex`),n=Pl(i,C,`fragment`);W(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(c===``||l===``)&&(d=!1):U(`WebGLProgram: Program Info Log:`,o);d&&(t.diagnostics={runnable:u,programLog:o,vertexShader:{log:c,prefix:_},fragmentShader:{log:l,prefix:v}})}i.deleteShader(S),i.deleteShader(C),T=new Dl(i,g),E=Hl(i,g)}let T;this.getUniforms=function(){return T===void 0&&w(this),T};let E;this.getAttributes=function(){return E===void 0&&w(this),E};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=i.getProgramParameter(g,kl)),D},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Al++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=C,this}var uu=0,du=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new fu(e),t.set(e,n)),n}},fu=class{constructor(e){this.id=uu++,this.code=e,this.usedTimes=0}};function pu(e){return e===1030||e===37490||e===36285}function mu(e,t,n,r,i,a){let o=new on,c=new du,l=new Set,u=[],d=new Map,f=r.logarithmicDepthBuffer,p=r.precision,m={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function h(e){return l.add(e),e===0?`uv`:`uv${e}`}function g(i,o,u,d,g,_){let v=d.fog,y=g.geometry,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?d.environment:null,x=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,S=t.get(i.envMap||b,x),C=S&&S.mapping===306?S.image.height:null,w=m[i.type];i.precision!==null&&(p=r.getMaxPrecision(i.precision),p!==i.precision&&U(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,p,`instead.`));let T=y.morphAttributes.position||y.morphAttributes.normal||y.morphAttributes.color,E=T===void 0?0:T.length,D=0;y.morphAttributes.position!==void 0&&(D=1),y.morphAttributes.normal!==void 0&&(D=2),y.morphAttributes.color!==void 0&&(D=3);let O,k,A,j;if(w){let e=Fs[w];O=e.vertexShader,k=e.fragmentShader}else{O=i.vertexShader,k=i.fragmentShader;let e=c.getVertexShaderStage(i),t=c.getFragmentShaderStage(i);c.update(i,e,t),A=e.id,j=t.id}let M=e.getRenderTarget(),N=e.state.buffers.depth.getReversed(),P=g.isInstancedMesh===!0,F=g.isBatchedMesh===!0,I=!!i.map,L=!!i.matcap,ee=!!S,te=!!i.aoMap,ne=!!i.lightMap,re=!!i.bumpMap&&i.wireframe===!1,ie=!!i.normalMap,ae=!!i.displacementMap,oe=!!i.emissiveMap,R=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,le=i.clearcoat>0,ue=i.dispersion>0,de=i.retroreflectivity>0,fe=i.iridescence>0,pe=i.sheen>0,me=i.transmission>0,he=ce&&!!i.anisotropyMap,ge=le&&!!i.clearcoatMap,_e=le&&!!i.clearcoatNormalMap,ve=le&&!!i.clearcoatRoughnessMap,ye=fe&&!!i.iridescenceMap,be=fe&&!!i.iridescenceThicknessMap,xe=pe&&!!i.sheenColorMap,Se=pe&&!!i.sheenRoughnessMap,Ce=!!i.specularMap,we=!!i.specularColorMap,Te=!!i.specularIntensityMap,Ee=me&&!!i.transmissionMap,De=me&&!!i.thicknessMap,Oe=!!i.gradientMap,ke=!!i.alphaMap,Ae=i.alphaTest>0,z=!!i.alphaHash,je=!!i.extensions,Me=0;i.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(Me=e.toneMapping);let Ne={shaderID:w,shaderType:i.type,shaderName:i.name,vertexShader:O,fragmentShader:k,defines:i.defines,customVertexShaderID:A,customFragmentShaderID:j,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:p,batching:F,batchingColor:F&&g._colorsTexture!==null,instancing:P,instancingColor:P&&g.instanceColor!==null,instancingMorph:P&&g.morphTexture!==null,outputColorSpace:M===null?e.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Mt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:I,matcap:L,envMap:ee,envMapMode:ee&&S.mapping,envMapCubeUVHeight:C,aoMap:te,lightMap:ne,bumpMap:re,normalMap:ie,displacementMap:ae,emissiveMap:oe,normalMapObjectSpace:ie&&i.normalMapType===1,normalMapTangentSpace:ie&&i.normalMapType===0,packedNormalMap:ie&&i.normalMapType===0&&pu(i.normalMap.format),metalnessMap:R,roughnessMap:se,anisotropy:ce,anisotropyMap:he,clearcoat:le,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,dispersion:ue,retroreflection:de,iridescence:fe,iridescenceMap:ye,iridescenceThicknessMap:be,sheen:pe,sheenColorMap:xe,sheenRoughnessMap:Se,specularMap:Ce,specularColorMap:we,specularIntensityMap:Te,transmission:me,transmissionMap:Ee,thicknessMap:De,gradientMap:Oe,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:ke,alphaTest:Ae,alphaHash:z,combine:i.combine,mapUv:I&&h(i.map.channel),aoMapUv:te&&h(i.aoMap.channel),lightMapUv:ne&&h(i.lightMap.channel),bumpMapUv:re&&h(i.bumpMap.channel),normalMapUv:ie&&h(i.normalMap.channel),displacementMapUv:ae&&h(i.displacementMap.channel),emissiveMapUv:oe&&h(i.emissiveMap.channel),metalnessMapUv:R&&h(i.metalnessMap.channel),roughnessMapUv:se&&h(i.roughnessMap.channel),anisotropyMapUv:he&&h(i.anisotropyMap.channel),clearcoatMapUv:ge&&h(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&h(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&h(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&h(i.iridescenceMap.channel),iridescenceThicknessMapUv:be&&h(i.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&h(i.sheenColorMap.channel),sheenRoughnessMapUv:Se&&h(i.sheenRoughnessMap.channel),specularMapUv:Ce&&h(i.specularMap.channel),specularColorMapUv:we&&h(i.specularColorMap.channel),specularIntensityMapUv:Te&&h(i.specularIntensityMap.channel),transmissionMapUv:Ee&&h(i.transmissionMap.channel),thicknessMapUv:De&&h(i.thicknessMap.channel),alphaMapUv:ke&&h(i.alphaMap.channel),vertexTangents:!!y.attributes.tangent&&(ie||ce),vertexNormals:!!y.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!y.attributes.color&&y.attributes.color.itemSize===4,pointsUvs:g.isPoints===!0&&!!y.attributes.uv&&(I||ke),fog:!!v,useFog:i.fog===!0,fogExp2:!!v&&v.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||y.attributes.normal===void 0&&ie===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:N,skinning:g.isSkinnedMesh===!0,hasPositionAttribute:y.attributes.position!==void 0,morphTargets:y.morphAttributes.position!==void 0,morphNormals:y.morphAttributes.normal!==void 0,morphColors:y.morphAttributes.color!==void 0,morphTargetsCount:E,morphTextureStride:D,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:_.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&u.length>0,shadowMapType:e.shadowMap.type,toneMapping:Me,decodeVideoTexture:I&&i.map.isVideoTexture===!0&&Mt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:oe&&i.emissiveMap.isVideoTexture===!0&&Mt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:je&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(je&&i.extensions.multiDraw===!0||F)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function _(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(v(n,t),y(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function v(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function y(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function b(e){let t=m[e.type],n;if(t){let e=Fs[t];n=Co.clone(e.uniforms)}else n=e.uniforms;return n}function x(t,n){let r=d.get(n);return r===void 0?(r=new lu(e,n,t,i),u.push(r),d.set(n,r)):++r.usedTimes,r}function S(e){if(--e.usedTimes===0){let t=u.indexOf(e);u[t]=u[u.length-1],u.pop(),d.delete(e.cacheKey),e.destroy()}}function C(e){c.remove(e)}function w(){c.dispose()}return{getParameters:g,getProgramCacheKey:_,getUniforms:b,acquireProgram:x,releaseProgram:S,releaseShaderCache:C,programs:u,dispose:w}}function hu(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function gu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function _u(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function vu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function c(n,r,i,a,c,l){let u=e[t];return u===void 0?(u={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:c,group:l},e[t]=u):(u.id=n.id,u.object=n,u.geometry=r,u.material=i,u.materialVariant=o(n),u.groupOrder=a,u.renderOrder=n.renderOrder,u.z=c,u.group=l),t++,u}function l(e,t,a,o,l,u,d){d.reversedDepth===!0&&(l=-l);let f=c(e,t,a,o,l,u);a.transmission>0?r.push(f):a.transparent===!0?i.push(f):n.push(f)}function u(e,t,a,o,l,u){let d=c(e,t,a,o,l,u);a.transmission>0?r.unshift(d):a.transparent===!0?i.unshift(d):n.unshift(d)}function d(e,t){n.length>1&&n.sort(e||gu),r.length>1&&r.sort(t||_u),i.length>1&&i.sort(t||_u)}function f(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:l,unshift:u,finish:f,sort:d}}function yu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new vu,e.set(t,[i])):n>=r.length?(i=new vu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function bu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new q,color:new Y};break;case`SpotLight`:n={position:new q,direction:new q,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new q,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new q,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new q,halfWidth:new q,halfHeight:new q}}return e[t.id]=n,n}}}function xu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new K,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Su=0;function Cu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function wu(e){let t=new bu,n=xu(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new q);let i=new q,a=new Jt,o=new Jt;function c(i){let a=0,o=0,c=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0,S=0;i.sort(Cu);for(let e=0,C=i.length;e<C;e++){let C=i[e],w=C.color,T=C.intensity,E=C.distance,D=null;if(C.shadow&&C.shadow.map&&(D=C.shadow.map.texture.format===1030?C.shadow.map.texture:C.shadow.map.depthTexture||C.shadow.map.texture),C.isAmbientLight)a+=w.r*T,o+=w.g*T,c+=w.b*T;else if(C.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(C.sh.coefficients[e],T);S++}else if(C.isSunLight){let e=t.get(C);if(e.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let e=C.shadow,t=n.get(C);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[u]=t,r.sunShadowMap[u]=D;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[d+t]=e.getMatrix(t),r.sunShadowCascade[d+t]=e._cascadeData[t];d+=i,u++}r.sun[l]=e,l++}else if(C.isDirectionalLight){let e=t.get(C);if(e.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let e=C.shadow,t=n.get(C);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[f]=t,r.directionalShadowMap[f]=D,r.directionalShadowMatrix[f]=C.shadow.matrix,_++}r.directional[f]=e,f++}else if(C.isSpotLight){let e=t.get(C);e.position.setFromMatrixPosition(C.matrixWorld),e.color.copy(w).multiplyScalar(T),e.distance=E,e.coneCos=Math.cos(C.angle),e.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),e.decay=C.decay,r.spot[m]=e;let i=C.shadow;if(C.map&&(r.spotLightMap[b]=C.map,b++,i.updateMatrices(C),C.castShadow&&x++),r.spotLightMatrix[m]=i.matrix,C.castShadow){let e=n.get(C);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[m]=e,r.spotShadowMap[m]=D,y++}m++}else if(C.isRectAreaLight){let e=t.get(C);e.color.copy(w).multiplyScalar(T),e.halfWidth.set(C.width*.5,0,0),e.halfHeight.set(0,C.height*.5,0),r.rectArea[h]=e,h++}else if(C.isPointLight){let e=t.get(C);if(e.color.copy(C.color).multiplyScalar(C.intensity),e.distance=C.distance,e.decay=C.decay,C.castShadow){let e=C.shadow,t=n.get(C);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[p]=t,r.pointShadowMap[p]=D,r.pointShadowMatrix[p]=C.shadow.matrix,v++}r.point[p]=e,p++}else if(C.isHemisphereLight){let e=t.get(C);e.skyColor.copy(C.color).multiplyScalar(T),e.groundColor.copy(C.groundColor).multiplyScalar(T),r.hemi[g]=e,g++}}h>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Q.LTC_FLOAT_1,r.rectAreaLTC2=Q.LTC_FLOAT_2):(r.rectAreaLTC1=Q.LTC_HALF_1,r.rectAreaLTC2=Q.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=c;let C=r.hash;(C.sunLength!==l||C.directionalLength!==f||C.pointLength!==p||C.spotLength!==m||C.rectAreaLength!==h||C.hemiLength!==g||C.numSunShadows!==u||C.numDirectionalShadows!==_||C.numPointShadows!==v||C.numSpotShadows!==y||C.numSpotMaps!==b||C.numLightProbes!==S)&&(r.sun.length=l,r.directional.length=f,r.spot.length=m,r.rectArea.length=h,r.point.length=p,r.hemi.length=g,r.sunShadow.length=u,r.sunShadowMap.length=u,r.sunShadowMatrix.length=d,r.sunShadowCascade.length=d,r.directionalShadow.length=_,r.directionalShadowMap.length=_,r.directionalShadowMatrix.length=_,r.pointShadow.length=v,r.pointShadowMap.length=v,r.pointShadowMatrix.length=v,r.spotShadow.length=y,r.spotShadowMap.length=y,r.spotLightMatrix.length=y+b-x,r.spotLightMap.length=b,r.numSpotLightShadowsWithMaps=x,r.numLightProbes=S,C.sunLength=l,C.directionalLength=f,C.pointLength=p,C.spotLength=m,C.rectAreaLength=h,C.hemiLength=g,C.numSunShadows=u,C.numDirectionalShadows=_,C.numPointShadows=v,C.numSpotShadows=y,C.numSpotMaps=b,C.numLightProbes=S,r.version=Su++)}function l(e,t){let n=0,c=0,l=0,u=0,d=0,f=0,p=t.matrixWorldInverse;for(let t=0,m=e.length;t<m;t++){let m=e[t];if(m.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(m.matrixWorld),e.direction.transformDirection(p),n++}else if(m.isDirectionalLight){let e=r.directional[c];e.direction.setFromMatrixPosition(m.matrixWorld),i.setFromMatrixPosition(m.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(p),c++}else if(m.isSpotLight){let e=r.spot[u];e.position.setFromMatrixPosition(m.matrixWorld),e.position.applyMatrix4(p),e.direction.setFromMatrixPosition(m.matrixWorld),i.setFromMatrixPosition(m.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(p),u++}else if(m.isRectAreaLight){let e=r.rectArea[d];e.position.setFromMatrixPosition(m.matrixWorld),e.position.applyMatrix4(p),o.identity(),a.copy(m.matrixWorld),a.premultiply(p),o.extractRotation(a),e.halfWidth.set(m.width*.5,0,0),e.halfHeight.set(0,m.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),d++}else if(m.isPointLight){let e=r.point[l];e.position.setFromMatrixPosition(m.matrixWorld),e.position.applyMatrix4(p),l++}else if(m.isHemisphereLight){let e=r.hemi[f];e.direction.setFromMatrixPosition(m.matrixWorld),e.direction.transformDirection(p),f++}}}return{setup:c,setupView:l,state:r}}function Tu(e){let t=new wu(e),n=[],r=[],i=[];function a(e){f.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function c(e){r.push(e)}function l(e){i.push(e)}function u(){t.setup(n)}function d(e){t.setupView(n,e)}let f={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:f,setupLights:u,setupLightsView:d,pushLight:o,pushShadow:c,pushLightProbeGrid:l}}function Eu(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Tu(e),t.set(n,[a])):r>=i.length?(a=new Tu(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Du=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Ou=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ku=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],Au=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],ju=new Jt,Mu=new q,Nu=new q;function Pu(e,t,n){let i=new Ai,a=new K,c=new K,l=new Ut,u=new Ao,d=new jo,f={},p=n.maxTextureSize,m={0:1,1:0,2:2},v=new Eo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new K},radius:{value:4}},vertexShader:Du,fragmentShader:Ou}),y=v.clone();y.defines.HORIZONTAL_PASS=1;let b=new Er;b.setAttribute(`position`,new dr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new X(b,v),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let C=this.type;this.render=function(t,n,u){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||t.length===0)return;this.type===2&&(U(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let d=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.state;v.setBlending(0),v.buffers.depth.getReversed()===!0?v.buffers.color.setClear(0,0,0,0):v.buffers.color.setClear(1,1,1,1),v.buffers.depth.setTest(!0),v.setScissorTest(!1);let y=C!==this.type;y&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let d=0,f=t.length;d<f;d++){let f=t[d],m=f.shadow;if(m===void 0){U(`WebGLShadowMap:`,f,`has no shadow.`);continue}if(m.autoUpdate===!1&&m.needsUpdate===!1)continue;a.copy(m.mapSize);let b=m.getFrameExtents();a.multiply(b),c.copy(m.mapSize),(a.x>p||a.y>p)&&(a.x>p&&(c.x=Math.floor(p/b.x),a.x=c.x*b.x,m.mapSize.x=c.x),a.y>p&&(c.y=Math.floor(p/b.y),a.y=c.y*b.y,m.mapSize.y=c.y));let x=e.state.buffers.depth.getReversed();if(m.camera._reversedDepth=x,m.map===null||y===!0){if(m.map!==null&&(m.map.depthTexture!==null&&(m.map.depthTexture.dispose(),m.map.depthTexture=null),m.map.dispose()),this.type===3){if(f.isPointLight){U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}m.map=new Gt(a.x,a.y,{format:A,type:_,minFilter:o,magFilter:o,generateMipmaps:!1}),m.map.texture.name=f.name+`.shadowMap`,m.map.depthTexture=new Bi(a.x,a.y,g),m.map.depthTexture.name=f.name+`.shadowMapDepth`,m.map.depthTexture.format=E,m.map.depthTexture.compareFunction=null,m.map.depthTexture.minFilter=r,m.map.depthTexture.magFilter=r}else f.isPointLight?(m.map=new dc(a.x),m.map.depthTexture=new Vi(a.x,h)):(m.map=new Gt(a.x,a.y),m.map.depthTexture=new Bi(a.x,a.y,h)),m.map.depthTexture.name=f.name+`.shadowMap`,m.map.depthTexture.format=E,this.type===1?(m.map.depthTexture.compareFunction=x?518:515,m.map.depthTexture.minFilter=o,m.map.depthTexture.magFilter=o):(m.map.depthTexture.compareFunction=null,m.map.depthTexture.minFilter=r,m.map.depthTexture.magFilter=r);m.camera.updateProjectionMatrix()}m.map.isWebGLCubeRenderTarget!==!0&&(m.map.width!==a.x||m.map.height!==a.y)&&m.map.setSize(a.x,a.y);let S=m.map.isWebGLCubeRenderTarget?6:m.getViewportCount();f.isPointLight!==!0&&m.updateMatrices(f,u);for(let t=0;t<S;t++){let r=m.getCamera(t);if(f.isPointLight){let e=m.camera,n=m.matrix,r=f.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Mu.setFromMatrixPosition(f.matrixWorld),e.position.copy(Mu),Nu.copy(e.position),Nu.add(ku[t]),e.up.copy(Au[t]),e.lookAt(Nu),e.updateMatrixWorld(),n.makeTranslation(-Mu.x,-Mu.y,-Mu.z),ju.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),m._frustum.setFromProjectionMatrix(ju,e.coordinateSystem,e.reversedDepth)}if(m.map.isWebGLCubeRenderTarget)e.setRenderTarget(m.map,t),e.clear();else{t===0&&(e.setRenderTarget(m.map),e.clear());let n=m.getViewport(t);l.set(c.x*n.x,c.y*n.y,c.x*n.z,c.y*n.w),v.viewport(l)}i=m.getFrustum(t),D(n,u,r,f,this.type)}m.isPointLightShadow!==!0&&this.type===3&&w(m,u),m.needsUpdate=!1}C=this.type,S.needsUpdate=!1,e.setRenderTarget(d,f,m)};function w(n,r){let i=t.update(x);v.defines.VSM_SAMPLES!==n.blurSamples&&(v.defines.VSM_SAMPLES=n.blurSamples,y.defines.VSM_SAMPLES=n.blurSamples,v.needsUpdate=!0,y.needsUpdate=!0),n.mapPass===null?n.mapPass=new Gt(a.x,a.y,{format:A,type:_}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),v.uniforms.shadow_pass.value=n.map.depthTexture,v.uniforms.resolution.value.set(n.map.width,n.map.height),v.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,v,x,null),y.uniforms.shadow_pass.value=n.mapPass.texture,y.uniforms.resolution.value.set(n.map.width,n.map.height),y.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,y,x,null)}function T(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?d:u,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=f[e];r===void 0&&(r={},f[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,O)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?m[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function D(n,r,a,o,c){if(n.visible===!1)return;if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&c===3)&&(!n.frustumCulled||n.intersectsFrustum(i))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let i=t.update(n),l=n.material;if(Array.isArray(l)){let t=i.groups;for(let u=0,d=t.length;u<d;u++){let d=t[u],f=l[d.materialIndex];if(f&&f.visible){let t=T(n,f,o,c);n.onBeforeShadow(e,n,r,a,i,t,d),e.renderBufferDirect(a,null,i,t,n,d),n.onAfterShadow(e,n,r,a,i,t,d)}}}else if(l.visible){let t=T(n,l,o,c);n.onBeforeShadow(e,n,r,a,i,t,null),e.renderBufferDirect(a,null,i,t,n,null),n.onAfterShadow(e,n,r,a,i,t,null)}}let l=n.children;for(let e=0,t=l.length;e<t;e++)D(l[e],r,a,o,c)}function O(e){e.target.removeEventListener(`dispose`,O);for(let t in f){let n=f[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Fu(e,t){function n(){let t=!1,n=new Ut,r=null,i=new Ut(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,c){c===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?R(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Ze[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,c=null,l=null,u=null;return{setTest:function(n){t||(n?R(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||c!==n||l!==r)&&(e.stencilOp(t,n,r),o=t,c=n,l=r)},setLocked:function(e){t=e},setClear:function(t){u!==t&&(e.clearStencil(t),u=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,c=null,l=null,u=null}}}let a=new n,o=new r,c=new i,l=new WeakMap,u=new WeakMap,d={},f={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new Y(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,N=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),P=!1,F=0,I=e.getParameter(e.VERSION);I.indexOf(`WebGL`)===-1?I.indexOf(`OpenGL ES`)!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(I)[1]),P=F>=2):(F=parseFloat(/^WebGL (\d)/.exec(I)[1]),P=F>=1);let L=null,ee={},te=e.getParameter(e.SCISSOR_BOX),ne=e.getParameter(e.VIEWPORT),re=new Ut().fromArray(te),ie=new Ut().fromArray(ne);function ae(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let oe={};oe[e.TEXTURE_2D]=ae(e.TEXTURE_2D,e.TEXTURE_2D,1),oe[e.TEXTURE_CUBE_MAP]=ae(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[e.TEXTURE_2D_ARRAY]=ae(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),oe[e.TEXTURE_3D]=ae(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),c.setClear(0),R(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),R(e.CULL_FACE),pe(0);function R(t){d[t]!==!0&&(e.enable(t),d[t]=!0)}function se(t){d[t]!==!1&&(e.disable(t),d[t]=!1)}function ce(t,n){return p[t]!==n&&(e.bindFramebuffer(t,n),p[t]=n,t===e.DRAW_FRAMEBUFFER&&(p[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(p[e.DRAW_FRAMEBUFFER]=n),!0)}function le(t,n){let r=h,i=!1;if(t){r=m.get(n),r===void 0&&(r=[],m.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function ue(t){return g!==t&&(e.useProgram(t),g=t,!0)}let de={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};de[103]=e.MIN,de[104]=e.MAX;let fe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,c,l,u,d){if(t===0){_===!0&&(se(e.BLEND),_=!1);return}if(_===!1&&(R(e.BLEND),_=!0),t!==5){if(t!==v||d!==D){if((y!==100||S!==100)&&(e.blendEquation(e.FUNC_ADD),y=100,S=100),d)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:W(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:W(`WebGLState: Invalid blending: `,t)}b=null,x=null,C=null,w=null,T.set(0,0,0),E=0,v=t,D=d}return}a||=n,o||=r,c||=i,(n!==y||a!==S)&&(e.blendEquationSeparate(de[n],de[a]),y=n,S=a),(r!==b||i!==x||o!==C||c!==w)&&(e.blendFuncSeparate(fe[r],fe[i],fe[o],fe[c]),b=r,x=i,C=o,w=c),(l.equals(T)===!1||u!==E)&&(e.blendColor(l.r,l.g,l.b,u),T.copy(l),E=u),v=t,D=!1}function me(t,n){t.side===2?se(e.CULL_FACE):R(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;c.setTest(i),i&&(c.setMask(t.stencilWriteMask),c.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),c.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?R(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){O!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),O=t)}function ge(t){t===0?se(e.CULL_FACE):(R(e.CULL_FACE),t!==k&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),k=t}function _e(t){t!==A&&(P&&e.lineWidth(t),A=t)}function ve(t,n,r){t?(R(e.POLYGON_OFFSET_FILL),(j!==n||M!==r)&&(j=n,M=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function ye(t){t?R(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function be(t){t===void 0&&(t=e.TEXTURE0+N-1),L!==t&&(e.activeTexture(t),L=t)}function xe(t,n,r){r===void 0&&(r=L===null?e.TEXTURE0+N-1:L);let i=ee[r];i===void 0&&(i={type:void 0,texture:void 0},ee[r]=i),(i.type!==t||i.texture!==n)&&(L!==r&&(e.activeTexture(r),L=r),e.bindTexture(t,n||oe[t]),i.type=t,i.texture=n)}function Se(){let t=ee[L];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function we(){try{e.compressedTexImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Te(){try{e.texSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ee(){try{e.texSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function De(){try{e.compressedTexSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Oe(){try{e.compressedTexSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function ke(){try{e.texStorage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ae(){try{e.texStorage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function z(){try{e.texImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function je(){try{e.texImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Me(t){return f[t]===void 0?e.getParameter(t):f[t]}function Ne(t,n){f[t]!==n&&(e.pixelStorei(t,n),f[t]=n)}function B(t){re.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),re.copy(t))}function Pe(t){ie.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),ie.copy(t))}function V(t,n){let r=u.get(n);r===void 0&&(r=new WeakMap,u.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Fe(t,n){let r=u.get(n).get(t);l.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),l.set(n,r))}function H(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},f={},L=null,ee={},p={},m=new WeakMap,h=[],g=null,_=!1,v=null,y=null,b=null,x=null,S=null,C=null,w=null,T=new Y(0,0,0),E=0,D=!1,O=null,k=null,A=null,j=null,M=null,re.set(0,0,e.canvas.width,e.canvas.height),ie.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),c.reset()}return{buffers:{color:a,depth:o,stencil:c},enable:R,disable:se,bindFramebuffer:ce,drawBuffers:le,useProgram:ue,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:be,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:we,texImage2D:z,texImage3D:je,pixelStorei:Ne,getParameter:Me,updateUBOMapping:V,uniformBlockBinding:Fe,texStorage2D:ke,texStorage3D:Ae,texSubImage2D:Te,texSubImage3D:Ee,compressedTexSubImage2D:De,compressedTexSubImage3D:Oe,scissor:B,viewport:Pe,reset:H}}function Iu(u,d,f,p,m,h,g){let _=d.has(`WEBGL_multisampled_render_to_texture`)?d.get(`WEBGL_multisampled_render_to_texture`):null,v=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),y=new K,b=new WeakMap,x=new Set,S,C=new WeakMap,w=!1;try{w=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function T(e,t){return w?new OffscreenCanvas(e,t):We(`canvas`)}function E(e,t,n){let r=1,i=Me(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);S===void 0&&(S=T(n,a));let o=t?T(n,a):S;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),U(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&U(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function O(e){return e.generateMipmaps}function k(e){u.generateMipmap(e)}function A(e){return e.isWebGLCubeRenderTarget?u.TEXTURE_CUBE_MAP:e.isWebGL3DRenderTarget?u.TEXTURE_3D:e.isWebGLArrayRenderTarget||e.isCompressedArrayTexture?u.TEXTURE_2D_ARRAY:u.TEXTURE_2D}function j(e,t,n,r,i,a=!1){if(e!==null){if(u[e]!==void 0)return u[e];U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+e+`'`)}let o;r&&(o=d.get(`EXT_texture_norm16`),o||U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let c=t;if(t===u.RED&&(n===u.FLOAT&&(c=u.R32F),n===u.HALF_FLOAT&&(c=u.R16F),n===u.UNSIGNED_BYTE&&(c=u.R8),n===u.UNSIGNED_SHORT&&o&&(c=o.R16_EXT),n===u.SHORT&&o&&(c=o.R16_SNORM_EXT)),t===u.RED_INTEGER&&(n===u.UNSIGNED_BYTE&&(c=u.R8UI),n===u.UNSIGNED_SHORT&&(c=u.R16UI),n===u.UNSIGNED_INT&&(c=u.R32UI),n===u.BYTE&&(c=u.R8I),n===u.SHORT&&(c=u.R16I),n===u.INT&&(c=u.R32I)),t===u.RG&&(n===u.FLOAT&&(c=u.RG32F),n===u.HALF_FLOAT&&(c=u.RG16F),n===u.UNSIGNED_BYTE&&(c=u.RG8),n===u.UNSIGNED_SHORT&&o&&(c=o.RG16_EXT),n===u.SHORT&&o&&(c=o.RG16_SNORM_EXT)),t===u.RG_INTEGER&&(n===u.UNSIGNED_BYTE&&(c=u.RG8UI),n===u.UNSIGNED_SHORT&&(c=u.RG16UI),n===u.UNSIGNED_INT&&(c=u.RG32UI),n===u.BYTE&&(c=u.RG8I),n===u.SHORT&&(c=u.RG16I),n===u.INT&&(c=u.RG32I)),t===u.RGB_INTEGER&&(n===u.UNSIGNED_BYTE&&(c=u.RGB8UI),n===u.UNSIGNED_SHORT&&(c=u.RGB16UI),n===u.UNSIGNED_INT&&(c=u.RGB32UI),n===u.BYTE&&(c=u.RGB8I),n===u.SHORT&&(c=u.RGB16I),n===u.INT&&(c=u.RGB32I)),t===u.RGBA_INTEGER&&(n===u.UNSIGNED_BYTE&&(c=u.RGBA8UI),n===u.UNSIGNED_SHORT&&(c=u.RGBA16UI),n===u.UNSIGNED_INT&&(c=u.RGBA32UI),n===u.BYTE&&(c=u.RGBA8I),n===u.SHORT&&(c=u.RGBA16I),n===u.INT&&(c=u.RGBA32I)),t===u.RGB&&(n===u.UNSIGNED_SHORT&&o&&(c=o.RGB16_EXT),n===u.SHORT&&o&&(c=o.RGB16_SNORM_EXT),n===u.UNSIGNED_INT_5_9_9_9_REV&&(c=u.RGB9_E5),n===u.UNSIGNED_INT_10F_11F_11F_REV&&(c=u.R11F_G11F_B10F)),t===u.RGBA){let e=a?Ie:Mt.getTransfer(i);n===u.FLOAT&&(c=u.RGBA32F),n===u.HALF_FLOAT&&(c=u.RGBA16F),n===u.UNSIGNED_BYTE&&(c=e===`srgb`?u.SRGB8_ALPHA8:u.RGBA8),n===u.UNSIGNED_SHORT&&o&&(c=o.RGBA16_EXT),n===u.SHORT&&o&&(c=o.RGBA16_SNORM_EXT),n===u.UNSIGNED_SHORT_4_4_4_4&&(c=u.RGBA4),n===u.UNSIGNED_SHORT_5_5_5_1&&(c=u.RGB5_A1)}return(c===u.R16F||c===u.R32F||c===u.RG16F||c===u.RG32F||c===u.RGBA16F||c===u.RGBA32F)&&d.get(`EXT_color_buffer_float`),c}function M(e,t){let n;return e?t===null||t===1014||t===1020?n=u.DEPTH24_STENCIL8:t===1015?n=u.DEPTH32F_STENCIL8:t===1012&&(n=u.DEPTH24_STENCIL8,U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):t===null||t===1014||t===1020?n=u.DEPTH_COMPONENT24:t===1015?n=u.DEPTH_COMPONENT32F:t===1012&&(n=u.DEPTH_COMPONENT16),n}function N(e,t){return O(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function P(e){let t=e.target;t.removeEventListener(`dispose`,P),I(t),t.isVideoTexture&&b.delete(t),t.isHTMLTexture&&x.delete(t)}function F(e){let t=e.target;t.removeEventListener(`dispose`,F),ee(t)}function I(e){let t=p.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=C.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&L(e),Object.keys(r).length===0&&C.delete(n)}p.remove(e)}function L(e){let t=p.get(e);u.deleteTexture(t.__webglTexture);let n=e.source,r=C.get(n);delete r[t.__cacheKey],g.memory.textures--}function ee(e){let t=p.get(e);if(e.depthTexture&&(e.depthTexture.dispose(),p.remove(e.depthTexture)),e.isWebGLCubeRenderTarget)for(let e=0;e<6;e++){if(Array.isArray(t.__webglFramebuffer[e]))for(let n=0;n<t.__webglFramebuffer[e].length;n++)u.deleteFramebuffer(t.__webglFramebuffer[e][n]);else u.deleteFramebuffer(t.__webglFramebuffer[e]);t.__webglDepthbuffer&&u.deleteRenderbuffer(t.__webglDepthbuffer[e])}else{if(Array.isArray(t.__webglFramebuffer))for(let e=0;e<t.__webglFramebuffer.length;e++)u.deleteFramebuffer(t.__webglFramebuffer[e]);else u.deleteFramebuffer(t.__webglFramebuffer);if(t.__webglDepthbuffer&&u.deleteRenderbuffer(t.__webglDepthbuffer),t.__webglMultisampledFramebuffer&&u.deleteFramebuffer(t.__webglMultisampledFramebuffer),t.__webglColorRenderbuffer)for(let e=0;e<t.__webglColorRenderbuffer.length;e++)t.__webglColorRenderbuffer[e]&&u.deleteRenderbuffer(t.__webglColorRenderbuffer[e]);t.__webglDepthRenderbuffer&&u.deleteRenderbuffer(t.__webglDepthRenderbuffer)}let n=e.textures;for(let e=0,t=n.length;e<t;e++){let t=p.get(n[e]);t.__webglTexture&&(u.deleteTexture(t.__webglTexture),g.memory.textures--),p.remove(n[e])}p.remove(e)}let te=0;function ne(){te=0}function re(){return te}function ie(e){te=e}function ae(){let e=te;return e>=m.maxTextures&&U(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+m.maxTextures),te+=1,e}function oe(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function R(e,t){let n=p.get(e);if(e.isVideoTexture&&z(e),e.isRenderTargetTexture===!1&&e.isExternalTexture!==!0&&e.version>0&&n.__version!==e.version){let r=e.image;if(r===null)U(`WebGLRenderer: Texture marked for update but no image data found.`);else if(r.complete===!1)U(`WebGLRenderer: Texture marked for update but image is incomplete`);else{_e(n,e,t);return}}else e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null);f.bindTexture(u.TEXTURE_2D,n.__webglTexture,u.TEXTURE0+t)}function se(e,t){let n=p.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){_e(n,e,t);return}e.isExternalTexture&&(n.__webglTexture=e.sourceTexture?e.sourceTexture:null),f.bindTexture(u.TEXTURE_2D_ARRAY,n.__webglTexture,u.TEXTURE0+t)}function ce(e,t){let n=p.get(e);if(e.isRenderTargetTexture===!1&&e.version>0&&n.__version!==e.version){_e(n,e,t);return}f.bindTexture(u.TEXTURE_3D,n.__webglTexture,u.TEXTURE0+t)}function le(e,t){let n=p.get(e);if(e.isCubeDepthTexture!==!0&&e.version>0&&n.__version!==e.version){ve(n,e,t);return}f.bindTexture(u.TEXTURE_CUBE_MAP,n.__webglTexture,u.TEXTURE0+t)}let ue={[e]:u.REPEAT,[t]:u.CLAMP_TO_EDGE,[n]:u.MIRRORED_REPEAT},de={[r]:u.NEAREST,[i]:u.NEAREST_MIPMAP_NEAREST,[a]:u.NEAREST_MIPMAP_LINEAR,[o]:u.LINEAR,[c]:u.LINEAR_MIPMAP_NEAREST,[l]:u.LINEAR_MIPMAP_LINEAR},fe={512:u.NEVER,519:u.ALWAYS,513:u.LESS,515:u.LEQUAL,514:u.EQUAL,518:u.GEQUAL,516:u.GREATER,517:u.NOTEQUAL};function pe(e,t){if(t.type===1015&&d.has(`OES_texture_float_linear`)===!1&&(t.magFilter===1006||t.magFilter===1007||t.magFilter===1005||t.magFilter===1008||t.minFilter===1006||t.minFilter===1007||t.minFilter===1005||t.minFilter===1008)&&U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),u.texParameteri(e,u.TEXTURE_WRAP_S,ue[t.wrapS]),u.texParameteri(e,u.TEXTURE_WRAP_T,ue[t.wrapT]),(e===u.TEXTURE_3D||e===u.TEXTURE_2D_ARRAY)&&u.texParameteri(e,u.TEXTURE_WRAP_R,ue[t.wrapR]),u.texParameteri(e,u.TEXTURE_MAG_FILTER,de[t.magFilter]),u.texParameteri(e,u.TEXTURE_MIN_FILTER,de[t.minFilter]),t.compareFunction&&(u.texParameteri(e,u.TEXTURE_COMPARE_MODE,u.COMPARE_REF_TO_TEXTURE),u.texParameteri(e,u.TEXTURE_COMPARE_FUNC,fe[t.compareFunction])),d.has(`EXT_texture_filter_anisotropic`)===!0){if(t.magFilter===1003||t.minFilter!==1005&&t.minFilter!==1008||t.type===1015&&d.has(`OES_texture_float_linear`)===!1)return;if(t.anisotropy>1||p.get(t).__currentAnisotropy){let n=d.get(`EXT_texture_filter_anisotropic`);u.texParameterf(e,n.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(t.anisotropy,m.getMaxAnisotropy())),p.get(t).__currentAnisotropy=t.anisotropy}}}function me(e,t){let n=!1;e.__webglInit===void 0&&(e.__webglInit=!0,t.addEventListener(`dispose`,P));let r=t.source,i=C.get(r);i===void 0&&(i={},C.set(r,i));let a=oe(t);if(a!==e.__cacheKey){i[a]===void 0&&(i[a]={texture:u.createTexture(),usedTimes:0},g.memory.textures++,n=!0),i[a].usedTimes++;let r=i[e.__cacheKey];r!==void 0&&(i[e.__cacheKey].usedTimes--,r.usedTimes===0&&L(t)),e.__cacheKey=a,e.__webglTexture=i[a].texture}return n}function he(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ge(e,t,n,r){let i=e.updateRanges;if(i.length===0)f.texSubImage2D(u.TEXTURE_2D,0,0,0,t.width,t.height,n,r,t.data);else{i.sort((e,t)=>e.start-t.start);let a=0;for(let e=1;e<i.length;e++){let n=i[a],r=i[e],o=n.start+n.count,c=he(r.start,t.width,4),l=he(n.start,t.width,4);r.start<=o+1&&c===l&&he(r.start+r.count-1,t.width,4)===c?n.count=Math.max(n.count,r.start+r.count-n.start):(++a,i[a]=r)}i.length=a+1;let o=f.getParameter(u.UNPACK_ROW_LENGTH),c=f.getParameter(u.UNPACK_SKIP_PIXELS),l=f.getParameter(u.UNPACK_SKIP_ROWS);f.pixelStorei(u.UNPACK_ROW_LENGTH,t.width);for(let e=0,a=i.length;e<a;e++){let a=i[e],o=Math.floor(a.start/4),c=Math.ceil(a.count/4),l=o%t.width,d=Math.floor(o/t.width),p=c;f.pixelStorei(u.UNPACK_SKIP_PIXELS,l),f.pixelStorei(u.UNPACK_SKIP_ROWS,d),f.texSubImage2D(u.TEXTURE_2D,0,l,d,p,1,n,r,t.data)}e.clearUpdateRanges(),f.pixelStorei(u.UNPACK_ROW_LENGTH,o),f.pixelStorei(u.UNPACK_SKIP_PIXELS,c),f.pixelStorei(u.UNPACK_SKIP_ROWS,l)}}function _e(e,t,n){let r=u.TEXTURE_2D;(t.isDataArrayTexture||t.isCompressedArrayTexture)&&(r=u.TEXTURE_2D_ARRAY),t.isData3DTexture&&(r=u.TEXTURE_3D);let i=me(e,t),a=t.source;f.bindTexture(r,e.__webglTexture,u.TEXTURE0+n);let o=p.get(a);if(a.version!==o.__version||i===!0){if(f.activeTexture(u.TEXTURE0+n),!(typeof ImageBitmap<`u`&&t.image instanceof ImageBitmap)){let e=Mt.getPrimaries(Mt.workingColorSpace),n=t.colorSpace===``?null:Mt.getPrimaries(t.colorSpace),r=t.colorSpace===``||e===n?u.NONE:u.BROWSER_DEFAULT_WEBGL;f.pixelStorei(u.UNPACK_FLIP_Y_WEBGL,t.flipY),f.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),f.pixelStorei(u.UNPACK_COLORSPACE_CONVERSION_WEBGL,r)}f.pixelStorei(u.UNPACK_ALIGNMENT,t.unpackAlignment);let e=E(t.image,!1,m.maxTextureSize);e=je(t,e);let c=h.convert(t.format,t.colorSpace),l=h.convert(t.type),d=j(t.internalFormat,c,l,t.normalized,t.colorSpace,t.isVideoTexture);pe(r,t);let p,g=t.mipmaps,_=t.isVideoTexture!==!0,v=o.__version===void 0||i===!0,y=a.dataReady,b=N(t,e);if(t.isDepthTexture)d=M(t.format===D,t.type),v&&(_?f.texStorage2D(u.TEXTURE_2D,1,d,e.width,e.height):f.texImage2D(u.TEXTURE_2D,0,d,e.width,e.height,0,c,l,null));else if(t.isDataTexture){if(g.length>0){_&&v&&f.texStorage2D(u.TEXTURE_2D,b,d,g[0].width,g[0].height);for(let e=0,t=g.length;e<t;e++)p=g[e],_?y&&f.texSubImage2D(u.TEXTURE_2D,e,0,0,p.width,p.height,c,l,p.data):f.texImage2D(u.TEXTURE_2D,e,d,p.width,p.height,0,c,l,p.data);t.generateMipmaps=!1}else _?(v&&f.texStorage2D(u.TEXTURE_2D,b,d,e.width,e.height),y&&ge(t,e,c,l)):f.texImage2D(u.TEXTURE_2D,0,d,e.width,e.height,0,c,l,e.data)}else if(t.isCompressedTexture){if(t.isCompressedArrayTexture){_&&v&&f.texStorage3D(u.TEXTURE_2D_ARRAY,b,d,g[0].width,g[0].height,e.depth);for(let n=0,r=g.length;n<r;n++)if(p=g[n],t.format!==1023){if(c!==null){if(_){if(y){if(t.layerUpdates.size>0){let e=js(p.width,p.height,t.format,t.type);for(let r of t.layerUpdates){let t=p.data.subarray(r*e/p.data.BYTES_PER_ELEMENT,(r+1)*e/p.data.BYTES_PER_ELEMENT);f.compressedTexSubImage3D(u.TEXTURE_2D_ARRAY,n,0,0,r,p.width,p.height,1,c,t)}}else f.compressedTexSubImage3D(u.TEXTURE_2D_ARRAY,n,0,0,0,p.width,p.height,e.depth,c,p.data)}}else f.compressedTexImage3D(u.TEXTURE_2D_ARRAY,n,d,p.width,p.height,e.depth,0,p.data,0,0)}else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else _?y&&f.texSubImage3D(u.TEXTURE_2D_ARRAY,n,0,0,0,p.width,p.height,e.depth,c,l,p.data):f.texImage3D(u.TEXTURE_2D_ARRAY,n,d,p.width,p.height,e.depth,0,c,l,p.data);t.layerUpdates.size>0&&t.clearLayerUpdates()}else{_&&v&&f.texStorage2D(u.TEXTURE_2D,b,d,g[0].width,g[0].height);for(let e=0,n=g.length;e<n;e++)p=g[e],t.format===1023?_?y&&f.texSubImage2D(u.TEXTURE_2D,e,0,0,p.width,p.height,c,l,p.data):f.texImage2D(u.TEXTURE_2D,e,d,p.width,p.height,0,c,l,p.data):c===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):_?y&&f.compressedTexSubImage2D(u.TEXTURE_2D,e,0,0,p.width,p.height,c,p.data):f.compressedTexImage2D(u.TEXTURE_2D,e,d,p.width,p.height,0,p.data)}}else if(t.isDataArrayTexture){if(_){if(v&&f.texStorage3D(u.TEXTURE_2D_ARRAY,b,d,e.width,e.height,e.depth),y){if(t.layerUpdates.size>0){let n=js(e.width,e.height,t.format,t.type);for(let r of t.layerUpdates){let t=e.data.subarray(r*n/e.data.BYTES_PER_ELEMENT,(r+1)*n/e.data.BYTES_PER_ELEMENT);f.texSubImage3D(u.TEXTURE_2D_ARRAY,0,0,0,r,e.width,e.height,1,c,l,t)}t.clearLayerUpdates()}else f.texSubImage3D(u.TEXTURE_2D_ARRAY,0,0,0,0,e.width,e.height,e.depth,c,l,e.data)}}else f.texImage3D(u.TEXTURE_2D_ARRAY,0,d,e.width,e.height,e.depth,0,c,l,e.data)}else if(t.isData3DTexture)_?(v&&f.texStorage3D(u.TEXTURE_3D,b,d,e.width,e.height,e.depth),y&&f.texSubImage3D(u.TEXTURE_3D,0,0,0,0,e.width,e.height,e.depth,c,l,e.data)):f.texImage3D(u.TEXTURE_3D,0,d,e.width,e.height,e.depth,0,c,l,e.data);else if(t.isFramebufferTexture){if(v){if(_)f.texStorage2D(u.TEXTURE_2D,b,d,e.width,e.height);else{let t=e.width,n=e.height;for(let e=0;e<b;e++)f.texImage2D(u.TEXTURE_2D,e,d,t,n,0,c,l,null),t>>=1,n>>=1}}}else if(t.isHTMLTexture){if(`texElementImage2D`in u){let n=u.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),e.parentNode!==n){n.appendChild(e),x.add(t),n.onpaint=e=>{let t=e.changedElements;for(let e of x)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(u.texElementImage2D.length===3)u.texElementImage2D(u.TEXTURE_2D,u.RGBA8,e);else{let t=u.RGBA,n=u.RGBA,r=u.UNSIGNED_BYTE;u.texElementImage2D(u.TEXTURE_2D,0,t,n,r,e)}u.texParameteri(u.TEXTURE_2D,u.TEXTURE_MIN_FILTER,u.LINEAR),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_S,u.CLAMP_TO_EDGE),u.texParameteri(u.TEXTURE_2D,u.TEXTURE_WRAP_T,u.CLAMP_TO_EDGE)}}else if(g.length>0){if(_&&v){let e=Me(g[0]);f.texStorage2D(u.TEXTURE_2D,b,d,e.width,e.height)}for(let e=0,t=g.length;e<t;e++)p=g[e],_?y&&f.texSubImage2D(u.TEXTURE_2D,e,0,0,c,l,p):f.texImage2D(u.TEXTURE_2D,e,d,c,l,p);t.generateMipmaps=!1}else if(_){if(v){let t=Me(e);f.texStorage2D(u.TEXTURE_2D,b,d,t.width,t.height)}y&&f.texSubImage2D(u.TEXTURE_2D,0,0,0,c,l,e)}else f.texImage2D(u.TEXTURE_2D,0,d,c,l,e);O(t)&&k(r),o.__version=a.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ve(e,t,n){if(t.image.length!==6)return;let r=me(e,t),i=t.source;f.bindTexture(u.TEXTURE_CUBE_MAP,e.__webglTexture,u.TEXTURE0+n);let a=p.get(i);if(i.version!==a.__version||r===!0){f.activeTexture(u.TEXTURE0+n);let e=Mt.getPrimaries(Mt.workingColorSpace),o=t.colorSpace===``?null:Mt.getPrimaries(t.colorSpace),c=t.colorSpace===``||e===o?u.NONE:u.BROWSER_DEFAULT_WEBGL;f.pixelStorei(u.UNPACK_FLIP_Y_WEBGL,t.flipY),f.pixelStorei(u.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),f.pixelStorei(u.UNPACK_ALIGNMENT,t.unpackAlignment),f.pixelStorei(u.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=t.isCompressedTexture||t.image[0].isCompressedTexture,d=t.image[0]&&t.image[0].isDataTexture,p=[];for(let e=0;e<6;e++)!l&&!d?p[e]=E(t.image[e],!0,m.maxCubemapSize):p[e]=d?t.image[e].image:t.image[e],p[e]=je(t,p[e]);let g=p[0],_=h.convert(t.format,t.colorSpace),v=h.convert(t.type),y=j(t.internalFormat,_,v,t.normalized,t.colorSpace),b=t.isVideoTexture!==!0,x=a.__version===void 0||r===!0,S=i.dataReady,C=N(t,g);pe(u.TEXTURE_CUBE_MAP,t);let w;if(l){b&&x&&f.texStorage2D(u.TEXTURE_CUBE_MAP,C,y,g.width,g.height);for(let e=0;e<6;e++){w=p[e].mipmaps;for(let n=0;n<w.length;n++){let r=w[n];t.format===1023?b?S&&f.texSubImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,_,v,r.data):f.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,y,r.width,r.height,0,_,v,r.data):_===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):b?S&&f.compressedTexSubImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,0,0,r.width,r.height,_,r.data):f.compressedTexImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,n,y,r.width,r.height,0,r.data)}}}else{if(w=t.mipmaps,b&&x){w.length>0&&C++;let e=Me(p[0]);f.texStorage2D(u.TEXTURE_CUBE_MAP,C,y,e.width,e.height)}for(let e=0;e<6;e++)if(d){b?S&&f.texSubImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,p[e].width,p[e].height,_,v,p[e].data):f.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,y,p[e].width,p[e].height,0,_,v,p[e].data);for(let t=0;t<w.length;t++){let n=w[t].image[e].image;b?S&&f.texSubImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,n.width,n.height,_,v,n.data):f.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,y,n.width,n.height,0,_,v,n.data)}}else{b?S&&f.texSubImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,0,0,_,v,p[e]):f.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,0,y,_,v,p[e]);for(let t=0;t<w.length;t++){let n=w[t];b?S&&f.texSubImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,0,0,_,v,n.image[e]):f.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+e,t+1,y,_,v,n.image[e])}}}O(t)&&k(u.TEXTURE_CUBE_MAP),a.__version=i.version,t.onUpdate&&t.onUpdate(t)}e.__version=t.version}function ye(e,t,n,r,i,a){let o=h.convert(n.format,n.colorSpace),c=h.convert(n.type),l=j(n.internalFormat,o,c,n.normalized,n.colorSpace),d=p.get(t),m=p.get(n);if(m.__renderTarget=t,!d.__hasExternalTextures){let e=Math.max(1,t.width>>a),n=Math.max(1,t.height>>a);i===u.TEXTURE_3D||i===u.TEXTURE_2D_ARRAY?f.texImage3D(i,a,l,e,n,t.depth,0,o,c,null):f.texImage2D(i,a,l,e,n,0,o,c,null)}f.bindFramebuffer(u.FRAMEBUFFER,e),Ae(t)?_.framebufferTexture2DMultisampleEXT(u.FRAMEBUFFER,r,i,m.__webglTexture,0,ke(t)):(i===u.TEXTURE_2D||i>=u.TEXTURE_CUBE_MAP_POSITIVE_X&&i<=u.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&u.framebufferTexture2D(u.FRAMEBUFFER,r,i,m.__webglTexture,a),f.bindFramebuffer(u.FRAMEBUFFER,null)}function be(e,t,n){if(u.bindRenderbuffer(u.RENDERBUFFER,e),t.depthBuffer){let r=t.depthTexture,i=r&&r.isDepthTexture?r.type:null,a=M(t.stencilBuffer,i),o=t.stencilBuffer?u.DEPTH_STENCIL_ATTACHMENT:u.DEPTH_ATTACHMENT;Ae(t)?_.renderbufferStorageMultisampleEXT(u.RENDERBUFFER,ke(t),a,t.width,t.height):n?u.renderbufferStorageMultisample(u.RENDERBUFFER,ke(t),a,t.width,t.height):u.renderbufferStorage(u.RENDERBUFFER,a,t.width,t.height),u.framebufferRenderbuffer(u.FRAMEBUFFER,o,u.RENDERBUFFER,e)}else{let e=t.textures;for(let r=0;r<e.length;r++){let i=e[r],a=h.convert(i.format,i.colorSpace),o=h.convert(i.type),c=j(i.internalFormat,a,o,i.normalized,i.colorSpace);Ae(t)?_.renderbufferStorageMultisampleEXT(u.RENDERBUFFER,ke(t),c,t.width,t.height):n?u.renderbufferStorageMultisample(u.RENDERBUFFER,ke(t),c,t.width,t.height):u.renderbufferStorage(u.RENDERBUFFER,c,t.width,t.height)}}u.bindRenderbuffer(u.RENDERBUFFER,null)}function xe(e,t,n){let r=t.isWebGLCubeRenderTarget===!0;if(f.bindFramebuffer(u.FRAMEBUFFER,e),!(t.depthTexture&&t.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let i=p.get(t.depthTexture);if(i.__renderTarget=t,(!i.__webglTexture||t.depthTexture.image.width!==t.width||t.depthTexture.image.height!==t.height)&&(t.depthTexture.image.width=t.width,t.depthTexture.image.height=t.height,t.depthTexture.needsUpdate=!0),r){if(i.__webglInit===void 0&&(i.__webglInit=!0,t.depthTexture.addEventListener(`dispose`,P)),i.__webglTexture===void 0){i.__webglTexture=u.createTexture(),f.bindTexture(u.TEXTURE_CUBE_MAP,i.__webglTexture),pe(u.TEXTURE_CUBE_MAP,t.depthTexture);let e=h.convert(t.depthTexture.format),n=h.convert(t.depthTexture.type),r;t.depthTexture.format===1026?r=u.DEPTH_COMPONENT24:t.depthTexture.format===1027&&(r=u.DEPTH24_STENCIL8);for(let i=0;i<6;i++)u.texImage2D(u.TEXTURE_CUBE_MAP_POSITIVE_X+i,0,r,t.width,t.height,0,e,n,null)}}else R(t.depthTexture,0);let a=i.__webglTexture,o=ke(t),c=r?u.TEXTURE_CUBE_MAP_POSITIVE_X+n:u.TEXTURE_2D,l=t.depthTexture.format===1027?u.DEPTH_STENCIL_ATTACHMENT:u.DEPTH_ATTACHMENT;if(t.depthTexture.format===1026)Ae(t)?_.framebufferTexture2DMultisampleEXT(u.FRAMEBUFFER,l,c,a,0,o):u.framebufferTexture2D(u.FRAMEBUFFER,l,c,a,0);else if(t.depthTexture.format===1027)Ae(t)?_.framebufferTexture2DMultisampleEXT(u.FRAMEBUFFER,l,c,a,0,o):u.framebufferTexture2D(u.FRAMEBUFFER,l,c,a,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function Se(e){let t=p.get(e),n=e.isWebGLCubeRenderTarget===!0;if(t.__boundDepthTexture!==e.depthTexture){let n=e.depthTexture;if(t.__depthDisposeCallback&&t.__depthDisposeCallback(),n){let e=()=>{delete t.__boundDepthTexture,delete t.__depthDisposeCallback,n.removeEventListener(`dispose`,e)};n.addEventListener(`dispose`,e),t.__depthDisposeCallback=e}t.__boundDepthTexture=n}if(e.depthTexture&&!t.__autoAllocateDepthBuffer){if(n)for(let n=0;n<6;n++)xe(t.__webglFramebuffer[n],e,n);else{let n=e.texture.mipmaps;n&&n.length>0?xe(t.__webglFramebuffer[0],e,0):xe(t.__webglFramebuffer,e,0)}}else if(n){t.__webglDepthbuffer=[];for(let n=0;n<6;n++)if(f.bindFramebuffer(u.FRAMEBUFFER,t.__webglFramebuffer[n]),t.__webglDepthbuffer[n]===void 0)t.__webglDepthbuffer[n]=u.createRenderbuffer(),be(t.__webglDepthbuffer[n],e,!1);else{let r=e.stencilBuffer?u.DEPTH_STENCIL_ATTACHMENT:u.DEPTH_ATTACHMENT,i=t.__webglDepthbuffer[n];u.bindRenderbuffer(u.RENDERBUFFER,i),u.framebufferRenderbuffer(u.FRAMEBUFFER,r,u.RENDERBUFFER,i)}}else{let n=e.texture.mipmaps;if(n&&n.length>0?f.bindFramebuffer(u.FRAMEBUFFER,t.__webglFramebuffer[0]):f.bindFramebuffer(u.FRAMEBUFFER,t.__webglFramebuffer),t.__webglDepthbuffer===void 0)t.__webglDepthbuffer=u.createRenderbuffer(),be(t.__webglDepthbuffer,e,!1);else{let n=e.stencilBuffer?u.DEPTH_STENCIL_ATTACHMENT:u.DEPTH_ATTACHMENT,r=t.__webglDepthbuffer;u.bindRenderbuffer(u.RENDERBUFFER,r),u.framebufferRenderbuffer(u.FRAMEBUFFER,n,u.RENDERBUFFER,r)}}f.bindFramebuffer(u.FRAMEBUFFER,null)}function Ce(e,t,n){let r=p.get(e);t!==void 0&&ye(r.__webglFramebuffer,e,e.texture,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,0),n!==void 0&&Se(e)}function we(e){let t=e.texture,n=p.get(e),r=p.get(t);e.addEventListener(`dispose`,F);let i=e.textures,a=e.isWebGLCubeRenderTarget===!0,o=i.length>1;if(o||(r.__webglTexture===void 0&&(r.__webglTexture=u.createTexture()),r.__version=t.version,g.memory.textures++),a){n.__webglFramebuffer=[];for(let e=0;e<6;e++)if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer[e]=[];for(let r=0;r<t.mipmaps.length;r++)n.__webglFramebuffer[e][r]=u.createFramebuffer()}else n.__webglFramebuffer[e]=u.createFramebuffer()}else{if(t.mipmaps&&t.mipmaps.length>0){n.__webglFramebuffer=[];for(let e=0;e<t.mipmaps.length;e++)n.__webglFramebuffer[e]=u.createFramebuffer()}else n.__webglFramebuffer=u.createFramebuffer();if(o)for(let e=0,t=i.length;e<t;e++){let t=p.get(i[e]);t.__webglTexture===void 0&&(t.__webglTexture=u.createTexture(),g.memory.textures++)}if(e.samples>0&&Ae(e)===!1){n.__webglMultisampledFramebuffer=u.createFramebuffer(),n.__webglColorRenderbuffer=[],f.bindFramebuffer(u.FRAMEBUFFER,n.__webglMultisampledFramebuffer);for(let t=0;t<i.length;t++){let r=i[t];n.__webglColorRenderbuffer[t]=u.createRenderbuffer(),u.bindRenderbuffer(u.RENDERBUFFER,n.__webglColorRenderbuffer[t]);let a=h.convert(r.format,r.colorSpace),o=h.convert(r.type),c=j(r.internalFormat,a,o,r.normalized,r.colorSpace,e.isXRRenderTarget===!0),l=ke(e);u.renderbufferStorageMultisample(u.RENDERBUFFER,l,c,e.width,e.height),u.framebufferRenderbuffer(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0+t,u.RENDERBUFFER,n.__webglColorRenderbuffer[t])}u.bindRenderbuffer(u.RENDERBUFFER,null),e.depthBuffer&&(n.__webglDepthRenderbuffer=u.createRenderbuffer(),be(n.__webglDepthRenderbuffer,e,!0)),f.bindFramebuffer(u.FRAMEBUFFER,null)}}if(a){f.bindTexture(u.TEXTURE_CUBE_MAP,r.__webglTexture),pe(u.TEXTURE_CUBE_MAP,t);for(let r=0;r<6;r++)if(t.mipmaps&&t.mipmaps.length>0)for(let i=0;i<t.mipmaps.length;i++)ye(n.__webglFramebuffer[r][i],e,t,u.COLOR_ATTACHMENT0,u.TEXTURE_CUBE_MAP_POSITIVE_X+r,i);else ye(n.__webglFramebuffer[r],e,t,u.COLOR_ATTACHMENT0,u.TEXTURE_CUBE_MAP_POSITIVE_X+r,0);O(t)&&k(u.TEXTURE_CUBE_MAP),f.unbindTexture()}else if(o){for(let t=0,r=i.length;t<r;t++){let r=i[t],a=p.get(r),o=u.TEXTURE_2D;(e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(o=e.isWebGL3DRenderTarget?u.TEXTURE_3D:u.TEXTURE_2D_ARRAY),f.bindTexture(o,a.__webglTexture),pe(o,r),ye(n.__webglFramebuffer,e,r,u.COLOR_ATTACHMENT0+t,o,0),O(r)&&k(o)}f.unbindTexture()}else{let i=u.TEXTURE_2D;if((e.isWebGL3DRenderTarget||e.isWebGLArrayRenderTarget)&&(i=e.isWebGL3DRenderTarget?u.TEXTURE_3D:u.TEXTURE_2D_ARRAY),f.bindTexture(i,r.__webglTexture),pe(i,t),t.mipmaps&&t.mipmaps.length>0)for(let r=0;r<t.mipmaps.length;r++)ye(n.__webglFramebuffer[r],e,t,u.COLOR_ATTACHMENT0,i,r);else ye(n.__webglFramebuffer,e,t,u.COLOR_ATTACHMENT0,i,0);O(t)&&k(i),f.unbindTexture()}e.depthBuffer&&Se(e)}function Te(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(O(r)){let t=A(e),n=p.get(r).__webglTexture;f.bindTexture(t,n),k(t),f.unbindTexture()}}}let Ee=[],De=[];function Oe(e){if(e.samples>0){if(Ae(e)===!1){let t=e.textures,n=e.width,r=e.height,i=u.COLOR_BUFFER_BIT,a=e.stencilBuffer?u.DEPTH_STENCIL_ATTACHMENT:u.DEPTH_ATTACHMENT,o=p.get(e),c=t.length>1;if(c)for(let e=0;e<t.length;e++)f.bindFramebuffer(u.FRAMEBUFFER,o.__webglMultisampledFramebuffer),u.framebufferRenderbuffer(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0+e,u.RENDERBUFFER,null),f.bindFramebuffer(u.FRAMEBUFFER,o.__webglFramebuffer),u.framebufferTexture2D(u.DRAW_FRAMEBUFFER,u.COLOR_ATTACHMENT0+e,u.TEXTURE_2D,null,0);f.bindFramebuffer(u.READ_FRAMEBUFFER,o.__webglMultisampledFramebuffer);let l=e.texture.mipmaps;l&&l.length>0?f.bindFramebuffer(u.DRAW_FRAMEBUFFER,o.__webglFramebuffer[0]):f.bindFramebuffer(u.DRAW_FRAMEBUFFER,o.__webglFramebuffer);for(let l=0;l<t.length;l++){if(e.resolveDepthBuffer&&(e.depthBuffer&&(i|=u.DEPTH_BUFFER_BIT),e.stencilBuffer&&e.resolveStencilBuffer&&(i|=u.STENCIL_BUFFER_BIT)),c){u.framebufferRenderbuffer(u.READ_FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.RENDERBUFFER,o.__webglColorRenderbuffer[l]);let e=p.get(t[l]).__webglTexture;u.framebufferTexture2D(u.DRAW_FRAMEBUFFER,u.COLOR_ATTACHMENT0,u.TEXTURE_2D,e,0)}u.blitFramebuffer(0,0,n,r,0,0,n,r,i,u.NEAREST),v===!0&&(Ee.length=0,De.length=0,Ee.push(u.COLOR_ATTACHMENT0+l),e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&(Ee.push(a),De.push(a),u.invalidateFramebuffer(u.DRAW_FRAMEBUFFER,De)),u.invalidateFramebuffer(u.READ_FRAMEBUFFER,Ee))}if(f.bindFramebuffer(u.READ_FRAMEBUFFER,null),f.bindFramebuffer(u.DRAW_FRAMEBUFFER,null),c)for(let e=0;e<t.length;e++){f.bindFramebuffer(u.FRAMEBUFFER,o.__webglMultisampledFramebuffer),u.framebufferRenderbuffer(u.FRAMEBUFFER,u.COLOR_ATTACHMENT0+e,u.RENDERBUFFER,o.__webglColorRenderbuffer[e]);let n=p.get(t[e]).__webglTexture;f.bindFramebuffer(u.FRAMEBUFFER,o.__webglFramebuffer),u.framebufferTexture2D(u.DRAW_FRAMEBUFFER,u.COLOR_ATTACHMENT0+e,u.TEXTURE_2D,n,0)}f.bindFramebuffer(u.DRAW_FRAMEBUFFER,o.__webglMultisampledFramebuffer)}else if(e.depthBuffer&&e.storeMultisampledDepthBuffer===!1&&v){let t=e.stencilBuffer?u.DEPTH_STENCIL_ATTACHMENT:u.DEPTH_ATTACHMENT;u.invalidateFramebuffer(u.DRAW_FRAMEBUFFER,[t])}}}function ke(e){return Math.min(m.maxSamples,e.samples)}function Ae(e){let t=p.get(e);return e.samples>0&&d.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function z(e){let t=g.render.frame;b.get(e)!==t&&(b.set(e,t),e.update())}function je(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Mt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):W(`WebGLTextures: Unsupported texture color space:`,n)),t}function Me(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(y.width=e.naturalWidth||e.width,y.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(y.width=e.displayWidth,y.height=e.displayHeight):(y.width=e.width,y.height=e.height),y}this.allocateTextureUnit=ae,this.resetTextureUnits=ne,this.getTextureUnits=re,this.setTextureUnits=ie,this.setTexture2D=R,this.setTexture2DArray=se,this.setTexture3D=ce,this.setTextureCube=le,this.rebindTextures=Ce,this.setupRenderTarget=we,this.updateRenderTargetMipmap=Te,this.updateMultisampleRenderTarget=Oe,this.setupDepthRenderbuffer=Se,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=Ae,this.isReversedDepthBuffer=function(){return f.buffers.depth.getReversed()}}function Lu(e,t){function n(n,r=``){let i,a=Mt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Ru=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Bu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Hi(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Eo({vertexShader:Ru,fragmentShader:zu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new mo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vu=class extends Qe{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,c=1,l=null,d=null,f=null,p=null,m=null,g=null,_=typeof XRWebGLBinding<`u`,v=new Bu,y={},x=t.getContextAttributes(),S=null,C=null,w=[],O=[],k=new K,A=null,j=null,M=new us;M.viewport=new Ut;let N=new us;N.viewport=new Ut;let P=[M,N],F=new _s,I=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=w[e];return t===void 0&&(t=new Tn,w[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=w[e];return t===void 0&&(t=new Tn,w[e]=t),t.getGripSpace()},this.getHand=function(e){let t=w[e];return t===void 0&&(t=new Tn,w[e]=t),t.getHandSpace()};function ee(e){let t=O.indexOf(e.inputSource);if(t===-1)return;let n=w[t];n!==void 0&&(n.update(e.inputSource,e.frame,l||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function te(){r.removeEventListener(`select`,ee),r.removeEventListener(`selectstart`,ee),r.removeEventListener(`selectend`,ee),r.removeEventListener(`squeeze`,ee),r.removeEventListener(`squeezestart`,ee),r.removeEventListener(`squeezeend`,ee),r.removeEventListener(`end`,te),r.removeEventListener(`inputsourceschange`,ne);for(let e=0;e<w.length;e++){let t=O[e];t!==null&&(O[e]=null,w[e].disconnect(t))}I=null,L=null,v.reset();for(let e in y)delete y[e];if(e.setRenderTarget(S),m=null,p=null,f=null,r=null,C=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(k.width,k.height,!1),j!==null){let e=j.camera;e.fov=j.fov,e.zoom=j.zoom,e.updateProjectionMatrix(),j=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(e){l=e},this.getBaseLayer=function(){return p===null?m:p},this.getBinding=function(){return f===null&&_&&(f=new XRWebGLBinding(r,t)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(d){if(r=d,r!==null){if(S=e.getRenderTarget(),r.addEventListener(`select`,ee),r.addEventListener(`selectstart`,ee),r.addEventListener(`selectend`,ee),r.addEventListener(`squeeze`,ee),r.addEventListener(`squeezestart`,ee),r.addEventListener(`squeezeend`,ee),r.addEventListener(`end`,te),r.addEventListener(`inputsourceschange`,ne),x.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(k),_&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;x.depth&&(o=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=x.stencil?D:E,a=x.stencil?b:h);let c={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};f=this.getBinding(),p=f.createProjectionLayer(c),r.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),C=new Gt(p.textureWidth,p.textureHeight,{format:T,type:u,depthTexture:new Bi(p.textureWidth,p.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}else{let n={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:i};m=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),C=new Gt(m.framebufferWidth,m.framebufferHeight,{format:T,type:u,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),le.setContext(r),le.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function ne(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=O.indexOf(n);r>=0&&(O[r]=null,w[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=O.indexOf(n);if(r===-1){for(let e=0;e<w.length;e++)if(e>=O.length){O.push(n),r=e;break}else if(O[e]===null){O[e]=n,r=e;break}if(r===-1)break}let i=w[r];i&&i.connect(n)}}let re=new q,ie=new q;function ae(e,t,n){re.setFromMatrixPosition(t.matrixWorld),ie.setFromMatrixPosition(n.matrixWorld);let r=re.distanceTo(ie),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),c=i[14]/(i[10]+1),l=(i[9]+1)/i[5],u=(i[9]-1)/i[5],d=(i[8]-1)/i[0],f=(a[8]+1)/a[0],p=o*d,m=o*f,h=r/(-d+f),g=h*-d;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(g),e.translateZ(h),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+h,n=c+h,i=p-g,a=m+(r-g),d=l*c/n*t,f=u*c/n*t;e.projectionMatrix.makePerspective(i,a,d,f,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function oe(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;v.texture!==null&&(v.depthNear>0&&(t=v.depthNear),v.depthFar>0&&(n=v.depthFar)),F.near=N.near=M.near=t,F.far=N.far=M.far=n,(I!==F.near||L!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),I=F.near,L=F.far),F.layers.mask=e.layers.mask|6,M.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;let i=e.parent,a=F.cameras;oe(F,i);for(let e=0;e<a.length;e++)oe(a[e],i);a.length===2?ae(F,M,N):F.projectionMatrix.copy(M.projectionMatrix),j===null&&e.isPerspectiveCamera&&(j={camera:e,fov:e.fov,zoom:e.zoom}),R(e,F,i)};function R(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=nt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(p!==null||m!==null)return c},this.setFoveation=function(e){c=e,p!==null&&(p.fixedFoveation=e),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=e)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(F)},this.getCameraTexture=function(e){return y[e]};let se=null;function ce(t,i){if(d=i.getViewerPose(l||a),g=i,d!==null){let t=d.views;m!==null&&(e.setRenderTargetFramebuffer(C,m.framebuffer),e.setRenderTarget(C));let i=!1;t.length!==F.cameras.length&&(F.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(m!==null)a=m.getViewport(r);else{let t=f.getViewSubImage(p,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(C,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(C))}let o=P[n];o===void 0&&(o=new us,o.layers.enable(n),o.viewport=new Ut,P[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(F.matrix.copy(o.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),i===!0&&F.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&_){f=n.getBinding();let e=f.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&v.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&_){e.state.unbindTexture(),f=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=y[n];e||(e=new Hi,y[n]=e);let t=f.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<w.length;e++){let t=O[e],n=w[e];t!==null&&n!==void 0&&n.update(t,i,l||a)}se&&se(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),g=null}let le=new Ns;le.setAnimationLoop(ce),this.setAnimationLoop=function(e){se=e},this.dispose=function(){}}},Hu=new Jt,Uu=new J;Uu.set(-1,0,0,0,1,0,0,0,1);function Wu(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,So(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),f(e,t)):t.isMeshPhongMaterial?(a(e,t),d(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),p(e,t),t.isMeshPhysicalMaterial&&m(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),h(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),g(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&c(e,t)):t.isPointsMaterial?l(e,t,n,r):t.isSpriteMaterial?u(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Hu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Uu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function c(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function l(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function d(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function f(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function p(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function m(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function h(e,t){t.matcap&&(e.matcap.value=t.matcap)}function g(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Gu(e,t,n,r){let i={},a={},o=[],c=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function u(e,n){let o=i[e.id];o===void 0&&(_(e),o=d(e),i[e.id]=o,e.addEventListener(`dispose`,y));let c=n.program;r.updateUBOMapping(e,c);let l=t.render.frame;a[e.id]!==l&&(p(e),a[e.id]=l)}function d(t){let n=f();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function f(){for(let e=0;e<c;e++)if(o.indexOf(e)===-1)return o.push(e),e;return W(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function p(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)m(t[n],e,n,a);else m(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(t,n,r,i){if(g(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=v(i);h(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else h(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function h(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function g(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function _(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=v(r),o=n%16,c=o%a.boundary,l=o+c;n+=c,l!==0&&16-l<a.storage&&(n+=16-l),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function v(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):U(`WebGLRenderer: Unsupported uniform value type.`,e),t}function y(t){let n=t.target;n.removeEventListener(`dispose`,y);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function b(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:l,update:u,dispose:b}}var Ku=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qu=null;function Ju(){return qu===null&&(qu=new _i(Ku,16,16,A,_),qu.name=`DFG_LUT`,qu.minFilter=o,qu.magFilter=o,qu.wrapS=t,qu.wrapT=t,qu.generateMipmaps=!1,qu.needsUpdate=!0),qu}var Yu=class{constructor(e={}){let{canvas:t=Ge(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:d=!1,powerPreference:f=`default`,failIfMajorPerformanceCaveat:m=!1,reversedDepthBuffer:g=!1,outputBufferType:x=u}=e;this.isWebGLRenderer=!0;let S;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);S=n.getContextAttributes().alpha}else S=a;let C=x,w=new Set([M,j,k]),T=new Set([u,h,p,b,v,y]),E=new Uint32Array(4),D=new Int32Array(4),O=new q,A=null,N=null,P=[],F=[],I=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,ee=!1,te=null,ne=null,re=null,ie=null;this._outputColorSpace=Fe;let ae=0,oe=0,R=null,se=-1,ce=null,le=new Ut,ue=new Ut,de=null,fe=new Y(0),pe=0,me=t.width,he=t.height,ge=1,_e=null,ve=null,ye=new Ut(0,0,me,he),be=new Ut(0,0,me,he),xe=!1,Se=new Ai,Ce=!1,we=!1,Te=new Jt,Ee=new q,De=new Ut,Oe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ke=!1;function Ae(){return R===null?ge:1}let z=n;function je(e,n){return t.getContext(e,n)}let Me,Ne,B,Pe,V,H,Ie,Le,Re,ze,Be,He,Ue,We,Ke,Je,Ye,Ze,Qe,$e,et,tt,nt;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:d,powerPreference:f,failIfMajorPerformanceCaveat:m};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,it,!1),t.addEventListener(`webglcontextrestored`,at,!1),t.addEventListener(`webglcontextcreationerror`,ot,!1),z===null){let t=`webgl2`;if(z=je(t,e),z===null)throw je(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}rt()}catch(e){throw t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),W(`WebGLRenderer: `+e.message),e}function rt(){Me=new pc(z),Me.init(),et=new Lu(z,Me),Ne=new Hs(z,Me,e,et),B=new Fu(z,Me),Ne.reversedDepthBuffer&&g&&B.buffers.depth.setReversed(!0),ne=z.createFramebuffer(),re=z.createFramebuffer(),ie=z.createFramebuffer(),Pe=new gc(z),V=new hu,H=new Iu(z,Me,B,V,Ne,et,Pe),Ie=new fc(L),Le=new Ps(z),tt=new Bs(z,Le),Re=new mc(z,Le,Pe,tt),ze=new vc(z,Re,Le,tt,Pe),Ze=new _c(z,Ne,H),Ke=new Us(V),Be=new mu(L,Ie,Me,Ne,tt,Ke),He=new Wu(L,V),Ue=new yu,We=new Eu(Me),Ye=new zs(L,Ie,B,ze,S,c),Je=new Pu(L,ze,Ne),nt=new Gu(z,Pe,Ne,B),Qe=new Vs(z,Me,Pe),$e=new hc(z,Me,Pe),Pe.programs=Be.programs,L.capabilities=Ne,L.extensions=Me,L.properties=V,L.renderLists=Ue,L.shadowMap=Je,L.state=B,L.info=Pe}C!==1009&&(I=new bc(C,t.width,t.height,o,r,i));let G=new Vu(L,z);this.xr=G,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Me.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ge},this.setPixelRatio=function(e){e!==void 0&&(ge=e,this.setSize(me,he,!1))},this.getSize=function(e){return e.set(me,he)},this.setSize=function(e,n,r=!0){if(G.isPresenting){U(`WebGLRenderer: Can't change size while VR device is presenting.`);return}me=e,he=n,t.width=Math.floor(e*ge),t.height=Math.floor(n*ge),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),I!==null&&I.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(me*ge,he*ge).floor()},this.setDrawingBufferSize=function(e,n,r){me=e,he=n,ge=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(C===1009){W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}I.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(le)},this.getViewport=function(e){return e.copy(ye)},this.setViewport=function(e,t,n,r){e.isVector4?ye.set(e.x,e.y,e.z,e.w):ye.set(e,t,n,r),B.viewport(le.copy(ye).multiplyScalar(ge).round())},this.getScissor=function(e){return e.copy(be)},this.setScissor=function(e,t,n,r){e.isVector4?be.set(e.x,e.y,e.z,e.w):be.set(e,t,n,r),B.scissor(ue.copy(be).multiplyScalar(ge).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(e){B.setScissorTest(xe=e)},this.setOpaqueSort=function(e){_e=e},this.setTransparentSort=function(e){ve=e},this.getClearColor=function(e){return e.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor(...arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(R!==null){let t=R.texture.format;e=w.has(t)}if(e){let e=R.texture.type,t=T.has(e),n=Ye.getClearColor(),r=Ye.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(E[0]=i,E[1]=a,E[2]=o,E[3]=r,z.clearBufferuiv(z.COLOR,0,E)):(D[0]=i,D[1]=a,D[2]=o,D[3]=r,z.clearBufferiv(z.COLOR,0,D))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),te=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,it,!1),t.removeEventListener(`webglcontextrestored`,at,!1),t.removeEventListener(`webglcontextcreationerror`,ot,!1),Ye.dispose(),Ue.dispose(),We.dispose(),V.dispose(),Ie.dispose(),ze.dispose(),tt.dispose(),nt.dispose(),Be.dispose(),G.dispose(),G.removeEventListener(`sessionstart`,pt),G.removeEventListener(`sessionend`,mt),ht.stop()};function it(e){e.preventDefault(),qe(`WebGLRenderer: Context Lost.`),ee=!0}function at(){qe(`WebGLRenderer: Context Restored.`),ee=!1;let e=Pe.autoReset,t=Je.enabled,n=Je.autoUpdate,r=Je.needsUpdate,i=Je.type;rt(),Pe.autoReset=e,Je.enabled=t,Je.autoUpdate=n,Je.needsUpdate=r,Je.type=i}function ot(e){W(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function st(e){let t=e.target;t.removeEventListener(`dispose`,st),ct(t)}function ct(e){lt(e),V.remove(e)}function lt(e){let t=V.get(e).programs;t!==void 0&&(t.forEach(function(e){Be.releaseProgram(e)}),e.isShaderMaterial&&Be.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Oe);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,c=K(e,t,n,r,i);B.setMaterial(r,o);let l=n.index,u=1;if(r.wireframe===!0){if(l=Re.getWireframeAttribute(n),l===void 0)return;u=2}let d=n.drawRange,f=n.attributes.position,p=d.start*u,m=(d.start+d.count)*u;a!==null&&(p=Math.max(p,a.start*u),m=Math.min(m,(a.start+a.count)*u)),l===null?f!=null&&(p=Math.max(p,0),m=Math.min(m,f.count)):(p=Math.max(p,0),m=Math.min(m,l.count));let h=m-p;if(h<0||h===1/0)return;tt.setup(i,r,c,n,l);let g,_=Qe;if(l!==null&&(g=Le.get(l),_=$e,_.setIndex(g)),i.isMesh)r.wireframe===!0?(B.setLineWidth(r.wireframeLinewidth*Ae()),_.setMode(z.LINES)):_.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),B.setLineWidth(e*Ae()),i.isLineSegments?_.setMode(z.LINES):i.isLineLoop?_.setMode(z.LINE_LOOP):_.setMode(z.LINE_STRIP)}else i.isPoints?_.setMode(z.POINTS):i.isSprite&&_.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(Me.get(`WEBGL_multi_draw`))_.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=l?Le.get(l).bytesPerElement:1,o=V.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),_.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)_.renderInstances(p,h,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);_.renderInstances(p,h,t)}else _.render(p,h)};function ut(e,t,n,r){te!==null&&e.isNodeMaterial&&te.setObject(r,e),Ce===!0&&Ke.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,xt(e,t,r),e.side=0,e.needsUpdate=!0,xt(e,t,r),e.side=2):xt(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),te!==null&&te.renderStart(e,t,n),N=We.get(n),N.init(t),F.push(N),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(N.pushLight(e),e.castShadow&&N.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(N.pushLight(e),e.castShadow&&N.pushShadow(e))}),N.setupLights(),te!==null&&te.updateLights(N.state.lightsArray),we=this.localClippingEnabled,Ce=Ke.init(this.clippingPlanes,we),Ce===!0&&Ke.setGlobalState(this.clippingPlanes,t),te!==null&&Je.render(N.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];ut(o,n,t,e),r.add(o)}else ut(i,n,t,e),r.add(i)}}),N=F.pop(),te!==null&&te.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){let t=V.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Me.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let dt=null;function ft(e){dt&&dt(e)}function pt(){ht.stop()}function mt(){ht.start()}let ht=new Ns;ht.setAnimationLoop(ft),typeof self<`u`&&ht.setContext(self),this.setAnimationLoop=function(e){dt=e,G.setAnimationLoop(e),e===null?ht.stop():ht.start()},G.addEventListener(`sessionstart`,pt),G.addEventListener(`sessionend`,mt),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ee===!0)return;te!==null&&te.renderStart(e,t);let n=G.enabled===!0&&G.isPresenting===!0,r=I!==null&&(R===null||n)&&I.begin(L,R);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(I===null||I.isCompositing()===!1)&&(G.cameraAutoUpdate===!0&&G.updateCamera(t),t=G.getCamera()),e.isScene===!0&&e.onBeforeRender(L,e,t,R),N=We.get(e,F.length),N.init(t),N.state.textureUnits=H.getTextureUnits(),F.push(N),Te.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),Se.setFromProjectionMatrix(Te,Ve,t.reversedDepth),we=this.localClippingEnabled,Ce=Ke.init(this.clippingPlanes,we),A=Ue.get(e,P.length),A.init(),P.push(A),G.enabled===!0&&G.isPresenting===!0){let e=L.xr.getDepthSensingMesh();e!==null&&gt(e,t,-1/0,L.sortObjects)}gt(e,t,0,L.sortObjects),A.finish(),te!==null&&te.updateLights(N.state.lightsArray),L.sortObjects===!0&&A.sort(_e,ve),ke=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,ke&&Ye.addToRenderList(A,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ce===!0&&Ke.beginShadows();let i=N.state.shadowsArray;if(Je.render(i,e,t),Ce===!0&&Ke.endShadows(),(r&&I.hasRenderPass())===!1){let n=A.opaque,r=A.transmissive;if(N.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];vt(n,r,e,a)}ke&&Ye.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];_t(A,e,n,n.viewport)}}else r.length>0&&vt(n,r,e,t),ke&&Ye.render(e),_t(A,e,t)}R!==null&&oe===0&&(H.updateMultisampleRenderTarget(R),H.updateRenderTargetMipmap(R)),r&&I.end(L),e.isScene===!0&&e.onAfterRender(L,e,t),tt.resetDefaultState(),se=-1,ce=null,F.pop(),F.length>0?(N=F[F.length-1],H.setTextureUnits(N.state.textureUnits),Ce===!0&&Ke.setGlobalState(L.clippingPlanes,N.state.camera)):N=null,P.pop(),A=P.length>0?P[P.length-1]:null,te!==null&&te.renderEnd()};function gt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)N.pushLightProbeGrid(e);else if(e.isLight)N.pushLight(e),e.castShadow&&N.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(Se)){r&&De.setFromMatrixPosition(e.matrixWorld).applyMatrix4(Te);let i=ze.update(e),a=e.material;a.visible&&A.push(e,i,a,n,De.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(Se))){let i=ze.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),De.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),De.copy(e.boundingSphere.center)),De.applyMatrix4(e.matrixWorld).applyMatrix4(Te)),Array.isArray(a)){let r=i.groups;for(let o=0,c=r.length;o<c;o++){let c=r[o],l=a[c.materialIndex];l&&l.visible&&A.push(e,i,l,n,De.z,c,t)}}else a.visible&&A.push(e,i,a,n,De.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)gt(i[e],t,n,r)}function _t(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;N.setupLightsView(n),Ce===!0&&Ke.setGlobalState(L.clippingPlanes,n),r&&B.viewport(le.copy(r)),i.length>0&&yt(i,t,n),a.length>0&&yt(a,t,n),o.length>0&&yt(o,t,n),B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function vt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[r.id]===void 0){let e=Me.has(`EXT_color_buffer_half_float`)||Me.has(`EXT_color_buffer_float`);N.state.transmissionRenderTarget[r.id]=new Gt(1,1,{generateMipmaps:!0,type:e?_:u,minFilter:l,samples:Math.max(4,Ne.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Mt.workingColorSpace})}let a=N.state.transmissionRenderTarget[r.id],o=r.viewport||le;a.setSize(o.z*L.transmissionResolutionScale,o.w*L.transmissionResolutionScale);let c=L.getRenderTarget(),d=L.getActiveCubeFace(),f=L.getActiveMipmapLevel();L.setRenderTarget(a),L.getClearColor(fe),pe=L.getClearAlpha(),pe<1&&L.setClearColor(16777215,.5),L.clear(),ke&&Ye.render(n);let p=L.toneMapping;L.toneMapping=0;let m=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),N.setupLightsView(r),Ce===!0&&Ke.setGlobalState(L.clippingPlanes,r),yt(e,n,r),H.updateMultisampleRenderTarget(a),H.updateRenderTargetMipmap(a),Me.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:c,group:l}=t[i];if(c.side===2&&a.layers.test(r.layers)){let t=c.side;c.side=1,c.needsUpdate=!0,bt(a,n,r,o,c,l),c.side=t,c.needsUpdate=!0,e=!0}}e===!0&&(H.updateMultisampleRenderTarget(a),H.updateRenderTargetMipmap(a))}L.setRenderTarget(c,d,f),L.setClearColor(fe,pe),m!==void 0&&(r.viewport=m),L.toneMapping=p}function yt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:c,group:l}=a,u=a.material;u.allowOverride===!0&&r!==null&&(u=r),o.layers.test(n.layers)&&bt(o,t,n,c,u,l)}}function bt(e,t,n,r,i,a){te!==null&&i.isNodeMaterial&&te.setObject(e,i),e.onBeforeRender(L,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(L,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,L.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,L.renderBufferDirect(n,t,r,i,e,a),i.side=2):L.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(L,t,n,r,i,a)}function xt(e,t,n){t.isScene!==!0&&(t=Oe);let r=V.get(e),i=N.state.lights,a=N.state.shadowsArray,o=i.state.version,c=Be.getParameters(e,i.state,a,t,n,N.state.lightProbeGridArray),l=Be.getProgramCacheKey(c),u=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let d=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ie.get(e.envMap||r.environment,d),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,u===void 0&&(e.addEventListener(`dispose`,st),u=new Map,r.programs=u);let f=u.get(l);if(f!==void 0){if(r.currentProgram===f&&r.lightsStateVersion===o)return Ct(e,c),f}else c.uniforms=Be.getUniforms(e),te!==null&&e.isNodeMaterial&&te.build(e,n,c),e.onBeforeCompile(c,L),f=Be.acquireProgram(c,l),u.set(l,f),r.uniforms=c.uniforms;let p=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(p.clippingPlanes=Ke.uniform),Ct(e,c),r.needsLights=Et(e),r.lightsStateVersion=o,r.needsLights&&(p.ambientLightColor.value=i.state.ambient,p.lightProbe.value=i.state.probe,p.sunLights.value=i.state.sun,p.sunLightShadows.value=i.state.sunShadow,p.directionalLights.value=i.state.directional,p.directionalLightShadows.value=i.state.directionalShadow,p.spotLights.value=i.state.spot,p.spotLightShadows.value=i.state.spotShadow,p.rectAreaLights.value=i.state.rectArea,p.ltc_1.value=i.state.rectAreaLTC1,p.ltc_2.value=i.state.rectAreaLTC2,p.pointLights.value=i.state.point,p.pointLightShadows.value=i.state.pointShadow,p.hemisphereLights.value=i.state.hemi,p.sunShadowMatrix.value=i.state.sunShadowMatrix,p.sunShadowCascade.value=i.state.sunShadowCascade,p.directionalShadowMatrix.value=i.state.directionalShadowMatrix,p.spotLightMatrix.value=i.state.spotLightMatrix,p.spotLightMap.value=i.state.spotLightMap,p.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=N.state.lightProbeGridArray.length>0,r.currentProgram=f,r.uniformsList=null,f}function St(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Dl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Ct(e,t){let n=V.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function wt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];O.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(O))return n}return null}function K(e,t,n,r,i){t.isScene!==!0&&(t=Oe),H.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,c=R===null?L.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Mt.workingColorSpace,l=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,u=Ie.get(r.envMap||o,l),d=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,f=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),p=!!n.morphAttributes.position,m=!!n.morphAttributes.normal,h=!!n.morphAttributes.color,g=0;r.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(g=L.toneMapping);let _=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,v=_===void 0?0:_.length,y=V.get(r),b=N.state.lights;if(Ce===!0&&(we===!0||e!==ce)){let t=e===ce&&r.id===se;Ke.setState(r,e,t)}let x=!1;r.version===y.__version?y.needsLights&&y.lightsStateVersion!==b.state.version?x=!0:y.outputColorSpace===c?i.isBatchedMesh&&y.batching===!1||!i.isBatchedMesh&&y.batching===!0||i.isBatchedMesh&&y.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&y.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&y.instancing===!1||!i.isInstancedMesh&&y.instancing===!0||i.isSkinnedMesh&&y.skinning===!1||!i.isSkinnedMesh&&y.skinning===!0||i.isInstancedMesh&&y.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&y.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&y.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&y.instancingMorph===!1&&i.morphTexture!==null?x=!0:y.envMap===u?r.fog===!0&&y.fog!==a||y.numClippingPlanes!==void 0&&(y.numClippingPlanes!==Ke.numPlanes||y.numIntersection!==Ke.numIntersection)?x=!0:y.vertexAlphas===d&&y.vertexTangents===f&&y.morphTargets===p&&y.morphNormals===m&&y.morphColors===h&&y.toneMapping===g&&y.morphTargetsCount===v?!!y.lightProbeGrid!=N.state.lightProbeGridArray.length>0&&(x=!0):x=!0:x=!0:x=!0:(x=!0,y.__version=r.version);let S=y.currentProgram;x===!0&&(S=xt(r,t,i),te&&r.isNodeMaterial&&te.onUpdateProgram(r,S,y));let C=!1,w=!1,T=!1,E=S.getUniforms(),D=y.uniforms;if(B.useProgram(S.program)&&(C=!0,w=!0,T=!0),r.id!==se&&(se=r.id,w=!0),y.needsLights){let e=wt(N.state.lightProbeGridArray,i);y.lightProbeGrid!==e&&(y.lightProbeGrid=e,w=!0)}if(C||ce!==e){B.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),E.setValue(z,`projectionMatrix`,e.projectionMatrix),E.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=E.map.cameraPosition;t!==void 0&&t.setValue(z,Ee.setFromMatrixPosition(e.matrixWorld)),Ne.logarithmicDepthBuffer&&E.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&E.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),ce!==e&&(ce=e,w=!0,T=!0)}if(y.needsLights&&(b.state.sunShadowMap.length>0&&E.setValue(z,`sunShadowMap`,b.state.sunShadowMap,H),b.state.directionalShadowMap.length>0&&E.setValue(z,`directionalShadowMap`,b.state.directionalShadowMap,H),b.state.spotShadowMap.length>0&&E.setValue(z,`spotShadowMap`,b.state.spotShadowMap,H),b.state.pointShadowMap.length>0&&E.setValue(z,`pointShadowMap`,b.state.pointShadowMap,H)),i.isSkinnedMesh){E.setOptional(z,i,`bindMatrix`),E.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),E.setValue(z,`boneTexture`,e.boneTexture,H))}i.isBatchedMesh&&(E.setOptional(z,i,`batchingTexture`),E.setValue(z,`batchingTexture`,i._matricesTexture,H),E.setOptional(z,i,`batchingIdTexture`),E.setValue(z,`batchingIdTexture`,i._indirectTexture,H),E.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&E.setValue(z,`batchingColorTexture`,i._colorsTexture,H));let O=n.morphAttributes;if((O.position!==void 0||O.normal!==void 0||O.color!==void 0)&&Ze.update(i,n,S),(w||y.receiveShadow!==i.receiveShadow)&&(y.receiveShadow=i.receiveShadow,E.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(D.envMapIntensity.value=t.environmentIntensity),D.dfgLUT!==void 0&&(D.dfgLUT.value=Ju()),w){if(E.setValue(z,`toneMappingExposure`,L.toneMappingExposure),y.needsLights&&Tt(D,T),a&&r.fog===!0&&He.refreshFogUniforms(D,a),He.refreshMaterialUniforms(D,r,ge,he,N.state.transmissionRenderTarget[e.id]),y.needsLights&&y.lightProbeGrid){let e=y.lightProbeGrid;D.probesSH.value=e.texture,D.probesMin.value.copy(e.boundingBox.min),D.probesMax.value.copy(e.boundingBox.max),D.probesResolution.value.copy(e.resolution)}Dl.upload(z,St(y),D,H)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Dl.upload(z,St(y),D,H),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&E.setValue(z,`center`,i.center),E.setValue(z,`modelViewMatrix`,i.modelViewMatrix),E.setValue(z,`normalMatrix`,i.normalMatrix),E.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];nt.update(n,S),nt.bind(n,S)}}return S}function Tt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Et(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ae},this.getActiveMipmapLevel=function(){return oe},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(e,t,n){let r=V.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),V.get(e.texture).__webglTexture=t,V.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=V.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){R=e,ae=t,oe=n;let r=null,i=!1,a=!1;if(e){let o=V.get(e);if(o.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest,B.viewport(le),B.scissor(ue),B.setScissorTest(de),se=-1;return}if(o.__webglFramebuffer===void 0)H.setupRenderTarget(e);else if(o.__hasExternalTextures)H.rebindTextures(e,V.get(e.texture).__webglTexture,V.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&V.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);H.setupDepthRenderbuffer(e)}}let c=e.texture;(c.isData3DTexture||c.isDataArrayTexture||c.isCompressedArrayTexture)&&(a=!0);let l=V.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(l[t])?l[t][n]:l[t],i=!0):r=e.samples>0&&H.useMultisampledRTT(e)===!1?V.get(e).__webglMultisampledFramebuffer:Array.isArray(l)?l[n]:l,le.copy(e.viewport),ue.copy(e.scissor),de=e.scissorTest}else le.copy(ye).multiplyScalar(ge).floor(),ue.copy(be).multiplyScalar(ge).floor(),de=xe;if(n!==0&&(r=ne),B.bindFramebuffer(z.FRAMEBUFFER,r)&&B.drawBuffers(e,r),B.viewport(le),B.scissor(ue),B.setScissorTest(de),i){let r=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=V.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=V.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}se=-1};function Dt(e){let t=V.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ne.textureFormatReadable(e.format),t.__typeReadable=Ne.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,c=0){if(!(e&&e.isWebGLRenderTarget)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let l=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(l=l[o]),l){B.bindFramebuffer(z.FRAMEBUFFER,l);try{let o=e.textures[c],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+c);let d=Dt(o);if(d.__formatReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(d.__typeReadable===!1){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,et.convert(l),et.convert(u),a)}finally{let e=R===null?null:V.get(R).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,c=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let l=V.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(l=l[o]),l){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){B.bindFramebuffer(z.FRAMEBUFFER,l);let o=e.textures[c],u=o.format,d=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+c);let f=Dt(o);if(f.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(f.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let p=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,p),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,et.convert(u),et.convert(d),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let m=R===null?null:V.get(R).__webglFramebuffer;B.bindFramebuffer(z.FRAMEBUFFER,m);let h=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Xe(z,h,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,p),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(p),z.deleteSync(h),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,c=t===null?0:t.y;H.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,c,i,a),B.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,c,l,u,d,f,p,m,h,g=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,c=n.max.y-n.min.y,l=n.isBox3?n.max.z-n.min.z:1,u=n.min.x,d=n.min.y,f=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(g.width*t),c=Math.floor(g.height*t),l=e.isDataArrayTexture?g.depth:e.isData3DTexture?Math.floor(g.depth*t):1,u=0,d=0,f=0}r===null?(p=0,m=0,h=0):(p=r.x,m=r.y,h=r.z);let _=et.convert(t.format),v=et.convert(t.type),y;t.isData3DTexture?(H.setTexture3D(t,0),y=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(H.setTexture2DArray(t,0),y=z.TEXTURE_2D_ARRAY):(H.setTexture2D(t,0),y=z.TEXTURE_2D),B.activeTexture(z.TEXTURE0),B.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),B.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),B.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let b=B.getParameter(z.UNPACK_ROW_LENGTH),x=B.getParameter(z.UNPACK_IMAGE_HEIGHT),S=B.getParameter(z.UNPACK_SKIP_PIXELS),C=B.getParameter(z.UNPACK_SKIP_ROWS),w=B.getParameter(z.UNPACK_SKIP_IMAGES);B.pixelStorei(z.UNPACK_ROW_LENGTH,g.width),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,g.height),B.pixelStorei(z.UNPACK_SKIP_PIXELS,u),B.pixelStorei(z.UNPACK_SKIP_ROWS,d),B.pixelStorei(z.UNPACK_SKIP_IMAGES,f);let T=e.isDataArrayTexture||e.isData3DTexture,E=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=V.get(e),r=V.get(t),g=V.get(n.__renderTarget),_=V.get(r.__renderTarget);B.bindFramebuffer(z.READ_FRAMEBUFFER,g.__webglFramebuffer),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,_.__webglFramebuffer);for(let n=0;n<l;n++)T&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(e).__webglTexture,i,f+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,V.get(t).__webglTexture,a,h+n)),z.blitFramebuffer(u,d,o,c,p,m,o,c,z.DEPTH_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||V.has(e)){let n=V.get(e),r=V.get(t);B.bindFramebuffer(z.READ_FRAMEBUFFER,re),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,ie);for(let e=0;e<l;e++)T?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,f+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),E?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,h+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?E?z.copyTexSubImage3D(y,a,p,m,h+e,u,d,o,c):z.copyTexSubImage2D(y,a,p,m,u,d,o,c):z.blitFramebuffer(u,d,o,c,p,m,o,c,z.COLOR_BUFFER_BIT,z.NEAREST);B.bindFramebuffer(z.READ_FRAMEBUFFER,null),B.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else E?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(y,a,p,m,h,o,c,l,_,v,g.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(y,a,p,m,h,o,c,l,_,g.data):z.texSubImage3D(y,a,p,m,h,o,c,l,_,v,g):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,p,m,o,c,_,v,g.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,p,m,g.width,g.height,_,g.data):z.texSubImage2D(z.TEXTURE_2D,a,p,m,o,c,_,v,g);B.pixelStorei(z.UNPACK_ROW_LENGTH,b),B.pixelStorei(z.UNPACK_IMAGE_HEIGHT,x),B.pixelStorei(z.UNPACK_SKIP_PIXELS,S),B.pixelStorei(z.UNPACK_SKIP_ROWS,C),B.pixelStorei(z.UNPACK_SKIP_IMAGES,w),a===0&&t.generateMipmaps&&z.generateMipmap(y),B.unbindTexture()},this.initRenderTarget=function(e){V.get(e).__webglFramebuffer===void 0&&H.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?H.setTextureCube(e,0):e.isData3DTexture?H.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?H.setTexture2DArray(e,0):H.setTexture2D(e,0),B.unbindTexture()},this.resetState=function(){ae=0,oe=0,R=null,B.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ve}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Mt._getUnpackColorSpace()}};function Xu(){let e=new Yu({antialias:!0,powerPreference:`high-performance`});e.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),e.setSize(innerWidth,innerHeight),document.getElementById(`app`).appendChild(e.domElement);let t=new Mn;t.background=new Y(11127776),t.fog=new jn(12900040,90,380);let n=new us(68,innerWidth/innerHeight,.1,430);t.add(new Qo(13624319,7035452,1.7));let r=new ps(16773328,2.2);r.position.set(30,80,60),t.add(r);let i=document.createElement(`canvas`);i.width=i.height=128;let a=i.getContext(`2d`),o=a.createRadialGradient(64,64,0,64,64,64);o.addColorStop(0,`rgba(255,250,225,1)`),o.addColorStop(.18,`rgba(255,240,190,.85)`),o.addColorStop(.5,`rgba(255,225,150,.18)`),o.addColorStop(1,`rgba(255,220,140,0)`),a.fillStyle=o,a.fillRect(0,0,128,128);let c=new Xr(new Ir({map:new zi(i),fog:!1,transparent:!0,depthWrite:!1,blending:2}));c.scale.setScalar(130),t.add(c);let l=new q(-.2,.65,-.72).normalize();return addEventListener(`resize`,()=>{e.setSize(innerWidth,innerHeight),n.aspect=innerWidth/innerHeight,n.updateProjectionMatrix()}),addEventListener(`orientationchange`,()=>setTimeout(()=>dispatchEvent(new Event(`resize`)),300)),{renderer:e,scene:t,camera:n,follow:e=>c.position.copy(e.position).addScaledVector(l,300)}}var Zu={width:240,length:300,height:40,wallThickness:2},Qu={width:18,height:26},$u=11569722,ed={width:240,length:130,spawnZ:95},td=[{name:`PARSHU DWAAR`,accent:16747039},{name:`KHADGA DWAAR`,accent:14229551},{name:`VAJRA DWAAR`,accent:15773744},{name:`TRISHOOL DWAAR`,accent:4890111},{name:`CHAKRA DWAAR`,accent:3133632},{name:`SHAANTI DWAAR`,accent:16773824}],nd=[{id:`parshu`,name:`Parshu Dwaar`,statue:`parshu`,accent:16747039,wall:`#a89877`},{id:`khadga`,name:`Khadga Dwaar`,statue:`khadga`,accent:14229551,wall:`#a58a76`},{id:`gada`,name:`Vajra Dwaar`,statue:`gada`,accent:15773744,wall:`#9a9a90`},{id:`trishool`,name:`Trishool Dwaar`,statue:`trishool`,accent:4890111,wall:`#a99f7c`},{id:`chakra`,name:`Chakra Dwaar`,statue:`chakra`,accent:3133632,wall:`#a38264`}],rd={},id=(e,t={})=>rd[e+JSON.stringify(t)]??=new ko({color:e,...t}),ad=()=>id($u,{emissive:1708548}),od=(e,t=.6)=>id(e,{emissive:e,emissiveIntensity:t}),sd=()=>id(5208626),cd={};function ld(t,n){let r=t+n;if(cd[r])return cd[r];let i=document.createElement(`canvas`);i.width=i.height=256;let a=i.getContext(`2d`);a.fillStyle=t,a.fillRect(0,0,256,256);for(let e=0;e<400;e++)a.fillStyle=`rgba(30,25,15,${Math.random()*.1})`,a.fillRect(Math.random()*256,Math.random()*256,3+Math.random()*9,3+Math.random()*9);a.strokeStyle=`rgba(35,28,18,.6)`,a.lineWidth=3,a.strokeRect(0,0,256,256),a.lineWidth=1.5;for(let e=0;e<5;e++){a.beginPath();let e=Math.random()*256,t=Math.random()*256;a.moveTo(e,t);for(let n=0;n<4;n++)a.lineTo(e+=Math.random()*40-20,t+=Math.random()*40);a.stroke()}for(let e=0;e<26*n;e++){let e=Math.random()*256,t=Math.random()*256,n=6+Math.random()*26;a.fillStyle=`rgba(${60+Math.random()*30},${100+Math.random()*40},40,${.25+Math.random()*.35})`,a.beginPath(),a.arc(e,t,n,0,7),a.fill()}let o=new zi(i);return o.wrapS=o.wrapT=e,o.colorSpace=Fe,cd[r]=o}function ud(e,t,n,r=1){let i=ld(e,r).clone();return i.needsUpdate=!0,i.repeat.set(t,n),new ko({map:i})}var dd=new Ui(1,1,1),fd=(e,t,n,r,i=[0,0,0])=>{let a=new X(dd,r);return a.scale.set(e,t,n),a.position.set(...i),a},pd=1.05,md=null,hd=null;function gd(){if(md)return md;let e=document.createElement(`canvas`);e.width=e.height=64;let t=e.getContext(`2d`),n=t.createRadialGradient(32,32,0,32,32,32);return n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.25,`rgba(255,225,150,0.85)`),n.addColorStop(.6,`rgba(255,140,40,0.25)`),n.addColorStop(1,`rgba(255,100,20,0)`),t.fillStyle=n,t.fillRect(0,0,64,64),md=new zi(e),md.colorSpace=Fe,md}function _d(){if(hd)return hd;let e=document.createElement(`canvas`);e.width=32,e.height=256;let t=e.getContext(`2d`),n=t.createLinearGradient(0,0,0,256);n.addColorStop(0,`rgba(255,60,10,0)`),n.addColorStop(.4,`rgba(255,110,30,0.3)`),n.addColorStop(.8,`rgba(255,190,80,0.8)`),n.addColorStop(1,`rgba(255,250,225,1)`),t.fillStyle=n,t.fillRect(0,0,32,256),t.globalCompositeOperation=`destination-in`;let r=t.createLinearGradient(0,0,32,0);return r.addColorStop(0,`rgba(0,0,0,0)`),r.addColorStop(.5,`rgba(0,0,0,1)`),r.addColorStop(1,`rgba(0,0,0,0)`),t.fillStyle=r,t.fillRect(0,0,32,256),hd=new zi(e),hd.colorSpace=Fe,hd}var vd=null,yd=null;function bd(){if(vd)return{G:vd,M:yd};let e=new Gi(.07,.07,3.4,6);e.rotateX(Math.PI/2),e.translate(0,0,-.2);let t=new Ki(.22,.8,6);t.rotateX(-Math.PI/2),t.translate(0,0,-2.2);let n=new Gi(.11,.11,.2,6);n.rotateX(Math.PI/2),n.translate(0,0,-1.75);let r=new mo(.9,.55);r.rotateY(Math.PI/2);let i=r.clone();return i.rotateZ(Math.PI/2),r.translate(0,0,1),i.translate(0,0,1),vd={shaft:e,head:t,collar:n,finA:r,finB:i,streak:new mo(.45,1)},yd={shaft:new ri({color:14727288,fog:!1}),head:new ri({color:15397110,fog:!1}),collar:new ri({color:15777872,fog:!1}),finA:new ri({color:13642282,side:2,fog:!1}),finB:new ri({color:15918792,side:2,fog:!1}),streak:new ri({map:_d(),transparent:!0,blending:2,depthWrite:!1,side:2,fog:!1})},{G:vd,M:yd}}function xd(e,t){for(let n of e.userData.meshes)n.scale.y=t,n.position.z=t/2}function Sd({streak:e=!1}={}){let{G:t,M:n}=bd(),r=new Cn;r.add(new X(t.shaft,n.shaft),new X(t.head,n.head),new X(t.collar,n.collar),new X(t.finA,n.finA),new X(t.finB,n.finB));let i=new Xr(new Ir({map:gd(),color:16760928,blending:2,depthWrite:!1,transparent:!0,fog:!1}));i.position.z=-2.6,i.scale.setScalar(2),r.add(i);let a=null;if(e){a=new Cn;let e=new X(t.streak,n.streak);e.rotation.x=Math.PI/2;let i=new Cn;i.rotation.z=Math.PI/2;let o=new X(t.streak,n.streak);o.rotation.x=Math.PI/2,i.add(o),a.add(e,i),a.userData.meshes=[e,o],a.position.z=1.4,xd(a,5),r.add(a)}return{group:r,glow:i,streak:a}}var Cd=new q,wd=new q(0,1,0);function Td(e,t,n){let r=Cd.subVectors(n,t),i=r.length();e.position.copy(t).add(n).multiplyScalar(.5),e.quaternion.setFromUnitVectors(wd,r.divideScalar(i||1)),e.scale.y=i}function Ed(){let e=new Cn,t=id(4858130),n=id(2758156),r=ad(),i=new ri({color:16753210,fog:!1}),a=new ri({color:16773824,fog:!1}),o=[.45,1.4,2.4,3.3],c=[0,.14,.55,pd],l=[0,.1,.32,.7],u=[.19,.16,.13,.09],d=[0,1,2].map(e=>new Gi(u[e+1],u[e],1,6)),f=[new go(.2,8,6),new go(.17,8,6)],p=new go(.15,8,6),m=[[],[]],h=[[],[]],g=[[],[]],_=[];for(let n=0;n<2;n++){for(let e=0;e<4;e++)m[n].push(new q);for(let r=0;r<3;r++){let i=new X(d[r],t);e.add(i),h[n].push(i)}for(let t=0;t<2;t++){let i=new X(f[t],r);e.add(i),g[n].push(i)}let a=new X(p,i);e.add(a),_.push(a)}e.add(new X(new Ui(.26,1,.28),n));for(let t of[.52,-.52]){let n=new X(new Ui(.36,.14,.38),r);n.position.y=t,e.add(n)}function v(e){for(let t=0;t<2;t++){let n=t?-1:1;for(let r=0;r<4;r++)m[t][r].set(0,n*o[r]*(1-.05*e*r/3),c[r]+l[r]*e);for(let e=0;e<3;e++)Td(h[t][e],m[t][e],m[t][e+1]);g[t][0].position.copy(m[t][1]),g[t][1].position.copy(m[t][2]),_[t].position.copy(m[t][3])}}v(0);let y=new Gi(.03,.03,1,4),b=new X(y,a),x=new X(y,a);e.add(b,x);let S=Sd();S.group.visible=!1,e.add(S.group);let C=new q,w=0,T=0;function E(e,t,n){T+=e,w=Math.max(0,w-e*3),v(t+Math.sin(T*50)*.12*w*w);let r=pd+2*t;C.set(Math.sin(T*60)*.22*w*w,0,r),Td(b,m[0][3],C),Td(x,C,m[1][3]),S.group.visible=n,S.group.position.set(0,0,r-1.5),S.glow.material.opacity=.25+.75*t;let i=1+(t>=1?.25+Math.sin(T*14)*.12:0);_.forEach(e=>e.scale.setScalar(i))}return{group:e,update:E,release(){w=1},arrowWorld(e){return S.group.getWorldPosition(e)}}}var Dd=1.28,Od=Dd,kd=e=>90+130*e,Ad=e=>26-18*e,jd=24,Md=2.6,Nd=new q(0,0,-1),Pd=new q(1,0,0),Fd=new Tt,Id=new q,Ld=new q,Rd=new q,zd=new q,Bd=()=>Math.random(),Vd=class{constructor(e,t=700){this.max=t,this.i=0,this.pos=new Float32Array(t*3);for(let e=0;e<t;e++)this.pos[e*3+1]=-1e3;this.vel=new Float32Array(t*3),this.t=new Float32Array(t).fill(1),this.sz=new Float32Array(t),this.base=new Float32Array(t),this.age=new Float32Array(t).fill(1),this.life=new Float32Array(t).fill(1);let n=new Er,r=Be;n.setAttribute(`position`,new dr(this.pos,3).setUsage(r)),n.setAttribute(`aT`,new dr(this.t,1).setUsage(r)),n.setAttribute(`aSize`,new dr(this.sz,1).setUsage(r)),this.material=new Eo({uniforms:{uScale:{value:600}},transparent:!0,depthWrite:!1,blending:2,vertexShader:`
        attribute float aT; attribute float aSize; varying float vT; uniform float uScale;
        void main() {
          vT = aT;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (1.0 - aT * 0.5) * uScale / max(-mv.z, 0.1);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vT;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float a = pow(1.0 - d, 1.6) * (1.0 - vT);
          vec3 col = mix(vec3(1.0, 0.88, 0.5), vec3(1.0, 0.25, 0.05), vT);
          gl_FragColor = vec4(col * a * 1.5, a);
        }`}),this.points=new Ii(n,this.material),this.points.frustumCulled=!1,e.add(this.points),this.geo=n}emit(e,t,n,r,i,a,o,c){let l=this.i;this.i=(l+1)%this.max,this.pos[l*3]=e,this.pos[l*3+1]=t,this.pos[l*3+2]=n,this.vel[l*3]=r,this.vel[l*3+1]=i,this.vel[l*3+2]=a,this.age[l]=0,this.life[l]=o,this.base[l]=c}burst(e,t,n,r,i){for(let a=0;a<t;a++){let t=Bd()*6.283,a=Bd()*2-1,o=Math.sqrt(1-a*a),c=n*(.4+Bd()*.6);this.emit(e.x,e.y,e.z,Math.cos(t)*o*c,Math.abs(a)*c*.8+2,Math.sin(t)*o*c,r*(.6+Bd()*.5),i*(.6+Bd()*.7))}}update(e){this.material.uniforms.uScale.value=innerHeight*Math.min(devicePixelRatio,1.5)*.74;let{pos:t,vel:n,t:r,sz:i,base:a,age:o,life:c}=this;for(let l=0;l<this.max;l++){if(o[l]>=c[l])continue;o[l]+=e;let u=o[l]/c[l];if(u>=1){i[l]=0,r[l]=1;continue}let d=1-Math.min(1,2.2*e);n[l*3]*=d,n[l*3+1]=n[l*3+1]*d-5*e,n[l*3+2]*=d,t[l*3]+=n[l*3]*e,t[l*3+1]+=n[l*3+1]*e,t[l*3+2]+=n[l*3+2]*e,r[l]=u,i[l]=a[l]}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.aT.needsUpdate=!0,this.geo.attributes.aSize.needsUpdate=!0}},Hd=class{constructor(e,t){this.temple=t,this.sparks=new Vd(e),this.targets=[],this.pool=[],this.clock=0,this.prev=new q,this.dirV=new q;for(let t=0;t<jd;t++){let t=Sd({streak:!0});t.group.visible=!1,t.group.scale.setScalar(Od),e.add(t.group),this.pool.push({...t,active:!1,stuck:!1,life:0,age:0,born:0,acc:0,g:0,wob:0,sc:1,pos:new q,vel:new q,tip:new q,baseQ:new Tt})}}shoot(e,t,n,r=1){let i=this.pool.find(e=>!e.active);i||=this.pool.reduce((e,t)=>t.born<e.born?t:e),i.active=!0,i.stuck=!1,i.age=0,i.acc=0,i.wob=0,i.born=++this.clock,i.sc=r,i.pos.copy(e),i.vel.copy(t).multiplyScalar(kd(n)),i.g=Ad(n),i.group.visible=!0,i.group.scale.setScalar(Od*i.sc),i.streak.visible=!0,i.glow.visible=!0,xd(i.streak,3+5*n),i.group.position.copy(i.pos),i.group.quaternion.setFromUnitVectors(Nd,t);for(let n=0;n<12;n++){let n=6+Bd()*14;this.sparks.emit(e.x,e.y,e.z,t.x*n+(Bd()-.5)*8,t.y*n+(Bd()-.5)*8,t.z*n+(Bd()-.5)*8,.22+Bd()*.2,.8+Bd()*.8)}}trail(e){let t=e.pos,n=this.dirV;this.sparks.emit(t.x-n.x*2.2*Od+(Bd()-.5)*.4,t.y-n.y*2.2*Od+(Bd()-.5)*.4,t.z-n.z*2.2*Od+(Bd()-.5)*.4,(Bd()-.5)*3,(Bd()-.5)*3+1,(Bd()-.5)*3,.35+Bd()*.2,.9+Bd()*.6)}hitTest(e){let t=e.pos,n=this.prev,r=this.temple;if(t.y<=.1){let e=wt.clamp((n.y-.1)/(n.y-t.y||1),0,1);return t.lerpVectors(n,t,e),t.y=.1,!0}let i=r.gateZs,a=Zu.width/2;if(t.z<0&&t.z>i[i.length-1]&&Math.abs(t.x)>a&&t.y<Zu.height)return t.x=Math.sign(t.x)*a,!0;for(let e=0;e<i.length;e++){let a=n.z-i[e],o=t.z-i[e];if(a*o<=0&&a!==o){let c=a/(a-o),l=n.x+(t.x-n.x)*c,u=n.y+(t.y-n.y)*c,d=r.gates[e].p<.7;if(u<Zu.height&&(Math.abs(l)>Qu.width/2||u>Qu.height||d))return t.set(l,u,i[e]+(a>0?1.2:-1.2)),!0}}for(let e of r.colliders){let n=t.x-e.x,r=t.z-e.z;if(n*n+r*r<(e.r+.3)*(e.r+.3)&&t.y<36)return!0}for(let r of this.targets){Ld.subVectors(t,n),Rd.subVectors(r.position,n);let i=wt.clamp(Rd.dot(Ld)/(Ld.lengthSq()||1),0,1);if(zd.copy(n).addScaledVector(Ld,i),zd.distanceTo(r.position)<r.radius)return t.copy(zd),r.onHit&&r.onHit(e),!0}return!1}placeStuck(e,t){let n=e.wob;n>0?Fd.setFromAxisAngle(Pd,Math.sin(n*75)*n*.45):Fd.identity(),e.group.quaternion.copy(e.baseQ).multiply(Fd),Id.copy(Nd).applyQuaternion(e.group.quaternion),e.group.position.copy(e.tip).addScaledVector(Id,-2.6*Od*t),e.group.scale.setScalar(Od*t)}stick(e){e.stuck=!0,e.life=5,e.wob=.45,e.sc=1,e.baseQ.copy(e.group.quaternion),e.tip.copy(e.pos).addScaledVector(this.dirV,3.9000000000000004*Od),e.streak.visible=!1,e.glow.visible=!1,this.placeStuck(e,1),this.sparks.burst(e.tip,16,14,.45,1.2),this.sparks.emit(e.tip.x,e.tip.y,e.tip.z,0,0,0,.12,4.5)}update(e){this.sparks.update(e);for(let t of this.pool){if(!t.active)continue;if(t.stuck){if(t.life-=e,t.life<=0){t.active=!1,t.group.visible=!1;continue}t.wob>0&&(t.wob=Math.max(0,t.wob-e)),this.placeStuck(t,Math.min(1,t.life/.6));continue}t.age+=e,t.sc<1&&(t.sc=Math.min(1,t.sc+e*7),t.group.scale.setScalar(Od*t.sc));let n=Math.max(1,Math.ceil(t.vel.length()*e/2)),r=e/n,i=!1,a=this._off||=new q;for(let e=0;e<n&&!i;e++)for(this.prev.copy(t.pos),t.vel.y-=t.g*r,t.pos.addScaledVector(t.vel,r),this.dirV.copy(t.vel).normalize(),a.copy(this.dirV).multiplyScalar(Md*Od*t.sc),t.pos.add(a),this.prev.add(a),i=this.hitTest(t),t.pos.sub(a),this.prev.sub(a),t.acc+=this.prev.distanceTo(t.pos);t.acc>1.4;)t.acc-=1.4,this.trail(t);t.group.position.copy(t.pos),t.group.quaternion.setFromUnitVectors(Nd,this.dirV),i?this.stick(t):(t.age>6||t.pos.y<-30)&&(t.active=!1,t.group.visible=!1)}}},Ud=.0055,Wd=55,Gd=.4,Kd=matchMedia(`(pointer: coarse)`).matches||`ontouchstart`in window||/[?&]touch/.test(location.search),qd=class{constructor(e){this.p=e,this.joyId=null,this.lookId=null,this.aimId=null,this.runId=null,this.runLock=!1,this.hintOn=!1,this.hintDone=!1,this.build(),this.bindMove(),this.bindLook(),this.bindAim(),this.bindRun(),this.jumpB.addEventListener(`pointerdown`,e=>{e.preventDefault(),this.p.jump()});let t=document.getElementById(`hint`);t&&t.remove();let n=document.querySelector(`meta[name=viewport]`);n||(n=document.createElement(`meta`),n.name=`viewport`,document.head.appendChild(n)),n.content=`width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover`,document.documentElement.style.overscrollBehavior=`none`,document.body.style.touchAction=`none`,addEventListener(`resize`,()=>{this.joyId===null&&this.defaultBase()}),setInterval(()=>this.checkHint(),400)}build(){let e=document.createElement(`style`);e.textContent=`
#touch{--r:max(24px,env(safe-area-inset-right));--b:max(16px,env(safe-area-inset-bottom));--aim:84px;--sm:56px;--jx:100px;--jy:110px;
position:fixed;inset:0;z-index:100;display:none;pointer-events:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;touch-action:none}
@media (max-height:420px){#touch{--aim:72px;--sm:48px;--jy:86px}}
#touch *{touch-action:none;-webkit-tap-highlight-color:transparent}
#tlook{position:absolute;inset:0;pointer-events:auto}
#tmove{position:absolute;left:0;bottom:0;width:36%;height:60%;pointer-events:auto}
#tbase{position:absolute;width:112px;height:112px;margin:-56px 0 0 -56px;border-radius:50%;pointer-events:none;
border:2px solid rgba(255,214,120,.45);background:rgba(30,16,8,.25);opacity:.45;transition:opacity .15s}
#tbase.on{opacity:.95}
#tknob{position:absolute;left:50%;top:50%;width:50px;height:50px;margin:-25px 0 0 -25px;border-radius:50%;
background:rgba(255,214,120,.55);border:2px solid rgba(255,235,170,.85)}
#taim,#trun,#tjump{position:absolute;border-radius:50%;pointer-events:auto;display:flex;flex-direction:column;align-items:center;justify-content:center;
font:bold 13px Georgia,serif;color:#f6e6b8;background:rgba(30,16,8,.5);border:2px solid rgba(255,214,120,.7);box-shadow:0 0 10px rgba(255,170,60,.35)}
#taim{right:var(--r);bottom:var(--b);width:var(--aim);height:var(--aim);font-size:17px}
#tjump{right:calc(var(--r) + var(--aim) + 12px);bottom:var(--b);width:var(--sm);height:var(--sm)}
#trun{left:calc(var(--jx) - var(--sm) / 2);bottom:calc(var(--jy) + 68px);width:var(--sm);height:var(--sm)}
#taim.on{background:rgba(255,150,40,.5);border-color:#fff}
#trun.on{background:rgba(255,190,70,.45);border-color:#fff}
#trun small{font-size:9px;opacity:.85}
#thint{position:absolute;right:max(4px,calc(var(--r) + var(--aim) / 2 - 65px));bottom:calc(var(--b) + var(--aim) + 6px);width:130px;text-align:center;
font:12px/1.35 Georgia,serif;color:rgba(255,236,190,.85);text-shadow:0 1px 3px #000;opacity:0;transition:opacity .6s;pointer-events:none}
#thint.on{opacity:1}
#trot{display:none;position:absolute;inset:0;align-items:center;justify-content:center;text-align:center;padding:20px;
background:rgba(0,0,0,.85);color:#f3e2b3;font:18px Georgia,serif;pointer-events:none}
@media (orientation:portrait){#trot{display:flex}}
#hint{display:none !important}`,document.head.appendChild(e);let t=(e,t,n=``)=>{let r=document.createElement(`div`);return r.id=e,r.innerHTML=n,t.appendChild(r),r};this.root=t(`touch`,document.body),this.lookZ=t(`tlook`,this.root),this.moveZ=t(`tmove`,this.root),this.base=t(`tbase`,this.root),this.knob=t(`tknob`,this.base),this.hintEl=t(`thint`,this.root,`hold to aim<br>leave to shoot`),this.runB=t(`trun`,this.root,`RUN`),this.aimB=t(`taim`,this.root,`AIM`),this.jumpB=t(`tjump`,this.root,`JUMP`),t(`trot`,this.root,`Phone ko landscape<br>mein ghumao`),this.defaultBase()}show(){this.root.style.display=`block`,this.defaultBase()}placeBase(e,t){this.base.style.left=e+`px`,this.base.style.top=t+`px`}defaultBase(){let e=getComputedStyle(this.root),t=parseFloat(e.getPropertyValue(`--jx`))||100,n=parseFloat(e.getPropertyValue(`--jy`))||110;this.placeBase(t,innerHeight-n)}bindMove(){let e=this.moveZ;e.addEventListener(`pointerdown`,t=>{this.joyId===null&&(this.joyId=t.pointerId,e.setPointerCapture(t.pointerId),this.jx=t.clientX,this.jy=t.clientY,this.placeBase(this.jx,this.jy),this.base.classList.add(`on`),this.stick(t))}),e.addEventListener(`pointermove`,e=>{e.pointerId===this.joyId&&this.stick(e)});let t=e=>{e.pointerId===this.joyId&&(this.joyId=null,this.resetStick())};e.addEventListener(`pointerup`,t),e.addEventListener(`pointercancel`,t)}setDir(e,t,n,r){let i=this.p.keys;i.KeyW=e,i.KeyS=t,i.KeyA=n,i.KeyD=r}stick(e){let t=e.clientX-this.jx,n=e.clientY-this.jy,r=Math.min(1,Wd/(Math.hypot(t,n)||1));t*=r,n*=r,this.knob.style.transform=`translate(${t}px,${n}px)`;let i=Gd*Wd;this.setDir(n<-22,n>i,t<-22,t>i)}resetStick(){this.knob.style.transform=``,this.base.classList.remove(`on`),this.defaultBase(),this.setDir(!1,!1,!1,!1)}rotate(e,t){let n=this.p,r=Ud*(1-.45*n.draw);n.yaw-=e*r,n.pitch=wt.clamp(n.pitch-t*r,-1.35,1.35)}bindLook(){let e=this.lookZ;e.addEventListener(`pointerdown`,t=>{this.lookId===null&&(this.lookId=t.pointerId,e.setPointerCapture(t.pointerId),this.lx=t.clientX,this.ly=t.clientY)}),e.addEventListener(`pointermove`,e=>{e.pointerId===this.lookId&&(this.rotate(e.clientX-this.lx,e.clientY-this.ly),this.lx=e.clientX,this.ly=e.clientY)});let t=e=>{e.pointerId===this.lookId&&(this.lookId=null)};e.addEventListener(`pointerup`,t),e.addEventListener(`pointercancel`,t)}bindAim(){let e=this.aimB;e.addEventListener(`pointerdown`,t=>{this.aimId===null&&(this.aimId=t.pointerId,e.setPointerCapture(t.pointerId),this.ax=t.clientX,this.ay=t.clientY,this.p.lmb=!0,e.classList.add(`on`))}),e.addEventListener(`pointermove`,e=>{e.pointerId===this.aimId&&(this.rotate(e.clientX-this.ax,e.clientY-this.ay),this.ax=e.clientX,this.ay=e.clientY)});let t=t=>{t.pointerId===this.aimId&&(this.aimId=null,this.p.lmb=!1,e.classList.remove(`on`),this.hintDone=!0,this.hintEl.classList.remove(`on`))};e.addEventListener(`pointerup`,t),e.addEventListener(`pointercancel`,t)}bindRun(){this.runB.addEventListener(`pointerdown`,e=>{e.preventDefault(),this.runLock=!this.runLock,this.applyRun()})}applyRun(){let e=this.runLock;this.p.keys.ShiftLeft=e,this.runB.classList.toggle(`on`,e),this.runB.innerHTML=e?`RUN<small>ON</small>`:`RUN`}checkHint(){this.hintDone||this.hintOn||this.root.style.display!==`block`||this.p.pos.z<-6&&(this.hintOn=!0,this.hintEl.classList.add(`on`),setTimeout(()=>{this.hintDone=!0,this.hintEl.classList.remove(`on`)},12e3))}},Jd=class{constructor(e=100){this.max=e;let t=document.createElement(`style`);t.textContent=`
#hpwrap{position:fixed;top:max(14px,env(safe-area-inset-top));left:max(14px,env(safe-area-inset-left));z-index:20;width:200px;
pointer-events:none;font:bold 13px Georgia,serif;color:#f6e6b8;text-shadow:0 1px 3px #000}
#hptrack{height:14px;margin-top:4px;background:rgba(0,0,0,.55);border:1px solid rgba(255,214,120,.6);border-radius:7px;overflow:hidden}
#hpfill{height:100%;width:100%;background:linear-gradient(90deg,#3fae4a,#8be06a);transition:width .25s}
#hpfill.mid{background:linear-gradient(90deg,#d98a1c,#ffc65a)}
#hpfill.low{background:linear-gradient(90deg,#b81818,#ff5a4a)}
#shwrap{display:none;margin-top:6px;color:#bfe3ff}
#shtrack{height:7px;margin-top:3px;background:rgba(0,0,0,.55);border:1px solid rgba(120,190,255,.7);border-radius:4px;overflow:hidden}
#shfill{height:100%;width:100%;background:linear-gradient(90deg,#2f8cff,#8fd4ff)}
#shfx{position:fixed;inset:0;z-index:13;pointer-events:none;opacity:0;transition:opacity .25s;box-shadow:inset 0 0 70px 6px rgba(80,170,255,.28)}
#gover{position:fixed;inset:0;z-index:2000;display:none;flex-direction:column;align-items:center;justify-content:center;gap:18px;
background:rgba(0,0,0,.78);color:#f3e2b3;font:bold 34px Georgia,serif;text-align:center}
#gover button{font:bold 18px Georgia,serif;padding:10px 26px;border-radius:10px;border:2px solid rgba(255,214,120,.8);
background:rgba(60,30,10,.85);color:#f6e6b8;cursor:pointer}`,document.head.appendChild(t);let n=document.createElement(`div`);n.id=`hpwrap`,n.innerHTML=`<span id="hptxt"></span><div id="hptrack"><div id="hpfill"></div></div><div id="shwrap"><span id="shtxt"></span><div id="shtrack"><div id="shfill"></div></div></div>`,document.body.appendChild(n),this.txt=n.querySelector(`#hptxt`),this.fill=n.querySelector(`#hpfill`),this.shWrap=n.querySelector(`#shwrap`),this.shTxt=n.querySelector(`#shtxt`),this.shFill=n.querySelector(`#shfill`),this.shFx=document.createElement(`div`),this.shFx.id=`shfx`,document.body.appendChild(this.shFx),this.shOn=!1;let r=document.createElement(`div`);r.id=`gover`,r.innerHTML=`GAME OVER<button>Dobara khelo</button>`,r.querySelector(`button`).addEventListener(`click`,()=>location.reload()),document.body.appendChild(r),this.over=r,this.set(e)}set(e){let t=Math.max(0,Math.min(1,e/this.max));this.txt.textContent=`HP `+Math.ceil(e),this.fill.style.width=(t*100).toFixed(0)+`%`,this.fill.className=t<=.25?`low`:t<=.5?`mid`:``}setShield(e,t=5){let n=e>0;n!==this.shOn&&(this.shOn=n,this.shWrap.style.display=n?`block`:`none`,this.shFx.style.opacity=+!!n),n&&(this.shTxt.textContent=`DEFENSE `+Math.ceil(e)+`s`,this.shFill.style.width=(Math.min(1,e/t)*100).toFixed(0)+`%`)}gameOver(){document.exitPointerLock&&document.exitPointerLock(),this.onOver?this.onOver():this.over.style.display=`flex`}},Yd={walk:24,run:32},Xd=7,Zd=.7,Qd=.28,$d=.2,ef=.21,tf=new q(0,-.6,-2.1),nf=new q(0,-.45,-1.9),rf=new q(0,0,-8),af=new Tt().setFromEuler(new an(-.25,.08,-.12,`YXZ`)),of=new q(0,0,-1);new Tt().setFromAxisAngle(new q(0,0,1),Math.PI/2);var{clamp:sf}=wt,cf=class{constructor(e,t,n,r){this.cam=e,this.temple=n,this.scene=r,this.dom=t,this.keys={},this.yaw=0,this.pitch=0,this.speed=0,this.t=0,this.bob=0,this.dir=new K(0,-1),this.pos=new q(0,0,ed.spawnZ),this._o=new q,this._ap=new q,this._dr=new q,this._p=new q,this._d=new q,this._qa=new Tt,this.camFwd=new q(0,0,-1),this.fov0=e.fov,e.rotation.order=`YXZ`,e.near=Math.min(e.near,.2),e.updateProjectionMatrix(),this.lmb=!1,this.aimW=0,this.draw=0,this.drawing=!1,this.recover=0,this.kick=0,this.arrows=new Hd(r,n),this.bow=Ed(),this.bow.group.scale.setScalar(ef),this.bow.group.position.copy(tf),e.add(this.bow.group),r.add(e),addEventListener(`keydown`,e=>{this.keys[e.code]=!0}),addEventListener(`keyup`,e=>this.keys[e.code]=!1),Kd||t.addEventListener(`click`,()=>t.requestPointerLock()),addEventListener(`mousemove`,e=>{if(document.pointerLockElement!==t)return;let n=.0022*(1-.45*this.draw);this.yaw-=e.movementX*n,this.pitch=sf(this.pitch-e.movementY*n,-1.35,1.35)}),addEventListener(`mousedown`,e=>{document.pointerLockElement===t&&e.button===0&&(this.lmb=!0)}),addEventListener(`mouseup`,e=>{e.button===0&&(this.lmb=!1)}),addEventListener(`contextmenu`,e=>e.preventDefault()),addEventListener(`blur`,()=>{this.lmb=!1}),this.makeUI(),this.hp=100,this.dead=!1,this.frozen=0,this.knock=null,this.shield=0,this.jy=0,this.vy=0,this.health=new Jd(100),this.touch=Kd?new qd(this):null}get z(){return this.pos.z}get sealZ(){return this.pos.z}makeUI(){let e=document.createElement(`style`);e.textContent=`
#dot{position:fixed;left:50%;top:50%;width:6px;height:6px;margin:-3px;border-radius:50%;z-index:15;
background:rgba(255,214,120,.85);pointer-events:none;box-shadow:0 0 6px rgba(255,170,60,.8)}
#xhair{position:fixed;left:50%;top:50%;width:46px;height:46px;transform:translate(-50%,-50%);z-index:15;
border:2px solid rgba(255,214,120,.9);border-radius:50%;pointer-events:none;display:none;
box-shadow:0 0 10px rgba(255,170,60,.7),inset 0 0 8px rgba(255,170,60,.4)}
#xhair.full{border-color:#fff;box-shadow:0 0 18px #ffb23a,inset 0 0 10px #ffb23a}
#pbar{position:fixed;left:50%;top:calc(50% + 44px);width:96px;height:6px;margin-left:-48px;z-index:15;display:none;
background:rgba(0,0,0,.45);border:1px solid rgba(255,214,120,.6);border-radius:4px;overflow:hidden;pointer-events:none}
#pbar i{display:block;height:100%;width:0;background:linear-gradient(90deg,#ff9a2a,#ffe08a)}
#hint{position:fixed;left:14px;bottom:14px;z-index:15;padding:8px 12px;font:13px Georgia,serif;color:#f3e2b3;
background:rgba(30,16,8,.6);border-radius:8px;pointer-events:none;line-height:1.5}`,document.head.appendChild(e);let t=(e,t)=>{let n=document.createElement(e);return n.id=t,document.body.appendChild(n),n};t(`div`,`dot`),this.xh=t(`div`,`xhair`),this.xhOn=!1,this.pbar=t(`div`,`pbar`),this.pbar.innerHTML=`<i></i>`,this.pbarFill=this.pbar.firstChild,t(`div`,`hint`).innerHTML=`WASD chalo &middot; Shift daudo<br><b>Left-click DABAO</b> = dhanush kheencho &middot; <b>CHHODO</b> = teer`}showUI(){this.touch&&this.touch.show()}takeDamage(e){this.dead||this.shield>0||this.dead||(this.hp=Math.max(0,this.hp-e),this.health.set(this.hp),this.hp<=0&&(this.dead=!0,this.lmb=!1,this.health.gameOver()))}heal(e){this.dead||(this.hp=Math.min(100,this.hp+e),this.health.set(this.hp))}jump(){this.jy<=.01&&!this.dead&&this.frozen<=0&&(this.vy=27)}freeze(e){this.frozen=e,this.speed=0}push(e,t,n){let r=Math.hypot(e,t)||1;this.knock={dx:e/r,dz:t/r,left:n,v:n/.2}}applyKnock(e){let t=this.knock;if(!t)return;let n=Math.min(t.left,t.v*e),r=this.pos,i=r.z;r.x+=t.dx*n,r.z+=t.dz*n,t.left-=n,this.constrain(r,i),t.left<=.001&&(this.knock=null)}updateCrosshair(){let e=this.aimW>.3;e!==this.xhOn&&(this.xh.style.display=e?`block`:`none`,this.pbar.style.display=e?`block`:`none`,this.xhOn=e),e&&(this.xh.style.transform=`translate(-50%,-50%) scale(${(1.25-.55*this.draw).toFixed(3)})`,this.xh.classList.toggle(`full`,this.draw>=1),this.pbarFill.style.width=(this.draw*100).toFixed(0)+`%`)}updateAim(e){this.aimW+=(+!!this.lmb-this.aimW)*Math.min(1,e*10),this.aimW<.001&&(this.aimW=0),this.recover>0&&(this.recover-=e),this.lmb&&this.recover<=0?(this.draw=Math.min(1,this.draw+e/Zd),this.drawing=!0):this.drawing&&!this.lmb&&(this.draw>.04&&(this.fire(),this.recover=Qd),this.drawing=!1,this.draw=0)}fire(){let e=Math.max(.35,this.draw);this.cam.updateMatrixWorld(!0);let t=this.bow.arrowWorld(this._o),n=this.cam.position,r=this.camFwd,i=this._m||=new q,a=260;r.y<-.02&&(a=Math.min(a,Math.max(14,-n.y/r.y)));for(let e of this.arrows.targets){i.subVectors(e.position,n);let t=i.dot(r);t<=0||t>=a||i.lengthSq()-t*t<e.radius*e.radius&&(a=t)}let o=this._ap.copy(n).addScaledVector(r,a),c=kd(e),l=Ad(e),u=o.x-t.x,d=o.z-t.z,f=o.y-t.y,p=Math.hypot(u,d)||.001,m=c**4-l*(l*p*p+2*f*c*c),h=m>=0?(c*c-Math.sqrt(m))/(l*p):1,g=this._dr.set(u/p,h,d/p).normalize();this.arrows.shoot(t,g,e,ef/Dd),this.bow.release(),this.kick=e}constrain(e,t){let n=this.temple.halfWidth(e.z)-3;e.x=sf(e.x,-n,n),e.z=sf(e.z,this.temple.zLimit()+2.5,this.temple.zMax());for(let t of this.temple.colliders){let n=e.x-t.x,r=e.z-t.z,i=Math.hypot(n,r)||.001;i<t.r+1.8&&(e.x=t.x+n/i*(t.r+1.8),e.z=t.z+r/i*(t.r+1.8))}this.temple.pushOut(e);let r=Qu.width/2-1.5;for(let n of this.temple.gateZs)Math.abs(e.z-n)<2.2&&Math.abs(e.x)>r&&(e.z=n+(t>n?2.2:-2.2))}move(e,t,n){let r=t!==0||n!==0;if(r){let e=-Math.sin(this.yaw)*t+Math.cos(this.yaw)*n,r=-Math.cos(this.yaw)*t-Math.sin(this.yaw)*n;this.dir.set(e,r).normalize()}let i=(this.keys.ShiftLeft?Yd.run:Yd.walk)*(1-.5*this.aimW);this.speed+=((r?i:0)-this.speed)*Math.min(1,e*(r?4:6));let a=this.pos,o=a.z;a.x+=this.dir.x*this.speed*e,a.z+=this.dir.y*this.speed*e,this.constrain(a,o)}updateCamera(){let e=this.cam;e.position.set(this.pos.x,Xd+this.jy,this.pos.z),e.rotation.set(this.pitch,this.yaw,0);let t=Math.cos(this.pitch);this.camFwd.set(-Math.sin(this.yaw)*t,Math.sin(this.pitch),-Math.cos(this.yaw)*t);let n=this.draw*this.draw*(3-2*this.draw),r=this.fov0*(1-$d*n)+this.kick*4;Math.abs(r-e.fov)>.01&&(e.fov=r,e.updateProjectionMatrix())}updateBow(e){let t=this.aimW,n=t*t*(3-2*t),r=Math.min(this.speed/24,1.5)*(1-n);this.bob+=e*this.speed*.6;let i=this._p.lerpVectors(tf,nf,n);i.x+=Math.sin(this.bob)*.025*r+Math.sin(this.t*1.6)*.006,i.y+=Math.abs(Math.cos(this.bob))*.035*r+Math.sin(this.t*1.3)*.006,i.z+=this.kick*.12;let a=this.draw>=1?.004:0;i.x+=Math.sin(this.t*43)*a,i.y+=Math.cos(this.t*37)*a,this._d.subVectors(rf,i).normalize(),this._qa.setFromUnitVectors(of,this._d);let o=this.bow.group.quaternion;o.slerpQuaternions(af,this._qa,n),this._roll||=new Tt().setFromAxisAngle(new q(0,0,1),Math.PI/2),o.multiply(this._roll),this.bow.group.position.copy(i),this.bow.update(e,this.draw,this.recover<=0)}update(e){this.t+=e;let t=this.keys,n=this.frozen>0||this.dead;this.frozen>0&&(this.frozen-=e);let r=n?0:+!!t.KeyW-!!t.KeyS,i=n?0:+!!t.KeyD-!!t.KeyA;this.move(e,r,i),this.applyKnock(e),this.shield>0&&(this.shield-=e),t.Space&&this.jump(),this.vy-=(Math.abs(this.vy)<7?32:45)*e,this.jy=Math.max(0,this.jy+this.vy*e),this.jy===0&&this.vy<0&&(this.vy=0),this.updateCamera(),this.updateBow(e),this.updateAim(e),this.kick=Math.max(0,this.kick-e*5),this.arrows.update(e),this.updateCrosshair()}},lf=new Y(11772292),uf=()=>id(8225161,{emissive:657933}),df=()=>id(4862496),ff={cyl:new Gi(1,1,1,14),oct:new Gi(1,1,1,8),sph:new go(1,16,12),cone:new Ki(1,1,12),tor:new _o(1,.1,8,36),arc:new _o(1,.1,8,24,Math.PI)},$=(e,t,n,r=[0,0,0],i=[1,1,1],a=[0,0,0])=>{let o=new X(typeof t==`string`?ff[t]:t,n);return o.position.set(...r),o.scale.set(...i),o.rotation.set(...a),e.add(o),o},pf=(e,t,n=.12)=>{let r=new co(e,{depth:t,bevelEnabled:!0,bevelThickness:n,bevelSize:n,bevelSegments:1,curveSegments:12});return r.translate(0,0,-t/2),r},mf=(e,t)=>{let n=new wa;return n.moveTo(0,0),n.quadraticCurveTo(e,t*.35,0,t),n.quadraticCurveTo(-e,t*.35,0,0),n},hf=(e,t,n=.6)=>t.forEach(t=>$(e,`tor`,ad(),[0,t,0],[n,n,n*1.6],[Math.PI/2,0,0])),gf={parshu(e,t){$(e,`cyl`,df(),[0,6,0],[.5,12,.5]),$(e,`cone`,ad(),[0,-.3,0],[.8,1.2,.8],[Math.PI,0,0]),$(e,`cone`,uf(),[0,13,0],[.6,2.6,.6]),hf(e,[2.5,6,8.2,11],.62);let n=new wa;n.moveTo(0,-2.4),n.bezierCurveTo(1.5,-3.8,6,-5,7.2,-4.4),n.bezierCurveTo(9.8,-2,9.8,2,7.2,4.4),n.bezierCurveTo(6,5,1.5,3.8,0,2.4),n.lineTo(0,-2.4);let r=pf(n,.6);$(e,r,uf(),[0,9.6,0],[1,1,1]),$(e,r,od(t,.8),[1,9.6,0],[.58,.58,1.3]),$(e,`cone`,uf(),[-2.2,9.6,0],[.7,3,.7],[0,0,Math.PI/2])},khadga(e,t){e.scale.setScalar(.85),$(e,`cyl`,df(),[0,2,0],[.55,4,.55]),$(e,`sph`,ad(),[0,-.2,0],[1,1,1]),hf(e,[.8,2,3.2],.62),$(e,new Ui(1,1,1),ad(),[0,4.3,0],[7,.8,1.5]);for(let n of[-1,1])$(e,`cone`,ad(),[n*3.7,5.1,0],[.5,1.8,.5],[0,0,-n*.25]),$(e,`sph`,od(t,.8),[n*2.4,4.3,.8],[.3,.3,.3]);let n=new wa;n.moveTo(-1.5,0),n.lineTo(-1.6,10),n.lineTo(0,13.5),n.lineTo(1.6,10),n.lineTo(1.5,0),n.closePath(),$(e,pf(n,.45,.1),uf(),[0,4.7,0]),$(e,new Ui(1,1,1),od(t,.8),[0,9.3,.25],[.34,9.4,.4]),$(e,`sph`,od(t,.9),[0,4.3,.9],[.55,.55,.3])},gada(e,t){$(e,`cyl`,df(),[0,3.2,0],[.55,6.4,.55]),$(e,`sph`,ad(),[0,-.1,0],[.95,.95,.95]),hf(e,[1,2.4,4],.65);let n=[[0,0],[1.5,0],[2.4,1],[3.4,2.5],[3.8,4],[3.4,5.5],[2.5,6.6],[1.3,7.4],[.5,8],[0,8.8]].map(([e,t])=>new K(e,t)),r=new Cn;r.position.y=5.6,e.add(r),$(r,new po(n,16),uf());for(let e of[2.5,5.5])$(r,`tor`,ad(),[0,e,0],[3.3,3.3,1.5],[Math.PI/2,0,0]);$(r,`tor`,od(t,.8),[0,4,0],[3.85,3.85,1.6],[Math.PI/2,0,0]);for(let e=0;e<10;e++){let t=e/10*Math.PI*2;$(r,`cone`,ad(),[Math.cos(t)*3.8,4,Math.sin(t)*3.8],[.4,1.4,.4],[Math.sin(t)*1.57,0,-Math.cos(t)*1.57])}$(r,`cone`,ad(),[0,9.6,0],[.7,2,.7])},trishool(e,t){$(e,`cyl`,df(),[0,6,0],[.5,12,.5]),$(e,`cone`,ad(),[0,-.4,0],[.8,1.4,.8],[Math.PI,0,0]),hf(e,[2,4.5,7,10],.65),$(e,`arc`,ad(),[0,12.4,0],[2.7,2.7,2.2],[0,0,Math.PI]),$(e,pf(mf(1.1,7),.6),uf(),[0,12.2,0]);for(let t of[-1,1])$(e,pf(mf(.75,5),.5),uf(),[t*2.7,12.4,0],[1,1,1],[0,0,-t*.08]);$(e,pf(mf(.4,5),.5),od(t,.8),[0,12.6,.15],[1,.75,1.2]),$(e,`sph`,od(t,.9),[0,11.6,.7],[.5,.5,.4]),$(e,`sph`,ad(),[0,12.2,0],[.9,.9,.9])},chakra(e,t){$(e,`cyl`,id(10129526),[0,4.2,0],[.9,8.4,.9]),$(e,`sph`,ad(),[0,8.6,0],[1.4,1.4,1.4]);let n=new Cn;n.position.y=9.4,n.scale.setScalar(.85),e.add(n),$(n,`tor`,ad(),[0,0,0],[6,6,1.3]),$(n,`tor`,uf(),[0,0,0],[4.3,4.3,1.1]),$(n,`tor`,od(t,.8),[0,0,0],[2.9,2.9,1.2]),$(n,`tor`,ad(),[0,0,0],[1.6,1.6,1.2]),$(n,`sph`,od(t,.9),[0,0,0],[1.1,1.1,.8]);for(let e=0;e<12;e++)$(n,new Ui(1,1,1),uf(),[0,0,0],[.25,11,.35],[0,0,e*Math.PI/6]);for(let e=0;e<16;e++){let t=e/16*Math.PI*2;$(n,`cone`,uf(),[Math.cos(t)*6.9,Math.sin(t)*6.9,0],[.55,1.9,.45],[0,0,t-Math.PI/2])}e.userData.update=(e,t)=>n.rotation.z-=t*.6}};function _f(e,t=16777215){let n=new Cn,r=id(10721400);[[7,0],[6,.9],[5.2,1.8],[4.4,2.7]].forEach(([e,t])=>$(n,`oct`,r,[0,t+.45,0],[e,.9,e],[0,Math.PI/8,0])),$(n,`tor`,ad(),[0,3.62,0],[4.6,4.6,1.2],[Math.PI/2,0,0]),$(n,`cyl`,sd(),[0,.2,0],[7.1,.4,7.1]);let i=new Cn;i.position.y=3.6,n.add(i),gf[e](i,t),n.userData.update=i.userData.update;let a=new Map;return n.traverse(e=>{if(!e.isMesh||e.material===sd()||e.material.emissiveIntensity>.3)return;let t=a.get(e.material);t||(t=e.material.clone(),t.color.lerp(lf,.3),a.set(e.material,t)),e.material=t}),n}function vf(e){let t=document.createElement(`canvas`);t.width=768,t.height=140;let n=t.getContext(`2d`);n.fillStyle=`#2a2016`,n.fillRect(0,0,768,140),n.strokeStyle=`#b08a3a`,n.lineWidth=6,n.strokeRect(10,10,748,120),n.fillStyle=`#d2a84a`,n.font=`bold 72px Georgia, serif`,n.textAlign=`center`,n.textBaseline=`middle`,n.letterSpacing=`6px`,n.fillText(e,384,74);let r=new zi(t);return r.colorSpace=Fe,new X(new mo(14,2.55),new ri({map:r,color:14211288}))}function yf(e,t,n=!1){let r=new Cn,{width:i,height:a}=Qu,o=Zu.wallThickness,c=id(10129526),l=ad(),u=id(4869458),d=[id(5913120),id(5124377),id(6504735)];for(let e of[-1,1]){r.add(fd(2.8,a,o+1.2,c,[e*(i/2+1.4),a/2,0]));for(let t of[3,a/2,a-3])r.add(fd(3.1,.6,o+1.5,l,[e*(i/2+1.4),t,0]));r.add(fd(3,2.4,o+1.4,sd(),[e*(i/2+1.4),1.2,0]))}r.add(fd(i+5.6,2.8,o+1.2,c,[0,a+1.4,0])),r.add(fd(i+6,.5,o+1.5,l,[0,a+2.95,0]));let f=a+3.2;[i+3.5,i-1,i-6].forEach((e,t)=>{r.add(fd(e,2,o+.8,c,[0,f+t*2+1,0])),r.add(fd(e+.3,.3,o+1,l,[0,f+t*2+2,0]))});let p=new X(new Ki(1.7,3.4,4),od(e,.7));p.position.set(0,f+7.6,0),r.add(p);let m=vf(t);m.position.set(0,a+1.4,(o+1.2)/2+.05),r.add(m);let h=new go(.24,6,5),g=i/2,_=[-1,1].map(t=>{let n=new Cn;n.position.x=t*i/4;for(let e=0;e<6;e++)n.add(fd(g/6-.06,a,.7,d[e%3],[-g/2+g/6*(e+.5),a/2,0]));let o=[4,a/2,a-4],c=new Ei(h,l,o.length*7),f=new Jt;o.forEach((e,t)=>{n.add(fd(g,1,.9,u,[0,e,0]));for(let n=0;n<7;n++)f.makeTranslation(-g/2+.7+n*(g-1.4)/6,e,.5),c.setMatrixAt(t*7+n,f)}),n.add(c);let p=new X(new _o(1,.17,8,20),l);p.scale.setScalar(1.3),p.position.set(-t*(g/2-1.8),a/2-3,.6),n.add(p);let m=new X(new go(.75,10,8),od(e,.7));m.position.set(-t*(g/2-1.8),a/2-1.7,.55),n.add(m);let _=new X(new Gi(1.8,1.8,.3,20),od(e,.5));return _.rotation.x=Math.PI/2,_.position.set(0,a-9,.5),n.add(_),r.add(n),{d:n,s:t,closedX:n.position.x}}),v={group:r,isOpen:n,sealed:!1,p:+!!n,get passable(){return v.isOpen&&v.p>.85},open(){v.sealed||(v.isOpen=!0)},seal(){v.isOpen=!1,v.sealed=!0},update(e){v.p=wt.clamp(v.p+(v.isOpen?e/3:-e/.8),0,1);let t=v.p*v.p*(3-2*v.p);for(let e of _)e.d.position.x=e.closedX+e.s*(i/2+.6)*t}};return v.update(0),v}var bf=1,xf=1,Sf=2.4,Cf=1.8,wf=.78,Tf=3,Ef=[1,3],Df=e=>()=>(e=e*16807%2147483647)/2147483647,Of=new fo(1,0);function kf(e,t){let{width:n,length:r,height:i,wallThickness:a}=Zu,o=n*bf,c=r*xf,l=new Cn;l.position.z=-e*c;let u=[],d=[],f=Df(e*977+13),p=-c*.5,m=new Sn,h=new X(new mo(o,c),ud(`#8a8168`,o/8,c/8,1.6));h.rotation.x=-Math.PI/2,h.position.z=-c/2,l.add(h);let g=new X(new mo(Qu.width-3,c),ud(`#9b9276`,2,c/8,.6));g.rotation.x=-Math.PI/2,g.position.set(0,.04,-c/2),l.add(g);let _=new X(new ho(15,20,56),od(t.accent,.12));_.rotation.x=Math.PI/2*-1,_.position.set(0,.06,p),l.add(_);let v=id(9406064);for(let e=10;e<c-6;e+=18)for(let t of[-1,1]){if(f()<.3)continue;let n=8+f()*22;l.add(fd(n,1.6,1.8,v,[t*(o/2-n/2),i-.8,-e]))}let y=new ri({color:16773312,transparent:!0,opacity:.07,depthWrite:!1,side:2,blending:2});for(let e=0;e<5;e++){let t=new X(new mo(12,64),y);t.position.set((f()-.5)*(o-20),i/2-2,-14-c/5.2*e),t.rotation.set(0,f()*3,.42),l.add(t)}for(let e of[-1,1])l.add(fd(a,i,c,ud(t.wall,c/10,i/10),[e*(o/2+a/2),i/2,-c/2])),l.add(fd(.7,3,c,sd(),[e*(o/2-.35),1.5,-c/2])),l.add(fd(.7,1.2,c,v,[e*(o/2-.35),i-4,-c/2]));let b=Math.round(44*Sf),x=new Ei(new Ui(1,1,1),sd(),b),S=new Ei(Of,id(4160042),318);for(let e=0;e<b;e++){let t=e%2?1:-1,n=6+f()*18,r=-(3+f()*(c-6)),a=t*(o/2-.5);m.rotation.set(0,0,0),m.position.set(a,i-n/2,r),m.scale.set(.2,n,1+f()*1.4),m.updateMatrix(),x.setMatrixAt(e,m.matrix);for(let o=0;o<3;o++)m.position.set(a-t*.2,i-n+(.2+o*.3),r+(f()-.5)*1.6),m.scale.set(.5,.9+f()*.6,1.1+f()*.7),m.updateMatrix(),S.setMatrixAt(e*3+o,m.matrix)}l.add(x,S);let C=[],w=(e,n)=>{let r=td[e],c=(o-Qu.width)/2;for(let e of[-1,1])l.add(fd(c+a,i,a,ud(t.wall,4,3),[e*(Qu.width/2+c/2+a/2),i/2,n]));l.add(fd(Qu.width,i-Qu.height,a,ud(t.wall,2,1),[0,Qu.height+(i-Qu.height)/2,n]));let u=yf(r.accent,r.name,e===0);u.group.position.z=n,l.add(u.group),C.push({index:e,api:u})};w(e,0),e===nd.length-1&&w(e+1,-c);let T=(o/2-6)*wf,E=(c/2-8)*wf,D=Tf,O=id(10721400),k=new Gi(1.1*D,1.3*D,i-3,12),A=new Gi(1.32*D,1.42*D,1,12);for(let t=0;t<5;t++){let n=t/5*Math.PI*2-Math.PI/2,r=Ef.includes(t),a=0+Math.cos(n)*T,o=p+Math.sin(n)*E,d=new Cn;d.position.set(a,0,o);let m=r?(i-3)*(.55+f()*.15):i-3;d.add(fd(3.4*D,1.2,3.4*D,O,[0,.6,0]));let h=new X(k,O);h.scale.y=m/(i-3),h.position.y=1+m/2,d.add(h);let g=new X(A,sd());if(g.scale.y=5+f()*5,g.position.y=1+g.scale.y/2,d.add(g),r){let e=fd(9,1.5,2.4*D,O,[0,1+m+.4,0]);e.rotation.set(.25,.5,.2),d.add(e)}else d.add(fd(4.2*D,1.2,4.2*D,O,[0,i-1.2,0]),fd(3.6*D,.9,3.6*D,ad(),[0,i-2.2,0]));l.add(d),u.push({x:a,z:o-e*c,r:1.5*D})}let j=Math.round(90*Sf),M=new Ei(Of,v,j);for(let e=0;e<j;e++){let t=.4+f()*1.8;m.position.set((f()-.5)*(o-6),t*.3,-3-f()*(c-6)),m.rotation.set(f()*3,f()*3,f()*3),m.scale.set(t,t*.6,t*(.8+f()*.5)),m.updateMatrix(),M.setMatrixAt(e,m.matrix)}l.add(M);let N=_f(t.statue,t.accent);return N.scale.setScalar(Cf),N.position.set(0,0,p),l.add(N),N.userData.update&&d.push(N.userData.update),u.push({x:0,z:p-e*c,r:7.2*Cf}),{group:l,gates:C,colliders:u,update(e,t){C.forEach(e=>e.api.update(t)),d.forEach(n=>n(e,t))}}}function Af(){let{width:e,length:t}=ed,n=new Cn,r=[],i=4242,a=()=>(i=i*16807%2147483647)/2147483647,o=new Sn,c=new Y,l=new X(new mo(1400,1400),id(5209402));l.rotation.x=-Math.PI/2,l.position.set(0,-.08,-300),n.add(l);let u=t-12,d=new X(new mo(12,u),id(9071170));d.rotation.x=-Math.PI/2,d.position.set(0,.06,2+u/2),n.add(d);let f=new Ei(new Gi(.7,1.1,1,6),id(5913890),130),p=new Ki(1,1,7),m=new Ei(p,id(16777215),130),h=new Ei(p,id(16777215),130);for(let n=0;n<130;n++){let i,l;if(n%3==0)i=(n%2?1:-1)*(e/2-3-a()*8),l=6+a()*(t-8);else if(n%7==0)i=(a()-.5)*(e-10),l=t-3-a()*6;else{let n=0;do i=(a()-.5)*(e-10),l=8+a()*(t-14),n++;while(Math.abs(i)<11&&n<30)}let u=1+a()*.6,d=7+a()*5;o.rotation.set(0,a()*6,0),o.position.set(i,d/2,l),o.scale.set(u,d,u),o.updateMatrix(),f.setMatrixAt(n,o.matrix),o.position.set(i,d*.7,l),o.scale.set(u*5.2,d*.9,u*5.2),o.updateMatrix(),m.setMatrixAt(n,o.matrix),o.position.set(i,d*1.15,l),o.scale.set(u*3.4,d*.75,u*3.4),o.updateMatrix(),h.setMatrixAt(n,o.matrix),c.setHSL(.27+a()*.07,.45,.2+a()*.1),m.setColorAt(n,c),h.setColorAt(n,c),r.push({x:i,z:l,r:1.4*u})}m.instanceColor.needsUpdate=!0,h.instanceColor.needsUpdate=!0,n.add(f,m,h);let g=new Ei(new fo(1,0),id(16777215),70);for(let n=0;n<70;n++){let r,i,l=0;do r=(a()-.5)*(e-6),i=6+a()*(t-10),l++;while(Math.abs(r)<9&&l<30);let u=1.4+a()*1.6;o.rotation.set(0,a()*6,0),o.position.set(r,u*.4,i),o.scale.set(u,u*.7,u),o.updateMatrix(),g.setMatrixAt(n,o.matrix),c.setHSL(.3+a()*.08,.5,.25+a()*.1),g.setColorAt(n,c)}g.instanceColor.needsUpdate=!0,n.add(g);let _=new Ei(new fo(1,0),id(8224116),28);for(let n=0;n<28;n++){let r,i,c=0;do r=(a()-.5)*(e-6),i=6+a()*(t-10),c++;while(Math.abs(r)<8&&c<30);let l=.8+a()*1.8;o.rotation.set(a()*3,a()*3,a()*3),o.position.set(r,l*.3,i),o.scale.set(l,l*.7,l*(.8+a()*.5)),o.updateMatrix(),_.setMatrixAt(n,o.matrix)}return n.add(_),{group:n,colliders:r}}var jf={width:520,length:640,pondZ:340,pondR:90},Mf=e=>()=>(e=e*16807%2147483647)/2147483647,Nf=new Sn;function Pf(t,n,r){let i=document.createElement(`canvas`);i.width=i.height=t,r(i.getContext(`2d`),t);let a=new zi(i);return a.wrapS=a.wrapT=e,a.repeat.set(n,n),a}var Ff=class{constructor(e,t=1e3){this.max=t,this.i=0,this.live=0,this.pos=new Float32Array(t*3),this.col=new Float32Array(t*3),this.base=new Float32Array(t*3),this.vel=new Float32Array(t*3),this.age=new Float32Array(t).fill(9),this.life=new Float32Array(t).fill(1);for(let e=0;e<t;e++)this.pos[e*3+1]=-999;let n=new Er;n.setAttribute(`position`,new dr(this.pos,3)),n.setAttribute(`color`,new dr(this.col,3)),this.points=new Ii(n,new ji({size:3.4,vertexColors:!0,transparent:!0,depthWrite:!1,blending:2,fog:!1})),this.points.frustumCulled=!1,e.add(this.points),this.geo=n}burst(e,t,n,r){let i=(r>>16&255)/255,a=(r>>8&255)/255,o=(r&255)/255;for(let r=0;r<90;r++){let r=this.i;this.i=(r+1)%this.max;let c=Math.random()*6.283,l=Math.random()*2-1,u=Math.sqrt(1-l*l),d=22+Math.random()*26;this.pos[r*3]=e,this.pos[r*3+1]=t,this.pos[r*3+2]=n,this.vel[r*3]=Math.cos(c)*u*d,this.vel[r*3+1]=l*d,this.vel[r*3+2]=Math.sin(c)*u*d,this.base[r*3]=i,this.base[r*3+1]=a,this.base[r*3+2]=o,this.age[r]=0,this.life[r]=1.4+Math.random()*.8}this.live=this.max}update(e){if(!this.live)return;let t=!1;for(let n=0;n<this.max;n++){if(this.age[n]>=this.life[n])continue;this.age[n]+=e;let r=1-this.age[n]/this.life[n];if(r<=0){this.col[n*3]=this.col[n*3+1]=this.col[n*3+2]=0,this.pos[n*3+1]=-999;continue}t=!0;let i=1-Math.min(1,1.1*e);this.vel[n*3]*=i,this.vel[n*3+1]=this.vel[n*3+1]*i-16*e,this.vel[n*3+2]*=i,this.pos[n*3]+=this.vel[n*3]*e,this.pos[n*3+1]+=this.vel[n*3+1]*e,this.pos[n*3+2]+=this.vel[n*3+2]*e,this.col[n*3]=this.base[n*3]*r,this.col[n*3+1]=this.base[n*3+1]*r,this.col[n*3+2]=this.base[n*3+2]*r}this.geo.attributes.position.needsUpdate=!0,this.geo.attributes.color.needsUpdate=!0,t||(this.live=0)}};function If(e){let t=id(12091455),n=id(4861460),r=id(15720637),i=new Cn,a=new Cn;a.scale.setScalar(1.7),i.add(a),a.add(fd(2.1,1.5,3.6,t,[0,3.1,0])),a.add(fd(1.5,.5,2.6,r,[0,2.45,0])),a.add(fd(.5,.5,.3,r,[0,3.7,-1.85]));let o=[];for(let[e,t,r]of[[-.7,1.4,0],[.7,1.4,Math.PI],[-.7,-1.4,Math.PI],[.7,-1.4,0]]){let i=new Cn;i.position.set(e,2.4,t),a.add(i),i.add(fd(.36,2.4,.36,n,[0,-1.2,0])),o.push({pv:i,off:r})}let c=new Cn;c.position.set(0,3.7,1.6),a.add(c);let l=fd(.62,1.9,.62,t,[0,.85,.35]);l.rotation.x=.45,c.add(l),c.add(fd(.8,.75,1.3,t,[0,1.95,1.1])),c.add(fd(.3,.3,.3,n,[0,1.9,1.85]));for(let e of[-1,1]){let t=fd(.12,1.3,.12,n,[e*.3,2.9,.95]);t.rotation.z=-e*.4,c.add(t);let r=fd(.12,.7,.12,n,[e*.65,3.35,.95]);r.rotation.z=e*.5,c.add(r)}return{group:i,legs:o,neck:c,state:`idle`,tx:0,tz:0,speed:16+e()*8,phase:e()*6,t:0}}function Lf(e){let{width:t,length:n,pondZ:r,pondR:i}=jf,a=Zu.height,o=Zu.wallThickness,c=new Cn;c.position.z=e;let l=Mf(4242),u=id(10721400),d=ad(),f=new X(new mo(t,n),ud(`#5f8c3e`,t/8,n/8,1.2));f.rotation.x=-Math.PI/2,f.position.z=-n/2,c.add(f);let p=r-i-12,m=new X(new mo(Qu.width-2,p),ud(`#9b9276`,2,p/8,.6));m.rotation.x=-Math.PI/2,m.position.set(0,.05,-p/2),c.add(m);let h=new X(new ho(i+4,i+20,64),id(10327418,{side:2}));h.rotation.x=-Math.PI/2,h.position.set(0,.07,-r),c.add(h);let g=Pf(256,5,(e,t)=>{let n=e.createLinearGradient(0,0,t,t);n.addColorStop(0,`#2f86b3`),n.addColorStop(1,`#1b5c8c`),e.fillStyle=n,e.fillRect(0,0,t,t),e.strokeStyle=`rgba(255,255,255,.2)`,e.lineWidth=2;for(let n=0;n<46;n++)e.beginPath(),e.ellipse(Math.random()*t,Math.random()*t,8+Math.random()*22,3+Math.random()*6,0,0,Math.PI*1.3),e.stroke()}),_=Pf(256,4,(e,t)=>{e.fillStyle=`#000`,e.fillRect(0,0,t,t);for(let n=0;n<90;n++)e.fillStyle=`rgba(255,255,255,${.3+Math.random()*.6})`,e.beginPath(),e.arc(Math.random()*t,Math.random()*t,.8+Math.random()*1.6,0,6.283),e.fill()}),v=new X(new Wi(i,64),new ri({map:g,transparent:!0,opacity:.94}));v.rotation.x=-Math.PI/2,v.position.set(0,.25,-r),c.add(v);let y=new X(new Wi(i-1,64),new ri({map:_,transparent:!0,blending:2,depthWrite:!1,opacity:.55}));y.rotation.x=-Math.PI/2,y.position.set(0,.35,-r),c.add(y);let b=new X(new Gi(i+3,i+3,2.6,56,1,!0),id(10721400,{side:2}));b.position.set(0,1.3,-r),c.add(b);let x=new X(new ho(i+2.5,i+6,56),id(12103050,{side:2}));x.rotation.x=-Math.PI/2,x.position.set(0,2.65,-r),c.add(x);let S=new Ei(new Wi(1.7,8),id(4164154,{side:2}),40),C=new Ei(new Ki(.9,1.3,6),id(16744360),14);for(let e=0;e<40;e++){let t=l()*6.283,n=Math.sqrt(l())*(i-10),a=Math.cos(t)*n,o=-r+Math.sin(t)*n,c=.8+l()*.9;Nf.position.set(a,.4,o),Nf.rotation.set(-Math.PI/2,0,l()*3),Nf.scale.set(c,c,c),Nf.updateMatrix(),S.setMatrixAt(e,Nf.matrix),e<14&&(Nf.position.set(a,1,o),Nf.rotation.set(0,0,0),Nf.updateMatrix(),C.setMatrixAt(e,Nf.matrix))}c.add(S,C);let w=new Ei(new Gi(.3,.4,6,6),id(9076840),20),T=new Ei(new fo(1,0),od(16752688,.9),20);for(let e=0;e<10;e++)for(let t of[-1,1]){let n=e*2+ +(t>0),r=-18-e*24;Nf.rotation.set(0,0,0),Nf.scale.set(1,1,1),Nf.position.set(t*13,3,r),Nf.updateMatrix(),w.setMatrixAt(n,Nf.matrix),Nf.position.set(t*13,6.8,r),Nf.updateMatrix(),T.setMatrixAt(n,Nf.matrix)}c.add(w,T);let E=new Ei(new Gi(.9,1.2,7,6),id(5913120),70),D=new Ei(new fo(5.5,0),id(4160042),70),O=0,k=0;for(;O<70&&k++<2e3;){let e=(l()*2-1)*(t/2-10),a=-(30+l()*(n-45));if(Math.abs(e)<24&&a>-(p+20)||Math.hypot(e,a+r)<i+32)continue;let o=.8+l()*.8;Nf.rotation.set(0,l()*3,0),Nf.scale.set(o,o,o),Nf.position.set(e,3.5*o,a),Nf.updateMatrix(),E.setMatrixAt(O,Nf.matrix),Nf.position.set(e,9*o,a),Nf.updateMatrix(),D.setMatrixAt(O,Nf.matrix),O++}E.count=D.count=O,c.add(E,D);let A=(t-Zu.width)/2;for(let e of[-1,1])c.add(fd(o,a,n,ud(`#a39f86`,n/10,a/10),[e*(t/2+o/2),a/2,-n/2])),c.add(fd(A,a,o,ud(`#a39f86`,A/10,a/10),[e*(Zu.width/2+A/2),a/2,0])),c.add(fd(3,24,3,u,[e*16,12,-n+22]));c.add(fd(t+2*o,a,o,ud(`#a39f86`,t/10,a/10),[0,a/2,-n-o/2])),c.add(fd(36,3,3.4,d,[0,25.5,-n+22]));let j=new Ff(c),M=Array.from({length:8},()=>{let e=If(l);return e.group.visible=!1,c.add(e.group),e}),N=!1,P=0,F=0,I=0,L=[16765024,16738970,7002367,9109370,16777215,16751168];return{group:c,welcome(){N||(N=!0,P=0,F=0,M.forEach((e,n)=>{let a=(n%2?1:-1)*(t/2-25),o=-(110+Math.floor(n/2)*85+l()*30),c=Math.atan2(o+r,a);e.group.position.set(a,0,o),e.group.visible=!0,e.tx=Math.cos(c)*(i+10),e.tz=-r+Math.sin(c)*(i+10),e.state=`walk`,e.group.rotation.y=Math.atan2(e.tx-a,e.tz-o)}))},update(e,t){if(g.offset.x+=t*.012,g.offset.y+=t*.006,_.offset.x-=t*.03,_.offset.y+=t*.02,N){if(P+=t,j.update(t),P<18&&(F-=t,F<=0)){F=.35+l()*.7;let e=I++<4;j.burst((l()-.5)*(e?160:300),45+l()*45,e?-(120+l()*80):-r+(l()-.5)*260,L[l()*L.length|0])}for(let e of M){if(!e.group.visible)continue;e.t+=t;let n=e.group.position;if(e.state===`walk`){let r=e.tx-n.x,i=e.tz-n.z,a=Math.hypot(r,i);if(a<1.5){e.state=`drink`;for(let t of e.legs)t.pv.rotation.x=0}else{let o=Math.min(a,e.speed*t);n.x+=r/a*o,n.z+=i/a*o,e.phase+=t*e.speed*.45;for(let t of e.legs)t.pv.rotation.x=Math.sin(e.phase+t.off)*.6;e.neck.rotation.x=.05+Math.sin(e.phase*2)*.04}}else e.neck.rotation.x=.35+.85*Math.max(0,Math.sin(e.t*1.1+e.phase))}}},pushOut(t){let n=t.z-e;if(n>0)return;let a=t.x,o=n+r,c=Math.hypot(a,o)||.001,l=i+6;c<l&&(t.x=a/c*l,t.z=e+o/c*l-r)}}}var Rf=2.4,zf=class{constructor(e){this.rooms=nd.map((e,t)=>kf(t,e)),this.rooms.forEach(t=>e.add(t.group)),this.gates=[],this.rooms.forEach(e=>e.gates.forEach(e=>this.gates[e.index]=e.api)),this.gateZs=this.gates.map((e,t)=>-t*Zu.length),this.jungle=Af(),e.add(this.jungle.group),this.hallZ=this.gateZs[this.gateZs.length-1],this.hall=Lf(this.hallZ),e.add(this.hall.group),this.colliders=[...this.rooms.flatMap(e=>e.colliders),...this.jungle.colliders]}update(e,t,n){this.gates.forEach((e,t)=>{t<this.gates.length-1&&!e.sealed&&e.isOpen&&n<this.gateZs[t]-4&&e.seal()}),this.rooms.forEach(n=>n.update(e,t)),this.hall.update(e,t)}openNextGate(){let e=this.gates.findIndex(e=>!e.isOpen&&!e.sealed);e!==-1&&this.gates[e].open()}halfWidth(e){return e>0?ed.width/2:e<this.hallZ-1?jf.width/2:Zu.width/2}pushOut(e){this.hall.pushOut(e)}zLimit(){let e=this.gates.findIndex(e=>!e.sealed&&!e.passable);return e===-1?this.hallZ-jf.length+14:this.gateZs[e]+Rf}zMax(){let e=-1;return this.gates.forEach((t,n)=>{t.sealed&&(e=n)}),e===-1?ed.length-2:this.gateZs[e]-Rf}},Bf=class{constructor(){this.el=document.getElementById(`hud`),this.name=document.getElementById(`cp-name`),this.current=-1}update(e){if(e>0){this.current=-1;return}let t=Math.min(nd.length-1,Math.max(0,Math.floor(-e/Zu.length)));t!==this.current&&(this.current=t,this.name.textContent=nd[t].name,this.el.classList.add(`show`),clearTimeout(this.t),this.t=setTimeout(()=>this.el.classList.remove(`show`),3500))}},Vf=e=>e[0]+Math.random()*(e[1]-e[0]),Hf=[13635600,9046024],Uf=[328965,1446172],Wf=[10108415,6959024],Gf=[16769354,13213696],Kf=[9078392,5920332];function qf(e,t,n,r,i,a){let o=n-e,c=r-t,l=o*o+c*c,u=l>1e-9?((i-e)*o+(a-t)*c)/l:0;u=u<0?0:u>1?1:u;let d=e+o*u-i,f=t+c*u-a;return d*d+f*f}function Jf(e,t){return e.group.updateMatrixWorld(!0),e.orb.getWorldPosition(t)}var Yf=new Gi(.1,.1,14,5).rotateX(Math.PI/2).translate(0,0,-7),Xf=new Gi(.3,.3,14,6).rotateX(Math.PI/2).translate(0,0,-7),Zf=class{constructor(e,t,n=12){this.style=t,this._v=new q;let r=new ri({color:t.core}),i=new ri({color:t.glow,transparent:!0,opacity:t.glowOpacity,blending:2,depthWrite:!1});this.list=Array.from({length:n},()=>{let t=new Cn;return t.add(new X(Yf,r),new X(Xf,i)),t.visible=!1,e.add(t),{group:t,on:!1,age:0,pos:new q,vel:new q,onHit:null}})}fire(e,t,n,r){let i=this.list.find(e=>!e.on);if(!i)return;let a=e.player.pos;Jf(t,i.pos);let o=this._v.set(a.x,5,a.z);i.vel.subVectors(o,i.pos).normalize().multiplyScalar(n),i.group.position.copy(i.pos),i.group.lookAt(o);let c=this.style.width;i.group.scale.set(c,c,.05),i.group.visible=!0,i.on=!0,i.age=0,i.onHit=r}update(e,t){let n=e.player.pos,r=e.temple.colliders,i=this.style;for(let a of this.list){if(!a.on)continue;a.age+=t;let o=a.pos.x,c=a.pos.z;a.pos.addScaledVector(a.vel,t),a.group.position.copy(a.pos);let l=i.flicker?i.width*(.75+Math.random()*.7):i.width;a.group.scale.set(l,l,Math.min(1,.05+a.age*8));let u=a.age>4||a.pos.y<.3||Math.abs(a.pos.x)>Zu.width/2;if(u||qf(o,c,a.pos.x,a.pos.z,n.x,n.z)<20.25&&a.pos.y<8.5&&(u=!0,a.onHit(e,a)),!u){for(let e of r)if(qf(o,c,a.pos.x,a.pos.z,e.x,e.z)<(e.r+.5)**2&&a.pos.y<36){u=!0;break}}u&&(a.on=!1,a.group.visible=!1,e.puff(a.pos.x,a.pos.y,a.pos.z,3,i.puff))}}clear(){for(let e of this.list)e.on=!1,e.group.visible=!1}},Qf=new Gi(.9,2.1,4.4,7,1).translate(0,2.2,0),$f=new go(1.1,7,5),ep=new go(.75,6,5),tp=new Ui(.3,.13,.08),np=new fo(.5,0);function rp(e){return{cloak:new Oo({color:e.cloak,flatShading:!0,roughness:1}),face:new ri({color:e.face}),eye:new ri({color:e.eye}),orb:new ri({color:e.orb,transparent:!0,opacity:.9,blending:2,depthWrite:!1})}}var ip=(e,t)=>{let n=new Xr(new Ir({color:e,fog:!1,depthWrite:!1}));return n.renderOrder=t,n};function ap(e){let t=new Cn,n=new X(Qf,e.cloak);t.add(n);let r=new X($f,e.cloak);r.position.set(0,4.55,-.1),r.scale.set(1,1.15,.9),t.add(r);let i=new X(ep,e.face);i.position.set(0,4.5,.45),i.scale.set(.85,1.1,.7),t.add(i);let a=[-1,1].map(n=>{let r=new X(tp,e.eye);return r.position.set(n*.27,4.6,1),r.rotation.z=-n*.25,t.add(r),r}),o=new X(np,e.orb);return o.position.set(0,4.55,1.5),o.visible=!1,t.add(o),t.userData={cloak:n,hood:r,face:i,eyes:a,orb:o},t}var op=new fo(1,0),sp=class{constructor(e,t,n=64){this.player=t,this.list=Array.from({length:n},()=>{let t=new X(op,new ri({color:8009160,transparent:!0,opacity:0,depthWrite:!1}));return t.visible=!1,e.add(t),{m:t,on:!1,age:0,life:1,s:1,vel:new q}})}spawn(e,t,n,r,i){let a=this.player.pos;if(!(Math.hypot(e-a.x,n-a.z)<7))for(let a=0;a<r;a++){let r=this.list.find(e=>!e.on);if(!r)return;r.on=!0,r.age=0,r.life=.5+Math.random()*.4,r.s=.5+Math.random()*.8,r.m.position.set(e+(Math.random()-.5)*2,t+Math.random()*2.5,n+(Math.random()-.5)*2),r.vel.set((Math.random()-.5)*4,1+Math.random()*3,(Math.random()-.5)*4),r.m.material.color.setHex(i[Math.random()<.5?0:1]),r.m.visible=!0}}update(e){for(let t of this.list){if(!t.on)continue;t.age+=e;let n=t.age/t.life;if(n>=1){t.on=!1,t.m.visible=!1;continue}t.m.position.addScaledVector(t.vel,e),t.m.scale.setScalar(t.s*(1+n*2.5)),t.m.material.opacity=.75*(1-n)}}},cp=class{constructor(){let e=document.createElement(`style`);e.textContent=`
#dcount{position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:15;padding:6px 14px;
font:15px Georgia,serif;color:#e6cfff;background:rgba(25,10,40,.6);border:1px solid rgba(170,100,255,.5);
border-radius:8px;pointer-events:none;display:none}
#hurt{position:fixed;inset:0;z-index:14;pointer-events:none;opacity:0;
box-shadow:inset 0 0 90px 10px rgba(150,70,255,.35)}`,document.head.appendChild(e);let t=e=>{let t=document.createElement(`div`);return t.id=e,document.body.appendChild(t),t};this.counter=t(`dcount`),this.hurtEl=t(`hurt`)}message(e){this.counter.style.display=e?`block`:`none`,e&&(this.counter.textContent=e)}flash(e){this.hurtEl.style.boxShadow=`inset 0 0 90px 10px rgba(${e},.35)`,this.hurtEl.animate([{opacity:1},{opacity:0}],{duration:600,easing:`ease-out`})}},lp=`tf_save`,up=`tf_auto`,dp={get(){try{let e=JSON.parse(localStorage.getItem(lp));return e&&Array.isArray(e.snaps)&&e.snaps.length?e:null}catch{return null}},save(e){try{localStorage.setItem(lp,JSON.stringify(e))}catch{}},clear(){try{localStorage.removeItem(lp),sessionStorage.removeItem(up)}catch{}},setAuto(){try{sessionStorage.setItem(up,`1`)}catch{}},takeAuto(){try{let e=sessionStorage.getItem(up)===`1`;return sessionStorage.removeItem(up),e}catch{return!1}},room(e){return e.resume==null?Math.max(0,e.snaps.length-2):e.resume}};function fp(e,t,n,r){let i=dp.room(e);for(let e=0;e<=i;e++)t.gates[e].seal();return n.pos.set(0,0,-i*Zu.length-14),r.resumeAt(i,e),i}var pp={body:5,head:10,combo:5},mp=50,hp=100,gp=2,_p=1800,vp=class{constructor(e){this.score=0,this.kills=0,this.heads=0,this.best=0,this.rooms=0,this.combo=0,this.comboT=0,this.bt=0,this.win=!1,this.onContinue=()=>location.reload();let t=document.createElement(`style`);t.textContent=`
#abanner{position:fixed;top:max(8px,env(safe-area-inset-top));left:0;right:0;margin:0 auto;width:max-content;max-width:min(440px,44vw);
z-index:30;display:none;pointer-events:none;text-align:center;white-space:nowrap;padding:4px 18px 5px;border-radius:999px;
background:rgba(40,10,10,.55);border:1px solid rgba(255,214,120,.35);color:#ffe9b0;font:bold 17px Georgia,serif;letter-spacing:1.5px;text-shadow:0 1px 4px #000}
#abanner small{display:block;font-size:11px;letter-spacing:1px;color:#ffc65a;margin-top:1px}
#abanner.big{top:max(60px,env(safe-area-inset-top));max-width:min(640px,80vw);white-space:normal;padding:8px 26px;border-radius:14px;font-size:26px}
#abanner.big small{font-size:14px}
#scard{position:fixed;inset:0;z-index:2000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.8);
font-family:Georgia,serif;color:#f3e2b3}
#scard .box{min-width:250px;padding:18px 26px;border:2px solid rgba(255,214,120,.7);border-radius:14px;background:rgba(30,16,8,.92);text-align:center}
#scard h2{margin:0;font-size:26px;letter-spacing:3px}
#scard .big{font-size:40px;font-weight:bold;color:#ffc65a;margin:2px 0 8px}
#scard .row{display:flex;justify-content:space-between;gap:30px;font-size:15px;padding:3px 0;border-bottom:1px solid rgba(255,214,120,.15)}
#scard button{margin-top:14px;font:bold 18px Georgia,serif;padding:9px 30px;border-radius:10px;border:2px solid rgba(255,214,120,.8);
background:rgba(90,45,12,.9);color:#f6e6b8;cursor:pointer}`,document.head.appendChild(t),this.banner=document.createElement(`div`),this.banner.id=`abanner`,document.body.appendChild(this.banner),this.card=document.createElement(`div`),this.card.id=`scard`;let n=document.createElement(`div`);n.className=`box`;let r=(e,t,r)=>{let i=document.createElement(e);return t&&(i.className=t),r&&(i.textContent=r),n.appendChild(i),i};this.title=r(`h2`,``,`GAME OVER`),this.big=r(`div`,`big`,`0`),this.vals={};for(let[e,t]of[[`kills`,`Kills`],[`heads`,`Headshots`],[`best`,`Best combo`],[`rooms`,`Rooms cleared`]]){let n=r(`div`,`row`),i=document.createElement(`span`);i.textContent=t;let a=document.createElement(`span`);this.vals[e]=a,n.appendChild(i),n.appendChild(a)}this.btn=r(`button`,``,`Continue`),this.btn.addEventListener(`click`,()=>{this.win?(dp.clear(),location.reload()):this.onContinue()}),this.card.appendChild(n),document.body.appendChild(this.card),e&&e.health&&(e.health.onOver=()=>this.showCard())}onKill(e,t){if(this.kills++,!e){this.combo=0,this.score+=pp.body;return}this.heads++,this.combo++,this.comboT=gp,this.combo>this.best&&(this.best=this.combo);let n=pp.head+pp.combo*(this.combo-1);this.score+=n;let r=t<mp?`Headshot 💀`:t<=hp?`Sharp Eye`:`Bulls Eye`;this.show(r,this.combo>=2?`COMBO x${this.combo}  \u00b7  +${n}`:``)}onRoom(){this.rooms++}snapshot(){return{score:this.score,kills:this.kills,heads:this.heads,best:this.best,rooms:this.rooms}}restore(e){e||={},this.score=e.score||0,this.kills=e.kills||0,this.heads=e.heads||0,this.best=e.best||0,this.rooms=e.rooms||0,this.combo=0}update(e){this.combo>0&&(this.comboT-=e,this.comboT<=0&&(this.combo=0))}show(e,t,n=_p,r=!1){let i=this.banner;i.className=r?`big`:``,i.innerHTML=e+(t?`<small>`+t+`</small>`:``),i.style.display=`block`,i.animate([{opacity:0,transform:`translateY(-8px)`},{opacity:1,transform:`translateY(0)`,offset:.12},{opacity:1,transform:`translateY(0)`,offset:.75},{opacity:0,transform:`translateY(0)`}],{duration:n,fill:`forwards`}),clearTimeout(this.bt),this.bt=setTimeout(()=>{i.style.display=`none`},n)}showCard(e=!1){this.win=e,this.title.textContent=e?`YOU WIN`:`GAME OVER`,this.btn.textContent=e?`Dobara khelo`:`Continue`,this.big.textContent=this.score,this.vals.kills.textContent=this.kills,this.vals.heads.textContent=this.heads,this.vals.best.textContent=this.best?`x`+this.best:`-`,this.vals.rooms.textContent=this.rooms,this.card.style.display=`flex`}};function yp(e){let t=new Zf(e.scene,{core:15123199,glow:10108415,glowOpacity:.3,width:1,puff:Wf});return{total:25,active:5,gap:[2.5,5],charge:.7,lock:.6,look:{cloak:2973380,face:197379,eye:16718362,orb:12745727},attack(n){t.fire(e,n,110,()=>e.hurt(2,`150,70,255`))},update(n){t.update(e,n)},clear(){t.clear()}}}function bp(e){let t=.9,n=3.4,r=new Zf(e.scene,{core:15123199,glow:10108415,glowOpacity:.3,width:1,puff:Wf}),i=new ho(2.9,n,40).rotateX(-Math.PI/2),a=new Wi(n,28).rotateX(-Math.PI/2),o=new fo(1.7,0),c=new Oo({color:9078392,flatShading:!0,roughness:1}),l=Array.from({length:8},()=>{let t=new Cn,n=new ri({color:14733216,transparent:!0,opacity:.3,depthWrite:!1,side:2}),r=new ri({color:14733216,transparent:!0,opacity:.12,depthWrite:!1,side:2}),l=new X(i,n);l.position.y=.15;let u=new X(a,r);u.position.y=.13,t.add(l,u),t.visible=!1,e.scene.add(t);let d=new X(o,c);return d.visible=!1,e.scene.add(d),{warn:t,ringMat:n,rock:d,on:!1,state:`warn`,t:0,x:0,z:0,y:0}});function u(e,t){let n=l.find(e=>!e.on);n&&(n.on=!0,n.state=`warn`,n.t=0,n.x=e,n.z=t,n.warn.position.set(e,0,t),n.warn.visible=!0,n.rock.visible=!1)}function d(r){let i=e.player.pos;for(let a of l)a.on&&(a.t+=r,a.state===`warn`?(a.ringMat.opacity=.25+.5*Math.min(1,a.t/t),a.t>=t&&(a.state=`fall`,a.y=40,a.rock.position.set(a.x,a.y,a.z),a.rock.visible=!0)):(a.y-=150*r,a.rock.position.y=a.y,a.rock.rotation.x+=6*r,a.rock.rotation.z+=4*r,a.y<=1.5&&(a.on=!1,a.warn.visible=!1,a.rock.visible=!1,e.puff(a.x,1,a.z,6,Kf),Math.hypot(i.x-a.x,i.z-a.z)<n&&e.hurt(3,`210,170,110`))))}return{total:30,active:6,gap:[3,5.5],charge:.7,lock:.6,look:{cloak:9078396,face:197379,eye:16718362,orb:12745727},attack(t){r.fire(e,t,110,()=>e.hurt(2,`150,70,255`)),u(e.player.pos.x,e.player.pos.z)},update(t){r.update(e,t),d(t)},clear(){r.clear();for(let e of l)e.on=!1,e.warn.visible=!1,e.rock.visible=!1}}}function xp(e){let t=new Zf(e.scene,{core:16775088,glow:16765466,glowOpacity:.45,width:1.3,flicker:!0,puff:Gf}),n=0;return{total:35,active:7,gap:[3.5,6],charge:.75,lock:1.3,look:{cloak:14727199,face:197379,eye:16718362,orb:16769354},attack(r){t.fire(e,r,125,()=>{n>0||!e.hurt(5,`255,210,40`)||(e.player.freeze(.5),n=2)})},update(r){n=Math.max(0,n-r),t.update(e,r)},clear(){t.clear()}}}function Sp(e){let t=new Zf(e.scene,{core:16765136,glow:16719904,glowOpacity:.4,width:2.4,puff:Hf}),n=0;return{total:40,active:8,gap:[3.5,6],charge:.8,lock:1.3,look:{cloak:11540504,face:14700591,eye:0,orb:16724016},attack(r){t.fire(e,r,150,(t,r)=>{n>0||!e.hurt(7,`255,40,40`)||(e.player.push(r.vel.x,r.vel.z,4),n=1.5)})},update(r){n=Math.max(0,n-r),t.update(e,r)},clear(){t.clear()}}}function Cp(e){let t=.7,n=new wa;for(let e=0;e<8;e++){let t=e%2?.38:1,r=e/8*Math.PI*2,i=Math.cos(r)*t,a=Math.sin(r)*t;e?n.lineTo(i,a):n.moveTo(i,a)}n.closePath();let r=new co(n,{depth:.18,bevelEnabled:!1}).translate(0,0,-.09).scale(1.5,1.5,1.5),i=new Oo({color:5592415,flatShading:!0,metalness:.3,roughness:.5}),a=Array.from({length:16},()=>{let t=new Cn,n=new X(r,i);return t.add(n),t.visible=!1,e.scene.add(t),{group:t,mesh:n,on:!1,age:0,pos:new q,vel:new q}}),o=new q;function c(n){let r=e.player,i=r.pos,a=i.x,c=i.z;if(r.speed>.5){let e=Math.hypot(a-n.x,c-n.z)/62;a+=r.dir.x*r.speed*e*t,c+=r.dir.y*r.speed*e*t}return o.set(a,4.8,c)}function l(e){if(a.filter(e=>e.on).length>=8)return;let t=a.find(e=>!e.on);if(!t)return;Jf(e,t.pos);let n=c(t.pos);t.vel.subVectors(n,t.pos).normalize().multiplyScalar(62),t.group.position.copy(t.pos),t.group.lookAt(n),t.group.visible=!0,t.on=!0,t.age=0}return{total:50,active:10,gap:[2.2,4],charge:.45,lock:.35,look:{cloak:1052692,face:0,eye:16718362,orb:14540253},attack(t){l(t),e.after(.28,()=>{e.canAct(t)&&l(t)})},update(t){let n=e.player.pos,r=e.temple.colliders;for(let i of a){if(!i.on)continue;i.age+=t;let a=i.pos.x,o=i.pos.z;i.pos.addScaledVector(i.vel,t),i.group.position.copy(i.pos),i.mesh.rotation.z+=22*t;let c=i.age>5||i.pos.y<.3||Math.abs(i.pos.x)>Zu.width/2;if(c||qf(a,o,i.pos.x,i.pos.z,n.x,n.z)<9&&i.pos.y<9&&(c=!0,e.hurt(5,`225,225,240`)),!c){for(let e of r)if(qf(a,o,i.pos.x,i.pos.z,e.x,e.z)<(e.r+.5)**2&&i.pos.y<36){c=!0;break}}c&&(i.on=!1,i.group.visible=!1)}},clear(){for(let e of a)e.on=!1,e.group.visible=!1}}}var wp=1.25,Tp=2,Ep=[1.6,2.6],Dp=[10,15],Op=[3,4],kp=[6,12],Ap=[.9,1.3],jp=30,Mp=[40,120],Np=.5,Pp=Zu.width/2-12,Fp=5.2,Ip=.42,Lp=8.2,Rp=e=>e*e*(3-2*e),zp=class{constructor(e,t,n){this.scene=e,this.temple=t,this.player=n,this.t=0,this.cur=-1,this.lockT=0,this.demons=[],this.later=[],this.types=[yp,bp,xp,Sp,Cp].map(e=>e(this)),this.looks=this.types.map(e=>rp(e.look)),this.rooms=this.types.map(e=>({left:e.total,cleared:!1})),this.puffs=new sp(e,n),this.ui=new cp,this.score=new vp(n),this.score.onContinue=()=>this.saveResume(),this.snaps=[],this.won=!1}updateCounter(){let e=this.rooms[this.cur];this.ui.message(e&&e.cleared?`Room ${this.cur+1} saaf! Gate khul gaya`:null)}hurt(e,t){let n=this.player;return n.dead?!1:n.shield>0?(this.ui.flash(`80,170,255`),!1):(n.takeDamage(e),this.ui.flash(t),!0)}after(e,t){this.later.push({t:this.t+e,fn:t})}canAct(e){return!this.player.dead&&(e.state===`patrol`||e.state===`charging`)}makeSlot(){let e=ap(this.looks[0]);e.visible=!1,this.scene.add(e);let t=new Cn,n=ip(1312262,5),r=ip(14686232,6);n.scale.set(5.5,.62,1),r.material.polygonOffset=!0,r.material.polygonOffsetFactor=-2,r.material.polygonOffsetUnits=-2,t.add(n,r),t.visible=!1,this.scene.add(t);let i={group:e,orb:e.userData.orb,p:e.position,bar:t,fg:r,hp:Tp,state:`off`,timer:0,fx:0,yaw:0,ph:Math.random()*10,minX:0,maxX:0,dir:1,speed:2,atkIn:0,vanishIn:0,charge:0,first:!1,afterHide:null};return i.targets=[[4.6,1,`head`],[2.9,1.3,`body`],[1.2,1.8,`body`]].map(([e,t,n])=>({position:new q,radius:t*wp,dy:e*wp,part:n,onHit:e=>this.onArrowHit(i,e,n)})),this.setBar(i),i}ensureSlots(e){for(;this.demons.length<e;)this.demons.push(this.makeSlot())}applyLook(e,t){let n=e.group.userData,r=this.looks[t];n.cloak.material=n.hood.material=r.cloak,n.face.material=r.face,n.eyes.forEach(e=>{e.material=r.eye}),n.orb.material=r.orb}setBar(e){let t=Math.max(0,e.hp/Tp),n=Math.max(t,.01);e.fg.visible=t>0,e.fg.scale.set(Fp*n,Ip,1),e.fg.center.set(.5/n,.5)}syncBar(e){let t=e.state===`patrol`||e.state===`charging`;e.bar.visible=t,t&&e.bar.position.set(e.p.x,e.p.y+Lp,e.p.z)}addTarget(e){let t=this.player.arrows.targets;for(let n of e.targets)t.includes(n)||t.push(n)}removeTarget(e){let t=this.player.arrows.targets;for(let n of e.targets){let e=t.indexOf(n);e!==-1&&t.splice(e,1)}}onArrowHit(e,t,n){t.group.visible=!1,t.active=!1,this.damageDemon(e,n===`head`?2:1,n)}damageDemon(e,t,n){if(e.state===`patrol`||e.state===`charging`){if(e.hp-=t,this.setBar(e),e.hp<=0){let t=this.player.pos;this.score.onKill(n===`head`,Math.hypot(t.x-e.p.x,t.z-e.p.z)),this.kill(e)}else this.puff(e.p.x,3.5,e.p.z,4,Hf)}}setFx(e){let t=Rp(e.fx),n=1+(1-t)*.6;e.group.scale.set(wp*n,wp*Math.max(.02,t),wp*n)}enterRoom(e){for(let t of this.demons)this.removeTarget(t),t.group.visible=!1,t.orb.visible=!1,t.bar.visible=!1,t.state=`off`,this.applyLook(t,e);this.clearProjectiles(),this.cur=e,this.lockT=0,this.snaps.length=Math.min(this.snaps.length,e),this.snaps[e]=this.score.snapshot(),dp.save({snaps:this.snaps});let t=this.rooms[e];if(!t.cleared){let n=Math.min(this.types[e].active,t.left);this.ensureSlots(n);for(let t=0;t<n;t++){let n=this.demons[t];this.applyLook(n,e),n.hp=Tp,this.setBar(n),n.state=`hidden`,n.first=!0,n.afterHide=null,n.timer=.4+t*.3}}this.updateCounter()}resumeAt(e,t){for(let t=0;t<e;t++)this.rooms[t].cleared=!0,this.rooms[t].left=0;this.snaps=(t.snaps||[]).slice(0,e),this.score.restore(t.snaps&&t.snaps[e]),this.cur=-1}saveResume(){let e=Math.max(0,this.cur-1);dp.save({snaps:this.snaps,resume:e}),dp.setAuto(),location.reload()}victory(){this.won=!0,dp.clear(),this.clearProjectiles(),this.temple.hall.welcome(),this.score.show(`Swagat hai, Rakshak!`,`Astra Mandir mukt hua · ab janwar paani pi sakenge`,7e3,!0),setTimeout(()=>this.score.showCard(!0),9500)}clearProjectiles(){for(let e of this.types)e.clear();this.later.length=0}pickSpot(){let e=Zu.length,t=-this.cur*e-14,n=-(this.cur+1)*e+14,r=this.player.pos,i=this.temple.colliders,a=null;for(let e=0;e<60;e++){let o=(Math.random()*2-1)*Pp,c=n+Math.random()*(t-n);if(i.some(e=>Math.hypot(o-e.x,c-e.z)<e.r+5))continue;let l=Math.hypot(o-r.x,c-r.z);if((!a||l>a.dist)&&(a={x:o,z:c,dist:l}),!(l<Mp[0]||l>Mp[1])&&!(e<40&&this.demons.some(e=>e.group.visible&&Math.hypot(o-e.p.x,c-e.p.z)<8)))return{x:o,z:c}}return a||{x:0,z:-this.cur*e-e/2}}appear(e){let{x:t,z:n}=this.pickSpot(),r=this.player.pos;e.p.set(t,0,n),e.minX=Math.max(-Pp,t-Vf(Dp)),e.maxX=Math.min(Pp,t+Vf(Dp)),e.dir=Math.random()<.5?-1:1,e.speed=Vf(Ep),e.atkIn=e.first?Vf([2,4]):Vf(Ap),e.vanishIn=Vf(kp),e.first=!1,e.yaw=Math.atan2(r.x-t,r.z-n),e.group.rotation.y=e.yaw,e.fx=0,this.setFx(e),e.group.visible=!0,e.state=`appearing`,this.puff(t,2.5,n,12,Uf)}startVanish(e){e.state=`vanishing`,this.removeTarget(e),e.orb.visible=!1,this.puff(e.p.x,2.5,e.p.z,12,Uf)}kill(e){(e.state===`patrol`||e.state===`charging`)&&(e.state=`dying`,this.removeTarget(e),e.orb.visible=!1,this.puff(e.p.x,2.5,e.p.z,12,Hf))}finishDeath(e){e.group.visible=!1,e.state=`off`;let t=this.rooms[this.cur];t.left--,t.left<=0?(t.cleared=!0,this.score.onRoom(),this.clearProjectiles(),this.temple.openNextGate()):t.left>=this.types[this.cur].active&&(e.state=`hidden`,e.timer=Vf([.8,1.6]),e.first=!1,e.hp=Tp,this.setBar(e)),this.updateCounter()}face(e,t,n=2){let r=this.player.pos,i=e.p,a=Math.atan2(r.x-i.x,r.z-i.z),o=Math.atan2(Math.sin(a-e.yaw),Math.cos(a-e.yaw));e.yaw+=o*Math.min(1,t*n),e.group.rotation.y=e.yaw}updateDemon(e,t){let n=this.player.pos,r=e.p,i=this.t;switch(e.state){case`off`:return;case`hidden`:e.timer-=t,e.timer<=0&&this.appear(e);return;case`appearing`:e.fx=Math.min(1,e.fx+t/.55),this.setFx(e),this.face(e,t),e.fx>=1&&(e.state=`patrol`,this.addTarget(e));return;case`patrol`:case`charging`:{let a=Math.hypot(n.x-r.x,n.z-r.z);if(a<jp){e.afterHide=Vf([1,1.8]),this.startVanish(e);return}let o=this.types[this.cur];if(e.state===`patrol`){if(r.x+=e.dir*e.speed*t,r.x<=e.minX?(r.x=e.minX,e.dir=1):r.x>=e.maxX&&(r.x=e.maxX,e.dir=-1),e.atkIn-=t,e.vanishIn-=t,!this.player.dead&&e.atkIn<=0)a>=170?e.atkIn=1:this.t<this.lockT?e.atkIn=Vf([.1,.3]):(e.state=`charging`,e.charge=0,e.orb.visible=!0,this.lockT=this.t+o.lock);else if(e.vanishIn<=0){this.startVanish(e);return}}else e.charge+=t,e.orb.scale.setScalar(.2+1.3*Math.min(1,e.charge/o.charge)),e.charge>=o.charge&&(o.attack(e),e.orb.visible=!1,e.state=`patrol`,e.atkIn=Vf(o.gap));this.face(e,t,e.state===`charging`?6:2),e.group.rotation.z=Math.sin(i*1.4+e.ph)*.03,r.y=.15+Math.sin(i*1.8+e.ph)*.12;for(let t of e.targets)t.position.set(r.x,r.y+t.dy,r.z);return}case`vanishing`:e.fx=Math.max(0,e.fx-t/Np),this.setFx(e),e.fx<=0&&(e.group.visible=!1,e.state=`hidden`,e.timer=e.afterHide==null?Vf(Op):e.afterHide,e.afterHide=null);return;case`dying`:e.fx=Math.max(0,e.fx-t/Np),this.setFx(e),e.fx<=0&&this.finishDeath(e);return}}puff(e,t,n,r,i){this.puffs.spawn(e,t,n,r,i)}updateLater(){for(let e=this.later.length-1;e>=0;e--){let t=this.later[e];this.t<t.t||(this.later.splice(e,1),t.fn())}}update(e){e=Math.min(e,.05),this.t+=e;let t=this.player.pos.z;if(t<-8){let e=Math.min(this.types.length-1,Math.floor((-t-8)/Zu.length));e>this.cur&&this.enterRoom(e)}!this.won&&this.rooms[this.types.length-1].cleared&&t<this.temple.hallZ-25&&this.victory();for(let t of this.demons)this.updateDemon(t,e),this.syncBar(t);this.cur>=0&&this.types[this.cur].update(e),this.updateLater(),this.puffs.update(e),this.score.update(e)}};s;var Bp=50,Vp=10,Hp=2,Up=9,Wp=[4,6],Gp=5,Kp=8,qp=[20,30],Jp=[35,50],Yp=[35,65],Xp=2.7,Zp=3,Qp={ax:[10,15],az:[6,10],ay:[2,4],wx:[.6,1],wz:[.45,.8],wy:[1.3,2],cy:[13,21]},$p={health:{core:16727406,glow:16751285,mark:16777215},shield:{core:3103743,glow:8233727,mark:16765498}},em=1315356,tm=e=>e[0]+Math.random()*(e[1]-e[0]),nm=wt.clamp,rm=e=>e<-8?Math.min(4,Math.floor((-e-8)/Zu.length)):-1,im=class{constructor(e,t,n){this.scene=e,this.temple=t,this.player=n,this.t=0,this.hT=Hp,this.sT=tm(qp),this.health=this.makeBall(`health`),this.shield=this.makeBall(`shield`),this.balls=[this.health,this.shield]}makeBall(e){let t=$p[e],n=e===`health`,r=new Cn,i=new X(new fo(1.3,1),new ri({color:t.core})),a=new X(new go(1.5,12,9),new ri({color:em,side:1})),o=new X(new go(2,10,8),new ri({color:t.glow,transparent:!0,opacity:.22,blending:2,depthWrite:!1}));r.add(a,i,o);let c=[],l=new ri({color:t.mark});if(n){let e=new X(new Ui(1.7,.48,.4),l);e.position.z=1.2;let t=new X(new Ui(.48,1.7,.4),l);t.position.z=1.2,r.add(e,t)}else for(let e of[0,Math.PI/2]){let t=new X(new _o(2.2,.16,6,20),l);t.rotation.x=e,r.add(t),c.push(t)}r.visible=!1,this.scene.add(r);let u={kind:e,group:r,spin:c,state:`idle`,t:0,life:0,room:-1,blockT:0,c:new q,ax:0,az:0,ay:0,wx:0,wz:0,wy:0,p1:0,p2:0,p3:0,target:null};return u.target={position:new q,radius:Xp,onHit:e=>this.collect(u,e)},u}pick(e){let t=this.player,n=t.pos,r=this.temple,i=r.colliders,a=r.zLimit()+6+e.az,o=r.zMax()-6-e.az,c=Math.max(4,Zu.width/2-8-e.ax),l=Math.max(e.ax,e.az);for(let r=0;r<40;r++){let r=t.yaw+(Math.random()*2-1)*.6,u=tm(Yp),d=nm(n.x-Math.sin(r)*u,-c,c),f=n.z-Math.cos(r)*u;if(a<o&&(f=nm(f,a,o)),Math.hypot(d-n.x,f-n.z)<18)continue;let p=!0;for(let e of i){if(Math.hypot(d-e.x,f-e.z)<e.r+l+Zp){p=!1;break}if(qf(n.x,n.z,d,f,e.x,e.z)<(e.r+Zp)**2){p=!1;break}}if(p)return e.c.set(d,tm(Qp.cy),f),!0}return!1}spawn(e){if(e.ax=tm(Qp.ax),e.az=tm(Qp.az),e.ay=tm(Qp.ay),e.wx=tm(Qp.wx),e.wz=tm(Qp.wz),e.wy=tm(Qp.wy),e.p1=Math.random()*6.28,e.p2=Math.random()*6.28,e.p3=Math.random()*6.28,!this.pick(e)){e.kind===`health`?this.hT=.6:this.sT=.6;return}this.place(e),e.group.scale.setScalar(.01),e.group.visible=!0,e.state=`live`,e.t=0,e.blockT=0,e.life=e.kind===`health`?Up:Kp,e.room=rm(this.player.pos.z);let t=this.player.arrows.targets;t.includes(e.target)||t.push(e.target)}place(e){e.group.position.set(e.c.x+e.ax*Math.sin(e.wx*e.t+e.p1),e.c.y+e.ay*Math.sin(e.wy*e.t+e.p2),e.c.z+e.az*Math.sin(e.wz*e.t+e.p3)),e.target.position.copy(e.group.position)}untarget(e){let t=this.player.arrows.targets,n=t.indexOf(e.target);n!==-1&&t.splice(n,1)}finish(e,t){this.untarget(e),t?(e.state=`pop`,e.t=0):(e.state=`idle`,e.group.visible=!1),e.kind===`health`?this.hT=tm(Wp):this.sT=tm(Jp)}collect(e,t){t.group.visible=!1,t.active=!1;let n=this.player;e.kind===`health`?n.heal(Vp):n.shield=Math.max(n.shield||0,Gp),this.finish(e,!0)}update(e){let t=this.player;this.t+=e;let n=t.pos.z<-8&&!t.dead,r=rm(t.pos.z),i=this.health;n&&t.hp<Bp?i.state===`idle`&&(this.hT-=e,this.hT<=0&&this.spawn(i)):(i.state===`live`&&this.finish(i,!1),this.hT=Hp);let a=this.shield;n?a.state===`idle`&&!(t.shield>0)&&(this.sT-=e,this.sT<=0&&this.spawn(a)):a.state===`live`&&this.finish(a,!1);for(let n of this.balls)if(n.state===`live`){n.t+=e;let i=n.group;i.scale.setScalar(Math.min(1,.01+n.t*4)),this.place(n),i.rotation.y=Math.atan2(t.pos.x-i.position.x,t.pos.z-i.position.z);for(let t of n.spin)t.rotation.z+=e*2;let a=t.pos;n.blockT=this.temple.colliders.some(e=>qf(a.x,a.z,i.x,i.z,e.x,e.z)<(e.r+1.5)**2)?n.blockT+e:0,(n.t>n.life||n.room!==r||n.blockT>1.2)&&this.finish(n,!1)}else n.state===`pop`&&(n.t+=e,n.group.scale.setScalar(1+n.t/.25*1.2),n.t>=.25&&(n.state=`idle`,n.group.visible=!1));t.health&&t.health.setShield&&t.health.setShield(t.shield||0,Gp)}},am=class{constructor(e,t,n){this.p=e,this.dom=t,this.bgm=n,this.paused=!1,this.on=!1,this.wasLocked=!1;let r=document.createElement(`style`);r.textContent=`
#pbtn{position:fixed;top:max(14px,env(safe-area-inset-top));right:max(14px,env(safe-area-inset-right));z-index:120;display:none;
width:42px;height:42px;border-radius:50%;align-items:center;justify-content:center;gap:5px;cursor:pointer;
background:rgba(30,16,8,.55);border:2px solid rgba(255,214,120,.7)}
#pbtn i{display:block;width:5px;height:16px;border-radius:2px;background:#f6e6b8}
#pmenu{position:fixed;inset:0;z-index:2500;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.72);
font-family:Georgia,serif;color:#f3e2b3}
#pmenu .box{padding:20px 34px;border:2px solid rgba(255,214,120,.7);border-radius:14px;background:rgba(30,16,8,.92);text-align:center}
#pmenu h2{margin:0 0 12px;font-size:28px;letter-spacing:4px}
#pmenu button{display:block;width:200px;margin:10px auto 0;font:bold 18px Georgia,serif;padding:10px 0;border-radius:10px;
border:2px solid rgba(255,214,120,.8);background:rgba(90,45,12,.9);color:#f6e6b8;cursor:pointer}`,document.head.appendChild(r),this.btn=document.createElement(`div`),this.btn.id=`pbtn`,this.btn.appendChild(document.createElement(`i`)),this.btn.appendChild(document.createElement(`i`)),document.body.appendChild(this.btn),this.menu=document.createElement(`div`),this.menu.id=`pmenu`;let i=document.createElement(`div`);i.className=`box`;let a=document.createElement(`h2`);a.textContent=`PAUSED`,i.appendChild(a);let o=(e,t)=>{let n=document.createElement(`button`);n.textContent=e,n.addEventListener(`click`,t),i.appendChild(n)};o(`Resume`,()=>this.close()),o(`Music: ON`,()=>{if(this.bgm){let e=this.bgm.toggle();this.musicBtn.textContent=e?`Music: OFF`:`Music: ON`}}),this.musicBtn=i.lastChild,o(`Restart`,()=>{dp.clear(),location.reload()}),this.menu.appendChild(i),document.body.appendChild(this.menu),this.btn.addEventListener(`click`,()=>this.open()),addEventListener(`keydown`,e=>{e.code===`KeyP`&&this.on&&(this.paused?this.close():this.open())}),document.addEventListener(`pointerlockchange`,()=>{let e=!!document.pointerLockElement;this.wasLocked&&!e&&this.on&&!this.paused&&!this.p.dead&&this.open(),this.wasLocked=e}),document.addEventListener(`visibilitychange`,()=>{document.hidden&&this.open()})}show(){this.on=!0,this.btn.style.display=`flex`}open(){if(!(!this.on||this.paused||this.p.dead)){this.paused=!0,this.menu.style.display=`flex`,this.p.lmb=!1;for(let e in this.p.keys)this.p.keys[e]=!1;document.exitPointerLock&&document.exitPointerLock()}}close(){this.paused=!1,this.menu.style.display=`none`,!Kd&&this.dom.requestPointerLock&&this.dom.requestPointerLock()}},om={en:[`For a very long time, the Astra Temple has been held by demons. The animals of the jungle used to survive by drinking the temple’s water, but ever since the demons attacked, the animals of the jungle have been dying.`,`In the last chamber of the Astra Temple lies a great pond. Until these demons are slain, no animal will be able to drink its water...`,`Will you destroy those demons? ......... If yes, then let’s start the game.`],hi:[`बहुत समय से अस्त्र मंदिर पर राक्षसों का कब्ज़ा है। जंगल के जानवर मंदिर का पानी पीकर जीवित रहते थे, लेकिन जब से राक्षसों ने हमला किया है, तब से जंगल के जानवर मर रहे हैं।`,`अस्त्र मंदिर के आख़िरी कमरे में एक बड़ा तालाब है। जब तक इन राक्षसों को मारा नहीं जाएगा, तब तक कोई भी जानवर उसका पानी नहीं पी सकेगा...`,`क्या तुम उन राक्षसों का अंत करोगे? ......... अगर हाँ, तो चलो खेल शुरू करें।`]},sm={en:`START`,hi:`शुरू करो`},cm=`
#tf{position:fixed;inset:0;z-index:5000;font-family:'Cinzel',Georgia,serif;color:#f1dfae;transition:opacity .5s}
#tf .scr{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;overflow:hidden;
background:radial-gradient(ellipse at 50% 38%,#4a3419 0%,#20150b 58%,#080503 100%)}
#tf .scr.on{display:flex}
#tf .scr::before{content:'';position:absolute;inset:0;opacity:.2;pointer-events:none;
background:repeating-linear-gradient(0deg,rgba(255,220,150,.14) 0 2px,transparent 2px 46px),repeating-linear-gradient(90deg,rgba(255,220,150,.09) 0 2px,transparent 2px 92px)}
#tf .scr>*{position:relative}
#tf h1{margin:0;font-family:'Cinzel Decorative','Cinzel',Georgia,serif;font-weight:900;letter-spacing:.07em;font-size:clamp(38px,10vw,104px);line-height:1.05;
background:linear-gradient(180deg,#fff3c4 0%,#e3b455 46%,#8a5a1a 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
filter:drop-shadow(0 4px 0 #2a1708) drop-shadow(0 0 24px rgba(255,170,60,.45))}
#tf .orn{display:flex;align-items:center;justify-content:center;gap:14px;margin:10px 0;color:#c9993f;font-size:14px;letter-spacing:6px}
#tf .orn::before,#tf .orn::after{content:'';display:block;width:clamp(50px,16vw,170px);height:2px;background:linear-gradient(90deg,transparent,#c9993f,transparent)}
#tf .tag{font-size:clamp(11px,2.2vw,17px);letter-spacing:.35em;text-transform:uppercase;color:#d8bd82}
#tf .btn{margin:7px;padding:11px 34px;min-width:200px;font:700 clamp(13px,2.4vw,17px) 'Cinzel',Georgia,serif;letter-spacing:.2em;color:#ffe7b0;cursor:pointer;
border:2px solid #c9993f;border-radius:6px;background:linear-gradient(#5a3a16,#2f1c0a);box-shadow:0 0 18px rgba(255,170,60,.25),inset 0 0 12px rgba(0,0,0,.5)}
#tf .btn:hover{filter:brightness(1.25)}
#tf .blink{margin-top:14px;font-size:12px;letter-spacing:.3em;color:#caa862;animation:tfb 1.6s infinite}
@keyframes tfb{50%{opacity:.25}}
#tf .torch{position:absolute;bottom:12%;width:22px;height:110px;border-radius:6px;background:linear-gradient(#5a3a1a,#24160a)}
#tf .torch.l{left:max(5%,16px)}#tf .torch.r{right:max(5%,16px)}
#tf .torch::before{content:'';position:absolute;left:50%;top:-46px;width:46px;height:62px;margin-left:-23px;border-radius:50% 50% 45% 45%;
background:radial-gradient(ellipse at 50% 70%,#fff2b0 0%,#ffb030 38%,rgba(255,90,0,.55) 66%,transparent 72%);animation:tff .35s infinite alternate;filter:blur(1px)}
@keyframes tff{from{transform:scale(1,1) translateY(0)}to{transform:scale(.88,1.1) translateY(-3px)}}
#tf .board{width:min(760px,92vw);max-height:88vh;overflow:auto;padding:14px 26px 16px;border:3px solid #b8863a;border-radius:10px;color:#3a2410;
background:linear-gradient(180deg,#ebd9a8,#d2b676);box-shadow:0 0 0 6px #2a1708,0 0 40px rgba(0,0,0,.85)}
#tf .tabs{display:flex;gap:8px;justify-content:center;margin-bottom:10px}
#tf .tab{padding:6px 22px;font:700 14px 'Cinzel',Georgia,serif;letter-spacing:.12em;color:#4a2e10;cursor:pointer;border:2px solid #8a5a1a;border-radius:6px 6px 0 0;background:#c7a765}
#tf .tab.on{background:#3a2410;color:#ffe7b0}
#tf .tab.hi{font-family:'Tiro Devanagari Hindi',serif;letter-spacing:0}
#tf .story{text-align:left;font-size:clamp(14px,2.3vw,19px);line-height:1.6;font-family:Georgia,serif}
#tf .story p{margin:0 0 10px}
#tf .story.hi{font-family:'Tiro Devanagari Hindi',Georgia,serif;line-height:1.75}
#tf .board .btn{display:block;margin:10px auto 0}
`,lm=class{constructor({temple:e,player:t,demons:n}){this.ctx={temple:e,player:t,demons:n},document.title=`Temple Fight`;let r=document.createElement(`link`);r.rel=`stylesheet`,r.href=`https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;700&family=Tiro+Devanagari+Hindi&display=swap`,document.head.appendChild(r);let i=document.createElement(`style`);i.textContent=cm,document.head.appendChild(i),this.root=document.createElement(`div`),this.root.id=`tf`,document.body.appendChild(this.root),this.screens={};let a=dp.get(),o=dp.takeAuto();this.buildTitle(a),this.buildStory(),this.buildResume(a),a&&o?this.go(`resume`):this.go(`title`)}el(e,t,n,r){let i=document.createElement(e);return t&&(i.className=t),n&&(i.textContent=n),r&&r.appendChild(i),i}screen(e){let t=this.el(`div`,`scr`,``,this.root);return this.screens[e]=t,t}go(e){for(let t in this.screens)this.screens[t].classList.toggle(`on`,t===e)}buildTitle(e){let t=this.screen(`title`);this.el(`div`,`torch l`,``,t),this.el(`div`,`torch r`,``,t),this.el(`div`,`tag`,`The Astra Temple awaits`,t),this.el(`div`,`orn`,`◆ ◆ ◆`,t),this.el(`h1`,``,`Temple Fight`,t),this.el(`div`,`orn`,`◆ ◆ ◆`,t);let n=()=>{dp.clear(),this.go(`story`)};if(e){let r=dp.room(e)+1;this.el(`button`,`btn`,`Continue · Room `+r,t).addEventListener(`click`,t=>{t.stopPropagation(),this.begin(e)}),this.el(`button`,`btn`,`New Game`,t).addEventListener(`click`,e=>{e.stopPropagation(),n()})}else this.el(`div`,`blink`,`CLICK TO BEGIN`,t),t.addEventListener(`click`,n)}buildStory(){let e=this.screen(`story`),t=this.el(`div`,`board`,``,e),n=this.el(`div`,`tabs`,``,t),r=this.el(`button`,`tab on`,`English`,n),i=this.el(`button`,`tab hi`,`हिन्दी`,n),a=this.el(`div`,`story`,``,t),o=this.el(`button`,`btn`,sm.en,t),c=e=>{r.classList.toggle(`on`,e===`en`),i.classList.toggle(`on`,e===`hi`),a.className=`story `+e,a.textContent=``;for(let t of om[e])this.el(`p`,``,t,a);o.textContent=sm[e]};r.addEventListener(`click`,()=>c(`en`)),i.addEventListener(`click`,()=>c(`hi`)),o.addEventListener(`click`,()=>this.begin(null)),c(`en`)}buildResume(e){let t=this.screen(`resume`);this.el(`h1`,``,`Temple Fight`,t),e&&(this.el(`div`,`orn`,`◆ ◆ ◆`,t),this.el(`div`,`tag`,`Room `+(dp.room(e)+1)+` se wapas`,t)),this.el(`div`,`blink`,`TAP TO CONTINUE`,t),t.addEventListener(`click`,()=>this.begin(e))}begin(e){let{temple:t,player:n,demons:r}=this.ctx;e&&fp(e,t,n,r),this.root.style.opacity=`0`,setTimeout(()=>this.root.remove(),520);let i=document.getElementById(`start`);i&&i.click()}},um=class{constructor(e=`./audio/bgm.mp3`,t=.4){this.audio=new Audio(e),this.audio.loop=!0,this.audio.volume=t,this.muted=!1}play(){this.audio.play().catch(()=>{})}pause(){this.audio.pause()}resume(){this.audio.play().catch(()=>{})}toggle(){return this.muted=!this.muted,this.muted?this.audio.pause():this.audio.play().catch(()=>{}),this.muted}},{renderer:dm,scene:fm,camera:pm,follow:mm}=Xu(),hm=new zf(fm),gm=new cf(pm,dm.domElement,hm,fm),_m=new zp(fm,hm,gm),vm=new im(fm,hm,gm),ym=new Bf,bm=new um,xm=new am(gm,dm.domElement);new lm({temple:hm,player:gm,demons:_m});var Sm=document.getElementById(`start`);Sm.addEventListener(`click`,()=>{Sm.classList.add(`hide`),gm.showUI(),xm.show(),bm.play(),Kd||dm.domElement.requestPointerLock?.()}),addEventListener(`keydown`,e=>{e.code===`KeyG`&&hm.openNextGate()});var Cm=new As;dm.setAnimationLoop(()=>{let e=Math.min(Cm.getDelta(),.05);xm.paused||(hm.update(Cm.elapsedTime,e,gm.sealZ),_m.update(e),vm.update(e),gm.update(e),mm(pm),ym.update(gm.z),dm.render(fm,pm))});