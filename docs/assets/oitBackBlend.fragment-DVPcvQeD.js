import{G as r}from"./FilePreviewView-BIJ8FJ2G.js";import"./index-uOY01V4R.js";const t="oitBackBlendPixelShader",e=`var uBackColor: texture_2d<f32>;@fragment
fn main(input: FragmentInputs)->FragmentOutputs {fragmentOutputs.color=textureLoad(uBackColor,vec2i(fragmentInputs.position.xy),0);if (fragmentOutputs.color.a==0.0) {discard;}}
`;r.ShadersStoreWGSL[t]||(r.ShadersStoreWGSL[t]=e);const n={name:t,shader:e};export{n as oitBackBlendPixelShaderWGSL};
