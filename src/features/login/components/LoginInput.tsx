import React from 'react';
import { StyleSheet, View } from 'react-native';

import { AppText, RNAppTextInput, AppView, AppTouchableOpacity, AppFontAwesomeIcon } from 'components';
import { useTheme } from 'react-native-paper';

type IProps = React.ComponentProps<typeof View> & {
  label: string;
  placeholder?: string;
  iconName: string;
  iconSize: number;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;
  iconPress?: () => void;
};

const LoginInput: React.FC<IProps> = props => {
  const { label, placeholder, iconName, iconSize, secureTextEntry, value, onChangeText, onSubmitEditing, iconPress } =
    props;

  const { colors } = useTheme();
  const iconColor = secureTextEntry === true || !iconPress ? colors.grey : colors.borderGrey;
  return (
    <View {...props}>
      <AppText style={styles.label} boldOrLight={'normal'}>
        {label}
      </AppText>
      <AppView style={styles.backgroundInput}>
        <RNAppTextInput
          style={styles.textInput}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={() => onSubmitEditing}
        />
        <AppTouchableOpacity disabled={!iconPress} onPress={iconPress}>
          <AppFontAwesomeIcon name={iconName} size={iconSize} color={iconColor} style={styles.iconStyle} />
        </AppTouchableOpacity>
      </AppView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundInput: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#F0F0F3',
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 12,
    marginBottom: 6,
  },
  textInput: {
    width: 310,
    fontSize: 13,
    fontFamily: 'Lato-Regular',
  },
  iconStyle: {
    marginRight: 4,
  },
});

export default LoginInput;
