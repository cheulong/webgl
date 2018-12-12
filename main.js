function init() {
  var stats = initStats();
  //Scene
  var scene = new THREE.Scene();
  // // Add fog dentity from near to far
  // scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  //Add fog equal dentity
  // scene.fog = new THREE.FogExp2(0xffffff, 0.01);
  // //Add overrideMaterial
  // scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  //Camera
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  var controls = new THREE.OrbitControls(camera);
  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  //Render
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  // //Add axes
  var axes = new THREE.AxesHelper(20);
  scene.add(axes);

  // add subtle ambient lighting
  var ambiColor = "#0c0c0c";
  var ambientLight = new THREE.AmbientLight(ambiColor);
  scene.add(ambientLight);

  // add a small sphere simulating the pointlight
  var sphereLight = new THREE.SphereGeometry(0.2);
  var sphereLightMaterial = new THREE.MeshBasicMaterial({ color: 0xac6c25 });
  var sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
  sphereLightMesh.castShadow = true;

  sphereLightMesh.position.set(0, 10, 0);
  scene.add(sphereLightMesh);

  // add point lighting
  var pointDistance = 10;
  var pointIntensity = 0.4;
  var pointColor = "#FFFFFF";
  var pointLight = new THREE.PointLight(
    pointColor,
    pointIntensity,
    pointDistance
  );
  pointLight.position.set(-40, 60, -10);
  scene.add(pointLight);

  //Add SpotLight
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.shadowCameraVisible = true;
  spotLight.shadow.mapSize.x = 4096; // default
  spotLight.shadow.mapSize.y = 4096; // default
  spotLight.shadow.camera.near = 0.5; // default
  spotLight.shadow.camera.far = 500;
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  //Add Plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshPhongMaterial({ color: 0xcccccc });
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;
  scene.add(plane);

  //Add Cube
  var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    wireframe: false
  });
  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.name = "cube-1";
  cube.castShadow = true;
  cube.position.x = -4;
  cube.position.y = 3;
  cube.position.z = 10;
  scene.add(cube);

  //Add Sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff
  });

  var material2 = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });

  var sphere = new THREE.Mesh(sphereGeometry, [sphereMaterial, material2]);
  sphere.castShadow = true;
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  scene.add(sphere);

  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  //Add GUI
  var controls = new function() {
    this.ambientColor = ambiColor;
    this.disableAmbientColor = false;
    this.pointDistance = 10;
    this.pointIntensity = 0.4;
    this.pointColor = "#FFFFFF";
    this.disablePointLight = false;
    this.positionX = 0;
    this.positionY = 10;
    this.positionZ = 0;
    this.shadowWidth = 512; // default
    this.shadowHeight = 512; // default
    this.shadowNear = 0.5; // default
    this.shadowFar = 500;
  }();

  var gui = new dat.GUI();

  guiAmbient = gui.addFolder("Ambient");
  guiAmbient.addColor(controls, "ambientColor").onChange(function(e) {
    ambientLight.color = new THREE.Color(e);
  });
  guiAmbient.add(controls, "disableAmbientColor").onChange(function(e) {
    ambientLight.visible = !e;
  });

  guiPoint = gui.addFolder("PointLight");
  guiPoint.addColor(controls, "pointColor").onChange(function(e) {
    pointLight.color = new THREE.Color(e);
  });
  guiPoint.add(controls, "pointIntensity", 0, 3).onChange(function(e) {
    pointLight.intensity = e;
  });
  guiPoint.add(controls, "pointDistance", 0, 100).onChange(function(e) {
    pointLight.distance = e;
  });
  guiPoint.add(controls, "disablePointLight").onChange(function(e) {
    pointLight.visible = !e;
  });
  guiPoint.add(controls, "positionX", 0, 100).onChange(function(e) {
    pointLight.position.x = e;
    sphereLightMesh.position.x = e;
  });
  guiPoint.add(controls, "positionY", 0, 100).onChange(function(e) {
    pointLight.position.y = e;
    sphereLightMesh.position.y = e;
  });
  guiPoint.add(controls, "positionZ", 0, 100).onChange(function(e) {
    pointLight.position.z = e;
    sphereLightMesh.position.z = e;
  });

  guiSpot = gui.addFolder("SpotLight");
  guiSpot.add(controls, "shadowWidth", 0, 4096).onChange(function(e) {
    spotLight.shadow.mapSize.x = e;
  });
  guiSpot.add(controls, "shadowHeight", 0, 4096).onChange(function(e) {
    spotLight.shadow.mapSize.y = e;
  });
  guiSpot.add(controls, "shadowNear", 0, 30).onChange(function(e) {
    spotLight.shadow.camera.near = e;
  });
  guiSpot.add(controls, "shadowFar", 30, 1000).onChange(function(e) {
    spotLight.shadow.camera.far = e;
  });

  animate();

  function initStats() {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.getElementById("Stats-output").appendChild(stats.domElement);
    return stats;
  }

  //OnResize
  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    stats.update();

    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;
    sphere.rotation.y += 0.02;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // listen to the resize events
  window.addEventListener("resize", onResize, false);
}

window.onload = init;
