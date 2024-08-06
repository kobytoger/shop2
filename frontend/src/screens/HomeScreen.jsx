import { Row, Col, Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import OverLayCat from "../components/OverLayCat";
import Popover from "react-bootstrap/Popover";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Hello!</Popover.Header>
      <Popover.Body>
        Welcome to our <strong>amazing</strong> shop. It's a pleasure to see
        you.
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverLayCat
        popover={popover}
        srcUrl={
          "https://www.icegif.com/wp-content/uploads/2023/06/icegif-387.gif"
        }
      />

      <h1 className="text-center">Welcome to Kobe's pet shop</h1>
      <Image
        className="mb-5 mt-3 rounded mx-auto d-block wd-5"
        width="65%"
        src="https://t4.ftcdn.net/jpg/06/28/92/41/360_F_628924186_fjHVPXo8ypuQ6nVd1pi8t1IyOXhfzmDy.jpg"
      ></Image>

      {!keyword && (
        <>
          <h1 className="text-center">Top Sellers</h1>
          <ProductCarousel />
          <h1 className="text-center">Categories</h1>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Link to="/category/cats" className="mb-4">
              <Image
                style={{
                  width: "250px",
                  height: "100%",
                  border: " black solid",
                }}
                src={process.env.PUBLIC_URL + "/images/cats.jpg"}
                alt="cats"
              ></Image>
            </Link>
            <Link to="/category/dogs" className="mb-4">
              <Image
                style={{
                  width: "250px",
                  height: "100%",
                  border: " black solid",
                }}
                src={process.env.PUBLIC_URL + "/images/dogs.jpg"}
                alt="dogs"
              ></Image>
            </Link>
            <Link to="/category/fishes" className="mb-4">
              <Image
                style={{
                  width: "250px",
                  height: "100%",
                  border: " black solid",
                }}
                src={process.env.PUBLIC_URL + "/images/fishes.jpeg"}
                alt="fishes"
              />
            </Link>
            <Link to="/category/birds" className="mb-4">
              <Image
                style={{
                  width: "250px",
                  height: "100%",
                  border: " black solid",
                }}
                src={process.env.PUBLIC_URL + "/images/birds.jpg"}
                alt="birds"
              />
            </Link>
          </Container>
        </>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <h1 className="text-center">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          {keyword && (
            <Link to="/" className="btn btn-light mb-4">
              Go Back
            </Link>
          )}

          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;