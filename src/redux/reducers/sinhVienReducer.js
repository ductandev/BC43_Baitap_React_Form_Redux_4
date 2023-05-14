import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  arrSinhVien: [
    { maSV: '1', soDienThoai: '0988888888', hoTen: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com' },
    { maSV: '2', soDienThoai: '0999999999', hoTen: 'Nguyễn Văn B', email: 'nguyenvanb@gmail.com' },
  ],
  valuesInput: {
    maSV: '',
    soDienThoai: '',
    hoTen: '',
    email: '',
  },
  errors: {
    maSV: '(*)',
    soDienThoai: '(*)',
    hoTen: '(*)',
    email: '(*)',
  },
}

const sinhVienReducer = createSlice({
  name: 'sinhVienReducer',
  initialState,
  reducers: {
    addSinhVienAction: (state, action) => {
      const svInfo = { ...action.payload };

      for (let key in state.errors){
        if (state.errors[key] !== ''){
          alert('Dữ liệu nhập chưa hợp lệ !');
          return
        }
      }

      // Check maSV trùng
      let maSVAdd = state.arrSinhVien.findIndex(sv => sv.maSV === state.valuesInput.maSV);
      if (maSVAdd === -1){
        // ADD SV
        state.arrSinhVien.push(svInfo)    
      } else {
        alert('Mã sinh viên đã tồn tại, vui lòng nhập mã Sinh viên khác !!!')
      }


    },
    validationSinhVien: (state, action) => {
      const { id, value, dataType } = action.payload;

      if (value.trim() === '') {
        switch (id) {
          case 'maSV': {
            state.errors[id] = 'Mã sinh viên không được bỏ trống !';
            break;
          }
          case 'soDienThoai': {
            state.errors[id] = 'Số điện thoại không được bỏ trống !';
            break;
          }
          case 'hoTen': {
            state.errors[id] = 'Họ và tên không được bỏ trống !';
            break;
          }
          case 'email': {
            state.errors[id] = 'Email không được bỏ trống !';
            break;
          }
          default: { }
        }
      } else {

        switch (dataType) {
          // ========Check Validation "maSv & soDienThoai"===========
          case 'number': {
            let regexNumber = /^\d+$/;
            state.errors[id] = '';

            if (!regexNumber.test(value)) {
              if (id === 'maSV') {
                state.errors[id] = 'Mã sinh viên phải là số !';
              } else {
                state.errors[id] = 'Số điện thoại phải là số !';
              }
            } else {
              if (id === 'maSV') {
                if (value.length > 6) {
                  state.errors[id] = 'Mã sinh viên tối đa là 6 số !';
                }
              } else {
                if (value.length > 10) {
                  state.errors[id] = 'Số điện thoại tối đa là 10 số  !';
                }
              }
            }
            ; break;
          }
          // ===============Check Validation hoVaTen==================
          case 'string': {
            let regexString = /^[A-Z a-z áàảạãăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệiíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ ÁÀẢẠÃĂẮẰẲẴẶÂẤẦẨẪẬÉÈẺẼẸÊẾỀỂỄỆIÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴĐ]+$/;
            state.errors[id] = '';

            if (!regexString.test(value)) {
              state.errors[id] = 'Họ và tên phải là ký tự !';
            }; break;
          }
          // ===============Check Validation Email==================
          case 'email': {
            let regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
            state.errors[id] = '';

            if (!regexEmail.test(value)) {
              state.errors[id] = 'Email nhập chưa hợp lệ !'
            }; break;
          }
          default: { }
        }
      }
      state.valuesInput[id] = value;
    },
    deleteSinhVien: (state, action) =>{
      const maSVDel = action.payload;
      let indexDel = state.arrSinhVien.findIndex(sv => sv.maSV === maSVDel);
      if (indexDel !== -1){
        state.arrSinhVien.splice(indexDel, 1);
      }
    },
    editSinhVien: (state, action) =>{
      // Delete error
      for(let key in state.errors){
        state.errors[key] = '';
      }

      const svEdit = {...action.payload}
      // console.log(svEdit)
      if(svEdit){
        for (let key in svEdit){
          state.valuesInput[key] = svEdit[key];
        }
      }
    },
    updateSinhVien: (state,action) =>{
      console.log(action.payload)
      let svUpdate = {...action.payload}
      let indexUpdate = state.arrSinhVien.find(sv => sv.maSV === svUpdate.maSV)
      if (indexUpdate){
        for(let key in indexUpdate){
            // check validation trước khi cho update
            if(state.errors[key] === ''){
              indexUpdate[key] = svUpdate[key];
            }
        }
      }
    },
  }
});

export const { addSinhVienAction, validationSinhVien, editSinhVien, deleteSinhVien, updateSinhVien } = sinhVienReducer.actions

export default sinhVienReducer.reducer