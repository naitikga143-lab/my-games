(function(){
  const ANIMALS = [];
  let distanceSinceLast = 0;
  const SPAWN_DISTANCE = 55;   // kitni world-distance baad next animal spawn ho
  const CROSS_DURATION = 1.1;  // seconds mein road kitni jaldi cross karega

  function buildAnimal(type){
    const group = new THREE.Group();
    let color, size;
    if (type === 'cow'){ color = 0xf5f5f0; size = [1.1, 0.9, 1.8]; }
    else if (type === 'dog'){ color = 0x8b5a2b; size = [0.5, 0.5, 1.0]; }
    else { color = 0x555555; size = [0.35, 0.35, 0.7]; } // cat

    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.85 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(size[0], size[1], size[2]), mat);
    body.position.y = size[1]/2 + 0.3;
    body.castShadow = true;
    group.add(body);

    const legMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const legGeo = new THREE.CylinderGeometry(size[0]*0.08, size[0]*0.08, 0.5, 6);
    [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(([sx,sz])=>{
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(sx*size[0]*0.35, 0.25, sz*size[2]*0.35);
      group.add(leg);
    });

    const head = new THREE.Mesh(new THREE.BoxGeometry(size[0]*0.6, size[0]*0.6, size[0]*0.6), mat);
    head.position.set(0, size[1]+0.35, -size[2]/2-0.15);
    group.add(head);

    return group;
  }

  function spawn(){
    const types = ['cow','dog','cat'];
    const type = types[Math.floor(Math.random()*types.length)];
    const fromLeft = Math.random() < 0.5;
    const ROAD_WIDTH = window.SBR.ROAD_WIDTH;
    const startX = fromLeft ? -(ROAD_WIDTH/2 + 3) : (ROAD_WIDTH/2 + 3);
    const endX = fromLeft ? (ROAD_WIDTH/2 + 3) : -(ROAD_WIDTH/2 + 3);
    const spawnZ = -55 - Math.random()*15;

    const mesh = buildAnimal(type);
    mesh.position.set(startX, 0, spawnZ);
    window.SBR.scene.add(mesh);
    ANIMALS.push({ mesh, startX, endX, t: 0 });
  }

  function reset(){
    ANIMALS.forEach(a => window.SBR.scene.remove(a.mesh));
    ANIMALS.length = 0;
    distanceSinceLast = 0;
  }

  function update(dt, move){
    distanceSinceLast += move;
    if (distanceSinceLast > SPAWN_DISTANCE){
      distanceSinceLast = 0;
      spawn();
    }

    for (let i = ANIMALS.length - 1; i >= 0; i--){
      const a = ANIMALS[i];
      a.mesh.position.z += move;
      a.t += (dt/60) / CROSS_DURATION;
      const progress = Math.min(1, a.t);
      a.mesh.position.x = a.startX + (a.endX - a.startX) * progress;

      if (a.mesh.position.z > 15){
        window.SBR.scene.remove(a.mesh);
        ANIMALS.splice(i, 1);
      }
    }
  }

  function checkCollision(playerX){
    for (const a of ANIMALS){
      if (Math.abs(a.mesh.position.z) < 1.6 && Math.abs(a.mesh.position.x - playerX) < 1.0) return true;
    }
    return false;
  }

  window.SBRAnimals = { reset, update, checkCollision };
})();