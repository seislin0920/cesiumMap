import { Viewer, Entity, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";
import * as Cesium from "cesium";

const CesiumMap = () => {
  return (
    <Viewer full>
      {/* 飛到台灣的位置 */}
      <CameraFlyTo
        duration={3}
        destination={Cartesian3.fromDegrees(121, 23.5, 1500000)}
      />
      {/* 添加一個標記 */}
      <Entity
        name="台北101"
        position={Cartesian3.fromDegrees(121.5645, 25.0330, 500)}
        point={{ pixelSize: 10, color: Cesium.Color.RED }}
      />
    </Viewer>
  );
};

export default CesiumMap;