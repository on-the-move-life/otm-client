import React from 'react';
import ListItem from './ListItem';

const List = ({ data, mode, code }) => {
  // Find the user with the matching code
  const matchingUser = data?.find((entry) => entry.code === code);
  // Create a LeaderboardItem for the matching user

  const matchingUserItem =
    matchingUser ? (
      <ListItem
        key={-1} // Assign a unique key for the matching user
        isCurrentUser={true}
        user={matchingUser}
        mode={mode}
      />
    ) : null;

  return (
    <div>
      {matchingUserItem}

      {data
        ?.filter((entry) => entry.code !== code)
        ?.map((entry, idx) => (
          <ListItem
            key={idx}
            mode={mode}
            user={entry}
            isCurrentUser={false}
          />
        ))}
    </div>
  );
};

export default List;
