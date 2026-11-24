/* Background (WebGL liquid light) and hero chart */
/* WebGL liquid light */
const g=$('#gl'),gl=g.getContext('webgl');let U;
if(gl){const v=`attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`,f=`precision mediump float;uniform vec2 r,m;uniform float t,s;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+1.),f.x),f.y);}
float F(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.02+7.;a*=.5;}return v;}
void main(){vec2 uv=gl_FragCoord.xy/r,p=(gl_FragCoord.xy-.5*r)/r.y,mm=(m-.5*r)/r.y;float tt=t*.035;p.y+=s*.2;
vec2 q=vec2(F(p*1.5+tt),F(p*1.5+vec2(5.2,1.3)-tt));vec2 w=vec2(F(p*1.5+3.*q+vec2(1.7,9.2)+tt*1.4),F(p*1.5+3.*q+vec2(8.3,2.8)-tt));
float k=F(p*1.3+3.*w);float d=length(p-mm);float lit=exp(-d*d*5.);
vec3 c=mix(vec3(.05,.04,.033),vec3(.125,.11,.095),smoothstep(.2,.8,k));
c=mix(c,vec3(.4,.06,.025),smoothstep(.5,.9,k)*(.5+.4*q.x));c+=vec3(.5,.11,.05)*pow(smoothstep(.65,.97,k),3.)*.3;
c+=vec3(.15,1.,.45)*pow(smoothstep(.7,1.,w.x*w.y*2.4),7.)*.08;c+=lit*vec3(.5,.1,.04)*.45;gl_FragColor=vec4(c,1.);}`;
const mk=(ty,s)=>{const o=gl.createShader(ty);gl.shaderSource(o,s);gl.compileShader(o);return o},pr=gl.createProgram();
gl.attachShader(pr,mk(gl.VERTEX_SHADER,v));gl.attachShader(pr,mk(gl.FRAGMENT_SHADER,f));gl.linkProgram(pr);gl.useProgram(pr);
gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const a=gl.getAttribLocation(pr,'p');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
U={r:gl.getUniformLocation(pr,'r'),m:gl.getUniformLocation(pr,'m'),t:gl.getUniformLocation(pr,'t'),s:gl.getUniformLocation(pr,'s')};
const rz=()=>{g.width=innerWidth*.5;g.height=innerHeight*.5;gl.viewport(0,0,g.width,g.height)};rz();addEventListener('resize',rz)}
else document.body.style.background='radial-gradient(circle at 20% 10%,#8c1105,#25221e 60%,#120e0b)';
/* chart */
const ch=$('#chart'),x=ch.getContext('2d'),N=90,P=[];let v=.5;for(let i=0;i<N;i++){v+=(Math.random()-.46)*.09;P.push(v)}
function chart(fr){const d=devicePixelRatio,W=ch.width=ch.clientWidth*d,H=ch.height=ch.clientHeight*d;if(!W)return;
if(fr%8==0){P.shift();v+=(Math.random()-.46)*.09;v=Math.max(.1,Math.min(.95,v));P.push(v)}
const mn=Math.min(...P),mxv=Math.max(...P),Y=i=>H*(.85-(P[i]-mn)/(mxv-mn||1)*.6),X=i=>i/(N-1)*W;
x.beginPath();x.moveTo(0,Y(0));for(let i=1;i<N;i++)x.quadraticCurveTo(X(i-1),Y(i-1),(X(i-1)+X(i))/2,(Y(i-1)+Y(i))/2);x.lineTo(X(N-1),Y(N-1));
const gr=x.createLinearGradient(0,0,W,0);gr.addColorStop(0,'rgba(224,70,42,0)');gr.addColorStop(.6,'#e0462a');gr.addColorStop(1,'#39ff88');
x.shadowColor='#e0462a';x.shadowBlur=8;x.strokeStyle=gr;x.lineWidth=2.5*d;x.stroke();x.shadowBlur=0;x.lineTo(W,H);x.lineTo(0,H);
const fg=x.createLinearGradient(0,0,0,H);fg.addColorStop(0,'rgba(224,70,42,.2)');fg.addColorStop(1,'rgba(224,70,42,0)');x.fillStyle=fg;x.fill();
x.fillStyle='#39ff88';x.shadowColor='#39ff88';x.shadowBlur=10;x.beginPath();x.arc(X(N-1)-5,Y(N-1),(4+(Math.sin(fr/12)+1)*1.5)*d,0,7);x.fill()}
let fr=0;function loop(tm){fr++;cx+=(mx-cx)*.14;cy+=(my-cy)*.14;$('#rc').style.transform=`translate(${cx}px,${cy}px)`;
if(gl){gl.uniform2f(U.r,g.width,g.height);gl.uniform2f(U.m,mx*.5,(innerHeight-my)*.5);gl.uniform1f(U.t,tm/1000);gl.uniform1f(U.s,sc/innerHeight);gl.drawArrays(gl.TRIANGLES,0,3)}
if(cur=='home')chart(fr);if(!rm)requestAnimationFrame(loop)}
requestAnimationFrame(loop);
