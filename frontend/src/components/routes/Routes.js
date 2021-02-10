import React from 'react'
import { Route, Switch } from 'react-router-dom'

import HomeScreen from '../../screens/HomeScreen'
import LoginScreen from '../../screens/LoginScreen'
import ProfileScreen from '../../screens/ProfileScreen'
import RegisterScreen from '../../screens/RegisterScreen'
import UserListScreen from '../../screens/UserListScreen'
import NotFound from '../NotFound'

import PrivateRoute from '../routes/PrivateRoute'
import AdminPrivateRoute from '../routes/AdminPrivateRoute'
import UserLogHistoryScreen from '../../screens/LogHistoryScreen'
import ProductScreen from '../../screens/ProductScreen'
import ProductDetailsScreen from '../../screens/ProductDetailsScreen'
import CartScreen from '../../screens/CartScreen'
import OrderDetailsScreen from '../../screens/OrderDetailsScreen'
import OrderScreen from '../../screens/OrderScreen'
import ReportScreen from '../../screens/ReportScreen'

const Routes = () => {
  return (
    <section className='container-fluid'>
      <Switch>
        <Route path='/login' component={LoginScreen} />
        <AdminPrivateRoute
          path='/admin/users/logs'
          component={UserLogHistoryScreen}
        />
        <AdminPrivateRoute path='/admin/product' component={ProductScreen} />
        <Route path='/register' component={RegisterScreen} />
        <AdminPrivateRoute path='/admin/report' component={ReportScreen} />
        <PrivateRoute path='/profile' component={ProfileScreen} />
        <AdminPrivateRoute
          exact
          path='/admin/users'
          component={UserListScreen}
        />
        <AdminPrivateRoute
          path='/admin/users/page/:pageNumber'
          component={UserListScreen}
        />

        <PrivateRoute exact path='/' component={HomeScreen} />

        <PrivateRoute path='/product/:id' component={ProductDetailsScreen} />
        <AdminPrivateRoute exact path='/order' component={OrderScreen} />
        <AdminPrivateRoute path='/order/:id' component={OrderDetailsScreen} />
        <PrivateRoute path='/cart/:id?' component={CartScreen} />

        <Route component={NotFound} />
      </Switch>
    </section>
  )
}

export default Routes
