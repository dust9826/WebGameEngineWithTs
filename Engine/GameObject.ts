import { Logger } from "./Logger.js";
import { Component } from "./component/Component.js";

type Constructor<T> = { new (...args: any[]): T };
/**
 * 컴포넌트와 계층 관계 데이터를 갖고있는 클래스
 */
export class GameObject {
    static gid: number = 0;
    private id: number;
    private childern: GameObject;
    private parent: GameObject;
    private components: Array<Component>;

    constructor() 
    {
        this.id = GameObject.gid;
        this.childern = null;
        this.parent = null;
        this.components = new Array<Component>();
    }

    /**
     * 오브젝트가 소지한 해당 타입의 컴포넌트를 하나 반환하는 함수
     * @param className 가져올 컴포넌트의 타입
     * @returns 해당 컴포넌트 or null
     */
    GetComponent<T extends Component>(className: Constructor<T>) : T
    {
        for(var component of this.components)
        {
            if(component instanceof className)
            {
                return component;
            }
        }
        return null;
    }

    /**
     * 오브젝트가 소지한 해당 타입의 컴포넌트를 모두 반환하는 함수
     * @param className 가져올 컴포넌트의 타입
     * @returns 해당 컴포넌트 배열 or null
     */
    GetComponentAll<T extends Component>(className: Constructor<T>) : Array<T>
    {
        const ret: Array<T> = new Array<T>();
        for(var component of this.components)
        {
            if(component instanceof className)
            {
                ret.push(component);
            }
        }
        return ret;
    }

    /**
     * 오브젝트에 특정 타입의 컴포넌트를 추가하는 함수
     * @param component 추가할 컴포넌트
     */
    AddComponent(component: Component)
    {
        this.components.push(component);
    }
}
  