import React, { useEffect, useState } from 'react';
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
import dayjs from 'dayjs'
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatPhimUploadThunk, layThongTinPhimThunk, themPhimUploadHinhThunk } from '../../../../store/QuanLyPhimReducer/thunk';
import { useParams } from 'react-router-dom';
import { values } from 'lodash';
import { quanLyPhimActions } from '../../../../store/QuanLyPhimReducer/slice';
export const Edit = () => {

  const { id } = useParams()
  const dispatch = useDispatch()
  const { thongTinPhim,thongTinPhimDefault } = useSelector((state) => state.quanLyPhimReducer)
  console.log("thongTinPhim: ", thongTinPhim);
  let thongTinPhimTMP = {...thongTinPhim}

  useEffect(() => {
    dispatch(layThongTinPhimThunk(id))
  }, [])


  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const [imgSrc, setImgSrc] = useState()



  const {

    handleSubmit, // submit form
    register, // register field
    formState: { errors }, // validate
    setValue, // thay đổi giá trị của 1 field name bất kỳ
    getValues, // lấy toàn bộ thuộc tính value trong form
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues:
      {
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


  useEffect(() => {
    if (thongTinPhim) {
      reset(thongTinPhim)
      setImgSrc(thongTinPhim?.hinhAnh)
    }
  }, [thongTinPhim])


  let formValues = getValues()
  
  console.log("formValues: ", formValues);


  const getChangeHandlerWithEvent = name => event => 
  {
    dispatch(quanLyPhimActions.setThongTinPhim({...thongTinPhimTMP,[name]:event.target.value}))
    setValue(name, event.target.value);
  }
    
  

  const handleChangeDatePicker = name => event =>
  {
    dispatch(quanLyPhimActions.setThongTinPhim({...thongTinPhimTMP,[name]:(dayjs(event).format('YYYY-MM-DD')+'T00:00:00').toString()}))
    // setValue(name, dayjs(event).format('DD/MM/YYYY'));
  }

  const handleChangeSwitch = (name) => {

    return (value) => {
      dispatch(quanLyPhimActions.setThongTinPhim({...thongTinPhimTMP,[name]:value}))
      setValue(name, value)
    }
  }

  const handleChangeFile = (e) => {
    //Lấy file ra từ e
    let file = e.target.files[0];
    if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

      //Tạo đối tượng để đọc file
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        dispatch(quanLyPhimActions.setThongTinPhim({...thongTinPhimTMP,'hinhAnh':e.target.result}))
      }
      //  Đem dữ liệu file lưu vào form
      setValue('hinhAnh', file);
    }
  }

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
      onSubmitCapture={
        handleSubmit((values) => {
          console.log("values: ", values);
          values.maNhom = GROUPID;
          let formData = new FormData();
          for (let key in values) {
            if (key !== 'hinhAnh') {
              formData.append(key, values[key]);
            } 
            if (key == 'hinhAnh'){
              // console.log("hinha nh: ", thongTinPhimDefault.hinhAnh);
              if (values[key] == thongTinPhimDefault.hinhAnh)
                formData.append(key, null);
              else {
                console.log("hinh A: ", values.hinhAnh);

                formData.append('File', values.hinhAnh, values.hinhAnh.name);

              }
            }
            if (key == 'ngayKhoiChieu') {
              console.log("keyDate: ", dayjs(values[key]).format('DD/MM/YYYY'));
              formData.append(key, dayjs(values[key]).format('DD/MM/YYYY'));
              // setValue(name, dayjs(event).format('DD/MM/YYYY'));
              // setValue(name, moment(event._d).format('DD/MM/YYYY'));
            } 
          }
          dispatch(capNhatPhimUploadThunk(formData))
        })
      }
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
          value={getValues().tenPhim}
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
          value={getValues().trailer}
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
          value={getValues().moTa}
        />
        {errors?.moTa && <p className='text-danger'>{errors?.moTa?.message}</p>}
      </Form.Item>

      <Form.Item label="Ngày khởi chiếu: ">
        <DatePicker format={"DD/MM/YYYY"} 
        onChange={handleChangeDatePicker('ngayKhoiChieu')}
        value={dayjs(getValues().ngayKhoiChieu)}
        />
        {errors?.ngayKhoiChieu && <p className='text-danger'>{errors?.ngayKhoiChieu?.message}</p>}
      </Form.Item>
      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('dangChieu')} checked={getValues().dangChieu}/>
      </Form.Item>
      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('sapChieu')} checked={getValues().sapChieu}/>
      </Form.Item>
      <Form.Item label="Hot" valuePropName="checked">
        <Switch onChange={handleChangeSwitch('hot')} checked={getValues().hot}/>
      </Form.Item>
      <Form.Item label="Số sao">
        <InputNumber onChange={handleChangeSwitch('danhGia')} min={1} max={10}
        // {...register('danhGia',
        //   {
        //     required: 'Vui lòng nhập mô tả'
        //   }
        // )}
        value={getValues().danhGia}
        />
      </Form.Item>
      <Form.Item label="Hình ảnh">
        <input type="file" accept="image/png, image/jpeg,image/gif,image/png" onChange={handleChangeFile} />
        <br />
        <img style={{ width: 150, height: 150 }} src={imgSrc} alt="..." />
      </Form.Item>

      <Form.Item label="Button">
        <button className="btn btn-success" type='submit'>Cập nhật</button>
      </Form.Item>
    </Form>
  );
};