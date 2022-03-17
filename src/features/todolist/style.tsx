import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    borderWidth: 1,
    flex: 1,
    marginLeft: 16,
    borderRadius: 8,
  },
  headerContainer: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  createTodoButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  menuContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuButton: {
    paddingVertical: 16,
  },
  dateText: {
    marginTop: 2,
    marginBottom: 5,
    fontSize: 12,
  },
  descriptionText: {
    marginTop: 2,
    fontSize: 14,
  },
  nameText: {
    fontSize: 16,
    marginTop: 5,
  },
  eventContainer: {
    flex: 8,
  },
  checkBoxContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noData: {
    height: 450,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999999,
  },
  listTodo: {
    height: 430,
  },
  listTodoTitle: {
    fontSize: 16,
  },
  error: {
    marginLeft: 16,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseFlex: {
    flex: 1,
  },
});

export default styles;
