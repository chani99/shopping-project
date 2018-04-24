
    "use strict";
  

    App.service('modelsServc', function() {

        this.MemberModel = function(data) {
                if(data.id) this._id =  (data.id);
                if(data.fname) this.fname = (data.fname);
                if(data.lname) this.lname = (data.lname);
                if(data.userName) this.userName = (data.userName);
                if(data.email) this.email = (data.email);
                if(data.password) this.password = (data.password);
                if(data.city) this.city = (data.city);
                if(data.street) this.street = (data.street);
                if(data.role) this.role = (data.role);
                if(data.cart) this.cart = (data.cart);
                if(data.order) this.order = (data.order);
        }
            
        
  
    
    this.OrderModel = function(data) {
        if(data.member_id) this.member_id = data.member_id;
        if(data.cart_id) this.cart_id = data.cart_id;
        if(data.totalPrice) this.Price = data.totalPrice;
        if(data.city) this.derliver_city = data.city;
        if(data.street) this.deliver_street = data.street;
        if(data.date) this.deliver_date = data.date;
        if(data.credit) this.credit_card_4dig = data.credit;
    
    }
    
});
