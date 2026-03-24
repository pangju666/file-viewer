import{G as i}from"./FilePreviewView-BIJ8FJ2G.js";import"./helperFunctions-CKOF2w0P.js";import"./hdrFilteringFunctions-BtnHg5gl.js";import"./pbrBRDFFunctions-JkszZxtG.js";import"./index-uOY01V4R.js";const r="hdrFilteringPixelShader",e=`#include<helperFunctions>
#include<importanceSampling>
#include<pbrBRDFFunctions>
#include<hdrFilteringFunctions>
uniform float alphaG;uniform samplerCube inputTexture;uniform vec2 vFilteringInfo;uniform float hdrScale;varying vec3 direction;void main() {vec3 color=radiance(alphaG,inputTexture,direction,vFilteringInfo);gl_FragColor=vec4(color*hdrScale,1.0);}`;i.ShadersStore[r]||(i.ShadersStore[r]=e);const c={name:r,shader:e};export{c as hdrFilteringPixelShader};
