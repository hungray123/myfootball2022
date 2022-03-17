import styles from './style';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { DialogScreenNavigationProp } from 'app/type';
import { translate } from 'utils';

const Dialog: React.FC<DialogScreenNavigationProp> = ({ route, navigation }: DialogScreenNavigationProp) => {
  // const { dialogType, message, description, onAccept, onCancel } = route.params.dialogObj;

  // const _onCancel = () => {
  //   navigation.goBack();
  //   if (onCancel) {
  //     onCancel();
  //   }
  // };
  // const _onAccept = () => {
  //   navigation.goBack();
  //   if (onAccept) {
  //     onAccept();
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* <Text>{dialogType}</Text>
      <Text>{message}</Text>
      {description ? <Text>{description}</Text> : null}
      {onAccept ? (
        <Button
          onPress={_onAccept}
          title={translate('accept')}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      ) : null}
      <Button
        onPress={_onCancel}
        title={translate('close')}
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      /> */}
    </View>
  );
};

export default Dialog;
