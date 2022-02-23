import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 70,
    flexDirection: 'row',
  },
  drawerContainer: {
    width: 330,
    borderRightWidth: 1,
    height: '100%',
  },
  userInfoContainer: {
    borderBottomWidth: 1,
  },
  drawerItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRightWidth: 0.5,
  },
  drawerItemImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  headerContainer: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    marginTop: 12,
    paddingVertical: 8,
  },
});

export default styles;
