import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F6F6F6',
  },
  button: {
    backgroundColor: '#20B08E',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    letterSpacing: 1,
  },
  bottomContainer: {
    justifyContent: 'center',
    height: height / 3,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#20B08E',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 25,
    paddingLeft: 10,
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#010101',
  },
  formButton: {
    backgroundColor: '#20B08E',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginHorizontal: 20,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formInputContainer: {
    // marginBottom: 20,
    marginTop: 20,
    ...StyleSheet.absoluteFill,
    zIndex: -1,
    justifyContent: 'center',
  },
  closeButtonContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 1,
    backgroundColor: '#010101',
    alignItems: 'center',
    borderRadius: 20,
    top: -20,
  },
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  postContainer: {
    // backgroundColor: '#F6F6F6',
    borderRadius: 10,
    marginHorizontal: 8,
    marginVertical: 4,
    padding: 15,
    marginRight: 10,
    marginLeft: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  postAuthor: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  postDate: {
    color: '#888',
    fontSize: 12,
  },
  postBody: {
    marginBottom: 8,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#000',
  },
  postContent: {
    color: '#888',
    fontSize: 14,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  postLikes: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  postLikesCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#888',
  },
  postComments: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  postCommentsCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#888',
  },
  postImage: {
    width: '100%',
    height: 200,
    opacity: 0.9,
    borderRadius: 10,
  },
});

export default styles;
