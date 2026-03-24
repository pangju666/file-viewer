import{G as r}from"./FilePreviewView-DHNTJ5Ma.js";import"./index-ORjAvF2u.js";const e="passPixelShader",t=`varying vUV: vec2f;var textureSamplerSampler: sampler;var textureSampler: texture_2d<f32>;
#define CUSTOM_FRAGMENT_DEFINITIONS
@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureSample(textureSampler,textureSamplerSampler,input.vUV);}`;r.ShadersStoreWGSL[e]||(r.ShadersStoreWGSL[e]=t);const p={name:e,shader:t};export{p as passPixelShaderWGSL};
