import React from "react";
import { Avatar, AvatarProps } from "@radix-ui/themes";

interface Props {
  userName: string;
}

/**
 * Avatar for a user. Renders with the first and last initial of the given `userName`.
 * Colors are assigned consistently for each `userName` by hashing the name.
 */
export const UserAvatar: React.FC<Props> = ({ userName }) => {
  const initials = userName.split(" ").map((chunk) => chunk.slice(0, 1));
  const initialsTruncated =
    initials.length > 2
      ? [initials[0], initials[initials.length - 1]]
      : initials;

  const color = generateAvatarColor(userName);

  return <Avatar fallback={initialsTruncated} color={color} size="1" />;
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
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};
