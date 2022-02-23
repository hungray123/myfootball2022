import React, { useState, useEffect } from 'react';
import { ImageSourcePropType, StyleSheet } from 'react-native';
import _ from 'lodash';
import { toLowerCase, translate } from 'utils';
import { LoginProps } from 'features/login/index';
import { AppButton, AppImage, AppText, AppView } from 'components';
import image from 'assets/icons';
import LoginInput from 'features/login/components/LoginInput';
import { config } from 'constants/config';
import { appConstants } from 'constants/const';

const LoginDialog: React.FC<LoginProps> = (props: LoginProps) => {
  const { onLogin, prevUser, errorMessage, setErrorMessage } = props;
  const [userName, setUserName] = useState<string | undefined>('');
  const [passWord, setPassWord] = useState<string>('');
  const [clear, setClear] = useState(true);
  const [hidePassword, setHidePassword] = React.useState<boolean>(true);

  useEffect(() => {
    setUserName(prevUser?.userName);
  }, [prevUser?.userName]);

  const getUsername = () => {
    if (userName !== prevUser?.userName) {
      return _.toLower(userName);
    }
    return prevUser?.userName;
  };

  const onChangeUsername = (text: string) => {
    const textUsername = text.replace(
      /[^A-Za-z0-9._ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u,
      '',
    );
    setUserName(textUsername);
    setErrorMessage('');
    setClear(false);
  };

  const onChangePassword = (text: string) => {
    setPassWord(text);
    setErrorMessage('');
  };

  const onPressLogin = () => {
    setErrorMessage('');
    const _userName = getUsername() as string;
    onLogin(_userName, passWord);
  };

  const WelcomeText: React.FC = () => {
    const iconGender = (
      prevUser && prevUser.gender && toLowerCase(prevUser.gender) === appConstants.GENDER.NAM
        ? image.AVA_MAN
        : image.AVA_WOMAN
    ) as ImageSourcePropType;
    if (prevUser && clear) {
      return (
        <AppView style={styles.welcomePrevUser}>
          <AppImage style={styles.avatarGender} source={iconGender} />
          <AppView style={styles.welcomeUser}>
            <AppText style={styles.textWelcome}>{translate('welcome')}</AppText>
            <AppText style={styles.textApp} boldOrLight={'bold'}>
              {prevUser?.fullName}
            </AppText>
          </AppView>
        </AppView>
      );
    }
    return (
      <AppView style={styles.welcomenNotPrevUser}>
        <AppText style={styles.textWelcome}>{translate('welcome_to_app')}</AppText>
        <AppText style={styles.textApp} boldOrLight={'bold'}>
          {translate('app_name')}
        </AppText>
      </AppView>
    );
  };

  return (
    <AppView style={styles.container}>
      <AppImage style={styles.imageBackground} source={image.BG_LOGIN_FORM as ImageSourcePropType} />
      <AppView style={styles.paddingContentView} />
      <AppView style={styles.contentView}>
        <AppImage style={styles.logoLogin} source={image.LOGO_LOGIN as ImageSourcePropType} />
        <WelcomeText />
        {errorMessage ? (
          <AppText boldOrLight={'normal'} style={styles.invalidText}>
            {errorMessage}
          </AppText>
        ) : null}
        <AppView style={styles.paddingItem} />
        <LoginInput
          style={styles.textInput}
          label={translate('username')}
          placeholder={translate('username_placeholder')}
          secureTextEntry={false}
          value={userName}
          iconName={'envelope-open'}
          iconSize={16}
          onChangeText={onChangeUsername}
          onSubmitEditing={onPressLogin}
        />
        <LoginInput
          style={styles.textInput}
          label={translate('password')}
          placeholder={translate('password_placeholder')}
          secureTextEntry={hidePassword}
          value={passWord}
          iconName={'lock'}
          iconSize={20}
          onChangeText={onChangePassword}
          onSubmitEditing={onPressLogin}
          iconPress={() => setHidePassword(!hidePassword)}
        />
        <AppButton style={styles.loginButton} onPress={onPressLogin} uppercase={false}>
          <AppText style={styles.loginText}>{translate('login')}</AppText>
        </AppButton>

        <AppView style={styles.copyright}>
          <AppText style={styles.copyrightText}>
            {translate('copyright_version')}
            {config.IS_UAT === '1' ? '_UAT' : ''}
          </AppText>
          <AppText style={styles.copyrightText}>{translate('copyright')}</AppText>
        </AppView>
      </AppView>
      <AppView style={styles.paddingContentView} />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  contentView: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  paddingContentView: {
    flex: 1.2,
  },
  paddingItem: {
    marginTop: 12,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  logoLogin: {
    width: 160,
    height: 69,
    marginLeft: 6,
    marginBottom: 24,
  },
  textWelcome: {
    fontSize: 24,
    color: 'black',
    marginBottom: 4,
  },
  textApp: {
    fontSize: 24,
    color: '#5E81F4',
    fontWeight: 'bold',
  },
  marginBottom: {
    marginBottom: 24,
  },
  welcomenNotPrevUser: {
    marginBottom: 28,
  },
  welcomePrevUser: {
    flexDirection: 'row',
    marginBottom: 28,
  },
  welcomeUser: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  instructionButton: {
    alignItems: 'flex-end',
  },
  textInput: {
    marginBottom: 24,
  },
  avatarGender: {
    width: 84,
    height: 84,
  },
  loginButton: {
    height: 44,
    marginTop: 16,
    backgroundColor: '#5E81F4',
    justifyContent: 'center',
    borderRadius: 8,
  },
  loginText: {
    color: 'white',
    fontSize: 14,
    letterSpacing: 0,
  },
  invalidText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 16,
  },
  copyright: {
    marginTop: 26,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: '#86868F',
  },
  instructionText: {
    fontSize: 13,
    color: '#5E81F4',
  },
});

export default LoginDialog;
