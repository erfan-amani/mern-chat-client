const colors = [
  "bg-indigo-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-red-400",
  "bg-violet-400",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-rose-400",
  "bg-teal-500",
  "bg-fuchsia-400",
];

const getAvatarColor = id => {
  return colors[parseInt(id) % 10];
};

export { getAvatarColor };
