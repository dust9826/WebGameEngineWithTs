import { Logger } from "../Logger.js";
import { Component } from "../component/Component.js";

type Constructor<T> = { new (...args: any[]): T };
/**
 * 컴포넌트와 계층 관계 데이터를 갖고있는 클래스
 */
export class GameObject {
    static gid: number = 0;
    private id: number;
    private childs: Array<GameObject>;
    private parent: GameObject;
    private components: Map<string, Array<Component>>;

    constructor() 
    {
        this.id = GameObject.gid++;
        this.childs = new Array<GameObject>();
        this.parent = null;
        this.components = new Map<string, Array<Component>>();
    }

    /**
     * 오브젝트가 소지한 해당 타입의 컴포넌트를 하나 반환하는 함수
     * @param className 가져올 컴포넌트의 타입
     * @returns 해당 컴포넌트 or null
     */
    GetComponent<T extends Component>(className: Constructor<T>) : T
    {
        const ret: Array<T> = this.components[className.name];
        if(ret === undefined || ret.length === 0)
            return null;
        return ret[0];
    }

    /**
     * 오브젝트가 소지한 해당 타입의 컴포넌트를 모두 반환하는 함수
     * @param className 가져올 컴포넌트의 타입
     * @returns 해당 컴포넌트 배열 or null
     */
    GetComponentAll<T extends Component>(className: Constructor<T>) : Array<T>
    {
        const ret: Array<T> = this.components[className.name];
        if(ret === undefined || ret.length === 0)
            return null;
        return ret;
    }

    /**
     * 오브젝트에 특정 타입의 컴포넌트를 추가하는 함수
     * @param component 추가할 컴포넌트
     */
    AddComponent<T extends Component>(className: Constructor<T>, component: Component)
    {
        const name = className.name;
        if(this.components[name] === undefined)
            this.components[name] = new Array<T>;
        this.components[name].push(component);
    }

    SetChild(child: GameObject): void
    {
        this.childs.push(child);
    }

    GetChilds(): Array<GameObject>
    {
        return this.childs;
    }

    SetParent(parent: GameObject): void
    {
        this.parent = parent;
    }

    GetParent(): GameObject
    {
        return this.parent;
    }

    get ID() 
    {
        return this.id;
    }
}

export const EObjectType = 
{
    TILE: 0,
    PLAYER: 1,
    ENEMY: 2,
    MISSILE: 3,
} as const;
export type EObjectType = typeof EObjectType[keyof typeof EObjectType];
