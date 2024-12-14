import { DiffEditor } from "@monaco-editor/react";
import Icon from "../components/Icon";

export default function () {
  return (
    <div className="group overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center text-white z-50 opacity-0 group-active:opacity-100 pointer-events-none">
        Coming Soon, stay tuned
      </div>

      <div className="bg-slate-950 h-screen overflow-hidden group-active:scale-110 duration-200 group-active:blur">
        <div className="flex gap-x-3 p-10">
          <DiffEditor
            className="w-full h-[70vh]"
            theme="one-dark"
            language="sol"
            original="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleContract {
    // State variable to store a number
    uint256 public storedNumber;

    // Function 1: Set a number
    function setNumber(uint256 _number) public {
        storedNumber = _number;
    }

    // Function 2: Retrieve the stored number
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }

    // Function 3: Add a value to the stored number
    function addToNumber(uint256 _value) public {
        storedNumber += _value;
    }
}
"
            modified="// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EnhancedContract {
    // State variable to store a number
    uint256 private storedNumber;

    // Event to log updates to the stored number
    event NumberUpdated(uint256 oldValue, uint256 newValue);

    // Function 1: Set a number (with additional validation)
    function setNumber(uint256 _number) public {
        require(_number >= 0, 'Number must be non-negative'); // Validation 
        uint256 oldValue = storedNumber;
        storedNumber = _number;
        emit NumberUpdated(oldValue, _number); // Log the update
    }

    // Function 2: Retrieve the stored number
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }

    // Function 3: Add a value to the stored number (with validation)
    function addToNumber(uint256 _value) public {
        require(_value > 0, 'Value must be greater than zero'); // Validation
        uint256 oldValue = storedNumber;
        storedNumber += _value;
        emit NumberUpdated(oldValue, storedNumber); // Log the update
    }
}
"
          />
        </div>

        <div className="h-[20vh] flex justify-between">
          <p className="w-[70vw] text-white ml-10 h-max p-2 rounded-lg bg-gray-600 relative">
            The improved contract is better because it introduces input
            validation to ensure only valid numbers are set or added, enhancing
            robustness and preventing errors. It encapsulates the storedNumber
            variable by making it private, allowing controlled access through
            the getNumber function, which improves security. Additionally, it
            logs changes using the NumberUpdated event, providing transparency
            and allowing on-chain activity to be easily tracked. These
            improvements follow best practices, making the contract more
            reliable, secure, and easier to monitor, while still maintaining
            simplicity and efficiency for real-world use.
            <figure
              className="bg-gray-600 h-1/3 w-10 absolute left-full -translate-x-2 bottom-0"
              style={{ clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)" }}
            />
          </p>
          <div className="">
            <h1 className="text-red-500 text-center flex items-center gap-x-1 justify-center">
              <Icon.VolumeOff />
              audio off
            </h1>
            <img
              src="https://attic.sh/bvg6ypl4mpfrzbmra4uys6xs94bj"
              alt=""
              className="h-[19vh]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
