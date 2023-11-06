import { DegreeToRadians } from "./func.js";

export class Vec2
{
    private arr: Array<number>;
    get v(): Array<number> { return this.arr; }
    get x(): number { return this.arr[0]; }
    set x(v: number) { this.arr[0] = v; }
    get y(): number { return this.arr[1]; }
    set y(v: number) { this.arr[1] = v; }
    constructor(v: Array<number>) 
    { 
        this.arr = [
            v[0] ? v[0] : 0,
            v[1] ? v[1] : 0
        ]; 
    }

    static zero(): Vec2 { return new Vec2([]); }
    static one(): Vec2 { return new Vec2([1, 1]); }
} 

export class Vec3
{
    private arr: Array<number>;
    get v(): Array<number> { return this.arr; }
    get x(): number { return this.arr[0]; }
    set x(v: number) { this.arr[0] = v; }
    get y(): number { return this.arr[1]; }
    set y(v: number) { this.arr[1] = v; }
    get z(): number { return this.arr[2]; }
    set z(v: number) { this.arr[2] = v; }
    constructor(v: Array<number>) 
    { 
        this.arr = [
            v[0] ? v[0] : 0,
            v[1] ? v[1] : 0,
            v[2] ? v[2] : 0
        ]; 
    }

    static zero(): Vec3 { return new Vec3([]); }
    static one(): Vec3 { return new Vec3([1, 1, 1]); }

    set(v: Array<number>): Vec3
    {
        for(let i=0; i<3; i++)
        {
            this.arr[i] = v[i] ? v[i] : 0;
        }
        return this;
    }

    mul(f: number): Vec3
    {
        for(let i=0; i<3; i++)
        {
            this.arr[i] = this.arr[i] * f;
        }
        return this;
    }
} 

export class Vec4
{
    private arr: Array<number>;
    get v(): Array<number> { return this.arr; }
    get x(): number { return this.arr[0]; }
    set x(v: number) { this.arr[0] = v; }
    get y(): number { return this.arr[1]; }
    set y(v: number) { this.arr[1] = v; }
    get z(): number { return this.arr[2]; }
    set z(v: number) { this.arr[2] = v; }
    get w(): number { return this.arr[3]; }
    set w(v: number) { this.arr[3] = v; }
    constructor(v: Array<number>) 
    { 
        this.arr = [
            v[0] ? v[0] : 0,
            v[1] ? v[1] : 0,
            v[2] ? v[2] : 0,
            v[3] ? v[3] : 0
        ]; 
    }

    static zero(): Vec4 { return new Vec4([]); }
    static one(): Vec4 { return new Vec4([1, 1, 1, 1]); }

    set(v: Array<number>): Vec4
    {
        for(let i=0; i<4; i++)
        {
            this.arr[i] = v[i] ? v[i] : this.arr[i];
        }
        return this;
    }

    copy(): Vec4
    {
        const v4 = new Vec4([]);
        for(let i=0; i<4; i++)
        {
            v4.arr[i] = this.arr[i];
        }
        return v4;
    }

    mulM(m4: Matrix4x4): Vec4
    {
        for(let i=0; i<4; i++)
        {
            var ret: number = 0;
            for(let j=0; j<4; j++)
            {
                ret += this.arr[j] * m4.m[i + j * 4];
            }
            this.arr[i] = ret;
        }
        return this;
    }
} 

export class Matrix3x3
{
    static translation(tx: number, ty: number): Array<number>
    {
        return [
            1, 0, tx,
            0, 1, ty,
            0, 0, 1,
        ];
    }

    static rotation(degree: number): Array<number>
    {
        const radian = DegreeToRadians(degree);
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return [
            c, s, 0,
            -s, c, 0,
            0, 0, 1
        ];
    }

    static scaling(sx: number, sy: number): Array<number>
    {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ];
    }
}

export class Matrix4x4
{
    private arr: Array<number>;

    constructor(arr: Array<number>)
    {
        this.arr = new Array<number>(16);
        for(let i=0; i<16; ++i)
        {
            this.arr[i] = arr[i];
        }
    }

    get m(): Array<number> { return this.arr; }

