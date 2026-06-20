import React from 'react';

interface AvatarProps {
  name: string;
  size?: number;
}

const PALETTE = [
  ['#F4F0FF', '#6423D6'],
  ['#EAFBF1', '#16A34A'],
  ['#FFF6E7', '#D97706'],
  ['#FDEEF1', '#E11D48'],
  ['#E7F4FF', '#0E7FBE'],
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getPaletteIndex = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return hash % PALETTE.length;
};

const Avatar: React.FC<AvatarProps> = ({ name, size = 38 }) => {
  const [bg, fg] = PALETTE[getPaletteIndex(name || '?')];
  return (
    <div
      className="rounded-full flex items-center justify-center font-bold shrink-0 select-none"
      style={{ width: size, height: size, backgroundColor: bg, color: fg, fontSize: size * 0.38 }}
    >
      {getInitials(name || '?')}
    </div>
  );
};

export default Avatar;
