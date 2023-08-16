import { Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import Items from './components/Items/Items';
import AddItem from './components/Items/AddItem/AddItem';
import Home from './components/Home/Home';
import ContactUs from './components/ContactUs';
import ItemDisplay from './components/Items/ItemDisplay';

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

        {/* Others */}
        <Route path='/contactus' element={<ContactUs />} />
        
      </Routes>
    )
  }

export default Routing;