/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';


import { Dimmer, Loader, Advertisement } from 'semantic-ui-react'
import { getToken } from './token';


function renderRouteConfigV3(routes, contextPath) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list

  const renderRoute = (item, routeContextPath) => {
    let newContextPath;
    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');
    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath);
      children.push(
        <Route
          key={newContextPath}
          render={props => <item.component {...props}>{childRoutes}</item.component>}
          path={newContextPath}
        />
      );
    } else if (item.component) {
      children.push(<Route key={newContextPath} component={item.component} path={newContextPath} exact />);
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));

  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      isValid: false,
    }
  }
  componentDidMount(){
      
      getToken().then(key=>{
        console.log(key);
        
        if(key.token && key.uuid){
          this.setState({
            loading: false
          })
        }else{
          this.setState({
            loading: false,
            isValid: true
          })
        }
  
     }).catch(err=>{
       console.log("token fail", err);
       this.setState({
        loading: false,
        isValid: true
      })
       
     });
   
  }
  render() {
    console.log(this.state);
    
    const children = renderRouteConfigV3(this.props.routeConfig, '/');
    return (
      <Provider store={this.props.store}>
       
        <ConnectedRouter history={history}>
        <div>
          <Dimmer active={this.state.loading}>
            <Loader content='加载中' />
          </Dimmer>
          {(!this.state.loading && !this.state.isValid) && children}
          {this.state.isValid && 
            <div style={{display: "flex", justifyItems: "center", justifyContent: "center"}}>
              <Advertisement unit='medium rectangle' test='您的设备没有通过乐多多平台的安全验证' />
            </div>
          }
        </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
