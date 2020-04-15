Vue.component('product', {
    props: {
        premium: {
            type:Boolean,
            required:true,
        }
    },
    template:`
    <div class="product">

    <div class= "product-image">
        <img v-bind:src="image" />
    </div>
    <div class = "product-info">
        <h1>{{ title }} </h1>
        <p v-if="inventory > 10">In Stock</p>
        <p v-else :class="{outOfStock:inStock}">Out of Stock</p>
        <p>User is premium: {{premium}}</p>
        <p>{{shipping}}</p>
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
        <div v-for="(variant, index) in variants " 
        :key="variant.variantId"
        class = "color-box"
        :style="{ backgroundColor: variant.variantColor}"
        @mouseover="updateProduct(index)">
        </div>
        <p>{{sale}}</p>
        <div>
            <button v-on:click="addToCart"
            :disabled="!inStock"
            :class="{ disabledButton:!inStock}">Add to Cart</button>
            <button @click="decreaseToCart">Dec to Cart</button>
            <div class ="cart">
                <p>Cart {{cart}}</p>
            </div>
        </div>
    </div>
</div>
`
,
data(){
   return {
    //product = Socks
    brand: 'Vue Mastery',
    product: 'Socks',
    selectedVariant:0,
    onSale:true,
   // image: './img/vmSocks-green-onWhite.jpg',
    inventory:5,
    details: ["80% cotton", "20% polyester","Gender-neutral"],
    variants: [
        {
            variantId:2234,
            variantColor:"green",
            variantImage: './img/vmSocks-green-onWhite.jpg',
            variantQuantity:10

        },
        {
            variantId:2235,
            variantColor:"blue",
            variantImage: './img/vmSocks-blue-onWhite.jpg',
            variantQuantity:0
        }
    ],    
    cart:0,
}
} ,
methods:{
    addToCart: function(){
        //same class is this ???
        this.cart +=1
    },
    decreaseToCart: function(){
        this.cart -=1
    },
    updateProduct: function(index){
        this.selectedVariant = index
        console.log(index)
    }
},
computed: {
    title(){
        return this.brand + ' ' + this.product
    },
    image(){
        return this.variants[this.selectedVariant].variantImage
    },
    inStock(){
        return this.variants[this.selectedVariant].variantQuantity
    },
    sale(){
        if(this.onSale){
            return this.brand + ' ' + this.product + ' are saled!'
        }else{
            return this.brand + ' ' + this.product + ' are not saled!'
        }
       },
    shipping(){
        if (this.premium){
            return "Free"
        }else{
            return "2424"
        }
    }
    
},
})

var app = new Vue({
    //id = #app
    el:'#app',
    data:{
        premium:false,
    }
})

/*var app = new Vue({
    options
    //id.product = Socks
})*/