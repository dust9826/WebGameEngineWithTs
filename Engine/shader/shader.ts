

export const simple_vertex_shader: string = `
attribute vec4 a_position;

uniform mat4 u_matrix;

void main() {
    gl_Position = a_position * u_matrix;
}
`

export const simple_fragment_shader: string = `
precision mediump float;

uniform vec4 u_color;

void main() {
    gl_FragColor = u_color;
}
`