(function(){
  // ---------- Setup ----------
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffdcb0, 20, 140);

  const camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 500);
  const baseCamY = 6;
  camera.position.set(0, baseCamY, 11);
  camera.lookAt(0,0,-10);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  document.body.appendChild(renderer.domElement);

  // ---------- Gradient sunset sky ----------
  const skyGeo = new THREE.SphereGeometry(400, 32, 32);
  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(0xaeccff) },
      bottomColor: { value: new THREE.Color(0xffd9a0) },
      offset: { value: 15 },
      exponent: { value: 0.65 }
    },
    vertexShader: `
      varying vec3 vWorldPosition;
      void main(){
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 bottomColor;
      uniform float offset;
      uniform float exponent;
      varying vec3 vWorldPosition;
      void main(){
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        gl_FragColor = vec4(mix(bottomColor, topColor, max(pow(max(h, 0.0), exponent), 0.0)), 1.0);
      }
    `,
    side: THREE.BackSide
  });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  scene.add(sky);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    bloomComposer.setSize(window.innerWidth, window.innerHeight);
    finalComposer.setSize(window.innerWidth, window.innerHeight);
  });

  // ---------- Lights (warm sun + cool fill, sunset mood) ----------
  const hemi = new THREE.HemisphereLight(0xfff0d9, 0xb9cfe0, 1.0);
  scene.add(hemi);

  const sun = new THREE.DirectionalLight(0xffdcb0, 1.15);
  sun.position.set(6, 18, 8);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 60;
  sun.shadow.camera.left = -20;
  sun.shadow.camera.right = 20;
  sun.shadow.camera.top = 20;
  sun.shadow.camera.bottom = -20;
  sun.shadow.bias = -0.0015;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xaad4ff, 0.35);
  fill.position.set(-8, 10, -6);
  scene.add(fill);

  // ---------- Road ----------
  const ROAD_WIDTH = 10;
  const LANE_COUNT = 3;
  const laneX = i => (i - 1) * (ROAD_WIDTH/LANE_COUNT);

  const roadGeo = new THREE.PlaneGeometry(ROAD_WIDTH, 400);
  const roadMat = new THREE.MeshStandardMaterial({ color: 0xe8f1f7, roughness: 0.55, metalness: 0.08 });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.rotation.x = -Math.PI/2;
  road.position.z = -150;
  road.receiveShadow = true;
  scene.add(road);

  // side snowfields
  [-1,1].forEach(side => {
    const g = new THREE.Mesh(new THREE.PlaneGeometry(60, 400), new THREE.MeshStandardMaterial({color:0xf3f8fb, roughness:1}));
    g.rotation.x = -Math.PI/2;
    g.position.set(side*(ROAD_WIDTH/2+30), -0.01, -150);
    g.receiveShadow = true;
    scene.add(g);
  });

  // snowy pine trees lining the road
  function buildPine(){
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.15,0.2,1,8), new THREE.MeshStandardMaterial({color:0x4a3728}));
    trunk.position.y = 0.5;
    trunk.castShadow = true;
    tree.add(trunk);
    const tiers = 3;
    for (let i=0;i<tiers;i++){
      const h = 1.4 - i*0.25;
      const r = 1.2 - i*0.3;
      const cone = new THREE.Mesh(new THREE.ConeGeometry(r, h, 10), new THREE.MeshStandardMaterial({color:0x2f5233}));
      cone.position.y = 1 + i*0.9;
      cone.castShadow = true;
      tree.add(cone);
      const snowCap = new THREE.Mesh(new THREE.ConeGeometry(r*0.7, h*0.35, 10), new THREE.MeshStandardMaterial({color:0xffffff}));
      snowCap.position.y = 1 + i*0.9 + h*0.32;
      tree.add(snowCap);
    }
    return tree;
  }
  [-1,1].forEach(side=>{
    for (let z=10; z>-380; z-=(8+Math.random()*10)){
      const t = buildPine();
      const scale = 0.8 + Math.random()*0.9;
      t.scale.set(scale,scale,scale);
      t.position.set(side*(ROAD_WIDTH/2 + 4 + Math.random()*14), 0, z);
      scene.add(t);
    }
  });

  // falling snow particles
  const SNOW_COUNT = 700;
  const snowPositions = new Float32Array(SNOW_COUNT*3);
  for (let i=0;i<SNOW_COUNT;i++){
    snowPositions[i*3] = (Math.random()-0.5)*80;
    snowPositions[i*3+1] = Math.random()*40;
    snowPositions[i*3+2] = -Math.random()*170 + 10;
  }
  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(snowPositions, 3));
  const snowMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.16, transparent:true, opacity:0.9 });
  const snowParticles = new THREE.Points(snowGeo, snowMat);
  scene.add(snowParticles);

  // lane markings (dashed, scrolling)
  const dashes = [];
  for (let i=0;i<40;i++){
    const dash = new THREE.Mesh(new THREE.PlaneGeometry(0.25, 3), new THREE.MeshBasicMaterial({color:0xff7a1a}));
    dash.rotation.x = -Math.PI/2;
    dash.position.set(-ROAD_WIDTH/6, 0.01, -i*10);
    scene.add(dash);
    const dash2 = dash.clone();
    dash2.position.x = ROAD_WIDTH/6;
    scene.add(dash2);
    dashes.push(dash, dash2);
  }

  // road edge glow strips
  [-ROAD_WIDTH/2, ROAD_WIDTH/2].forEach(x=>{
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 400), new THREE.MeshBasicMaterial({color:0xff5566}));
    strip.rotation.x = -Math.PI/2;
    strip.position.set(x, 0.02, -150);
    scene.add(strip);
  });

  // ---------- Bloom layer setup ----------
  const BLOOM_SCENE = 1;
  const bloomLayer = new THREE.Layers();
  bloomLayer.set(BLOOM_SCENE);
  const darkMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const materialCache = {};

  function darkenNonBloomed(obj){
    if (obj.isMesh && bloomLayer.test(obj.layers) === false){
      materialCache[obj.uuid] = obj.material;
      obj.material = darkMaterial;
    }
  }
  function restoreMaterial(obj){
    if (materialCache[obj.uuid]){
      obj.material = materialCache[obj.uuid];
      delete materialCache[obj.uuid];
    }
  }

  // ---------- Player bike builder ----------
  function buildCar(bodyColor){
    const bike = new THREE.Group();
    const bodyMat = new THREE.MeshStandardMaterial({ color: bodyColor, metalness:0.6, roughness:0.25 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness:0.4, roughness:0.5 });

    const wheelGeo = new THREE.CylinderGeometry(0.42,0.42,0.28,20);
    const wheelMat = new THREE.MeshStandardMaterial({color:0x0d0d0d, roughness:0.8});
    const frontWheel = new THREE.Mesh(wheelGeo, wheelMat);
    frontWheel.rotation.z = Math.PI/2;
    frontWheel.position.set(0, 0.42, -1.35);
    frontWheel.castShadow = true;
    bike.add(frontWheel);
    const rearWheel = frontWheel.clone();
    rearWheel.position.z = 1.15;
    bike.add(rearWheel);

    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.45, 1.9), bodyMat);
    frame.position.set(0, 0.68, -0.1);
    frame.castShadow = true;
    bike.add(frame);

    const fork = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), darkMat);
    fork.position.set(0, 0.55, -1.15);
    fork.rotation.x = -0.25;
    bike.add(fork);

    const handlebar = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.08, 0.08), darkMat);
    handlebar.position.set(0, 1.05, -1.25);
    bike.add(handlebar);

    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.14, 0.6), darkMat);
    seat.position.set(0, 0.92, 0.55);
    bike.add(seat);

    const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.26,0.75,10), bodyMat);
    torso.position.set(0, 1.28, 0.15);
    torso.rotation.x = -0.35;
    torso.castShadow = true;
    bike.add(torso);
    const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.22,14,14), darkMat);
    helmet.position.set(0, 1.62, -0.3);
    helmet.castShadow = true;
    bike.add(helmet);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.18,12,12), new THREE.MeshStandardMaterial({color:0x88ccff, metalness:0.8, roughness:0.1}));
    visor.position.set(0, 1.6, -0.42);
    bike.add(visor);

    // bright headlight — this glows (bloom layer)
    const light = new THREE.Mesh(new THREE.BoxGeometry(0.22,0.16,0.08), new THREE.MeshBasicMaterial({color:0xffffe0}));
    light.position.set(0, 0.78, -1.78);
    light.layers.enable(BLOOM_SCENE);
    bike.add(light);

    return bike;
  }

  const player = buildCar(0xff3b3b);
  scene.add(player);

  let playerLane = 1;
  let playerX = laneX(playerLane);
  let targetX = playerX;

  // ---------- Obstacles / traffic ----------
  const obstacles = [];
  const obstacleColors = [0x3b82f6, 0x22c55e, 0xf59e0b, 0xa855f7];
  function spawnObstacle(z){
    const lane = Math.floor(Math.random()*LANE_COUNT);
    const color = obstacleColors[Math.floor(Math.random()*obstacleColors.length)];
    const car = buildCar(color);
    car.position.set(laneX(lane), 0, z);
    scene.add(car);
    obstacles.push({ mesh: car, lane });
  }

  // ---------- Boosts (glowing rings — bloom layer) ----------
  const boosts = [];
  function spawnBoost(z){
    const lane = Math.floor(Math.random()*LANE_COUNT);
    const geo = new THREE.TorusGeometry(0.55, 0.18, 12, 24);
    const mat = new THREE.MeshStandardMaterial({ color:0xffd23f, emissive:0xff9900, emissiveIntensity:1.0, metalness:0.6, roughness:0.2 });
    const ring = new THREE.Mesh(geo, mat);
    ring.position.set(laneX(lane), 1, z);
    ring.rotation.x = Math.PI/2;
    ring.layers.enable(BLOOM_SCENE);
    scene.add(ring);
    boosts.push({ mesh: ring, lane });
  }

  function seedTrack(){
    for (let z=-40; z>-380; z-=(14+Math.random()*10)){
      if (Math.random() < 0.25) spawnBoost(z);
      else spawnObstacle(z);
    }
  }

  // ---------- Boost pickup particle burst ----------
  const bursts = [];
  function spawnBurst(pos){
    const count = 24;
    const positions = new Float32Array(count*3);
    const velocities = [];
    for (let i=0;i<count;i++){
      positions[i*3] = pos.x;
      positions[i*3+1] = pos.y;
      positions[i*3+2] = pos.z;
      const theta = Math.random()*Math.PI*2;
      const phi = Math.random()*Math.PI;
      const spd = 0.05 + Math.random()*0.08;
      velocities.push({
        x: Math.sin(phi)*Math.cos(theta)*spd,
        y: Math.cos(phi)*spd + 0.04,
        z: Math.sin(phi)*Math.sin(theta)*spd
      });
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({ color: 0xffd23f, size: 0.18, transparent: true, opacity: 1 });
    const pts = new THREE.Points(geo, mat);
    pts.layers.enable(BLOOM_SCENE);
    scene.add(pts);
    bursts.push({ pts, velocities, life: 0 });
  }

  // ---------- Game state ----------
  let running = false;
  let speed = 0.28;
  const maxSpeed = 0.85;
  const minSpeed = 0.2;
  let score = 0;
  let shakeTime = 0;
  let shakeMag = 0;

  const keys = {};
  window.addEventListener('keydown', e=>{ keys[e.key.toLowerCase()] = true; handleKeyLane(e.key.toLowerCase()); });
  window.addEventListener('keyup', e=>{ keys[e.key.toLowerCase()] = false; });

  function handleKeyLane(k){
    if (!running) return;
    if (k === 'arrowleft' || k === 'a') moveLane(-1);
    if (k === 'arrowright' || k === 'd') moveLane(1);
  }
  function moveLane(dir){
    playerLane = Math.max(0, Math.min(LANE_COUNT-1, playerLane + dir));
    targetX = laneX(playerLane);
  }

  // touch controls
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');
  const btnGas = document.getElementById('btn-gas');
  const btnBrake = document.getElementById('btn-brake');
  let gasHeld = false, brakeHeld = false;
  function bindTap(el, downFn, upFn){
    el.addEventListener('touchstart', e=>{ e.preventDefault(); downFn(); }, {passive:false});
    el.addEventListener('touchend', e=>{ e.preventDefault(); if(upFn) upFn(); }, {passive:false});
    el.addEventListener('mousedown', downFn);
    window.addEventListener('mouseup', ()=>{ if(upFn) upFn(); });
    el.addEventListener('mouseleave', ()=>{ if(upFn) upFn(); });
  }
  bindTap(btnLeft, ()=>moveLane(-1));
  bindTap(btnRight, ()=>moveLane(1));
  bindTap(btnGas, ()=>gasHeld=true, ()=>gasHeld=false);
  bindTap(btnBrake, ()=>brakeHeld=true, ()=>brakeHeld=false);

  let touchStartX = null;
  renderer.domElement.addEventListener('touchstart', e=>{ touchStartX = e.touches[0].clientX; });
  renderer.domElement.addEventListener('touchend', e=>{
    if (touchStartX===null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) moveLane(dx > 0 ? 1 : -1);
    touchStartX = null;
  });

  // ---------- UI wiring ----------
  const startscreen = document.getElementById('startscreen');
  const gameover = document.getElementById('gameover');
  const scoreVal = document.getElementById('score-val');
  const speedVal = document.getElementById('speed-val');
  const finalScore = document.getElementById('final-score');
  const controlsBar = document.getElementById('controls');

  function isTouchDevice(){ return ('ontouchstart' in window) || navigator.maxTouchPoints > 0; }
  if (isTouchDevice()) controlsBar.style.display = 'flex';

  let paused = false;
  const pauseBox = document.getElementById('pause-box');
  const pausescreen = document.getElementById('pausescreen');
  const resumeBtn = document.getElementById('resume-btn');

  function togglePause(){
    if (!running) return;
    paused = !paused;
    document.getElementById('center-msg').style.display = paused ? 'block' : 'none';
    pausescreen.style.display = paused ? 'block' : 'none';
    pauseBox.textContent = paused ? '▶️' : '⏸️';
  }
  pauseBox.addEventListener('click', togglePause);
  resumeBtn.addEventListener('click', togglePause);
  document.getElementById('restart-btn').addEventListener('click', ()=>{
    paused = false;
    pausescreen.style.display = 'none';
    pauseBox.textContent = '⏸';
    startGame();
  });
  window.addEventListener('keydown', e=>{ if(e.key.toLowerCase()==='p') togglePause(); });

  function startGame(){
    obstacles.forEach(o=>scene.remove(o.mesh)); obstacles.length = 0;
    boosts.forEach(b=>scene.remove(b.mesh)); boosts.length = 0;
    bursts.forEach(b=>scene.remove(b.pts)); bursts.length = 0;
    seedTrack();
    playerLane = 1; playerX = laneX(1); targetX = playerX;
    player.position.set(playerX, 0, 0);
    score = 0; speed = 0.28;
    shakeTime = 0; shakeMag = 0;
    scoreVal.textContent = '0';
    startscreen.style.display = 'none';
    document.getElementById('center-msg').style.display = 'none';
    running = true;
  }

  document.getElementById('tapstart').addEventListener('click', startGame);
  document.getElementById('tapstart2').addEventListener('click', startGame);

  function endGame(){
    running = false;
    shakeTime = 22;
    shakeMag = 0.55;
    finalScore.textContent = Math.floor(score);
    startscreen.style.display = 'none';
    gameover.style.display = 'block';
    document.getElementById('center-msg').style.display = 'block';
  }

  // ---------- Selective bloom postprocessing ----------
  const renderScene = new THREE.RenderPass(scene, camera);

  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 0.9, 0.4, 0.15
  );
  bloomPass.threshold = 0.15;
  bloomPass.strength = 0.9;
  bloomPass.radius = 0.4;

  const bloomComposer = new THREE.EffectComposer(renderer);
  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderScene);
  bloomComposer.addPass(bloomPass);

  const mixPass = new THREE.ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D baseTexture;
        uniform sampler2D bloomTexture;
        varying vec2 vUv;
        void main(){
          gl_FragColor = texture2D(baseTexture, vUv) + vec4(1.0) * texture2D(bloomTexture, vUv);
        }
      `
    }), 'baseTexture'
  );
  mixPass.needsSwap = true;

  const outputPass = new THREE.ShaderPass(THREE.CopyShader);
  outputPass.renderToScreen = true;

  const finalComposer = new THREE.EffectComposer(renderer);
  finalComposer.addPass(renderScene);
  finalComposer.addPass(mixPass);
  finalComposer.addPass(outputPass);

  // ---------- Main loop ----------
  const clock = new THREE.Clock();

  function animate(){
    requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05) * 60;

    if (running && !paused){
      if (keys['arrowup'] || keys['w'] || gasHeld) speed = Math.min(maxSpeed, speed + 0.006*dt);
      else if (keys['arrowdown'] || keys['s'] || brakeHeld) speed = Math.max(minSpeed*0.6, speed - 0.012*dt);
      else speed = Math.max(minSpeed, speed - 0.002*dt);

      speed = Math.min(speed + 0.00006*dt, maxSpeed + score*0.00003);

      playerX += (targetX - playerX) * Math.min(1, 0.18*dt);
      player.position.x = playerX;
      player.rotation.z = (targetX - playerX) * 0.4;
      player.rotation.y = Math.sin(performance.now()*0.002)*0.01;

      const move = speed*dt;
      obstacles.forEach(o=>{ o.mesh.position.z += move; });
      boosts.forEach(b=>{ b.mesh.position.z += move; b.mesh.rotation.z += 0.05*dt; });
      dashes.forEach(d=>{
        d.position.z += move;
        if (d.position.z > 10) d.position.z -= 400;
      });

      obstacles.forEach(o=>{
        if (o.mesh.position.z > 15){
          o.mesh.position.z -= 380 + Math.random()*40;
          o.lane = Math.floor(Math.random()*LANE_COUNT);
          o.mesh.position.x = laneX(o.lane);
        }
      });
      boosts.forEach(b=>{
        if (b.mesh.position.z > 15){
          b.mesh.position.z -= 380 + Math.random()*40;
          b.lane = Math.floor(Math.random()*LANE_COUNT);
          b.mesh.position.x = laneX(b.lane);
        }
      });

      for (const o of obstacles){
        if (Math.abs(o.mesh.position.z) < 1.6 && Math.abs(o.mesh.position.x - player.position.x) < 0.95){
          endGame();
          break;
        }
      }
      for (const b of boosts){
        if (Math.abs(b.mesh.position.z) < 1.6 && Math.abs(b.mesh.position.x - player.position.x) < 1.0){
          score += 50;
          spawnBurst(b.mesh.position.clone());
          b.mesh.position.z -= 380;
          b.lane = Math.floor(Math.random()*LANE_COUNT);
          b.mesh.position.x = laneX(b.lane);
        }
      }

      score += speed*dt*0.6;
      scoreVal.textContent = Math.floor(score);
      speedVal.textContent = Math.floor(speed*220);
    }

    for (let i=bursts.length-1;i>=0;i--){
      const b = bursts[i];
      b.life += dt;
      const arr = b.pts.geometry.attributes.position.array;
      for (let j=0;j<b.velocities.length;j++){
        arr[j*3] += b.velocities[j].x*dt;
        arr[j*3+1] += b.velocities[j].y*dt;
        arr[j*3+2] += b.velocities[j].z*dt;
        b.velocities[j].y -= 0.004*dt;
      }
      b.pts.geometry.attributes.position.needsUpdate = true;
      b.pts.material.opacity = Math.max(0, 1 - b.life/30);
      if (b.life > 30){
        scene.remove(b.pts);
        bursts.splice(i,1);
      }
    }

    const sp = snowParticles.geometry.attributes.position.array;
    const drift = running ? speed*dt : 0.2*dt;
    for (let i=0;i<SNOW_COUNT;i++){
      sp[i*3+1] -= 0.09*dt;
      sp[i*3+2] += drift;
      if (sp[i*3+1] < 0){ sp[i*3+1] = 40; }
      if (sp[i*3+2] > 20){ sp[i*3+2] -= 190; }
    }
    snowParticles.geometry.attributes.position.needsUpdate = true;

    const speedShake = running ? (speed/maxSpeed)*0.02 : 0;
    let shakeX = 0, shakeY = 0;
    if (shakeTime > 0){
      shakeTime -= dt;
      shakeX = (Math.random()-0.5)*shakeMag;
      shakeY = (Math.random()-0.5)*shakeMag;
      shakeMag *= 0.9;
    }
    camera.position.x += (player.position.x*0.5 - camera.position.x) * 0.05 + shakeX + (Math.random()-0.5)*speedShake;
    camera.position.y = baseCamY + shakeY + (Math.random()-0.5)*speedShake*0.5;
    camera.lookAt(player.position.x*0.5, 0.5, -12);

    // ---------- Selective bloom render (only bloom-layer objects glow) ----------
    scene.traverse(darkenNonBloomed);
    bloomComposer.render();
    scene.traverse(restoreMaterial);
    finalComposer.render();
  }

  animate();
})();