
export class Vec2 
{
    
} 



interface ILinkedList<T>
{
    insertInBegin(data: T): Node<T>;
    insertAtEnd(data: T): Node<T>;
    deleteNode(data: T): void;
    traverse(): T[];
    size(): number;
    search(comparator: (data: T) => boolean): Node<T>;
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