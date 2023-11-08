import { GameObject } from "../gameobject/gameobject";

/**
 * 게임 오브젝트의 데이터를 저장 및 변경하는 클래스
 */
export abstract class Component {
    private _gameobject: GameObject;
    get gameobject() { return this._gameobject; }
    set gameobject(obj: GameObject) { this._gameobject = obj; }
    Start() {}
    Update() {}
}
