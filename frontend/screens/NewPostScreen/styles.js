import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#20B08E',
    padding: 8,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexGrow: 1,
    padding: 16,
  },
  button: {
    backgroundColor: '#20B08E',
    padding: 8,
    borderRadius: 25,
    marginBottom: 16,
  },
  header: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
    letterSpacing: 2,
    fontFamily: 'avenir',
  },
  header2: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
    letterSpacing: 2,
    fontFamily: 'avenir',
  },
  container2: {
    flex: 1,
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    color: '#000',
    fontFamily: 'avenir',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
    color: '#000',
  },
  uploadText: {
    color: '#000',
    padding: 8,
    borderRadius: 5,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    padding: 8,
    borderRadius: 5,
    width: 300,
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default styles;
