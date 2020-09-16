Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" alt="Socks">
        </div>
        <div class="product-info">
            <h1>{{ title }}</h1>
            <p>{{ sale }}</p>
            <p v-if="inStock">In stock</p>
            <p v-else>Out of stock</p>
            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>
            <div v-for="(variant, index) in variants"
                v-bind:key="variant.variantId"
                class="color-box"
                v-bind:style="{ backgroundColor: variant.variantColor}"
                v-on:mouseover="updateProduct(index)">
            </div>
            <!-- <a v-bind:href="link">More products like this</a> -->
            <button v-on:click="addToCart"
                    v-bind:disabled="!inStock"
                    v-bind:class="{disabledButton: !inStock}">Add to Cart</button><br>
            <button v-on:click="delFromCart">Delete from Cart</button>
            <div class="cart">
                <p>Cart({{cart}})</p>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        link: 'http://anekdot.ru',
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
              variantId: 2234,
              variantColor: 'Green',
              variantImage: './img/green-socks.jpg',
              variantQuantity: 111

            },
            {
              variantId: 2235,
              variantColor: 'Blue',
              variantImage: './img/blue-socks.jpg',
              variantQuantity: 0

            }
          ],
        cart: 0,
        onSale: false
        }
    },
    methods: {
        addToCart: function(){
            this.cart += 1
        },
        delFromCart: function() {
            this.cart -= 1
        },
        updateProduct: function(index){
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            if (this.onSale) {
                return 'Sale!'
            }
            return '...'
        }
    }
})

let app = new Vue ({
    el: "#app",
    data: {
        premium: true
    }

})

