import { useEffect, useState } from "react";
// import vis from "vis";
import axios from "axios";
// import { string } from "vis";

export default function GraphBT() {
 

  return (
    <div>
      <div id="mynetwork" className="w-full h-40 bg-blue-50" />
      <pre>
        <code>
          {dot}
        </code>
      </pre>
    </div>
  );
}
