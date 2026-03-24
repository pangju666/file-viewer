import{d as Te,a0 as vt,aP as jt,aE as Gt,G as N,aY as Xt,bb as Zt,bc as $t,bd as qt,bg as Lt,bk as Kt,$ as Qt,C as be,Y as Jt,a_ as Yt,aZ as es,S as gt,h as ts,D as ss,H as L,f as rs,c2 as ns,c3 as is,v as _e,a5 as as,aU as os,a as E,w as Ge,o as ue,V as ee,c4 as cs,c as X,L as ie,c5 as Re,c6 as ke,c7 as ls,u as q,c8 as hs,Q as Ft,g as J,b0 as we,y as fe,R as ne,B as fs,c9 as He,p as us,aK as ds}from"./FilePreviewView-BIJ8FJ2G.js";import{ar as Ie}from"./index-uOY01V4R.js";import{ShaderMaterial as St}from"./shaderMaterial-C5L4GAse.js";import"./clipPlaneFragment-crtqhU78.js";import"./logDepthDeclaration-C_AWNbMI.js";import"./fogFragment-D9Y4ut8h.js";import"./sceneUboDeclaration-BmpX84I4.js";import"./meshUboDeclaration-D_gfrd_S.js";import"./clipPlaneVertex-BvELw-Nj.js";import"./logDepthVertex-BHmP8eda.js";import"./helperFunctions-CKOF2w0P.js";import"./clipPlaneFragment-D0yxQ3gD.js";import"./logDepthDeclaration-Hb-RF-xC.js";import"./fogFragment-DFNv-ArR.js";import"./sceneUboDeclaration-Ck9UX63v.js";import"./meshUboDeclaration-CX8akk39.js";import"./helperFunctions-B4QWncCn.js";import"./clipPlaneVertex-CNMuvNFr.js";import"./logDepthVertex-BflK2mle.js";import{R as Ce}from"./rawTexture-KstGxIqd.js";import"./thinInstanceMesh-DCPBTxId.js";import{A as ps}from"./assetContainer-1bb6POSO.js";import{Ray as _s}from"./ray-DadF0Xkg.js";import{S as xs}from"./standardMaterial-B2rlC2mm.js";class ms{constructor(){this.mm=new Map}get(e,t){const s=this.mm.get(e);if(s!==void 0)return s.get(t)}set(e,t,s){let a=this.mm.get(e);a===void 0&&this.mm.set(e,a=new Map),a.set(t,s)}}class vs{get standalone(){return this._options?.standalone??!1}get baseMaterial(){return this._baseMaterial}get doNotInjectCode(){return this._options?.doNotInjectCode??!1}constructor(e,t,s){this._baseMaterial=e,this._scene=t??Te.LastCreatedScene,this._options=s,this._subMeshToEffect=new Map,this._subMeshToDepthWrapper=new ms,this._meshes=new Map,this._onEffectCreatedObserver=this._baseMaterial.onEffectCreatedObservable.add(a=>{const r=a.subMesh?.getMesh();r&&!this._meshes.has(r)&&this._meshes.set(r,r.onDisposeObservable.add(i=>{const u=this._subMeshToEffect.keys();for(let c=u.next();c.done!==!0;c=u.next()){const o=c.value;o?.getMesh()===i&&(this._subMeshToEffect.delete(o),this._deleteDepthWrapperEffect(o))}})),this._subMeshToEffect.get(a.subMesh)?.[0]!==a.effect&&(this._subMeshToEffect.set(a.subMesh,[a.effect,this._scene.getEngine().currentRenderPassId]),this._deleteDepthWrapperEffect(a.subMesh))})}_deleteDepthWrapperEffect(e){const t=this._subMeshToDepthWrapper.mm.get(e);t&&(t.forEach(s=>{s.mainDrawWrapper.effect?.dispose()}),this._subMeshToDepthWrapper.mm.delete(e))}getEffect(e,t,s){const a=this._subMeshToDepthWrapper.mm.get(e)?.get(t);if(!a)return null;let r=a.drawWrapper[s];return r||(r=a.drawWrapper[s]=new vt(this._scene.getEngine()),r.setEffect(a.mainDrawWrapper.effect,a.mainDrawWrapper.defines)),r}isReadyForSubMesh(e,t,s,a,r){return this.standalone&&!this._baseMaterial.isReadyForSubMesh(e.getMesh(),e,a)?!1:this._makeEffect(e,t,s,r)?.isReady()??!1}dispose(){this._baseMaterial.onEffectCreatedObservable.remove(this._onEffectCreatedObserver),this._onEffectCreatedObserver=null;const e=this._meshes.entries();for(let t=e.next();t.done!==!0;t=e.next()){const[s,a]=t.value;s.onDisposeObservable.remove(a)}}_makeEffect(e,t,s,a){const r=this._scene.getEngine(),i=this._subMeshToEffect.get(e);if(!i)return null;const[u,c]=i;if(!u.isReady())return null;let o=this._subMeshToDepthWrapper.get(e,s);if(!o){const l=new vt(r);l.defines=e._getDrawWrapper(c)?.defines??null,o={drawWrapper:[],mainDrawWrapper:l,depthDefines:"",token:jt()},o.drawWrapper[a]=l,this._subMeshToDepthWrapper.set(e,s,o)}const x=t.join(`
`);if(o.mainDrawWrapper.effect&&x===o.depthDefines)return o.mainDrawWrapper.effect;o.depthDefines=x;const p=u.getUniformNames().slice();let h=u.vertexSourceCodeBeforeMigration,d=u.fragmentSourceCodeBeforeMigration;if(!h&&!d)return null;if(!this.doNotInjectCode){const l=this._options&&this._options.remappedVariables?`#include<shadowMapVertexNormalBias>(${this._options.remappedVariables.join(",")})`:"#include<shadowMapVertexNormalBias>",_=this._options&&this._options.remappedVariables?`#include<shadowMapVertexMetric>(${this._options.remappedVariables.join(",")})`:"#include<shadowMapVertexMetric>",C=this._options&&this._options.remappedVariables?`#include<shadowMapFragmentSoftTransparentShadow>(${this._options.remappedVariables.join(",")})`:"#include<shadowMapFragmentSoftTransparentShadow>",f="#include<shadowMapFragment>",g="#include<shadowMapVertexExtraDeclaration>";u.shaderLanguage===0?h=h.replace(/void\s+?main/g,`
${g}
void main`):h=h.replace(/@vertex/g,`
${g}
@vertex`),h=h.replace(/#define SHADOWDEPTH_NORMALBIAS|#define CUSTOM_VERTEX_UPDATE_WORLDPOS/g,l),h.indexOf("#define SHADOWDEPTH_METRIC")!==-1?h=h.replace(/#define SHADOWDEPTH_METRIC/g,_):h=h.replace(/}\s*$/g,_+`
}`),h=h.replace(/#define SHADER_NAME.*?\n|out vec4 glFragColor;\n/g,"");const v=d.indexOf("#define SHADOWDEPTH_SOFTTRANSPARENTSHADOW")>=0||d.indexOf("#define CUSTOM_FRAGMENT_BEFORE_FOG")>=0,I=d.indexOf("#define SHADOWDEPTH_FRAGMENT")!==-1;let S="";v?d=d.replace(/#define SHADOWDEPTH_SOFTTRANSPARENTSHADOW|#define CUSTOM_FRAGMENT_BEFORE_FOG/g,C):S=C+`
`,d=d.replace(/void\s+?main/g,Gt.IncludesShadersStore.shadowMapFragmentExtraDeclaration+`
void main`),I?d=d.replace(/#define SHADOWDEPTH_FRAGMENT/g,f):S+=f+`
`,S&&(d=d.replace(/}\s*$/g,S+"}")),p.push("biasAndScaleSM","depthValuesSM","lightDataSM","softTransparentShadowSM")}o.mainDrawWrapper.effect=r.createEffect({vertexSource:h,fragmentSource:d,vertexToken:o.token,fragmentToken:o.token},{attributes:u.getAttributesNames(),uniformsNames:p,uniformBuffersNames:u.getUniformBuffersNames(),samplers:u.getSamplers(),defines:x+`
`+u.defines.replace("#define SHADOWS","").replace(/#define SHADOW\d/g,""),indexParameters:u.getIndexParameters(),shaderLanguage:u.shaderLanguage},r);for(let l=0;l<o.drawWrapper.length;++l)l!==a&&o.drawWrapper[l]?.setEffect(o.mainDrawWrapper.effect,o.mainDrawWrapper.defines);return o.mainDrawWrapper.effect}}const yt="gaussianSplattingFragmentDeclaration",gs=`vec4 gaussianColor(vec4 inColor)
{float A=-dot(vPosition,vPosition);if (A<-4.0) discard;float B=exp(A)*inColor.a;
#include<logDepthFragment>
vec3 color=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4(color,B);}
`;N.IncludesShadersStore[yt]||(N.IncludesShadersStore[yt]=gs);const Be="gaussianSplattingPixelShader",Bt=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
void main () {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
vec4 finalColor=gaussianColor(vColor);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
gl_FragColor=finalColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;N.ShadersStore[Be]||(N.ShadersStore[Be]=Bt);const Ss={name:Be,shader:Bt},ys=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingPixelShader:Ss},Symbol.toStringTag,{value:"Module"})),wt="gaussianSplattingVertexDeclaration",ws="attribute vec3 position;attribute vec4 splatIndex0;attribute vec4 splatIndex1;attribute vec4 splatIndex2;attribute vec4 splatIndex3;uniform mat4 view;uniform mat4 projection;uniform mat4 world;uniform vec4 vEyePosition;";N.IncludesShadersStore[wt]||(N.IncludesShadersStore[wt]=ws);const It="gaussianSplattingUboDeclaration",Is=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute vec3 position;attribute vec4 splatIndex0;attribute vec4 splatIndex1;attribute vec4 splatIndex2;attribute vec4 splatIndex3;
`;N.IncludesShadersStore[It]||(N.IncludesShadersStore[It]=Is);const Ct="gaussianSplatting",Cs=`#if !defined(WEBGL2) && !defined(WEBGPU) && !defined(NATIVE)
mat3 transpose(mat3 matrix) {return mat3(matrix[0][0],matrix[1][0],matrix[2][0],
matrix[0][1],matrix[1][1],matrix[2][1],
matrix[0][2],matrix[1][2],matrix[2][2]);}
#endif
vec2 getDataUV(float index,vec2 textureSize) {float y=floor(index/textureSize.x);float x=index-y*textureSize.x;return vec2((x+0.5)/textureSize.x,(y+0.5)/textureSize.y);}
#if SH_DEGREE>0 || IS_COMPOUND
ivec2 getDataUVint(float index,vec2 textureSize) {float y=floor(index/textureSize.x);float x=index-y*textureSize.x;return ivec2(uint(x+0.5),uint(y+0.5));}
#endif
struct Splat {vec4 center;vec4 color;vec4 covA;vec4 covB;
#if SH_DEGREE>0
uvec4 sh0; 
#endif
#if SH_DEGREE>1
uvec4 sh1;
#endif
#if SH_DEGREE>2
uvec4 sh2;
#endif
#if IS_COMPOUND
uint partIndex;
#endif
};float getSplatIndex(int localIndex)
{float splatIndex;switch (localIndex)
{case 0: splatIndex=splatIndex0.x; break;case 1: splatIndex=splatIndex0.y; break;case 2: splatIndex=splatIndex0.z; break;case 3: splatIndex=splatIndex0.w; break;case 4: splatIndex=splatIndex1.x; break;case 5: splatIndex=splatIndex1.y; break;case 6: splatIndex=splatIndex1.z; break;case 7: splatIndex=splatIndex1.w; break;case 8: splatIndex=splatIndex2.x; break;case 9: splatIndex=splatIndex2.y; break;case 10: splatIndex=splatIndex2.z; break;case 11: splatIndex=splatIndex2.w; break;case 12: splatIndex=splatIndex3.x; break;case 13: splatIndex=splatIndex3.y; break;case 14: splatIndex=splatIndex3.z; break;case 15: splatIndex=splatIndex3.w; break;}
return splatIndex;}
Splat readSplat(float splatIndex)
{Splat splat;vec2 splatUV=getDataUV(splatIndex,dataTextureSize);splat.center=texture2D(centersTexture,splatUV);splat.color=texture2D(colorsTexture,splatUV);splat.covA=texture2D(covariancesATexture,splatUV)*splat.center.w;splat.covB=texture2D(covariancesBTexture,splatUV)*splat.center.w;
#if SH_DEGREE>0 || IS_COMPOUND
ivec2 splatUVint=getDataUVint(splatIndex,dataTextureSize);
#endif
#if SH_DEGREE>0
splat.sh0=texelFetch(shTexture0,splatUVint,0);
#endif
#if SH_DEGREE>1
splat.sh1=texelFetch(shTexture1,splatUVint,0);
#endif
#if SH_DEGREE>2
splat.sh2=texelFetch(shTexture2,splatUVint,0);
#endif
#if IS_COMPOUND
splat.partIndex=uint(texture2D(partIndicesTexture,splatUV).r*255.0+0.5);
#endif
return splat;}
#if defined(WEBGL2) || defined(WEBGPU) || defined(NATIVE)
vec3 computeColorFromSHDegree(vec3 dir,const vec3 sh[16])
{const float SH_C0=0.28209479;const float SH_C1=0.48860251;float SH_C2[5];SH_C2[0]=1.092548430;SH_C2[1]=-1.09254843;SH_C2[2]=0.315391565;SH_C2[3]=-1.09254843;SH_C2[4]=0.546274215;float SH_C3[7];SH_C3[0]=-0.59004358;SH_C3[1]=2.890611442;SH_C3[2]=-0.45704579;SH_C3[3]=0.373176332;SH_C3[4]=-0.45704579;SH_C3[5]=1.445305721;SH_C3[6]=-0.59004358;vec3 result=/*SH_C0**/sh[0];
#if SH_DEGREE>0
float x=dir.x;float y=dir.y;float z=dir.z;result+=- SH_C1*y*sh[1]+SH_C1*z*sh[2]-SH_C1*x*sh[3];
#if SH_DEGREE>1
float xx=x*x,yy=y*y,zz=z*z;float xy=x*y,yz=y*z,xz=x*z;result+=
SH_C2[0]*xy*sh[4] +
SH_C2[1]*yz*sh[5] +
SH_C2[2]*(2.0*zz-xx-yy)*sh[6] +
SH_C2[3]*xz*sh[7] +
SH_C2[4]*(xx-yy)*sh[8];
#if SH_DEGREE>2
result+=
SH_C3[0]*y*(3.0*xx-yy)*sh[9] +
SH_C3[1]*xy*z*sh[10] +
SH_C3[2]*y*(4.0*zz-xx-yy)*sh[11] +
SH_C3[3]*z*(2.0*zz-3.0*xx-3.0*yy)*sh[12] +
SH_C3[4]*x*(4.0*zz-xx-yy)*sh[13] +
SH_C3[5]*z*(xx-yy)*sh[14] +
SH_C3[6]*x*(xx-3.0*yy)*sh[15];
#endif
#endif
#endif
return result;}
vec4 decompose(uint value)
{vec4 components=vec4(
float((value ) & 255u),
float((value>>uint( 8)) & 255u),
float((value>>uint(16)) & 255u),
float((value>>uint(24)) & 255u));return components*vec4(2./255.)-vec4(1.);}
vec3 computeSH(Splat splat,vec3 dir)
{vec3 sh[16];sh[0]=vec3(0.,0.,0.);
#if SH_DEGREE>0
vec4 sh00=decompose(splat.sh0.x);vec4 sh01=decompose(splat.sh0.y);vec4 sh02=decompose(splat.sh0.z);sh[1]=vec3(sh00.x,sh00.y,sh00.z);sh[2]=vec3(sh00.w,sh01.x,sh01.y);sh[3]=vec3(sh01.z,sh01.w,sh02.x);
#endif
#if SH_DEGREE>1
vec4 sh03=decompose(splat.sh0.w);vec4 sh04=decompose(splat.sh1.x);vec4 sh05=decompose(splat.sh1.y);sh[4]=vec3(sh02.y,sh02.z,sh02.w);sh[5]=vec3(sh03.x,sh03.y,sh03.z);sh[6]=vec3(sh03.w,sh04.x,sh04.y);sh[7]=vec3(sh04.z,sh04.w,sh05.x);sh[8]=vec3(sh05.y,sh05.z,sh05.w);
#endif
#if SH_DEGREE>2
vec4 sh06=decompose(splat.sh1.z);vec4 sh07=decompose(splat.sh1.w);vec4 sh08=decompose(splat.sh2.x);vec4 sh09=decompose(splat.sh2.y);vec4 sh10=decompose(splat.sh2.z);vec4 sh11=decompose(splat.sh2.w);sh[9]=vec3(sh06.x,sh06.y,sh06.z);sh[10]=vec3(sh06.w,sh07.x,sh07.y);sh[11]=vec3(sh07.z,sh07.w,sh08.x);sh[12]=vec3(sh08.y,sh08.z,sh08.w);sh[13]=vec3(sh09.x,sh09.y,sh09.z);sh[14]=vec3(sh09.w,sh10.x,sh10.y);sh[15]=vec3(sh10.z,sh10.w,sh11.x); 
#endif
return computeColorFromSHDegree(dir,sh);}
#else
vec3 computeSH(Splat splat,vec3 dir)
{return vec3(0.,0.,0.);}
#endif
vec4 gaussianSplatting(vec2 meshPos,vec3 worldPos,vec2 scale,vec3 covA,vec3 covB,mat4 worldMatrix,mat4 viewMatrix,mat4 projectionMatrix)
{mat4 modelView=viewMatrix*worldMatrix;vec4 camspace=viewMatrix*vec4(worldPos,1.);vec4 pos2d=projectionMatrix*camspace;float bounds=1.2*pos2d.w;if (pos2d.z<-pos2d.w || pos2d.x<-bounds || pos2d.x>bounds
|| pos2d.y<-bounds || pos2d.y>bounds) {return vec4(0.0,0.0,2.0,1.0);}
mat3 Vrk=mat3(
covA.x,covA.y,covA.z,
covA.y,covB.x,covB.y,
covA.z,covB.y,covB.z
);bool isOrtho=abs(projectionMatrix[3][3]-1.0)<0.001;mat3 J;if (isOrtho) {J=mat3(
focal.x,0.,0.,
0.,focal.y,0.,
0.,0.,0.
);} else {J=mat3(
focal.x/camspace.z,0.,-(focal.x*camspace.x)/(camspace.z*camspace.z),
0.,focal.y/camspace.z,-(focal.y*camspace.y)/(camspace.z*camspace.z),
0.,0.,0.
);}
mat3 T=transpose(mat3(modelView))*J;mat3 cov2d=transpose(T)*Vrk*T;
#if COMPENSATION
float c00=cov2d[0][0];float c11=cov2d[1][1];float c01=cov2d[0][1];float detOrig=c00*c11-c01*c01;
#endif
cov2d[0][0]+=kernelSize;cov2d[1][1]+=kernelSize;
#if COMPENSATION
vec3 c2d=vec3(cov2d[0][0],c01,cov2d[1][1]);float detBlur=c2d.x*c2d.z-c2d.y*c2d.y;float compensation=sqrt(max(0.,detOrig/detBlur));vColor.w*=compensation;
#endif
float mid=(cov2d[0][0]+cov2d[1][1])/2.0;float radius=length(vec2((cov2d[0][0]-cov2d[1][1])/2.0,cov2d[0][1]));float epsilon=0.0001;float lambda1=mid+radius+epsilon,lambda2=mid-radius+epsilon;if (lambda2<0.0)
{return vec4(0.0,0.0,2.0,1.0);}
vec2 diagonalVector=normalize(vec2(cov2d[0][1],lambda1-cov2d[0][0]));vec2 majorAxis=min(sqrt(2.0*lambda1),1024.0)*diagonalVector;vec2 minorAxis=min(sqrt(2.0*lambda2),1024.0)*vec2(diagonalVector.y,-diagonalVector.x);vec2 vCenter=vec2(pos2d);float scaleFactor=isOrtho ? 1.0 : pos2d.w;return vec4(
vCenter 
+ ((meshPos.x*majorAxis
+ meshPos.y*minorAxis)*invViewport*scaleFactor)*scale,pos2d.zw);}
#if IS_COMPOUND
mat4 getPartWorld(uint partIndex) {return partWorld[partIndex];}
#endif
`;N.IncludesShadersStore[Ct]||(N.IncludesShadersStore[Ct]=Cs);const Ne="gaussianSplattingVertexShader",Nt=`#include<__decl__gaussianSplattingVertex>
#ifdef LOGARITHMICDEPTH
#extension GL_EXT_frag_depth : enable
#endif
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
#include<helperFunctions>
uniform vec2 invViewport;uniform vec2 dataTextureSize;uniform vec2 focal;uniform float kernelSize;uniform vec3 eyePosition;uniform float alpha;
#if IS_COMPOUND
uniform mat4 partWorld[MAX_PART_COUNT];uniform float partVisibility[MAX_PART_COUNT];
#endif
uniform sampler2D covariancesATexture;uniform sampler2D covariancesBTexture;uniform sampler2D centersTexture;uniform sampler2D colorsTexture;
#if SH_DEGREE>0
uniform highp usampler2D shTexture0;
#endif
#if SH_DEGREE>1
uniform highp usampler2D shTexture1;
#endif
#if SH_DEGREE>2
uniform highp usampler2D shTexture2;
#endif
#if IS_COMPOUND
uniform sampler2D partIndicesTexture;
#endif
varying vec4 vColor;varying vec2 vPosition;
#define CUSTOM_VERTEX_DEFINITIONS
#include<gaussianSplatting>
void main () {
#define CUSTOM_VERTEX_MAIN_BEGIN
float splatIndex=getSplatIndex(int(position.z+0.5));Splat splat=readSplat(splatIndex);vec3 covA=splat.covA.xyz;vec3 covB=vec3(splat.covA.w,splat.covB.xy);
#if IS_COMPOUND
mat4 splatWorld=getPartWorld(splat.partIndex);
#else
mat4 splatWorld=world;
#endif
vec4 worldPos=splatWorld*vec4(splat.center.xyz,1.0);vColor=splat.color;vPosition=position.xy;
#if SH_DEGREE>0
mat3 worldRot=mat3(splatWorld);mat3 normWorldRot=inverseMat3(worldRot);vec3 eyeToSplatLocalSpace=normalize(normWorldRot*(worldPos.xyz-eyePosition));vColor.xyz=splat.color.xyz+computeSH(splat,eyeToSplatLocalSpace);
#endif
vColor.w*=alpha;
#if IS_COMPOUND
vColor.w*=partVisibility[splat.partIndex];
#endif
vec2 scale=vec2(1.,1.);
#define CUSTOM_VERTEX_UPDATE
gl_Position=gaussianSplatting(position.xy,worldPos.xyz,scale,covA,covB,splatWorld,view,projection);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;N.ShadersStore[Ne]||(N.ShadersStore[Ne]=Nt);const bs={name:Ne,shader:Nt},Ts=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingVertexShader:bs},Symbol.toStringTag,{value:"Module"})),bt="gaussianSplattingFragmentDeclaration",Ms=`fn gaussianColor(inColor: vec4f,inPosition: vec2f)->vec4f
{var A : f32=-dot(inPosition,inPosition);if (A>-4.0)
{var B: f32=exp(A)*inColor.a;
#include<logDepthFragment>
var color: vec3f=inColor.rgb;
#ifdef FOG
#include<fogFragment>
#endif
return vec4f(color,B);} else {return vec4f(0.0);}}
`;N.IncludesShadersStoreWGSL[bt]||(N.IncludesShadersStoreWGSL[bt]=Ms);const We="gaussianSplattingPixelShader",Wt=`#include<clipPlaneFragmentDeclaration>
#include<logDepthDeclaration>
#include<fogFragmentDeclaration>
varying vColor: vec4f;varying vPosition: vec2f;
#define CUSTOM_FRAGMENT_DEFINITIONS
#include<gaussianSplattingFragmentDeclaration>
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
#include<clipPlaneFragment>
var finalColor: vec4f=gaussianColor(input.vColor,input.vPosition);
#define CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR
fragmentOutputs.color=finalColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;N.ShadersStoreWGSL[We]||(N.ShadersStoreWGSL[We]=Wt);const Es={name:We,shader:Wt},Ds=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingPixelShaderWGSL:Es},Symbol.toStringTag,{value:"Module"})),Tt="gaussianSplatting",As=`fn getDataUV(index: f32,dataTextureSize: vec2f)->vec2<f32> {let y: f32=floor(index/dataTextureSize.x);let x: f32=index-y*dataTextureSize.x;return vec2f((x+0.5),(y+0.5));}
struct Splat {center: vec4f,
color: vec4f,
covA: vec4f,
covB: vec4f,
#if SH_DEGREE>0
sh0: vec4<u32>,
#endif
#if SH_DEGREE>1
sh1: vec4<u32>,
#endif
#if SH_DEGREE>2
sh2: vec4<u32>,
#endif
#if IS_COMPOUND
partIndex: u32,
#endif
};fn getSplatIndex(localIndex: i32,splatIndex0: vec4f,splatIndex1: vec4f,splatIndex2: vec4f,splatIndex3: vec4f)->f32 {var splatIndex: f32;switch (localIndex)
{case 0:
{splatIndex=splatIndex0.x;break;}
case 1:
{splatIndex=splatIndex0.y;break;}
case 2:
{splatIndex=splatIndex0.z;break;}
case 3:
{splatIndex=splatIndex0.w;break;}
case 4:
{splatIndex=splatIndex1.x;break;}
case 5:
{splatIndex=splatIndex1.y;break;}
case 6:
{splatIndex=splatIndex1.z;break;}
case 7:
{splatIndex=splatIndex1.w;break;}
case 8:
{splatIndex=splatIndex2.x;break;}
case 9:
{splatIndex=splatIndex2.y;break;}
case 10:
{splatIndex=splatIndex2.z;break;}
case 11:
{splatIndex=splatIndex2.w;break;}
case 12:
{splatIndex=splatIndex3.x;break;}
case 13:
{splatIndex=splatIndex3.y;break;}
case 14:
{splatIndex=splatIndex3.z;break;}
default:
{splatIndex=splatIndex3.w;break;}}
return splatIndex;}
fn readSplat(splatIndex: f32,dataTextureSize: vec2f)->Splat {var splat: Splat;let splatUV=getDataUV(splatIndex,dataTextureSize);let splatUVi32=vec2<i32>(i32(splatUV.x),i32(splatUV.y));splat.center=textureLoad(centersTexture,splatUVi32,0);splat.color=textureLoad(colorsTexture,splatUVi32,0);splat.covA=textureLoad(covariancesATexture,splatUVi32,0)*splat.center.w;splat.covB=textureLoad(covariancesBTexture,splatUVi32,0)*splat.center.w;
#if SH_DEGREE>0
splat.sh0=textureLoad(shTexture0,splatUVi32,0);
#endif
#if SH_DEGREE>1
splat.sh1=textureLoad(shTexture1,splatUVi32,0);
#endif
#if SH_DEGREE>2
splat.sh2=textureLoad(shTexture2,splatUVi32,0);
#endif
#if IS_COMPOUND
splat.partIndex=u32(textureLoad(partIndicesTexture,splatUVi32,0).r*255.0+0.5);
#endif
return splat;}
fn computeColorFromSHDegree(dir: vec3f,sh: array<vec3<f32>,16>)->vec3f
{let SH_C0: f32=0.28209479;let SH_C1: f32=0.48860251;var SH_C2: array<f32,5>=array<f32,5>(
1.092548430,
-1.09254843,
0.315391565,
-1.09254843,
0.546274215
);var SH_C3: array<f32,7>=array<f32,7>(
-0.59004358,
2.890611442,
-0.45704579,
0.373176332,
-0.45704579,
1.445305721,
-0.59004358
);var result: vec3f=/*SH_C0**/sh[0];
#if SH_DEGREE>0
let x: f32=dir.x;let y: f32=dir.y;let z: f32=dir.z;result+=-SH_C1*y*sh[1]+SH_C1*z*sh[2]-SH_C1*x*sh[3];
#if SH_DEGREE>1
let xx: f32=x*x;let yy: f32=y*y;let zz: f32=z*z;let xy: f32=x*y;let yz: f32=y*z;let xz: f32=x*z;result+=
SH_C2[0]*xy*sh[4] +
SH_C2[1]*yz*sh[5] +
SH_C2[2]*(2.0f*zz-xx-yy)*sh[6] +
SH_C2[3]*xz*sh[7] +
SH_C2[4]*(xx-yy)*sh[8];
#if SH_DEGREE>2
result+=
SH_C3[0]*y*(3.0f*xx-yy)*sh[9] +
SH_C3[1]*xy*z*sh[10] +
SH_C3[2]*y*(4.0f*zz-xx-yy)*sh[11] +
SH_C3[3]*z*(2.0f*zz-3.0f*xx-3.0f*yy)*sh[12] +
SH_C3[4]*x*(4.0f*zz-xx-yy)*sh[13] +
SH_C3[5]*z*(xx-yy)*sh[14] +
SH_C3[6]*x*(xx-3.0f*yy)*sh[15];
#endif
#endif
#endif
return result;}
fn decompose(value: u32)->vec4f
{let components : vec4f=vec4f(
f32((value ) & 255u),
f32((value>>u32( 8)) & 255u),
f32((value>>u32(16)) & 255u),
f32((value>>u32(24)) & 255u));return components*vec4f(2./255.)-vec4f(1.);}
fn computeSH(splat: Splat,dir: vec3f)->vec3f
{var sh: array<vec3<f32>,16>;sh[0]=vec3f(0.,0.,0.);
#if SH_DEGREE>0
let sh00: vec4f=decompose(splat.sh0.x);let sh01: vec4f=decompose(splat.sh0.y);let sh02: vec4f=decompose(splat.sh0.z);sh[1]=vec3f(sh00.x,sh00.y,sh00.z);sh[2]=vec3f(sh00.w,sh01.x,sh01.y);sh[3]=vec3f(sh01.z,sh01.w,sh02.x);
#endif
#if SH_DEGREE>1
let sh03: vec4f=decompose(splat.sh0.w);let sh04: vec4f=decompose(splat.sh1.x);let sh05: vec4f=decompose(splat.sh1.y);sh[4]=vec3f(sh02.y,sh02.z,sh02.w);sh[5]=vec3f(sh03.x,sh03.y,sh03.z);sh[6]=vec3f(sh03.w,sh04.x,sh04.y);sh[7]=vec3f(sh04.z,sh04.w,sh05.x);sh[8]=vec3f(sh05.y,sh05.z,sh05.w);
#endif
#if SH_DEGREE>2
let sh06: vec4f=decompose(splat.sh1.z);let sh07: vec4f=decompose(splat.sh1.w);let sh08: vec4f=decompose(splat.sh2.x);let sh09: vec4f=decompose(splat.sh2.y);let sh10: vec4f=decompose(splat.sh2.z);let sh11: vec4f=decompose(splat.sh2.w);sh[9]=vec3f(sh06.x,sh06.y,sh06.z);sh[10]=vec3f(sh06.w,sh07.x,sh07.y);sh[11]=vec3f(sh07.z,sh07.w,sh08.x);sh[12]=vec3f(sh08.y,sh08.z,sh08.w);sh[13]=vec3f(sh09.x,sh09.y,sh09.z);sh[14]=vec3f(sh09.w,sh10.x,sh10.y);sh[15]=vec3f(sh10.z,sh10.w,sh11.x); 
#endif
return computeColorFromSHDegree(dir,sh);}
fn gaussianSplatting(
meshPos: vec2<f32>,
worldPos: vec3<f32>,
scale: vec2<f32>,
covA: vec3<f32>,
covB: vec3<f32>,
worldMatrix: mat4x4<f32>,
viewMatrix: mat4x4<f32>,
projectionMatrix: mat4x4<f32>,
focal: vec2f,
invViewport: vec2f,
kernelSize: f32
)->vec4f {let modelView=viewMatrix*worldMatrix;let camspace=viewMatrix*vec4f(worldPos,1.0);let pos2d=projectionMatrix*camspace;let bounds=1.2*pos2d.w;if (pos2d.z<0. || pos2d.x<-bounds || pos2d.x>bounds || pos2d.y<-bounds || pos2d.y>bounds) {return vec4f(0.0,0.0,2.0,1.0);}
let Vrk=mat3x3<f32>(
covA.x,covA.y,covA.z,
covA.y,covB.x,covB.y,
covA.z,covB.y,covB.z
);let isOrtho=abs(projectionMatrix[3][3]-1.0)<0.001;var J: mat3x3<f32>;if (isOrtho) {J=mat3x3<f32>(
focal.x,0.0,0.0,
0.0,focal.y,0.0,
0.0,0.0,0.0
);} else {J=mat3x3<f32>(
focal.x/camspace.z,0.0,-(focal.x*camspace.x)/(camspace.z*camspace.z),
0.0,focal.y/camspace.z,-(focal.y*camspace.y)/(camspace.z*camspace.z),
0.0,0.0,0.0
);}
let T=transpose(mat3x3<f32>(
modelView[0].xyz,
modelView[1].xyz,
modelView[2].xyz))*J;var cov2d=transpose(T)*Vrk*T;
#if COMPENSATION
let c00: f32=cov2d[0][0];let c11: f32=cov2d[1][1];let c01: f32=cov2d[0][1];let detOrig: f32=c00*c11-c01*c01;
#endif
cov2d[0][0]+=kernelSize;cov2d[1][1]+=kernelSize;
#if COMPENSATION
let c2d: vec3f=vec3f(cov2d[0][0],c01,cov2d[1][1]);let detBlur: f32=c2d.x*c2d.z-c2d.y*c2d.y;let compensation: f32=sqrt(max(0.,detOrig/detBlur));vertexOutputs.vColor.w*=compensation;
#endif
let mid=(cov2d[0][0]+cov2d[1][1])/2.0;let radius=length(vec2<f32>((cov2d[0][0]-cov2d[1][1])/2.0,cov2d[0][1]));let lambda1=mid+radius;let lambda2=mid-radius;if (lambda2<0.0) {return vec4f(0.0,0.0,2.0,1.0);}
let diagonalVector=normalize(vec2<f32>(cov2d[0][1],lambda1-cov2d[0][0]));let majorAxis=min(sqrt(2.0*lambda1),1024.0)*diagonalVector;let minorAxis=min(sqrt(2.0*lambda2),1024.0)*vec2<f32>(diagonalVector.y,-diagonalVector.x);let vCenter=vec2<f32>(pos2d.x,pos2d.y);let scaleFactor=select(pos2d.w,1.0,isOrtho);return vec4f(
vCenter+((meshPos.x*majorAxis+meshPos.y*minorAxis)*invViewport*scaleFactor)*scale,
pos2d.z,
pos2d.w
);}
#if IS_COMPOUND
fn getPartWorld(partIndex: u32)->mat4x4<f32> {return uniforms.partWorld[partIndex];}
#endif
`;N.IncludesShadersStoreWGSL[Tt]||(N.IncludesShadersStoreWGSL[Tt]=As);const Ve="gaussianSplattingVertexShader",Vt=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
#include<helperFunctions>
#include<clipPlaneVertexDeclaration>
#include<fogVertexDeclaration>
#include<logDepthDeclaration>
attribute splatIndex0: vec4f;attribute splatIndex1: vec4f;attribute splatIndex2: vec4f;attribute splatIndex3: vec4f;attribute position: vec3f;uniform invViewport: vec2f;uniform dataTextureSize: vec2f;uniform focal: vec2f;uniform kernelSize: f32;uniform eyePosition: vec3f;uniform alpha: f32;
#if IS_COMPOUND
uniform partWorld: array<mat4x4<f32>,MAX_PART_COUNT>;uniform partVisibility: array<f32,MAX_PART_COUNT>;
#endif
var covariancesATexture: texture_2d<f32>;var covariancesBTexture: texture_2d<f32>;var centersTexture: texture_2d<f32>;var colorsTexture: texture_2d<f32>;
#if SH_DEGREE>0
var shTexture0: texture_2d<u32>;
#endif
#if SH_DEGREE>1
var shTexture1: texture_2d<u32>;
#endif
#if SH_DEGREE>2
var shTexture2: texture_2d<u32>;
#endif
#if IS_COMPOUND
var partIndicesTexture: texture_2d<f32>;
#endif
varying vColor: vec4f;varying vPosition: vec2f;
#define CUSTOM_VERTEX_DEFINITIONS
#include<gaussianSplatting>
@vertex
fn main(input : VertexInputs)->FragmentInputs {
#define CUSTOM_VERTEX_MAIN_BEGIN
let splatIndex: f32=getSplatIndex(i32(vertexInputs.position.z+0.5),vertexInputs.splatIndex0,vertexInputs.splatIndex1,vertexInputs.splatIndex2,vertexInputs.splatIndex3);var splat: Splat=readSplat(splatIndex,uniforms.dataTextureSize);var covA: vec3f=splat.covA.xyz;var covB: vec3f=vec3f(splat.covA.w,splat.covB.xy);
#if IS_COMPOUND
let splatWorld: mat4x4f=getPartWorld(splat.partIndex);
#else
let splatWorld: mat4x4f=mesh.world;
#endif
let worldPos: vec4f=splatWorld*vec4f(splat.center.xyz,1.0);vertexOutputs.vPosition=vertexInputs.position.xy;
#if SH_DEGREE>0
let worldRot: mat3x3f= mat3x3f(splatWorld[0].xyz,splatWorld[1].xyz,splatWorld[2].xyz);let normWorldRot: mat3x3f=inverseMat3(worldRot);var eyeToSplatLocalSpace: vec3f=normalize(normWorldRot*(worldPos.xyz-uniforms.eyePosition.xyz));vertexOutputs.vColor=vec4f(splat.color.xyz+computeSH(splat,eyeToSplatLocalSpace),splat.color.w*uniforms.alpha);
#else
vertexOutputs.vColor=vec4f(splat.color.xyz,splat.color.w*uniforms.alpha);
#endif
#if IS_COMPOUND
vertexOutputs.vColor.w*=uniforms.partVisibility[splat.partIndex];
#endif
let scale: vec2f=vec2f(1.,1.);
#define CUSTOM_VERTEX_UPDATE
vertexOutputs.position=gaussianSplatting(vertexInputs.position.xy,worldPos.xyz,scale,covA,covB,splatWorld,scene.view,scene.projection,uniforms.focal,uniforms.invViewport,uniforms.kernelSize);
#include<clipPlaneVertex>
#include<fogVertex>
#include<logDepthVertex>
#define CUSTOM_VERTEX_MAIN_END
}
`;N.ShadersStoreWGSL[Ve]||(N.ShadersStoreWGSL[Ve]=Vt);const zs={name:Ve,shader:Vt},Os=Object.freeze(Object.defineProperty({__proto__:null,gaussianSplattingVertexShaderWGSL:zs},Symbol.toStringTag,{value:"Module"})),Mt="gaussianSplattingDepthPixelShader",Ps=`precision highp float;varying vec2 vPosition;varying vec4 vColor;
#ifdef DEPTH_RENDER
varying float vDepthMetric;
#endif
void main(void) {float A=-dot(vPosition,vPosition);
#if (defined(SM_SOFTTRANSPARENTSHADOW) && SM_SOFTTRANSPARENTSHADOW==1) || (defined(DEPTH_RENDER) && defined(ALPHA_BLENDED_DEPTH))
float alpha=exp(A)*vColor.a;if (A<-4.)
discard;
#else
if (A<-vColor.a)
discard;
#endif
#ifdef DEPTH_RENDER
float opacity=1.0;
#ifdef ALPHA_BLENDED_DEPTH
opacity=alpha;
#endif
gl_FragColor=vec4(vDepthMetric,0.0,0.0,opacity);
#endif
}`;N.ShadersStore[Mt]||(N.ShadersStore[Mt]=Ps);const Et="gaussianSplattingDepthVertexShader",Rs=`#include<__decl__gaussianSplattingVertex>
uniform vec2 invViewport;uniform vec2 dataTextureSize;uniform vec2 focal;uniform float kernelSize;uniform float alpha;uniform sampler2D covariancesATexture;uniform sampler2D covariancesBTexture;uniform sampler2D centersTexture;uniform sampler2D colorsTexture;
#if IS_COMPOUND
uniform mat4 partWorld[MAX_PART_COUNT];uniform float partVisibility[MAX_PART_COUNT];uniform sampler2D partIndicesTexture;
#endif
varying vec2 vPosition;varying vec4 vColor;
#include<gaussianSplatting>
#ifdef DEPTH_RENDER
uniform vec2 depthValues;varying float vDepthMetric;
#endif
void main(void) {float splatIndex=getSplatIndex(int(position.z+0.5));Splat splat=readSplat(splatIndex);vec3 covA=splat.covA.xyz;vec3 covB=vec3(splat.covA.w,splat.covB.xy);
#if IS_COMPOUND
mat4 splatWorld=getPartWorld(splat.partIndex);
#else
mat4 splatWorld=world;
#endif
vec4 worldPosGS=splatWorld*vec4(splat.center.xyz,1.0);vPosition=position.xy;vColor=splat.color;vColor.w*=alpha;
#if IS_COMPOUND
vColor.w*=partVisibility[splat.partIndex];
#endif
gl_Position=gaussianSplatting(position.xy,worldPosGS.xyz,vec2(1.,1.),covA,covB,splatWorld,view,projection);
#ifdef DEPTH_RENDER
#ifdef USE_REVERSE_DEPTHBUFFER
vDepthMetric=((-gl_Position.z+depthValues.x)/(depthValues.y));
#else
vDepthMetric=((gl_Position.z+depthValues.x)/(depthValues.y));
#endif
#endif
}`;N.ShadersStore[Et]||(N.ShadersStore[Et]=Rs);const Dt="gaussianSplattingDepthPixelShader",ks=`#include<gaussianSplattingFragmentDeclaration>
varying vPosition: vec2f;varying vColor: vec4f;
#ifdef DEPTH_RENDER
varying vDepthMetric: f32;
#endif
fn checkDiscard(inPosition: vec2f,inColor: vec4f)->vec4f {var A : f32=-dot(inPosition,inPosition);var alpha : f32=exp(A)*inColor.a;
#if (defined(SM_SOFTTRANSPARENTSHADOW) && SM_SOFTTRANSPARENTSHADOW==1) || (defined(DEPTH_RENDER) && defined(ALPHA_BLENDED_DEPTH))
if (A<-4.) {discard;}
#else
if (A<-inColor.a) {discard;}
#endif
#ifdef DEPTH_RENDER
var opacity : f32=1.0;
#ifdef ALPHA_BLENDED_DEPTH
opacity=alpha;
#endif
return vec4f(fragmentInputs.vDepthMetric,0.0,0.0,opacity);
#else
return vec4f(inColor.rgb,alpha);
#endif
}
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=checkDiscard(fragmentInputs.vPosition,fragmentInputs.vColor);
#if (defined(SM_SOFTTRANSPARENTSHADOW) && SM_SOFTTRANSPARENTSHADOW==1) || (defined(DEPTH_RENDER) && defined(ALPHA_BLENDED_DEPTH))
var alpha : f32=fragmentOutputs.color.a;
#endif
}
`;N.ShadersStoreWGSL[Dt]||(N.ShadersStoreWGSL[Dt]=ks);const At="gaussianSplattingDepthVertexShader",Hs=`#include<sceneUboDeclaration>
#include<meshUboDeclaration>
attribute splatIndex0: vec4f;attribute splatIndex1: vec4f;attribute splatIndex2: vec4f;attribute splatIndex3: vec4f;attribute position: vec3f;uniform invViewport: vec2f;uniform dataTextureSize: vec2f;uniform focal: vec2f;uniform kernelSize: f32;uniform alpha: f32;var covariancesATexture: texture_2d<f32>;var covariancesBTexture: texture_2d<f32>;var centersTexture: texture_2d<f32>;var colorsTexture: texture_2d<f32>;
#if IS_COMPOUND
uniform partWorld: array<mat4x4<f32>,MAX_PART_COUNT>;uniform partVisibility: array<f32,MAX_PART_COUNT>;var partIndicesTexture: texture_2d<f32>;
#endif
varying vPosition: vec2f;varying vColor: vec4f;
#ifdef DEPTH_RENDER
uniform depthValues: vec2f;varying vDepthMetric: f32;
#endif
#include<gaussianSplatting>
@vertex
fn main(input : VertexInputs)->FragmentInputs {let splatIndex: f32=getSplatIndex(i32(vertexInputs.position.z+0.5),vertexInputs.splatIndex0,vertexInputs.splatIndex1,vertexInputs.splatIndex2,vertexInputs.splatIndex3);var splat: Splat=readSplat(splatIndex,uniforms.dataTextureSize);var covA: vec3f=splat.covA.xyz;var covB: vec3f=vec3f(splat.covA.w,splat.covB.xy);
#if IS_COMPOUND
let splatWorld: mat4x4f=getPartWorld(splat.partIndex);
#else
let splatWorld: mat4x4f=mesh.world;
#endif
let worldPos: vec4f=splatWorld*vec4f(splat.center.xyz,1.0);vertexOutputs.vPosition=vertexInputs.position.xy;vertexOutputs.vColor=splat.color;vertexOutputs.vColor.w*=uniforms.alpha;
#if IS_COMPOUND
vertexOutputs.vColor.w*=uniforms.partVisibility[splat.partIndex];
#endif
vertexOutputs.position=gaussianSplatting(vertexInputs.position.xy,worldPos.xyz,vec2f(1.0,1.0),covA,covB,splatWorld,scene.view,scene.projection,uniforms.focal,uniforms.invViewport,uniforms.kernelSize);
#ifdef DEPTH_RENDER
#ifdef USE_REVERSE_DEPTHBUFFER
vertexOutputs.vDepthMetric=((-vertexOutputs.position.z+uniforms.depthValues.x)/(uniforms.depthValues.y));
#else
vertexOutputs.vDepthMetric=((vertexOutputs.position.z+uniforms.depthValues.x)/(uniforms.depthValues.y));
#endif
#endif
}`;N.ShadersStoreWGSL[At]||(N.ShadersStoreWGSL[At]=Hs);const Me=128;class Us extends ss{constructor(e){super(e),this.FOG=!1,this.THIN_INSTANCES=!0,this.LOGARITHMICDEPTH=!1,this.CLIPPLANE=!1,this.CLIPPLANE2=!1,this.CLIPPLANE3=!1,this.CLIPPLANE4=!1,this.CLIPPLANE5=!1,this.CLIPPLANE6=!1,this.SH_DEGREE=0,this.COMPENSATION=!1,this.IS_COMPOUND=!1,this.MAX_PART_COUNT=Me,this.rebuild()}}class O extends Xt{constructor(e,t){super(e,t),this.kernelSize=O.KernelSize,this._compensation=O.Compensation,this._isDirty=!1,this._sourceMesh=null,this.backFaceCulling=!1,this.shadowDepthWrapper=O._MakeGaussianSplattingShadowDepthWrapper(t,this.shaderLanguage)}set compensation(e){this._isDirty=this._isDirty!=e,this._compensation=e}get compensation(){return this._compensation}get hasRenderTargetTextures(){return!1}needAlphaTesting(){return!1}needAlphaBlending(){return!0}isReadyForSubMesh(e,t){const a=t._drawWrapper;let r=t.materialDefines;if(r&&this._isDirty&&r.markAsUnprocessed(),a.effect&&this.isFrozen&&a._wasPreviouslyReady&&a._wasPreviouslyUsingInstances===!0)return!0;t.materialDefines||(this._callbackPluginEventGeneric(4,this._eventInfo),r=t.materialDefines=new Us(this._eventInfo.defineNames));const i=this.getScene();if(this._isReadyForSubMesh(t))return!0;if(this._eventInfo.isReadyForSubMesh=!0,this._eventInfo.defines=r,this._eventInfo.subMesh=t,this._callbackPluginEventIsReadyForSubMesh(this._eventInfo),!this._eventInfo.isReadyForSubMesh||!this._sourceMesh)return!1;const u=i.getEngine(),c=this._sourceMesh;Zt(e,i,this._useLogarithmicDepth,this.pointsCloud,this.fogEnabled,!1,r,void 0,void 0,void 0,this._isVertexOutputInvariant),$t(i,u,this,r,!0,null,!0),qt(e,r,!1,!1),(u.version>1||u.isWebGPU)&&(r.SH_DEGREE=c.shDegree),r.IS_COMPOUND=c.isCompound;const o=c.material;if(r.COMPENSATION=o&&o.compensation?o.compensation:O.Compensation,r.isDirty){r.markAsProcessed(),i.resetCachedMaterial(),Lt(O._Attribs,r);const x=O._Attribs.slice(),p=O._Uniforms.slice(),h=O._Samplers.slice(),d=O._UniformBuffers.slice();Kt({uniformsNames:p,uniformBuffersNames:d,samplers:h,defines:r}),Qt(p),this._uniformBufferLayoutBuilt||this.buildUniformLayout(),this._eventInfo.fallbackRank=0,this._eventInfo.defines=r,this._eventInfo.attributes=x,this._eventInfo.uniforms=p,this._eventInfo.samplers=h,this._eventInfo.uniformBuffersNames=d,this._eventInfo.customCode=void 0,this._eventInfo.mesh=e,this._callbackPluginEventGeneric(128,this._eventInfo);const l=r.toString(),_=i.getEngine().createEffect("gaussianSplatting",{attributes:x,uniformsNames:p,uniformBuffersNames:d,samplers:h,defines:l,onCompiled:this.onCompiled,onError:this.onError,indexParameters:{},processCodeAfterIncludes:this._eventInfo.customCode,shaderLanguage:this._shaderLanguage,extraInitializationsAsync:async()=>{this._shaderLanguage===1?await Promise.all([Ie(()=>Promise.resolve().then(()=>Ds),void 0),Ie(()=>Promise.resolve().then(()=>Os),void 0)]):await Promise.all([Ie(()=>Promise.resolve().then(()=>ys),void 0),Ie(()=>Promise.resolve().then(()=>Ts),void 0)])}},u);t.setEffect(_,r,this._materialContext)}return!t.effect||!t.effect.isReady()?!1:(r._renderId=i.getRenderId(),a._wasPreviouslyReady=!0,a._wasPreviouslyUsingInstances=!0,this._isDirty=!1,!0)}setSourceMesh(e){this._sourceMesh=e}static BindEffect(e,t,s){const a=s.getEngine(),r=s.activeCamera,i=a.getRenderWidth()*r.viewport.width,u=a.getRenderHeight()*r.viewport.height,c=e.material;if(!c._sourceMesh)return;const o=c._sourceMesh,x=r?.rigParent?.rigCameras.length||1;t.setFloat2("invViewport",1/(i/x),1/u);let p=1e3;if(r){const h=r.getProjectionMatrix().m[5];r.fovMode==be.FOVMODE_VERTICAL_FIXED?p=u*h/2:p=i*h/2}if(t.setFloat2("focal",p,p),t.setFloat("kernelSize",c&&c.kernelSize?c.kernelSize:O.KernelSize),t.setFloat("alpha",c.alpha),s.bindEyePosition(t,"eyePosition",!0),o.covariancesATexture){const h=o.covariancesATexture.getSize();if(t.setFloat2("dataTextureSize",h.width,h.height),t.setTexture("covariancesATexture",o.covariancesATexture),t.setTexture("covariancesBTexture",o.covariancesBTexture),t.setTexture("centersTexture",o.centersTexture),t.setTexture("colorsTexture",o.colorsTexture),o.shTextures)for(let d=0;d<o.shTextures?.length;d++)t.setTexture(`shTexture${d}`,o.shTextures[d]);if(o.partIndicesTexture){t.setTexture("partIndicesTexture",o.partIndicesTexture);const d=new Float32Array(o.partCount*16);for(let _=0;_<o.partCount;_++)o.getWorldMatrixForPart(_).toArray(d,_*16);t.setMatrices("partWorld",d);const l=[];for(let _=0;_<o.partCount;_++)l.push(o.partVisibility[_]??1);t.setArray("partVisibility",l)}}}bindForSubMesh(e,t,s){const a=this.getScene(),r=s.materialDefines;if(!r)return;const i=s.effect;if(!i)return;this._activeEffect=i,t.getMeshUniformBuffer().bindToEffect(i,"Mesh"),t.transferToEffect(e),this._mustRebind(a,i,s,t.visibility)?(this.bindView(i),this.bindViewProjection(i),O.BindEffect(t,this._activeEffect,a),Jt(i,this,a)):a.getEngine()._features.needToAlwaysBindUniformBuffers&&(this._needToBindSceneUbo=!0),Yt(a,t,i),this.useLogarithmicDepth&&es(r,i,a),this._eventInfo.subMesh=s,this._callbackPluginEventBindForSubMesh(this._eventInfo),this._afterBind(t,this._activeEffect,s)}static _BindEffectUniforms(e,t,s,a){const r=a.getEngine(),i=s.getEffect(),u=a.activeCamera;if(!u)return;e.getMeshUniformBuffer().bindToEffect(i,"Mesh"),s.bindView(i),s.bindViewProjection(i);const c=r.getRenderWidth()*u.viewport.width,o=r.getRenderHeight()*u.viewport.height;i.setFloat2("invViewport",1/c,1/o);let x=1e3;if(u){const l=u.getProjectionMatrix().m[5];u.fovMode==be.FOVMODE_VERTICAL_FIXED?x=o*l/2:x=c*l/2}i.setFloat2("focal",x,x),i.setFloat("kernelSize",t&&t.kernelSize?t.kernelSize:O.KernelSize),i.setFloat("alpha",t.alpha);let p,h;if(u.mode===be.ORTHOGRAPHIC_CAMERA?(p=!r.useReverseDepthBuffer&&r.isNDCHalfZRange?0:1,h=r.useReverseDepthBuffer&&r.isNDCHalfZRange?0:1):(p=r.useReverseDepthBuffer&&r.isNDCHalfZRange?u.minZ:r.isNDCHalfZRange?0:u.minZ,h=r.useReverseDepthBuffer&&r.isNDCHalfZRange?0:u.maxZ),i.setFloat2("depthValues",p,p+h),e.covariancesATexture){const l=e.covariancesATexture.getSize();if(i.setFloat2("dataTextureSize",l.width,l.height),i.setTexture("covariancesATexture",e.covariancesATexture),i.setTexture("covariancesBTexture",e.covariancesBTexture),i.setTexture("centersTexture",e.centersTexture),i.setTexture("colorsTexture",e.colorsTexture),e.partIndicesTexture){i.setTexture("partIndicesTexture",e.partIndicesTexture);const _=new Float32Array(e.partCount*16);for(let f=0;f<e.partCount;f++)e.getWorldMatrixForPart(f).toArray(_,f*16);i.setMatrices("partWorld",_);const C=[];for(let f=0;f<e.partCount;f++)C.push(e.partVisibility[f]??1);i.setArray("partVisibility",C)}}}makeDepthRenderingMaterial(e,t,s=!1,a=!1){const r=["#define DEPTH_RENDER"];s&&r.push("#define ALPHA_BLENDED_DEPTH"),a&&(r.push("#define IS_COMPOUND"),r.push(`#define MAX_PART_COUNT ${Me}`));const i=new St("gaussianSplattingDepthRender",e,{vertex:"gaussianSplattingDepth",fragment:"gaussianSplattingDepth"},{attributes:O._Attribs,uniforms:O._Uniforms,samplers:O._Samplers,uniformBuffers:O._UniformBuffers,shaderLanguage:t,defines:r,needAlphaBlending:s});return i.onBindObservable.add(u=>{const c=u.material,o=u;O._BindEffectUniforms(o,c,i,e)}),i}static _MakeGaussianSplattingShadowDepthWrapper(e,t){const s=new St("gaussianSplattingDepth",e,{vertex:"gaussianSplattingDepth",fragment:"gaussianSplattingDepth"},{attributes:O._Attribs,uniforms:O._Uniforms,samplers:O._Samplers,uniformBuffers:O._UniformBuffers,shaderLanguage:t}),a=new vs(s,e,{standalone:!0});return s.onBindObservable.add(r=>{const i=r.material,u=r;O._BindEffectUniforms(u,i,s,e)}),a}clone(e){const t=gt.Clone(()=>new O(e,this.getScene()),this);return t.id=e,t.name=e,this._clonePlugins(t,""),t}serialize(){const e=super.serialize();return e.customType="BABYLON.GaussianSplattingMaterial",e}getClassName(){return"GaussianSplattingMaterial"}static Parse(e,t,s){const a=gt.Parse(()=>new O(e.name,t),e,t,s);return ts._ParsePlugins(e,a,t,s),a}}O.KernelSize=.3;O.Compensation=!1;O._Attribs=[L.PositionKind,"splatIndex0","splatIndex1","splatIndex2","splatIndex3"];O._Samplers=["covariancesATexture","covariancesBTexture","centersTexture","colorsTexture","shTexture0","shTexture1","shTexture2","partIndicesTexture"];O._UniformBuffers=["Scene","Mesh"];O._Uniforms=["world","view","projection","vFogInfos","vFogColor","logarithmicDepthConstant","invViewport","dataTextureSize","focal","eyePosition","kernelSize","alpha","depthValues","partWorld","partVisibility"];rs("BABYLON.GaussianSplattingMaterial",O);const Fs=is,Z={...ns,TwoPi:Math.PI*2,Sign:Math.sign,Log2:Math.log2,HCF:Fs};class Bs extends _e{get partIndex(){return this._partIndex}constructor(e,t,s,a,r){super(e,t),this.proxiedMesh=a,this._partIndex=r,this.compoundSplatMesh=s,this.updateBoundingInfoFromProxiedMesh(),this.compoundSplatMesh.setWorldMatrixForPart(this.partIndex,this.getWorldMatrix()),this.onAfterWorldMatrixUpdateObservable.add(()=>{this.compoundSplatMesh.setWorldMatrixForPart(this.partIndex,this.getWorldMatrix()),this.updateBoundingInfoFromProxiedMesh()})}updateBoundingInfoFromProxiedMesh(){const e=this.proxiedMesh.getBoundingInfo();this.setBoundingInfo(new as(e.minimum.clone(),e.maximum.clone()))}getClassName(){return"GaussianSplattingPartProxyMesh"}updatePartIndex(e){this._partIndex=e}get isVisible(){return this.compoundSplatMesh.getPartVisibility(this.partIndex)>0}set isVisible(e){this.compoundSplatMesh.setPartVisibility(this.partIndex,e?1:0)}get visibility(){return this.compoundSplatMesh.getPartVisibility(this.partIndex)}set visibility(e){this.compoundSplatMesh.setPartVisibility(this.partIndex,e)}intersects(e){const t=new os,s=this.getBoundingInfo();return!s||!e.intersectsSphere(s.boundingSphere)||!e.intersectsBox(s.boundingBox)||(t.hit=!0,t.pickedMesh=this,t.distance=E.Distance(e.origin,s.boundingSphere.center),t.subMeshId=0),t}}const je=typeof _native<"u",Ue=je?_native:null,Q=(n,e)=>{const t=(1<<e)-1;return(n&t)/t},zt=(n,e)=>{e.x=Q(n>>>21,11),e.y=Q(n>>>11,10),e.z=Q(n,11)},Ns=(n,e)=>{e[0]=Q(n>>>24,8)*255,e[1]=Q(n>>>16,8)*255,e[2]=Q(n>>>8,8)*255,e[3]=Q(n,8)*255},Ws=(n,e)=>{const t=1/(Math.sqrt(2)*.5),s=(Q(n>>>20,10)-.5)*t,a=(Q(n>>>10,10)-.5)*t,r=(Q(n,10)-.5)*t,i=Math.sqrt(1-(s*s+a*a+r*r));switch(n>>>30){case 0:e.set(i,s,a,r);break;case 1:e.set(s,i,a,r);break;case 2:e.set(s,a,i,r);break;case 3:e.set(s,a,r,i);break}};var Ot;(function(n){n[n.FLOAT=0]="FLOAT",n[n.INT=1]="INT",n[n.UINT=2]="UINT",n[n.DOUBLE=3]="DOUBLE",n[n.UCHAR=4]="UCHAR",n[n.UNDEFINED=5]="UNDEFINED"})(Ot||(Ot={}));var Pt;(function(n){n[n.MIN_X=0]="MIN_X",n[n.MIN_Y=1]="MIN_Y",n[n.MIN_Z=2]="MIN_Z",n[n.MAX_X=3]="MAX_X",n[n.MAX_Y=4]="MAX_Y",n[n.MAX_Z=5]="MAX_Z",n[n.MIN_SCALE_X=6]="MIN_SCALE_X",n[n.MIN_SCALE_Y=7]="MIN_SCALE_Y",n[n.MIN_SCALE_Z=8]="MIN_SCALE_Z",n[n.MAX_SCALE_X=9]="MAX_SCALE_X",n[n.MAX_SCALE_Y=10]="MAX_SCALE_Y",n[n.MAX_SCALE_Z=11]="MAX_SCALE_Z",n[n.PACKED_POSITION=12]="PACKED_POSITION",n[n.PACKED_ROTATION=13]="PACKED_ROTATION",n[n.PACKED_SCALE=14]="PACKED_SCALE",n[n.PACKED_COLOR=15]="PACKED_COLOR",n[n.X=16]="X",n[n.Y=17]="Y",n[n.Z=18]="Z",n[n.SCALE_0=19]="SCALE_0",n[n.SCALE_1=20]="SCALE_1",n[n.SCALE_2=21]="SCALE_2",n[n.DIFFUSE_RED=22]="DIFFUSE_RED",n[n.DIFFUSE_GREEN=23]="DIFFUSE_GREEN",n[n.DIFFUSE_BLUE=24]="DIFFUSE_BLUE",n[n.OPACITY=25]="OPACITY",n[n.F_DC_0=26]="F_DC_0",n[n.F_DC_1=27]="F_DC_1",n[n.F_DC_2=28]="F_DC_2",n[n.F_DC_3=29]="F_DC_3",n[n.ROT_0=30]="ROT_0",n[n.ROT_1=31]="ROT_1",n[n.ROT_2=32]="ROT_2",n[n.ROT_3=33]="ROT_3",n[n.MIN_COLOR_R=34]="MIN_COLOR_R",n[n.MIN_COLOR_G=35]="MIN_COLOR_G",n[n.MIN_COLOR_B=36]="MIN_COLOR_B",n[n.MAX_COLOR_R=37]="MAX_COLOR_R",n[n.MAX_COLOR_G=38]="MAX_COLOR_G",n[n.MAX_COLOR_B=39]="MAX_COLOR_B",n[n.SH_0=40]="SH_0",n[n.SH_1=41]="SH_1",n[n.SH_2=42]="SH_2",n[n.SH_3=43]="SH_3",n[n.SH_4=44]="SH_4",n[n.SH_5=45]="SH_5",n[n.SH_6=46]="SH_6",n[n.SH_7=47]="SH_7",n[n.SH_8=48]="SH_8",n[n.SH_9=49]="SH_9",n[n.SH_10=50]="SH_10",n[n.SH_11=51]="SH_11",n[n.SH_12=52]="SH_12",n[n.SH_13=53]="SH_13",n[n.SH_14=54]="SH_14",n[n.SH_15=55]="SH_15",n[n.SH_16=56]="SH_16",n[n.SH_17=57]="SH_17",n[n.SH_18=58]="SH_18",n[n.SH_19=59]="SH_19",n[n.SH_20=60]="SH_20",n[n.SH_21=61]="SH_21",n[n.SH_22=62]="SH_22",n[n.SH_23=63]="SH_23",n[n.SH_24=64]="SH_24",n[n.SH_25=65]="SH_25",n[n.SH_26=66]="SH_26",n[n.SH_27=67]="SH_27",n[n.SH_28=68]="SH_28",n[n.SH_29=69]="SH_29",n[n.SH_30=70]="SH_30",n[n.SH_31=71]="SH_31",n[n.SH_32=72]="SH_32",n[n.SH_33=73]="SH_33",n[n.SH_34=74]="SH_34",n[n.SH_35=75]="SH_35",n[n.SH_36=76]="SH_36",n[n.SH_37=77]="SH_37",n[n.SH_38=78]="SH_38",n[n.SH_39=79]="SH_39",n[n.SH_40=80]="SH_40",n[n.SH_41=81]="SH_41",n[n.SH_42=82]="SH_42",n[n.SH_43=83]="SH_43",n[n.SH_44=84]="SH_44",n[n.UNDEFINED=85]="UNDEFINED"})(Pt||(Pt={}));class D extends _e{get disableDepthSort(){return this._disableDepthSort}set disableDepthSort(e){!this._disableDepthSort&&e?(this._worker?.terminate(),this._worker=null,this._disableDepthSort=!0):this._disableDepthSort&&!e&&(this._disableDepthSort=!1,this._sortIsDirty=!0,this._instanciateWorker())}get viewDirectionFactor(){return E.OneReadOnly}get shDegree(){return this._shDegree}get splatCount(){return this._splatIndex?.length}get splatsData(){return this._splatsData}get shData(){return this._shData}get isCompound(){return this._partMatrices.length>0}get partIndices(){return this._partIndices}get partIndicesTexture(){return this._partIndicesTexture}get partVisibility(){return this._partVisibility}get covariancesATexture(){return this._covariancesATexture}get covariancesBTexture(){return this._covariancesBTexture}get centersTexture(){return this._centersTexture}get colorsTexture(){return this._colorsTexture}get shTextures(){return this._shTextures}get kernelSize(){return this._material instanceof O?this._material.kernelSize:0}get compensation(){return this._material instanceof O?this._material.compensation:!1}set material(e){this._material=e,this._material.backFaceCulling=!1,this._material.cullBackFaces=!1,e.resetDrawCache()}get material(){return this._material}static _MakeSplatGeometryForMesh(e){const t=new Ge,s=[-2,-2,0,2,-2,0,2,2,0,-2,2,0],a=[0,1,2,0,2,3],r=[],i=[];for(let u=0;u<D._BatchSize;u++){for(let c=0;c<12;c++)c==2||c==5||c==8||c==11?r.push(u):r.push(s[c]);i.push(a.map(c=>c+u*4))}t.positions=r,t.indices=i.flat(),t.applyToMesh(e)}constructor(e,t=null,s=null,a=!1){super(e,s),this._vertexCount=0,this._worker=null,this._modelViewProjectionMatrix=ue.Identity(),this._viewProjectionMatrix=ue.Identity(),this._canPostToWorker=!0,this._readyToDisplay=!1,this._covariancesATexture=null,this._covariancesBTexture=null,this._centersTexture=null,this._colorsTexture=null,this._splatPositions=null,this._splatIndex=null,this._shTextures=null,this._splatsData=null,this._shData=null,this._partIndicesTexture=null,this._partIndices=null,this._partMatrices=[],this._partVisibility=[],this._partProxies=new Map,this._textureSize=new ee(0,0),this._keepInRam=!1,this._delayedTextureUpdate=null,this._useRGBACovariants=!1,this._material=null,this._tmpCovariances=[0,0,0,0,0,0],this._sortIsDirty=!1,this._shDegree=0,this._cameraViewInfos=new Map,this.viewUpdateThreshold=D._DefaultViewUpdateThreshold,this._disableDepthSort=!1,this._loadingPromise=null,this.subMeshes=[],new cs(0,0,4*D._BatchSize,0,6*D._BatchSize,this),this.setEnabled(!1),this._useRGBACovariants=!this.getEngine().isWebGPU&&this.getEngine().version===1,this._keepInRam=a,t&&(this._loadingPromise=this.loadFileAsync(t));const r=new O(this.name+"_material",this._scene);r.setSourceMesh(this),this._material=r,this._scene.onCameraRemovedObservable.add(i=>{const u=i.uniqueId;this._cameraViewInfos.has(u)&&(this._cameraViewInfos.get(u)?.mesh.dispose(),this._cameraViewInfos.delete(u))})}getLoadingPromise(){return this._loadingPromise}getClassName(){return"GaussianSplattingMesh"}getTotalVertices(){return this._vertexCount}isReady(e=!1){return super.isReady(e,!0)?this._readyToDisplay?!0:(this._postToWorker(!0),!1):!1}_getCameraDirection(e){const t=e.getViewMatrix(),s=e.getProjectionMatrix(),a=X.Matrix[0];t.multiplyToRef(s,a),this._viewProjectionMatrix.copyFrom(a);const r=X.Matrix[1];this.getWorldMatrix().multiplyToRef(t,r),r.multiplyToRef(s,this._modelViewProjectionMatrix);const i=X.Vector3[1];return i.set(r.m[2],r.m[6],r.m[10]),i.normalize(),i}_postToWorker(e=!1){const s=this._scene.getFrameId();let a=!1;this._cameraViewInfos.forEach(c=>{c.frameIdLastUpdate!==s&&(a=!0)});const r=this._scene.activeCameras?.length?this._scene.activeCameras:[this._scene.activeCamera],i=[];r.forEach(c=>{if(!c)return;const o=c.uniqueId,x=this._cameraViewInfos.get(o);if(x)i.push(x);else{const p=new _e(this.name+"_cameraMesh_"+o,this._scene);p.reservedDataStore={hidden:!0},p.setEnabled(!1),p.material=this.material,D._MakeSplatGeometryForMesh(p);const h={camera:c,cameraDirection:new E(0,0,0),mesh:p,frameIdLastUpdate:s,splatIndexBufferSet:!1};i.push(h),this._cameraViewInfos.set(o,h)}}),i.sort((c,o)=>c.frameIdLastUpdate-o.frameIdLastUpdate);const u=this._worker||Ue?.sortSplats||this._disableDepthSort;(e||a)&&u&&(this._scene.activeCameras?.length||this._scene.activeCamera)&&this._canPostToWorker?i.forEach(c=>{const o=c.camera,x=this._getCameraDirection(o),p=c.cameraDirection,h=E.Dot(x,p);(e||Math.abs(h-1)>=this.viewUpdateThreshold)&&this._canPostToWorker&&(c.cameraDirection.copyFrom(x),c.frameIdLastUpdate=s,this._canPostToWorker=!1,this._worker?this._worker.postMessage({modelViewProjection:this._modelViewProjectionMatrix.m,viewProjection:this._viewProjectionMatrix.m,depthMix:this._depthMix,cameraId:o.uniqueId,depthScale:o.mode===be.ORTHOGRAPHIC_CAMERA?(o.maxZ-o.minZ)/2:1},[this._depthMix.buffer]):Ue?.sortSplats&&(Ue.sortSplats(this._modelViewProjectionMatrix,this._splatPositions,this._splatIndex,this._scene.useRightHandedSystem),c.splatIndexBufferSet?c.mesh.thinInstanceBufferUpdated("splatIndex"):(c.mesh.thinInstanceSetBuffer("splatIndex",this._splatIndex,16,!1),c.splatIndexBufferSet=!0),this._canPostToWorker=!0,this._readyToDisplay=!0))}):this._disableDepthSort&&(i.forEach(c=>{c.splatIndexBufferSet||(c.mesh.thinInstanceSetBuffer("splatIndex",this._splatIndex,16,!1),c.splatIndexBufferSet=!0)}),this._canPostToWorker=!0,this._readyToDisplay=!0)}render(e,t,s){this._postToWorker(),!this._geometry&&this._cameraViewInfos.size&&(this._geometry=this._cameraViewInfos.values().next().value.mesh.geometry);const a=this._scene.activeCamera.uniqueId,r=this._cameraViewInfos.get(a);if(!r||!r.splatIndexBufferSet)return this;this.onBeforeRenderObservable&&this.onBeforeRenderObservable.notifyObservers(this);const i=r.mesh;i.getWorldMatrix().copyFrom(this.getWorldMatrix());const c=this._scene.getEngine().currentRenderPassId,o=this.getMaterialForRenderPass(c);o&&i.setMaterialForRenderPass(c,o);const x=i.render(e,t,s);return o&&i.setMaterialForRenderPass(c,void 0),this.onAfterRenderObservable&&this.onAfterRenderObservable.notifyObservers(this),x}static _TypeNameToEnum(e){switch(e){case"float":return 0;case"int":return 1;case"uint":return 2;case"double":return 3;case"uchar":return 4}return 5}static _ValueNameToEnum(e){switch(e){case"min_x":return 0;case"min_y":return 1;case"min_z":return 2;case"max_x":return 3;case"max_y":return 4;case"max_z":return 5;case"min_scale_x":return 6;case"min_scale_y":return 7;case"min_scale_z":return 8;case"max_scale_x":return 9;case"max_scale_y":return 10;case"max_scale_z":return 11;case"packed_position":return 12;case"packed_rotation":return 13;case"packed_scale":return 14;case"packed_color":return 15;case"x":return 16;case"y":return 17;case"z":return 18;case"scale_0":return 19;case"scale_1":return 20;case"scale_2":return 21;case"diffuse_red":case"red":return 22;case"diffuse_green":case"green":return 23;case"diffuse_blue":case"blue":return 24;case"f_dc_0":return 26;case"f_dc_1":return 27;case"f_dc_2":return 28;case"f_dc_3":return 29;case"opacity":return 25;case"rot_0":return 30;case"rot_1":return 31;case"rot_2":return 32;case"rot_3":return 33;case"min_r":return 34;case"min_g":return 35;case"min_b":return 36;case"max_r":return 37;case"max_g":return 38;case"max_b":return 39;case"f_rest_0":return 40;case"f_rest_1":return 41;case"f_rest_2":return 42;case"f_rest_3":return 43;case"f_rest_4":return 44;case"f_rest_5":return 45;case"f_rest_6":return 46;case"f_rest_7":return 47;case"f_rest_8":return 48;case"f_rest_9":return 49;case"f_rest_10":return 50;case"f_rest_11":return 51;case"f_rest_12":return 52;case"f_rest_13":return 53;case"f_rest_14":return 54;case"f_rest_15":return 55;case"f_rest_16":return 56;case"f_rest_17":return 57;case"f_rest_18":return 58;case"f_rest_19":return 59;case"f_rest_20":return 60;case"f_rest_21":return 61;case"f_rest_22":return 62;case"f_rest_23":return 63;case"f_rest_24":return 64;case"f_rest_25":return 65;case"f_rest_26":return 66;case"f_rest_27":return 67;case"f_rest_28":return 68;case"f_rest_29":return 69;case"f_rest_30":return 70;case"f_rest_31":return 71;case"f_rest_32":return 72;case"f_rest_33":return 73;case"f_rest_34":return 74;case"f_rest_35":return 75;case"f_rest_36":return 76;case"f_rest_37":return 77;case"f_rest_38":return 78;case"f_rest_39":return 79;case"f_rest_40":return 80;case"f_rest_41":return 81;case"f_rest_42":return 82;case"f_rest_43":return 83;case"f_rest_44":return 84}return 85}static ParseHeader(e){const t=new Uint8Array(e),s=new TextDecoder().decode(t.slice(0,1024*10)),a=`end_header
`,r=s.indexOf(a);if(r<0||!s)return null;const i=parseInt(/element vertex (\d+)\n/.exec(s)[1]),u=/element chunk (\d+)\n/.exec(s);let c=0;u&&(c=parseInt(u[1]));let o=0,x=0;const p={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1,list:0};let h;(function(w){w[w.Vertex=0]="Vertex",w[w.Chunk=1]="Chunk",w[w.SH=2]="SH",w[w.Unused=3]="Unused"})(h||(h={}));let d=1;const l=[],_=[],C=s.slice(0,r).split(`
`);let f=0;for(const w of C)if(w.startsWith("property ")){const[,m,y]=w.split(" "),M=D._ValueNameToEnum(y);M!=85&&(M>=84?f=3:M>=64?f=Math.max(f,2):M>=48&&(f=Math.max(f,1)));const z=D._TypeNameToEnum(m);d==1?(_.push({value:M,type:z,offset:x}),x+=p[m]):d==0?(l.push({value:M,type:z,offset:o}),o+=p[m]):d==2&&l.push({value:M,type:z,offset:o}),p[m]||ie.Warn(`Unsupported property type: ${m}.`)}else if(w.startsWith("element ")){const[,m]=w.split(" ");m=="chunk"?d=1:m=="vertex"?d=0:m=="sh"?d=2:d=3}const g=new DataView(e,r+a.length),v=new ArrayBuffer(D._RowOutputLength*i);let I=null,S=0;return f&&(S=((f+1)*(f+1)-1)*3,I=new ArrayBuffer(S*i)),{vertexCount:i,chunkCount:c,rowVertexLength:o,rowChunkLength:x,vertexProperties:l,chunkProperties:_,dataView:g,buffer:v,shDegree:f,shCoefficientCount:S,shBuffer:I}}static _GetCompressedChunks(e,t){if(!e.chunkCount)return null;const s=e.dataView,a=new Array(e.chunkCount);for(let r=0;r<e.chunkCount;r++){const i={min:new E,max:new E,minScale:new E,maxScale:new E,minColor:new E(0,0,0),maxColor:new E(1,1,1)};a[r]=i;for(let u=0;u<e.chunkProperties.length;u++){const c=e.chunkProperties[u];let o;if(c.type===0)o=s.getFloat32(c.offset+t.value,!0);else continue;switch(c.value){case 0:i.min.x=o;break;case 1:i.min.y=o;break;case 2:i.min.z=o;break;case 3:i.max.x=o;break;case 4:i.max.y=o;break;case 5:i.max.z=o;break;case 6:i.minScale.x=o;break;case 7:i.minScale.y=o;break;case 8:i.minScale.z=o;break;case 9:i.maxScale.x=o;break;case 10:i.maxScale.y=o;break;case 11:i.maxScale.z=o;break;case 34:i.minColor.x=o;break;case 35:i.minColor.y=o;break;case 36:i.minColor.z=o;break;case 37:i.maxColor.x=o;break;case 38:i.maxColor.y=o;break;case 39:i.maxColor.z=o;break}}t.value+=e.rowChunkLength}return a}static _GetSplat(e,t,s,a){const r=X.Quaternion[0],i=X.Vector3[0],u=D._RowOutputLength,c=e.buffer,o=e.dataView,x=new Float32Array(c,t*u,3),p=new Float32Array(c,t*u+12,3),h=new Uint8ClampedArray(c,t*u+24,4),d=new Uint8ClampedArray(c,t*u+28,4);let l=null;e.shBuffer&&(l=new Uint8ClampedArray(e.shBuffer,t*e.shCoefficientCount,e.shCoefficientCount));const _=t>>8;let C=255,f=0,g=0,v=0;const I=[];for(let S=0;S<e.vertexProperties.length;S++){const w=e.vertexProperties[S];let m;switch(w.type){case 0:m=o.getFloat32(a.value+w.offset,!0);break;case 1:m=o.getInt32(a.value+w.offset,!0);break;case 2:m=o.getUint32(a.value+w.offset,!0);break;case 3:m=o.getFloat64(a.value+w.offset,!0);break;case 4:m=o.getUint8(a.value+w.offset);break;default:continue}switch(w.value){case 12:{const y=s[_];zt(m,i),x[0]=Z.Lerp(y.min.x,y.max.x,i.x),x[1]=Z.Lerp(y.min.y,y.max.y,i.y),x[2]=Z.Lerp(y.min.z,y.max.z,i.z)}break;case 13:Ws(m,r),C=r.x,f=r.y,g=r.z,v=r.w;break;case 14:{const y=s[_];zt(m,i),p[0]=Math.exp(Z.Lerp(y.minScale.x,y.maxScale.x,i.x)),p[1]=Math.exp(Z.Lerp(y.minScale.y,y.maxScale.y,i.y)),p[2]=Math.exp(Z.Lerp(y.minScale.z,y.maxScale.z,i.z))}break;case 15:{const y=s[_];Ns(m,h),h[0]=Z.Lerp(y.minColor.x,y.maxColor.x,h[0]/255)*255,h[1]=Z.Lerp(y.minColor.y,y.maxColor.y,h[1]/255)*255,h[2]=Z.Lerp(y.minColor.z,y.maxColor.z,h[2]/255)*255}break;case 16:x[0]=m;break;case 17:x[1]=m;break;case 18:x[2]=m;break;case 19:p[0]=Math.exp(m);break;case 20:p[1]=Math.exp(m);break;case 21:p[2]=Math.exp(m);break;case 22:h[0]=m;break;case 23:h[1]=m;break;case 24:h[2]=m;break;case 26:h[0]=(.5+D._SH_C0*m)*255;break;case 27:h[1]=(.5+D._SH_C0*m)*255;break;case 28:h[2]=(.5+D._SH_C0*m)*255;break;case 29:h[3]=(.5+D._SH_C0*m)*255;break;case 25:h[3]=1/(1+Math.exp(-m))*255;break;case 30:C=m;break;case 31:f=m;break;case 32:g=m;break;case 33:v=m;break}if(l&&w.value>=40&&w.value<=84){const y=w.value-40;if(w.type==4&&e.chunkCount){const M=o.getUint8(e.rowChunkLength*e.chunkCount+e.vertexCount*e.rowVertexLength+t*e.shCoefficientCount+y);I[y]=(M*(8/255)-4)*127.5+127.5}else{const M=Z.Clamp(m*127.5+127.5,0,255);I[y]=M}}}if(l){const S=e.shDegree==1?3:e.shDegree==2?8:15;for(let w=0;w<S;w++)l[w*3+0]=I[w],l[w*3+1]=I[w+S],l[w*3+2]=I[w+S*2]}r.set(f,g,v,C),r.normalize(),d[0]=r.w*127.5+127.5,d[1]=r.x*127.5+127.5,d[2]=r.y*127.5+127.5,d[3]=r.z*127.5+127.5,a.value+=e.rowVertexLength}static*ConvertPLYWithSHToSplat(e,t=!1){const s=D.ParseHeader(e);if(!s)return{buffer:e};const a={value:0},r=D._GetCompressedChunks(s,a);for(let u=0;u<s.vertexCount;u++)D._GetSplat(s,u,r,a),u%D._PlyConversionBatchSize===0&&t&&(yield);let i=null;if(s.shDegree&&s.shBuffer){const u=Math.ceil(s.shCoefficientCount/16);let c=0;const o=new Uint8Array(s.shBuffer);i=[];const x=s.vertexCount,p=Te.LastCreatedEngine;if(p){const h=p.getCaps().maxTextureSize,d=Math.ceil(x/h);for(let l=0;l<u;l++){const _=new Uint8Array(d*h*4*4);i.push(_)}for(let l=0;l<x;l++)for(let _=0;_<s.shCoefficientCount;_++){const C=o[c++],f=Math.floor(_/16),g=i[f],v=_%16,I=l*16;g[v+I]=C}}}return{buffer:s.buffer,sh:i}}static*ConvertPLYToSplat(e,t=!1){const s=D.ParseHeader(e);if(!s)return e;const a={value:0},r=D._GetCompressedChunks(s,a);for(let i=0;i<s.vertexCount;i++)D._GetSplat(s,i,r,a),i%D._PlyConversionBatchSize===0&&t&&(yield);return s.buffer}static async ConvertPLYToSplatAsync(e){return await Re(D.ConvertPLYToSplat(e,!0),ke())}static async ConvertPLYWithSHToSplatAsync(e){return await Re(D.ConvertPLYWithSHToSplat(e,!0),ke())}async loadDataAsync(e){return await this.updateDataAsync(e)}async loadFileAsync(e,t){await ls(e,t||Te.LastCreatedScene,{pluginOptions:{splat:{gaussianSplattingMesh:this}}})}dispose(e){if(this._covariancesATexture?.dispose(),this._covariancesBTexture?.dispose(),this._centersTexture?.dispose(),this._colorsTexture?.dispose(),this._shTextures)for(const t of this._shTextures)t.dispose();this._partIndicesTexture&&this._partIndicesTexture.dispose(),this._covariancesATexture=null,this._covariancesBTexture=null,this._centersTexture=null,this._colorsTexture=null,this._shTextures=null,this._partIndicesTexture=null,this._partMatrices=[],this._worker?.terminate(),this._worker=null,this._cameraViewInfos.forEach(t=>{t.mesh.dispose()}),this._partProxies.forEach(t=>{t.dispose()}),this._partProxies.clear(),super.dispose(e,!0)}_copyTextures(e){if(this._covariancesATexture=e.covariancesATexture?.clone(),this._covariancesBTexture=e.covariancesBTexture?.clone(),this._centersTexture=e.centersTexture?.clone(),this._colorsTexture=e.colorsTexture?.clone(),this._partIndicesTexture=e._partIndicesTexture?.clone(),e._shTextures){this._shTextures=[];for(const t of e._shTextures)this._shTextures?.push(t.clone())}}clone(e=""){const t=new D(e,void 0,this.getScene());t._copySource(this),t.makeGeometryUnique(),t._vertexCount=this._vertexCount,t._copyTextures(this),t._modelViewProjectionMatrix=ue.Identity(),t._viewProjectionMatrix=ue.Identity(),t._splatPositions=this._splatPositions,t._readyToDisplay=!1,t._disableDepthSort=this._disableDepthSort,t._partMatrices=this._partMatrices.map(a=>a.clone()),t._instanciateWorker();const s=this.getBoundingInfo();return t.getBoundingInfo().reConstruct(s.minimum,s.maximum,this.getWorldMatrix()),t.forcedInstanceCount=this.forcedInstanceCount,t.setEnabled(!0),t}_makeEmptySplat(e,t,s,a){const r=this._useRGBACovariants?4:2;this._splatPositions[4*e+0]=0,this._splatPositions[4*e+1]=0,this._splatPositions[4*e+2]=0,t[e*4+0]=q(0),t[e*4+1]=q(0),t[e*4+2]=q(0),t[e*4+3]=q(0),s[e*r+0]=q(0),s[e*r+1]=q(0),a[e*4+3]=0}_makeSplat(e,t,s,a,r,i,u,c,o){const x=X.Matrix[0],p=X.Matrix[1],h=X.Quaternion[0],d=this._useRGBACovariants?4:2,l=t[8*e+0],_=t[8*e+1]*(o.flipY?-1:1),C=t[8*e+2];this._splatPositions[4*e+0]=l,this._splatPositions[4*e+1]=_,this._splatPositions[4*e+2]=C,u.minimizeInPlaceFromFloats(l,_,C),c.maximizeInPlaceFromFloats(l,_,C),h.set((s[32*e+28+1]-127.5)/127.5,(s[32*e+28+2]-127.5)/127.5,(s[32*e+28+3]-127.5)/127.5,-(s[32*e+28+0]-127.5)/127.5),h.normalize(),h.toRotationMatrix(x),ue.ScalingToRef(t[8*e+3+0]*2,t[8*e+3+1]*2,t[8*e+3+2]*2,p);const f=x.multiplyToRef(p,X.Matrix[0]).m,g=this._tmpCovariances;g[0]=f[0]*f[0]+f[1]*f[1]+f[2]*f[2],g[1]=f[0]*f[4]+f[1]*f[5]+f[2]*f[6],g[2]=f[0]*f[8]+f[1]*f[9]+f[2]*f[10],g[3]=f[4]*f[4]+f[5]*f[5]+f[6]*f[6],g[4]=f[4]*f[8]+f[5]*f[9]+f[6]*f[10],g[5]=f[8]*f[8]+f[9]*f[9]+f[10]*f[10];let v=-1e4;for(let S=0;S<6;S++)v=Math.max(v,Math.abs(g[S]));this._splatPositions[4*e+3]=v;const I=v;a[e*4+0]=q(g[0]/I),a[e*4+1]=q(g[1]/I),a[e*4+2]=q(g[2]/I),a[e*4+3]=q(g[3]/I),r[e*d+0]=q(g[4]/I),r[e*d+1]=q(g[5]/I),i[e*4+0]=s[32*e+24+0],i[e*4+1]=s[32*e+24+1],i[e*4+2]=s[32*e+24+2],i[e*4+3]=s[32*e+24+3]}_updateTextures(e,t,s,a,r){const i=this._getTextureSize(this._vertexCount),u=(d,l,_,C)=>new Ce(d,l,_,C,this._scene,!1,!1,2,1),c=(d,l,_,C)=>new Ce(d,l,_,C,this._scene,!1,!1,2,0),o=(d,l,_,C)=>new Ce(d,l,_,C,this._scene,!1,!1,1,7),x=(d,l,_,C)=>new Ce(d,l,_,C,this._scene,!1,!1,2,2),p=this._covariancesATexture===null,h=this._textureSize.y!=i.y;if(!p&&!h){this._delayedTextureUpdate={covA:e,covB:t,colors:s,centers:this._splatPositions,sh:a,partIndices:r};const d=Float32Array.from(this._splatPositions),l=this._vertexCount;if(this._worker&&this._worker.postMessage({positions:d,vertexCount:l},[d.buffer]),a&&!this._shTextures){this._shTextures=[];for(const _ of a){const C=new Uint32Array(_.buffer),f=o(C,i.x,i.y,11);f.wrapU=0,f.wrapV=0,this._shTextures.push(f)}}if(r&&!this._partIndicesTexture){const _=new Uint8Array(r);this._partIndicesTexture=c(_,i.x,i.y,6),this._partIndicesTexture.wrapU=0,this._partIndicesTexture.wrapV=0}this._worker&&this._worker.postMessage({partIndices:r??null}),this._postToWorker(!0)}else{if(this._textureSize=i,this._covariancesATexture=x(e,i.x,i.y,5),this._covariancesBTexture=x(t,i.x,i.y,this._useRGBACovariants?5:7),this._centersTexture=u(this._splatPositions,i.x,i.y,5),this._colorsTexture=c(s,i.x,i.y,5),a){this._shTextures=[];for(const d of a){const l=new Uint32Array(d.buffer),_=o(l,i.x,i.y,11);_.wrapU=0,_.wrapV=0,this._shTextures.push(_)}}if(r){const d=new Uint8Array(r);this._partIndicesTexture=c(d,i.x,i.y,6),this._partIndicesTexture.wrapU=0,this._partIndicesTexture.wrapV=0}if(p)this._instanciateWorker();else{if(this._worker){const d=Float32Array.from(this._splatPositions),l=this._vertexCount;this._worker.postMessage({positions:d,vertexCount:l},[d.buffer]),this._worker.postMessage({partIndices:r??null})}this._postToWorker(!0)}}}*_updateData(e,t,s,a,r={flipY:!1}){this._covariancesATexture||(this._readyToDisplay=!1);const i=new Uint8Array(e),u=new Float32Array(i.buffer);this._keepInRam&&(this._splatsData=e,this._shData=s?s.map(g=>new Uint8Array(g)):null);const c=i.length/D._RowOutputLength;c!=this._vertexCount&&this._updateSplatIndexBuffer(c),this._vertexCount=c,this._shDegree=s?s.length:0;const o=this._getTextureSize(c),x=o.x*o.y,p=D.ProgressiveUpdateAmount??o.y,h=o.x*p;this._splatPositions=new Float32Array(4*x);const d=new Uint16Array(x*4),l=new Uint16Array((this._useRGBACovariants?4:2)*x),_=new Uint8Array(x*4);if(a){this._partIndices=new Uint8Array(x),this._partIndices.set(a);let g=-1;for(let v=0;v<a.length;v++)g=Math.max(g,a[v]);this._ensureMinimumPartMatricesLength(g+1)}const C=new E(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),f=new E(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);if(D.ProgressiveUpdateAmount){this._updateTextures(d,l,_,s,this._partIndices?this._partIndices:void 0),this.setEnabled(!0);const g=Math.ceil(o.y/p);for(let S=0;S<g;S++){const w=S*p,m=w*o.x;for(let y=0;y<h;y++)this._makeSplat(m+y,u,i,d,l,_,C,f,r);this._updateSubTextures(this._splatPositions,d,l,_,w,Math.min(p,o.y-w)),this.getBoundingInfo().reConstruct(C,f,this.getWorldMatrix()),t&&(yield)}const v=Float32Array.from(this._splatPositions),I=this._vertexCount;this._worker&&(this._worker.postMessage({positions:v,vertexCount:I},[v.buffer]),this._worker.postMessage({partIndices:a})),this._sortIsDirty=!0}else{const g=c+15&-16;for(let v=0;v<c;v++)this._makeSplat(v,u,i,d,l,_,C,f,r),t&&v%D._SplatBatchSize===0&&(yield);for(let v=c;v<g;v++)this._makeEmptySplat(v,d,l,_);this._updateTextures(d,l,_,s,this._partIndices?this._partIndices:void 0),this.getBoundingInfo().reConstruct(C,f,this.getWorldMatrix()),this.setEnabled(!0),this._sortIsDirty=!0}this._postToWorker(!0)}async updateDataAsync(e,t,s){return await Re(this._updateData(e,!0,t,s),ke())}updateData(e,t,s={flipY:!0},a){hs(this._updateData(e,!1,t,a,s))}refreshBoundingInfo(){return this.thinInstanceRefreshBoundingInfo(!1),this}_updateSplatIndexBuffer(e){const t=e+15&-16;if(!this._splatIndex||e!=this._splatIndex.length){this._splatIndex=new Float32Array(t);for(let s=0;s<t;s++)this._splatIndex[s]=s;this._cameraViewInfos.forEach(s=>{s.mesh.thinInstanceSetBuffer("splatIndex",this._splatIndex,16,!1)})}(!this._depthMix||e!=this._depthMix.length)&&!je&&(this._depthMix=new BigInt64Array(t)),this.forcedInstanceCount=Math.max(t>>4,1)}_updateSubTextures(e,t,s,a,r,i,u,c){const o=(g,v,I,S,w)=>{this.getEngine().updateTextureData(g.getInternalTexture(),v,0,S,I,w,0,0,!1)},x=this._getTextureSize(this._vertexCount),p=this._useRGBACovariants?4:2,h=r*x.x,d=i*x.x,l=new Uint16Array(t.buffer,h*4*Uint16Array.BYTES_PER_ELEMENT,d*4),_=new Uint16Array(s.buffer,h*p*Uint16Array.BYTES_PER_ELEMENT,d*p),C=new Uint8Array(a.buffer,h*4,d*4),f=new Float32Array(e.buffer,h*4*Float32Array.BYTES_PER_ELEMENT,d*4);if(o(this._covariancesATexture,l,x.x,r,i),o(this._covariancesBTexture,_,x.x,r,i),o(this._centersTexture,f,x.x,r,i),o(this._colorsTexture,C,x.x,r,i),u)for(let g=0;g<u.length;g++){const I=new Uint32Array(u[g].buffer,h*4*4,d*4);o(this._shTextures[g],I,x.x,r,i)}if(c&&this._partIndicesTexture){const g=new Uint8Array(c.buffer,h,d);o(this._partIndicesTexture,g,x.x,r,i)}}_instanciateWorker(){if(!this._vertexCount||this._disableDepthSort||(this._updateSplatIndexBuffer(this._vertexCount),je))return;this._worker?.terminate(),this._worker=new Worker(URL.createObjectURL(new Blob(["(",D._CreateWorker.toString(),")(self)"],{type:"application/javascript"})));const e=Float32Array.from(this._splatPositions),t=this._partIndices?new Uint8Array(this._partIndices):null,s=this._partMatrices.map(a=>new Float32Array(a.m));this._worker.postMessage({positions:e},[e.buffer]),this._worker.postMessage({partIndices:t}),this._worker.postMessage({partMatrices:s}),this._worker.onmessage=a=>{const r=this._vertexCount+15&-16;if(a.data.depthMix.length!=r){this._canPostToWorker=!0,this._postToWorker(!0),this._sortIsDirty=!1;return}this._depthMix=a.data.depthMix;const i=a.data.cameraId,u=new Uint32Array(a.data.depthMix.buffer);if(this._splatIndex)for(let o=0;o<r;o++)this._splatIndex[o]=u[2*o];if(this._delayedTextureUpdate){const o=this._getTextureSize(r);this._updateSubTextures(this._delayedTextureUpdate.centers,this._delayedTextureUpdate.covA,this._delayedTextureUpdate.covB,this._delayedTextureUpdate.colors,0,o.y,this._delayedTextureUpdate.sh,this._delayedTextureUpdate.partIndices),this._delayedTextureUpdate=null}const c=this._cameraViewInfos.get(i);c&&(c.splatIndexBufferSet?c.mesh.thinInstanceBufferUpdated("splatIndex"):(c.mesh.thinInstanceSetBuffer("splatIndex",this._splatIndex,16,!1),c.splatIndexBufferSet=!0)),this._canPostToWorker=!0,this._readyToDisplay=!0,this._sortIsDirty&&(this._postToWorker(!0),this._sortIsDirty=!1)}}_getTextureSize(e){const t=this._scene.getEngine(),s=t.getCaps().maxTextureSize;let a=1;if(t.version===1&&!t.isWebGPU)for(;s*a<e;)a*=2;else a=Math.ceil(e/s);return a>s&&(ie.Error("GaussianSplatting texture size: ("+s+", "+a+"), maxTextureSize: "+s),a=s),new ee(s,a)}get partCount(){return this._partMatrices.length}setWorldMatrixForPart(e,t){this._partMatrices[e].copyFrom(t),this._worker&&this._worker.postMessage({partMatrices:this._partMatrices.map(s=>new Float32Array(s.m))}),this._postToWorker(!0)}getWorldMatrixForPart(e){return this._partMatrices[e]??this.getWorldMatrix()}getPartVisibility(e){return this._partVisibility[e]??1}setPartVisibility(e,t){this._partVisibility[e]=Math.max(0,Math.min(1,t))}_ensureMinimumPartMatricesLength(e){this._partMatrices.length<e&&this._resizePartMatrices(e)}_resizePartMatrices(e){if(this._partMatrices.length!=e){if(this._partMatrices.length>e)this._partMatrices=this._partMatrices.slice(0,e),this._partVisibility=this._partVisibility.slice(0,e);else{this.computeWorldMatrix(!0);const t=this.getWorldMatrix();for(;this._partMatrices.length<e;)this._partMatrices.push(t.clone()),this._partVisibility.push(1)}this._worker&&this._worker.postMessage({partMatrices:this._partMatrices.map(t=>new Float32Array(t.m))}),this._postToWorker(!0)}}addPart(e,t=!0){if(this.partCount>=Me)throw new Error(`Cannot add part, as the maximum part count (${Me}) has been reached`);const s=this._vertexCount,a=s==0?new ArrayBuffer(0):this.splatsData,r=this.shData,i=e._vertexCount,u=e.splatsData,c=e.shData,o=Math.max(r?.length||0,c?.length||0),x=r!==null&&c!==null;if(!a)throw new Error("To call addPart(), the current mesh must be loaded with keepInRam: true");const p=s*D._RowOutputLength;if(a.byteLength!==p)throw new Error(`splatsDataA size (${a.byteLength}) does not match expected size (${p})`);if(!u)throw new Error("To call addPart(), the other mesh must be loaded with keepInRam: true");const h=i*D._RowOutputLength;if(u.byteLength!==h)throw new Error(`splatsDataB size (${u.byteLength}) does not match expected size (${h})`);if(e.partIndices)throw new Error("To call addPart(), the other mesh must not be a compound");const d=new Uint8Array(a.byteLength+u.byteLength);d.set(new Uint8Array(a),0),d.set(new Uint8Array(u),a.byteLength);let l;if(x){const m=s+i;l=[];for(let y=0;y<o;y++){const M=new Uint8Array(m*16);if(y<(r?.length??0)&&M.set(r[y],0),y<(c?.length??0)){const z=16*s;M.set(c[y],z)}l.push(M)}}let _=this.partCount,C=this.partIndices;if(C||(C=new Uint8Array(s),_=s>0?1:0),C.length<s)throw new Error(`partIndices length (${C.length}) should be at least vertexCount (${s}) in the current mesh`);const f=new Uint8Array(i).fill(_),g=new Uint8Array(s+i);g.set(C.slice(0,s),0),g.set(f,s),this.updateData(d.buffer,l,{flipY:!1},g);const v=e.getWorldMatrix();this.setWorldMatrixForPart(_,v);const I=new Bs(e.name,this.getScene(),this,e,_);t&&e.dispose();const S=new Ft;return v.decompose(I.scaling,S,I.position),I.rotationQuaternion=S,I.computeWorldMatrix(!0),this._partProxies.set(_,I),I}removePart(e){if(e<0||e>=this.partCount)throw new Error(`Part index ${e} is out of range [0, ${this.partCount})`);const t=this.splatsData,s=this.shData,a=this.partIndices;if(!t||!a)throw new Error("Cannot remove part from a non-compound mesh or mesh without keepInRam");const r=this._vertexCount,i=D._RowOutputLength;let u=0;for(let l=0;l<r;l++)a[l]!==e&&u++;const c=new Uint8Array(u*i),o=new Uint8Array(u);let x;if(s){x=[];for(let _=0;_<s.length;_++)x.push(new Uint8Array(u*16))}let p=0;for(let l=0;l<r;l++){const _=a[l];if(_===e)continue;const C=l*i,f=p*i;if(c.set(new Uint8Array(t,C,i),f),o[p]=_>e?_-1:_,s&&x)for(let v=0;v<s.length;v++){const I=l*16,S=p*16;x[v].set(new Uint8Array(s[v].buffer,I,16),S)}p++}this._partMatrices.splice(e,1),this._partVisibility.splice(e,1),this._worker&&this._worker.postMessage({partMatrices:this._partMatrices.map(l=>new Float32Array(l.m))}),this.updateData(c.buffer,x,{flipY:!1},o);const h=this._partProxies.get(e);h&&(h.dispose(),this._partProxies.delete(e));const d=[];this._partProxies.forEach((l,_)=>{_>e&&d.push([_,l])});for(const[l,_]of d)this._partProxies.delete(l),_.updatePartIndex(l-1),this._partProxies.set(l-1,_)}bakeTransformIntoVertices(e){const t=this.splatsData;if(!t)return ie.Error("Cannot bake transform into vertices if splatsData is not kept in RAM"),this;const s=e.m,a=Math.sqrt(s[0]*s[0]+s[1]*s[1]+s[2]*s[2]),r=Math.sqrt(s[4]*s[4]+s[5]*s[5]+s[6]*s[6]),i=Math.sqrt(s[8]*s[8]+s[9]*s[9]+s[10]*s[10]),u=.001;if(Math.abs(a-r)>u||Math.abs(a-i)>u)return ie.Error("Gaussian Splatting bakeTransformIntoVertices does not support non-uniform scaling"),this;const c=new Uint8Array(t),o=new Float32Array(t),x=X.Vector3[0];let p;const h=X.Quaternion[0],d=X.Quaternion[1];for(e.decompose(x,d,x),p=0;p<this._vertexCount;p++){const l=p*8;E.TransformCoordinatesFromFloatsToRef(o[l],o[l+1],o[l+2],e,x),o[l]=x.x,o[l+1]=x.y,o[l+2]=x.z,o[l+3]*=a,o[l+4]*=a,o[l+5]*=a,h.set((c[32*p+28+1]-127.5)/127.5,(c[32*p+28+2]-127.5)/127.5,(c[32*p+28+3]-127.5)/127.5,(c[32*p+28+0]-127.5)/127.5),h.normalize(),this.scaling.x<0&&(h.x=-h.x,h.w=-h.w),this.scaling.y<0&&(h.y=-h.y,h.w=-h.w),this.scaling.z<0&&(h.z=-h.z,h.w=-h.w),d.multiplyToRef(h,h),h.normalize(),c[32*p+28+0]=Math.round(h.w*127.5+127.5),c[32*p+28+1]=Math.round(h.x*127.5+127.5),c[32*p+28+2]=Math.round(h.y*127.5+127.5),c[32*p+28+3]=Math.round(h.z*127.5+127.5)}return this.updateData(t,this.shData??void 0,{flipY:!1}),this}}D._RowOutputLength=32;D._SH_C0=.28209479177387814;D._SplatBatchSize=327680;D._PlyConversionBatchSize=32768;D._BatchSize=16;D._DefaultViewUpdateThreshold=1e-4;D.ProgressiveUpdateAmount=0;D._CreateWorker=function(n){let e,t,s,a,r,i;function u(c,o){const x=new Float32Array(16);for(let p=0;p<4;p++)for(let h=0;h<4;h++)for(let d=0;d<4;d++)x[h*4+p]+=c[d*4+p]*o[h*4+d];return x}n.onmessage=c=>{if(c.data.positions)e=c.data.positions;else if(c.data.partMatrices)i=c.data.partMatrices;else if(c.data.partIndices!==void 0)r=c.data.partIndices;else{const o=c.data.cameraId,x=c.data.modelViewProjection,p=c.data.viewProjection,h=e.length/4+15&-16;if(!e||!x)throw new Error("positions or modelViewProjection matrix is not defined!");t=c.data.depthMix,s=new Uint32Array(t.buffer),a=new Float32Array(t.buffer);for(let l=0;l<h;l++)s[2*l]=l;const d=c.data.depthScale;if(i&&r){const l=i.map(C=>u(p,C)),_=r.length;for(let C=0;C<h;C++){const f=r[Math.min(C,_-1)],g=l[f];a[2*C+1]=1e4-(g[2]*e[4*C+0]+g[6]*e[4*C+1]+g[10]*e[4*C+2]+g[14])*d}}else{const l=x;for(let _=0;_<h;_++)a[2*_+1]=1e4-(l[2]*e[4*_+0]+l[6]*e[4*_+1]+l[10]*e[4*_+2]+l[14])*d}t.sort(),n.postMessage({depthMix:t,cameraId:o},[t.buffer])}}};class Vs{constructor(e,t,s,a,r){this.idx=0,this.color=new J(1,1,1,1),this.position=E.Zero(),this.rotation=E.Zero(),this.uv=new ee(0,0),this.velocity=E.Zero(),this.pivot=E.Zero(),this.translateFromPivot=!1,this._pos=0,this._ind=0,this.groupId=0,this.idxInGroup=0,this._stillInvisible=!1,this._rotationMatrix=[1,0,0,0,1,0,0,0,1],this.parentId=null,this._globalPosition=E.Zero(),this.idx=e,this._group=t,this.groupId=s,this.idxInGroup=a,this._pcs=r}get size(){return this.size}set size(e){this.size=e}get quaternion(){return this.rotationQuaternion}set quaternion(e){this.rotationQuaternion=e}intersectsMesh(e,t){if(!e.hasBoundingInfo)return!1;if(!this._pcs.mesh)throw new Error("Point Cloud System doesnt contain the Mesh");if(t)return e.getBoundingInfo().boundingSphere.intersectsPoint(this.position.add(this._pcs.mesh.position));const s=e.getBoundingInfo().boundingBox,a=s.maximumWorld.x,r=s.minimumWorld.x,i=s.maximumWorld.y,u=s.minimumWorld.y,c=s.maximumWorld.z,o=s.minimumWorld.z,x=this.position.x+this._pcs.mesh.position.x,p=this.position.y+this._pcs.mesh.position.y,h=this.position.z+this._pcs.mesh.position.z;return r<=x&&x<=a&&u<=p&&p<=i&&o<=h&&h<=c}getRotationMatrix(e){let t;if(this.rotationQuaternion)t=this.rotationQuaternion;else{t=X.Quaternion[0];const s=this.rotation;Ft.RotationYawPitchRollToRef(s.y,s.x,s.z,t)}t.toRotationMatrix(e)}}class Fe{get groupID(){return this.groupId}set groupID(e){this.groupId=e}constructor(e,t){this.groupId=e,this._positionFunction=t}}var Rt;(function(n){n[n.Color=2]="Color",n[n.UV=1]="UV",n[n.Random=0]="Random",n[n.Stated=3]="Stated"})(Rt||(Rt={}));class js{get positions(){return this._positions32}get colors(){return this._colors32}get uvs(){return this._uvs32}constructor(e,t,s,a){this.particles=new Array,this.nbParticles=0,this.counter=0,this.vars={},this._promises=[],this._positions=new Array,this._indices=new Array,this._normals=new Array,this._colors=new Array,this._uvs=new Array,this._updatable=!0,this._isVisibilityBoxLocked=!1,this._alwaysVisible=!1,this._groups=new Array,this._groupCounter=0,this._computeParticleColor=!0,this._computeParticleTexture=!0,this._computeParticleRotation=!0,this._computeBoundingBox=!1,this._isReady=!1,this.name=e,this._size=t,this._scene=s||Te.LastCreatedScene,a&&a.updatable!==void 0?this._updatable=a.updatable:this._updatable=!0}async buildMeshAsync(e){return await Promise.all(this._promises),this._isReady=!0,await this._buildMeshAsync(e)}async _buildMeshAsync(e){this.nbParticles===0&&this.addPoints(1),this._positions32=new Float32Array(this._positions),this._uvs32=new Float32Array(this._uvs),this._colors32=new Float32Array(this._colors);const t=new Ge;t.set(this._positions32,L.PositionKind),this._uvs32.length>0&&t.set(this._uvs32,L.UVKind);let s=0;this._colors32.length>0&&(s=1,t.set(this._colors32,L.ColorKind));const a=new _e(this.name,this._scene);t.applyToMesh(a,this._updatable),this.mesh=a,this._positions=null,this._uvs=null,this._colors=null,this._updatable||(this.particles.length=0);let r=e;return r||(r=new xs("point cloud material",this._scene),r.emissiveColor=new we(s,s,s),r.disableLighting=!0,r.pointsCloud=!0,r.pointSize=this._size),a.material=r,a}_addParticle(e,t,s,a){const r=new Vs(e,t,s,a,this);return this.particles.push(r),r}_randomUnitVector(e){e.position=new E(Math.random(),Math.random(),Math.random()),e.color=new J(1,1,1,1)}_getColorIndicesForCoord(e,t,s,a){const r=e._groupImageData,i=s*(a*4)+t*4,u=[i,i+1,i+2,i+3],c=u[0],o=u[1],x=u[2],p=u[3],h=r[c],d=r[o],l=r[x],_=r[p];return new J(h/255,d/255,l/255,_)}_setPointsColorOrUV(e,t,s,a,r,i,u,c){c=c??0,s&&e.updateFacetData();const x=2*e.getBoundingInfo().boundingSphere.radius;let p=e.getVerticesData(L.PositionKind);const h=e.getIndices(),d=e.getVerticesData(L.UVKind+(c?c+1:"")),l=e.getVerticesData(L.ColorKind),_=E.Zero();e.computeWorldMatrix();const C=e.getWorldMatrix();if(!C.isIdentity()){p=p.slice(0);for(let G=0;G<p.length/3;G++)E.TransformCoordinatesFromFloatsToRef(p[3*G],p[3*G+1],p[3*G+2],C,_),p[3*G]=_.x,p[3*G+1]=_.y,p[3*G+2]=_.z}let f=0,g=0,v=0,I=0,S=0,w=0,m=0,y=0,M=0,z=0,U=0,b=0,F=0;const W=E.Zero(),A=E.Zero(),R=E.Zero(),V=E.Zero(),P=E.Zero();let j=0,k=0,T=0,K=0,Y=0,ae=0;const se=ee.Zero(),H=ee.Zero(),Xe=ee.Zero(),Ze=ee.Zero(),$e=ee.Zero();let qe=0,Le=0,Ke=0,Qe=0,Je=0,Ye=0,et=0,tt=0,st=0,rt=0,nt=0,it=0;const de=fe.Zero(),Ee=fe.Zero(),at=fe.Zero(),ot=fe.Zero(),ct=fe.Zero();let re=0,xe=0;u=u||0;let pe,me,B=new fe(0,0,0,1),De=E.Zero(),Ae=E.Zero(),lt=E.Zero(),oe=0,ht=E.Zero(),ft=0,ut=0;const ve=new _s(E.Zero(),new E(1,0,0));let ze,ge=E.Zero();for(let G=0;G<h.length/3;G++){g=h[3*G],v=h[3*G+1],I=h[3*G+2],S=p[3*g],w=p[3*g+1],m=p[3*g+2],y=p[3*v],M=p[3*v+1],z=p[3*v+2],U=p[3*I],b=p[3*I+1],F=p[3*I+2],W.set(S,w,m),A.set(y,M,z),R.set(U,b,F),A.subtractToRef(W,V),R.subtractToRef(A,P),d&&(j=d[2*g],k=d[2*g+1],T=d[2*v],K=d[2*v+1],Y=d[2*I],ae=d[2*I+1],se.set(j,k),H.set(T,K),Xe.set(Y,ae),H.subtractToRef(se,Ze),Xe.subtractToRef(H,$e)),l&&a&&(qe=l[4*g],Le=l[4*g+1],Ke=l[4*g+2],Qe=l[4*g+3],Je=l[4*v],Ye=l[4*v+1],et=l[4*v+2],tt=l[4*v+3],st=l[4*I],rt=l[4*I+1],nt=l[4*I+2],it=l[4*I+3],de.set(qe,Le,Ke,Qe),Ee.set(Je,Ye,et,tt),at.set(st,rt,nt,it),Ee.subtractToRef(de,ot),at.subtractToRef(Ee,ct));let Oe,dt,pt,_t,xt,ce,le,Se;const mt=new we(0,0,0),ye=new we(0,0,0);let he,$;for(let Pe=0;Pe<t._groupDensity[G];Pe++)f=this.particles.length,this._addParticle(f,t,this._groupCounter,G+Pe),$=this.particles[f],re=Math.sqrt(ne(0,1)),xe=ne(0,1),pe=W.add(V.scale(re)).add(P.scale(re*xe)),s&&(De=e.getFacetNormal(G).normalize().scale(-1),Ae=V.clone().normalize(),lt=E.Cross(De,Ae),oe=ne(0,2*Math.PI),ht=Ae.scale(Math.cos(oe)).add(lt.scale(Math.sin(oe))),oe=ne(.1,Math.PI/2),ge=ht.scale(Math.cos(oe)).add(De.scale(Math.sin(oe))),ve.origin=pe.add(ge.scale(1e-5)),ve.direction=ge,ve.length=x,ze=ve.intersectsMesh(e),ze.hit&&(ut=ze.pickedPoint.subtract(pe).length(),ft=ne(0,1)*ut,pe.addInPlace(ge.scale(ft)))),$.position=pe.clone(),this._positions.push($.position.x,$.position.y,$.position.z),a!==void 0?d&&(me=se.add(Ze.scale(re)).add($e.scale(re*xe)),a?r&&t._groupImageData!==null?(Oe=t._groupImgWidth,dt=t._groupImgHeight,he=this._getColorIndicesForCoord(t,Math.round(me.x*Oe),Math.round(me.y*dt),Oe),$.color=he,this._colors.push(he.r,he.g,he.b,he.a)):l?(B=de.add(ot.scale(re)).add(ct.scale(re*xe)),$.color=new J(B.x,B.y,B.z,B.w),this._colors.push(B.x,B.y,B.z,B.w)):(B=de.set(Math.random(),Math.random(),Math.random(),1),$.color=new J(B.x,B.y,B.z,B.w),this._colors.push(B.x,B.y,B.z,B.w)):($.uv=me.clone(),this._uvs.push($.uv.x,$.uv.y))):(i?(mt.set(i.r,i.g,i.b),pt=ne(-u,u),_t=ne(-u,u),Se=mt.toHSV(),xt=Se.r,ce=Se.g+pt,le=Se.b+_t,ce<0&&(ce=0),ce>1&&(ce=1),le<0&&(le=0),le>1&&(le=1),we.HSVtoRGBToRef(xt,ce,le,ye),B.set(ye.r,ye.g,ye.b,1)):B=de.set(Math.random(),Math.random(),Math.random(),1),$.color=new J(B.x,B.y,B.z,B.w),this._colors.push(B.x,B.y,B.z,B.w))}}_colorFromTexture(e,t,s){if(e.material===null){ie.Warn(e.name+"has no material."),t._groupImageData=null,this._setPointsColorOrUV(e,t,s,!0,!1);return}const r=e.material.getActiveTextures();if(r.length===0){ie.Warn(e.name+"has no usable texture."),t._groupImageData=null,this._setPointsColorOrUV(e,t,s,!0,!1);return}const i=e.clone();i.setEnabled(!1),this._promises.push(new Promise(u=>{fs.WhenAllReady(r,()=>{let c=t._textureNb;c<0&&(c=0),c>r.length-1&&(c=r.length-1);const o=()=>{t._groupImgWidth=r[c].getSize().width,t._groupImgHeight=r[c].getSize().height,this._setPointsColorOrUV(i,t,s,!0,!0,void 0,void 0,r[c].coordinatesIndex),i.dispose(),u()};t._groupImageData=null;const x=r[c].readPixels();x?x.then(p=>{t._groupImageData=p,o()}):o()})}))}_calculateDensity(e,t,s){let a,r,i,u,c,o,x,p,h,d,l,_;const C=E.Zero(),f=E.Zero(),g=E.Zero(),v=E.Zero(),I=E.Zero(),S=E.Zero();let w;const m=[];let y=0;const M=s.length/3;for(let b=0;b<M;b++)a=s[3*b],r=s[3*b+1],i=s[3*b+2],u=t[3*a],c=t[3*a+1],o=t[3*a+2],x=t[3*r],p=t[3*r+1],h=t[3*r+2],d=t[3*i],l=t[3*i+1],_=t[3*i+2],C.set(u,c,o),f.set(x,p,h),g.set(d,l,_),f.subtractToRef(C,v),g.subtractToRef(f,I),E.CrossToRef(v,I,S),w=.5*S.length(),y+=w,m[b]=y;const z=new Array(M);let U=e;for(let b=M-1;b>0;b--){const F=m[b];if(F===0)z[b]=0;else{const A=(F-m[b-1])/F*U,R=Math.floor(A),V=A-R,P=+(Math.random()<V),j=R+P;z[b]=j,U-=j}}return z[0]=U,z}addPoints(e,t=this._randomUnitVector){const s=new Fe(this._groupCounter,t);let a,r=this.nbParticles;for(let i=0;i<e;i++)a=this._addParticle(r,s,this._groupCounter,i),s&&s._positionFunction&&s._positionFunction(a,r,i),this._positions.push(a.position.x,a.position.y,a.position.z),a.color&&this._colors.push(a.color.r,a.color.g,a.color.b,a.color.a),a.uv&&this._uvs.push(a.uv.x,a.uv.y),r++;return this.nbParticles+=e,this._groupCounter++,this._groupCounter}addSurfacePoints(e,t,s,a,r){let i=s||0;(isNaN(i)||i<0||i>3)&&(i=0);const u=e.getVerticesData(L.PositionKind),c=e.getIndices();this._groups.push(this._groupCounter);const o=new Fe(this._groupCounter,null);switch(o._groupDensity=this._calculateDensity(t,u,c),i===2?o._textureNb=a||0:a=a||new J(1,1,1,1),i){case 2:this._colorFromTexture(e,o,!1);break;case 1:this._setPointsColorOrUV(e,o,!1,!1,!1);break;case 0:this._setPointsColorOrUV(e,o,!1);break;case 3:this._setPointsColorOrUV(e,o,!1,void 0,void 0,a,r);break}return this.nbParticles+=t,this._groupCounter++,this._groupCounter-1}addVolumePoints(e,t,s,a,r){let i=s||0;(isNaN(i)||i<0||i>3)&&(i=0);const u=e.getVerticesData(L.PositionKind),c=e.getIndices();this._groups.push(this._groupCounter);const o=new Fe(this._groupCounter,null);switch(o._groupDensity=this._calculateDensity(t,u,c),i===2?o._textureNb=a||0:a=a||new J(1,1,1,1),i){case 2:this._colorFromTexture(e,o,!0);break;case 1:this._setPointsColorOrUV(e,o,!0,!1,!1);break;case 0:this._setPointsColorOrUV(e,o,!0);break;case 3:this._setPointsColorOrUV(e,o,!0,void 0,void 0,a,r);break}return this.nbParticles+=t,this._groupCounter++,this._groupCounter-1}setParticles(e=0,t=this.nbParticles-1,s=!0){if(!this._updatable||!this._isReady)return this;this.beforeUpdateParticles(e,t,s);const a=X.Matrix[0],r=this.mesh,i=this._colors32,u=this._positions32,c=this._uvs32,o=X.Vector3,x=o[5].copyFromFloats(1,0,0),p=o[6].copyFromFloats(0,1,0),h=o[7].copyFromFloats(0,0,1),d=o[8].setAll(Number.MAX_VALUE),l=o[9].setAll(-Number.MAX_VALUE);ue.IdentityToRef(a);let _=0;if(this.mesh?.isFacetDataEnabled&&(this._computeBoundingBox=!0),t=t>=this.nbParticles?this.nbParticles-1:t,this._computeBoundingBox&&(e!=0||t!=this.nbParticles-1)){const v=this.mesh?.getBoundingInfo();v&&(d.copyFrom(v.minimum),l.copyFrom(v.maximum))}_=0;let C=0,f=0,g=0;for(let v=e;v<=t;v++){const I=this.particles[v];_=I.idx,C=3*_,f=4*_,g=2*_,this.updateParticle(I);const S=I._rotationMatrix,w=I.position,m=I._globalPosition;if(this._computeParticleRotation&&I.getRotationMatrix(a),I.parentId!==null){const k=this.particles[I.parentId],T=k._rotationMatrix,K=k._globalPosition,Y=w.x*T[1]+w.y*T[4]+w.z*T[7],ae=w.x*T[0]+w.y*T[3]+w.z*T[6],se=w.x*T[2]+w.y*T[5]+w.z*T[8];if(m.x=K.x+ae,m.y=K.y+Y,m.z=K.z+se,this._computeParticleRotation){const H=a.m;S[0]=H[0]*T[0]+H[1]*T[3]+H[2]*T[6],S[1]=H[0]*T[1]+H[1]*T[4]+H[2]*T[7],S[2]=H[0]*T[2]+H[1]*T[5]+H[2]*T[8],S[3]=H[4]*T[0]+H[5]*T[3]+H[6]*T[6],S[4]=H[4]*T[1]+H[5]*T[4]+H[6]*T[7],S[5]=H[4]*T[2]+H[5]*T[5]+H[6]*T[8],S[6]=H[8]*T[0]+H[9]*T[3]+H[10]*T[6],S[7]=H[8]*T[1]+H[9]*T[4]+H[10]*T[7],S[8]=H[8]*T[2]+H[9]*T[5]+H[10]*T[8]}}else if(m.x=0,m.y=0,m.z=0,this._computeParticleRotation){const k=a.m;S[0]=k[0],S[1]=k[1],S[2]=k[2],S[3]=k[4],S[4]=k[5],S[5]=k[6],S[6]=k[8],S[7]=k[9],S[8]=k[10]}const M=o[11];I.translateFromPivot?M.setAll(0):M.copyFrom(I.pivot);const z=o[0];z.copyFrom(I.position);const U=z.x-I.pivot.x,b=z.y-I.pivot.y,F=z.z-I.pivot.z;let W=U*S[0]+b*S[3]+F*S[6],A=U*S[1]+b*S[4]+F*S[7],R=U*S[2]+b*S[5]+F*S[8];W+=M.x,A+=M.y,R+=M.z;const V=u[C]=m.x+x.x*W+p.x*A+h.x*R,P=u[C+1]=m.y+x.y*W+p.y*A+h.y*R,j=u[C+2]=m.z+x.z*W+p.z*A+h.z*R;if(this._computeBoundingBox&&(d.minimizeInPlaceFromFloats(V,P,j),l.maximizeInPlaceFromFloats(V,P,j)),this._computeParticleColor&&I.color){const k=I.color,T=this._colors32;T[f]=k.r,T[f+1]=k.g,T[f+2]=k.b,T[f+3]=k.a}if(this._computeParticleTexture&&I.uv){const k=I.uv,T=this._uvs32;T[g]=k.x,T[g+1]=k.y}}return r&&(s&&(this._computeParticleColor&&r.updateVerticesData(L.ColorKind,i,!1,!1),this._computeParticleTexture&&r.updateVerticesData(L.UVKind,c,!1,!1),r.updateVerticesData(L.PositionKind,u,!1,!1)),this._computeBoundingBox&&(r.hasBoundingInfo?r.getBoundingInfo().reConstruct(d,l,r._worldMatrix):r.buildBoundingInfo(d,l,r._worldMatrix))),this.afterUpdateParticles(e,t,s),this}dispose(){this.mesh?.dispose(),this.vars=null,this._positions=null,this._indices=null,this._normals=null,this._uvs=null,this._colors=null,this._indices32=null,this._positions32=null,this._uvs32=null,this._colors32=null}refreshVisibleSize(){return this._isVisibilityBoxLocked||this.mesh?.refreshBoundingInfo(),this}setVisibilityBox(e){if(!this.mesh)return;const t=e/2;this.mesh.buildBoundingInfo(new E(-t,-t,-t),new E(t,t,t))}get isAlwaysVisible(){return this._alwaysVisible}set isAlwaysVisible(e){this.mesh&&(this._alwaysVisible=e,this.mesh.alwaysSelectAsActiveMesh=e)}set computeParticleRotation(e){this._computeParticleRotation=e}set computeParticleColor(e){this._computeParticleColor=e}set computeParticleTexture(e){this._computeParticleTexture=e}get computeParticleColor(){return this._computeParticleColor}get computeParticleTexture(){return this._computeParticleTexture}set computeBoundingBox(e){this._computeBoundingBox=e}get computeBoundingBox(){return this._computeBoundingBox}initParticles(){}recycleParticle(e){return e}updateParticle(e){return e}beforeUpdateParticles(e,t,s){}afterUpdateParticles(e,t,s){}}function Gs(n,e,t){const s=new Uint8Array(n),a=new Uint32Array(n.slice(0,12)),r=a[2],i=s[12],u=s[13],c=s[14],o=s[15],x=a[1];if(o||a[0]!=1347635022||x!=2&&x!=3)return new Promise(m=>{m({mode:3,data:h,hasVertexColors:!1})});const p=32,h=new ArrayBuffer(p*r),d=1/(1<<u),l=new Int32Array(1),_=new Uint8Array(l.buffer),C=function(m,y){return _[0]=m[y+0],_[1]=m[y+1],_[2]=m[y+2],_[3]=m[y+2]&128?255:0,l[0]*d};let f=16;const g=new Float32Array(h),v=new Float32Array(h),I=new Uint8ClampedArray(h),S=new Uint8ClampedArray(h);for(let m=0;m<r;m++)g[m*8+0]=C(s,f+0),g[m*8+1]=C(s,f+3),g[m*8+2]=C(s,f+6),f+=9;const w=.282;for(let m=0;m<r;m++){for(let y=0;y<3;y++){const z=(s[f+r+m*3+y]-127.5)/(.15*255);I[m*32+24+y]=Z.Clamp((.5+w*z)*255,0,255)}I[m*32+24+3]=s[f+m]}f+=r*4;for(let m=0;m<r;m++)v[m*8+3+0]=Math.exp(s[f+0]/16-10),v[m*8+3+1]=Math.exp(s[f+1]/16-10),v[m*8+3+2]=Math.exp(s[f+2]/16-10),f+=3;if(x>=3){const m=Math.SQRT1_2;for(let y=0;y<r;y++){const M=[s[f+0],s[f+1],s[f+2],s[f+3]],z=M[0]+(M[1]<<8)+(M[2]<<16)+(M[3]<<24),U=511,b=[],F=z>>>30;let W=z,A=0;for(let P=3;P>=0;--P)if(P!==F){const j=W&U,k=W>>>9&1;W=W>>>10,b[P]=m*(j/U),k===1&&(b[P]=-b[P]),A+=b[P]*b[P]}const R=1-A;b[F]=Math.sqrt(Math.max(R,0));const V=[3,0,1,2];for(let P=0;P<4;P++)S[y*32+28+P]=Math.round(127.5+b[V[P]]*127.5);f+=4}}else for(let m=0;m<r;m++){const y=s[f+0],M=s[f+1],z=s[f+2],U=y/127.5-1,b=M/127.5-1,F=z/127.5-1;S[m*32+28+1]=y,S[m*32+28+2]=M,S[m*32+28+3]=z;const W=1-(U*U+b*b+F*F);S[m*32+28+0]=127.5+Math.sqrt(W<0?0:W)*127.5,f+=3}if(i){const y=((i+1)*(i+1)-1)*3,M=Math.ceil(y/16);let z=f;const U=[],F=e.getEngine().getCaps().maxTextureSize,W=Math.ceil(r/F);for(let A=0;A<M;A++){const R=new Uint8Array(W*F*4*4);U.push(R)}for(let A=0;A<r;A++)for(let R=0;R<y;R++){const V=s[z++],P=Math.floor(R/16),j=U[P],k=R%16,T=A*16;j[k+T]=V}return new Promise(A=>{A({mode:0,data:h,hasVertexColors:!1,sh:U,trainedWithAntialiasing:!!c})})}return new Promise(m=>{m({mode:0,data:h,hasVertexColors:!1,trainedWithAntialiasing:!!c})})}const kt=.28209479177387814;async function Ht(n,e,t){return await new Promise((a,r)=>{const i=t.createCanvasImage();if(!i)throw new Error("Failed to create ImageBitmap");i.onload=()=>{try{const c=t.createCanvas(i.width,i.height);if(!c)throw new Error("Failed to create canvas");const o=c.getContext("2d");if(!o)throw new Error("Failed to get 2D context");o.drawImage(i,0,0);const x=o.getImageData(0,0,c.width,c.height);a({bits:new Uint8Array(x.data.buffer),width:x.width})}catch(c){r(`Error loading image ${i.src} with exception: ${c}`)}},i.onerror=c=>{r(`Error loading image ${i.src} with exception: ${c}`)},i.crossOrigin="anonymous";let u;if(typeof n=="string"){if(!e)throw new Error("filename is required when using a URL");i.src=n+e}else{const c=new Blob([n],{type:"image/webp"});u=URL.createObjectURL(c),i.src=u}})}async function Xs(n,e,t){const s=n.count?n.count:n.means.shape[0],a=32,r=new ArrayBuffer(a*s),i=new Float32Array(r),u=new Float32Array(r),c=new Uint8ClampedArray(r),o=new Uint8ClampedArray(r),x=f=>Math.sign(f)*(Math.exp(Math.abs(f))-1),p=e[0].bits,h=e[1].bits;if(!Array.isArray(n.means.mins)||!Array.isArray(n.means.maxs))throw new Error("Missing arrays in SOG data.");for(let f=0;f<s;f++){const g=f*4;for(let v=0;v<3;v++){const I=n.means.mins[v],S=n.means.maxs[v],w=h[g+v],m=p[g+v],y=w<<8|m,M=Z.Lerp(I,S,y/65535);i[f*8+v]=x(M)}}const d=e[2].bits;if(n.version===2){if(!n.scales.codebook)throw new Error("Missing codebook in SOG version 2 scales data.");for(let f=0;f<s;f++){const g=f*4;for(let v=0;v<3;v++){const I=n.scales.codebook[d[g+v]],S=Math.exp(I);u[f*8+3+v]=S}}}else{if(!Array.isArray(n.scales.mins)||!Array.isArray(n.scales.maxs))throw new Error("Missing arrays in SOG scales data.");for(let f=0;f<s;f++){const g=f*4;for(let v=0;v<3;v++){const I=d[g+v],S=Z.Lerp(n.scales.mins[v],n.scales.maxs[v],I/255),w=Math.exp(S);u[f*8+3+v]=w}}}const l=e[4].bits;if(n.version===2){if(!n.sh0.codebook)throw new Error("Missing codebook in SOG version 2 sh0 data.");for(let f=0;f<s;f++){const g=f*4;for(let v=0;v<3;v++){const I=.5+n.sh0.codebook[l[g+v]]*kt;c[f*32+24+v]=Math.max(0,Math.min(255,Math.round(255*I)))}c[f*32+24+3]=l[g+3]}}else{if(!Array.isArray(n.sh0.mins)||!Array.isArray(n.sh0.maxs))throw new Error("Missing arrays in SOG sh0 data.");for(let f=0;f<s;f++){const g=f*4;for(let v=0;v<4;v++){const I=n.sh0.mins[v],S=n.sh0.maxs[v],w=l[g+v],m=Z.Lerp(I,S,w/255);let y;v<3?y=.5+m*kt:y=1/(1+Math.exp(-m)),c[f*32+24+v]=Math.max(0,Math.min(255,Math.round(255*y)))}}}const _=f=>(f/255-.5)*2/Math.SQRT2,C=e[3].bits;for(let f=0;f<s;f++){const g=C[f*4+0],v=C[f*4+1],I=C[f*4+2],S=C[f*4+3],w=_(g),m=_(v),y=_(I),M=S-252,z=w*w+m*m+y*y,U=Math.sqrt(Math.max(0,1-z));let b;switch(M){case 0:b=[U,w,m,y];break;case 1:b=[w,U,m,y];break;case 2:b=[w,m,U,y];break;case 3:b=[w,m,y,U];break;default:throw new Error("Invalid quaternion mode")}o[f*32+28+0]=b[0]*127.5+127.5,o[f*32+28+1]=b[1]*127.5+127.5,o[f*32+28+2]=b[2]*127.5+127.5,o[f*32+28+3]=b[3]*127.5+127.5}if(n.shN){const f=[0,3,8,15],g=n.shN.bands?f[n.shN.bands]:n.shN.shape[1]/3,v=e[5].bits,I=e[6].bits,S=e[5].width,w=g*3,m=Math.ceil(w/16),y=[],z=t.getEngine().getCaps().maxTextureSize,U=Math.ceil(s/z);for(let b=0;b<m;b++){const F=new Uint8Array(U*z*4*4);y.push(F)}if(n.version===2){if(!n.shN.codebook)throw new Error("Missing codebook in SOG version 2 shN data.");for(let b=0;b<s;b++){const F=I[b*4+0]+(I[b*4+1]<<8),W=F%64*g,A=Math.floor(F/64);for(let R=0;R<g;R++)for(let V=0;V<3;V++){const P=R*3+V,j=Math.floor(P/16),k=y[j],T=P%16,K=b*16,Y=n.shN.codebook[v[(W+R)*4+V+A*S*4]]*127.5+127.5;k[T+K]=Math.max(0,Math.min(255,Y))}}}else for(let b=0;b<s;b++){const F=I[b*4+0]+(I[b*4+1]<<8),W=F%64*g,A=Math.floor(F/64),R=n.shN.mins,V=n.shN.maxs;for(let P=0;P<3;P++)for(let j=0;j<g/3;j++){const k=j*3+P,T=Math.floor(k/16),K=y[T],Y=k%16,ae=b*16,se=Z.Lerp(R,V,v[(W+j)*4+P+A*S*4]/255)*127.5+127.5;K[Y+ae]=Math.max(0,Math.min(255,se))}}return await new Promise(b=>{b({mode:0,data:r,hasVertexColors:!1,sh:y})})}return await new Promise(f=>{f({mode:0,data:r,hasVertexColors:!1})})}async function Ut(n,e,t){let s,a;if(n instanceof Map){a=n;const u=a.get("meta.json");if(!u)throw new Error("meta.json not found in files Map");s=JSON.parse(new TextDecoder().decode(u))}else s=n;const r=[...s.means.files,...s.scales.files,...s.quats.files,...s.sh0.files];s.shN&&r.push(...s.shN.files);const i=await Promise.all(r.map(async u=>{if(a&&a.has(u)){const c=a.get(u);return await Ht(c,u,t.getEngine())}else return await Ht(e,u,t.getEngine())}));return await Xs(s,i,t)}class te{constructor(e=te._DefaultLoadingOptions){this.name=He.name,this._assetContainer=null,this.extensions=He.extensions,this._loadingOptions=e}createPlugin(e){return new te(e[He.name])}async importMeshAsync(e,t,s,a,r,i){return await this._parseAsync(e,t,s,a).then(u=>({meshes:u,particleSystems:[],skeletons:[],animationGroups:[],transformNodes:[],geometries:[],lights:[],spriteManagers:[]}))}static _BuildPointCloud(e,t){if(!t.byteLength)return!1;const s=new Uint8Array(t),a=new Float32Array(t),r=32,i=s.length/r,u=function(c,o){const x=a[8*o+0],p=a[8*o+1],h=a[8*o+2];c.position=new E(x,p,h);const d=s[r*o+24+0]/255,l=s[r*o+24+1]/255,_=s[r*o+24+2]/255;c.color=new J(d,l,_,1)};return e.addPoints(i,u),!0}static _BuildMesh(e,t){const s=new _e("PLYMesh",e),a=new Uint8Array(t.data),r=new Float32Array(t.data),i=32,u=a.length/i,c=[],o=new Ge;for(let x=0;x<u;x++){const p=r[8*x+0],h=r[8*x+1],d=r[8*x+2];c.push(p,h,d)}if(t.hasVertexColors){const x=new Float32Array(u*4);for(let p=0;p<u;p++){const h=a[i*p+24+0]/255,d=a[i*p+24+1]/255,l=a[i*p+24+2]/255;x[p*4+0]=h,x[p*4+1]=d,x[p*4+2]=l,x[p*4+3]=1}o.colors=x}return o.positions=c,o.indices=t.faces,o.applyToMesh(s),s}async _unzipWithFFlateAsync(e){let t=this._loadingOptions.fflate;t||(typeof window.fflate>"u"&&await us.LoadScriptAsync(this._loadingOptions.deflateURL??"https://unpkg.com/fflate/umd/index.js"),t=window.fflate);const{unzipSync:s}=t,a=s(e),r=new Map;for(const[i,u]of Object.entries(a))r.set(i,u);return r}_parseAsync(e,t,s,a){const r=[],i=h=>{t._blockEntityCollection=!!this._assetContainer;const d=this._loadingOptions.gaussianSplattingMesh??new D("GaussianSplatting",null,t,this._loadingOptions.keepInRam);d._parentContainer=this._assetContainer,r.push(d),d.updateData(h.data,h.sh,{flipY:!1}),d.scaling.y*=-1,d.computeWorldMatrix(!0),t._blockEntityCollection=!1};if(typeof s=="string"){const h=JSON.parse(s);if(h&&h.means&&h.scales&&h.quats&&h.sh0)return new Promise(d=>{Ut(h,a,t).then(l=>{i(l),d(r)}).catch(()=>{throw new Error("Failed to parse SOG data.")})})}const u=s instanceof ArrayBuffer?new Uint8Array(s):s;if(u[0]===80&&u[1]===75)return new Promise(h=>{this._unzipWithFFlateAsync(u).then(d=>{Ut(d,a,t).then(l=>{i(l),h(r)}).catch(()=>{throw new Error("Failed to parse SOG zip data.")})})});const c=h=>{te._ConvertPLYToSplat(s).then(async d=>{switch(t._blockEntityCollection=!!this._assetContainer,d.mode){case 0:{const l=this._loadingOptions.gaussianSplattingMesh??new D("GaussianSplatting",null,t,this._loadingOptions.keepInRam);switch(l._parentContainer=this._assetContainer,r.push(l),l.updateData(d.data,d.sh,{flipY:!1}),l.scaling.y*=-1,d.chirality==="RightHanded"&&(l.scaling.y*=-1),d.upAxis){case"X":l.rotation=new E(0,0,Math.PI/2);break;case"Y":l.rotation=new E(0,0,Math.PI);break;case"Z":l.rotation=new E(-Math.PI/2,Math.PI,0);break}l.computeWorldMatrix(!0)}break;case 1:{const l=new js("PointCloud",1,t);te._BuildPointCloud(l,d.data)?await l.buildMeshAsync().then(_=>{r.push(_)}):l.dispose()}break;case 2:if(d.faces)r.push(te._BuildMesh(t,d));else throw new Error("PLY mesh doesn't contain face informations.");break;default:throw new Error("Unsupported Splat mode")}t._blockEntityCollection=!1,this.applyAutoCameraLimits(d,t),h(r)})};if(u[0]!==31||u[1]!==139)return new Promise(h=>{c(h)});const o=new ReadableStream({start(h){h.enqueue(new Uint8Array(s)),h.close()}}),x=new DecompressionStream("gzip"),p=o.pipeThrough(x);return new Promise(h=>{new Response(p).arrayBuffer().then(d=>{Gs(d,t,this._loadingOptions).then(l=>{t._blockEntityCollection=!!this._assetContainer;const _=this._loadingOptions.gaussianSplattingMesh??new D("GaussianSplatting",null,t,this._loadingOptions.keepInRam);if(l.trainedWithAntialiasing){const C=_.material;C.kernelSize=.1,C.compensation=!0}_._parentContainer=this._assetContainer,r.push(_),_.updateData(l.data,l.sh,{flipY:!1}),this._loadingOptions.flipY||(_.scaling.y*=-1,_.computeWorldMatrix(!0)),t._blockEntityCollection=!1,this.applyAutoCameraLimits(l,t),h(r)})}).catch(()=>{c(h)})})}applyAutoCameraLimits(e,t){if(!this._loadingOptions.disableAutoCameraLimits&&(e.safeOrbitCameraRadiusMin!==void 0||e.safeOrbitCameraElevationMinMax!==void 0)&&t.activeCamera?.getClassName()==="ArcRotateCamera"){const s=t.activeCamera;e.safeOrbitCameraElevationMinMax&&(s.lowerBetaLimit=Math.PI*.5-e.safeOrbitCameraElevationMinMax[1],s.upperBetaLimit=Math.PI*.5-e.safeOrbitCameraElevationMinMax[0]),e.safeOrbitCameraRadiusMin&&(s.lowerRadiusLimit=e.safeOrbitCameraRadiusMin)}}loadAssetContainerAsync(e,t,s){const a=new ps(e);return this._assetContainer=a,this.importMeshAsync(null,e,t,s).then(r=>{for(const i of r.meshes)a.meshes.push(i);return this._assetContainer=null,a}).catch(r=>{throw this._assetContainer=null,r})}loadAsync(e,t,s){return this.importMeshAsync(null,e,t,s).then(()=>{})}static _ConvertPLYToSplat(e){const t=new Uint8Array(e),s=new TextDecoder().decode(t.slice(0,1024*10)),a=`end_header
`,r=s.indexOf(a);if(r<0||!s)return new Promise(S=>{S({mode:0,data:e,rawSplat:!0})});const i=parseInt(/element vertex (\d+)\n/.exec(s)[1]),u=/element face (\d+)\n/.exec(s);let c=0;u&&(c=parseInt(u[1]));const o=/element chunk (\d+)\n/.exec(s);let x=0;o&&(x=parseInt(o[1]));let p=0,h=0;const d={double:8,int:4,uint:4,float:4,short:2,ushort:2,uchar:1,list:0},l={Vertex:0,Chunk:1,SH:2,Float_Tuple:3,Float:4,Uchar:5};let _=l.Chunk;const C=[],f=s.slice(0,r).split(`
`),g={};for(const S of f)if(S.startsWith("property ")){const[,w,m]=S.split(" ");if(_==l.Chunk)h+=d[w];else if(_==l.Vertex)C.push({name:m,type:w,offset:p}),p+=d[w];else if(_==l.SH)C.push({name:m,type:w,offset:p});else if(_==l.Float_Tuple){const y=new DataView(e,h,d.float*2);g.safeOrbitCameraElevationMinMax=[y.getFloat32(0,!0),y.getFloat32(4,!0)]}else if(_==l.Float){const y=new DataView(e,h,d.float);g.safeOrbitCameraRadiusMin=y.getFloat32(0,!0)}else if(_==l.Uchar){const y=new DataView(e,h,d.uchar);m=="up_axis"?g.upAxis=y.getUint8(0)==0?"X":y.getUint8(0)==1?"Y":"Z":m=="chirality"&&(g.chirality=y.getUint8(0)==0?"LeftHanded":"RightHanded")}d[w]||ie.Warn(`Unsupported property type: ${w}.`)}else if(S.startsWith("element ")){const[,w]=S.split(" ");w=="chunk"?_=l.Chunk:w=="vertex"?_=l.Vertex:w=="sh"?_=l.SH:w=="safe_orbit_camera_elevation_min_max_radians"?_=l.Float_Tuple:w=="safe_orbit_camera_radius_min"?_=l.Float:(w=="up_axis"||w=="chirality")&&(_=l.Uchar)}const v=p,I=h;return D.ConvertPLYWithSHToSplatAsync(e).then(async S=>{const w=new DataView(e,r+a.length);let m=I*x+v*i;const y=[];if(c)for(let A=0;A<c;A++){const R=w.getUint8(m);if(R==3){m+=1;for(let V=0;V<R;V++){const P=w.getUint32(m+(2-V)*4,!0);y.push(P)}m+=12}}if(x)return await new Promise(A=>{A({mode:0,data:S.buffer,sh:S.sh,faces:y,hasVertexColors:!1,compressed:!0,rawSplat:!1})});let M=0,z=0;const U=["x","y","z","scale_0","scale_1","scale_2","opacity","rot_0","rot_1","rot_2","rot_3"],b=["red","green","blue","f_dc_0","f_dc_1","f_dc_2"];for(let A=0;A<C.length;A++){const R=C[A];U.includes(R.name)&&M++,b.includes(R.name)&&z++}const F=M==U.length&&z==3,W=c?2:F?0:1;return await new Promise(A=>{A({...g,mode:W,data:S.buffer,sh:S.sh,faces:y,hasVertexColors:!!z,compressed:!1,rawSplat:!1})})})}}te._DefaultLoadingOptions={keepInRam:!1,flipY:!1};ds(new te);export{te as SPLATFileLoader};
