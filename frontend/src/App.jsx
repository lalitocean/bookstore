import React, { useEffect } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AllBooks from './pages/AllBooks'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from './store/auth'
import Favourite from './components/Profile/Favourite'
import Settings from './components/Profile/Settings'
import Newcom from './components/Profile/Newcom'

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changerole(localStorage.getItem("role")))
    }
  }, [])

  return (
    <>

      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/all-books' element={<AllBooks />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/profile' element={<Profile />} >
          <Route index element={<Favourite />} />
          <Route path='/profile/settings' element={<Settings />} />
          <Route path='/profile/orderHistory' element={<Newcom />} />

        </Route>
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
        <Route path='/view-book-details/:id' element={<ViewBookDetails />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App