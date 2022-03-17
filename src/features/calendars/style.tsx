import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#FFFFFF',
  },
  monthItemContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    justifyContent: 'center',
  },
  monthItemTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthItemText: {
    textAlign: 'center',
    fontSize: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  dotItem: {
    marginBottom: 2,
    marginHorizontal: 1,
  },
  monthHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  monthHeaderTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
  },
  monthViewContainer: {
    marginBottom: 16,
  },
  headerContainer: {
    borderBottomWidth: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
  },
  dropdownStyle: {
    height: 40,
  },
  dropdownContainer: {
    width: 120,
  },
  calendarTypeContainer: {
    width: 120,
    marginHorizontal: 16,
  },
  calendarPickerRow: {
    position: 'absolute',
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  calendarViewContainer: {
    zIndex: -1,
    elevation: -1,
  },
  priorityFilterContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  dropdownPlaceholder: {
    flex: 2,
  },
  titleContainer: {
    flex: 1,
    fontSize: 16,
  },
  priorityFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityText: {
    paddingHorizontal: 4,
    fontSize: 14,
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
  error: {
    flex: 1,
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
