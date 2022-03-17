import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  calendarDialogcontainer: {
    marginVertical: 100,
    marginHorizontal: 250,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  calendarButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#00000050',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  pickerRowContainer: {
    width: 700,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityIconContainer: {
    marginHorizontal: 4,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  priorityLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  priorityButton: {
    alignItems: 'center',
  },
  headerText: { fontSize: 18 },
  headerContainer: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  calendarEventContainer: {
    marginHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: 700,
  },
  dateTimeInput: {
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  closeButton: {
    backgroundColor: '#EBEBEC',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  fromText: { marginHorizontal: 16 },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 16,
  },
  buttonLabel: { fontSize: 16, letterSpacing: 0 },
  helperText: { marginLeft: -10 },
  calendarIcon: { marginLeft: 24 },
});

export default styles;
