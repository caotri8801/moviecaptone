import { ConfigProvider } from "antd";
import React from "react";
import { StyleProvider } from '@ant-design/cssinjs'

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  return (
    <ConfigProvider
      // theme={{
      //   components: {
      //     Button: {
      //       colorPrimary: '#14753c',
      //       colorPrimaryHover: '#14573c',
      //       contentFontSize: 20,
      //     },
      //   },
      // }}
    >
      <StyleProvider hashPriority="high">{children}</StyleProvider>
    </ConfigProvider>
  )
}
