import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/custom/Sidebar';
import { SidebarProvider } from '../context/SidebarContext';
import  { Toaster } from 'react-hot-toast';
import HeadingBar from '../components/custom/HeadingBar';

export function RootLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-slate-100">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <HeadingBar/>
          <Outlet />
          <Toaster/>
        </div>
      </div>
    </SidebarProvider>
  );
}