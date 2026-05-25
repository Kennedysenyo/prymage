"use client";

import { handleError } from "@/lib/utils";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

interface Props {
  image: string | null;
  name: string | null;
  userId: string;
}

export const ProfilePicture = ({ image, name, userId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(image);

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setAvatar(URL.createObjectURL(file));
    } catch (err) {
      toast.error(handleError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-24 h-24">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 bg-white/20">
        <Image
          src={avatar ?? "/assets/default-image.png"}
          alt={name ?? "Note Author"}
          width={96}
          height={96}
          loading="eager"
          className="object-cover object-center"
        />
      </div>

      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleUpload(file);
        }}
      />

      <label
        htmlFor="avatar-upload"
        className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#5B2CA5] shadow-lg cursor-pointer hover:scale-110 transition-transform"
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <Camera size={16} />
        )}
      </label>
    </div>
  );
};
