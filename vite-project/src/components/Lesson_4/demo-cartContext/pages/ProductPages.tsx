// Image from Antd
import { Row, Col, Card, Button, Space, Empty } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCart } from "../provider/cart/useCart";
import { products } from "../services/product";

const ProductPages = () => {
    const cartContext = useCart();

    if (!cartContext) return <Empty description="Đang tải..." />;

    const { AddToCart } = cartContext;

    const formatVND = (price: number) => {
        return price.toLocaleString('vi-VN') + ' đ';
    };

    return (
        <div style={{ padding: "24px" }}>
            <h1>Danh sách sản phẩm</h1>
            
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            hoverable
                            style={{ height: "100%" }}
                            // cover={
                            //     <Image
                            //         alt={product.name}
                            //         src={product.image}
                            //         style={{
                            //             height: "250px",
                            //             objectFit: "cover",
                            //         }}
                            //         preview={true}
                            //     />
                            // }
                        >
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <h3 style={{ margin: 0 }}>{product.name}</h3>
                                <div style={{ fontSize: "20px", fontWeight: "bold", color: "#ff7a00" }}>
                                    {formatVND(product.price)}
                                </div>
                                <Button
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    block
                                    onClick={() =>
                                        AddToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price
                                            // image: product.image,
                                        })
                                    }
                                >
                                    Add
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductPages;