import * as Cesium from "../node_modules/cesium";
import { useEffect, useRef } from "react";

const CesiumTest = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // 初始化 Cesium Viewer
    const viewer = new Cesium.Viewer(mapRef.current, {
      animation: true, // 是否顯示動畫控制
      timeline: true, // 是否顯示時間軸
      sceneModePicker: false, // 是否顯示視角切換
      terrain: Cesium.Terrain.fromWorldTerrain(), //  地形
    });

    // Fly the camera to Denver, Colorado at the given longitude, latitude, and height.
    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(121, 23.5, 1500000),
    });

    // 3D建築 (TypeError: primitive.isDestroyed is not a function)
    // const osmBuildings = viewer.scene.primitives.add(Cesium.createOsmBuildingsAsync());

    // 標記point
    let point = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(121, 23.5),
      point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
      },
    });

    // 標記line
    let line = viewer.entities.add({
      name: "line",
      polyline: {
        positions: Cesium.Cartesian3.fromDegreesArray([
          121.523333, 25.15, 120.3508, 23,
        ]),
        width: 5, // 線寬度
        material: Cesium.Color.RED, // 紅色
        clampToGround: true, // 虛線
      },
    });

    // 3D
    let polygon3D = viewer.entities.add({
      name: "polygon3D",
      polygon: {
        hierarchy: Cesium.Cartesian3.fromDegreesArray([
          121, 23.5, 121.5, 23.5, 121.2, 23,
        ]),
        extrudedHeight: 5000, // 拉伸高度(m)
        material: Cesium.Color.BLUE, // 綠色
        closeTop: false, // 頂部是否密合
        closeBottom: false, // 底部是否密合
      },
    });

    // 飛航軌跡
    const data = '[{ "longitude": 121.523333, "latitude": 25.15, "height": 3000 }, { "longitude": 120.3508, "latitude": 23, "height": 12000 }]';
    const flightData = JSON.parse(data);
    
    const timeSpan = 30;
    const positionProperty = new Cesium.SampledPositionProperty();

    

    return () => {
      viewer.destroy(); // 銷毀 Cesium Viewer
    };
  }, []);

  return (
    <div
      ref={mapRef}
      id="cmap"
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
};

export default CesiumTest;
