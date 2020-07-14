import React, { useEffect,useState } from 'react';
import Axios from 'axios';
import { Icon, Col, Card, Row } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Sections/CheckBox';
const {Meta}  =Card;
const continents = [
    {
        "_id": 1,
        "name": "Africa"
    },
    {
        "_id": 2,
        "name": "Europe"
    },
    {
        "_id": 3,
        "name": "Asia"
    },
    {
        "_id": 4,
        "name": "North America"
    },
    {
        "_id": 5,
        "name": "South America"
    },
    {
        "_id": 6,
        "name": "Australia"
    },
    {
        "_id": 7,
        "name": "Antarctica"
    }
]
function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip,setSkip] = useState(0);
    const[Limit,setLimit] = useState(6);
    const [PostSize,setPostSize] = useState();
    const [Filters,setFilters] = useState({
        continents:[],
        price: []
    })

    const getProducts = (variables) => {
        Axios.post('/api/product/getProducts', variables)
            .then(response => {
                if (response.data.success) {
                    if (variables.loadMore) {
                        setProducts([...Products, ...response.data.products])
                    } else {
                        setProducts(response.data.products)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert('Failed to fectch product datas')
                }
            })
    }
    useEffect(() => {
        const variables = {
            skip:Skip,
            limit: Limit
        }
        getProducts(variables);
    },[])

    const renderCards = Products.map( (product,index) => {
        return <Col lg={6} md={8} xs={24} >
            <Card
                hoverable={true}
                cover={<a href={`/product/${product._id}`} > <ImageSlider images={product.images} /></a>}
            >
                <Meta title={product.title} description={`$${product.price}`} />
            </Card>
        </Col>
    } ) 

    const onLoadMore = () => {
        let skip = Skip + Limit;
        const variables = {
            skip: skip,
            limit: Limit,
            filters:Filters

        }
        getProducts(variables);
        setSkip(skip);
        
    }

    const showFilteredResults = (filters) => {
        const variables = {
            skip: 0,
            limit: Limit,
            filters: filters

        }
        getProducts(variables);
        setSkip(0)
    }

    const handleFilters  = (filters,category) => {
        const newFilters = { ...Filters}
        console.log("A")
        console.log(newFilters)
        newFilters[category] = filters
        
        if(category == "price")
        {

        }
        console.log("B")
        console.log(newFilters)
        showFilteredResults(newFilters)
        setFilters(newFilters)
    }
    return (
        <>
           <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Travel Anywhere  <Icon type="rocket" />  </h2>
            </div>
            
            <CheckBox
            list = {continents}
            handleFilters ={filters => handleFilters(filters,"continents")}
                //the new checked information
            />


            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16,16]} >
                        
                        {renderCards}
                    </Row>
                </div>
            }
             <br /><br />

             {PostSize >= Limit && <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore} >Load More</button>
                </div> }
             
            </div>
        </>
    )
}

export default LandingPage
