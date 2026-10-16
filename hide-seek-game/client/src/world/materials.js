import * as THREE from 'three';

const lam = (c) => new THREE.MeshLambertMaterial({ color: c });

export const mats = {
  floor: lam(0x4a3220),
  slab: lam(0x5a3d25),
  plank: lam(0x6e4b2f),
  post: lam(0x35200f),
  ceiling: lam(0x241608),
  stairs: lam(0x7a5535),
  rail: lam(0x3f2a16),
  wood: lam(0x8b5a2b),
  woodDark: lam(0x4e3018),
  metal: lam(0x4f5a63),
  door: lam(0x5c3a1e),
  trim: lam(0x2a1c10),
  btnRed: lam(0xc0392b),
  btnYellow: lam(0xd4ac0d),
  screen: new THREE.MeshBasicMaterial({ color: 0x7dffb0 }),
  paper: new THREE.MeshBasicMaterial({ color: 0xffc35c }),
};