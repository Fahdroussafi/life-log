import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  addPostButton: {
    width: 40,
    height: 40,
    backgroundColor: '#20B08E',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 4,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    marginRight: 10,
    color: '#000',
  },
  postImage: {
    width: '100%',
    height: 200,
    opacity: 0.9,
    borderRadius: 10,
  },
  postFooter: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  postComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  postDate: {
    color: '#888',
    fontSize: 12,
  },
  postCommentsCount: {
    color: '#20B08E',
    marginLeft: 5,
  },
});

export default styles;
