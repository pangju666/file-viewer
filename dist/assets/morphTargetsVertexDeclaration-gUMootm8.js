import{G as e}from"./FilePreviewView-DHNTJ5Ma.js";const r="morphTargetsVertexGlobalDeclaration",i=`#ifdef MORPHTARGETS
uniform morphTargetInfluences : array<f32,NUM_MORPH_INFLUENCERS>;
#ifdef MORPHTARGETS_TEXTURE 
uniform morphTargetTextureIndices : array<f32,NUM_MORPH_INFLUENCERS>;uniform morphTargetTextureInfo : vec3<f32>;var morphTargets : texture_2d_array<f32>;fn readVector3FromRawSampler(targetIndex : i32,vertexIndex : f32)->vec3<f32>
{ 
let textureWidth: i32=i32(uniforms.morphTargetTextureInfo.y);let y: i32=i32(vertexIndex)/textureWidth;let x: i32=i32(vertexIndex) % textureWidth;return textureLoad(morphTargets,vec2i(x,y),i32(uniforms.morphTargetTextureIndices[targetIndex]),0).xyz;}
fn readVector4FromRawSampler(targetIndex : i32,vertexIndex : f32)->vec4<f32>
{ 
let textureWidth: i32=i32(uniforms.morphTargetTextureInfo.y); 
let y: i32=i32(vertexIndex)/textureWidth;let x: i32=i32(vertexIndex) % textureWidth;return textureLoad(morphTargets,vec2i(x,y),i32(uniforms.morphTargetTextureIndices[targetIndex]),0);}
#endif
#endif
`;e.IncludesShadersStoreWGSL[r]||(e.IncludesShadersStoreWGSL[r]=i);const t="morphTargetsVertexDeclaration",f=`#ifdef MORPHTARGETS
#ifndef MORPHTARGETS_TEXTURE
#ifdef MORPHTARGETS_POSITION
attribute position{X} : vec3<f32>;
#endif
#ifdef MORPHTARGETS_NORMAL
attribute normal{X} : vec3<f32>;
#endif
#ifdef MORPHTARGETS_TANGENT
attribute tangent{X} : vec3<f32>;
#endif
#ifdef MORPHTARGETS_UV
attribute uv_{X} : vec2<f32>;
#endif
#ifdef MORPHTARGETS_UV2
attribute uv2_{X} : vec2<f32>;
#endif
#ifdef MORPHTARGETS_COLOR
attribute color{X} : vec4<f32>;
#endif
#elif {X}==0
uniform morphTargetCount: f32;
#endif
#endif
`;e.IncludesShadersStoreWGSL[t]||(e.IncludesShadersStoreWGSL[t]=f);
