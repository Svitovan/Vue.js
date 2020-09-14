let app = new Vue ({
    el: "#app",
    data: {
        product: 'Socks (new)',
        image: './img/green-socks.jpg',
        link: 'http://anekdot.ru',
        inventory: 7,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
              variantId: 2234,
              variantColor: 'Green',
              variantImage: './img/green-socks.jpg'
            },
            {
              variantId: 2235,
              variantColor: 'Blue',
              variantImage: './img/blue-socks.jpg'
            }
          ],
        cart: 0
    },
    methods:{
        addToCart: function(){
            this.cart += 1
        },
        delFromCart: function() {
            this.cart -= 1
        },
        updateProduct: function(variantImage){
            this.image = variantImage
        }
    }
})

