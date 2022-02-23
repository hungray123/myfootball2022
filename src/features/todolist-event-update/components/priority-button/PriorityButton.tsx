import { AppMaterialIcon, AppTouchableOpacity, AppView } from 'components';
import AppText from 'components/text/AppText';
import styles from 'features/todolist-event/style';
import * as React from 'react';
import _ from 'lodash';
import { useAppSelector } from 'app/hooks';

interface IPriorityButton {
  label: string;
  color: string;
  value: string;
  onPress: (value: string) => void;
  disabled: boolean;
}

const PriorityButton: React.FC<IPriorityButton> = ({ label, color, value, onPress, disabled }: IPriorityButton) => {
  const level: string = useAppSelector(state => state.todoEventState.level);
  const colorIcon = _.isEqual(level, value) ? '#FFFFFF' : 'transparent';
  return (
    <AppView style={styles.priorityButton}>
      <AppTouchableOpacity
        disabled={disabled}
        onPress={() => onPress(value)}
        style={[styles.priorityIconContainer, { backgroundColor: color }]}>
        <AppMaterialIcon name="check-bold" size={15} color={colorIcon} />
      </AppTouchableOpacity>
      <AppText style={styles.priorityLabel}>{label}</AppText>
    </AppView>
  );
};

export default PriorityButton;
