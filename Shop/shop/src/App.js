import {Container, Row, Col} from 'react-bootstrap'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './components/home'
import Admin from './components/admin'
import Sidebar from './components/sidebar'
import Products from './components/products'
import AddProductForm from './components/addProductForm'
import AddCategoryForm from './components/addCategoryForm'
import EditProductForm from './components/editProduct'
import EditCategoryForm from './components/editCategory'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
    <Container fluid>
      <Row>
        <Col>
        <Sidebar/>
        </Col>
        <Col xs={12} lg={10}>
          <Switch>
            <Route
              exact
              path="/"
              render={(props)=><Home {...props}/>}
            />
            <Route
              exact
              path="/admin"
              render={(props)=><Admin {...props}/>}
            />
            <Route
              exact
              path="/products/:id"
              render={(props) => <Products {...props} />}
            />
            <Route
              exact
              path="/admin/addProduct"
              render={(props) => <AddProductForm {...props} />}
            />
            <Route
              exact
              path="/admin/addCategory"
              render={(props) => <AddCategoryForm {...props} />}
            />
            
            <Route
              exact
              path="/admin/editProduct/:id"
              render={(props) => <EditProductForm {...props} />}
            />
            <Route
              exact
              path="/admin/editCategory/:id"
              render={(props) => <EditCategoryForm {...props} />}
            />
          </Switch>
        </Col>
      </Row>
    </Container>
    </BrowserRouter>
  );
}

export default App;
