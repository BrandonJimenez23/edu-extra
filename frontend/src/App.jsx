import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import Layout from './layout/Layout';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UserList />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
