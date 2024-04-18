import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import LandingPage from './pages/LandingPage';
import UsersPage from './pages/UsersPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SingleUserPage from './pages/SingleUserPage';
import SingleBlog from './pages/SingleBlog';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<LandingPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/:id" element={<SingleUserPage />} />
          <Route path="blogs/:id" element={<SingleBlog />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
