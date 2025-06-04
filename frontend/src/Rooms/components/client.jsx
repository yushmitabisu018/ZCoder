import React from 'react';

const stringToColor = (string) => {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32bit integer
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0');
  }
  return color;
};

const Client = ({ username }) => {
  if (!username || typeof username !== 'string') {
    return null;
  }

  const initials = username
    .split(' ')
    .filter(Boolean)
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const bgColor = stringToColor(username);

  return (
    <div
      className="client"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}
      aria-label={`User avatar for ${username}`}
      title={username}
    >
      <div
        style={{
          backgroundColor: bgColor,
          width: 50,
          height: 50,
          borderRadius: 14,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        {initials}
      </div>
      <span className="userName" style={{ fontSize: 16 , color: "white"}}>
        {username}
      </span>
    </div>
  );
};

export default Client;
