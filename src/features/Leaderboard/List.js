import React from 'react';
import ListItem from './ListItem';

const imgUrl =
  'https://s3-alpha-sig.figma.com/img/2e7c/0b19/b615cd1f932cd1924a9842e4132a9d6b?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gQvc8JF1x29HbTnGuCgaANyI7U~ir15x1Sjg1BupyF226FJDdePjFFCYGlCcW8tIN8lRYSeivLlmxj1CVEFYhacRVmH981d2TVM5wXnF5c57bpqY9VbzC8ADm73fPexawZBLSSeeAQbF-nzq7k61qKZg2qCkbL8cD0~mTPG-eZroJy1jJg7UIrSdeOL5dNDp~DDENprbNDdlKWWEw9vImWRWxr5-DX1Gkvh30E2LX7eacZ-hIStbA3qguSDeAbq419DHEMdt8raO~Vm8T3AMO6tLpzxs-wDapxETIZBHVbSzpN6I3W8hJTjR8wCEF9zvYbUbUhVtTQ4~DdAGGTrYiA__';

const List = ({ data, mode, code }) => {
  // Find the user with the matching code
  const matchingUser = data?.find((entry) => entry.code === code);
  // Create a LeaderboardItem for the matching user

  const matchingUserItem =
    matchingUser ? (
      <ListItem
        key={-1} // Assign a unique key for the matching user
        isCurrentUser={true}
        imgUrl={imgUrl}
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
            imgUrl={imgUrl}
            mode={mode}
            user={entry}
            isCurrentUser={false}
          />
        ))}
    </div>
  );
};

export default List;
