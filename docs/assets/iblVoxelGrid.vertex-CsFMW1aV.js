import{G as i}from"./FilePreviewView-BIJ8FJ2G.js";import"./bakedVertexAnimation-B7ijMAfQ.js";import"./instancesDeclaration-_sY91i7C.js";import"./morphTargetsVertex-WX-Nru6W.js";import"./index-uOY01V4R.js";const e="iblVoxelGridVertexShader",o=`attribute vec3 position;varying vec3 vNormalizedPosition;
#include<bonesDeclaration>
#include<bakedVertexAnimationDeclaration>
#include<instancesDeclaration>
#include<morphTargetsVertexGlobalDeclaration>
#include<morphTargetsVertexDeclaration>[0..maxSimultaneousMorphTargets]
uniform mat4 invWorldScale;uniform mat4 viewMatrix;void main(void) {vec3 positionUpdated=position;
#include<morphTargetsVertexGlobal>
#include<morphTargetsVertex>[0..maxSimultaneousMorphTargets]
#include<instancesVertex>
#include<bonesVertex>
#include<bakedVertexAnimation>
vec4 worldPos=finalWorld*vec4(positionUpdated,1.0);gl_Position=viewMatrix*invWorldScale*worldPos;vNormalizedPosition.xyz=gl_Position.xyz*0.5+0.5;
#ifdef IS_NDC_HALF_ZRANGE
gl_Position.z=gl_Position.z*0.5+0.5;
#endif
}`;i.ShadersStore[e]||(i.ShadersStore[e]=o);const d={name:e,shader:o};export{d as iblVoxelGridVertexShader};
