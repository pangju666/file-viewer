import{G as o}from"./FilePreviewView-BIJ8FJ2G.js";import"./index-uOY01V4R.js";const r="oitFinalSimpleBlendPixelShader",t=`var uFrontColor: texture_2d<f32>;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {var fragCoord: vec2i=vec2i(fragmentInputs.position.xy);var frontColor: vec4f=textureLoad(uFrontColor,fragCoord,0);fragmentOutputs.color=frontColor;}
`;o.ShadersStoreWGSL[r]||(o.ShadersStoreWGSL[r]=t);const a={name:r,shader:t};export{a as oitFinalSimpleBlendPixelShaderWGSL};
