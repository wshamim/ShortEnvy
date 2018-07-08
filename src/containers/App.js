import { connect } from 'react-redux';
import MainPanel from '../components/MainPanel';
import shortenUrl from '../actions';

const mapStateToProps = urls => ({
  urls
});

export default connect(
  mapStateToProps,
  {
    shortenUrl
  }
)(MainPanel);
