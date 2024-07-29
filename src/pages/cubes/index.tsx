import { useEffect, useState } from "react";
import SmallCube from "../small-cube";
import "./cubes.scss";
import CubesConstant from "../../constants/cubes.constant";

const Cubes = () => {
  // let cubes: any = [];
  const [cubes, setCubes] = useState(CubesConstant);

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    // setCubes([]);
    console.log("for loop ");
    // let tempCube = [];
    // setInterval(() => {
    createCubesColor();
    // }, 1000);
  }, []);

  const createCubesColor = () => {
    setCubes(CubesConstant);
    const randomNumbers = getRandomUniqueNumbers(2, 24);
    console.log("gameOver: ", randomNumbers); // Example output: [ 5, 22, 9, 14 ]

    const newNumber = getUniqueRandomNumber(randomNumbers, 24);
    console.log("treasure: ", newNumber);

    let tempCube: any = cubes;
    console.log(tempCube);

    randomNumbers.forEach((element) => {
      tempCube[element].isSafe = false;
    });
    tempCube[newNumber].isTreasure = true;
    setCubes(tempCube);
  };

  const openCubeHandler = (cube: any) => {
    let tempCube: any = [];
    if (!cube.isSafe || cube.isTreasure) {
      setIsGameOver(true);
      cubes.forEach((element) => {
        element.isOpen = true;
        tempCube.push(element);
      });
    } else {
      cube.isOpen = true;
      cubes.forEach((element) => {
        if (element.index === cube.index) {
          tempCube.push(cube);
        } else {
          tempCube.push(element);
        }
      });
    }
    setCubes(tempCube);
  };

  const getRandomUniqueNumbers = (count: number, max: number) => {
    // Step 1: Create an array of numbers from 0 to max
    const numbers = Array.from({ length: max + 1 }, (_, i) => i);

    // Step 2: Shuffle the array using Fisher-Yates algorithm
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }

    // Step 3: Return the first 'count' numbers from the shuffled array
    return numbers.slice(0, count);
  };

  const getUniqueRandomNumber = (exclude: number[], max: number) => {
    const availableNumbers = Array.from(
      { length: max + 1 },
      (_, i) => i
    ).filter((num) => !exclude.includes(num));

    if (availableNumbers.length === 0) {
      throw new Error("No more unique numbers available");
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  };

  return (
    <div className="">
      <div className="main-heading text-center font-black my-5">
        MYSTERY CUBES
      </div>
      <div className="main-heading text-center font-black my-5">
        FIND THE CROWN
      </div>
      <div className="grid grid-cols-5 gap-4 m-10">
        {/* <SmallCube /> */}
        {cubes.map((cube) => {
          return (
            <div>
              <SmallCube
                cube={cube}
                openCube={() => openCubeHandler(cube)}
                isGameOver={isGameOver}
              />
            </div>
          );
        })}
      </div>
      <div>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default Cubes;
