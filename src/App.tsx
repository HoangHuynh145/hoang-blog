import { useEffect } from "react"
import { useThemeContext } from "./context/ThemeContext"
import HomePage from "./pages/home/HomePage"
import { PopupContext, ThemeInterface } from "./services/Interfaces"
import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/auth/AuthPage"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Blog from "./pages/blog/Blog"
import ArticlePreview from "./components/article/ArticlePreview"
import Article from "./components/article/Article"
import Workplace from "./pages/workplace/Workplace"
import Projects from "./pages/projects/Projects"
import UserProfile from "./pages/user/UserProfile"
import Settings from "./pages/setting/Settings"
import Loader from "./components/loader/Loader"
import OwnBlog from "./pages/blog/OwnBlog"
import { usePopupContext } from "./context/PopupContext"
import FormTitle from "./pages/blog/FormTitle"
import FormContent from "./pages/blog/FormContent"
import FormProject from "./pages/projects/FormProject"
import FormWorkplace from "./pages/workplace/FormWorkplace"
import NotFound from "./pages/error/NotFound"
import { useAppSelector } from "./redux/Hooks"

function App() {
  const { theme } = useThemeContext() as ThemeInterface
  const { popupState } = usePopupContext() as PopupContext
  const isLogout = useAppSelector(state => state.authState.logout.isFectching)

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const condition =
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      if (condition) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])

  useEffect(() => {
    if (popupState.isOpen) {
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
  }, [popupState.isOpen])

  if (isLogout) {
    return <Loader />
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<Article />} />
      <Route path="tag/:tagName" element={<Blog />} />
      <Route path="article/preview" element={<ArticlePreview />} />
      <Route path="/create">
        <Route path="article/title" element={<FormTitle />} />
        <Route path="article/content" element={<FormContent />} />
        <Route path="project" element={<FormProject />} />
        <Route path="workplace" element={<FormWorkplace />} />
      </Route>
      <Route path="/update">
        <Route path="article/:postId/title" element={<FormTitle />} />
        <Route path="article/:postId/content" element={<FormContent />} />
        <Route path="project/:projectId" element={<FormProject />} />
        <Route path="workplace/:workplaceId" element={<FormWorkplace />} />
      </Route>
      <Route path="/me/articles" element={<OwnBlog />} />
      <Route path="/resume" element={<Workplace />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/setting" element={<Settings />} />
      <Route path="/:userhashtag" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
