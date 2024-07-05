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
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinhThunk } from '../../../../store/QuanLyPhimReducer/thunk';
export const AddNew = () => {
  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [imgSrc, setImgSrc] = useState('')
  const {
    
    handleSubmit, // submit form
    register, // register field
    formState: { errors }, // validate
    setValue, // thay đổi giá trị của 1 field name bất kỳ
    getValues, // lấy toàn bộ thuộc tính value trong form
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    }

  })

  const getChangeHandlerWithEvent = name => event =>
    setValue(name, event.target.value);

  const handleChangeDatePicker = name => event =>
    setValue(name, moment(event._d).format('DD/MM/YYYY'));

  const handleChangeSwitch = (name) => {

    return (value) => {
      setValue(name, value)
    }
  }

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    console.log("file: ", file);
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result);//Hình base 64

      }
      //  Đem dữ liệu file lưu vào form
      setValue('hinhAnh', file);
    }
  }

  const dispatch = useDispatch()
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
      onSubmitCapture={handleSubmit((values) => {
        // console.log("values: ", values);
        values.maNhom = GROUPID;
        let formData = new FormData();
        for (let key in values) {
          if (key !== 'hinhAnh') {
            formData.append(key, values[key]);
          } else {
            console.log("hinhAnh: ", values.hinhAnh);
            formData.append('File', values.hinhAnh, values.hinhAnh.name);
          }
        }
        // const hasErrorClass = name => ({ className: errors[name] && "has-error" });

        // const errorDetail = (name, message) =>
        // errors[name] && <div className="ant-form-explain">{message}</div>;
        dispatch(themPhimUploadHinhThunk(formData))
      })}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input {...register('tenPhim'
          , {
            required: 'Vui lòng nhập tên phim'
          }
        )}
          onChange={getChangeHandlerWithEvent('tenPhim')}
        />
        {errors?.tenPhim && <p className='text-danger'>{errors?.tenPhim?.message}</p>}
      </Form.Item>
      <Form.Item label="Trailor">
        <Input {...register('trailer'
          , {
            required: 'Vui lòng nhập trailer'
          }
        )}
          onChange={getChangeHandlerWithEvent('trailer')}
        />
        {errors?.trailer && <p className='text-danger'>{errors?.trailer?.message}</p>}
      </Form.Item>
      <Form.Item label="Mô tả">
        <Input {...register('moTa'
          , {
            required: 'Vui lòng nhập mô tả'
          }
        )}
          onChange={getChangeHandlerWithEvent('moTa')}
        />
        {errors?.moTa && <p className='text-danger'>{errors?.moTa?.message}</p>}
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu: ">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker('ngayKhoiChieu')} 
        // {...register('ngayKhoiChieu'
        //   , {
        //     required: 'Vui lòng chọn ngày khởi chiếu'
        //   }
        // )}
        />
        {errors?.ngayKhoiChieu && <p className='text-danger'>{errors?.ngayKhoiChieu?.message}</p>}
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('dangChieu')} />
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('sapChieu')} />
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('hot')} />
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber onChange={handleChangeSwitch('danhGia')} min={1} max={10} 
        // {...register('danhGia',
        //   {
        //     required: 'Vui lòng nhập mô tả'
        //   }
        // )}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input type="file" accept="image/png, image/jpeg,image/gif,image/png" onChange={handleChangeFile} />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
      </Form.Item>

      <Form.Item label="Button">
        <button className="btn btn-success" type='submit'>Thêm Mới</button>
      </Form.Item>
    </Form>
  );
};