import{G as o}from"./FilePreviewView-BIJ8FJ2G.js";import"./index-uOY01V4R.js";const e="ssaoCombinePixelShader",r=`uniform sampler2D textureSampler;uniform sampler2D originalColor;uniform vec4 viewport;varying vec2 vUV;
#define CUSTOM_FRAGMENT_DEFINITIONS
void main(void) {
#define CUSTOM_FRAGMENT_MAIN_BEGIN
vec2 uv=viewport.xy+vUV*viewport.zw;vec4 ssaoColor=texture2D(textureSampler,uv);vec4 sceneColor=texture2D(originalColor,uv);gl_FragColor=sceneColor*ssaoColor;
#define CUSTOM_FRAGMENT_MAIN_END
}
`;o.ShadersStore[e]||(o.ShadersStore[e]=r);const t={name:e,shader:r};export{t as ssaoCombinePixelShader};
