import React, { useEffect, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import { SelectChangeEvent } from "@mui/material/Select";

import { makePage } from "../../utils/paging";
import { CustomSelect } from "../CustomSelect";

interface Props {
  pageSize?: number;
  handlePageSizeChange?: (pageSize: number) => void;
  handlePageChange?: (newPage: number) => void;
  pageCount?: number;
  totalRows?: number;
  pageIndex?: number;
  showPageCount?: boolean;
  showPagePerSize?: boolean;
}

export const CustomPagination = ({
  handlePageSizeChange,
  handlePageChange,
  pageSize,
  pageCount,
  totalRows,
  pageIndex,
  showPageCount,
  showPagePerSize,
}: Props) => {
  const theme = useTheme();
  const [page, setPage] = useState(makePage(pageIndex || 0, pageSize || 10));
  const [currentPageDetails, setCurrentPageDetails] = useState<string | null>(
    null
  );

  const onPageSizeChange = (event: SelectChangeEvent) => {
    if (handlePageSizeChange) {
      handlePageSizeChange(Number(event.target.value));
    }

    setPage({ ...page, pageSize: Number(event.target.value) });
  };

  useEffect(() => {
    const start = page.pageIndex * page.pageSize;
    let end = (page.pageIndex + 1) * page.pageSize;
    let totalNumOfRows = totalRows;
    const currentTotal = (page.pageIndex + 1) * page.pageSize;
    if (totalRows && totalRows <= currentTotal) {
      totalNumOfRows = totalRows;
      end = totalNumOfRows;
    }
    setCurrentPageDetails(`${start + 1} to ${end} of ${totalNumOfRows}`);
  }, [page, totalRows]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: showPageCount ? "space-between" : "center",
        py: "1em",
      }}
    >
      {showPageCount ? (
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ color: theme.palette.text.secondary, mt: "0.3em" }}
          >
            {currentPageDetails}
          </Typography>
        </Box>
      ) : null}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {showPagePerSize ? (
          <Box>
            <CustomSelect
              handleChange={onPageSizeChange}
              options={[
                { label: "25", value: 25 },
                { label: "50", value: 50 },
                { label: "75", value: 75 },
                { label: "100", value: 100 },
              ]}
              defaultOption={page.pageSize}
              label="rows per page"
              size="small"
            />
          </Box>
        ) : null}

        <Pagination
          count={pageCount || 10}
          page={pageIndex || 1}
          shape="rounded"
          variant="outlined"
          onChange={(event: React.ChangeEvent<unknown>, newPage: number) => {
            event.preventDefault();
            if (handlePageChange) {
              handlePageChange(newPage);
            }
            setPage({ ...page, pageIndex: newPage });
          }}
          sx={{
            mt: "0.3em",
            "& .MuiPaginationItem-previousNext": {},
            "& .MuiPaginationItem-root.Mui-selected": {
              background: theme.palette.primary.main,
              color: "#fff",
            },
            "&.MuiPagination-root": {
              background: "#fff",
              py: "0.2em",
            },
            "& .MuiPaginationItem-page": {
              border: 0,
            },
          }}
        />
      </Box>
    </Box>
  );
};
