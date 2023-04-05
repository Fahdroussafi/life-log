import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  postScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  postImage: {
    width: '100%',
    height: 200,
    opacity: 0.9,
    borderRadius: 10,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  postComments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  postCommentsText: {
    color: '#20B08E',
    marginLeft: 5,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    marginRight: 10,
    color: '#000',
  },
  postDescription: {
    color: '#000',
    fontSize: 14,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  postDate: {
    color: '#888',
    fontSize: 12,
  },
  postTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    color: '#20B08E',
  },
  postTag: {
    color: '#20B08E',
    marginRight: 5,
    marginBottom: 5,
  },
  postCreatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  postCreator: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  postCommentsContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 10,
    marginTop: 20,
  },
  postCommentItemContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  postCommentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  postCommentLine: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default styles;
