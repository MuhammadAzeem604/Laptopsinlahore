import { scrollToTop } from "../../utils/common";

export default function ProductPagination({
  pagination,
  setPagination,
  totalCount,
}) {
  const handleClick = (type = "prev") => {
    setPagination({
      ...pagination,
      page: type === "prev" ? pagination.page - 1 : pagination.page + 1,
    });
    scrollToTop();
  };

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination justify-content-center">
        <li
          className={`page-item ${pagination.page == 1 ? "disabled" : ""}`}
          onClick={() => {
            if (pagination.page > 1) {
              handleClick("prev");
            }
          }}
        >
          <span className="page-link page-link-prev" aria-label="Previous">
            <span aria-hidden="true">
              <i className="icon-long-arrow-left" />
            </span>
            Prev
          </span>
        </li>

        {/* <li className="page-item active" aria-current="page">
          <a className="page-link" href="#">
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>
        <li className="page-item-total">of 6</li> */}

        <li
          className={`page-item ${
            pagination.page * pagination.perPage >= totalCount ? "disabled" : ""
          }`}
          onClick={() => {
            if (!(pagination.page * pagination.perPage >= totalCount)) {
              handleClick("next");
            }
          }}
        >
          <span className="page-link page-link-next" aria-label="Next">
            Next{" "}
            <span aria-hidden="true">
              <i className="icon-long-arrow-right" />
            </span>
          </span>
        </li>
      </ul>
    </nav>
  );
}
