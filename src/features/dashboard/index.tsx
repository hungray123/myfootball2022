import * as React from 'react';
import { DashBoardScreenProps } from 'app/type';
import { AppView, AppScrollView } from 'components';
import Calendar from 'features/calendars';
import TodoList from 'features/todolist';
import styles from 'features/dashboard/style';
import Charts from 'features/dashboard/components/Charts';

const Dashboard: React.FC<DashBoardScreenProps> = () => {
  return (
    <AppScrollView nestedScrollEnabled={true}>
      <AppView style={styles.container}>
        <Calendar />
        <TodoList />
      </AppView>
      <Charts />
      <AppView style={styles.bottomView} />
    </AppScrollView>
  );
};

export default Dashboard;
