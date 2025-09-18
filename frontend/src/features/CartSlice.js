import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    CartItems: [],
    TotalPrice: 0,
    TotalQuantity: 0,
}


export const cartsave = createAsyncThunk("cart/save", async (CartItems) => {
    console.log(CartItems)
    const token = localStorage.getItem("token")
    const response = await fetch("/App/cart/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(CartItems)
    });
    return await response.json();
})


export const fetchCartData = createAsyncThunk("cart/fetch", async (userID) => {
    const token = localStorage.getItem("token")


    const response = await fetch(`/App/cart/data/${userID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();


})





export const CartSlice = createSlice({
    name: "Cart",
    initialState,

    reducers: {
        addToCart: (state, actions) => {
            // console.log(actions.payload)       
            const find = state.CartItems.findIndex((value) => {
                return value._id === actions.payload._id;
            });

            console.log(find);

            if (find != -1) {
                state.CartItems[find] = { ...state.CartItems[find], quantity: state.CartItems[find].quantity + 1 };
            } else {
                state.CartItems.push({ ...actions.payload, quantity: 1 });
            }
        },


        deleteCart: (state, actions) => {
            console.log(actions.payload);
            state.CartItems = state.CartItems.filter((Value) => {
                return actions.payload !== Value._id
            })


        },

        carttotalPrice: (state) => {
            const { TotalProductPriceValue, TotalProductQuantityValue } = state.CartItems.reduce((TotalValue, CardItem) => {
                const { quantity, ProductPrice } = CardItem
                const TotalPrice = parseFloat(quantity) * parseFloat(ProductPrice);
                TotalValue.TotalProductPriceValue += TotalPrice;
                TotalValue.TotalProductQuantityValue += quantity;

                return TotalValue;

            }, {
                TotalProductPriceValue: 0,
                TotalProductQuantityValue: 0,

            })

            state.TotalPrice = TotalProductPriceValue;
            state.TotalQuantity = TotalProductQuantityValue;
        },
        increament: (state, actions) => {
            console.log(actions.payload);
            const CartItems = state.CartItems.map((items) => {
                if (items._id === actions.payload) {
                    return { ...items, quantity: items.quantity + 1 };
                }
                return items;
            })
            state.CartItems = CartItems;
        },
        decreament: (state, actions) => {
            const CartItems = state.CartItems.map((items) => {
                if (items._id === actions.payload) {
                    return { ...items, quantity: items.quantity > 1 ? items.quantity - 1 : 1 };
                }
                return items;
            })
            state.CartItems = CartItems;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCartData.fulfilled, (state, action) => {
            console.log("fetchComplete", action.payload);

            state.CartItems = action.payload.data.cartItems || [];
            state.TotalPrice = action.payload.data.totalprice || 0;
            state.TotalQuantity = action.payload.data.totalQuantity || 0;
        });
        builder.addCase(cartsave.fulfilled, (state, action) => {
            console.log("Cart Save..", action.payload);
        });
    },
})



export const { addToCart, deleteCart, carttotalPrice, increament, decreament } = CartSlice.actions

export default CartSlice.reducer