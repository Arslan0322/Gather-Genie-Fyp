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
  Button,
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
} from '@mui/material';
// components
import { useNavigate, useParams } from 'react-router-dom';
import { useGetAllVendorsQuery, useChangeVendorStatusMutation } from '../store/registrationSlice';
import { useDeleteClientMutation } from '../store/clientSlice';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import AddVendorDrawer from '../components/AddVendorDrawer';
import Loader from '../components/Loader';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Vendor Name', alignRight: false },
  { id: 'email', label: 'Email Address', alignRight: false },
  { id: 'phone', label: 'Phone No', alignRight: false },
  { id: 'servicetype', label: 'Service Type', alignRight: false },
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
    return filter(array, (_user) => {
      const firstNameMatch = _user.firstname.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      const lastNameMatch = _user.lastname.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      return firstNameMatch || lastNameMatch;
    });
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function RequestPage() {
  const { data, isLoading, refetch } = useGetAllVendorsQuery();
  const [changeVendorStatus] = useChangeVendorStatusMutation();
  const [deleteClient] = useDeleteClientMutation();
  const [open, setOpen] = useState(null);
  const [vendorId, setVendorId] = useState(null);
  const [page, setPage] = useState(0);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { id } = useParams();

  // handle
  const refetchAgain = () => {
    refetch();
  };
  const toggleDrawer = () => {
    console.log(openDrawer);
    setOpenDrawer(!openDrawer);
  };

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpenMenu = (event, _id) => {
    setVendorId(_id);
    setOpen(event.currentTarget);
  };

  const handleAccept = async () => {
    await changeVendorStatus({ id: vendorId, status: 'Accepted' });
    refetch();
    setOpen(null);
  };

  const handleReject = async () => {
    await changeVendorStatus({ id: vendorId, status: 'Rejected' });
    refetch();
    setOpen(null);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const navigate = useNavigate();
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data?.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    await deleteClient(_id);

    refetch();
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRedirect = (id) => {
    navigate(`/home/requests/${id}`);
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

  if (isLoading) return <Loader />;

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Registration Requests
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={toggleDrawer}>
            New Vendor
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { _id, firstname, lastname, email, number, status, photo, vendor, experience } = row;

                    return (
                      <TableRow hover key={_id} tabIndex={-1}>
                        <TableCell component="th" scope="row" padding="4" onClick={() => handleRedirect(_id)}>
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={firstname} src={photo && `http://localhost:5000/uploads/${photo}`} />

                            <Typography variant="subtitle2" noWrap style={{ cursor: 'pointer' }}>
                              {`${firstname} ${lastname}`}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{number}</TableCell>

                        <TableCell align="left">{vendor}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'approved' && 'rejected') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
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
                          {console.log('exp:', experience)}
                          {experience && (
                            <>
                              <a
                                href={`http://localhost:5000/uploads/${experience}`}
                                rel="noreferrer"
                                target="_blank"
                                download
                              >
                                <Iconify icon={'iconoir:download'} />
                              </a>
                            </>
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
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <AddVendorDrawer toggleDrawer={toggleDrawer} open={openDrawer} refetchAgain={refetchAgain} />
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
