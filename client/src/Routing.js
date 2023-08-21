import { Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Items from './components/Items/Items';
import AddItem from './components/Items/AddItem/AddItem';
import Home from './components/Home/Home';
import ContactUs from './components/ContactUs';
import ItemDisplay from './components/Items/ItemDisplay';
import EditItem from './components/Items/AddItem/EditItem';
import AddUser from './components/Users/AddUser/AddUser';
import Users from './components/Users/DisplayUsers/DisplayUsers';


const Routing = () => {

    return(
      <Routes>
        {/* Home */}
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<Home />} />

        {/* Items */}
        <Route exact path='/items' element={<Items />} />
        <Route exact path='/additem' element={<AddItem />} />
        <Route exact path='/items/:id' element={<ItemDisplay />} />
        <Route exact path='/items/:id/edit' element={<EditItem />} />

        {/* Users */}
        {/* <Route exact path='/users' element={<Users />} /> */}
        <Route exact path='/addemployee' element={<AddUser />} />
        <Route exact path='/users' element={<Users />} />
        {/* <Route exact path='/users/:id' element={<UserDisplay />} /> */}

        {/* Others */}
        <Route path='/contactus' element={<ContactUs />} />

         {/* Others */}
         <Route path='*' element={<Error />} />
        
      </Routes>
    )
  }

export default Routing;