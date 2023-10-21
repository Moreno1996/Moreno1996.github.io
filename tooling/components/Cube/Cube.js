import {
  color_scheme,
  corners_letter_scheme,
  edges_letter_scheme,
  getCubeColor,
} from "../blindMain";
import styles from "./Cube.module.scss";
const Cube = ({ scrambleData }) => {
  const colorsEdges = getCubeColor(
    scrambleData?.cubeEdges ?? edges_letter_scheme
  );
  const colorsCorners = getCubeColor(
    scrambleData?.cubeCorners ?? corners_letter_scheme
  );
  const corners = colorsCorners.map((color, i) => {
    var x = i % 4;
    var y = Math.floor(i / 4);
    var z = y == 0 ? 1 : y % 4;
    var z2 = Math.ceil((y % 5) / 5) + Math.floor(y / 5) * 2;
    return {
      x: z * 3 + 2 * Math.ceil((x % 3) / 3),
      y: 3 * z2 + 2 * Math.floor(x / 2),
      color,
    };
  });
  const edges = colorsEdges.map((color, i) => {
    var x = i % 4;
    var y = Math.floor(i / 4);
    var z = y == 0 ? 1 : y % 4;
    var z2 = Math.ceil((y % 5) / 5) + Math.floor(y / 5) * 2;
    let pos_x = z * 3 + ((x + 1) % 4);
    let pos_y = z2 * 3 + (Math.floor(x / 3) + (x % 3));
    if (i % 4 == 2) {
      pos_x = z * 3 + 1;
      pos_y = z2 * 3 + (Math.floor(x / 3) + (x % 3));
    }
    return {
      x: pos_x,
      y: pos_y,
      color,
    };
  });
  const centers = [
    {
      x: 4,
      y: 1,
    },
    {
      x: 4,
      y: 4,
    },
    {
      x: 7,
      y: 4,
    },
    {
      x: 10,
      y: 4,
    },
    {
      x: 1,
      y: 4,
    },
    {
      x: 4,
      y: 7,
    },
  ].map((data, i) => ({ ...data, color: color_scheme[i] }));
  const blocks = [...centers, ...edges, ...corners];
  return (
    <div className={styles.cube}>
      {blocks.map((tile,index) => {
        return (
          <div
          key={index+"-"+tile?.x+"-".tile?.y}
            style={{
              background: tile?.color,
              gridColumn: tile?.x + 1,
              gridRow: tile?.y + 1,
            }}
            className="w-12 h-12"
          ></div>
        );
      })}
    </div>
  );
};

export default Cube;
