import { Camera } from "lucide-react";

interface Props {
  image: string;
  name: string;
}
export const ProfilePicture = ({ image, name }: Props) => {
  return (
    <div className="relative">
      <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-3xl font-bold border-4 border-white/30">
        <img
          className="w-full h-full rounded-full"
          src={image ?? "/assets/default-image.png"}
          alt={name ?? "User"}
        />
      </div>
      <input
        type="file"
        className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#5B2CA5] hover:scale-110 transition-transform shadow-lg"
      >
        <Camera size={16} />
      </input>
    </div>
  );
};
