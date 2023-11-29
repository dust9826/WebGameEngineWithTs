

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