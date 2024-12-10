import React from 'react';
import Image from 'next/image';

type ProfileImageProps = {
  profileImageUrl: string | null | undefined;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImageUrl }) => {
  return (
    <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-full overflow-hidden border-4 border-darkYellow flex items-center justify-center">
      <Image
        src={profileImageUrl ? profileImageUrl : "/images/avatar.svg"}
        alt="Profile Image"
        fill
        className="object-cover"
      />
    </div>
  );
};

export default ProfileImage;
