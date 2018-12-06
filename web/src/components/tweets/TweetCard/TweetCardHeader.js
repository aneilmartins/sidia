import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { fakeAvatar } from '../../../utils/constants';

const AVATAR_SIZE = 40;
const AVATAR_RADIUS = AVATAR_SIZE / 2;

function FeedCardHeader({ username, firstName, lastName, avatar, createdAt }) {
  return (
    <div>
      <div> {firstName} {lastName} </div>

      <div>@{username}</div>
      <div>{distanceInWordsToNow(createdAt)} ago</div>
    </div>
  )
}

export default FeedCardHeader;
