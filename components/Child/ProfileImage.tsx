import React from 'react';
import Image from 'next/image';

type ProfileImageProps = {
  profileImageUrl: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ profileImageUrl }) => {
  return (
    <div className="bg-cover bg-center rounded-full overflow-hidden border-4 border-darkYellow">
      <Image src={profileImageUrl} alt="Profile Image" width={210} height={219} />
    </div>
  );
};

export default ProfileImage;
