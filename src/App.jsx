import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { useApp } from './context/appContext'
import Channel from './pages/Channel'
import History from './pages/History'
import Home from './pages/Home'
import Search from './pages/Search'
import Shorts from './pages/Shorts'
import Subscriptions from './pages/Subscriptions'
import Watch from './pages/Watch'

function Layout() {
  const { sidebarOpen } = useApp()
  return (
    <div className="min-h-full">
      <Header />
      <Sidebar />
      <main
        className={`pt-14 transition-[margin] duration-200 ${
          sidebarOpen ? 'lg:ml-60' : 'lg:ml-[72px]'
        }`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/history" element={<History />} />
          <Route path="/channel/:handle" element={<Channel />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/results" element={<Search />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default function App() {
  return <Layout />
}
