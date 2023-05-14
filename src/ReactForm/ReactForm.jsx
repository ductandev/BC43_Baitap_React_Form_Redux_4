import React, { Component } from 'react'
import FormInputSinhVien from './FormInputSinhVien'
// import thư viện kết nối với redux store
import { connect } from 'react-redux'
import {deleteSinhVien, editSinhVien, updateSinhVien} from '../redux/reducers/sinhVienReducer'

class ReactForm extends Component {

    render() {
        
        let {arrSinhVien, valuesInput} = this.props.sinhVienReducer;

        return (
            <div className='container mt-2'>
                <FormInputSinhVien/>

                <table className='table mt-2'>
                    <thead className='bg-dark text-white fw-bold'>
                        <tr>
                            <th>Mã sinh viên</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrSinhVien.map(sv=>{
                            return <tr key={sv.maSV}>
                                <td>{sv.maSV}</td>
                                <td>{sv.hoTen}</td>
                                <td>{sv.soDienThoai}</td>
                                <td>{sv.email}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={()=>{
                                        const action = editSinhVien(sv);
                                        this.props.dispatch(action);
                                    }}>Edit</button>
                                </td>
                                <td>
                                    <button className="btn btn-danger" onClick={()=>{
                                        const action = deleteSinhVien(sv.maSV);
                                        this.props.dispatch(action);
                                    }}>Del</button>
                                </td>
                                <td>
                                    <button className="btn btn-success" onClick={()=>{
                                        const action = updateSinhVien(valuesInput);
                                        this.props.dispatch(action);
                                    }}>Update</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}


// Hàm lấy State từ redux về biến thành props component
const mapStateToProps = (state) => state

export default connect(mapStateToProps)(ReactForm)
