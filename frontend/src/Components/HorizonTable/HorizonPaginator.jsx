import { TextField } from "@material-ui/core";
import { HorizonButton } from "./HorizonButton";

export const HorizonPaginator = props => {
  const {
    pageCount,
    canPreviousPage,
    canNextPage,
    previousPage,
    nextPage,
    pageIndex,
    gotoPage
  } = props.table;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "stretch",
        justifyContent: "space-between",
        padding: "16px"
      }}
    >
      <HorizonButton
        id="paginator-previous-btn"
        color="primary"
        disabled={!canPreviousPage}
        onClick={previousPage}
        style={{
          maxWidth: "250px",
          width: "100%"
        }}
      >
        Previous
      </HorizonButton>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "24px"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "24px"
          }}
        >
          <span
            style={{
              marginRight: "8px"
            }}
          >
            Page
          </span>
          <TextField
            type="number"
            variant="outlined"
            value={pageIndex + 1}
            id="paginator-change-page-field"
            color="blue"
            onChange={e => {
              const page = Number(e.target.value)
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(page);
            }}
          />
          <span
            style={{
              marginLeft: "8px"
            }}
          >
            of {props.data.length > 0 ? pageCount : 1}
          </span>
        </div>
      </div>
      <HorizonButton
        id="paginator-next-btn"
        style={{
          maxWidth: "300px",
          width: "100%"
        }}
        color="primary"
        disabled={!canNextPage}
        onClick={nextPage}
      >
        Next
      </HorizonButton>
    </div>
  );
};
