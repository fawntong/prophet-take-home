import React from "react";
import { Avatar, AvatarProps, Tooltip } from "@radix-ui/themes";

interface Props {
  userName: string;
}

export const UserAvatar: React.FC<Props> = ({ userName }) => {
  const initials = userName.split(" ").map((chunk) => chunk.slice(0, 1));
  const initialsTruncated =
    initials.length > 2
      ? [initials[0], initials[initials.length - 1]]
      : initials;

  const color = generateAvatarColor(userName);

  return (
    <Tooltip content={userName}>
      {/* This div is needed because `Tooltip` component needs to add a `data-state` attribute */}
      {/* to its child, which `Avatar` doesn't want to accept */}
      <div className="inline-block">
        <Avatar fallback={initialsTruncated} color={color} />
      </div>
    </Tooltip>
  );
};

const AVATAR_COLORS: AvatarProps["color"][] = [
  "amber",
  "orange",
  "tomato",
  "crimson",
  "indigo",
  "cyan",
  "grass",
];

const generateAvatarColor = (userName: string) => {
  let hash = 0;
  for (let i = 0; i < userName.length; i++) {
    hash = userName.charCodeAt(i) + ((hash << 5) - hash);
  }
  console.log(
    Math.abs(hash),
    AVATAR_COLORS.length,
    Math.abs(hash) % AVATAR_COLORS.length,
  );
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};
