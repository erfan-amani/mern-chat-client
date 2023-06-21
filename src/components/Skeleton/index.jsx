const Skeleton = ({
  width,
  height,
  containerClassNames,
  classNames,
  children,
}) => {
  return (
    <div className={`animate-pulse ${containerClassNames}`}>
      <div
        className={`bg-slate-300 rounded ${classNames}`}
        style={{ width, height }}
      >
        {children}
      </div>
    </div>
  );
};

export default Skeleton;
