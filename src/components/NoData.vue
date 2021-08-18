<template>
  <div class="no-data">
    <div class="nodata-content" style="text-align:center">

              
               <img
          style="width: 200px;height:100%;margin-top:38px"
          src="@/images/undraw_empty_xct9.svg"
          alt
        />
               
                <h6 >
                {{msg}}
                </h6>


          
        
        

        
    </div>
  </div>
</template>

<script>
export default {
  props:['msg']
};
</script>

<style lang="scss">
.no-data{
  .nodata-content{
    h6{
           color: #0c0c0cb8;
    text-align: center;
    margin-top: 18px;
    font-size: 16px;
    /* color: #263238; */
    margin-bottom: 37px;
    }
  }
   .teacher-card {
            background: #FFF;
    margin-bottom: 15px;
    padding-top: 15px;
    transition: all 0.5s ease;
    cursor: pointer;
    
    box-shadow:0 4px 25px 0 rgba(0, 0, 0, 0.06);
    &:hover {
      transform: translateY(-10px);
    }
    .teacher-img {
      padding-bottom: 15px;
      > div {
         height: 117px;
    background-size: cover;
    background-repeat: no-repeat;
    width: 93%;
    /* border-radius: 50%; */
    overflow: hidden;
    margin: 10px auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .teacher-info {
        h6{
                &:first-of-type{
                        text-align: center;
    font-size: 13px;
    margin-bottom: 6px;
    color: #525252;
                }
                &:last-of-type{
                    text-align: center;
    font-size: 19px;
    margin-bottom: 15px;
    white-space: nowrap;
    color: #525252;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 10px;
                }
      }
    }
    .teacher-body {
          width: 104%;
      background: #febe06;
      color: #fff;
      padding: 0;
      position: relative;
      /* border-radius: 0 0 5px 4px; */
      padding-bottom: 2px;
      &::after {
        position: absolute;
        top: -16px;
        content: "";
        left: 0;
        border-width: 5px 2px 11px 8px;
        border-color: transparent #febe06 #febe06 transparent;
        border-style: solid;
      }
    }
  }
}
</style>
