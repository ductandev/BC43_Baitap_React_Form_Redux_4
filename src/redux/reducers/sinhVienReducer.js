import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  arrSinhVien: [
    { maSV: '1', soDienThoai: '0988888888', hoTen: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com' },
    { maSV: '2', soDienThoai: '0999999999', hoTen: 'Nguyễn Văn B', email: 'nguyenvanb@gmail.com' },
    { maSV: '68', soDienThoai: '0979797979', hoTen: 'Nguyễn Đức Tấn', email: 'nguyenductan@gmail.com' },
    { maSV: '79', soDienThoai: '0968686888', hoTen: 'Nguyễn Tấn', email: 'nguyenductan@gmail.com' },
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
  variable: '0',
  arrSinhVienBackUp: [],
}

const sinhVienReducer = createSlice({
  name: 'sinhVienReducer',
  initialState,
  reducers: {
    addSinhVienAction: (state, action) => {
      const svInfo = { ...action.payload };

      for (let key in state.errors) {
        if (state.errors[key] !== '') {
          alert('Dữ liệu nhập chưa hợp lệ !');
          return
        }
      }

      // Check maSV trùng
      let maSVAdd = state.arrSinhVien.findIndex(sv => sv.maSV === state.valuesInput.maSV);
      if (maSVAdd === -1) {
        // ADD SV
        state.arrSinhVien.push(svInfo)
        // Clear form
        for (let key in state.valuesInput) {
          state.valuesInput[key] = '';
        }
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
    deleteSinhVien: (state, action) => {
      const maSVDel = action.payload;
      let indexDel = state.arrSinhVien.findIndex(sv => sv.maSV === maSVDel);
      if (indexDel !== -1) {
        state.arrSinhVien.splice(indexDel, 1);
      }
    },
    editSinhVien: (state, action) => {
      // Delete error
      for (let key in state.errors) {
        state.errors[key] = '';
      }

      const svEdit = { ...action.payload }
      // console.log(svEdit)
      if (svEdit) {
        for (let key in svEdit) {
          state.valuesInput[key] = svEdit[key];
        }
      }
    },
    updateSinhVien: (state, action) => {
      // console.log(action.payload)
      let svUpdate = { ...action.payload }
      let indexUpdate = state.arrSinhVien.find(sv => sv.maSV === svUpdate.maSV)
      for (let key in state.errors) {
        if (state.errors[key] !== '') {
          alert(state.errors[key])
          return
        }
      }
      for (let index in indexUpdate){
        indexUpdate[index] = svUpdate[index];
      }

    },
    searchSinhVien: (state, action) => {

      const stringToSlug = (str) => {
        // remove accents
        var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
            to   = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
        for (var i=0, l=from.length ; i < l ; i++) {
          str = str.replace(RegExp(from[i], "gi"), to[i]);
        }
      
        str = str.toLowerCase()
              .trim()
              .replace(/[^a-z0-9]/g, '-')
              .replace(/-+/g, '-');
      
        return str;
      }



      let { value } = action.payload;
      value = stringToSlug(value);

      if (state.variable === '0') {
        state.arrSinhVienBackUp = state.arrSinhVien
        state.variable = '1';
        // console.log('A')
      }
      if (value === '') {
        state.variable = '0';
        state.arrSinhVien = state.arrSinhVienBackUp
        // console.log('B')
      }
      if (value !== '') {
        // let result = state.arrSinhVienBackUp.filter(sv => sv.maSV === value || sv.hoTen === value || sv.soDienThoai === value || sv.email === value);
        let result = state.arrSinhVienBackUp.filter(sv => stringToSlug(sv.maSV).search(value) !== -1 || stringToSlug(sv.hoTen).search(value) !== -1 || stringToSlug(sv.soDienThoai).search(value) !== -1 || stringToSlug(sv.email).search(value) !== -1);
        state.arrSinhVien = result;
        // console.log('C')
      }
    },
  }
});

export const { addSinhVienAction, validationSinhVien, editSinhVien, deleteSinhVien, updateSinhVien, searchSinhVien } = sinhVienReducer.actions

export default sinhVienReducer.reducer