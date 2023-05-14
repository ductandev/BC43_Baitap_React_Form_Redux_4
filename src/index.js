import React from 'react';
import ReactDOM from 'react-dom/client';
// Cấu hình react router dom
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomeTemplate from './Templates/HomeTemplate';
import Demo from './ReactForm/Demo';
import ReactForm from './ReactForm/ReactForm';
// Cấu hình redux
import {Provider} from 'react-redux'
import {store} from './redux/configStore'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path='' element={<HomeTemplate />}>
                    <Route index element={<ReactForm />}></Route>
                    <Route path='demo' element={<Demo />}></Route>

                    {/* Đá về trang home nếu đường dẫn ko tồn tại */}
                    <Route path='*' element={<Navigate to={'/'} />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);

 