import { useState } from "react";

const usePage = () => {
  const [page, setPage] = useState(1);

  const onPageChange = page => {
    setPage(page);
  };

  return { page, onPageChange };
};

export default usePage;
