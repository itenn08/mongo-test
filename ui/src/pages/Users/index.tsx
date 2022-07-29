import React, {useEffect, useState} from 'react';
import {Box, CircularProgress} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid';

import {useQueryUsers, useUsers} from '../../hooks/reactQuery/useUsers';
import {User} from '../../types/users';
import styles from './styles.module.scss';
import {DataGridLayout} from '../../components/DataGridLayout';
import {columns, makeRows} from './UserTableDataGrid';
import UserEdit from './EditUser';
import {createEmptyResource, makePage} from '../../utils/paging';
import DeleteModal from '../../components/DeleteModal';

const pageSize = 10;

const UsersTable = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(makePage(0, pageSize));
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const {deleteUser} = useUsers();

  const {data: userResource = createEmptyResource<User>(pageSize), isLoading} =
    useQueryUsers(
      {
        pageIndex: page.pageIndex,
        pageSize: page.pageSize,
      },
      {keepPreviousData: true},
    );

  useEffect(() => {
    setPageCount(Math.ceil(userResource.total / page.pageSize));
  }, [userResource, page.pageSize]);

  useEffect(() => {
    if (!isLoading && userResource && userResource?.data?.length > 0) {
      setRows(makeRows(userResource));
    }
  }, [userResource, isLoading]);

  const handleDeleteUser = async () => {
    await deleteUser(selectedUser?.id!);
    handleCloseModal();
  };

  const getEditableTechnician = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const getDeletableTechnician = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  return (
    <div className={styles.wrapper}>
      {rows.length > 0 ? (
        <div style={{height: 650, width: '100%'}}>
          <Box display="flex" flexGrow={1} sx={{minHeight: '650px'}}>
            <DataGridLayout
              rows={rows}
              columns={columns(getEditableTechnician, getDeletableTechnician)}
              loading={isLoading}
              pageSize={page.pageSize}
              pageIndex={page.pageIndex + 1}
              pageCount={pageCount}
              hideFooter={pageCount <= 1}
              handlePageChange={(value) =>
                setPage((prev) => ({
                  ...prev,
                  pageIndex: value - 1,
                }))
              }
            />
          </Box>
        </div>
      ) : (
        <CircularProgress />
      )}
      {selectedUser && (
        <UserEdit
          user={selectedUser!}
          openDialog={showEditModal}
          onClose={handleCloseEditModal}
        />
      )}
      <DeleteModal
        open={showDeleteModal}
        onConfirm={handleDeleteUser}
        onClose={handleCloseModal}
        title="Delete User"
        content={`Are you sure to delete user ${selectedUser?.email}?`}
      />
    </div>
  );
};

export default UsersTable;
