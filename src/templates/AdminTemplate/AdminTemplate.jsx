import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';
import { PATH } from '../../constants/config';
import { useDispatch } from 'react-redux';
import { getMovieListThunk } from '../../store/QuanLyPhimReducer/thunk';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  
  getItem('User', '1', <NavLink end to={PATH.users}><UserOutlined /></NavLink>),
  getItem('Films', '2', <FileOutlined />,[
    getItem('Films', '21',<NavLink end to={PATH.films}></NavLink>),
    getItem('Add new', '22',<NavLink end to={PATH.addnew}></NavLink>),
  ]),
  getItem('Showtime', '3', <NavLink end to={PATH.showtime}><DesktopOutlined /></NavLink>),

  
];
export const AdminTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch()
  
  useEffect(()=>{
    dispatch(getMovieListThunk())
  },[])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark"  mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

