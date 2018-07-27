import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Statistic,
  Dropdown
} from 'semantic-ui-react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import * as actions from './redux/actions';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='乐多多全平台管理工具'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as='h2'
      content='数据无价，谨慎操作'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
    <Button primary size='huge'>
      立即监控
      <Icon name='right arrow' />
    </Button>
  </Container>
)

HomepageHeading.propTypes = {
  mobile: PropTypes.bool,
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility
          once={false}
          onBottomPassed={this.showFixedMenu}
          onBottomPassedReverse={this.hideFixedMenu}
        >
          <Segment
            inverted
            textAlign='center'
            style={{ minHeight: 700, padding: '1em 0em' }}
            vertical
          >
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item as='a' active>
                  面板
                </Menu.Item>
                <Dropdown item as='a' text='管理' simple>
                  <Dropdown.Menu>
                    <Dropdown.Item>Small</Dropdown.Item>
                    <Dropdown.Item>Medium</Dropdown.Item>
                    <Dropdown.Item>Large</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Menu.Item as='a'>统计监控</Menu.Item>
                <Menu.Item as='a'>搜索</Menu.Item>
                <Menu.Item position='right'>
                  <Button as='a' inverted={!fixed}>
                    个人中心
                  </Button>
                  <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                    登出
                  </Button>
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}
  hideFixedMenu = () => {this.setState({ fixed: false }); console.log("hide");
  }
  showFixedMenu = () => {this.setState({ fixed: true }); console.log("show");
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state

    if (sidebarOpened) this.setState({ sidebarOpened: false });
    window.scroll(0, 0);
  }

  handleToggle = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
    window.scroll(0, 0);
    }

  render() {
    const { children } = this.props
    const { sidebarOpened } = this.state
    const { fixed } = this.state;
    console.log(fixed);
    
    return (
      <Responsive maxWidth={Responsive.onlyMobile.maxWidth}>
      
        <Sidebar.Pushable>
       
               
               
         
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
            <Menu.Item as='a' active>
              面板
            </Menu.Item>
            <Menu.Item as='a'>管理</Menu.Item>
            <Menu.Item as='a'>统计监控</Menu.Item>
            <Menu.Item as='a'>搜索</Menu.Item>
            <Menu.Item as='a'>个人中心</Menu.Item>
            <Menu.Item as='a'>登出</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher
            dimmed={sidebarOpened}
            onClick={this.handlePusherClick}
            style={{ minHeight: '100vh' }}
          >
           <Visibility
              once={false}
              onBottomPassed={this.showFixedMenu}
              onBottomPassedReverse={this.hideFixedMenu}
            >
            <Segment
              inverted
              textAlign='center'
              style={{ minHeight: 350, padding: '1em 0em' }}
              vertical
            >
              <Container style={{}}>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted>
                      个人中心 
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }}>
                      登出
                    </Button>
                  </Menu.Item>
                </Menu>
               
              </Container>
              
              <HomepageHeading mobile />
            </Segment>
            </Visibility>
            
            
            
            {children}
            
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        {fixed && 
          <div style={{position:"fixed", width: "100%", top: -1, background: "#ecf6fdf5"}}>
              <Menu pointing secondary size='large'
              size='large'>
              <Menu.Item onClick={this.handleToggle}>
                <Icon  name='sidebar' color='red' />
              </Menu.Item>
              <Menu.Item position='right'>
                <Button  basic color='red' as='a' >
                  个人中心 
                </Button>
                <Button basic color='red' as='a'  style={{ marginLeft: '0.5em' }}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
            </div>

            }
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)




ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const DefaultPage = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Grid container stackable verticalAlign='middle'>
      {
        process && process.env.NODE_ENV && 
        <Grid.Row>
          <Grid.Column width={8}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              您当前处于开发环境！！！
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              在Mac环境下使用option+command+I 启用浏览器调试。
              在linux下使用F12启用调试功能
            </p>
            <Header as='h3' style={{ fontSize: '2em' }}>
               这个项目基于redit studio
              
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              我们推荐你使用redit studio来辅助规范开发
            </p>
          </Grid.Column>
          <Grid.Column floated='right' width={6}>
            <Image bordered rounded size='large' src='https://thumbs.dreamstime.com/z/%E4%B8%8D%E5%90%8C%E7%A7%8D%E6%97%8F%E7%9A%84%E5%90%8C%E4%BA%8B%E8%B0%88%E8%AF%9D%E5%9C%A8%E5%8A%9E%E5%85%AC%E5%AE%A4%E4%BC%9A%E8%AE%AE%E4%B8%8A-%E6%84%89%E5%BF%AB%E7%9A%84%E5%B9%B4%E8%BD%BB%E5%95%86%E4%BA%BA%E5%BC%80%E5%8F%91%E7%9A%84%E5%90%88%E4%BD%9C%E5%8D%8F%E8%AE%AE-k-113857103.jpg' />
          </Grid.Column>
        </Grid.Row>

      }
      {
         process && process.env.NODE_ENV && 
         <Grid.Row>
          <Grid.Column textAlign='center'>
            <Button as="a" href="http://localhost:6076" target="view_window" size='huge'>打开Redit Studio</Button>
          </Grid.Column>
        </Grid.Row>

      }
        
        
      </Grid>
    </Segment>
    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
              用户数量
            </Header>
            <Statistic>
              <Statistic.Value>5,550</Statistic.Value>
              <Statistic.Label>注册量</Statistic.Label>
            </Statistic>
          </Grid.Column>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>
                当前在线人数
            </Header>
            <Statistic>
              <Statistic.Value>5,550</Statistic.Value>
              <Statistic.Label>活跃</Statistic.Label>
            </Statistic>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Breaking The Grid, Grabs Your Attention
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Instead of focusing on content creation and hard work, we have learned how to master the
          art of doing nothing by providing massive amounts of whitespace and generic content that
          can seem massive, monolithic and worth your attention.
        </p>
        <Button as='a' size='large'>
          Read More
        </Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <a href='#'>Case Studies</a>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>
          Did We Tell You About Our Bananas?
        </Header>
        <p style={{ fontSize: '1.33em' }}>
          Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but
          it's really true. It took years of gene splicing and combinatory DNA research, but our
          bananas can really dance.
        </p>
        <Button as='a' size='large'>
          I'm Still Quite Interested
        </Button>
      </Container>
    </Segment>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Sitemap</List.Item>
                <List.Item as='a'>Contact Us</List.Item>
                <List.Item as='a'>Religious Ceremonies</List.Item>
                <List.Item as='a'>Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>Banana Pre-Order</List.Item>
                <List.Item as='a'>DNA FAQ</List.Item>
                <List.Item as='a'>How To Access</List.Item>
                <List.Item as='a'>Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  </ResponsiveContainer>
)

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    pathname: state.router.location.pathname
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultPage);