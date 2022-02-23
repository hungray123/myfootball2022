import { AppError } from 'app/type';
import image from 'assets/icons';
import { AppButton, AppImage, AppText, AppView, AppViewWithFullScreenLoading } from 'components';
import { useDialog } from 'components/dialog/AppDialogContext';
import { useAppUser } from 'context/AppUserContext';
import * as React from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { checkNullOrEmpty, translate } from 'utils';

const UserInfo: React.FC = () => {
  const theme = useTheme();
  const { getBasiclUserLoginInfo, onLogout, getDetailUserLoginInfo } = useAppUser();
  const detailUserInfo = getDetailUserLoginInfo();
  const branchCode =
    checkNullOrEmpty(detailUserInfo) ||
    checkNullOrEmpty(detailUserInfo?.t24Employee) ||
    checkNullOrEmpty(detailUserInfo?.t24Employee.branchLevel2)
      ? ''
      : detailUserInfo?.t24Employee.branchLevel2;
  const branchName =
    checkNullOrEmpty(detailUserInfo) ||
    checkNullOrEmpty(detailUserInfo?.t24Employee) ||
    checkNullOrEmpty(detailUserInfo?.t24Employee.branchNameLevel2)
      ? ''
      : detailUserInfo?.t24Employee.branchNameLevel2;
  const { showDialog } = useDialog();
  const user = getBasiclUserLoginInfo();

  const avatar =
    user?.gender === 'Nam' ? (image.AVA_MAN as ImageSourcePropType) : (image.AVA_WOMAN as ImageSourcePropType);

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleLogout = () => {
    if (!loading) {
      setLoading(true);
      onLogout()
        .then(() => {
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          const message = (error as AppError).message as string;
          showDialog({
            dialogType: 'error',
            title: translate('notification'),
            message: message,
            description: 'description',
            buttonCancel: { label: translate('close'), color: theme.colors.clearBlue },
          });
        });
    }
  };

  const logOutPress = () => {
    showDialog({
      dialogType: 'info',
      title: translate('logout'),
      message: translate('warning_logout'),
      description: 'description',
      buttonAccept: { onPress: handleLogout, label: translate('accept'), color: theme.colors.primaryBlue },
      buttonCancel: { label: translate('cancel'), color: theme.colors.clearBlue },
    });
  };
  return (
    <AppViewWithFullScreenLoading
      isLoading={loading}
      textLoading={translate('logging_out')}
      style={[styles.container, { backgroundColor: theme.colors.clearBlue }]}>
      <AppText boldOrLight="bold" style={styles.title}>
        {translate('rm_info')}
      </AppText>
      <AppView
        style={[
          styles.userCard,
          {
            backgroundColor: theme.colors.white,
          },
        ]}>
        <AppView style={styles.infoContainer}>
          <AppImage source={avatar} style={styles.avatarImage} />
          <AppView>
            <AppText boldOrLight="bold" style={[styles.nameText, { color: theme.colors.primaryBlue }]}>
              {user?.fullName}
            </AppText>
            <AppText style={[styles.infoText, { color: theme.colors.grey }]}>
              {translate('user_code')}
              {user?.hrsCode}
            </AppText>
            <AppText style={[styles.infoText, { color: theme.colors.grey }]}>
              {translate('rm_code')}
              {user?.code}
            </AppText>
            <AppText style={[styles.infoText, { color: theme.colors.grey }]}>
              {translate('branch_code')}
              {branchCode}
            </AppText>
            <AppText style={[styles.infoText, { color: theme.colors.grey }]}>
              {translate('branch_name')}
              {branchName}
            </AppText>
          </AppView>
        </AppView>
        <AppButton
          style={[
            styles.buttonLogout,
            {
              backgroundColor: theme.colors.clearBlue,
            },
          ]}
          labelStyle={[styles.buttonLabel, { color: theme.colors.black, fontFamily: theme.fonts.regular.fontFamily }]}
          mode="contained"
          uppercase={false}
          onPress={logOutPress}
          children={translate('logout')}
        />
      </AppView>
    </AppViewWithFullScreenLoading>
  );
};
export default UserInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
  },
  userCard: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  avatarImage: {
    width: 150,
    height: 150,
    marginRight: 16,
  },
  nameText: {
    marginTop: 8,
    fontSize: 24,
  },
  infoText: {
    marginTop: 8,
    fontSize: 16,
  },
  buttonLogout: {
    width: 160,
    marginTop: 16,
  },
  buttonLabel: {
    letterSpacing: 0,
  },
  infoContainer: {
    flexDirection: 'row',
  },
});
