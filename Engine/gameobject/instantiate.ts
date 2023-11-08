import { Camera, OrthographicCamera, PerspectiveCamera } from "../component/Camera.js";
import { Material } from "../component/Material.js";
import { Mesh } from "../component/Mesh.js";
import { Transform } from "../component/Transform.js";
import { ModelCreator } from "../module/modelCreator.js";
import { GameObject } from "./gameobject.js";

export function InstantiateBox(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    const mesh = new Mesh();
    const material = new Material();
    obj.AddComponent(transform, Transform);
    obj.AddComponent(mesh, Mesh);
    obj.AddComponent(material, Material);
    material.albedo.y = 0;
    mesh.poly = ModelCreator.getCube();
    return obj;
}

export function InstantiateCamera(): GameObject
{
    const obj = new GameObject();
    const transform = new Transform();
    transform.position.z = -10;
    const camera: Camera = new PerspectiveCamera();
    obj.AddComponent(transform, Transform);
    obj.AddComponent(camera, Camera);
    return obj;
}