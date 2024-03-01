import { Camera, OrthographicCamera, PerspectiveCamera } from "../component/Camera.js";
import { Material } from "../component/Material.js";
import { Mesh } from "../component/Mesh.js";
import { Sprite } from "../component/Sprite.js";
import { Transform } from "../component/Transform.js";
import { RendererManager } from "../manager/RendererManager.js";
import { ModelCreator } from "../module/modelCreator.js";
import { SimpleRenderer } from "../renderer/SimpleRenderer.js";
import { SpriteRenderer } from "../renderer/SpriteRenderer.js";
import { GameObject } from "./gameobject.js";

export function InstantiateEmpty(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    obj.AddComponent(transform, Transform);
    return obj;
}

export function InstantiateBox(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    const mesh = new Mesh();
    const material = new Material();
    obj.AddComponent(transform, Transform);
    obj.AddComponent(mesh, Mesh);
    obj.AddComponent(material, Material);
    obj.SetRenderer(RendererManager.instance.FindRenderer(SimpleRenderer));
    obj.name = "BOX";
    material.albedo.y = 0;
    transform.scale.mul(3);
    mesh.poly = ModelCreator.getCube();
    return obj;
}

export function InstantiateCamera(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    //transform.position.z = 10;
    //transform.scale.z = 1;
    //const camera: Camera = new PerspectiveCamera();
    const camera: Camera = new OrthographicCamera();
    obj.AddComponent(transform, Transform);
    obj.AddComponent(camera, Camera);
    obj.name = "CAMERA";
    return obj;
}

export function InstantiateCoord(): GameObject
{
    const obj = InstantiateEmpty();
    const x = InstantiateBox();
    x.GetComponent(Transform).scale.set([2, 0.2, 0.2]);
    x.GetComponent(Material).albedo.set([1, 0, 0, 1]);
    const y = InstantiateBox();
    y.GetComponent(Transform).scale.set([0.2, 2, 0.2]);
    y.GetComponent(Material).albedo.set([0, 1, 0, 1]);
    const z = InstantiateBox();
    z.GetComponent(Transform).scale.set([0.2, 0.2, 2]);
    z.GetComponent(Material).albedo.set([0, 0, 1, 1]);
    obj.AddChild(x);
    obj.AddChild(y);
    obj.AddChild(z);
    obj.name = "COORD";
    return obj;
}

export function InstantiateSprite(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    const mesh = new Mesh();
    const material = new Material();
    const sprite = new Sprite();
    obj.AddComponent(transform, Transform);
    obj.AddComponent(mesh, Mesh);
    obj.AddComponent(material, Material);
    obj.AddComponent(sprite, Sprite);
    obj.SetRenderer(RendererManager.instance.FindRenderer(SpriteRenderer));
    obj.name = "SPRITE";
    material.albedo.y = 0;
    transform.scale.mul(100);
    mesh.poly = ModelCreator.getSpriteGeometry();
    mesh.indices = ModelCreator.getSpriteIndices();
    return obj;
}