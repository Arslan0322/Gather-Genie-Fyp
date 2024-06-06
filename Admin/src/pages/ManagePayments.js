import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
import { toast } from 'react-toastify';
import { refundNotification, releaseNotification } from '../utils/notificationFunction';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import { useGetBookingsQuery, useRefundPaymentMutation, useReleasePaymentMutation, useReportCartMutation } from '../store/bookingSlice';
import { useCreateNotificationMutation } from '../store/dashboardSlice';
import Loader from '../components/Loader';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import Payments from '../_mock/payments';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'servicename', label: 'Service Name', alignRight: false },
  { id: 'clientname', label: 'Client Name', alignRight: false },
  { id: 'vendorname', label: 'Vendor Name', alignRight: false },
  { id: 'price', label: 'Service Price', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'paymentStatus', label: 'Payment Status', alignRight: false },
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

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

function applySortFilter(array, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const order = comparator(a[0], b[0]);
  //     if (order !== 0) return order;
  //     return a[1] - b[1];
  //   });
  //   if (query) {
  //     return filter(array, (_user) => {
  //         const serviceName = _user?.serviceName;
  //         return serviceName && serviceName.toLowerCase().includes(query.toLowerCase());
  //     });
  // }
  return filter(array, (_user) => {
    const serviceName = _user?.serviceName;
    return serviceName && serviceName.toLowerCase().includes(query?.toLowerCase());
  });
}

export default function ManagePayments() {
  const { data, isLoading, refetch } = useGetBookingsQuery();
  const [refundPayment] = useRefundPaymentMutation();
  const [releasePayment] = useReleasePaymentMutation();
  const [createNotification] = useCreateNotificationMutation();
  const [reportCart] = useReportCartMutation()
  const [open, setOpen] = useState(null);
  const [paymentID, setPaymentID] = useState(null);
  const [cartID, setCartID] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [reported, setReported] = useState(null);
  const [name, setName] = useState(null);
  const [client, setClient] = useState(null);
  const [vendor, setVendor] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, paymentId, total, cartId, isReported, serviceName, clientId, vendorId) => {
    setClient(clientId);
    setVendor(vendorId);
    setName(serviceName)
    setReported(isReported);
    setPaymentID(paymentId);
    setTotalAmount(total);
    setCartID(cartId);
    setOpen(event.currentTarget);
  };

  const handlePayment = async (query) => {
    if (query === 'Refund') {
      const refund = await refundPayment({ paymentID, totalAmount, cartID });

      if (refund?.error?.status === 500) {
        toast.error('Payment has already been refunded!');
      } else {
        refetch();
        refundNotification(reported, vendor, totalAmount, name, client, createNotification)
        await reportCart(cartID)

        toast.success('Payment has been refunded!');
      }
      setOpen(null);
    } else {
      const release = await releasePayment({ paymentID, totalAmount, cartID });
      if (release?.error?.status === 500) {
        toast.error('Something went wrong.Contact System Support!');
      } else {
        releaseNotification(reported, vendor, totalAmount, name, client, createNotification)
        await reportCart(cartID)
        refetch();
        toast.success('Payment has been released!');
      }
      setOpen(null);
    }
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const filteredUsers = applySortFilter(data || [], filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  if (isLoading) return <Loader />;
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Manage Payments
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                // onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      _id,
                      vendorName,
                      clientName,
                      serviceName,
                      paymentId,
                      servicePhoto,
                      total,
                      status,
                      paymentStatus,
                      cartId,
                      isReported,
                      clientId,
                      vendorId
                    } = row;

                    return (
                      <TableRow hover key={_id} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row" padding="4">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar
                              alt={serviceName}
                              src={servicePhoto && `http://localhost:5000/uploads/${servicePhoto}`}
                            />
                            <Typography variant="subtitle2" noWrap>
                              {serviceName || 'N/A'}
                            </Typography>

                            {isReported && (
                              <Box sx={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                backgroundColor: 'red',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }} />
                            )}
                            
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{clientName || 'N/A'}</TableCell>

                        <TableCell align="left">{vendorName || 'N/A'}</TableCell>

                        <TableCell align="left">{total || 'N/A'}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'approved' && 'declined') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(paymentStatus === 'approved' && 'declined') || 'success'}>
                            {sentenceCase(paymentStatus)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          {((status === 'Complete' && paymentStatus === 'Confirm') || isReported) && (
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={(event) => handleOpenMenu(event, paymentId, total, cartId, isReported, serviceName, clientId, vendorId)}
                            >
                              <Iconify icon={'eva:more-vertical-fill'} />
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

                {isNotFound && (
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
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={Payments.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

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
        <MenuItem
          onClick={() => {
            handlePayment('Release');
          }}
        >
          {/* <Iconify icon={'fluent-mdl2:release-gate-check'} sx={{ mr: 2 }} /> */}
          Release
        </MenuItem>
        <MenuItem
          onClick={() => {
            handlePayment('Refund');
          }}
        >
          {/* <Iconify icon={'fluent-mdl2:release-gate-check'} sx={{ mr: 2 }} /> */}
          Refund
        </MenuItem>

        {/* <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'fluent-mdl2:entry-decline'} sx={{ mr: 2 }} />
          Decline
        </MenuItem> */}
      </Popover>
    </>
  );
}
