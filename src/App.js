import { Layout, Menu, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import Grades from './components/Grades';
import Home from './components/Home';

import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo">
            React App
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
            <Menu.Item key="2"><Link to="grades"> Dashboard</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '15px 50px' }}>
          <Router>
            <Home path="/" />
            <Grades path="grades" />
          </Router>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Developed with ❤ by Auth0
        </Footer>
      </Layout>
    );
  }
}

export default App;
