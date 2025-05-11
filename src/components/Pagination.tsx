import Button from "./Button";
import classNames from "classnames";

interface PaginationProps {
  page: number;
  totalPages?: number;
  onNext: () => void;
  onPrevious: () => void;
}

const Pagination = ({
  page,
  totalPages,
  onNext,
  onPrevious,
}: PaginationProps) => {
  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages;

  return (
    <div className="flex mt-6 justify-center">
      <div className="flex space-x-8 items-center">
        <Button type="button"
          className={classNames(
            "w-24",
            prevDisabled && "cursor-not-allowed opacity-50"
          )}
          onClick={onPrevious}
        >
          Previous
        </Button>
        <span className="text-sm">Page {page}</span>
        <Button type="button"
          className={classNames(
            "w-24",
            nextDisabled && "cursor-not-allowed opacity-50"
          )}
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
