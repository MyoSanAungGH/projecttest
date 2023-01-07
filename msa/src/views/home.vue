<template>
    <div>
      <v-row>
          <v-col cols="2">
              <v-card class="mx-auto">
                  <v-navigation-drawer permanent>
                      <v-list dense nav>
                         <v-list-item
                         v-for="(division, index) in divisionCategoryList"
                         :key="index"
                         link
                         @click = "onClickDivision(division)"
                         >
                              <v-list-item-content>
                                  <v-list-item-title>{{division.name}}</v-list-item-title>
                              </v-list-item-content>
                         </v-list-item>
                      </v-list>
                  </v-navigation-drawer>
              </v-card>
          </v-col>
  
          <v-col cols="10">
              <v-row>
                  <v-col cols="3" v-for="(restaurant,  index) in restaurantList"
                  :key="index">
                      <v-card @click="gotoRestaurantDetail(restaurant)" height="300">
                          <v-card-text>
                              <v-img :src=" localDomain + restaurant.picPath"
                              max-height="200" 
                              cover
                              ></v-img>
                              <div class="text-h6">{{restaurant.restaurantName}}</div>
                              <div class="text-body-1">{{restaurant.address}}</div>
                              <div class="text-body-1">{{restaurant.phone}}</div>
                          </v-card-text>
                      </v-card>
                  </v-col>
              </v-row>
          </v-col>
      </v-row>
    </div>
  </template>
  
 <script>
    import utils from '@/utils/utils';

    export default{
        name:"home",

        components: {},

        data(){
            return{
                localDomain:utils.constant.localDomain,

                divisionCategoryList:[],

                restaurantList:[],
            };
        },

        async created(){
            await this.fetchDivisionCategories();
            await this.fetchRestaurants();
        }, 

        methods:{
            async fetchRestaurants(){
                const resp = await utils.http.get("/restaurant");
                if(resp && resp.status === 200){
                    const data =await resp.json();
                    if(data){
                        this.restaurantList = data;
                    }
                }
            },

            async fetchDivisionCategories(){
                const resp = await utils.http.get("/admin/divisionMstate");
                if(resp && resp.status === 200){
                    const data = await resp.json();
                    if(data) {
                        this.divisionCategoryList = data;
                    }
                }
            },

            gotoRestaurantDetail(restaurant){
                this.$router.push({
                    path:"/restaurant_detail" + restaurant.id,
                });
            },

            async onClickDivision (division){
                const resp = await utils.http.get("/restaurant/divisionMstate/" + division.id);
                if(resp && resp.status === 200){
                const data = await resp.json();
                if(data){
                    this.restaurantList = data;
                }

                }
            }
        } 


    }
 </script>