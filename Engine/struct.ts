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
    
    set(v: Array<number>): Vec2
    {
        for(let i=0; i<2; i++)
        {
            this.arr[i] = v[i] !== undefined ? v[i] : this.arr[i];
        }
        return this;
    }

    mul(f: number): Vec2
    {
        for(let i=0; i<2; i++)
        {
            this.arr[i] = this.arr[i] * f;
        }
        return this;
    }

    sum(v2: Vec2): Vec2
    {
        for(let i=0; i<2; i++)
        {
            this.arr[i] += v2.v[i];
        }
        return this;
    }
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
            this.arr[i] = v[i] !== undefined ? v[i] : this.arr[i];
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

    sum(v3: Vec3): Vec3
    {
        for(let i=0; i<3; i++)
        {
            this.arr[i] += v3.v[i];
        }
        return this;
    }

    mul4x4(m4: Matrix4x4): Vec3
    {
        const v4 = new Vec4(this.v);
        v4.mulM(m4);
        this.set(v4.v);
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
            this.arr[i] = v[i] !== undefined ? v[i] : this.arr[i];
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

    mul(f: number): Vec4
    {
        for(let i=0; i<4; i++)
        {
            this.arr[i] = this.arr[i] * f;
        }
        return this;
    }

    sum(v4: Vec4): Vec4
    {
        for(let i=0; i<4; i++)
        {
            this.arr[i] += v4.v[i];
        }
        return this;
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
    
    n()
    {
        for(let i=0; i<4; i++)
        {
            this.arr[i] = this.arr[i] / this.arr[3];
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
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1
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
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1
        ]);
    }

    static yRotation(degree: number): Matrix4x4
    {
        const radian = DegreeToRadians(degree);
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return new Matrix4x4([
            c, 0, -s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        ]);
    }

    static zRotation(degree: number): Matrix4x4
    {
        const radian = DegreeToRadians(degree);
        const c = Math.cos(radian);
        const s = Math.sin(radian);
        return new Matrix4x4([
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]);
    }

    static rotation(rx: number, ry: number, rz: number): Matrix4x4
    {
        var ret = Matrix4x4.identity();
        ret.multiply(Matrix4x4.zRotation(rz));
        ret.multiply(Matrix4x4.yRotation(ry));
        ret.multiply(Matrix4x4.xRotation(rx));
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
    static orthographic(width: number, height: number, depth: number): Matrix4x4
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
            0, 0, -(near + far) * rangeInv, 1,
            0, 0, near * far * rangeInv, 0
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

    transpose(): Matrix4x4
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

    // https://github.com/gfxfundamentals/webgl-fundamentals/blob/master/webgl/resources/m4.js
    /**
     * 역행렬로 변환하는 함수
     */
    inverse(): Matrix4x4
    {
        const dst = new Array<number>(16);
        var m00 = this.arr[0 * 4 + 0];
        var m01 = this.arr[0 * 4 + 1];
        var m02 = this.arr[0 * 4 + 2];
        var m03 = this.arr[0 * 4 + 3];
        var m10 = this.arr[1 * 4 + 0];
        var m11 = this.arr[1 * 4 + 1];
        var m12 = this.arr[1 * 4 + 2];
        var m13 = this.arr[1 * 4 + 3];
        var m20 = this.arr[2 * 4 + 0];
        var m21 = this.arr[2 * 4 + 1];
        var m22 = this.arr[2 * 4 + 2];
        var m23 = this.arr[2 * 4 + 3];
        var m30 = this.arr[3 * 4 + 0];
        var m31 = this.arr[3 * 4 + 1];
        var m32 = this.arr[3 * 4 + 2];
        var m33 = this.arr[3 * 4 + 3];
        var tmp_0  = m22 * m33;
        var tmp_1  = m32 * m23;
        var tmp_2  = m12 * m33;
        var tmp_3  = m32 * m13;
        var tmp_4  = m12 * m23;
        var tmp_5  = m22 * m13;
        var tmp_6  = m02 * m33;
        var tmp_7  = m32 * m03;
        var tmp_8  = m02 * m23;
        var tmp_9  = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;

        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        dst[0] = d * t0;
        dst[1] = d * t1;
        dst[2] = d * t2;
        dst[3] = d * t3;
        dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
            (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
            (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
            (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
            (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
            (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
            (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
            (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
            (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
            (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
            (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
            (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
            (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

        this.arr = dst;
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
