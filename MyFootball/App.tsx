import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {store} from 'src/redux';
import RootStackNavigation from 'src/navigations/RootStackNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <RootStackNavigation />
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;
