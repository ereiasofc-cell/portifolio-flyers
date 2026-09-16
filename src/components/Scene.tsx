import {useEffect,useRef} from 'react'
import * as THREE from 'three'

export function Scene(){
  const host=useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if(!host.current||matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const el=host.current, scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(55,1,.1,100)
    camera.position.z=6
    const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'})
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));el.appendChild(renderer.domElement)
    const geometry=new THREE.BufferGeometry(),count=900,positions=new Float32Array(count*3)
    for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*12;positions[i*3+1]=(Math.random()-.5)*8;positions[i*3+2]=(Math.random()-.5)*6}
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
    const points=new THREE.Points(geometry,new THREE.PointsMaterial({color:0x5b7cfa,size:.018,transparent:true,opacity:.75}))
    scene.add(points)
    let mx=0,my=0,frame=0
    const pointer=(e:PointerEvent)=>{mx=(e.clientX/innerWidth-.5)*.45;my=(e.clientY/innerHeight-.5)*.3}
    const resize=()=>{const w=el.clientWidth,h=el.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
    const draw=()=>{points.rotation.y+=(mx-points.rotation.y)*.015;points.rotation.x+=(-my-points.rotation.x)*.015;points.rotation.z+=.00035;renderer.render(scene,camera);frame=requestAnimationFrame(draw)}
    addEventListener('pointermove',pointer,{passive:true});addEventListener('resize',resize);resize();draw()
    return()=>{cancelAnimationFrame(frame);removeEventListener('pointermove',pointer);removeEventListener('resize',resize);geometry.dispose();(points.material as THREE.Material).dispose();renderer.dispose();renderer.domElement.remove()}
  },[])
  return <div ref={host} className="scene" aria-hidden="true"/>
}
