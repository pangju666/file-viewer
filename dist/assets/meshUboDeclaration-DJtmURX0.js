import{G as o}from"./FilePreviewView-DHNTJ5Ma.js";const e="meshUboDeclaration",i=`#ifdef WEBGL2
uniform mat4 world;uniform float visibility;
#else
layout(std140,column_major) uniform;uniform Mesh
{mat4 world;float visibility;};
#endif
#define WORLD_UBO
`;o.IncludesShadersStore[e]||(o.IncludesShadersStore[e]=i);
