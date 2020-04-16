var eventBus = new Vue()

Vue.component('product-details',{
    props: {
        details:{
            type:Array,
            required:true
        }
    },
    template:`
    <ul>
    <li v-for="detail in details">{{detail}}</li>
    </ul>
    `
})

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
        <product-details :details="details"></product-details>
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
          
        </div>

        
    </div>
    <product-tabs :reviews="reviews"></product-tabs>
</div>
`,
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
    reviews:[],
}
} ,
methods:{
    addToCart: function(){
        //same class is this ???
        this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId)
    },
    decreaseToCart: function(){
        this.$emit('removed-to-cart')
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
    },
    mountd(){
        eventBus.$on('review-submitted',productReview =>{
                this.reviews.push(productReview)
        })
    }
    
},
})

Vue.component('product-review',{
    template:`
    
    <form class="review-form" @submit.prevent="onSubmit">
    <p v-if="errors.length">
    <b>Please correct the following error(s):</b>
    <ul>
        <li v-for="error in errors">{{error}}</li>
    </ul>
    <p>
        <label>Name</label>
        <input id = "name" v-model="name" placeholder="name">
        </p>
    <p>
    <label for="review">Review</label>
    <textarea id = "review" v-model="review" ></textarea>
    </p>

    <p>
    <label for="rating">Rating:</label>
    <select id = "rating" v-model.number="rating">
    <option>5</option>
    <option>4</option>
    <option>3</option>
    <option>2</option>
    <option>1</option>
    </select>
    <p>Would you recommended this product?</p>
    <input type="radio" id=answer  v-model="answer" value="Yes" name=recommen>Yes
    <input type="radio"  id=answer  v-model="answer" value="No"name=recommen>No
    </p>

    <p>
    <input type="submit" value="Submit">
    </p>
    </form>
    `
    ,
    data(){
        return{
            name: null,
            review: null,
            rating: null,
            answer:null,
            errors:[],
        }
    },
    methods:{
        onSubmit(){
            if(this.name && this.review && this.rating&&this.answer){
                let productReview ={
                    name: this.name,
                    review: this.review,
                    rating:this.rating,
                    answer:this.answer,
                }
                eventBus.$emit('review-submitted',productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.answer = null    
            }
            else{
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.answer) this.errors.push("Answer required.")
            
            }
        }
        
    }
})

Vue.component('product-tabs',{
    props: {
        reviews:{
            type:Array,
            required:true
        }
    },

    template:`
    <div>
        <div>
        <span class="tab"
        :class="{activeTab: selectedTab === tab}"
        v-for="(tab,index) in tabs" :key="index"
        @click="selectedTab = tab"
        >{{tab}}</span>
        </div>
        <div v-show="selectedTab ==='Reviews' ">
        <p v-if="reviews.length == 0">There are no reviews yet.</p>
        <ul v-else>
        <li v-for="review in reviews">
        <p>{{review.name}}</p>
        <p>{{review.rating}}</p> 
        <p>{{review.review}}</p>
        <p>{{review.answer}}</p>
        </li>
        </ul>
        </div>
    
        <product-review v-show="selectedTab === 'Make a Review'" >
        </product-review>    
    </div>   
        `,
    data(){
        return {
            tabs: ['Reviews','Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue({
    //id = #app
    el:'#app',
    data:{
        premium:false,
        cart:[],
    },
    methods: {
        updateCart(id){
           this.cart.push(id)
        },
        removeCart(){
            this.cart.pop()
        }
    }
})

/*var app = new Vue({
    options
    //id.product = Socks
})*/