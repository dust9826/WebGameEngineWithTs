

export const simple_vertex_shader: string = `
attribute vec4 a_position;
attribute vec4 a_color;
uniform mat4 u_matrix;
varying vec4 v_color;

void main() {
    gl_Position = a_position * u_matrix;
    v_color = a_color;
}
`

export const simple_fragment_shader: string = `
precision mediump float;
varying vec4 v_color;
//uniform vec4 u_color;

void main() {
    gl_FragColor = v_color;
}
`

// sprite 렌더링
export const sprite_vertex_shader: string = `
attribute vec4 a_position;
attribute vec2 a_texCoord;
uniform mat4 u_matrix;
varying vec2 v_texCoord;

void main() {
    gl_Position = a_position * u_matrix;
    v_texCoord = a_texCoord;
}
`

export const sprite_fragment_shader: string = `
precision mediump float;
uniform sampler2D u_image;
varying vec2 v_texCoord;

void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
}
`