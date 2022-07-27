import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import useTheme from '@mui/material/styles/useTheme';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {observer} from 'mobx-react';

import {MenuBtn} from '../MenuBtn';
import {BackAction} from '../BackToAction';
import UserStore from '../../store/User';
import AuthStore from '../../store/Auth';

interface Props {
  pageTitle?: string;
  showBackAction?: boolean;
  backBtnLabel?: string;
}

const AppTopBar = ({pageTitle, showBackAction, backBtnLabel = ''}: Props) => {
  const theme = useTheme();

  const profile = UserStore.user;

  const getName = () => {
    if (profile?.firstName || profile?.lastName) {
      return `${profile.firstName} ${profile?.lastName}`;
    }
    return profile?.email;
  };

  const profileBtnLabel = () => (
    <Box ml={2}>
      <Typography
        color="#222B45"
        variant="subtitle1"
        gutterBottom={false}
        sx={{textTransform: 'capitalize'}}>
        {getName()}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={{
          textTransform: 'capitalize',
          fontSize: '0.875rem',
          padding: 0,
          color: theme.palette.text.secondary,
        }}>
        {/* {user
          ? convertToText(
              user.userAccount.roles.includes(Role.SERVICE_MANAGER)
                ? Role.SERVICE_MANAGER
                : user.userAccount.roles[0],
            )
          : '-'} */}
      </Typography>
    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
      }}>
      <Box width="4.5rem" />
      <Box sx={{display: 'flex', justifyContent: 'space-between', flexGrow: 1}}>
        {showBackAction ? (
          <BackAction label={backBtnLabel} containerStyle={{mt: '1em'}} />
        ) : null}
        <Typography
          variant="h4"
          component="div"
          sx={{display: 'flex', alignItems: 'center', mt: '0.2em'}}>
          {pageTitle || null}
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/* 
          TODO: Implement notifications
          <Link to="/notifications">
            <Badge
              badgeContent={1}
              overlap="circular"
              color="error"
              sx={{
                marginLeft: 4,
                marginTop: 1,
                color: '#FF4B55',
                cursor: 'pointer',
              }}>
              <NotificationsNoneIcon color="primary" />
            </Badge>
          </Link> */}
          <Box ml={2} display="flex" alignItems="center">
            <Avatar alt="" src="" />
            <MenuBtn
              endIcon={
                <ArrowDropDownIcon sx={{color: theme.palette.action.active}} />
              }
              label={profileBtnLabel()}
              menu={[
                {
                  label: 'Logout',
                  action: () => {
                    console.log('test');
                    AuthStore.logout();
                  },
                },
              ]}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default observer(AppTopBar);
