<template>
  <div class="categorie category-component">
    <img v-if="categorie.image" class="show-category-image" :src="$store.state.url+categorie.image" alt="">
    <h6> {{categorie.name}} </h6>
  </div>
</template>

<script>
export default {
    props:['categorie'],
    
}
</script>

<style lang="scss" scoped>
.categorie.category-component{
    font-family: "Cairo";
    box-shadow: 0 4px 25px 0 #0000001a;
    padding: 5px 18px;
    margin-bottom: 27px;
    background: #EBF9FC;
    color: #333;
    
    border-radius: 8px;
    margin-right: 10px;
    height:78px;
    text-align: center;
    h6{
        margin-bottom:0;
    }
    .show-category-image{
      width: 50px;
      height: 50px;
      margin: auto;
      text-align: center;
    }
}
</style>