import { useEffect } from "react";
import vis from "vis";
import {string} from "vis"

export default function GraphBT() {
  var container = document.getElementById("mynetwork");
  var DOTstring = "dinetwork {1 -> 1 -> 2; 2 -> 3; 2 -- 4; 2 -> 1 }";

  //   var data = {
  //     nodes: parsedData.nodes,
  //     edges: parsedData.edges,
  //   };

  //   var options = parsedData.options;
  var options = {
    autoResize: true,
    height: "100%",
    width: "100%",
    locale: "en",
    clickToUse: false,
  };

  useEffect(() => {
    if (container) {
      var network = new vis.Network(container, DOTstring, options);
    }
  }, []);

  return (
    <div>
      <div id="mynetwork" className="w-full h-40 bg-blue-50" />
    </div>
  );
}
