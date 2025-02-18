import * as Cesium from "cesium";
import { useEffect, useRef } from "react";

const CesiumTest = () => {
    const mapRef = useRef(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // 初始化 Cesium Viewer
        const viewer = new Cesium.Viewer(mapRef.current, {
            animation: false, // 是否顯示動畫控制
            timeline: false, // 是否顯示時間軸
            sceneModePicker: false, // 是否顯示視角切換
            terrainProvider: Cesium.createWorldTerrain(),  // 建立地形
        });
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
                positions: Cesium.Cartesian3.fromDegreesArray([121.523333, 25.15, 120.3508, 23]),
                width: 5,  // 線寬度
                material: Cesium.Color.RED,　　// 紅色
                clampToGround: true,  // 虛線
            },
        });

        // 3D
        let polygon3D = viewer.entities.add({
            name: "polygon3D",
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray([
                    121, 23.5,
                    121.5, 23.5,
                    121.2, 23,
                ]),
                extrudedHeight: 5000,  // 拉伸高度(m)
                material: Cesium.Color.BLUE,  // 綠色
                closeTop: false,  // 頂部是否密合
                closeBottom: false,  // 底部是否密合
            },
        });


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