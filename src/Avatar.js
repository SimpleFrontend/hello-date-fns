import React from 'react';
import Avataaar from 'avataaars';

const Avatar = ({ size }) => (
  <Avataaar
    style={{ height: size, width: size }}
    avatarStyle="Circle"
    topType="WinterHat4"
    accessoriesType="Prescription02"
    hatColor="Red"
    facialHairType="Blank"
    clotheType="ShirtCrewNeck"
    clotheColor="Black"
    eyeType="Default"
    eyebrowType="RaisedExcited"
    mouthType="Default"
    skinColor="Light"
  />
);

export default Avatar;