    static identity(): Matrix4x4
    {
        return new Matrix4x4([
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static zero(): Matrix4x4
    {
        return new Matrix4x4([
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ]);
    }

    static translation(tx: number, ty: number, tz: number): Matrix4x4
    {
        return new Matrix4x4([
            1, 0, 0, tx,
            0, 1, 0, ty,
            0, 0, 1, tz,
            0, 0, 0, 1
        ]);
    }
    static translationV(arr: Array<number>): Matrix4x4 
    { 
        return Matrix4x4.translation(
            arr[0] ? arr[0] : 0, 
            arr[1] ? arr[1] : 0, 
            arr[2] ? arr[2] : 0); 
    }

    static xRotation(degree: number): Matrix4x4
    {
        const radian = DegreeToRadians(degree);
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return new Matrix4x4([
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1
        ]);
    }

    static yRotation(degree: number): Matrix4x4
    {
        const radian = DegreeToRadians(degree);
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return new Matrix4x4([
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1
        ]);
    }

    static zRotation(degree: number): Matrix4x4
    {
        const radian = DegreeToRadians(degree);
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return new Matrix4x4([
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static rotation(rx: number, ry: number, rz: number): Matrix4x4
    {
        var ret = Matrix4x4.zRotation(rz);
        ret.multiply(Matrix4x4.yRotation(ry));
        ret.multiply(Matrix4x4.yRotation(rx));
        return ret;
    }
    static rotationV(arr: Array<number>): Matrix4x4 
    { 
        return Matrix4x4.rotation(
            arr[0] ? arr[0] : 0, 
            arr[1] ? arr[1] : 0, 
            arr[2] ? arr[2] : 0); 
    }

    static scaling(sx: number, sy: number, sz: number): Matrix4x4
    {
        return new Matrix4x4([
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1
        ]);
    }
    static scalingV(arr: Array<number>): Matrix4x4 
    { 
        return Matrix4x4.scaling(
            arr[0] ? arr[0] : 0, 
            arr[1] ? arr[1] : 0, 
            arr[2] ? arr[2] : 0); 
    }

    /**
     * 3D 직교 투영 행렬을 반환
     * @param width 너비 x
     * @param height 높이 y
     * @param depth 깊이 z
     * @returns 3D 직교 투영 행렬
     */
    static projection(width: number, height: number, depth: number): Matrix4x4
    {
        return new Matrix4x4([
            2 / width, 0, 0, 0,
            0, 2 / height, 0, 0,
            0, 0, 2 / depth, 0,
            0, 0, 0, 1
        ]);
    }

    /**
     * 3D 원근 투영 행렬을 반환
     * @param fieldOfView 시야각
     * @param aspect 화면의 비율
     * @param near 최소 깊이
     * @param far 최대 깊이
     * @returns 3D 원근 투영 행렬
     */
    static perspective(fieldOfView: number, aspect: number, near: number, far: number): Matrix4x4
    {
        const fovInRadians = DegreeToRadians(fieldOfView);
        const f = Math.tan(Math.PI * 0.5 - 0.5 * fovInRadians);
        const rangeInv = 1.0 / (near - far);
        return new Matrix4x4([
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, near * far * rangeInv,
            0, 0, -1, 0
        ]);
    }

    multiply(m4: Matrix4x4): Matrix4x4
    {
        const arr = new Array<number>(16).fill(0);
        for(let i=0; i<4; ++i)
        {
            for(let j=0; j<4; ++j)
            {
                for(let k=0; k<4; ++k)
                {
                    arr[i*4+j] += this.arr[i*4+k] * m4.arr[k*4+j];
                }
            }
        }
        this.arr = arr;
        return this;
    }

    copy(): Matrix4x4
    {
        const m4 = new Matrix4x4([]);
        for(let i=0; i<16; i++)
        {
            m4.arr[i] = this.arr[i];
        }
        return m4;
    }

    inverse(): Matrix4x4
    {
        const arr = new Array<number>(16);
        for(let i=0; i<4; ++i)
        {
            for(let j=0; j<4; ++j)
            {
                arr[i*4+j] = this.arr[i+j*4];
            }
        }
        this.arr = arr;
        return this;
    }
}

/**
 * LinkedList 구현을 위한 노드
 */
class Node<T> 
{
    public next: Node<T>;
    public prev: Node<T>;
    public data: T;
    constructor(data: T)
    {
        this.next = null;
        this.prev = null;
        this.data = data;
    }
}

/**
 * LinkedList 인터페이스
 */
interface ILinkedList<T>
{
    insertInBegin(data: T): Node<T>;
    insertAtEnd(data: T): Node<T>;
    deleteNode(node: Node<T>): void;
    traverse(): T[];
    size(): number;
    search(comparator: (data: T) => boolean): Node<T>;
}

export class LinkedList<T> implements ILinkedList<T>
{
    private head: Node<T>;
    private tail: Node<T>;
    private _size: number;

    constructor()
    {
        this.head = null;
        this.tail = null;
        this._size = 0;
    }

    insertInBegin(data: T): Node<T> 
    {
        const node = new Node(data);
        if(!this.head) 
        {
            this.head = node;
            this.tail = node;
        }
        else
        {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this._size++;
        return node;
    }
    insertAtEnd(data: T): Node<T> 
    {
        const node = new Node(data);
        if(!this.head)
        {
            this.head = node;
            this.tail = node;
        }
        else
        {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this._size++;
        return node;
    }
    deleteNode(node: Node<T>): void 
    {
        // 지울 노드가 head 인 경우
        if(!node.prev)
        {
            this.head = node.next;
        }
        // 지울 노드가 tail 인 경우
        if(!node.next)
        {
            this.tail = node.prev;
        }
        // 지울 노드가 가운데 노드인 경우
        if(node.prev && node.next)
        {
            node.prev.next = node.next;
            node.next.prev = node.prev;
        }
        this._size--;
    }
    traverse(): T[] 
    {
        const array: T[] = new Array<T>();
        if (!this.head)
        {
            return array;
        }

        const addToArray = (node: Node<T>): T[] => 
        {
            array.push(node.data);
            return node !== this.tail ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
    }
    size(): number 
    {
        return this._size;
    }
    search(comparator: (data: T) => boolean): Node<T> 
    {
        const checkNext = (node: Node<T>): Node<T> =>
        {
            if(comparator(node.data)) 
            {
                return node;
            }
            return node !== this.tail ? checkNext(node.next) : null;
        }

        return this.head ? checkNext(this.head) : null;
    }
}
