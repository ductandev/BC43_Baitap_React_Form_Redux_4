import React, { Component } from 'react'
import { connect } from 'react-redux'


class Demo extends Component {
    render() {
        console.log(this.props)
        let {arrSinhVien} = this.props.sinhVienReducer;

        return (
            <div className='container mt-2'>

                <table className='table mt-2'>
                    <thead className='bg-dark text-white fw-bold'>
                        <tr>
                            <th>Mã sinh viên</th>
                            <th>Họ tên</th>
                            <th>Số điện thoại</th>
                            <th>Email</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {arrSinhVien.map(sv => {
                            return <tr key={sv.maSV}>
                                <td>{sv.maSV}</td>
                                <td>{sv.hoTen}</td>
                                <td>{sv.soDienThoai}</td>
                                <td>{sv.email}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        this.setState({
                                            sinhVienEdit: sv
                                        })
                                    }}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => {
                                        this.delSinhVien(sv.maSV)
                                    }}>Del</button>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => state


export default connect(mapStateToProps)(Demo)