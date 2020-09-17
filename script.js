Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
    `
})

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
            <p>Shipping: {{ shipping }}</p>

            <product-details v-bind:details="details"></product-details>

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
            <button @click="removeFromCart">Remove from cart</button>

        </div>

        <product-review></product-review>

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

        onSale: false
        }
    },
    methods: {
        addToCart: function(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId)
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
        },
        shipping() {
            if (this.premium) {
                return "Free"
            }
            return "99$"
        }
    }
})

Vue.component('product-review', {
    template:`
    <form class="review-form" >

        <p>
          <label for="name">Name:</label>
          <input id="name" v-model="name">
        </p>

        <p>
          <label for="review">Review:</label>
          <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
          <label for="rating">Rating:</label>
          <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>

        <p>
          <input type="submit" value="Submit">
        </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null
        }
    }
})


let app = new Vue ({
    el: "#app",
    data: {
        premium: true,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            for(var i = this.cart.length - 1; i >= 0; i--) {
                if (this.cart[i] === id) {
                    this.cart.splice(i, 1);
                }
            }
        }
    }

})

