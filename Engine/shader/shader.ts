

export const simple_vertex_shader: string = `
attribute vec2 a_position;

uniform vec2 u_resolution;

void main() {\
    vec2 zeroToOne = a_position / u_resolution;
    vec2 zeroToTwo = zeroToOne * 2.0;
    vec2 clipSpace = zeroToTwo - 1.0;
 
    gl_Position = vec4(clipSpace, 0, 1);
}
`

export const simple_fragment_shader: string = `
precision mediump float;

uniform vec4 u_color;

void main() {
    gl_FragColor = u_color;
}
`