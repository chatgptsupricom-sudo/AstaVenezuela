// three no trae tipos propios y @types/three no está instalado. Lo declaramos
// como `any` para que `tsc` pase sin `ignoreBuildErrors`.
// ponytail: sin tipado de three; instala @types/three si se toca MascotScene.
declare module "three";
