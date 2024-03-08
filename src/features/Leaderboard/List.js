import React from 'react';
import { motion } from 'framer-motion';
import ListItem from './ListItem';

const List = ({ data, mode, code }) => {
  // Find the user with the matching code
  const matchingUser = data?.find((entry) => entry.code === code);

  // Create a LeaderboardItem for the matching user
  const matchingUserItem =
    matchingUser ? (
      <motion.div
        key={-1} // Assign a unique key for the matching user
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ListItem
          isCurrentUser={true}
          user={matchingUser}
          mode={mode}
        />
      </motion.div>
    ) : null;

  return (
    <div>
      {matchingUserItem}

      {data
        ?.filter((entry) => entry.code !== code)
        ?.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ListItem
              mode={mode}
              user={entry}
              isCurrentUser={false}
            />
          </motion.div>
        ))}
    </div>
  );
};

export default List;
