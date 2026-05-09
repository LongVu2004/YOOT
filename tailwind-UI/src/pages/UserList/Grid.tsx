import React from "react";
import UserGrid from "../UserList/UserGrid";

const users = [
  {
    name: "Lelah Nichols",
    location: "Troy, MI",
    tags: ["clothes", "stem"],
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    name: "Jesus Weiss",
    location: "Fort Worth, TX",
    tags: ["headset", "gadget", "speed", "winter"],
    avatar: "https://i.pravatar.cc/150?img=11",
    isActive: true,
  },
  {
    name: "Annie Rice",
    location: "Austin, TX",
    tags: ["road", "mountain", "trip", "earth", "nature"],
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Robert Brower",
    location: "Cincinnati, OH",
    tags: ["maintenance", "gears", "frames", "repair"],
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Amy Campbell",
    location: "Warrior, AL",
    tags: ["music", "disks"],
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    name: "Anthony S. Morin",
    location: "Lyndhurst, NJ",
    tags: ["vintage", "electric"],
    avatar: "https://i.pravatar.cc/150?img=68",
  },
];

const Grid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {users.map((user, index) => (
        <UserGrid key={index} {...user} />
      ))}
    </div>
  );
};

export default Grid;
