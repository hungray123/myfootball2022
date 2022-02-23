import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    // left: 0,
    // top: 0,
    // right: 0,
    // bottom: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  leftContent: {
    width: 450,
  },
  rightContent: {
    flex: 1,
  },
  logoCrmSmart: {
    marginTop: 22,
    alignItems: 'flex-end',
  },
  imgCrmSmart: {
    height: 50,
    width: 230,
  },
  logoCrmOverlay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgCrmOverlay: {
    width: 700,
    height: 580,
  },
  spinner: {
    color: 'white',
  },
});

export default styles;
