import React from 'react';
import Image from 'next/image';

type ProfileImageProps = {
  profileImageUrl: string | null | undefined;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImageUrl }) => {
  return (
    <div className="bg-cover bg-center rounded-full overflow-hidden border-4 border-darkYellow">
      <Image src={profileImageUrl ? profileImageUrl : "/images/avatar.svg"} alt="Profile Image" width={210} height={219} className={"bg-cover bg-center"} />
    </div>
  );
};

export default ProfileImage;
