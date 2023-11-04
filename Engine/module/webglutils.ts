
/**
 * Webgl 개발에 도움을 주는 모듈
 */
export class WebGLUtils
{
    /**
     * 
     * @param gl WebGL Context
     * @param shaderSource 셰이더의 GLSL 소스 코드
     * @param shaderType 셰이더의 타입, VERTEX_SHADER | FRAGMENT_SHADER
     * @returns 셰이더
     */
    private static compileShader(gl: WebGLRenderingContext, shaderSource: string, shaderType: number): WebGLShader
    {
        const shader = gl.createShader(shaderType);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if(!success)
        {
            throw "could not compile shader:" + gl.getShaderInfoLog(shader);
        }

        return shader;
    }

    /**
     * 
     * @param gl WebGL Context
     * @param vertexShader // 버텍스 셰이더
     * @param fragmentShader // 프래그먼트 셰이더
     * @returns WebGLProgram
     */
    private static createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram
    {
        const program: WebGLProgram = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        const success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) 
        {
          throw ("program failed to link:" + gl.getProgramInfoLog (program));
        }
       
        return program;
    }

    /**
     * 셰이더 소스 변수를 통해 WebGLProgram 생성
     * @param gl // WebGL Context
     * @param vss // 버텍스 셰이더 소스
     * @param fss // 프래그먼트 셰이더 소스
     * @returns WebGLProgram
     */
    static createShaderFromString(gl: WebGLRenderingContext, vss: string, fss: string): WebGLProgram
    {
        const vs = WebGLUtils.compileShader(gl, vss, gl.VERTEX_SHADER);
        const fs = WebGLUtils.compileShader(gl, fss, gl.FRAGMENT_SHADER);
        return WebGLUtils.createProgram(gl, vs, fs);
    }
}