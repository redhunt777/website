import { get, set } from "idb-keyval"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"

async function loadModelFromCacheOrNetwork(url, onLoad) {
  let cachedModel = await get("BIT-v1.glb")

  if (!cachedModel) {
    console.log("Fetching model from network")
    url = "/BIT-v1.glb"
    fetchAndCacheModel(url, onLoad)
  } else {
    const blob = new Blob([cachedModel], { type: "model/gltf-binary" })
    const objectURL = URL.createObjectURL(blob)
    loadModel(objectURL, onLoad)
  }
}

async function fetchAndCacheModel(url, onLoad) {
  const response = await fetch(url)
  const arrayBuffer = await response.arrayBuffer()
  await set("BIT-v1.glb", arrayBuffer)
  const blob = new Blob([arrayBuffer], { type: "model/gltf-binary" })
  const objectURL = URL.createObjectURL(blob)
  loadModel(objectURL, onLoad)
}

function loadModel(url, onLoad) {
  const loader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/")
  loader.setDRACOLoader(dracoLoader)

  loader.load(url, (gltf) => {
    onLoad(gltf)
  })
}

export { loadModelFromCacheOrNetwork }
