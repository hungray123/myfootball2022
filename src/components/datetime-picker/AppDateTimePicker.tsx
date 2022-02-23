import * as React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

type IProps = React.ComponentProps<typeof DateTimePickerModal>;

const AppDateTimePicker: React.FC<IProps> = props => {
  const propsWithTheme = {
    ...props,
  };
  return <DateTimePickerModal {...propsWithTheme} />;
};

export default AppDateTimePicker;
