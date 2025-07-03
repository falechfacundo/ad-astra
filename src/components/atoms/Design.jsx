import Photoshop from "../assets/icons/Photoshop";
import Illustrator from "../assets/icons/Illustrator";
import Figma from "../assets/icons/Figma";
import Blender from "../assets/icons/Blender";

export default function Design() {
  return (
    <ul className="flex gap-10 w-full justify-start px-6 pt-6 text-4xl md:text-6xl">
      {/* <ul className="absolute flex justify-start px-6 pt-6 gap-10 w-full text-2xl"> */}
      <Figma />
      <Illustrator />
      <Photoshop />
      <Blender />
    </ul>
  );
}
