import type { ButtonBlocker } from "../App";

type PaginationProps = {
  currentPage: number;
  changePage: (page: number) => void;
  buttonBlocker: ButtonBlocker;
};

export default function Pagination({
  currentPage,
  changePage,
  buttonBlocker,
}: PaginationProps) {
  const handleBack = () => {
    changePage(currentPage - 1);
  };

  const handleNext = () => {
    changePage(currentPage + 1);
  };

  return (
    <div className="flex gap-3">
      <button disabled={!buttonBlocker.hasPrevious} onClick={handleBack}>
        Back
      </button>

      <span className="text-pink-500">{currentPage}</span>

      <button disabled={!buttonBlocker.hasNext} onClick={handleNext}>
        Next
      </button>
    </div>
  );
}
