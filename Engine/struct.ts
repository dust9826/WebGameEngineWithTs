
export class Vec2 
{
    
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
