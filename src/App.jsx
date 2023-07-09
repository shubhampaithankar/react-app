import { Provider } from 'react-redux';
import { Suspense, lazy } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import store from './redux/store/store';
import PrivateRoute from './routes/PrivateRoutes';
import Loading from './components/Loading';

const Auth = lazy(() => import('./pages/Auth.jsx'))
const Dashboard = lazy(() => import('./pages/Dashboard.jsx')) 

const App = () => {
  return (
        <Provider store={store}>
          <Suspense fallback={<Loading />}>
            <BrowserRouter>
              <main className='container-fluid h-100'>
                <Routes>
                  <Route path='/' element={<Navigate to='/auth' />}/>
                  <Route path='/auth' element={<Auth />}/>
                  <Route path='/dashboard' element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }/>
                  <Route path='*' element={<div>404 - Not Found</div>}/>
                </Routes>
              </main>
            </BrowserRouter>
          </Suspense>
        </Provider>
  );
}

export default App;
