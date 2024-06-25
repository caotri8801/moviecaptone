import React, { useState } from 'react';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
export const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 800,
      }}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input />
      </Form.Item>
      <Form.Item label="Trailor">
        <Input />
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input />
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu: ">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch />
      </Form.Item>
      <Form.Item label="Số sao">
          <InputNumber min={1} max={10} />
        </Form.Item>
      <Form.Item label="Hình ảnh">
        <input type="file" accept="image/png, image/jpeg,image/gif,image/png" />
        <br />
        {/* <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." /> */}
      </Form.Item>

      <Form.Item label="Button">
        <Button>Button</Button>
      </Form.Item>
    </Form>
  );
};