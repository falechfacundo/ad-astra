import Azure from "../assets/icons/Azure";
import Cloudflare from "../assets/icons/Cloudflare";
import AWS from "../assets/icons/AWS";

export default function Cloud() {
  return (
    <ul className="flex justify-start px-6 pt-6 gap-10 w-full text-5xl">
      <Cloudflare />
      <AWS />
      <Azure />
    </ul>
  );
}
