Vue.component('product', {
    template: `
    <h1>Component #1</h1>
    `
})

let app = new Vue ({
    el: "#app",
    data: {
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

