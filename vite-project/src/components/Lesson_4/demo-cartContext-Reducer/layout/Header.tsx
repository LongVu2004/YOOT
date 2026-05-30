// Image from Antd
import { Layout, Badge, Button, Drawer, Space, Table, Empty, Select, message } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useCart } from "../provider/cart/useCart";
import type { CartItem } from "../types";
import { coupons } from "../services/coupon"
import { shippingFee } from "../services/shippingFee";

const Header = () => {
    const cartContext = useCart();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [shippingId, setShippingId] = useState<string | null>("Standard");

    if (!cartContext) return null;

    const { cart, coupon, applyCoupon, removeFromCart, increaseQuantity, decreaseQuantity, subTotal, discount, total } = cartContext;

    const handleApplyCoupon = (code: string) => {
        applyCoupon(code);
    };

    const handleShippingChange = (value: string | null) => {
    if (!value) {
        setShippingId("Standard");
        return;
    }

    const nextMethod = shippingFee.find((s) => s.id === value);
    
    if (nextMethod && subTotal < nextMethod.minOrderValue) {
        message.warning(
            `Phương thức "${nextMethod.shipName}" yêu cầu đơn hàng từ ${formatVND(nextMethod.minOrderValue)}!`
        );
        
        setShippingId((prev) => prev); 
    } else {
        setShippingId(value);
    }
};

    const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

    const formatVND = (price: number) => {
        return price.toLocaleString('vi-VN') + ' đ';
    };

    const couponOptions = coupons.map((c) => ({
        label: `${c.code} (-${c.discount * 100}%)`,
        value: c.code,
    }));

    const shippingOptions = shippingFee.map((method) => ({
        label: `${method.Description} `,
        value: method.id
    }));

    const selectedShipping = shippingFee.find((s) => s.id === shippingId);
    const shippingCost = selectedShipping ? selectedShipping.price : 0;
    const finalTotal = total + shippingCost;

    const columns = [
        // {
        //     title: "Ảnh",
        //     dataIndex: "image",
        //     key: "image",
        //     width: 80,
        //     render: (image: string) => (
        //         <Image
        //             src={image}
        //             alt="product"
        //             style={{ width: "60px", height: "60px", objectFit: "cover" }}
        //             preview={true}
        //         />
        //     ),
        // },
        {
            title: "Sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
            render: (price: number) => formatVND(price),
        },
        {
            title: "SL",
            dataIndex: "quantity",
            key: "quantity",
            render: (quantity: number, record: CartItem) => (
                <Space>
                    <Button size="small" onClick={() => decreaseQuantity(record.id)}>
                        -
                    </Button>
                    <span>{quantity}</span>
                    <Button size="small" onClick={() => increaseQuantity(record.id)}>
                        +
                    </Button>
                </Space>
            ),
        },
        {
            title: "Thành tiền",
            key: "total",
            render: (_: unknown, record: CartItem) => formatVND(record.price * record.quantity),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_: unknown, record: CartItem) => (
                <Button
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => removeFromCart(record.id)}
                />
            ),
        },
    ];

    return (
        <>
            <Layout.Header
                style={{
                    background: "#fff",
                    padding: "0 24px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: "65px"
                }}
            >
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    CELLPHONE MINI SHOP - REDUCER
                </div>

                <Badge count={totalItemsInCart}>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        onClick={() => setOpenDrawer(true)}
                    >
                        Giỏ hàng
                    </Button>
                </Badge>
            </Layout.Header>

            <Drawer
                title="Chi tiết giỏ hàng"
                placement="right"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
                width={600}
            >
                {cart.length === 0 ? (
                    <Empty description="Giỏ hàng trống" />
                ) : (
                    <Space direction="vertical" style={{ width: "100%" }} size="large">
                        <Table
                            columns={columns}
                            dataSource={cart}
                            rowKey="id"
                            pagination={false}
                        />

                        <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: "16px" }}>
                            <Space direction="vertical" style={{ width: "100%" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Tạm tính:</span>
                                    <span>{formatVND(subTotal)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <span>Mã giảm giá:</span>
                                    <Select
                                        placeholder="Chọn mã giảm giá"
                                        allowClear 
                                        value={coupon || undefined} 
                                        onChange={(value) => handleApplyCoupon(value || "")}
                                        style={{ width: "200px" }}
                                        options={couponOptions}
                                    />
                                </div>
                                {discount > 0 && (
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Giảm giá:</span>
                                        <span>-{formatVND(discount)}</span>
                                    </div>
                                )}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                    <span style={{ marginTop: "5px" }}>Giao hàng:</span>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                        <Select
                                            placeholder="Chọn phương thức"
                                            allowClear
                                            value={shippingId || undefined}
                                            onChange={handleShippingChange}
                                            style={{ width: "200px" }}
                                            options={shippingOptions}
                                        />
                                    </div>
                                </div>
                                {selectedShipping && (
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span>Phí vận chuyển:</span>
                                        <span>{formatVND(selectedShipping.price)}</span>
                                    </div>
                                )}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        borderTop: "1px solid #f0f0f0",
                                        paddingTop: "8px",
                                    }}
                                >
                                    <span>Tổng cộng:</span>
                                    <span>{formatVND(finalTotal)}</span>
                                </div>
                            </Space>
                        </div>

                        <Button type="primary" size="large" block>
                            Thanh toán
                        </Button>
                    </Space>
                )}
            </Drawer>
        </>
    );
};


export default Header;
