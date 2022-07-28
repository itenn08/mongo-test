import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Modal} from '@mui/material';
import {GridRowsProp} from '@mui/x-data-grid';

import {useQueryUsers, useUsers} from '../../hooks/reactQuery/useUsers';
import {User} from '../../types/users';
import styles from './styles.module.scss';
import {DataGridLayout} from '../../components/DataGridLayout';
import {columns, makeRows} from './UserTableDataGrid';
import UserEdit from './EditUser';
import {createEmptyResource, makePage} from '../../utils/paging';

const pageSize = 10;

const UsersTable = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [page, setPage] = useState(makePage(0, pageSize));
  const [pageCount, setPageCount] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

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

      <Modal open={showDeleteModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <div className={styles.modalText}>
            Are you sure to delete user <span>{selectedUser?.email}</span>?
          </div>
          <div className={styles.modalButtons}>
            <Button onClick={handleCloseModal} variant="contained">
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteUser}>
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersTable;
