import React from 'react';

import { colors } from '../../../utils/constants';

function FeedCardBottom({ favoriteCount, onFavoritePress, isFavorited }) {
  return (
    <div>
      
      <button onClick={onFavoritePress}>like</button>
        {/* <Entypo
          name="heart"
          color={isFavorited ? 'red' : colors.LIGHT_GRAY}
          size={ICON_SIZE}
        /> */}
       <div>{favoriteCount}</div>
    </div>
  );
}

export default FeedCardBottom;
