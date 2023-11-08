
/**
 * Webgl 개발에 도움을 주는 모듈
 */
export class ModelCreator
{
    static get2DF(): Array<number>
    {
        return [
            // 왼쪽 열
             0,   0, 0,
            30,   0, 0,
             0, 150, 0,
             0, 150, 0,
            30,   0, 0,
            30, 150, 0,
       
            // 상단 가로 획
             30,  0, 0,
            100,  0, 0,
             30, 30, 0,
             30, 30, 0,
            100,  0, 0,
            100, 30, 0,
       
            // 중간 가로 획
            30, 60, 0,
            67, 60, 0,
            30, 90, 0,
            30, 90, 0,
            67, 60, 0,
            67, 90, 0
          ];
    }
    
    static getSquare(): Array<number>
    {
        return [
            0, 0, 0,
            1, 0, 0,
            0, 1, 0,
            0, 1, 0,
            1, 0, 0,
            1, 1, 0
        ];
    }

    static getCube(): Array<number>
    {
        return [
            0, 0, 0, 1, 0, 0, 0, 1, 0,
            0, 1, 0, 1, 0, 0, 1, 1, 0,  // Front

            1, 0, 0, 1, 0, 1, 1, 1, 0,
            1, 1, 0, 1, 0, 1, 1, 1, 1,  // Right

            1, 0, 1, 0, 0, 1, 1, 1, 1,
            1, 1, 1, 0, 0, 1, 0, 1, 1,  // Back

            0, 0, 1, 0, 0, 0, 0, 1, 1,
            0, 1, 1, 0, 0, 0, 0, 0, 1,  // Left

            0, 0, 1, 1, 0, 1, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 1, 0, 0,  // Bottom

            0, 1, 0, 1, 1, 0, 0, 1, 1, 
            0, 1, 1, 1, 1, 0, 1, 1, 1   // Up
        ];
    }
}