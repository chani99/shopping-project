
    "use strict";
  

    App.service("modelsServc", function() {

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
            
        

    });
  
  