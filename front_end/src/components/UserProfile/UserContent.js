import React from 'react';
import UserAccount from './UserAccount';
import UserChats from './UserChats';
import UserRatings from './UserRatings';

const UserContent = ({ activeMenuItem , userId}) => {
  return (
    <div>
      {activeMenuItem === 'Profile' && <UserAccount userId={userId}/>}
      {activeMenuItem === 'Chats' && <UserChats />}
      {activeMenuItem === 'Ratings' && <UserRatings />}
    </div>
  );
};

export default UserContent;
