<script>
    import { onMount, onDestroy } from 'svelte';
    import * as THREE from 'three';
    import codeImage from '$lib/assets/code.png';
  
    let container;
    let camera, scene, renderer;
    let texture, material, mesh;
  
    onMount(() => {
      init();
      animate();
    });
  
    onDestroy(() => {
      // Cleanup
      container.removeChild(renderer.domElement);
    });
  
    function init() {
      // Set up the scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);
  
      // Load the texture
      texture = new THREE.TextureLoader().load(codeImage);
      material = new THREE.MeshBasicMaterial({ map: texture });
  
      // Create a mesh and add it to the scene
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
  
      // Camera position
      camera.position.z = 5;
    }
  
    function animate() {
      requestAnimationFrame(animate);
      render();
    }
  
    function render() {
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
  </script>
  
  <div bind:this={container}></div>
  