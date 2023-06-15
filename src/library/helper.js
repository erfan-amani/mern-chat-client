const colors = [
  "bg-indigo-400",
  "bg-orange-400",
  "bg-amber-400",
  "bg-red-400",
  "bg-violet-400",
  "bg-rose-600",
  "bg-lime-500",
  "bg-cyan-500",
  "bg-rose-400",
  "bg-teal-500",
  "bg-fuchsia-400",
  "bg-rose-400",
  "bg-blue-400",
  "bg-lime-800",
  "bg-orange-700",
  "bg-amber-200",
  "bg-pink-600",
  "bg-cyan-300",
  "bg-yellow-900",
  "bg-green-300",
  "bg-green-700",
  "bg-teal-600",
  "bg-cyan-700",
  "bg-sky-400",
  "bg-sky-900",
  "bg-violet-300",
  "bg-pink-400",
];

const getAvatarColor = (...ids) => {
  const manyColors = [...colors, ...colors, ...colors, ...colors].slice(0, 99);

  let index = ids.reduce((prev, cur) => parseInt(cur) * parseInt(prev));
  index = (parseInt(index) % 100) - 1;

  if (index > manyColors.length) {
    index %= 10;
  }

  return manyColors[index];
};

export { getAvatarColor };
