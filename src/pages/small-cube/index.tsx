import "./small-cube.scss";
import Crown from "../../assets/Crown.png";

const SmallCube = (props: any) => {
  const changeColor = (cube: any) => {
    if (!props.isGameOver) {
      console.log(cube.index);
      props.openCube();
    }
  };

  const getBgColor = () => {
    if (props.cube.isOpen) {
      if (props.cube.isTreasure) {
        return "bg-[transparent]";
      } else if (props.cube.isSafe) {
        return "bg-[green]";
      } else {
        return "bg-[red]";
      }
    }
  };

  return (
    <div>
      <div
        className={"square flex cursor-pointer justify-center " + getBgColor()}
        onClick={() => changeColor(props.cube)}
      >
        {props.cube.isOpen && props.cube.isTreasure && (
          // <div className="square">
          <img className="crown" src={Crown} alt="" />
          // </div>
        )}
      </div>
    </div>
  );
};
export default SmallCube;
