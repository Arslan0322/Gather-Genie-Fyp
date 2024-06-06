import PropTypes from 'prop-types';
import { faker } from '@faker-js/faker';
import { useState, useEffect } from 'react';
import TimeAgo from 'react-timeago';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
// components
import {
  useGetNotificationsQuery,
  useReadNotificationMutation,
  useViewNotificationMutation,
  useViewSingleNotificationMutation,
} from '../../store/dashboardSlice';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { socket } from '../../socket';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    title: 'Your order is placed',
    description: 'waiting for shipping',
  },
  {
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
  },
  {
    title: 'You have new message',
    description: '5 unread messages',
  },
  {
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
  },
];

export default function NotificationsPopover() {
  const { data, isLoading, refetch } = useGetNotificationsQuery();
  const [viewNotification] = useViewNotificationMutation();
  const [readNotification] = useReadNotificationMutation();
  const [viewSingleNotification] = useViewSingleNotificationMutation();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [notificationData, setNotificationData] = useState([]);
  const [receivedNotification, setReceivedNotification] = useState(null);
  const [totalUnRead, setTotalUnRead] = useState(0);

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleRead = async (id) => {
    await readNotification(id);
    await viewSingleNotification(id);
    setTotalUnRead((prevCount) => Math.max(prevCount - 1, 0));
    setOpen(null);
    refetch();
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async () => {
    await viewNotification();
    setTotalUnRead(0);
  };

  useEffect(() => {
    socket.on('receive-notification', (data) => {
      setTotalUnRead((prevCount) => prevCount + 1);
      setReceivedNotification(data);
    });

    refetch();
    // Clean up the socket event listener when the component unmounts
    return () => {
      socket.off('receive-notification');
    };
  }, []);

  useEffect(() => {
    if (receivedNotification !== null && receivedNotification?.toAdmin === true) {
      const sortedArray = [...notificationData, receivedNotification].sort((a, b) =>
        b?.createdAt?.localeCompare(a?.createdAt)
      );
      setNotificationData(sortedArray);
      refetch();
    }
  }, [receivedNotification]);

  useEffect(() => {
    if (data) {
      const filterCount = data?.filter((item) => item?.isCount === false);
      setTotalUnRead(filterCount.length);
      setNotificationData(data);
      refetch();
    }
  }, [data, isLoading]);

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {notificationData.length === 0 ? (
            <Typography variant="subtitle2" sx={{ py: 1, px: 2.5 }}>
              No Notification available
            </Typography>
          ) : (
            <>
              <List
                disablePadding
                subheader={
                  <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                    Recent
                  </ListSubheader>
                }
              >
                {notificationData?.map((notification) => (
                  <NotificationItem key={notification._id} notification={notification} handleRead={handleRead} />
                ))}
              </List>
            </>
          )}
        </Scrollbar>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
    senderId: PropTypes.string,
    isRead: PropTypes.bool,
    isCount: PropTypes.bool,
    toAdmin: PropTypes.bool,
    text: PropTypes.string,
    url: PropTypes.string,
  }),
};

function NotificationItem({ notification, handleRead }) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(!notification?.isRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <Link
        to={notification?.url}
        style={{ textDecoration: 'none' }}
        onClick={() => {
          handleRead(notification?._id);
        }}
      >
        <ListItemText
          primary={notification?.text}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <TimeAgo date={notification?.createdAt} />
            </Typography>
          }
        />
      </Link>
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = <Typography variant="subtitle2">{notification?.text}</Typography>;

  return title;
}
