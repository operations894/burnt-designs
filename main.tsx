import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import './index.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  )
}