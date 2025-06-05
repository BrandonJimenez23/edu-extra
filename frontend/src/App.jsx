import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './features/users/pages/UserList';
import Layout from './layout/Layout';
import UserForm from './features/users/components/UserForm';
import DesignSystem from './pages/DesginSystem';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path='/user-form' element={<UserForm/>} />
          <Route path='/design-system' element={<DesignSystem />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
