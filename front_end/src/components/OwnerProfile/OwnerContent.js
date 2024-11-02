import React from 'react';
import OwnerPostedAdds from './OwnerPostedAdds';
import OwnerChats from './OwnerChats';
import OwnerRatings from './OwnerRatings';
import OwnerAccount from './OwnerAccount';

const OwnerContent = ({ activeMenuItem, userId}) => {
  return (
    <div>
      {activeMenuItem === 'Posted Adds' && <OwnerPostedAdds/>}
      {activeMenuItem === 'Chats' && <OwnerChats />}
      {activeMenuItem === 'Ratings' && <OwnerRatings />}
      {activeMenuItem === 'Profile' && <OwnerAccount userId={userId}/>}
    </div>
  );
};

export default OwnerContent;
