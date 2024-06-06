import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// @mui
import {
  Table,
  Stack,
  Paper,
  Avatar,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Popover,
  MenuItem,
} from '@mui/material';
// components
import { useNavigate } from 'react-router-dom';
import { useChangeServiceStatusMutation, useDeleteServiceMutation } from '../../../store/registrationSlice';
import { useCreateNotificationMutation } from '../../../store/dashboardSlice';
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import { socket } from '../../../socket';
// sections
import UserListHead from '../user/UserListHead';
// mock
import Services from '../../../_mock/services';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'servicename', label: 'Service Name', alignRight: false },
  { id: 'servicetype', label: 'Service Type', alignRight: false },
  { id: 'serviceprice', label: 'Price', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function AccordianTable({ data, servicetype, refetchAgain, isPackage }) {
  const [changeServiceStatus] = useChangeServiceStatusMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [deleteService] = useDeleteServiceMutation()
  const [open, setOpen] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [name, setName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [page, setPage] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDelete = async(e, _id) => {
    e.preventDefault();
    await deleteService(_id);

    refetchAgain();
  };

  const handleOpenMenu = (event, _id) => {
    setServiceId(_id);
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenDrawer(null);
  };

  const handleAccept = async () => {
    const notificationData = {
      receiverId: userId,
      text: `${name} has been approved`,
      url: `/home`,
      createdAt: `${new Date()}`,
    };
    await changeServiceStatus({ id: serviceId, status: 'Accepted' });
    await createNotification(notificationData);

    // sending to admin from socket
    socket.emit('send-notification', notificationData);
    refetchAgain();
    setOpen(null);
  };

  const handleReject = async () => {
    const notificationData = {
      receiverId: userId,
      text: `${name} has been rejected`,
      url: `/home`,
      createdAt: `${new Date()}`,
    };

    await changeServiceStatus({ id: serviceId, status: 'Rejected' });
    await createNotification(notificationData);
    // sending to admin from socket
    socket.emit('send-notification', notificationData);
    refetchAgain();
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRedirect = () => {
    navigate('/vendordetail');
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data?.length) : 0;

  const filteredUsers = applySortFilter(data || [], getComparator(order, orderBy), filterName);
  const isNotFound = !filteredUsers.length && !!filterName;

  useEffect(() => {
    if (data && serviceId) {
      const filterData = data?.filter((item) => item._id === serviceId);
      setUserId(filterData[0].userId);
      setName(filterData[0].name);
    }
  }, [serviceId]);

  return (
    <>
      {' '}
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead order={order} orderBy={orderBy} headLabel={TABLE_HEAD} onRequestSort={handleRequestSort} />
            <TableBody>
              {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { _id, status, name, price, coverImage, description } = row;

                return (
                  <TableRow hover key={_id} tabIndex={-1}>
                    <TableCell component="th" scope="row" padding="4" onClick={handleRedirect}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={coverImage && `http://localhost:5000/uploads/${coverImage}`} />

                        <Typography variant="subtitle2" noWrap>
                          {name}
                        </Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="left">{servicetype}</TableCell>

                    <TableCell align="left">{price}</TableCell>

                    <TableCell align="left">{description}</TableCell>

                    <TableCell align="left">
                      <Label color={(status === 'approved' && 'declined') || 'success'}>{sentenceCase(status)}</Label>
                    </TableCell>

                    <TableCell align="right">
                      {status === 'Pending' && (
                        <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, _id)}>
                          <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                      )}
                      {status === 'Accepted' && (
                        <IconButton color="black" onClick={(e) => handleDelete(e, _id)}>
                          <Iconify icon={'mdi:delete'} />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            {/* {isNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper
                      sx={{
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="h6" paragraph>
                        Not found
                      </Typography>

                      <Typography variant="body2">
                        No results found for &nbsp;
                        <strong>&quot;{filterName}&quot;</strong>.
                        <br /> Try checking for typos or using complete words.
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )} */}
          </Table>
        </TableContainer>
      </Scrollbar>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={() => handleAccept()}>
          <Iconify icon={'mdi:approve'} sx={{ mr: 2 }} />
          Accept
        </MenuItem>

        <MenuItem onClick={() => handleReject()} sx={{ color: 'error.main' }}>
          <Iconify icon={'fluent-mdl2:entry-decline'} sx={{ mr: 2 }} />
          Decline
        </MenuItem>
      </Popover>
    </>
  );
}
