import Hello from './pages/HelloWorld'
import About from './pages/About'
import PingPage from './pages/PingPage'
import ImgDiffCheck from './pages/ImgDiffCheck'

export default [
  { path: '/', component: Hello },
  { path: '/about', component: About },
  { path: '/ping', component: PingPage },
  { path: '/imgDiffCheck', component: ImgDiffCheck }
]
