function init() {
  var stats = initStats();
  //Scene
  var scene = new THREE.Scene();
  // // Add fog dentity from near to far
  // scene.fog = new THREE.Fog(0xffffff, 0.015, 100);
  //Add fog equal dentity
  scene.fog = new THREE.FogExp2(0xffffff, 0.01);
  // //Add overrideMaterial
  // scene.overrideMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  //Camera
  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.x = -30;
  camera.position.y = 40;
  camera.position.z = 30;
  camera.lookAt(scene.position);

  //Render
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(new THREE.Color(0xeeeeee));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMapEnabled = true;

  // //Add axes
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  // add subtle ambient lighting
  var ambientLight = new THREE.AmbientLight(0x000000);
  scene.add(ambientLight);

  //Add SpotLight
  var spotLight = new THREE.SpotLight(0xffffff);
  spotLight.castShadow = true;
  spotLight.position.set(-40, 60, -10);
  scene.add(spotLight);

  //Add Plane
  var planeGeometry = new THREE.PlaneGeometry(60, 20);
  var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
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
  cube.position.z = 0;
  scene.add(cube);

  //Add Sphere
  var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
    wireframe: false
  });
  var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.castShadow = true;
  sphere.position.x = 20;
  sphere.position.y = 4;
  sphere.position.z = 2;
  scene.add(sphere);

  document.getElementById("WebGL-output").appendChild(renderer.domElement);

  //Add GUI
  var controls = new function() {
    this.rotationSpeed = 0.02;
    this.positionX = -4;
    this.positionY = 3;
    this.positionZ = 0;
  }();

  var gui = new dat.GUI();
  gui.add(controls, "rotationSpeed", 0, 0.5);
  guiPosition = gui.addFolder("cubepositon");
  guiPosition.add(controls, "positionX", -4, 4);
  guiPosition.add(controls, "positionY", -4, 4);
  guiPosition.add(controls, "positionZ", -4, 4);
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

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;
    cube.position.x = controls.positionX;
    cube.position.y = controls.positionY;
    cube.position.z = controls.positionZ;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  // listen to the resize events
  window.addEventListener("resize", onResize, false);
}

window.onload = init;
