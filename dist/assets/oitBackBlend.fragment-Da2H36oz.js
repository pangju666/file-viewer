import{G as r}from"./FilePreviewView-DHNTJ5Ma.js";import"./index-ORjAvF2u.js";const o="oitBackBlendPixelShader",e=`precision highp float;uniform sampler2D uBackColor;void main() {glFragColor=texelFetch(uBackColor,ivec2(gl_FragCoord.xy),0);if (glFragColor.a==0.0) { 
discard;}}`;r.ShadersStore[o]||(r.ShadersStore[o]=e);const l={name:o,shader:e};export{l as oitBackBlendPixelShader};
