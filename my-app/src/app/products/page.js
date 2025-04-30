'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
//import '../styles/newlisting.css'; // Import the CSS from styles folder
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Row, Col } from 'react-bootstrap';
//import { Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from react-icons
import '../styles/swap.css';
import ChildModal from '../productSwap/page.js'; //for the sap selection one swap request is ussed
import Image from 'next/image';
export default function Products() {
  const [data, setData] = useState([]); // Store the fetched data
  const[basePath, setPath] = useState('https://tudublin-my.sharepoint.com/:f:/r/personal/b00156196_mytudublin_ie/Documents/Major%20Project%20Folder/Images/');
  //('https://tudublin-my.sharepoint.com/personal/b00156196_mytudublin_ie/Documents/Forms/All.aspx?CID=5413c80e%2Db90a%2D4929%2D9704%2D63372a5cc49d&RootFolder=%2Fpersonal%2Fb00156196%5Fmytudublin%5Fie%2FDocuments%2FMajor%20Project%20Folder%2FImages&FolderCTID=0x012000E696C90687491544B1607D79E8551AD2');
  const [showModal, setShowModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null); // Store selected value from modal
  const [selectedItem, setSelectedItem] = useState(""); // Store selected Item
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('searchQuery');


  // Fetch products from the API
  useEffect(() => {
     if (searchQuery && searchQuery.trim() !== '') {
      // Fetch filtered products from searchProducts API
      fetch('/api/searchProducts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ searchQuery: searchQuery.trim() }),
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setData([]);
        });
    } else {
      // Fetch all products
      fetch('/api/getProducts')
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
          setData([]);
        });
    }
  }, [searchQuery]);

  function putInWishlist(itemName, description, images, category, userName, email ) {
    console.log("putting in wishlist:", {itemName, description, images, category }); 
    fetch(`/api/putInWishlist?itemName=${encodeURIComponent(itemName)}&description=${encodeURIComponent(description)} &images=${encodeURIComponent(images)}&category=${encodeURIComponent(category)}&userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}`);
    alert("Added to Wishlist"); 
  }

  function putInRequest(userName, email,  itemName, itemId,swapItemId,swapItemName) {
    console.log("putting in request:", {userName, email, itemName,swapItemId}); 
    setShowModal(false);
    fetch(`/api/putInRequest?userName=${encodeURIComponent(userName)}&userEmail=${encodeURIComponent(email)}&itemName=${encodeURIComponent(itemName)}&ItemId=${encodeURIComponent(itemId)}&swapItemId=${encodeURIComponent(swapItemId)}&swapItemName=${encodeURIComponent(swapItemName)}`);
    alert("Swap Request sent to: " + userName); // Displaying the message in an alert box
  }

  function showModalForSelectedProduct(index){
    setSelectedItem(index);
    setShowModal(true);
  }

  // Function to handle value from child
  const handleSelect = (value) => {
    setSelectedValue(value); // Update state
    //setShowModal(false); // Close modal after selection
  };

  return (
    <div className="products">
      <Header />
      <div className="container mt-4">
        <h2 className="text-center mb-4" >Products</h2>
        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {data.length > 0 && data.map((item, index) => (
              <Col key={index}>
                <Card className="h-100 shadow-sm" >
                  
                  <Card.Img
                    variant="top"
                    style={{ height: '60%', width: '100%' }} // Pass height as a string
                    src={item.images && item.images.length > 0 ? item.images[0] : '/placeholder.png'} // Use the first Cloudinary image URL if available, else placeholder
                    alt={item.itemName}
                    className="p-3"
                  />

                  <Card.Body>
                    <Card.Title>{item.itemName}</Card.Title>
                    <Card.Text>
                      <strong>Description:</strong> {item.description}
                      <br />
                      <strong>Category:</strong> {item.category}
                      <br />
                      <strong>Owner:</strong> {item.userName}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-between align-items-center">
                     {/* Button to Open Modal */}
                    <button className="btn btn-primary" onClick={() => showModalForSelectedProduct(index)}>
                      Swap Request
                    </button>

                    {/* Modal Component */}
{showModal && <ChildModal category={data[selectedItem].category} onClose={() => setShowModal(false)} onSelect={handleSelect} onSwap={()=> putInRequest(data[selectedItem].userName, data[selectedItem].email, data[selectedItem].itemName,data[selectedItem]._id, selectedValue.id, selectedValue.swapItemName)}/>}


                    {/* <Button onClick={() => putInRequest(item.userName, item.email, item.itemName, 'hairdryer')} variant="primary">Swap Request</Button> */}
                    <Button  onClick={() => putInWishlist(item.itemName, item.description, item.images , item.category , item.userName, item.email)} variant="contained" color="secondary"><FaHeart className="text-danger" /> </Button>
                  

                  </Card.Footer>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
              

      <Footer />
    </div>
  );
}
