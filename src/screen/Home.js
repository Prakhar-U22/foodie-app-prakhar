import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import allfoodImg from '../Img/allfood.jpeg';
import burgerImg from '../Img/Burger.avif';
import cakeImg from '../Img/Cake.avif';
import northIndianImg from '../Img/North Indian.avif';
import paneerImg from '../Img/Paneer.avif';
import rollsImg from '../Img/Rolls.avif';
import sweetsImg from '../Img/Sweets.avif';
import vegBiryaniImg from '../Img/Veg Biryani.avif';
import banerImg from '../Img/baner.png';

export default function Home() {
  const [search, setSearch] = useState('');
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // State to track cart items

  const loadData = async () => {
    try {
      let response = await fetch('https://foodie-backend-zp89.onrender.com/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      response = await response.json();
      setFoodItems(response[0]); // Get all food items directly
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
      // setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearchClick = (foodName) => {
    if (foodName === 'All Categories') {
      setSearch(''); // Clear search to show all items
    } else {
      setSearch(foodName); // Set the search state to the clicked food name
    }
    // Scroll to the "All Food Items" section
    document.getElementById('all-food-items').scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); // Add the selected item to the cart
    console.log('Added to Cart:', item); // Log added item
    console.log('Updated Cart:', [...cart, item]); // Log the updated cart
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <div className="text-center mt-5">
          <h2>Loading... Backend takes time to connect</h2>
        </div>
      ) : (
        <div>
          {/* Responsive Image Section with Overlayed Search Bar */}
          <div className="container position-relative">
            <img
              src={banerImg}
              alt="Food Banner"
              className="img-fluid rounded-3"
              style={{ width: '100%', height: '250px', objectFit: 'cover' }}
            />
            {/* Search Bar Overlay */}
            <div
              className="position-absolute"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '60%',
                zIndex: '10',
              }}
            >
              <input
                className="form-control form-control-lg border border-primary shadow"
                type="search"
                placeholder="Search for your favorite food..."
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  borderRadius: '30px',
                  padding: '10px 20px',
                  fontSize: '1.2rem',
                }}
              />
            </div>
          </div>

          {/* Inspiration Section */}
          <div className="container my-5">
            <h2 className="text-center mb-4">Inspiration for your first order</h2>
            <div className="d-flex justify-content-around flex-wrap">
              {[
                { name: 'All Categories', img: allfoodImg },
                { name: 'Burger', img: burgerImg },
                { name: 'Cake', img: cakeImg },
                { name: 'North Indian', img: northIndianImg },
                { name: 'Paneer', img: paneerImg },
                { name: 'Rolls', img: rollsImg },
                { name: 'Sweets', img: sweetsImg },
                { name: 'Veg Biryani', img: vegBiryaniImg },
              ].map((item) => (
                <div
                  key={item.name}
                  className="text-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleSearchClick(item.name)}
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    className="img-fluid"
                    style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Food Items in a Single Grid */}
          <div className="container my-5" id="all-food-items">
            <h2 className="text-center mb-4">All Food Items</h2>
            <div className="row">
              {foodItems
                .filter((item) => item.name.toLowerCase().includes(search.toLowerCase())) // Filter based on search
                .map((filteredItem) => (
                  <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                    <Card
                      foodName={filteredItem.name}
                      foodImg={filteredItem.img}
                      options={filteredItem.options ? filteredItem.options[0] : null}
                      addToCart={() => addToCart(filteredItem)} // Add to cart
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
