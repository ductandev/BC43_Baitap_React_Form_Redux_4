import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addSinhVienAction, validationSinhVien } from '../redux/reducers/sinhVienReducer'

class FormInputSinhVien extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        const action = addSinhVienAction(this.props.sinhVienReducer.valuesInput)
        this.props.dispatch(action)
    }

    handleChangeInput = (e) => {
        let { id, value } = e.target
        let dataType = e.target.getAttribute('data-type')

        const action = validationSinhVien({ id, value, dataType });
        this.props.dispatch(action);
    }



    render() {

        let { errors, valuesInput } = this.props.sinhVienReducer;

        return (
            <form className='card' onSubmit={this.handleSubmit}>
                <div className="card-header bg-dark text-white">
                    <h1>Thông tin sinh viên</h1>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <p>Mã SV</p>
                                <input data-type='number' value={valuesInput.maSV} className='form-control' id='maSV' onInput={this.handleChangeInput} />
                                <p className="text text-danger">{errors.maSV}</p>
                            </div>
                            <div className="form-group">
                                <p>Số điện thoại</p>
                                <input data-type='number' value={valuesInput.soDienThoai} className='form-control' id='soDienThoai' onInput={this.handleChangeInput} />
                                <p className="text text-danger">{errors.soDienThoai}</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <p>Họ tên</p>
                                <input data-type='string' value={valuesInput.hoTen} className="form-control" id="hoTen" onInput={this.handleChangeInput} />
                                <p className="text text-danger">{errors.hoTen}</p>
                            </div>
                            <div className="form-group">
                                <p>Email</p>
                                <input data-type='email' value={valuesInput.email} className="form-control" id="email" onInput={this.handleChangeInput} />
                                <p className="text text-danger">{errors.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button className="btn btn-success" typeof='submit'>Thêm Sinh Viên</button>
                </div>
            </form>
        )
    }
}




const mapStateToProps = (state) => state

export default connect(mapStateToProps)(FormInputSinhVien)