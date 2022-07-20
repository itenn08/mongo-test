import {
  GridAlignment,
  GridColDef,
  GridColumnHeaderParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";

import { User } from "../../types/users";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const defaultProps = {
  editable: false,
  sortable: false,
  renderHeader: (params: GridColumnHeaderParams) => {
    return (
      <Typography variant="subtitle2" color="textSecondary">
        {typeof params.colDef.headerName === "string"
          ? params.colDef.headerName
          : params.colDef.headerName}
      </Typography>
    );
  },
  renderCell: (params: GridRenderCellParams<any, any, any>) => (
    <Typography variant="body2" mx="0.5em">
      {params.value}
    </Typography>
  ),
};

const defaultAlignment: {
  flex: number;
  headerAlign: GridAlignment;
  align: GridAlignment;
} = {
  flex: 1,
  headerAlign: "left",
  align: "left",
};

export const columns = (
  getEditableTechnician: (item: User) => void,
  getDeletableTechnician: (item: User) => void
): GridColDef[] => [
  {
    field: "email",
    headerName: "Email",
    type: "string",
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: "firstName",
    headerName: "First Name",
    type: "string",
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: "lastName",
    headerName: "Last Name",
    type: "string",
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: "role",
    headerName: "Role",
    type: "string",
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: "dateOfBirth",
    headerName: "Date of Birth",
    type: "string",
    ...defaultAlignment,
    ...defaultProps,
    flex: 2,
  },
  {
    field: "actions",
    headerName: "",
    ...defaultAlignment,
    ...defaultProps,
    renderCell: (params) => (
      <Box sx={{ display: "flex" }}>
        <Box
          onClick={() => getEditableTechnician(params.value)}
          sx={{ mr: "1em" }}
        >
          <Edit sx={{ color: "text.secondary" }} />
        </Box>
        <Box onClick={() => getDeletableTechnician(params.value)}>
          <Delete sx={{ color: "text.secondary" }} />
        </Box>
      </Box>
    ),
  },
];

export const makeRows = (users: User[]): any => {
  const result =
    users.length &&
    users.map((user: User, index: number) => ({
      id: index,
      email: user.email || "-",
      lastName: user.lastName || "-",
      firstName: user.lastName || "-",
      city: user.city || "-",
      country: user.country || "-",
      dateOfBirth: user.dateOfBirth || "-",
      role: user.role || "-",
      actions: user,
    }));
  return result || [];
};
