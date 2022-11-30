import React from 'react';
import { Button, Icon, Typography, Card, CardContent, CardActions, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: {}, componentStack: '', open: false, message: '' };
    this.showSuccess = this.showSuccess.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      ...this.state,
      error: error,
      componentStack: JSON.stringify(errorInfo)
    });
  }

  showSuccess = (message) => {
    this.setState({ open: true, message });
  };

  hideSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };
  cacheClean = () => {
    let i;
    const rep = /.*\?.*/,
      scripts = document.getElementsByTagName('script'),
      process_scripts = false;

    if (process_scripts) {
      for (i = 0; i < scripts.length; i++) {
        const script = scripts[i],
          src = script.src;
        if (rep.test(src)) {
          script.src = src + '&' + Date.now();
        } else {
          script.src = src + '?' + Date.now();
        }
      }
    }
    alert('Cache clean successfully');
  };

  localStorageClean = () => {
    localStorage.clear();
    alert('Local Storage clear successfully');
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center'
          }}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: '100%',
              height: '100%'
            }
          }}>
          <Card sx={{ maxWidth: '90%' }}>
            <CardContent>
              <Typography
                style={{ color: 'red', textAlign: 'center' }}
                gutterBottom
                variant="h2"
                component="div">
                Error!
              </Typography>
              <Typography className="pb-16" variant="h5" color="text.secondary">
                An unexpected error has been encountered. Send an e-mail to zulkufadsiz@gmail.com
                with the steps and screenshot of the process you have done
              </Typography>
              <div className="desc">
                <Typography variant="body2">
                  <Icon onClick={this.cacheClean} style={{ color: 'red' }} type="close-circle" />{' '}
                  {this.state.error.message}
                </Typography>
                <Typography>
                  <Icon
                    onClick={this.localStorageClean}
                    style={{ color: 'red' }}
                    type="close-circle"
                  />
                  {this.state.componentStack}
                </Typography>
              </div>
            </CardContent>
            <CardActions
              style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Button key="cache" type="primary" onClick={this.cacheClean.bind(this)}>
                Clean Cache
              </Button>
              <Button
                key="localStorageClean"
                type="danger"
                onClick={this.localStorageClean.bind(this)}>
                Clean Local Storage
              </Button>
              <Button
                key="reload"
                type={'default'}
                onClick={() => {
                  window.location.reload();
                }}>
                Try Again
              </Button>
            </CardActions>
          </Card>
        </Box>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.any
};
